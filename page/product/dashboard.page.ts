import { Page } from "@playwright/test";
import { BasePage } from "../base.page";

export class DashboardPage extends BasePage {
    locatorDashboardHeading = '//h1[contains(text(), "Dashboard")]';

    constructor(page: Page) {
        super(page);
    }

    async dashboardHeading() {
        return this.page.locator(this.locatorDashboardHeading);
    }
}