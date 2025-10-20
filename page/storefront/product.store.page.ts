import { Page } from "@playwright/test";
import { BasePage } from "../base.page";

export class ProductStorePage extends BasePage {

    constructor(page: Page){
        super(page);
    }

    async shopHeading(){
        return  this.page.getByRole('heading', { name: 'Shop' });
    }

    async homeBreadCrumb(){
        return this.page.getByLabel('Breadcrumb').getByRole('link', { name: 'Home' });
    }

    async productOnlyResearch(name_product: string){
        return this.page.getByRole('listitem').filter({ hasText: `Sale! ${name_product}` });
    }

    async newProduct (name_product: string){
        return this.page.getByRole('link', { name: `${name_product}` });
    }

    async clickNewProduct(name_product: string){
        const newProduct = await this.newProduct(name_product);
        await newProduct.waitFor({state:'visible'});
        await newProduct.click({position: { x: 23, y: 32 }});
    }

    async backToHomePage(){
        await this.page.getByRole('link', { name: 'E-commerce site for' }).click();
    }

}