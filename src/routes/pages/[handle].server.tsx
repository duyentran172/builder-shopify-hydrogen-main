import {
  useLocalization,
  useShopQuery,
  Seo,
  useServerAnalytics,
  ShopifyAnalyticsConstants,
  gql,
  type HydrogenRouteProps,
} from '@shopify/hydrogen';
import {Suspense} from 'react';

import {PageHeader} from '~/components';
import {NotFound, Layout} from '~/components/index.server';
import {BuilderComponent} from '~/components/BuilderComponent.client';

import {useQuery} from '@shopify/hydrogen';
import {builder} from '@builder.io/react';

builder.init('67b2e342dd0d44cc8d28efc40c91ada5');

const MODEL_NAME = 'page';

export default function Page(props: any) {
  const {
    language: {isoCode: languageCode},
  } = useLocalization();

  //const {handle} = params;
  const content = useQuery([MODEL_NAME, props.pathname], async () => {
    return await builder
      .get(MODEL_NAME, {
        userAttributes: {
          urlPath: props.pathname,
        },
      })
      .promise();
  });

  const params = new URLSearchParams(props.search);
  const isPreviewing = params.has('builder.preview');
  console.log(content)
  if (!content.data && !isPreviewing) {
    return <NotFound />;
  }
  useServerAnalytics({
    shopify: {
      pageType: ShopifyAnalyticsConstants.pageType.page,
      resourceId: content.data.id,
    },
  });
  return (
    <Layout>
      <Suspense></Suspense>
      <PageHeader heading={content?.data?.data?.title}>
        <BuilderComponent model={MODEL_NAME} content={content?.data} />
      </PageHeader>
    </Layout>
  );
}
