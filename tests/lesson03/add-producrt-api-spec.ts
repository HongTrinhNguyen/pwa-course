import { test, request } from "@playwright/test";

let loginPage: LoginPage;
let usernameValid: string, passwordValid: string;

test.describe("PRODUCT", () => {
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        usernameValid = process.env.USERNAME || "";
        passwordValid = process.env.PASSWORD || "";
    });

    // test("Login and save state", async ({ }) => {
    //     await loginPage.navigateToLoginPage();
    //     await loginPage.login(usernameValid, passwordValid);
    //     await loginPage.page.context().storageState({ path: "auth.json" });
    // });

    // test.use({
    //     storageState: "auth.json"
    // });

    test("Login dashboard", async ({ page }) => {
        await page.goto(`${process.env.BASE_URL}wp-admin/edit.php`);
    });
});
