import { test, chromium, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test.describe('Bai tap 01', async () => {
    const downloadPath = path.resolve(__dirname, '../../download_file/download-lesson-06-file.pdf');

    test('Dowload file successfull', async ( {page} ) => { 

        await test.step('Step1: go to download page in Playwright', async () => {
            await page.goto('https://material.playwrightvn.com/031-download.html');
            const headingDownloadLocator = await page.getByRole('heading', { name: 'File Download Demo' });
            await expect(headingDownloadLocator).toBeVisible();
        })

        await test.step('Download sample.pdf file', async () => {
            const downloadPromise = page.waitForEvent('download');
            let locatorDownloadPDFBtn = page.getByRole('button', { name: 'Download PDF' });
            await locatorDownloadPDFBtn.click();
            const download  = await downloadPromise;
            await download.saveAs('download_file/download-lesson-06-file.pdf');
            expect(download.suggestedFilename()).toContain('sample');
            expect(path.basename('download_file/download-lesson-06-file.pdf')).toContain('lesson');

        });
    });
    test.afterAll('Clear data', async () => {
        if (fs.existsSync(downloadPath)){
            fs.unlinkSync(downloadPath);
        }
        else
        console.log('File not exist');
        expect (fs.existsSync(downloadPath)).toBeFalsy();
    })
});