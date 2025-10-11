import { test as base, Page, expect, Browser, BrowserContext, WorkerInfo } from "@playwright/test";
import { LoginPage } from "../../page/product/login.page";
import { loadEnvInfo } from "../../tests/lesson-02/util";
import { DashboardPage } from "../../page/product/dashboard.page";
import { NewProductPage } from "../../page/product/new.product.page";
import dataDev from '../../tests/lesson-02/data/data-dev.json';
import dataProd from '../../tests/lesson-02/data/data-prod.json';


type TestFixtures ={
    loggedInPage: Page;
};

// type WorkerFixtures = {   
//     loggedInContext: BrowserContext;
// };

const test = base.extend<TestFixtures>({

    loggedInPage: [
        async ({ browser }, use) => {
            process.env.ENV = 'dev';
            const env = process.env.ENV || 'dev';           
            const data = env === 'dev' ? dataDev : dataProd;
            const { validUsername, password } = loadEnvInfo(env);

            const context = await browser.newContext();
            const page = await context.newPage();

            const loginPage = new LoginPage(page);
            const dashboardPage = new DashboardPage(page);
            const newProductPage = new NewProductPage(page);

            // Verify loggin successfully
            await loginPage.navigateToLoginPage(env);
            await loginPage.login(validUsername!, password!);
            const dashboardHeading = await dashboardPage.getDashboardHeading();
            await expect(dashboardHeading).toBeVisible();

            // xoa product da tao
            await newProductPage.navigateToNewProductPage(); 
            await newProductPage.navigateAllProductList();           
            const deletedProduct = await newProductPage.deleteProductAdded(data.new_product_page.data.name_product, env);
            await expect(deletedProduct).not.toBeVisible();
            const deletedMsgLocator = await newProductPage.getLocatorDeleteNoti();
            await deletedMsgLocator.waitFor({ state: "visible" });
            await expect(deletedMsgLocator).toContainText(data.new_product_page.expected.deleted_message);

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
