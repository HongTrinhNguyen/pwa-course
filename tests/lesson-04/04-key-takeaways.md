# Understand the hook
- Playwright reporter: là cơ chế cho phép custome cách báo cáo result, các report mặc đinh như HTML, JSON --> có thể mở rộng bằng cơ chế reporter để gửi thông báo theo yêu cầu (gửi thông báo cho Slack, Discord)

- Reporter Hooks = thời điểm đặc biệt trong quá trình chạy test
    + onBegin: chạy trước tất cả các test
        + đánh dấu thời điểm bắt đầu chạy
        + đếm xem có bao nhiêu test, test tên là gì
    + onTestBgin chạy trước test cụ thể
    + onTestEnd
    + onEnd: đánh dấu thời điểm kết thúc của lần chạy, băns kết quả về Slack, Discord

# Create custom reporter

import { FulConffig, FulResult. Reporter, Suit, TestCase, TestResult } from '@playwright/reporter';

export class CustomReporter Implements Reporter {
    async onBegin(config: FullConfig, suite: Suite): Promise<void> {

    }
    async onTestBegin( test: TestCase, result: TestResult ): void {

    }
    async onTestEnd(test: TestCase, result: TestResult ): void {

    }
    async onEnd(result: FulResult): Promise<void | {status?: FulResult["status"];} } undefined> {
}

# Thiết kế reporter

Kết quả: 
    + Passed: x/y
    + Failed: x/y
    + Skipped: x/y
    + TimeOut: x/y

# Một số function sẽ dùng
- Lấy thời gian format sẵn
const reportingTime = new Date(Date.now()).toLocaleString();

- Gọi API:
const response = await   (url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: 'str'
})

# Intergration Discord