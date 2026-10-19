import { test } from '@playwright/test';

import { CartPage } from '../../pages/cart.page.js';
import { HomePage } from '../../pages/home.page.js';
import { ProductsPage } from '../../pages/products.page.js';

test.describe('Cart Basics', () => {
  // UI-011: Subscription on Cart Page
  test('@ui @regression UI-011 - Subscription on Cart Page', async ({ page }) => {
    const cartPage = new CartPage(page);
    const email = `cart.subscription.${Date.now()}@example.com`;

    await cartPage.navigate();
    await cartPage.subscribe(email);
  });

  // UI-012: Add Products to Cart and verify price, quantity, total
  test('@ui @regression UI-012 - Add Products to Cart', async ({ page }) => {
    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    await homePage.navigate();
    await homePage.clickProducts();
    await productsPage.verifyProductsPageVisible();
    await productsPage.addFirstProductToCart();
    await productsPage.viewCartFromModal();

    await cartPage.verifyCartHasProducts();
    await cartPage.verifyFirstProductPriceAndTotal();
  });

  // UI-013: Verify Product Quantity in Cart
  test('@ui @regression UI-013 - Verify Product Quantity in Cart', async ({ page }) => {
    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    await homePage.navigate();
    await homePage.clickProducts();
    await productsPage.verifyProductsPageVisible();

    await productsPage.openFirstProduct();
    await productsPage.addFirstProductFromDetailsToCart();
    await productsPage.viewCartFromModal();

    await cartPage.verifyCartHasProducts();
    await cartPage.verifyFirstProductQuantity(4);
  });
});
