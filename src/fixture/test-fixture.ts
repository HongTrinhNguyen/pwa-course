import { test as base, expect } from "@playwright/test"
import { LoginPage } from "../../page/product/login.page"
import { NewProductPage } from "../../page/product/new.product.page"
import { DashboardPage } from "../../page/product/dashboard.page";

type TestFixture = {   
    loginPage: LoginPage,
    dashboardPage: DashboardPage,
    newProductPage: NewProductPage
};

export const test = base.extend<TestFixture>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    dashboardPage: async ({ page }, use) => {
        await use(new DashboardPage(page));
    },
    newProductPage: async ({ page }, use) => {
        await use(new NewProductPage(page));
    }
});


export { expect };