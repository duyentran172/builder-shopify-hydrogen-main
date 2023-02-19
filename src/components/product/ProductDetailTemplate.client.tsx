import { useEffect, useState } from "react";
import {
    useProductOptions,
    useCart,
    CartProvider
  } from '@shopify/hydrogen';
import { BuilderComponent, builder } from '@builder.io/react';

builder.init('67b2e342dd0d44cc8d28efc40c91ada5')

export const ProductDetailTemplate = (props: any) => {
    const {template} = props;
    const [builderContentJson, setBuilderContentJson] = useState(null);
    const {selectedVariant} = useProductOptions();
    
    const {linesAdd} = useCart();
    useEffect(() => { 
        builder.get(template.model, { entry: template.id })
        .promise().then(setBuilderContentJson);
    }, []);

    return builderContentJson && (
        <CartProvider>
            <BuilderComponent
                model="product-template"
                content={builderContentJson}
                data={{ product: props.builderState.state, selectedVariant }}
                context={{ 
                    myAddToCart: () => {
                        if(selectedVariant) {
                            const merchandise = {
                                merchandiseId: selectedVariant.id || ''
                            };
                            linesAdd([merchandise]);
                        } else {
                            console.log('qq');
                        }
                    }
                }}
            />
        </CartProvider>
    );
}
