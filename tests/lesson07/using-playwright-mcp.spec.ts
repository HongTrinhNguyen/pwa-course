import { test, expect } from '@playwright/test';

test.describe('MCP demo page checks', () => {
  const url = 'https://material.playwrightvn.com/02-xpath-product-page.html';

  test('Verify heading and product item counts and cart behavior', async ({ page }) => {
    // Step 1: Navigate and verify heading
    await test.step('Step 01: Open product page and check heading', async () => {
      await page.goto(url);
      const heading = page.getByRole('heading', { name: 'Simple E-commerce' });
      await expect(heading).toBeVisible();
      await expect(heading).toHaveText('Simple E-commerce');
    });
    
    // Step 2: Add products to cart and verify Shopping Cart table
    await test.step('Step 02: Add products to cart and verify shopping cart', async () => {
      // Helper to add product by clicking its Add to Cart button N times
      const addProductTimes = async (productName: string, times: number) => {
        // Use explicit nth Add to Cart button per product as requested
        const indexMap: Record<string, number> = {
          'Product 1': 0,
          'Product 2': 1,
          'Product 3': 2,
        };
        const idx = indexMap[productName];
        // Prefer the explicit button locator
        let addButton = page.getByRole('button', { name: 'Add to Cart' }).nth(idx);

        // If that button doesn't exist or is not visible, fall back to finding the button near the product name
        if (!(await addButton.count())) {
          const productLocator = page.getByText(productName, { exact: true });
          await expect(productLocator).toBeVisible({ timeout: 5000 });
          const container = productLocator.locator('xpath=ancestor::*[self::div or self::article or self::section][1]');
          addButton = container.getByRole('button', { name: /add to cart/i }).first();
        }

        await expect(addButton).toBeVisible({ timeout: 5000 });
        for (let i = 0; i < times; i++) {
          await addButton.click();
          // small pause to allow cart update
          await page.waitForTimeout(300);
        }
      };
      // Helper to verify product in cart table with expected quantity
      const verifyInCart = async (productName: string, quantity: number) => {
        // try to find a table row containing product name
        const row = page.locator(`xpath=//table//tr[.//td[contains(text(), "${productName}")]]`).first();
        await expect(row).toBeVisible({ timeout: 5000 });
        await expect(row).toContainText(String(quantity));        
        await expect(row).toContainText(productName);
      };

      // 1) Add only one 'Product 1'
      await addProductTimes('Product 1', 1);
      await verifyInCart('Product 1', 1);

      // 2) Add only two 'Product 2'
      await addProductTimes('Product 2', 2);
      await verifyInCart('Product 2', 2);

      // 3) Add three 'Product 3'
      await addProductTimes('Product 3', 3);
      await verifyInCart('Product 3', 3);
    });
  });
});
