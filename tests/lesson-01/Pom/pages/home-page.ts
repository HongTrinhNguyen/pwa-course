import { Page } from "@playwright/test";
import dotenv from "dotenv";
import path from 'path';

export class HomePage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateHomePageByEnv(env: string) {
        delete process.env.BASE_URL;
        dotenv.config({ path: path.resolve(__dirname, `../../../../.env.${env}`) });
        const baseUrl = process.env.BASE_URL;
        await this.page.goto(baseUrl!);
    }

    async getTitle() {
        return await this.page.title();
    }
}