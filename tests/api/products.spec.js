import { expect, test } from '../../fixtures/api.fixture.js';

test('@api @smoke API-001 - Get All Products List', async ({ api }) => {
  const response = await api.products.getProductsList();
  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body.responseCode).toBe(200);
  expect(body.products).toBeInstanceOf(Array);
  expect(body.products.length).toBeGreaterThan(0);

  const firstProduct = body.products[0];

  expect(firstProduct).toEqual(
    expect.objectContaining({
      id: expect.any(Number),
      name: expect.any(String),
      price: expect.any(String),
      brand: expect.any(String),
      category: expect.any(Object),
    }),
  );
  expect(firstProduct.name.length).toBeGreaterThan(0);
});

test('@api API-002 - POST to All Products List', async ({ api }) => {
  const response = await api.products.postProductsList();

  // Validate the actual HTTP status.
  expect(response.status()).toBe(200);

  const body = await response.json();

  // Validate the API-level error response.
  expect(body.responseCode).toBe(405);
  expect(body.message).toBe('This request method is not supported.');
});

test('@api @smoke API-003 - Get All Brands List', async ({ api }) => {
  const response = await api.products.getBrandsList();

  // Validate the actual HTTP status.
  expect(response.status()).toBe(200);

  const body = await response.json();

  // Validate the API response.
  expect(body.responseCode).toBe(200);
  expect(body.brands).toBeInstanceOf(Array);
  expect(body.brands.length).toBeGreaterThan(0);

  // Validate the structure of a brand.
  const firstBrand = body.brands[0];

  expect(firstBrand).toEqual(
    expect.objectContaining({
      id: expect.any(Number),
      brand: expect.any(String),
    }),
  );

  expect(firstBrand.brand.length).toBeGreaterThan(0);
});

test('@api API-004 - PUT to All Brands List', async ({ api }) => {
  const response = await api.products.putBrandsList();

  // Validate the actual HTTP status.
  expect(response.status()).toBe(200);

  const body = await response.json();

  // Validate the API-level error response.
  expect(body.responseCode).toBe(405);
  expect(body.message).toBe('This request method is not supported.');
});

test('@api @smoke API-005 - Search Product', async ({ api }) => {
  const searchTerm = 'little girls mr. panda shirt';

  const response = await api.products.searchProducts(searchTerm);

  // Validate the actual HTTP status.
  expect(response.status()).toBe(200);

  const body = await response.json();

  // Validate the API response.
  expect(body.responseCode).toBe(200);
  expect(body.products).toBeInstanceOf(Array);
  expect(body.products.length).toBeGreaterThan(0);

  // Validate the structure of a returned product.
  for (const product of body.products) {
    expect(product).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String),
        price: expect.any(String),
        brand: expect.any(String),
        category: expect.any(Object),
      }),
    );

    // Confirm each returned product matches the search term.
    expect(product.name.toLowerCase()).toContain(searchTerm);
  }
});
