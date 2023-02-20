import {gql, useShopQuery} from '@shopify/hydrogen';
import type {HydrogenApiRouteOptions, HydrogenRequest} from '@shopify/hydrogen';
import {ProductConnection, Collection} from '@shopify/hydrogen/storefront-api-types';
import {PRODUCT_CARD_FRAGMENT} from '~/lib/fragments';

export async function api(
  _request: HydrogenRequest,
  {queryShop}: HydrogenApiRouteOptions,
) {
	const url = new URL(_request.url);
	const sortKey = url.searchParams.get('sortKey')?.toString();
	const numberOfProductsDisplayed = url.searchParams.get('numberOfProductsDisplayed') || '50';
	const collectionHandle = url.searchParams.get('collection');

  const {
    data: {featuredProducts},
  } = await queryShop<{
    featuredProducts: Collection;
  }>({
    query: HOMEPAGE_CONTENT_QUERY ,
    variables: {
			sortKey,
      collectionHandle,
      count: parseInt(numberOfProductsDisplayed),
    },
  });
  return featuredProducts.products.nodes;
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

const HOMEPAGE_CONTENT_QUERY = gql`
  ${PRODUCT_CARD_FRAGMENT}
  query homepage(
    $collectionHandle: String
    $count: Int
    $sortKey: ProductCollectionSortKeys
  ) {
    featuredProducts: collection(handle: $collectionHandle) {
      products(
        first: $count,
        sortKey: $sortKey
      ) {
        nodes {
          ...ProductCard
        }
      }
    }
  }
`;
