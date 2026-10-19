import { expect, test } from '@playwright/test';
import path from 'node:path';

import { ContactUsPage } from '../../pages/contact-us.page.js';
import { HomePage } from '../../pages/home.page.js';
import { SignupLoginPage } from '../../pages/signup-login.page.js';

const existingEmail = process.env.TEST_USER_EMAIL;
const contactEmail = process.env.TEST_USER_EMAIL;

test.describe('Signup, Contact Us, and Navigation', () => {
  // UI-005: Register with Existing Email
  test('@ui @regression UI-005 - Register with Existing Email', async ({ page }) => {
    const homePage = new HomePage(page);
    const signupLoginPage = new SignupLoginPage(page);

    await homePage.navigate();
    await homePage.clickSignupLogin();
    await signupLoginPage.verifyNewUserSignupVisible();

    await signupLoginPage.signup(`Duplicate Test ${Date.now()}`, existingEmail);

    await expect(page.getByText('Email Address already exist!', { exact: true })).toBeVisible();
  });

  // UI-006: Contact Us Form with File Upload
  test('@ui @regression UI-006 - Contact Us Form', async ({ page }) => {
    const homePage = new HomePage(page);
    const contactUsPage = new ContactUsPage(page);

    const filePath = path.resolve('fixtures/contact-upload.txt');

    await homePage.navigate();
    await homePage.clickContactUs();
    await contactUsPage.verifyPageVisible();

    await contactUsPage.submitContactForm(
      {
        name: 'Playwright Contact Test',
        email: contactEmail,
        subject: 'UI Automation Contact Test',
        message: 'Testing the contact form and file upload with Playwright.',
      },
      filePath,
    );
    await contactUsPage.submitForm();
    await contactUsPage.verifySubmissionSuccess();
  });

  // UI-007: Verify Test Cases Page
  test('@ui @smoke UI-007 - Verify Test Cases Page', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.navigate();
    await homePage.clickTestCases();

    await expect(page).toHaveURL(/\/test_cases/);
    await expect(await page.locator('b:has-text("TEST CASES")')).toBeVisible();
  });
});
