import {builder, BuilderComponent, Builder} from '@builder.io/react';
import "@builder.io/widgets";
import {BestSeller} from '~/components/BestSeller.client';
import {FeatureProducts} from '~/components/FeatureProducts.client';
import { ProductDetailTemplate } from '~/components/product/ProductDetailTemplate.client';

builder.init('67b2e342dd0d44cc8d28efc40c91ada5');
  
Builder.registerComponent(BestSeller, { 
    name: 'Customer Favorites',
    inputs: [
        { 
            name: 'title',
            type: 'text',
            friendlyName: 'Title',
            defaultValue: 'Please enter Title'
        },
        {
            name: 'numberOfDisplay',
            type: 'number',
            friendlyName: 'Number of Products Display',
            defaultValue: 10
        }
    ]
});

Builder.registerComponent(FeatureProducts, { 
    name: 'Featured Products',
    inputs: [
        { 
            name: 'title',
            type: 'text',
            friendlyName: 'Title',
            defaultValue: 'Please enter Title'
        },
        {
            name: 'sortkey',
            type: 'string',
            defaultValue: 'TITLE',
            enum: ['TITLE', 'PRICE', 'BEST_SELLING', 'CREATED', 'ID', 'MANUAL', 'COLLECTION_DEFAULT', 'RELEVANCE'],
            friendlyName: 'Sort mode'
        },
        {
            name: 'numberOfDisplay',
            type: 'number',
            friendlyName: 'Number of Products Display',
            defaultValue: 10
        },
        {
            name: 'turnOnCarousel',
            type: 'boolean',
            friendlyName: 'Turn On Carousel',
            defaultValue: false
        },
        {
            name: 'collections',
            type: 'reference',
            model: 'test-data-model'
        }
    ]
});

Builder.registerComponent(ProductDetailTemplate, { 
    name: 'Product Detail Template',
    inputs: [
        {
            name: 'template',
            type: 'reference',
            model: 'product-template'
        }
    ]
});

export { BuilderComponent };
