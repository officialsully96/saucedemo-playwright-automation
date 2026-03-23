import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test('User can add a backpack to the cart', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  // 1. Login first
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  // 2. Click the "Add to Cart" button
  await inventoryPage.addBackpack();

  const uniqueId = Date.now(); // Gets a number like 1711141320000
  await page.screenshot({ path: `screenshots/cart_${uniqueId}.png` });

  // 3. Click on cart
  await page.locator('[data-test="shopping-cart-link"]').click();

  // 3. THE VALIDATION (The Assertion)
  // We check if the cart badge text is exactly "1"
  await expect(inventoryPage.cartBadge).toHaveText('1');

  // 4. Click on the actual cart icon to go to the Cart Page
  await inventoryPage.goToCart();

  // 5. Final Validation: Check if we are on the cart page
  await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');

  // 6. Check if the item name "Sauce Labs Backpack" is visible in the list
  await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();

  await page.screenshot({ path: `screenshots/cartlink_${uniqueId}.png` });
}
);