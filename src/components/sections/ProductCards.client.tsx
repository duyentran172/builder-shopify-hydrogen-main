import {Product} from '@shopify/hydrogen/storefront-api-types';
import {ProductCard} from '../cards/ProductCard.client';
import {Section, Grid} from '~/components';

export function ProductCards({products}: {products: Product[]}) {
  return (
    <Grid layout="products">
      {products.map((product) => (
        <ProductCard
          product={product}
          key={product.id}
        />
      ))}
    </Grid>
  );
}
