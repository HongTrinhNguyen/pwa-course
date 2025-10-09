import { test, expect } from '@playwright/test';
import dataDev from './data/data-dev.json';
import dataProd from './data/data-prod.json';
import { NewProductPage } from '../../page/product/new.product.page';
import { LoginPage } from '../../page/product/login.page';
import { loadEnvFile } from 'process';
import { loadEnvInfo } from './util';

let data: any;
let username: string;
let password: string;
let loginPage: LoginPage;
let newProductPage: NewProductPage;
require('dotenv').config();


test.beforeEach(async ({ page }) => {
  const locatorDoashboardHeaiding = page.getByRole('heading', { name: 'Dashboard' });
  data = process.env.ENV === 'dev' ? dataDev : dataProd;
  console.log("data: " + JSON.stringify(data));
  username = loadEnvInfo("dev").validUsername || "";
  password = loadEnvInfo("dev").password || "";

  await test.step("Login successfully", async () => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage("dev");
    await loginPage.login(username, password);
    await expect(locatorDoashboardHeaiding).toBeVisible();
  })

  await test.step("Go to add product page", async () => {
    newProductPage = new NewProductPage(page);
    await newProductPage.navigateToNewProductPage();
    const locatorProductHeading = await newProductPage.getLocatorAddNewProductHeading();
    await expect(locatorProductHeading).toHaveText(data.new_product_page.expected.heading_add_new_product);
  })

});

test('Verify that user can create a new product', async ({ page }) => {
  await newProductPage.addNewProduct(
    data.new_product_page.data.name_product,
    data.new_product_page.data.regular_price,
    data.new_product_page.data.sale_price);

  await expect(page.getByText('Product published. View Product')).toBeVisible();
});