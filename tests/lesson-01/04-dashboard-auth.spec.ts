import { test, expect } from "@playwright/test";
import { DashboardPage } from "./Pom/pages/dashboard-page";
import { loadEnvInfo } from "./Pom/utils/util";


test.describe("DB_AUTH", () => {

    test("Login thành công", {
        annotation: {
            type: "DB_AUTH_001",
            description: "DASHBOARD - AUTH",
        },
        tag: ["@DB_AUTH", "@DASHBOARD - AUTH", "@UI", "@SMOKE"]
    },
        async ({ page }) => {

            const dashboardPage = new DashboardPage(page);

            await test.step("1.Kiểm tra login thành công cho dev", async () => {
                await dashboardPage.navigateDashboardPageByEnv("dev");
                await dashboardPage.fillLoginValidCredentials("dev")
                await dashboardPage.clickLoginButton();
                const actualDashboardPage = await dashboardPage.getDashBoardPage();
                await expect(actualDashboardPage).toBeVisible();
            }
            );

            await test.step("1.Kiểm tra login thành công  cho production", async () => {
                await dashboardPage.navigateDashboardPageByEnv("prod");
                await dashboardPage.fillLoginValidCredentials("prod")
                await dashboardPage.clickLoginButton();
                const actualDashboardPage = await dashboardPage.getDashBoardPage();
                await expect(actualDashboardPage).toBeVisible();
            }
            );
        });

    test("Login thất bại", {
        annotation: {
            type: "DB_AUTH_002",
            description: "DASHBOARD - AUTH"
        },
        tag: ["@DB_AUTH", "@DASHBOARD - AUTH", "@UI", "@SMOKE"]
    },
        async ({ page }) => {

            const dashboardPage = new DashboardPage(page);

            await test.step("1.Kiểm tra login không thành công cho dev", async () => {
                await dashboardPage.navigateDashboardPageByEnv("dev");
                await dashboardPage.fillLoginInvalidCredentials("dev")
                await dashboardPage.clickLoginButton();
                const actualErrMsg = await dashboardPage.getErrorMessage();
                const invalidUsername = loadEnvInfo("dev").invalidUsername

                await expect(actualErrMsg).
                    toContainText(`Error: The username ${invalidUsername} is not registered on this site. If you are unsure of your username, try your email address instead.`);
            }
            );

            await test.step("1.Kiểm tra login không thành công  cho production", async () => {
                await dashboardPage.navigateDashboardPageByEnv("prod");
                await dashboardPage.fillLoginInvalidCredentials("prod")
                await dashboardPage.clickLoginButton();
                const actualErrMsg = await dashboardPage.getErrorMessage();
                const invalidUsername = loadEnvInfo("prod").invalidUsername;

                await expect(actualErrMsg).
                    toContainText(`Error: The username ${invalidUsername} is not registered on this site. If you are unsure of your username, try your email address instead.`);
            }
            );
        });

});