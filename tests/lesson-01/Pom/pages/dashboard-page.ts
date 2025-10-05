import { Page } from "@playwright/test";
import { loadEnvInfo } from "../utils/util";

export class DashboardPage {

    xpathUsername = "//input[@id='user_login']";
    xpathPassword = "//input[@id='user_pass']";
    btnLogin = "//input[@id='wp-submit']";
    locatorDashboard = '#menu-dashboard';
    locatorErrorMsg = '#login_error';
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // async getEvnInfo(env: string) {
    //     delete process.env.BASE_URL_ADMIN;
    //     delete process.env.USERNAME;
    //     delete process.env.PASSWORD;
    //     delete process.env.INVALID_PASSWORD;
    //     dotenv.config({ path: path.resolve(__dirname, `../../../../.env.${env}`) });
    //     const baseUrl = process.env.BASE_URL_ADMIN;
    //     const validUsername = process.env.USERNAME;
    //     const invalidUsername = process.env.INVALID_USERNAME;
    //     const password = process.env.PASSWORD;
        
    //     return { baseUrl, validUsername,invalidUsername, password };
    // }

    async navigateDashboardPageByEnv(env: string) {
        const baseUrl= loadEnvInfo(env).baseUrl;
        await this.page.goto(baseUrl!);
    }
    async fillLoginValidCredentials(env: string) {
        const validUsername = loadEnvInfo(env).validUsername;
        const password = loadEnvInfo(env).password;
        await this.page.locator(this.xpathUsername).fill(validUsername!);
        await this.page.locator(this.xpathPassword).fill(password!);
    }

    async fillLoginInvalidCredentials(env: string) {
        const invalidUsername = loadEnvInfo(env).invalidUsername;
        const password = loadEnvInfo(env).password;
        await this.page.locator(this.xpathUsername).fill(invalidUsername!);
        await this.page.locator(this.xpathPassword).fill(password!);
    }

    async clickLoginButton() {
        await this.page.locator(this.btnLogin).click();
    }

    async getDashBoardPage() {
        return this.page.locator(this.locatorDashboard).getByRole('link', { name: 'Dashboard' });
    }

    async getErrorMessage() {
        return this.page.locator(this.locatorErrorMsg);
    }
}