import { test, request, expect } from "@playwright/test";
import { LoginPage } from '../../page/product/login.page';
import data from './data.json';
import { NewProductPage } from "../../page/product/new.product.page";
import { loadEnvInfo } from "../lesson-02/util";

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

    process.env.ENV = 'prod';
    const env = process.env.ENV || 'prod';
    const { baseUrl, validUsername, password } = loadEnvInfo(env);

    let productId: number;
    let requestContext: any;
    const apiUrl = 'https://e-commerce.betterbytesvn.com/wp-json/wc/v3/products/';
    const apiKey = 'Y2tfNWE0Yjg2NTg5YmQwZWJhNWI0NzEwNDVjZTNhZWY0ZDg2YjQ2NWZkYzpjc19kN2MwYTA0NDljMDhhYmRlZmVhODA1OTc1ZmU1M2I5NDZjM2IyYjA4';

    test.beforeEach(async ({ page }) => {
        const newProductPage = new NewProductPage(page);
        const product = await newProductPage.getProductInfo("PRODUCT_003")
        console.log(product);
        console.log('product name log:', product.productName);
        console.log('product regular price:', product.regularPrice);
        console.log('product sale price:', product.salePrice);

        await test.step("Create new product", async ({ }) => {
            requestContext = await request.newContext({
                baseURL: apiUrl,
                extraHTTPHeaders: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Basic ${process.env.TOKEN}`
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
            console.log('Product created:', productId);
        });

        await test.step('Login success', async () => {
            loginPage = new LoginPage(page);
            loginPage.navigateToLoginPage("prod");
            await loginPage.login("prod");
            await newProductPage.navigateAllProductList();
            await newProductPage.nagigateViewProductPage();
            const locatorShopHeading = await newProductPage.getLocatorShopHeading();
            await expect(locatorShopHeading).toBeVisible();
        })
    });

    test("PRODUCT-003", async ({ page }) => {
        const arrProduct = [];
        const newProductPage = new NewProductPage(page);
        const review = await newProductPage.getReviewInfo("PRODUCT_003");
        for (let i = 1; i <= 5; i++) {
            await test.step("Add hold review for product added", async () => {            
                            
                requestContext = await request.newContext({
                    baseURL: apiUrl,
                    extraHTTPHeaders: {
                        'Content-Type': 'application/json',
                        // 'Authorization': `Basic ${process.env.TOKEN}`
                        'Authorization': `Basic ${apiKey}`
                    },
                });
                console.log("Review content ",`${review.content} - review ${[i]}` );
                console.log("Reviewer ",review.reviewer );
                console.log("Review email ",review.reviewerEmail );
                console.log("Review status ",review.status);

                const response = await requestContext.post(apiUrl + 'reviews', {
                    data: {
                        "product_id": 854,
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

            await test.step("Verify review not visible on SF", async() => {
                const product = await newProductPage.getProductInfo("PRODUCT_003")
                // await newProductPage.nagigateViewProductPage();
                const locatorShopHeading = await newProductPage.getLocatorShopHeading();
                await expect(locatorShopHeading).toBeVisible();

                await newProductPage.clickProductAdded(product.productName);
                
                const locatorHome = await newProductPage.getLocatorHomeProductDetail();
                await expect(locatorHome).toBeVisible();

                const locatorNoReviewAmount = await newProductPage.getLocatorNoReviewCount();
                await expect(locatorNoReviewAmount).toBeVisible();
            });

            await test.step("Approve review", async () => {
                await newProductPage.backToProductList();
                await newProductPage.navigateReviewList();
                await newProductPage.approveReview(review.content,i);
            });

            await test.step("Verify review visible on SF", async() => {
                const locatorReviewOnSF = await newProductPage.getReviewLocatorOnSF(review.content);
                await expect(locatorReviewOnSF).toBeVisible();
            })
        }        
});

    // test.afterEach(async () => {
    //     const response = await requestContext.delete(apiUrl + productId);
    //     expect(response.status()).toBe(200);

    // })
});
