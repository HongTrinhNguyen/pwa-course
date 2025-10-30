import { test, expect } from "@playwright/test";
import testData from '../lesson-01/Pom/data/test.json';
import { HomePage } from '../lesson-01/Pom/pages/home-page';



test.describe("HOME_001", () => {
    const expectedTitle = {
        dev: testData.dev.expectedTitle,
        prod: testData.prod.expectedTitle
    };

    test("HOME-Kiểm tra home page hiển thị", {
        annotation: {
            type: "HOME_001",
            description: "HOME",
        },
        tag: ["@HOME_OO1", "@HOME", "@UI"]
    }, async ({ page }) => {

        const homePage = new HomePage(page);

        await test.step("1.Kiểm tra title trang web", async () => {
            await homePage.navigateHomePageByEnv("dev");
            const actualTitle = await homePage.getTitle();
            expect(actualTitle).toBe(expectedTitle.dev);
        }
        );

        await test.step("Step failed for reporter", async () => {
            expect(1).toBe(2);
        })
    });
});