import { expect } from '@playwright/test';

export class AccountInformationPage {
  constructor(page) {
    this.page = page;

    this.heading = page.getByText('ENTER ACCOUNT INFORMATION');

    this.titleMr = page.locator('#id_gender1');
    this.name = page.locator('#name');
    this.email = page.locator('#email');
    this.password = page.locator('#password');

    this.birthDay = page.locator('#days');
    this.birthMonth = page.locator('#months');
    this.birthYear = page.locator('#years');

    this.newsletter = page.locator('#newsletter');
    this.specialOffers = page.locator('#optin');

    this.firstName = page.locator('#first_name');
    this.lastName = page.locator('#last_name');
    this.company = page.locator('#company');
    this.address = page.locator('#address1');
    this.address2 = page.locator('#address2');
    this.country = page.locator('#country');
    this.state = page.locator('#state');
    this.city = page.locator('#city');
    this.zipcode = page.locator('#zipcode');
    this.mobileNumber = page.locator('#mobile_number');

    this.createAccountButton = page.locator('[data-qa="create-account"]');
  }

  async verifyAccountInformationVisible() {
    await expect(this.heading).toBeVisible();
  }

  async fillAccountInformation(user) {
    await this.titleMr.check();

    // Name and email are carried forward from the signup form.
    await expect(this.name).toHaveValue(user.name);
    await expect(this.email).toHaveValue(user.email);

    await this.password.fill(user.password);

    await this.birthDay.selectOption(user.birthDay);
    await this.birthMonth.selectOption(user.birthMonth);
    await this.birthYear.selectOption(user.birthYear);

    await this.newsletter.check();
    await this.specialOffers.check();

    await this.firstName.fill(user.firstName);
    await this.lastName.fill(user.lastName);
    await this.company.fill(user.company);
    await this.address.fill(user.address);
    await this.address2.fill(user.address2);
    await this.country.selectOption({ label: user.country });
    await this.state.fill(user.state);
    await this.city.fill(user.city);
    await this.zipcode.fill(user.zipcode);
    await this.mobileNumber.fill(user.mobileNumber);
  }

  async createAccount() {
    await this.createAccountButton.click();
  }
}
