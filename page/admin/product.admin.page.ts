import { Page } from "@playwright/test";
import { BasePage } from "../base.page";
import data from '../../tests/lesson03/data.json';

export class ProductAdminPage extends BasePage {

    xpathAddNewProductBtn = '//a[@class="page-title-action" and contains(text(), "Add new product")]'
    xpathAddProductHeading = '//h1[@class="wp-heading-inline"]';
    xpathProductName = '//input[@id="title"]';
    xpathRegularPrice = '//input[@id="_regular_price"]';
    xpathSalePrice = '//input[@id="_sale_price"]';
    xpathPublishbtn = '//input[@id="publish"]';
    xpathOnlySearchResult = '//input[@id="_visibility_search"]';

    constructor(page: Page){
        super(page);
    }

    async allProductMn() {
        return this.page.getByRole('link', { name: 'All Products' })
    }

    async addNewProductHeading() {
        return this.page.locator(this.xpathAddProductHeading);
    }

    async productPublishedMessage() {
        return this.page.getByText('Product published. View Product');
    }

    async getLocatorProdcutAdded(name_product: string){
        const locatorNewProductAdded =  this.page.getByRole('cell', { name: `${name_product}` });
        return locatorNewProductAdded;
    }

    async deleteNoti() {
        return this.page.getByText('product moved to the Trash. Undo')
    }

    async selectProductMn(){
        await this.page.locator('#menu-posts-product').getByRole('link', { name: 'Products', exact: true }).click();
    }

    async navigateToNewProductPage() {
        await this.selectProductMn();
        await this.page.locator(this.xpathAddNewProductBtn).click();
    }

    async navigateAllProductList() {
        await this.selectProductMn();
        const allProductMenu = await this.allProductMn();       
        await allProductMenu.click();

    }

    async nagigateViewProductPage(){
        await this.page.getByRole('menuitem', { name: 'View products' }).click();

    }

    async clickPublishButton() {
        await this.page.locator(this.xpathPublishbtn).click();
    }

    async clickEditCalalogVisibily(){
        await this.page.getByRole('link', { name: 'Edit', exact: true }).click();
    }

    async switchBetweenAdminAndStorefront(){
        await this.page.getByRole('menuitem', { name: 'E-commerce site for' }).click();        
    }

    async addNewProduct(productName: string, regularPrice: string, salePrice: string) {
        await this.page.locator(this.xpathProductName).fill(productName);
        await this.page.locator(this.xpathRegularPrice).fill(regularPrice);
        await this.page.locator(this.xpathSalePrice).fill(salePrice);
        await this.clickPublishButton();
    }

    async addNewOnlySearchProduct(productName: string, regularPrice: string, salePrice: string){
        await this.page.locator(this.xpathProductName).fill(productName);
        await this.page.locator(this.xpathRegularPrice).fill(regularPrice);
        await this.page.locator(this.xpathSalePrice).fill(salePrice);
        await this.clickEditCalalogVisibily();
        await this.page.locator(this.xpathOnlySearchResult).check();
        await this.clickPublishButton();
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

    async getProductInfo(idTestCase: string){
        const env = process.env.EVN || 'dev';
        return data[idTestCase][env].product;
    }

}