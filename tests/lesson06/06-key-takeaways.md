# Playwright chrome extension
- Scenario thực tế: 
    + website hiển thị khi có ads bị block
    + passwrod manager: form login hoạt động với auto-fill
    + Dark mode extension: UI có render đúng không

- Đoạn code cài đặt extension trong playwright

    import { test, chromium } from '@playwright/test';
    import path from 'path';

    test('Load extension and test', async () =>{
        // tạo đường dẫn đến folder extention
        const pathToExtension = path.join(--dirname, 'extensions/my-extension');

        // Khởi tạo browser context với extension
        const browserContext = await chromium.launchPersistenContext('', {
            headless: false, // extension chỉ hoạt động ở head mode
            args: [
                `--disable-extension-except=${pathToExtension}`,
                `--load-extension=${pathToExtension}`,
                `--no-sanbox`
            ]
        });
        const page = await browserContext.newPage();
        await page.goto('https://example.com');

        // test logic here
        await browserContext.close();
    })

# Evaluate Javascript

- Là khả năng thực thi code JS trực tiếp trong ngữ ảnh server --> chạy code bằng cachs mở console 
- Các ngữ cảnh chính:
    + ngữ cảnh trang:
    await page.evaluate( () => {
        return document.title;
    })
    + với tham số
    await page.evaluate((selector) => {
        return document.querySelector(selector).textContent;
    }, ''
    .my-element);
    + trên element cụ thể
    await element.evaluate( (el) => {
        return el.innerHTML;
    });

- Tại sao cần evaluate?
    + Truy cập thông tin không có sẵn quA playwright API
    + Thao tác phức tạp với DOM

# Download file
    const downloadPromise = page.waitForEvent('download');
    await page.click('download-button');
    const download = await downloadPromise;
    await download.saveAs('.downloaded-file.pdf');

# Xử lí Dialog and Popup
const popupLocator = page.locator('//button[contains(text(), 'Allow all')]');
await page.addLocatorHandler(popupLocator, async () => {
    await popupLocator.click();
})

