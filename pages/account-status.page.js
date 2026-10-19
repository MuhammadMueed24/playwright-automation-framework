import { expect } from '@playwright/test';

export class AccountStatusPage {
  constructor(page) {
    this.page = page;

    this.accountCreatedHeading = page.locator(':text("ACCOUNT CREATED!")');

    this.accountDeletedHeading = page.locator(':text("ACCOUNT DELETED!")');

    this.continueButton = page.locator('[data-qa="continue-button"]');

    this.deleteAccountLink = page.getByRole('link', {
      name: 'Delete Account',
    });
  }

  async verifyAccountCreated() {
    await expect(this.accountCreatedHeading).toBeVisible();
  }

  async continue() {
    await this.continueButton.click();
  }

  async verifyLoggedInAs(username) {
    await expect(
      this.page.locator('a').filter({
        hasText: `Logged in as ${username}`,
      }),
    ).toBeVisible();
  }
  async deleteAccount() {
    await this.deleteAccountLink.click();
  }

  async verifyAccountDeleted() {
    await expect(this.accountDeletedHeading).toBeVisible();
  }
}
