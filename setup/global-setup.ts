import { chromium } from "@playwright/test"
import { loadEnvInfo } from "../tests/lesson-02/util";
import { LoginPage } from "../page/product/login.page";

export default async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    const { baseUrl, validUsername, password } = loadEnvInfo(process.env.ENV);

    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage(process.env.ENV);
    await loginPage.login(process.env.ENV);

    await page.context().storageState({ path: '.playwright/auth.json' });
    await browser.close();
}