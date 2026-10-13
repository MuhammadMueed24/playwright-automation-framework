import { expect, test } from '../../fixtures/api.fixture.js';

test('@api @smoke API-007 - Verify Login with Valid Credentials', async ({ api }) => {
  const email = process.env.TEST_USER_EMAIL;
  const password = process.env.TEST_USER_PASSWORD;

  const response = await api.auth.verifyLogin({ email, password });
  const body = await response.json();

  // Validate the API response.
  expect(body.responseCode).toBe(200);
  expect(body.message).toBe('User exists!');
});

test('@api API-008 - Verify Login without Email', async ({ api }) => {
  const password = process.env.TEST_USER_PASSWORD;

  const response = await api.auth.verifyLoginWihtouEmail(password);

  // Validate the actual HTTP status.
  expect(response.status()).toBe(200);

  const body = await response.json();

  // Validate the API-level error response.
  expect(body.responseCode).toBe(400);
  expect(body.message).toBe('Bad request, email or password parameter is missing in POST request.');
});
