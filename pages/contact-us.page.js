import { expect } from '@playwright/test';

export class ContactUsPage {
  constructor(page) {
    this.page = page;

    this.heading = page.getByRole('heading', {
      name: 'Get In Touch',
    });

    this.name = page.locator('[data-qa="name"]');
    this.email = page.locator('[data-qa="email"]');
    this.subject = page.locator('[data-qa="subject"]');
    this.message = page.locator('[data-qa="message"]');
    this.fileUpload = page.locator('input[name="upload_file"]');
    this.submitButton = page.locator('[data-qa="submit-button"]');

    this.successMessage = page.locator('.status.alert.alert-success');
  }

  async verifyPageVisible() {
    await expect(this.heading).toBeVisible();
  }

  async submitContactForm(contact, filePath) {
    await this.name.fill(contact.name);
    await this.email.fill(contact.email);
    await this.subject.fill(contact.subject);
    await this.message.fill(contact.message);
    await this.fileUpload.setInputFiles(filePath);
  }
  async submitForm() {
    this.page.once('dialog', async (dialog) => {
      await dialog.accept();
    });
    await this.page.waitForTimeout(2000);
    await this.submitButton.click();
  }

  async verifySubmissionSuccess() {
    await expect(this.successMessage).toBeVisible();
  }
}
