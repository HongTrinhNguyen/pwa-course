import { Page } from "@playwright/test";

import { BasePage } from "../base.page";
import dotenv from "dotenv";
import path from 'path';


export class NewProductPage extends BasePage {
    // expect(page.locator('#menu-dashboard').getByRole('link', { name: 'Dashboard' })).toBeVisible();
 
    xpathAddNewProductBtn = '//a[@class="page-title-action" and contains(text(), "Add new product")]'
    xpathProductName = '//input[@id="title"]';
    xpathRegularPrice = '//input[@id="_regular_price"]';
    xpathSalePrice = '//input[@id="_sale_price"]';
    xpathPublishbtn = '//input[@id="publish"]';
    xpathAddProductHeading = '//h1[@class="wp-heading-inline"]';

    constructor(page: Page) {
        super(page);
    }

    async getLocatorProductMenu(){
        return this.page.locator('#menu-posts-product').getByRole('link', { name: 'Products', exact: true })
    }

    async getLocatorAddNewProduct() {
        return this.page.getByRole('link', { name: 'Add new product' });
    }   

    async navigateToNewProductPage() {
        const locatorProductMenu = await this.getLocatorProductMenu();
        await locatorProductMenu.click();
       await this.page.locator(this.xpathAddNewProductBtn).click();

    }
    async getLocatorAddNewProductHeading() {
        return this.page.locator(this.xpathAddProductHeading);
    }

    async clickPublishButton() {
        await this.page.locator(this.xpathPublishbtn).click();
    }
    async addNewProduct(productName: string, regularPrice: string, salePrice: string) {
        await this.page.locator(this.xpathProductName).fill(productName);
        await this.page.locator(this.xpathRegularPrice).fill(regularPrice);
        await this.page.locator(this.xpathSalePrice).fill(salePrice);
        await this.clickPublishButton();
    }

}  
