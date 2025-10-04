import { test, expect } from "@playwright/test";
import dotenv from "dotenv";
import path from 'path';
import fs from "fs";


test.describe("HOME_001", () => {
    const expectedTitle = {
        dev: "E-commerce site for automation testing – E-commerce site for automation testing",
        prod: "E-commerce site for automation testing – Automation test site"
    }

    test("HOME-Kiểm tra home page hiển thị", { tag: ["@UI"] }, async ({ page }) => {

        async function verifyTitleByEnv(env: string) {
            delete process.env.BASE_URL;
            dotenv.config({ path: path.resolve(__dirname, `../../.env.${env}`) });
            const baseUrl = process.env.BASE_URL;   
            await page.goto(baseUrl!);

            const actualTitle = await page.title();
            expect(actualTitle).toBe(expectedTitle[`${env}`]);
        }

        await test.step("1.Kiểm tra title trang web cho dev", async () => {
            await verifyTitleByEnv("dev");
        }
        );

        await test.step("1.Kiểm tra title trang web cho production", async () => {
            await verifyTitleByEnv("prod");
        }
        );
    });
});