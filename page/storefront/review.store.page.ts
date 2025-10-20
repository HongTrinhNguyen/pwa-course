import { Page } from "@playwright/test";
import { BasePage } from "../base.page";

export class ReviewStorePage extends BasePage {

    constructor(page: Page){
        super(page);
    }

    async newReview(contentReview: string, index: number){
        return this.page.getByText(`${contentReview} – review ${index}`);
    }
    
}