# Website Giới Thiệu Về Chủ Tịch Hồ Chí Minh 🇻🇳

Website tư liệu giáo dục truyền thống, tôn vinh cuộc đời, sự nghiệp cách mạng vẻ vang, những mẩu chuyện cảm động và di sản tư tưởng bất tử của **Chủ tịch Hồ Chí Minh** – Vị cha già kính yêu của dân tộc Việt Nam, Danh nhân văn hóa thế giới.

Ứng dụng được xây dựng theo kiến trúc fullstack hiện đại bằng **React** (Vite + Tailwind CSS) và **Node.js** (Express REST API).

---

## 🌟 Các Tính Năng Nổi Bật

1. **Trang Chủ & Tiểu Sử Tổng Quan**:
   - Tiêu đề hùng tráng, các mốc tên gọi qua các thời kỳ lịch sử (*Nguyễn Sinh Cung, Nguyễn Tất Thành, Văn Ba, Nguyễn Ái Quốc, Hồ Chí Minh*).
   - Thống kê ý nghĩa (79 mùa xuân trọn vẹn vì non sông, 30 năm bôn ba qua gần 30 quốc gia...).

2. **Hành Trình Bôn Ba Cứu Nước & Lãnh Đạo Cách Mạng (Interactive Timeline)**:
   - 7 giai đoạn lịch sử hào hùng từ năm 1890 đến 1969.
   - Sơ đồ các địa danh bất tử: Bến Nhà Rồng, Paris, London, New York, Moskva, Quảng Châu, Hương Cảng, Pác Bó, Ba Đình, Điện Biên Phủ...

3. **Kho Tàng Câu Chuyện Về Bác (Stories & Moral Lessons)**:
   - Những câu chuyện xúc động: *Đôi dép cao su của Bác, Hai bàn tay trắng dám đi khắp năm châu, Chiếc áo trấn thủ, Nước nóng và nước nguội, Thời gian quý báu lắm, Bác Hồ chia kẹo cho thiếu nhi, Bát chè sẻ đôi, Ngôi nhà sàn đơn sơ*.
   - **Tích hợp giọng đọc AI (Web Speech API)**: Nghe kể chuyện bằng giọng đọc tiếng Việt truyền cảm.
   - Trích xuất bài học đạo đức, phong cách sâu sắc cho thế hệ hôm nay.

4. **Tư Tưởng & Lời Dạy Của Bác**:
   - 5 điều Bác Hồ dạy thiếu niên nhi đồng (kèm giải thích chi tiết ý nghĩa thực tiễn).
   - Lời dạy cho thanh niên: Bài thơ *"Không có việc gì khó, chỉ sợ lòng không bền..."*.
   - Đạo đức cách mạng: *Cần, Kiệm, Liêm, Chính, Chí công vô tư*.
   - Trích đoạn Di chúc lịch sử.
   - Trình gợi ý danh ngôn suy ngẫm ngẫu nhiên mỗi ngày.

5. **Tư Liệu Ảnh Lịch Sử & Ca Khúc Ca Ngợi Bác**:
   - Bộ sưu tập ảnh tư liệu với tính năng phóng to chi tiết.
   - Danh mục các ca khúc bất hủ: *Như có Bác trong ngày vui đại thắng, Bác Hồ một tình yêu bao la, Tiếng hát giữa rừng Pác Bó, Đêm nghe hát đò đưa nhớ Bác...* kèm lời ca và hoàn cảnh sáng tác.

6. **Trắc Nghiệm Kiến Thức Lịch Sử (Quiz)**:
   - 8 câu hỏi trắc nghiệm kiểm tra hiểu biết lịch sử.
   - Phản hồi và giải thích lịch sử tức thì cho từng đáp án.
   - Hệ thống chấm điểm, cấp huy hiệu danh dự và hiệu ứng pháo hoa chúc mừng.

7. **Sổ Lưu Bút Tri Ân (Tribute Guestbook)**:
   - Người xem có thể viết cảm tưởng, lời biết ơn gửi gắm tới Bác.
   - Lưu trữ tự động vào backend Express và hiển thị ngay trên giao diện.

---

## 🛠️ Công Nghệ Sử Dụng

- **Frontend**:
  - React 18
  - Vite 6
  - Tailwind CSS 3
  - Lucide React (Icons)
  - Canvas Confetti
  - Web Speech API (Đọc văn bản thành giọng nói)
- **Backend**:
  - Node.js (v18+)
  - Express.js
  - CORS, JSON Data Persistence

---

## 🚀 Hướng Dẫn Cài Đặt & Chạy Dự Án

### Bước 1: Cài đặt Dependencies

Tại thư mục gốc của dự án:
```bash
npm run install:all
```
*(Lệnh này sẽ tự động cài đặt các gói cần thiết cho cả thư mục gốc, `server` và `client`)*

Hoặc bạn có thể cài đặt thủ công từng phần:
```bash
# Cài đặt server
cd server && npm install

# Cài đặt client
cd ../client && npm install
```

### Bước 2: Khởi động Dự án

Chỉ cần một lệnh tại thư mục gốc để khởi động đồng thời cả Backend và Frontend:
```bash
npm run dev
```

Hoặc chạy riêng biệt ở 2 cửa sổ terminal:
- **Terminal 1 (Backend API)**:
  ```bash
  cd server && npm run dev
  # Server chạy tại: http://localhost:5000
  ```

- **Terminal 2 (Frontend Client)**:
  ```bash
  cd client && npm run dev
  # Giao diện web chạy tại: http://localhost:5173
  ```

Mở trình duyệt truy cập: **`http://localhost:5173`** để trải nghiệm website!
