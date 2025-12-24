# Hướng Dẫn Thêm Nhạc Last Christmas

## Cách 1: Thêm file MP3 vào thư mục public

1. Tải file nhạc "Last Christmas" (file MP3)
2. Đổi tên file thành `last-christmas.mp3`
3. Đặt file vào thư mục `public/` của dự án
4. Component AudioPlayer sẽ tự động phát nhạc từ file này

## Cách 2: Sử dụng URL trực tiếp

Bạn có thể cập nhật URL trong file `src/components/AudioPlayer.jsx`:

```jsx
<source src="YOUR_AUDIO_URL_HERE" type="audio/mpeg" />
```

## Lưu ý về bản quyền

Đảm bảo bạn có quyền sử dụng file nhạc này trên trang web của mình.

