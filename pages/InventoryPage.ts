import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly backpackAddToCartButton: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    // The button to add the bag
    this.backpackAddToCartButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    // The little red number circle on the cart icon
    this.cartBadge = page.locator('.shopping_cart_badge');
    // The cart button to review cart
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
  }

  async addBackpack() {
    await this.backpackAddToCartButton.click();
  }
  async goToCart() {
  await this.cartLink.click();
  }
}