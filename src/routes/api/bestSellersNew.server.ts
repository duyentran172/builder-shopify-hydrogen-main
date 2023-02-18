import {gql} from '@shopify/hydrogen';
import type {HydrogenApiRouteOptions, HydrogenRequest} from '@shopify/hydrogen';
import {ProductConnection} from '@shopify/hydrogen/storefront-api-types';
import {PRODUCT_CARD_FRAGMENT} from '~/lib/fragments';

export async function api(
  _request: HydrogenRequest,
  {queryShop}: HydrogenApiRouteOptions,
) {
	const url = new URL(_request.url);
	const sortKey = url.searchParams.get('sortKey')?.toString();
	console.log(sortKey)
  const {
    data: {products},
  } = await queryShop<{
    products: ProductConnection;
  }>({
    query: TOP_PRODUCTS_QUERY,
    variables: {
      count: 4,
			sortKey
    },
  });
  return products.nodes;
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
