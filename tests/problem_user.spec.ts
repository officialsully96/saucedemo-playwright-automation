import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test('Verify that problem_user sees broken images', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    
    // Define your unique ID here just like before!
    const uniqueId = Date.now();

    await loginPage.goto();
    await loginPage.login('problem_user', 'secret_sauce');

    const imageSource = await inventoryPage.firstItemImage.getAttribute('src');

    // Use the uniqueId in the filename
    await page.screenshot({ path: `screenshots/Evidence/problem_user_bug_${uniqueId}.png` });

    expect(imageSource).toContain('sl-404');
});