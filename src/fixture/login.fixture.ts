import { test as base, Page, expect, Browser, BrowserContext, WorkerInfo } from "@playwright/test";
import { LoginPage } from "../../page/product/login.page";
import { loadEnvInfo } from "../../tests/lesson-02/util";
import { DashboardPage } from "../../page/product/dashboard.page";


type TestFixtures ={
    loggedInPage: Page;
};

// type WorkerFixtures = {   
//     loggedInContext: BrowserContext;
// };

const test = base.extend<TestFixtures>({

    loggedInPage: [
        async ({ browser }, use) => {
            const env = process.env.ENV || "prod";
            const { validUsername, password } = loadEnvInfo(env);

            const context = await browser.newContext();
            const page = await context.newPage();

            const loginPage = new LoginPage(page);
            const dashboardPage = new DashboardPage(page);

            // Verify loggin successfully
            await loginPage.navigateToLoginPage(env);
            await loginPage.login(validUsername!, password!);
            const dashboardHeading = await dashboardPage.getDashboardHeading();
            await expect(dashboardHeading).toBeVisible();

            await use(page);
            // await context.close();
        },
        { scope: "test" }
    ],
    // loggedInPage: [
    //     async  ({ loggedInContext }, use) => {
    //         const  page = await loggedInContext.newPage();
    //         await use(page);
    //         await page.close();
    //     },
    //     {scope: "test"},
    // ],
});

export { test, expect };
