import { expect } from '@playwright/test';

export class ProductsPage {
  constructor(page) {
    this.page = page;

    this.allProductsHeading = page.getByRole('heading', { name: 'All Products' });
    this.brandProductsHeading = page.getByRole('heading', { name: 'Brand - H&M Products' });
    this.productCards = page.locator('.features_items .product-image-wrapper');

    this.searchInput = page.locator('#search_product');
    this.searchButton = page.locator('#submit_search');
    this.searchedProductsHeading = page.getByRole('heading', {
      name: 'Searched Products',
    });

    this.productInformation = page.locator('.product-information');
    this.viewCategoryProudct = page.locator('.features_items .product-image-wrapper');
  }

  async verifyBrandPageVisible() {
    await expect(this.brandProductsHeading).toBeVisible();
    await expect(this.productCards.first()).toBeVisible();
  }
  async verifyProductsPageVisible() {
    await expect(this.allProductsHeading).toBeVisible();
    await expect(this.productCards.first()).toBeVisible();
  }
  async verifyProductsVisible() {
    await expect(this.viewCategoryProudct.first()).toBeVisible();
  }

  async openFirstProduct() {
    await this.productCards
      .first()
      .getByRole('link', {
        name: 'View Product',
      })
      .click();
  }

  async verifyProductDetailsVisible() {
    await expect(this.productInformation).toBeVisible();

    await expect(this.productInformation.locator('h2')).toBeVisible();

    await expect(this.productInformation.getByText(/Category:/)).toBeVisible();

    await expect(this.productInformation.getByText(/Availability:/)).toBeVisible();

    await expect(this.productInformation.getByText(/Condition:/)).toBeVisible();

    await expect(this.productInformation.getByText(/Brand:/)).toBeVisible();
  }

  async searchProduct(searchTerm) {
    await this.searchInput.fill(searchTerm);
    await this.searchButton.click();
  }

  async verifySearchResults(searchTerm) {
    const matchingProducts = this.productCards.filter({
      hasText: new RegExp(searchTerm, 'i'),
    });

    await expect(matchingProducts.first()).toBeVisible();
  }

  async addFirstProductToCart() {
    const firstProduct = this.productCards.first();

    await firstProduct.scrollIntoViewIfNeeded();
    await firstProduct.hover();

    const addToCartButton = firstProduct.locator('.product-overlay .add-to-cart').first();

    await expect(addToCartButton).toBeVisible();
    await addToCartButton.click();

    await expect(this.page.locator('#cartModal')).toBeVisible();
  }

  async addFirstProductFromDetailsToCart() {
    await this.page.locator('#quantity').fill('4');

    await this.page.getByRole('button', { name: /add to cart/i }).click();

    await expect(this.page.locator('#cartModal')).toBeVisible();
  }

  async viewCartFromModal() {
    const modal = this.page.locator('#cartModal');

    await expect(modal).toBeVisible();

    await modal.getByRole('link', { name: /view cart/i }).click();

    await expect(this.page).toHaveURL(/\/view_cart/);
  }
  async verifyCategorySidebarVisible() {
    await expect(this.page.locator('#accordian')).toBeVisible();
  }

  async openCategory(category) {
    const categoryLink = this.page.locator('#accordian').getByText(category, { exact: true });

    await categoryLink.scrollIntoViewIfNeeded();
    await categoryLink.click({ force: true });
  }

  async openSubcategory(subcategory) {
    await this.page
      .getByRole('link', {
        name: new RegExp(subcategory, 'i'),
      })
      .click();
  }

  async verifyCategoryHeading(category) {
    await expect(
      this.page.getByRole('heading', {
        name: new RegExp(`^${category}`, 'i'),
      }),
    ).toBeVisible();
  }

  async verifyBrandsSidebarVisible() {
    await expect(this.page.locator('.brands_products')).toBeVisible();
  }

  async openBrand(brand) {
    await this.page
      .locator('.brands-name')
      .getByRole('link', {
        name: new RegExp(brand.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'),
      })
      .click();
  }

  async verifyBrandHeading(brand) {
    await expect(
      this.page.getByRole('heading', {
        name: new RegExp(brand, 'i'),
      }),
    ).toBeVisible();
  }

  async verifyReviewFormVisible() {
    await expect(this.page.getByText('Write Your Review', { exact: true })).toBeVisible();
  }

  async submitReview(review) {
    await this.page.locator('#name').fill(review.name);
    await this.page.locator('#email').fill(review.email);
    await this.page.locator('#review').fill(review.message);
    await this.page.locator('#button-review').click();
  }

  async verifyReviewSuccess() {
    await expect(
      this.page.getByText('Thank you for your review.', {
        exact: true,
      }),
    ).toBeVisible();
  }

  async addRecommendedProductToCart() {
    const recommended = this.page.locator('#recommended-item-carousel');

    await expect(recommended).toBeVisible();

    await recommended.locator('.add-to-cart').first().click();
  }

  async viewCartFrom() {
    const modal = this.page.locator('#cartModal');

    await expect(modal).toBeVisible();

    await modal
      .getByRole('link', {
        name: 'View Cart',
      })
      .click();
  }
}
