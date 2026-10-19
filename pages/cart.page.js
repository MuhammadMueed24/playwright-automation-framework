import { expect } from '@playwright/test';

export class CartPage {
  constructor(page) {
    this.page = page;

    this.cartRows = page.locator('#cart_info_table tbody tr');
    this.proceedToCheckoutButton = page.getByText('Proceed To Checkout', { exact: true });
    this.subscriptionEmail = page.locator('#susbscribe_email');
    this.subscriptionButton = page.locator('#subscribe');
    this.subscriptionSuccess = page.locator('#success-subscribe');
  }

  async navigate() {
    await this.page.goto('/view_cart');
  }

  async subscribe(email) {
    await this.subscriptionEmail.scrollIntoViewIfNeeded();
    await this.subscriptionEmail.fill(email);
    await this.subscriptionButton.click();

    await expect(this.subscriptionSuccess).toBeVisible();
  }

  async verifyCartHasProducts() {
    await expect(this.cartRows.first()).toBeVisible();
  }

  async verifyFirstProductQuantity(expectedQuantity) {
    await expect(this.cartRows.first().locator('.cart_quantity button')).toHaveText(
      String(expectedQuantity),
    );
  }

  async verifyFirstProductPriceAndTotal() {
    const firstRow = this.cartRows.first();

    const priceText = await firstRow.locator('.cart_price').innerText();
    const quantityText = await firstRow.locator('.cart_quantity button').innerText();
    const totalText = await firstRow.locator('.cart_total').innerText();

    const price = Number(priceText.replace(/[^\d.]/g, ''));
    const quantity = Number(quantityText);
    const total = Number(totalText.replace(/[^\d.]/g, ''));

    expect(quantity).toBeGreaterThan(0);
    expect(total).toBe(price * quantity);
  }

  async proceedToCheckout() {
    await this.proceedToCheckoutButton.click();
  }

  async removeFirstProduct() {
    await this.cartRows.first().locator('.cart_quantity_delete').click();
  }

  async verifyCartIsEmpty() {
    await expect(this.cartRows).toHaveCount(0);
  }

  async verifyProductNameVisible(productName) {
    await expect(this.page.locator('#cart_info_table')).toContainText(productName);
  }
}
