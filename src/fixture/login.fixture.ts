import { test as base } from "@playwright/test";
import { LoginPage } from "../../page/product/login.page";

const test = base.extend<{ login: LoginPage}>({
    login: async ({ page }, use) => {
        const loginPage = new LoginPage(page);

        console.log("=== SETUP: Login ===");
        use(loginPage);

        console.log("=== TEARDOWN: Logout ===");
        // You can add logout steps here if needed
    }
});

export { test};
