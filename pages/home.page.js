import { expect } from '@playwright/test';

export class HomePage {
  constructor(page) {
    this.page = page;

    this.homeHeading = page.getByRole('heading', {
      name: 'Full-Fledged practice website for Automation Engineers',
      exact: true,
    });

    this.signupLoginLink = page.getByRole('link', {
      name: 'Signup / Login',
    });

    this.contactUsLink = page.getByRole('link', {
      name: 'Contact us',
    });

    this.testCasesLink = page.locator('a').filter({ hasText: 'Test Cases' }).first();

    this.productsLink = page.getByRole('link', {
      name: 'Products',
    });

    this.subscriptionEmail = page.locator('#susbscribe_email');
    this.subscriptionButton = page.locator('#subscribe');

    this.subscriptionSuccess = page.locator('#success-subscribe');
  }

  async navigate() {
    await this.page.goto('/', {
      waitUntil: 'domcontentloaded',
    });

    await this.verifyHomePage();
  }

  async verifyHomePage() {
    await expect(this.homeHeading).toBeVisible();
  }

  async clickSignupLogin() {
    await this.signupLoginLink.click();
  }

  async clickContactUs() {
    await this.contactUsLink.click();
  }

  async clickTestCases() {
    await this.testCasesLink.click();
  }

  async clickProducts() {
    await this.productsLink.click();
  }

  async subscribe(email) {
    await this.subscriptionEmail.scrollIntoViewIfNeeded();
    await this.subscriptionEmail.fill(email);
    await this.subscriptionButton.click();
  }

  async verifySubscriptionSuccess() {
    await expect(this.subscriptionSuccess).toBeVisible();
  }
}
