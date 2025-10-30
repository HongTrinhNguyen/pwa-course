# Websocket

- Khác với HTTPS thông thường, Websocket là một giao thức truyền thông hai chiều (bidirectional) cho phép clien và server trao đổi realtime thông qua một kết nối **TCP** duy nhất (request - response)
    - giao tiếp hai chiều: cả client và server đều có thể chủ động gửi dữ liệu cho nhau bất cứ lúc nào
    - kết nối liên tục: sau khi hanshake, kết nối được duy trì cho đên khi một bên đóng
    - hiệu suất cao: vì không cần tao request liên tục giống như HTTPS polling, có thể giúp giảm overload 
    - real-time: phù hợp cho những ứng dụng cần cập nhật dữ liệu liên tục: live  notification, chat, ...

- Trong playwright cung cấp API mạnh mẽ để test Websocket thông qua các sự kiện của page

# Database testing

- Xác minh dữ liệu sau khi gọi API
- Phát hiện lỗi backend (dữ liệu không khớp giữa API và DB)
- Kết hợp với test automation để đảm bảo toàn bộ flow (UI - API - DB) hoạt động trơn tru