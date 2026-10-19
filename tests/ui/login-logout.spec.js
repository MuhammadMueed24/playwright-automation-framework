import { test } from '@playwright/test';

import { HomePage } from '../../pages/home.page.js';
import { SignupLoginPage } from '../../pages/signup-login.page.js';

const email = process.env.TEST_USER_EMAIL;
const password = process.env.TEST_USER_PASSWORD;

test.describe('Login and Logout', () => {
  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.navigate();
    await homePage.clickSignupLogin();
  });

  // UI-002: Login with Correct Credentials
  test('@ui @smoke UI-002 - Login with Correct Credentials', async ({ page }) => {
    const signupLoginPage = new SignupLoginPage(page);

    await signupLoginPage.verifyLoginFormVisible();
    await signupLoginPage.login(email, password);
    await signupLoginPage.verifyLoggedIn();
  });

  // UI-003: Login with Incorrect Credentials
  test('@ui @regression UI-003 - Login with Incorrect Credentials', async ({ page }) => {
    const signupLoginPage = new SignupLoginPage(page);

    await signupLoginPage.verifyLoginFormVisible();
    await signupLoginPage.login(`invalid.${Date.now()}@example.com`, 'WrongPassword123!');

    await signupLoginPage.verifyInvalidLoginMessage();
  });

  // UI-004: Logout User
  test('@ui @smoke UI-004 - Logout User', async ({ page }) => {
    const signupLoginPage = new SignupLoginPage(page);

    await signupLoginPage.verifyLoginFormVisible();
    await signupLoginPage.login(email, password);
    await signupLoginPage.verifyLoggedIn();

    await signupLoginPage.logout();

    await signupLoginPage.verifyLoginFormVisible();
  });
});
