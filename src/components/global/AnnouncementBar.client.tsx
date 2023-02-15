import { useEffect, useState } from "react";
import { BuilderComponent, builder, Builder } from '@builder.io/react';

builder.init('67b2e342dd0d44cc8d28efc40c91ada5')

export const AnnouncementBar = () => {
    const [builderContentJson, setBuilderContentJson] = useState(null);
    const [showAnnouncementBar, setShowAnnouncementBar] = useState(true);

    useEffect(() => { 
        builder.get('announcement-bar')
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
                model="announcement-bar"
                content={builderContentJson}
                context={{myFunction: () => {
                    localStorage.setItem('isShownAnnouncementBar', JSON.stringify(false));
                    setShowAnnouncementBar(false);
                }}}
            />
        )
    );
}
