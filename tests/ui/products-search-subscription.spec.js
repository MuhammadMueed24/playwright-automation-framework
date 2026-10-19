import { test } from '@playwright/test';

import { HomePage } from '../../pages/home.page.js';
import { ProductsPage } from '../../pages/products.page.js';

test.describe('Products and Subscription', () => {
  // UI-008: All Products and Product Details
  test('@ui @smoke UI-008 - All Products and Product Details', async ({ page }) => {
    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);

    await homePage.navigate();
    await homePage.clickProducts();

    await productsPage.verifyProductsPageVisible();
    await productsPage.openFirstProduct();

    await productsPage.verifyProductDetailsVisible();
  });

  // UI-009: Search Product
  test('@ui @regression UI-009 - Search Product', async ({ page }) => {
    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);

    await homePage.navigate();
    await homePage.clickProducts();

    await productsPage.verifyProductsPageVisible();
    await productsPage.searchProduct('Shirt');
    await productsPage.verifySearchResults('Shirt');
  });

  // UI-010: Subscription on Home Page
  test('@ui @regression UI-010 - Subscription on Home Page', async ({ page }) => {
    const homePage = new HomePage(page);

    const email = `subscription.${Date.now()}@example.com`;

    await homePage.navigate();
    await homePage.subscribe(email);
    await homePage.verifySubscriptionSuccess();
  });
});
