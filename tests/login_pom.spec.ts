import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage'; // This tells the robot to look at the Phone Book

test('User can login successfully using POM', async ({ page }) => {
  const loginPage = new LoginPage(page);

  // 1. Go to the website
  await loginPage.goto();

  // 2. Perform the login using the method from our Phone Book
  await loginPage.login('standard_user', 'secret_sauce');

  // 3. Check if we actually made it to the inventory page
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  
  const uniqueId = Date.now(); // Gets a number like 1711141320000
await page.screenshot({ path: `screenshots/login_${uniqueId}.png` });
});
