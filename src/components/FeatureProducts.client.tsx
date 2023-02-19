import {useEffect, useState, Suspense} from 'react';
import { builder } from '@builder.io/react'
import {Section, Grid} from '~/components';
import { ProductCards } from '~/components/sections/ProductCards.client';
import { ProductCardsCarousel } from '~/components/sections/ProductCardsCarousel.client';

builder.init('67b2e342dd0d44cc8d28efc40c91ada5');

export const FeatureProducts = (props: any) => {
    let [products, setProducts] = useState([]);
    const {title, sortkey, numberOfDisplay, turnOnCarousel, collections} = props;

    useEffect(() => {
        const getAsync = async () => {
            const result = await getDataAsync(
                sortkey,
                collections.value.data.collections.options.collection,
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
                ? <div className={`swimlane hiddenScroll ${turnOnCarousel ? "p-0 block overflow-hidden" : ""}`}>
                    {
                        turnOnCarousel ? (
                            <ProductCardsCarousel products={products} />
                        ) : 
                        <ProductCards products={products} />
                    }
                </div>
                : <></>
            }
        </Section>
    );
}

async function getDataAsync(
    sortKey: string,
    collectionId: string,
    numberOfProductsDisplayed: number
) {
    try {
        const res = await fetch(`/api/featureProducts?sortKey=${encodeURIComponent(sortKey)}&collectionId=${encodeURIComponent(collectionId)}&numberOfProductsDisplayed=${encodeURIComponent(numberOfProductsDisplayed)}`,{
          method: "GET",
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },   
        });
        if (res.ok) {
            const data = await res.json();
            return data;
        } else {
            return [];
        }
    } catch(error: any) {
        return [];
    }
  }
