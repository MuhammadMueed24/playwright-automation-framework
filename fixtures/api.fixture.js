import { expect, request as playwrightRequest, test as base } from '@playwright/test';

import { API_BASE_URL, API_TIMEOUT } from '../config/api.config.js';
import { ApiClient } from '../api/clients/apiClient.js';
import { AccountService } from '../api/services/account.service.js';
import { AuthService } from '../api/services/auth.service.js';
import { ProductsService } from '../api/services/products.service.js';

export const test = base.extend({
  api: async (
    // Playwright requires object destructuring for fixture dependencies.
    // eslint-disable-next-line no-empty-pattern
    {},
    use,
  ) => {
    const requestContext = await playwrightRequest.newContext({
      baseURL: API_BASE_URL,
      timeout: API_TIMEOUT,
      extraHTTPHeaders: {
        Accept: 'application/json',
      },
    });

    try {
      const client = new ApiClient(requestContext);

      const api = {
        client,
        products: new ProductsService(client),
        auth: new AuthService(client),
        accounts: new AccountService(client),
      };

      await use(api);
    } finally {
      await requestContext.dispose();
    }
  },
});

export { expect };
