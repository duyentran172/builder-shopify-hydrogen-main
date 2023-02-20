import {gql} from '@shopify/hydrogen';
import type {HydrogenApiRouteOptions, HydrogenRequest} from '@shopify/hydrogen';
import {ProductConnection, Collection} from '@shopify/hydrogen/storefront-api-types';
import {PRODUCT_CARD_FRAGMENT} from '~/lib/fragments';

export async function api(
  _request: HydrogenRequest,
  {queryShop}: HydrogenApiRouteOptions,
) {
	const url = new URL(_request.url);
	const sortKey = url.searchParams.get('sortKey')?.toString();
	const numberOfDisplay = url.searchParams.get('numberOfDisplay') || '1';
  const isOnsale = url.searchParams.get('isOnsale');

  const {
    data: {products, featuredProducts},
  } = await queryShop<{
    products: ProductConnection;
    featuredProducts: Collection;
  }>({
    query: isOnsale === 'true' ? PRODUCT_ONSALES : TOP_PRODUCTS_QUERY,
    variables: {
      count: parseInt(numberOfDisplay),
			sortKey,
    },
  });

  return isOnsale === 'true' ? featuredProducts.products.nodes : products.nodes;
}

const TOP_PRODUCTS_QUERY = gql`
  ${PRODUCT_CARD_FRAGMENT}
  query topProducts(
    $count: Int
    $countryCode: CountryCode
    $languageCode: LanguageCode
		$sortKey: ProductSortKeys
  ) @inContext(country: $countryCode, language: $languageCode) {
    products(first: $count, sortKey: $sortKey) {
      nodes {
        ...ProductCard
      }
    }
  }
`;

const PRODUCT_ONSALES = gql`
  ${PRODUCT_CARD_FRAGMENT}
  query topProducts(
    $sortKey: String
    $count: Int
  ){
    featuredProducts: collection(handle: $sortKey) {
      products(first: $count) {
        nodes {
          ...ProductCard
        }
      }
    }
  }
`;

