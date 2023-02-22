import {useState, useEffect} from 'react';
import { BuilderComponent, builder } from '@builder.io/react'

builder.init('67b2e342dd0d44cc8d28efc40c91ada5')
  
export const ProductDetailTemplate1 = (product: any) => {
  const [builderContentJson, setBuilderContentJson] = useState(null)

  useEffect(() => { 
    builder.get('product-detail', { entry: '67b2e342dd0d44cc8d28efc40c91ada5_7901987ae4a546429ffb0c8268749774' })
      .promise().then(setBuilderContentJson)
  }, [])

  return builderContentJson && <BuilderComponent model="product-detail" content={builderContentJson} data={product} />
}
