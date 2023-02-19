import { useEffect, useState } from "react";
import { BuilderComponent, builder, Builder } from '@builder.io/react';

builder.init('67b2e342dd0d44cc8d28efc40c91ada5')

export const ProductDetailTemplate = (props: any) => {
    const {template} = props;
    const [builderContentJson, setBuilderContentJson] = useState(null);
    useEffect(() => { 
        builder.get(template.model, { entry: template.id })
        .promise().then(setBuilderContentJson);
    }, []);

    return builderContentJson && (
        <div>
            <BuilderComponent
                model="product-template"
                content={builderContentJson}
            />
        </div>
    );
}