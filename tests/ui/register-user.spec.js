import { expect, test } from '@playwright/test';

import { AccountInformationPage } from '../../pages/account-information.page.js';
import { AccountStatusPage } from '../../pages/account-status.page.js';
import { HomePage } from '../../pages/home.page.js';
import { SignupLoginPage } from '../../pages/signup-login.page.js';

test('@ui @smoke UI-001 - Register User', async ({ page }) => {
  const uniqueId = `${Date.now()}${Math.floor(Math.random() * 1000)}`;

  const user = {
    name: `UI Test User ${uniqueId}`,
    email: `ui.test.${uniqueId}@example.com`,
    password: 'TestPassword123!',
    birthDay: '10',
    birthMonth: '5',
    birthYear: '1995',
    firstName: 'UI',
    lastName: 'Tester',
    company: 'Test Company',
    address: '123 Test Street',
    address2: 'Suite 1',
    country: 'India',
    state: 'Test State',
    city: 'Test City',
    zipcode: '12345',
    mobileNumber: '1234567890',
  };

  const homePage = new HomePage(page);
  const signupLoginPage = new SignupLoginPage(page);
  const accountInformationPage = new AccountInformationPage(page);
  const accountStatusPage = new AccountStatusPage(page);

  // 1–3: Open the application and verify the home page.
  await homePage.navigate();
  await homePage.verifyHomePage();

  // 4–7: Navigate to signup and submit a unique email.
  await homePage.clickSignupLogin();
  await signupLoginPage.verifyNewUserSignupVisible();
  await signupLoginPage.signup(user.name, user.email);

  // 8–12: Fill in the account information.
  await accountInformationPage.verifyAccountInformationVisible();
  await accountInformationPage.fillAccountInformation(user);

  // 13–14: Create the account and verify success.
  await accountInformationPage.createAccount();
  await accountStatusPage.verifyAccountCreated();

  // 15–16: Continue and verify the logged-in username.
  await accountStatusPage.continue();
  await accountStatusPage.verifyLoggedInAs(user.name);

  // 17–18: Delete the test account and verify success.
  await accountStatusPage.deleteAccount();
  await accountStatusPage.verifyAccountDeleted();
  await accountStatusPage.continue();

  // Verify we returned to the home page.
  await expect(page).toHaveURL(/\/?$/);
  await homePage.verifyHomePage();
});
