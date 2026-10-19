import { test } from '@playwright/test';

import { HomePage } from '../../pages/home.page.js';
import { ProductsPage } from '../../pages/products.page.js';
import { SignupLoginPage } from '../../pages/signup-login.page.js';
import { completeOrder, createTestUser, registerUser } from '../../utils/checkout.helper.js';

const email = process.env.TEST_USER_EMAIL;
const password = process.env.TEST_USER_PASSWORD;

test.describe('Checkout Workflows', () => {
  // UI-014: Place Order - Register During Checkout
  test('@ui @regression UI-014 - Register During Checkout', async ({ page }) => {
    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);
    const user = createTestUser();

    await homePage.navigate();
    await homePage.clickProducts();
    await productsPage.verifyProductsPageVisible();

    await productsPage.addFirstProductToCart();
    await productsPage.viewCartFromModal();

    await page
      .getByText('Proceed To Checkout', {
        exact: true,
      })
      .click();

    await page
      .locator('#checkoutModal')
      .getByRole('link', {
        name: /Register\s*\/\s*Login/i,
      })
      .click();

    await registerUser(page, user);
    await completeOrder(page);
  });

  // UI-015: Place Order - Register Before Checkout
  test('@ui @regression UI-015 - Register Before Checkout', async ({ page }) => {
    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);
    const user = createTestUser();

    await homePage.navigate();
    await registerUser(page, user);

    await homePage.navigate();
    await homePage.clickProducts();
    await productsPage.verifyProductsPageVisible();

    await productsPage.addFirstProductToCart();
    await productsPage.viewCartFromModal();

    await completeOrder(page);
  });

  // UI-016: Place Order - Login Before Checkout
  test('@ui @regression UI-016 - Login Before Checkout', async ({ page }) => {
    const homePage = new HomePage(page);
    const signupLoginPage = new SignupLoginPage(page);
    const productsPage = new ProductsPage(page);

    await homePage.navigate();
    await homePage.clickSignupLogin();

    await signupLoginPage.verifyLoginFormVisible();
    await signupLoginPage.login(email, password);
    await signupLoginPage.verifyLoggedIn();

    await homePage.navigate();
    await homePage.clickProducts();
    await productsPage.verifyProductsPageVisible();

    await productsPage.addFirstProductToCart();
    await productsPage.viewCartFromModal();

    await completeOrder(page);
  });
});
