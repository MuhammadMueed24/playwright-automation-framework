import { expect } from '@playwright/test';

export class CheckoutPage {
  constructor(page) {
    this.page = page;

    this.deliveryAddress = page.locator('#address_delivery');
    this.billingAddress = page.locator('#address_invoice');

    this.comment = page.locator('textarea[name="message"]');
    this.placeOrderLink = page.getByRole('link', {
      name: 'Place Order',
    });

    this.nameOnCard = page.locator('[data-qa="name-on-card"]');
    this.cardNumber = page.locator('[data-qa="card-number"]');
    this.cvc = page.locator('[data-qa="cvc"]');
    this.expiryMonth = page.locator('[data-qa="expiry-month"]');
    this.expiryYear = page.locator('[data-qa="expiry-year"]');
    this.payButton = page.locator('[data-qa="pay-button"]');

    this.orderPlacedHeading = page.locator('b:has-text("ORDER PLACED!")');
  }

  async verifyAddressDetailsVisible() {
    await expect(this.deliveryAddress).toBeVisible();
    await expect(this.billingAddress).toBeVisible();
  }

  async placeOrder() {
    await this.comment.fill('Playwright checkout test');
    await this.placeOrderLink.click();
  }

  async payForOrder() {
    await this.nameOnCard.fill('Playwright Test User');
    await this.cardNumber.fill('4111111111111111');
    await this.cvc.fill('123');
    await this.expiryMonth.fill('12');
    await this.expiryYear.fill('2030');

    await this.payButton.click();
    await expect(this.orderPlacedHeading).toBeVisible();
  }
  async verifyAddressDetailsNotEmpty() {
    await expect(this.deliveryAddress).toBeVisible();
    await expect(this.billingAddress).toBeVisible();

    await expect(this.deliveryAddress).not.toBeEmpty();
    await expect(this.billingAddress).not.toBeEmpty();
  }

  async downloadInvoice() {
    const downloadPromise = this.page.waitForEvent('download');

    await this.page
      .getByRole('link', {
        name: 'Download Invoice',
      })
      .click();

    const download = await downloadPromise;

    expect(download.suggestedFilename()).toMatch(/invoice/i);

    return download;
  }
}
