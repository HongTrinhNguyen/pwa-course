import { Page } from "@playwright/test";

import { BasePage } from "../base.page";
import dotenv from "dotenv";
import path from 'path';
import { time } from "console";


export class NewProductPage extends BasePage {

    xpathAddNewProductBtn = '//a[@class="page-title-action" and contains(text(), "Add new product")]'
    xpathProductName = '//input[@id="title"]';
    xpathRegularPrice = '//input[@id="_regular_price"]';
    xpathSalePrice = '//input[@id="_sale_price"]';
    xpathPublishbtn = '//input[@id="publish"]';
    xpathAddProductHeading = '//h1[@class="wp-heading-inline"]';
    xpathProductAdded = '//a[@class="row-title" and contains(text(), "[HongTrinh]")]';
    xpathDeleteMsg = '//div[@class="notice is-dismissible updated"]';

    constructor(page: Page) {
        super(page);
    }

    async getLocatorProductMenu() {
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

    async getLocatorProductPublishedMessage() {
        return this.page.getByText('Product published. View Product');
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

    async getLocatorAllProductMenu() {
        return this.page.getByRole('link', { name: 'All Products' })
    }

    async navigateAllProductList() {
        const locatorProductMenu = await this.getLocatorProductMenu();
        await locatorProductMenu.click();
        const locatorAllProductMenu = await this.getLocatorAllProductMenu();
       
        await locatorAllProductMenu.click();
        // await this.page.waitForLoadState();
    }
    async getLocatorProdcutAdded(name_product: string){
        const locatorNewProductAdded =  this.page.getByRole('cell', { name: `${name_product}` });
        return locatorNewProductAdded;
    }

    async deleteProductAdded(name_product: string, env: string) {
        const locatorNewProductAdded =  await this.getLocatorProdcutAdded(name_product);
        await locatorNewProductAdded.hover();

        if (env == 'dev') {
            await locatorNewProductAdded.getByRole('link', { name: 'Move “[HongTrinh]Khoá học API' }).click();
        }
        else
            await locatorNewProductAdded.getByRole('link', { name: 'Move “[HongTrinh]Khoá học' }).click();

        return locatorNewProductAdded;
    }

    async getLocatorDeleteNoti() {
        return this.page.getByText('product moved to the Trash. Undo')

    }

}  
