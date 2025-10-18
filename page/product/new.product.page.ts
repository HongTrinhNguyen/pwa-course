import { Page } from "@playwright/test";

import { BasePage } from "../base.page";
import dotenv from "dotenv";
import path from 'path';
import { time } from "console";
import data from '../../tests/lesson03/data.json';

export class NewProductPage extends BasePage {

    xpathAddNewProductBtn = '//a[@class="page-title-action" and contains(text(), "Add new product")]'
    xpathProductName = '//input[@id="title"]';
    xpathRegularPrice = '//input[@id="_regular_price"]';
    xpathSalePrice = '//input[@id="_sale_price"]';
    xpathPublishbtn = '//input[@id="publish"]';
    xpathAddProductHeading = '//h1[@class="wp-heading-inline"]';
    xpathProductAdded = '//a[@class="row-title" and contains(text(), "[HongTrinh]")]';
    xpathDeleteMsg = '//div[@class="notice is-dismissible updated"]';
    xpathOnlySearchResult = '//input[@id="_visibility_search"]';
    xpathViewProductBtn = '//li[@id="wp-admin-bar-archive"]';
    

    constructor(page: Page) {
        super(page);
    }

    async getLocatorProductMenu() {
        return this.page.locator('#menu-posts-product').getByRole('link', { name: 'Products', exact: true })
    }

    async getLocatorAddNewProduct() {
        return this.page.getByRole('link', { name: 'Add new product' });
    }

    async getLocatorReviewMn(){
        return this.page.locator('#menu-posts-product').getByRole('link', { name: 'Reviews' })
    }

    async navigateToNewProductPage() {
        const locatorProductMenu = await this.getLocatorProductMenu();
        await locatorProductMenu.click();
        await this.page.locator(this.xpathAddNewProductBtn).click();

    }

    async backToProductList(){
        await this.page.getByRole('menuitem', { name: 'E-commerce site for' }).click();        
    }

    async navigateReviewList(){
        const locatorReviewMn = (await this.getLocatorReviewMn()).click();
    }

    async getLocatorAddNewProductHeading() {
        return this.page.locator(this.xpathAddProductHeading);
    }

    async getLocatorProductPublishedMessage() {
        return this.page.getByText('Product published. View Product');
    }

    getLocatorReviewAdded(content: string, index: number){
        return this.page.getByRole('cell', { name: `${content} – review ${index}` })
    }

    async getLocatorApproveLink(content: string, index: number){
        return this.page.getByRole('cell', { name: `${content} – review ${index}`}).getByLabel('Approve this review', { exact: true })
    }

    async approveReview(content: string, index: number){
        const locatorReview = this.getLocatorReviewAdded(content, index);
        const locatorApproveLink = this.getLocatorApproveLink(content, index);
        await locatorReview.click();
        (await locatorApproveLink).click();
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

    async addNewOnlySearchProduct(productName: string, regularPrice: string, salePrice: string){
        await this.page.locator(this.xpathProductName).fill(productName);
        await this.page.locator(this.xpathRegularPrice).fill(regularPrice);
        await this.page.locator(this.xpathSalePrice).fill(salePrice);
        await this.clickEditCalalogVisibily();
        await this.page.locator(this.xpathOnlySearchResult).check();
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

    }
    async getLocatorProdcutAdded(name_product: string){
        const locatorNewProductAdded =  this.page.getByRole('cell', { name: `${name_product}` });
        return locatorNewProductAdded;
    }

    async nagigateViewProductPage(){
        await this.page.getByRole('menuitem', { name: 'View products' }).click();

    }
    async getLocatorShopHeading(){
      return  this.page.getByRole('heading', { name: 'Shop' });
    }

    async getLocatorHomeProductDetail(){
        return this.page.getByLabel('Breadcrumb').getByRole('link', { name: 'Home' });
    }

    async clickEditCalalogVisibily(){
        await this.page.getByRole('link', { name: 'Edit', exact: true }).click();
    }

    async getLocatorProductOnlyResearchOnViewProductPage(name_product: string){
        return this.page.getByRole('listitem').filter({ hasText: `Sale! ${name_product}` });
    }

    async getLocatorProductAdded (name_product: string){
        return this.page.getByRole('link', { name: `${name_product}` });
    }

    async clickProductAdded(name_product: string){
        const locatorProduct = await this.getLocatorProductAdded(name_product);
        await locatorProduct.waitFor({state:'visible'});
        await locatorProduct.click({position: { x: 23, y: 32 }});
    }


    async getLocatorNoReviewCount(){
        return this.page.getByRole('tab', { name: 'Reviews (0)' });
    }

    async getReviewLocatorOnSF(contentReview: string){
        return this.page.getByText(`${contentReview}`);
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

    async getProductInfo(idTestCase: string){
        const env = process.env.EVN || 'dev';
        return data[idTestCase][env].product;
    }
    async getReviewInfo(idTestCase: string){
        const env = process.env.EVN || 'dev';
        return data[idTestCase][env].review;
    }
}  
