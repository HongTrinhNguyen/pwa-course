# Fixture la gi?

- dùng khởi tạo nhiều môi trường khác nhau
- isolate giữa các test
- nhóm được các test dựa trên ý nghĩa, thay vì common set up

# Built - in fixture

- **page: Page** tạo một page riêng biệt cho test
- **context: BrowserContext** - tạo một context riêng biệt cho test. Fixture page phái trên cũng dùng context với context này
- **browser: Browser**- được dùng chung giữa các test để tối ưu tài nguyên 
- **browserName: string** - tên browser đang chạy có thể chromium, firefox or webkit
-**request: APIRequestContext** - một APIRequestContext instance độc lập


# Tạo mới fixture
import { test as base } from '@playwright/test';

export const test = base.extend<{ demo string }>({
    demo: async ({ page }, use =>{
        console.log('Start demo');
        await use("demo fixture");
        console.log('End demo');
        })
})

export { expect } from '@playwright/test';

**NOTE**:
- trước use: giống beforeEach
-  use: chạy code trong test
- sau use: giống afterEach

# Sử dụng text extend
- Mở rộng logic test, tạo mới một test object


# Các loại scope:
- Test Scope (mặc định): tạo/huỷ cho mỗi test => đảm bảo cô lập hoàn toàn, phù hợp cho UI test
- Worker Scope: tạo/huỷ một lần cho mõi worker => tái sử dụng tài nguyên trong worker, tiết kiệm thời gian; phù hợp cho set up tốn kém

# Quy tắc
- Dependencies: fixture A phụ thuộc B --> set up B trước A, teardown sau A 
- Lazy execution: non-automatic fixture chỉ set up khi dược test/hook yêu cầu
- Automatic Fixture: { auto: true } fixtures setup trước, bất kể có được yêu cầu hay không
- Scope
    + test-scoped: setup/ teardown mỗi test
    + worker-scope: setup/teardown một lần per worker
- Hook: 
    + beforeAll/afterAll cahyj một lần per worker
    + beforeEach/afterEach: chạy mỗi test
- Teardown: chạy sau khi fixture không còn cần, theo thứ tự ngược phụ thuộc