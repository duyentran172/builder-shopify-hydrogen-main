import { useEffect, useState } from "react";
import { BuilderComponent, builder, Builder } from '@builder.io/react';
import {useUrl} from '@shopify/hydrogen';

builder.init('5392aabdddfe455c892d9897f30391a0')

export const AnnouncementBar = () => {
    const [builderContentJson, setBuilderContentJson] = useState(null)
    const {pathname} = useUrl();
    useEffect(() => { 
        builder.get('announcement-bar-duyen')
        .promise().then(setBuilderContentJson)
    }, [])
    return <BuilderComponent model="announcement-bar-duyen" content={builderContentJson} />
}

  // Register your components for use in the visual editor!
  // https://www.builder.io/blog/drag-drop-react
const Heading = (props: any) => (
    <h1 className="my-heading">{props.title}</h1>
)

Builder.registerComponent(Heading, { 
    name: 'Heading',
    inputs: [{ name: 'title', type: 'text' }]
})