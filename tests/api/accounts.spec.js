import { expect, test } from '../../fixtures/api.fixture.js';

test('@api @smoke API-011 - Create/Register User Account', async ({ api }) => {
  const uniqueId = `${Date.now()}${Math.floor(Math.random() * 1000)}`;
  const password = 'TestPassword123!';

  const accountDetails = {
    name: `Test User ${uniqueId}`,
    email: `test.user.${uniqueId}@example.com`,
    password,
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

  // Preserve the original registration assertions.
  expect(body.responseCode).toBe(201);
  expect(body.message).toBe('User created!');

  // Cleanup: delete the temporary account.
  const deleteResponse = await api.accounts.deleteAccount({
    email: accountDetails.email,
    password,
  });

  expect(deleteResponse.status()).toBe(200);

  const deleteBody = await deleteResponse.json();

  expect(deleteBody.responseCode).toBe(200);
  expect(deleteBody.message).toBe('Account deleted!');
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

test('@api API-013 - Update User Account', async ({ api }) => {
  const uniqueId = `${Date.now()}${Math.floor(Math.random() * 1000)}`;
  const password = 'TestPassword123!';

  const accountDetails = {
    name: `Update Test ${uniqueId}`,
    email: `update.test.${uniqueId}@example.com`,
    password,
    title: 'Mr',
    birth_date: '10',
    birth_month: '5',
    birth_year: '1995',
    firstname: 'Update',
    lastname: 'Original',
    company: 'Test Company',
    address1: '123 Test Street',
    address2: 'Suite 1',
    country: 'India',
    zipcode: '12345',
    state: 'Test State',
    city: 'Test City',
    mobile_number: '1234567890',
  };

  // Arrange: create an account to update.
  const createResponse = await api.accounts.createAccount(accountDetails);

  expect(createResponse.status()).toBe(200);

  const createBody = await createResponse.json();

  expect(createBody.responseCode).toBe(201);
  expect(createBody.message).toBe('User created!');

  // Act: update the account while keeping its email unchanged.
  const updatedAccountDetails = {
    ...accountDetails,
    name: `Updated Test ${uniqueId}`,
    firstname: 'Updated',
    lastname: 'Account',
    company: 'Updated Test Company',
  };

  try {
    const updateResponse = await api.accounts.updateAccount(updatedAccountDetails);

    expect(updateResponse.status()).toBe(200);

    const updateBody = await updateResponse.json();

    // Assert: verify the API confirms the update.
    expect(updateBody.responseCode).toBe(200);
    expect(updateBody.message).toBe('User updated!');
  } finally {
    // Cleanup: delete the temporary account.
    const deleteResponse = await api.accounts.deleteAccount({
      email: accountDetails.email,
      password,
    });

    expect(deleteResponse.status()).toBe(200);

    const deleteBody = await deleteResponse.json();

    expect(deleteBody.responseCode).toBe(200);
    expect(deleteBody.message).toBe('Account deleted!');
  }
});

test('@api @smoke API-014 - Get User Details by Email', async ({ api }) => {
  const uniqueId = `${Date.now()}${Math.floor(Math.random() * 1000)}`;
  const password = 'TestPassword123!';

  const accountDetails = {
    name: `Details Test ${uniqueId}`,
    email: `details.test.${uniqueId}@example.com`,
    password,
    title: 'Mr',
    birth_date: '10',
    birth_month: '5',
    birth_year: '1995',
    firstname: 'Details',
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

  // Arrange: create a user to retrieve.
  const createResponse = await api.accounts.createAccount(accountDetails);

  expect(createResponse.status()).toBe(200);

  const createBody = await createResponse.json();

  expect(createBody.responseCode).toBe(201);
  expect(createBody.message).toBe('User created!');

  try {
    // Act: retrieve the account by its email.
    const response = await api.accounts.getUserDetailsByEmail(accountDetails.email);

    expect(response.status()).toBe(200);

    const body = await response.json();

    // Assert: validate the API response and retrieved user.
    expect(body.responseCode).toBe(200);
    expect(body.user).toEqual(
      expect.objectContaining({
        email: accountDetails.email,
        name: accountDetails.name,
      }),
    );
  } finally {
    // Cleanup: remove the temporary account.
    const deleteResponse = await api.accounts.deleteAccount({
      email: accountDetails.email,
      password,
    });

    expect(deleteResponse.status()).toBe(200);

    const deleteBody = await deleteResponse.json();

    expect(deleteBody.responseCode).toBe(200);
    expect(deleteBody.message).toBe('Account deleted!');
  }
});
