import { Page } from '@playwright/test';
import { BasePage } from '../base.page';
import { loadEnvInfo } from '../../tests/lesson-02/util';
import { load } from 'dotenv';

export class LoginPage extends BasePage {
    
    locatorUsername = '//input[@id="user_login"]';
    locatorPassword = '//input[@id="user_pass"]';
    locatorLoginButton = '//input[@id="wp-submit"]';
    
    constructor(page: Page){
        super(page);
    }

    async navigateToLoginPage(env: string){        
        const baseUrl = loadEnvInfo(env).baseUrl;
        console.log("baseUrl: " + baseUrl);
        await this.page.goto(baseUrl!);   }

    async login(env: string){
        const username = loadEnvInfo(env).validUsername;
        const password = loadEnvInfo(env).password;
        await this.page.fill(this.locatorUsername, username!);
        await this.page.fill(this.locatorPassword, password!);
        await this.page.click(this.locatorLoginButton);
    }    

}