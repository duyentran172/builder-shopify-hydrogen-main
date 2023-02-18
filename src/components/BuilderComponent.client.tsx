import {builder, BuilderComponent, Builder} from '@builder.io/react';
import "@builder.io/widgets";
import {BestSeller} from '~/components/BestSeller.client';
//import {BestSeller} from '~/components';

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

export { BuilderComponent };
