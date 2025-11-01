import { test, expect } from '@playwright/test';
import { authenticator } from 'otplib';

test.describe('Bai tap 01', async() => {
    test('test TTOP', async ( {page} ) => {
        const secret = 'XSVI3RJSWK6KQC3AOKETUE7YL7ETRABT4WTJFABAOUU2DUZSTARHX2QJIRCTUAV5SUEZJSOUKHDDVFA53VZ5FOTPMIEPIFOYUTQWU2A';
        let name = 'HongTrinh';
        const xpathName = '//input[@id="name"]';
        const xpathTottp = '//input[@id="totp"]';
        const xpathSubmitbtn = '//button[@id="submit-totp"]';
        const xpathFirstCelllName = '#submission-list tr:first-child td:nth-child(2)';

        await test.step('Step01: go to page', async () =>{
            await page.goto('https://material.playwrightvn.com/028-totp.html');
        })

        await test.step('Step02: submit result', async () =>{
            const code = authenticator.generate(secret);
            console.log('ma TOTP', code)

            await page.locator(xpathName).fill(name);
            await page.locator(xpathTottp).fill(code);
            await page.locator(xpathSubmitbtn).click();

            const firstNameCell = page.locator(xpathFirstCelllName);
            await expect(firstNameCell).toHaveText(name);
        });
        
    });
});