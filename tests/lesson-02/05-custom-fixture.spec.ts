import { expect } from '@playwright/test';
import { LoginPage } from '../../page/product/login.page';
import { DashboardPage } from '../../page/product/dashboard.page';
import { NewProductPage } from '../../page/product/new.product.page';
import dataDev from './data/data-dev.json';
import dataProd from './data/data-prod.json';
import { loadEnvInfo } from './util';
import { test } from '../../src/fixture/login.fixture';

test.describe("PRODUCT_002- Tạo product thành công trên- Tạo product thành công trên", () => {
    process.env.ENV = 'dev';
    const env = process.env.ENV || 'dev';
    const data = env === 'dev' ? dataDev : dataProd;

    test('PRODUCT_002 - Tạo product với visibility "Search results only on dev"', {
        annotation: {
            type: "PRODUCT",
            description: "Add new product on prod"
        },
        tag: ["@PRODUCT", "@UI"],
    },
        async ({ loggedInPage }) => {
            const newProductPage = new NewProductPage(loggedInPage);

            await test.step('Navigate to Add Product page', async () => {
                await newProductPage.navigateToNewProductPage();
                const locatorProductHeading = await newProductPage.getLocatorAddNewProductHeading();
                await expect(locatorProductHeading).toHaveText(data.new_product_page.expected.heading_add_new_product);
            });
            await test.step('Create a new product', async () => {
                await newProductPage.addNewOnlySearchProduct(
                    data.new_product_page.data.name_product,
                    data.new_product_page.data.regular_price,
                    data.new_product_page.data.sale_price);

                const publishedMessageLocator = await newProductPage.getLocatorProductPublishedMessage();
                await publishedMessageLocator.waitFor();
                await expect(publishedMessageLocator).toBeVisible();
            });

            await test.step('Verify new product added on All product list', async () => {
                await newProductPage.navigateAllProductList();
                const locatorNewProduct = await newProductPage.getLocatorProdcutAdded(data.new_product_page.data.name_product)
                await expect(locatorNewProduct).toBeVisible();
            })

            await test.step('Verify that the newly added product is not showing on the View Product page', async () => {
                await newProductPage.nagigateViewProductPage();
                const locatorShopHeading = await newProductPage.getLocatorShopHeading();
                await expect(locatorShopHeading).toBeVisible();
                const locatorOnlySearchProduct = await newProductPage.getLocatorProductOnlyResearchOnViewProductPage(data.new_product_page.data.name_product);
                await expect(locatorOnlySearchProduct).toHaveCount(0);

            })
        });
})

test.describe("PRODUCT_002 - Tạo product thành công trên prod", () => {
    process.env.ENV = 'prod';
    const env = process.env.ENV || 'prod';
    const data = env === 'prod' ? dataDev : dataProd;

    test('PRODUCT_002 - Tạo product với visibility "Search results only on prod"', {
        annotation: {
            type: "PRODUCT",
            description: "Add new product on prod"
        },
        tag: ["@PRODUCT", "@UI"],
    },
        async ({ loggedInPage }) => {
            const newProductPage = new NewProductPage(loggedInPage);

            await test.step('Navigate to Add Product page', async () => {
                await newProductPage.navigateToNewProductPage();
                const locatorProductHeading = await newProductPage.getLocatorAddNewProductHeading();
                await expect(locatorProductHeading).toHaveText(data.new_product_page.expected.heading_add_new_product);
            });
            await test.step('Create a new product', async () => {
                await newProductPage.addNewOnlySearchProduct(
                    data.new_product_page.data.name_product,
                    data.new_product_page.data.regular_price,
                    data.new_product_page.data.sale_price);

                const publishedMessageLocator = await newProductPage.getLocatorProductPublishedMessage();
                await publishedMessageLocator.waitFor();
                await expect(publishedMessageLocator).toBeVisible();
            });

            await test.step('Verify new product added on All product list', async () => {
                await newProductPage.navigateAllProductList();
                const locatorNewProduct = await newProductPage.getLocatorProdcutAdded(data.new_product_page.data.name_product)
                await expect(locatorNewProduct).toBeVisible();
            })

            await test.step('Verify that the newly added product is not showing on the View Product page', async () => {
                await newProductPage.nagigateViewProductPage();
                const locatorShopHeading = await newProductPage.getLocatorShopHeading();
                await expect(locatorShopHeading).toBeVisible();
                const locatorOnlySearchProduct = await newProductPage.getLocatorProductOnlyResearchOnViewProductPage(data.new_product_page.data.name_product);
                await expect(locatorOnlySearchProduct).toHaveCount(0);
            })
        });
})


