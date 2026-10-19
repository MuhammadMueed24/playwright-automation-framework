import { expect } from '@playwright/test';

export class SignupLoginPage {
  constructor(page) {
    this.page = page;

    this.newUserSignupHeading = page.getByRole('heading', {
      name: 'New User Signup!',
    });

    this.loginHeading = this.page.getByRole('heading', {
      name: 'Login to your account',
    });

    this.signupName = page.locator('[data-qa="signup-name"]');
    this.signupEmail = page.locator('[data-qa="signup-email"]');
    this.signupButton = page.locator('[data-qa="signup-button"]');

    this.loginEmail = this.page.locator('[data-qa="login-email"]');
    this.loginPassword = this.page.locator('[data-qa="login-password"]');
    this.loginButton = this.page.locator('[data-qa="login-button"]');
    this.loginErrorMessage = this.page.getByText('Your email or password is incorrect!', {
      exact: true,
    });

    this.logoutLink = this.page.getByRole('link', {
      name: 'Logout',
    });
  }

  async verifyNewUserSignupVisible() {
    await expect(this.newUserSignupHeading).toBeVisible();
  }

  async signup(name, email) {
    await this.signupName.fill(name);
    await this.signupEmail.fill(email);
    await this.signupButton.click();
  }

  async verifyLoginFormVisible() {
    await expect(this.loginHeading).toBeVisible();
  }

  async login(email, password) {
    await this.loginEmail.fill(email);
    await this.loginPassword.fill(password);
    await this.loginButton.click();
  }

  async verifyInvalidLoginMessage() {
    await expect(this.loginErrorMessage).toBeVisible();
  }

  async verifyLoggedIn() {
    await expect(this.page.locator('a').filter({ hasText: /Logged in as/ })).toBeVisible();
  }

  async logout() {
    await this.logoutLink.click();
  }
}
