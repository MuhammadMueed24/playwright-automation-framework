import { AccountInformationPage } from '../pages/account-information.page.js';
import { AccountStatusPage } from '../pages/account-status.page.js';
import { CheckoutPage } from '../pages/checkout.page.js';
import { HomePage } from '../pages/home.page.js';
import { SignupLoginPage } from '../pages/signup-login.page.js';

export function createTestUser() {
  const id = `${Date.now()}${Math.floor(Math.random() * 1000)}`;

  return {
    name: `Checkout User ${id}`,
    email: `checkout.${id}@example.com`,
    password: 'TestPassword123!',
    birthDay: '10',
    birthMonth: '5',
    birthYear: '1995',
    firstName: 'Checkout',
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
}

export async function registerUser(page, user) {
  const homePage = new HomePage(page);
  const signupLoginPage = new SignupLoginPage(page);
  const accountInfoPage = new AccountInformationPage(page);
  const accountStatusPage = new AccountStatusPage(page);

  await homePage.clickSignupLogin();
  await signupLoginPage.verifyNewUserSignupVisible();
  await signupLoginPage.signup(user.name, user.email);

  await accountInfoPage.verifyAccountInformationVisible();
  await accountInfoPage.fillAccountInformation(user);
  await accountInfoPage.createAccount();

  await accountStatusPage.verifyAccountCreated();
  await accountStatusPage.continue();
  await accountStatusPage.verifyLoggedInAs(user.name);
}

export async function completeOrder(page) {
  const checkoutPage = new CheckoutPage(page);

  await page.goto('/view_cart');
  await page.getByText('Proceed To Checkout', { exact: true }).click();

  await checkoutPage.verifyAddressDetailsVisible();
  await checkoutPage.placeOrder();
  await checkoutPage.payForOrder();
}
