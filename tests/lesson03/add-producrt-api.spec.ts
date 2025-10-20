import { test, request, expect } from "@playwright/test";
import { LoginPage } from '../../page/product/login.page';
import { loadEnvInfo } from "../lesson-02/util";
import { ProductAdminPage } from "../../page/admin/product.admin.page";
import { ReviewAdminPage } from "../../page/admin/review.admin.page";
import { ProductStorePage } from "../../page/storefront/product.store.page";
import { ReviewStorePage } from "../../page/storefront/review.store.page";
import { DashboardPage } from "../../page/product/dashboard.page";

let loginPage: LoginPage;
let usernameValid: string, passwordValid: string;

require('dotenv').config();

test.describe("PRODUCT 003", {
    annotation: {
        type: "PRODUCT",
        description: "Add review for product created"
    },
    tag: ["@UI", "@PRODUCT_REVIEW", "@CREATE"]
}, () => {
    const env = process.env.ENV || 'dev';
    const { baseUrl, validUsername, password, apiUrl, apiKey } = loadEnvInfo(env);

    let productId: number;
    let requestContext: any;

    test.beforeEach(async ({ page }) => {
        const productAdminPage = new ProductAdminPage(page);
        const productStorePage = new ProductStorePage(page);
        const product = await productAdminPage.getProductInfo("PRODUCT_003")

        await test.step("Create new product", async ({ }) => {
            requestContext = await request.newContext({
                baseURL: apiUrl,
                extraHTTPHeaders: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${apiKey}`
                },
            });
            const response = await requestContext.post(apiUrl, {
                data: {
                    "name": product.productName,
                    "type": "simple",
                    "regular_price": product.regularPrice,
                    "sale_price": product.salePrice,
                },
            });
            expect(response.status()).toBe(201);
            const body = await response.json();
            productId = body.id;
        });

        await test.step('Login success', async () => {
            loginPage = new LoginPage(page);
            loginPage.navigateToLoginPage(process.env.ENV);
            await loginPage.login(process.env.ENV);
            await productAdminPage.navigateAllProductList();
            await productAdminPage.nagigateViewProductPage();
            const shopHeading = await productStorePage.shopHeading();
            await expect(shopHeading).toBeVisible();
        })
    });

    test("PRODUCT-003", async ({ page }) => {
        const dashBoardPage = new DashboardPage(page);
        const productAdminPage = new ProductAdminPage(page);
        const reviewAdminPage = new ReviewAdminPage(page);
        const productStorePage = new ProductStorePage(page);
        const reviewStorePage = new ReviewStorePage(page);

        const review = await reviewAdminPage.getReviewInfo("PRODUCT_003");
        
        for (let i = 1; i <= 2; i++) {
            await test.step("Add hold review for product added", async () => {
                requestContext = await request.newContext({
                    baseURL: apiUrl,
                    extraHTTPHeaders: {
                        'Content-Type': 'application/json',
                        // 'Authorization': `Basic ${process.env.TOKEN}`
                        'Authorization': `Basic ${apiKey}`
                    },
                });

                const response = await requestContext.post(apiUrl + 'reviews', {
                    data: {
                        "product_id": productId,
                        "review": `${review.content} - review ${[i]}`,
                        "reviewer": review.reviewer,
                        "reviewer_email": review.reviewerEmail,
                        "status": review.status,
                        "rating": 5
                    },
                });
                expect(response.status()).toBe(201);
                const body = await response.json();
            });

            await test.step("Verify review not visible", async () => {

                const product = await productAdminPage.getProductInfo("PRODUCT_003")
                await productStorePage.clickNewProduct(product.productName);

                const homeBreadCrumb = await productStorePage.homeBreadCrumb();
                await expect(homeBreadCrumb).toBeVisible();

                const reviewUnapprove = await reviewStorePage.newReview(review.content, i);
                await expect(reviewUnapprove).toBeHidden();
            });

            await test.step("Approve review", async () => {
                await productAdminPage.switchBetweenAdminAndStorefront();
                const dashboardHeading = await dashBoardPage.dashboardHeading();
                await expect(dashboardHeading).toBeVisible();
                await productAdminPage.selectProductMn();
                await reviewAdminPage.navigateReviewList();
                await reviewAdminPage.approveReview(review.content, i);
            });

            await test.step("Verify review visible on SF", async () => {
                const product = await productAdminPage.getProductInfo("PRODUCT_003")
                await productAdminPage.switchBetweenAdminAndStorefront();

                const shopHeading = await productStorePage.shopHeading();
                await expect(shopHeading).toBeVisible();
                await productStorePage.clickNewProduct(product.productName);

                const locatorReviewOnSF = await reviewStorePage.newReview(review.content, i);
                await expect(locatorReviewOnSF).toBeVisible();
                await productStorePage.backToHomePage();
            });
        };
    });

    test.afterEach(async () => {
        if(!requestContext || !productId) return;
        const response = await requestContext.delete(apiUrl! + productId);
        await expect(response.status()).toBe(200);
    });
});
