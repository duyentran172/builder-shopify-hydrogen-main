import {Suspense, useMemo} from 'react';
import {gql, useShopQuery, useLocalization} from '@shopify/hydrogen';
import {PRODUCT_CARD_FRAGMENT} from '~/lib/fragments';
import {ProductCard, Section} from '~/components';
import { ProductCards } from './ProductCards.client';
import { ProductCardsCarousel } from './ProductCardsCarousel.client';
import type {
  Product,
  ProductConnection,
} from '@shopify/hydrogen/storefront-api-types';

const mockProducts = new Array(12).fill('');

export function ProductSwimlane({
  title = 'Featured Products',
  data = mockProducts,
  count = 12,
  ...props
}) {
  const productCardsMarkup = useMemo(() => {
    // If the data is already provided, there's no need to query it, so we'll just return the data
    if (typeof data === 'object') {
      if (props.turnOnCarousel === true) {
        return <ProductCardsCarousel products={data} />;
      }
      return <ProductCards products={data} />;
    }

    // If the data provided is a productId, we will query the productRecommendations API.
    // To make sure we have enough products for the swimlane, we'll combine the results with our top selling products.
    if (typeof data === 'string') {
      return (
        <Suspense>
          <RecommendedProducts productId={data} count={count} turnOnCarousel={props.turnOnCarousel} />
        </Suspense>
      );
    }

    // If no data is provided, we'll go and query the top products
    return <TopProducts count={count} turnOnCarousel={props.turnOnCarousel} />;
  }, [count, data]);

  return (
    <Section heading={title} padding="y" {...props}>
      <div className={`swimlane hiddenScroll ${props.turnOnCarousel ? "p-0 block overflow-hidden" : ""}`}>
        {productCardsMarkup}
      </div>
    </Section>
  );
}

function RecommendedProducts({
  productId,
  count,
  turnOnCarousel,
}: {
  productId: string;
  count: number;
  turnOnCarousel: boolean;
}) {
  const {
    language: {isoCode: languageCode},
    country: {isoCode: countryCode},
  } = useLocalization();

  const {data: products} = useShopQuery<{
    recommended: Product[];
    additional: ProductConnection;
  }>({
    query: RECOMMENDED_PRODUCTS_QUERY,
    variables: {
      count,
      productId,
      languageCode,
      countryCode,
    },
  });

  const mergedProducts = products.recommended
    .concat(products.additional.nodes)
    .filter(
      (value, index, array) =>
        array.findIndex((value2) => value2.id === value.id) === index,
    );

  const originalProduct = mergedProducts
    .map((item) => item.id)
    .indexOf(productId);

  mergedProducts.splice(originalProduct, 1);
  if (turnOnCarousel === true) {
    return <ProductCardsCarousel products={mergedProducts} />;
  }
  return <ProductCards products={mergedProducts} />;
}

function TopProducts({count, turnOnCarousel,}: {count: number; turnOnCarousel: boolean;}) {
  const {
    data: {products},
  } = useShopQuery({
    query: TOP_PRODUCTS_QUERY,
    variables: {
      count,
    },
  });
  if (turnOnCarousel === true) {
    return <ProductCardsCarousel products={products.nodes} />;
  }
  return <ProductCards products={products.nodes} />;
}

const RECOMMENDED_PRODUCTS_QUERY = gql`
  ${PRODUCT_CARD_FRAGMENT}
  query productRecommendations(
    $productId: ID!
    $count: Int
    $countryCode: CountryCode
    $languageCode: LanguageCode
  ) @inContext(country: $countryCode, language: $languageCode) {
    recommended: productRecommendations(productId: $productId) {
      ...ProductCard
    }
    additional: products(first: $count, sortKey: BEST_SELLING) {
      nodes {
        ...ProductCard
      }
    }
  }
`;

const TOP_PRODUCTS_QUERY = gql`
  ${PRODUCT_CARD_FRAGMENT}
  query topProducts(
    $count: Int
    $countryCode: CountryCode
    $languageCode: LanguageCode
  ) @inContext(country: $countryCode, language: $languageCode) {
    products(first: $count, sortKey: BEST_SELLING) {
      nodes {
        ...ProductCard
      }
    }
  }
`;
