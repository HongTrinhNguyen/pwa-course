# TOTP (Time-based One Time Password)

- là thuật toán tạo mật khẩu một lần dựa trên thời gian, thường được sử dụng trong xác thực hai yếu tố (2FA)
- Nguyên lý hoạt động
    + mã số( thường là 6 chữ số ): thay đổi theo chu kì thời gian cố định (thường là 30s)
    + dựa trên secret key - được chia sẽ giữa server và client
    + sử dụng thuật toán HMAC-SHA1: kết hợp với timestamp hiện tại 
- Phổ biến trong google authenticator, miscrosoft authenticator, authy
- Thành phần chính
    + Share Secret
    + Thời gian hiện tại
    + Thuật toán HMAC-SHA1
- Quy trình tạo mã TOTP:
    + 1/ Tính thời gian hiện tại: counter = floor(current_time / time_step)
    ex: thời gian hiện tại là 165097600 với time step là 30s thì counter = floor(165097600/30) = 54169920
    + Kết hợp với secret + counter: hash = HMAC - SHA1(secret, counter)
    + Rút gọn chuỗi băm: 
        + lấy 4 byte cuối chuỗi 
        + chuyển 4 byte thành số nguyên
        + lấy module 10^6
- Quy trình xác thực: 
    + Client: người dùng nhập TOTP
    + Server: sử dụng cùng secret --> tạo ra TOTP --> só sánh TOTP mới tạo với cái client đã gửi

TOTP TRONG PLAYWRIGHT

import { test } from '@playwright/test';
import { authenticator } from 'otplib';

test('Verify TOTP', async ( {page} ) => {
    await page.goto('https://);

    const secret = 'aaaaa';

    //create TOTP
    const code = authenticator.generate(secret);
    console.log('Mã TOTP:', code);

    // add some code
    page.on('popup', async (dialog) => ){
        //await dialog.accept();
    });

    await page.locator('//input[@id='name']').fill("");
})

# Playwright MCP - Model Context Prototype

- Cài đặt MCP playwright
- Bật chat --> open setting --> Generate Agent Instruction file cho AI hiểu toàn bộ hệ thống code trong repo từ đó tạo ra code chính xác và tin cậy hơn