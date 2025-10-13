# Network interception
trong playwright cho phép can thiệp vào các HTTP Request giữa browser và server
- Lợi ích: 
    + tăng tốc độ test
    + cô lập test 
    + test edge case
    + dễ debug
- Dùng cho
    + test API fail
    + Mock data đọng
    + Test offline mode hoặc catching

## API Mocking
giúp giả lập response API mà không cần gọi server thực tế 

#### API Mocking - chặn request
await page.route('**/*', (route) => {
    return route.request().resourceType() === 'image'
    ? route.abort()
    : route.continue()
});

#### Chặn và sửa response

test('Test3: thay đổi response của API để UI hiển thị theo ý muốn', async({ page }) => {
    await.page.route('*/**/api/v1/fruits, async route => {
        const response = await route.fetch();
        const json = await response.json();
        json push({ name: 'Loquat', id:100 }) --> **chú ý vào JSON.PUSH**
        await route.fufill({ response, json }); --> **trả về front-end mà không gọi backend**
    });
    await page.goto('https://');

    await expect(page.getByText('Loquat', { exact: true })).toBeVisible();
})

## Global setup & global teardown
là một test riêng biệt, chạy trước hoăc sau TẤT CẢ các test 

- So sánh với Hook và Fixture:
    + Hook, fixture: chạy cho mỗi test hoặc mỗi worker
    + Global setup & global teardown: chạy một lần duy nhất

- Khả năng ứng dụng:

với  SETUP
    + đăng nhập một lần sau đó lưu lại state (cookie,token) để dùng lại trong test --> giúp giảm thời gian va tài nguyên
    + khởi tạo dữ liệu ban đầu vào datacase + API
    + thiết lập cấu hình chung (tạo biến môi trường, tạo cấu hình, ...)
    + khởi động service bên thứ ba ex: mock server, database giả lập, ...

với TEARDOWN:
    + xoá dữ liệu test đã tạo ở bước setup
    + dừng các service bên thứ 3 đã không khởi động ở bước setup
    + dọn dẹp tài nguyên tạm thời ( file, kết nối, catche, ...)

# Re-use authentication state 

        + cookies           
LOGIN                       + auth.json --> test run
        +localSrtorage      

- example
import { test, expect } from '@playwright/tests'

test.describe("", async () => {
    **const authFile = 'auth-pw101.json'**
    test('test01: Login and save', async () => {
        await page.goto('https:');
        await page.context().storageState({ path: auttFile });
    });

    test.use({
        storageState : authFile
    });
    test('Step 02: resure authentication state), async({ page }) => {
        await page.goto();
        await.page.waitForTimeout(5_000);
    });
});

## Auto waiting

#### expect.Pass
- retry toàn bộ block code cho tới khi đạt điều kiện (ex: logic UI nhất, data API)
    +    await expect (async () => {
        const response response = await.oage.request.get('some_url');
        expect (response. status())/toBe(200);
    }).toPass();

#### expect.poll
- chỉ retry gía trị trả về --> phù hợp  với poll giá  trị cụ thể
- ví dụ: order: gọi API thực hiện checkout => status: paid