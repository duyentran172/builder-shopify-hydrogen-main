import {useEffect, useState, Suspense} from 'react';
import { builder } from '@builder.io/react'
import {Section, Grid} from '~/components';
import { ProductCards } from '~/components/sections/ProductCards.client';
import { ProductCardsCarousel } from '~/components/sections/ProductCardsCarousel.client';
import { ProductCardsCarouselTest } from '~/components/sections/ProductCardsCarouselTest.client';

builder.init('67b2e342dd0d44cc8d28efc40c91ada5');

export const FeatureProducts = (props: any) => {
    let [products, setProducts] = useState([]);
    const {title, sortkey, numberOfDisplay, turnOnCarousel, collection} = props;

    useEffect(() => {
        const getAsync = async () => {
            const result = await getDataAsync(
                sortkey,
                collection,
                numberOfDisplay
            );
            setProducts(result)
        }
        getAsync();
    }, []);

    return (
        <Section padding="y">
            <h3 className="font-bold text-lead text-center">{title}</h3>
            {
                products && products.length > 0
                ? (
                    turnOnCarousel ? (
                        <ProductCardsCarouselTest products={products} />
                    ) : 
                        <ProductCards products={products} />)
                : <></>
            }
        </Section>
    );
}

async function getDataAsync(
    sortKey: string,
    collection: string,
    numberOfProductsDisplayed: number
) {
    try {
        const res = await fetch(`https://recommendations.loopclub.io/v2/headless/recommendations/?shop=merkle-vn.myshopify.com&page=merkle-vn.myshopify.com/products/a-test-product/&page_type=product_page&product_id=7792226894053&user_id=7019154637029`,{
          method: "GET",
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },   
        });
        if (res.ok) {
            const data = await res.json();
            return data.widgets[0].recommendations;
        } else {
            return [];
        }
    } catch(error: any) {
        return [];
    }
  }

// async function getDataAsync(
//     sortKey: string,
//     collection: string,
//     numberOfProductsDisplayed: number
// ) {
//     try {
//         const res = await fetch(`/api/featureProducts?sortKey=${encodeURIComponent(sortKey)}&collection=${encodeURIComponent(collection)}&numberOfProductsDisplayed=${encodeURIComponent(numberOfProductsDisplayed)}`,{
//           method: "GET",
//           headers: {
//             Accept: 'application/json',
//             'Content-Type': 'application/json',
//           },   
//         });
//         if (res.ok) {
//             const data = await res.json();
//             return data;
//         } else {
//             return [];
//         }
//     } catch(error: any) {
//         return [];
//     }
//   }
