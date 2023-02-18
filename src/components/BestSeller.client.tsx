import {useEffect, useState} from 'react';
import { BuilderComponent, builder, Builder } from '@builder.io/react'
import type {Product, Country} from '@shopify/hydrogen/storefront-api-types';
import {fetchSync} from '@shopify/hydrogen';
import {Button, Text, ProductCard, Heading, Skeleton, Section, Grid} from '~/components';
import Tabs from "~/components/Tabs";
// Tabs Components
import TabOne from "~/components/TabOne";
import TabTwo from "~/components/TabTwo";
import TabThree from "~/components/TabThree";
import TabItem from "~/components/TabItem";

builder.init('67b2e342dd0d44cc8d28efc40c91ada5');

export const BestSeller = (props: any) => {
    let {title, numberOfDisplay} = props;

    return (
        <>
            <Section padding="y">
                <h3 className="font-bold text-lead text-center">{title}</h3>
                <Tabs numberOfDisplay={numberOfDisplay} />
            </Section>
        </>
      );
}
