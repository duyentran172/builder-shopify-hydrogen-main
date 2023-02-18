import React, { FC, Fragment } from "react";
import type {Product, Country} from '@shopify/hydrogen/storefront-api-types';
import {Button, Text, ProductCard, Heading, Skeleton, Section, Grid} from '~/components';

type TabsItemProps = {
  products: []
};

const TabItem: FC<TabsItemProps> = ({
  products
}) => {
  console.log(products)
  return (
    <Grid layout="products">
        {products && products.map((product, index) => (
            <ProductCard product={product} key={index} />
        ))}
    </Grid>
  );
};
export default TabItem;
