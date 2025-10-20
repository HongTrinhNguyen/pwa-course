import { test, expect } from '@playwright/test';
import { LoginPage } from '../../page/product/login.page';
import { DashboardPage } from '../../page/product/dashboard.page';
test("Check login page", async ({ page }) => {
    const newLoginPage = new LoginPage(page);
    const dashBoardPage = new DashboardPage(page);

    await newLoginPage.navigateToLoginPage(process.env.ENV);
    await newLoginPage.login(process.env.ENV);

    const dashboardHeading = await dashBoardPage.dashboardHeading();
    await expect(dashboardHeading).toBeVisible();
});