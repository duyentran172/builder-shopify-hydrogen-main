import {gql} from '@shopify/hydrogen';
import type {HydrogenApiRouteOptions, HydrogenRequest} from '@shopify/hydrogen';

export async function api(
  _request: HydrogenRequest,
  {queryShop}: HydrogenApiRouteOptions,
) {
  const jsonBody = await _request.json();

  if (!jsonBody?.email) {
    return new Response(
      JSON.stringify({error: 'Invalid email.'}),
      {
        status: 400,
      },
    );
  }

  const {data, errors} = await queryShop<{
    customerCreate: any;
  }>({
    query: CUSTOMER_SUBSCRIBE_MUTATION,
    variables: {
      input: {
        email: jsonBody.email,
        acceptsMarketing: true,
        password: "Admin123!@#"
      },
    },
  });

  return data.customerCreate;
}

const CUSTOMER_SUBSCRIBE_MUTATION = gql`
mutation customerCreate($input: CustomerCreateInput!) {
  customerCreate(input: $input) {
    customer {
      id
    }
    customerUserErrors {
      code
      field
      message
    }
  }
}
`;
