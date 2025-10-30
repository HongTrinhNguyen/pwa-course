import { test, chromium, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test.describe('Bai tap 02', async () => {
    const downloadPath = path.resolve(__dirname, '../../download_file/download-lesson-06-file.pdf');

    test('Dowload file successfull', async ({ page }) => {

        await test.step('Step1: go to download page in Playwright', async () => {
            await page.goto('https://material.playwrightvn.com/020-alert-confirm-prompt.html');

            const closeLocator = page.locator('//button[@class="close-btn"]');
            await page.addLocatorHandler(closeLocator, async () => {
                await closeLocator.click();

                const allowLocator = page.getByRole('button', { name: 'Allow' });
                await page.addLocatorHandler(allowLocator, async () => {
                    await allowLocator.click();


                });
                const headingDownloadLocator = await page.getByRole('heading', { name: 'File Download Demo' });
                await expect(headingDownloadLocator).toBeVisible();
            })

            await test.step('Step2: verify Arlert', async () => {
                page.once('dialog', async (dialog) => {
                    expect(dialog.message()).toContain('Học automation test từ chưa biết gì.');
                    await dialog.accept();
                });
                await page.getByRole('button', { name: 'Hiển Thị Alert' }).click();
            });

            await test.step('Step3: verify Confirm', async () => {
                page.once('dialog', async (dialog) => {
                    expect(dialog.message()).toContain('Học automation test từ chưa biết gì. Bạn có đồng ý không?');
                    await dialog.dismiss();
                });
                await page.getByRole('button', { name: 'Hiển Thị Confirm' }).click();
                await expect(page.locator('#resultDisplay')).toHaveText('Confirm result: Không đồng ý');
            });

            await test.step('Step4: verify Prompt', async () => {
                page.once('dialog', async (dialog) => {
                    expect(dialog.message()).toContain('Học automation test từ chưa biết gì. Bạn nghĩ gì?');
                    await dialog.accept('HongTrinh');
                });
                await page.getByRole('button', { name: 'Hiển Thị Prompt' }).click();
                await expect(page.locator('#resultDisplay')).toHaveText('Prompt result: HongTrinh');
            });

        })
    })

})