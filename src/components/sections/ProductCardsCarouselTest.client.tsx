import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import {Product} from '@shopify/hydrogen/storefront-api-types';
import {ProductCardRecommendation} from '../cards/ProductCardRecommendation.client';
import {Section, Grid} from '~/components';

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

export function ProductCardsCarouselTest({products}: {products: Product[]}) {
  return (
    <>
      <Carousel
        responsive={responsive}
        customTransition="transform 700ms ease-in-out"
        itemClass="px-2"
      >
        {products.map((product) => (
          <ProductCardRecommendation
            product={product}
            key={product.id}
          />
        ))}
      </Carousel>
    </>
  );
}
