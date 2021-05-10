import { Client } from '@okta/okta-sdk-nodejs';

const client = new Client({
  orgUrl: 'https://dev-2118381.okta.com',
  token: process.env.OKTA_TOKEN
});

export default client;
