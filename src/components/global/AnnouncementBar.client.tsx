import { useEffect, useState } from "react";
import { BuilderComponent, builder, Builder } from '@builder.io/react';
import {useUrl} from '@shopify/hydrogen';

builder.init('5392aabdddfe455c892d9897f30391a0')

export const AnnouncementBar = () => {
    const [builderContentJson, setBuilderContentJson] = useState(null);
    const [showAnnouncementBar, setShowAnnouncementBar] = useState(true);

    useEffect(() => { 
        builder.get('announcement-bar-duyen')
        .promise().then(setBuilderContentJson);

        const isShown = JSON.parse(localStorage.getItem('isShownAnnouncementBar') ?? 'true');
        if (isShown) {
            localStorage.setItem('isShownAnnouncementBar', JSON.stringify(isShown));
        }
        setShowAnnouncementBar(isShown);
    }, []);

    return (
        showAnnouncementBar && (
            <BuilderComponent
                model="announcement-bar-duyen"
                content={builderContentJson}
                context={{myFunction: () => {
                    localStorage.setItem('isShownAnnouncementBar', JSON.stringify(false));
                    setShowAnnouncementBar(false);
                }}}
            />
        )
    );
}
