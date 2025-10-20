import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.locator('body').click();
  await page.goto('https://e-commerce.betterbytesvn.com/wp-login.php?redirect_to=https%3A%2F%2Fe-commerce.betterbytesvn.com%2Fwp-admin%2Fedit.php%3Fpost_type%3Dproduct%26page%3Dproduct-reviews%26paged%3D1&reauth=1');
  await page.getByText('Log In Powered by WordPress').click();
  await page.getByRole('textbox', { name: 'Username or Email Address' }).click();
  await page.getByRole('textbox', { name: 'Username or Email Address' }).dblclick();
  await page.getByRole('textbox', { name: 'Username or Email Address' }).fill('pw101');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('vB30(jIwq2Jn6GloUu&asCKP');
  await page.getByRole('button', { name: 'Log In' }).click();
  await page.getByRole('menuitem', { name: ' E-commerce site for' }).click();
});