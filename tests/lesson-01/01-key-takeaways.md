## Khởi tạo dự án Playwright đầu tiên
- npm init playwright@playright@latest
- npm init playwright@latest <folder-name>

- Chỉnh sửa config
+ reporter
+ worker
+ retries
+ trace: 'on'
+ project: keep only one

## Playwright basic syntax

- page.locator("").action(data)
- page.action(locator, data)

- expect().non-retrying
- await expect(element).auto-retrying

## Playwright- tương tác phần tử 
- Navigate: page.goto(url)
- Text Input, Textare: page.fill(selector,value)
- Radio button & checkbox: page.check(selector)/page.uncheck(selector)
- Focus: page.focus(selector)
- Hover: page.hover(selector)
- Drag and drop: page.dragAndDrop(source, target)
- Upload file: page.setInputFiles(selector, filePath)
- Iframe: page.frameLocator(selector).locator(childSelector)

## Playwright suit
test.describe
test
test.step

- Hook
+ beforeAll: chạy một lần trước cả suit
+ beforeEach: chạy trước mỗi test
+ afterEach: chạy sau mỗi test
+ afterAll: chạy một lần sau cả suit
- Hệ thống thực hành chia hai hôi trường prod and dev

## Môi trường và biến môi trường
+ Dev: dùng để dev, test and debug
+ Staging: mô phỏng gần giống thực tế của sản phẩm
+ Production: môi trường thực tế, ứng dụng chưa được triển khai cho người dùng cuối

Cung cấp thông tin cấu hình mà không cần hard-code

Tại sao cần biến môi trường? 
+ Bảo mật: che giấu thông tin chạy cảm  như mật khẩu  cầu
+ Linh hoạt
+ Tái sử dụng

- Ví dụ sử dụng biến 
**npm install -D dotenv**

**import dotenv form 'dotenv';
dotenv.config();**

trong file dotenv dùng dấu # để comment

có hai cách để triển khai file config
+ config ngắn đưa ra file config
+ config dài: toạ ra file json
{
    "dev": {

    },
    "staging":{

    },
    "prod":{

    }
}

Annotation: đánh dấu đặc biệt được thêm vào đẻ kiểm soát hành vi TC, cung cấp thông tin bổ sung

Tag: nhãn gắn vào testcase để phân loại và nhóm các TC theo các tiêu chí nhất định

Ví dụ
### Annotation built-in: skip đánh dấu bỏ qua chưa cần fix
test.skip("", async ({page}) => {

})

### conditional skip: chỉ skip nếu đatj đièu kiện

test("", async ({page}) =>{
    test.skip
})

### fixme:
đánh dáu là 1 test bỏ qua cần fix nhưng chưa có thời gian

## custome annotation khác nhau

## Annotation: thêm thông tin cho test
annotation:{
    type: "lesson",
    description: "lesson-01"
}
tag:  ["TEST01", "@smoke", "@ui"]

Annotation được hiển thị trong report


# Tag: luôn có @ ở đầu

# Elumation: giả lập

+ Device
+ Viewport: width and height
+ Locale and timezone
+ Permission

Clock

 CLockAPI giúp thay đổi hành vi mặc định của đôgnf hộ phục vụ cho các test cần chờ

 Một số function sẽ sử dung
 setFixTime()
 await page.clock.setFixTime(new Date('2024-02-02T10:00'))
 install

 khởi tạo clock

 page.clock.install({time: newDate('type:
description:')});

fastForwards() - tua nhanh

await page.clock.fastForward('05:00');
await page.clock.fastForward('5000');

pauseAt 
runFor tick thủ công 

# Accessibility testing
 + Tuân thủ pháp lý 
 + Cải thiện UX
 + Tăng pham vi tiếp cận
 + Tích hợp sớm

 - các vấn đề phổ biến
    + độ tương phản màu
    + labels cho tình đọc màn hình: input thiếu label hoặc aria-label
    + id trùng lặp
    + Alt text cho image: hình ảnh thiếu Alt attribute mô tả 
    + Keyboard navigation
    + ARIA 

Cài đặt thư viện: npm install -D @axe-core/playwright1


