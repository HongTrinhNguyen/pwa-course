import { test, expect } from "@playwright/test";
import dotenv from "dotenv";
import path from 'path';


test.describe("DB_AUTH", () => {

    const xpathUsername = "//input[@id='user_login']";
    const xpathPassword = "//input[@id='user_pass']";
    const btnLogin = "//input[@id='wp-submit']";

    test("Login thành công", { tag: ["@UI", "@SMOKE"] }, async ({ page }) => {
        async function verifyValidLogin(env: string) {
            delete process.env.BASE_URL_ADMIN;
            delete process.env.USERNAME;
            delete process.env.PASSWORD;
            dotenv.config({ path: path.resolve(__dirname, `../../.env.${env}`) });
            const baseUrl = process.env.BASE_URL_ADMIN;
            console.log("Base URL: ", baseUrl);
            await page.goto(baseUrl!);
            await page.locator(xpathUsername).fill(process.env.USERNAME!);
            await page.locator(xpathPassword).fill(process.env.PASSWORD!);
            await page.locator(btnLogin).click();
            await expect(page.locator('#menu-dashboard')
                .getByRole('link', { name: 'Dashboard' }))
                .toBeVisible();
        }

        await test.step("1.Kiểm tra login thành công cho dev", async () => {
            await verifyValidLogin("dev");
        }
        );

        await test.step("1.Kiểm tra login thành công  cho production", async () => {
            await verifyValidLogin("prod");
        }
        );
    });

    test("Login thất bại", { tag: ["@UI"] }, async ({ page }) => {
        async function verifyInValidLogin(env: string) {
            delete process.env.BASE_URL_ADMIN;
            delete process.env.USERNAME;
            delete process.env.INVALID_PASSWORD;
            dotenv.config({ path: path.resolve(__dirname, `../../.env.${env}`) });
            const baseUrl = process.env.BASE_URL_ADMIN;
            console.log("Base URL: ", baseUrl);
            await page.goto(baseUrl!);
            await page.locator(xpathUsername).fill(process.env.INVALID_USERNAME!);
            await page.locator(xpathPassword).fill(process.env.PASSWORD!);
            await page.locator(btnLogin).click();
            await expect(page.locator('#login_error')).
                toContainText(`Error: The username ${process.env.INVALID_USERNAME} is not registered on this site. If you are unsure of your username, try your email address instead.`);

        }

        await test.step("1.Kiểm tra login không thành công cho dev", async () => {
            await verifyInValidLogin("dev");
        }
        );

        await test.step("1.Kiểm tra login không thành công  cho production", async () => {
            await verifyInValidLogin("prod");
        }
        );
    });

});