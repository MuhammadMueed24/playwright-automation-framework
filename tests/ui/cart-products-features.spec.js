import { test } from '@playwright/test';

import { CartPage } from '../../pages/cart.page.js';
import { HomePage } from '../../pages/home.page.js';
import { ProductsPage } from '../../pages/products.page.js';
import { SignupLoginPage } from '../../pages/signup-login.page.js';

const email = process.env.TEST_USER_EMAIL;
const password = process.env.TEST_USER_PASSWORD;

test.describe('Cart and Product Features', () => {
  // UI-017: Remove Products from Cart
  test('@ui @regression UI-017 - Remove Products from Cart', async ({ page }) => {
    const home = new HomePage(page);
    const products = new ProductsPage(page);
    const cart = new CartPage(page);

    await home.navigate();
    await home.clickProducts();
    await products.verifyProductsPageVisible();
    await products.addFirstProductToCart();
    await products.viewCartFromModal();

    await cart.verifyCartHasProducts();
    await cart.removeFirstProduct();
    await cart.verifyCartIsEmpty();
  });

  // UI-018: View Category Products
  test('@ui @regression UI-018 - View Category Products', async ({ page }) => {
    const home = new HomePage(page);
    const products = new ProductsPage(page);

    await home.navigate();
    await home.clickProducts();
    await products.verifyCategorySidebarVisible();

    await products.openCategory('Women');
    await products.openSubcategory('Dress');
    await products.verifyCategoryHeading('Women - Dress Products');
  });

  // UI-019: View and Cart Brand Products
  test('@ui @regression UI-019 - View and Cart Brand Products', async ({ page }) => {
    const home = new HomePage(page);
    const products = new ProductsPage(page);
    const cart = new CartPage(page);

    await home.navigate();
    await home.clickProducts();
    await products.verifyBrandsSidebarVisible();

    await products.openBrand('H&M');
    await products.verifyBrandHeading('H&M');
    await products.verifyBrandPageVisible();

    await products.addFirstProductToCart();
    await products.viewCartFromModal();
    await cart.verifyCartHasProducts();
  });

  // UI-020: Search Products and Verify Cart After Login
  test('@ui @regression UI-020 - Search Products and Verify Cart After Login', async ({ page }) => {
    const home = new HomePage(page);
    const products = new ProductsPage(page);
    const cart = new CartPage(page);
    const signupLogin = new SignupLoginPage(page);

    await home.navigate();
    await home.clickProducts();
    await products.searchProduct('Top');
    await products.verifySearchResults('Top');

    const productName = await page
      .locator('.features_items .product-image-wrapper')
      .first()
      .locator('.productinfo p')
      .innerText();

    await products.addFirstProductToCart();
    await products.viewCartFromModal();
    await cart.verifyProductNameVisible(productName);

    // Log in, then check whether the cart still contains the product.
    await home.navigate();
    await home.clickSignupLogin();
    await signupLogin.verifyLoginFormVisible();
    await signupLogin.login(email, password);
    await signupLogin.verifyLoggedIn();

    await cart.navigate();
    await cart.verifyProductNameVisible(productName);
  });

  // UI-021: Add Review on Product
  test('@ui @regression UI-021 - Add Review on Product', async ({ page }) => {
    const home = new HomePage(page);
    const products = new ProductsPage(page);

    await home.navigate();
    await home.clickProducts();
    await products.verifyProductsPageVisible();
    await products.openFirstProduct();

    await products.verifyProductDetailsVisible();
    await products.verifyReviewFormVisible();

    await products.submitReview({
      name: 'Playwright Reviewer',
      email: `review.${Date.now()}@example.com`,
      message: 'This product review was submitted by UI automation.',
    });

    await products.verifyReviewSuccess();
  });

  // UI-022: Add to Cart from Recommended Items
  test('@ui @regression UI-022 - Add to Cart from Recommended Items', async ({ page }) => {
    const home = new HomePage(page);
    const products = new ProductsPage(page);
    const cart = new CartPage(page);

    await home.navigate();
    await page.locator('#recommended-item-carousel').scrollIntoViewIfNeeded();

    await products.addRecommendedProductToCart();
    await products.viewCartFromModal();

    await cart.verifyCartHasProducts();
  });
});
