import { expect, test } from '../../fixtures/api.fixture.js';

test('@api @smoke API-011 - Create/Register User Account', async ({ api }) => {
  const uniqueId = `${Date.now()}${Math.floor(Math.random() * 1000)}`;

  const accountDetails = {
    name: `Test User ${uniqueId}`,
    email: `test.user.${uniqueId}@example.com`,
    password: 'TestPassword123!',
    title: 'Mr',
    birth_date: '10',
    birth_month: '5',
    birth_year: '1995',
    firstname: 'Test',
    lastname: 'User',
    company: 'Test Company',
    address1: '123 Test Street',
    address2: 'Suite 1',
    country: 'India',
    zipcode: '12345',
    state: 'Test State',
    city: 'Test City',
    mobile_number: '1234567890',
  };

  const response = await api.accounts.createAccount(accountDetails);

  // Validate the actual HTTP status.
  expect(response.status()).toBe(200);

  const body = await response.json();

  // Validate the API-level success response.
  expect(body.responseCode).toBe(201);
  expect(body.message).toBe('User created!');
});
