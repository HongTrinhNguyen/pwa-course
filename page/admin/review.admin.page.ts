import { Page } from "@playwright/test";
import { BasePage } from "../base.page";
import data from '../../tests/lesson03/data.json';

export class ReviewAdminPage extends BasePage {

    constructor(page: Page){
        super(page);
    }

    async reviewMn(){
        return this.page.locator('#menu-posts-product').getByRole('link', { name: 'Reviews' });
    }

    async navigateReviewList(){
        const locatorReviewMn = (await this.reviewMn()).click();
    }

    async newReview(content: string, index: number){
        return this.page.getByRole('cell', { name: `${content} – review ${index}` })
    }

    async approveLink(content: string, index: number){
        return this.page.getByRole('cell', { name: `${content} – review ${index}`}).getByLabel('Approve this review', { exact: true })
    }

    async approveReview(content: string, index: number){
        const newReview = await this.newReview(content, index);
        const approveLink = await this.approveLink(content, index);
        await newReview.click()
        await approveLink.click();
    }

    async getReviewInfo(idTestCase: string){
        const env = process.env.EVN || 'dev';
        return data[idTestCase][env].review;
    }
}