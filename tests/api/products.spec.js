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
