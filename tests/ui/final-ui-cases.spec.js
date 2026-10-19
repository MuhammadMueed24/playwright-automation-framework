import { expect, test } from '@playwright/test';

import { CartPage } from '../../pages/cart.page.js';
import { CheckoutPage } from '../../pages/checkout.page.js';
import { HomePage } from '../../pages/home.page.js';
import { ProductsPage } from '../../pages/products.page.js';
import { SignupLoginPage } from '../../pages/signup-login.page.js';
import { completeOrder, createTestUser, registerUser } from '../../utils/checkout.helper.js';

const email = process.env.TEST_USER_EMAIL;
const password = process.env.TEST_USER_PASSWORD;

test.describe('Final UI Test Cases', () => {
  // UI-023: Verify Address Details in Checkout
  test('@ui @regression UI-023 - Verify Address Details in Checkout', async ({ page }) => {
    const home = new HomePage(page);
    const login = new SignupLoginPage(page);
    const products = new ProductsPage(page);
    const cart = new CartPage(page);
    const checkout = new CheckoutPage(page);

    await home.navigate();
    await home.clickSignupLogin();

    await login.verifyLoginFormVisible();
    await login.login(email, password);
    await login.verifyLoggedIn();

    await home.clickProducts();
    await products.verifyProductsPageVisible();
    await products.addFirstProductToCart();
    await products.viewCartFromModal();

    await cart.navigate();
    await cart.proceedToCheckout();

    await checkout.verifyAddressDetailsVisible();
  });

  // UI-024: Download Invoice after Purchase
  test('@ui @regression UI-024 - Download Invoice after Purchase', async ({ page }) => {
    const home = new HomePage(page);
    const products = new ProductsPage(page);
    const checkout = new CheckoutPage(page);
    const user = createTestUser();

    await home.navigate();
    await registerUser(page, user);

    await home.clickProducts();
    await products.verifyProductsPageVisible();
    await products.addFirstProductToCart();
    await products.viewCartFromModal();

    await completeOrder(page);

    const download = await checkout.downloadInvoice();

    expect(download.suggestedFilename()).toMatch(/invoice/i);
  });

  // UI-025: Scroll Up Using Arrow and Scroll Down
  test('@ui @regression UI-025 - Scroll Up Using Arrow', async ({ page }) => {
    const home = new HomePage(page);

    await home.navigate();
    await page.locator('#footer').scrollIntoViewIfNeeded();
    await expect(page.locator('#footer')).toBeInViewport();

    const scrollUpButton = page.locator('#scrollUp');
    await expect(scrollUpButton).toBeVisible();
    await scrollUpButton.click();

    page
      .getByRole('heading', {
        name: /Full-Fledged practice website for Automation Engineers/,
      })
      .first();
  });

  test('@ui @regression UI-026 - Scroll Up without Arrow', async ({ page }) => {
    const home = new HomePage(page);

    await home.navigate();

    await page.evaluate(() => {
      // eslint-disable-next-line no-undef
      window.scrollTo(0, document.body.scrollHeight);
    });

    await expect(page.locator('#footer')).toBeInViewport();

    await page.evaluate(() => {
      // eslint-disable-next-line no-undef
      window.scrollTo(0, 0);
    });

    page
      .getByRole('heading', {
        name: /Full-Fledged practice website for Automation Engineers/,
      })
      .first();
  });
});
