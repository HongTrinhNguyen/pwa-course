import { test, expect } from '@playwright/test';
import { LoginPage } from '../../page/product/login.page';
import { DashboardPage } from '../../page/product/dashboard.page';
import { NewProductPage } from '../../page/product/new.product.page';
import dataDev from './data/data-dev.json';
import dataProd from './data/data-prod.json';
import { loadEnvInfo } from './util';

require('dotenv').config();

const env = process.env.ENV || 'dev';
const data = env === 'dev' ? dataDev : dataProd;
const username = loadEnvInfo(env).validUsername || '';
const password = loadEnvInfo(env).password || '';


test('PRODUCT_001 - Tạo product thành công tren dev', async ({ page }) => {
    process.env.ENV = 'dev';
    const env = process.env.ENV || 'dev';
    const data = env === 'dev' ? dataDev : dataProd;
    const username = loadEnvInfo(env).validUsername || '';
    const password = loadEnvInfo(env).password || '';

    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const newProductPage = new NewProductPage(page);

    await test.step('Login successfully', async () => {
        await loginPage.navigateToLoginPage(env);
        await loginPage.login(username, password);
        const dashboardHeading = await dashboardPage.getDashboardHeading();
        await expect(dashboardHeading).toBeVisible();
    });

    await test.step('Navigate to Add Product page', async () => {
        await newProductPage.navigateToNewProductPage();
        const locatorProductHeading = await newProductPage.getLocatorAddNewProductHeading();
        await expect(locatorProductHeading).toHaveText(data.new_product_page.expected.heading_add_new_product);
    });
    await test.step('Create a new product', async () => {
        await newProductPage.addNewProduct(
            data.new_product_page.data.name_product,
            data.new_product_page.data.regular_price,
            data.new_product_page.data.sale_price);

        const publishedMessageLocator = await newProductPage.getLocatorProductPublishedMessage();
        await expect(publishedMessageLocator).toBeVisible();
    });

    await test.step('Verify new product added', async () => {
        await newProductPage.navigateAllProductList();
        await page.waitForLoadState();
        const locatorNewProduct = await newProductPage.getLocatorProdcutAdded(data.new_product_page.data.name_product)
        await expect(locatorNewProduct).toBeVisible();
    })

    // await test.step("Delete product just created", async () => {
    //     const deletedProduct = await newProductPage.deleteProductAdded(data.new_product_page.data.name_product, env);
    //     await expect(deletedProduct).not.toBeVisible();
    //     const deletedMsgLocator = await newProductPage.getLocatorDeleteNoti();
    //     await deletedMsgLocator.waitFor({ state: "visible" });
    //     await expect(deletedMsgLocator).toContainText(data.new_product_page.expected.deleted_message);
    // });
});

test('PRODUCT_001 - Tạo product thành công tren prod', async ({ page }) => {

    process.env.ENV = 'prod';
    const env = process.env.ENV || 'prod';
    const data = env === 'dev' ? dataDev : dataProd;
    const username = loadEnvInfo(env).validUsername || '';
    const password = loadEnvInfo(env).password || '';

    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const newProductPage = new NewProductPage(page);

    await test.step('Login successfully', async () => {
        await loginPage.navigateToLoginPage(env);
        await loginPage.login(username, password);
        const dashboardHeading = await dashboardPage.getDashboardHeading();
        await expect(dashboardHeading).toBeVisible();
    });

    await test.step('Navigate to Add Product page', async () => {
        await newProductPage.navigateToNewProductPage();
        const locatorProductHeading = await newProductPage.getLocatorAddNewProductHeading();
        await expect(locatorProductHeading).toHaveText(data.new_product_page.expected.heading_add_new_product);
    });
    await test.step('Create a new product', async () => {
        await newProductPage.addNewProduct(
            data.new_product_page.data.name_product,
            data.new_product_page.data.regular_price,
            data.new_product_page.data.sale_price);

        const publishedMessageLocator = await newProductPage.getLocatorProductPublishedMessage();
        await expect(publishedMessageLocator).toBeVisible();
    });

    await test.step('Verify new product added', async () => {
        await newProductPage.navigateAllProductList();
        await page.waitForLoadState();
        const locatorNewProduct = await newProductPage.getLocatorProdcutAdded(data.new_product_page.data.name_product)
        await expect(locatorNewProduct).toBeVisible();
    })

    await test.step("Delete product just created", async () => {
        const deletedProduct = await newProductPage.deleteProductAdded(data.new_product_page.data.name_product, env);
        await expect(deletedProduct).not.toBeVisible();
        const deletedMsgLocator = await newProductPage.getLocatorDeleteNoti();
        await deletedMsgLocator.waitFor({ state: "visible" });
        await expect(deletedMsgLocator).toContainText(data.new_product_page.expected.deleted_message);
    });
});



