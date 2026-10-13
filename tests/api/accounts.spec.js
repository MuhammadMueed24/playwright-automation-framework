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

test('@api API-012 - Delete User Account', async ({ api }) => {
  const uniqueId = `${Date.now()}${Math.floor(Math.random() * 1000)}`;
  const password = 'TestPassword123!';

  const accountDetails = {
    name: `Delete Test ${uniqueId}`,
    email: `delete.test.${uniqueId}@example.com`,
    password,
    title: 'Mr',
    birth_date: '10',
    birth_month: '5',
    birth_year: '1995',
    firstname: 'Delete',
    lastname: 'Test',
    company: 'Test Company',
    address1: '123 Test Street',
    address2: 'Suite 1',
    country: 'India',
    zipcode: '12345',
    state: 'Test State',
    city: 'Test City',
    mobile_number: '1234567890',
  };

  // Arrange: create an account that this test can safely delete.
  const createResponse = await api.accounts.createAccount(accountDetails);

  expect(createResponse.status()).toBe(200);

  const createBody = await createResponse.json();

  expect(createBody.responseCode).toBe(201);
  expect(createBody.message).toBe('User created!');

  // Act: delete the account created by this test.
  const deleteResponse = await api.accounts.deleteAccount({
    email: accountDetails.email,
    password,
  });

  expect(deleteResponse.status()).toBe(200);

  const deleteBody = await deleteResponse.json();

  // Assert: verify that the API reports successful deletion.
  expect(deleteBody.responseCode).toBe(200);
  expect(deleteBody.message).toBe('Account deleted!');
});
