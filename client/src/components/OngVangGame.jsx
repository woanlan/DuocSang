import React, { useState, useEffect, useRef } from 'react';
import { 
  Heart, Clock, Award, Sparkles, RefreshCw, Volume2, VolumeX, 
  Lightbulb, HelpCircle, CheckCircle2, XCircle, ChevronRight, 
  Trophy, Flame, User, LogIn, UserPlus, LogOut, Play, Medal, ShieldAlert,
  Crown, Target, Compass, Anchor, Flag, Mountain, ScrollText, Landmark,
  Shield, MapPin, RotateCcw, BookOpen, Check, X, Eye, Maximize2,
  Volume1, Radio, Zap, ArrowRight, Share2, Dices, Gift
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { 
  loginUserApi, 
  registerUserApi, 
  saveGameScoreApi, 
  fetchLeaderboardApi 
} from '../services/api';
import ManhGhepBiAnGame from './ManhGhepBiAnGame';
import HaiTrinhVanDamGame from './HaiTrinhVanDamGame';
import { soundFX, stopVietnameseVoice } from '../utils/gameAudio';

// ================= QUIZ QUESTION BANK (24 AUTHENTIC HISTORICAL PHOTOS) =================
export const PHOTO_QUIZ_BANK = [
  {
    id: "tuyen-ngon-doc-lap",
    imageUrl: "/images/gallery/tuyen-ngon-doc-lap.jpg",
    question: "Bức ảnh lịch sử này ghi lại sự kiện trọng đại nào của dân tộc Việt Nam?",
    voicePrompt: "Đây là hình ảnh lịch sử nào? Xin mời bạn chọn một trong bốn đáp án.",
    options: [
      "Bác Hồ đọc Tuyên ngôn Độc lập tại Quảng trường Ba Đình (02/09/1945)",
      "Đại hội Toàn quốc thống nhất Mặt trận Việt Minh năm 1946",
      "Khai mạc Quốc hội khóa I nước Việt Nam Dân chủ Cộng hòa",
      "Mít-tinh chào mừng ngày Giải phóng Thủ đô Hà Nội 1954"
    ],
    correctIndex: 0,
    period: "Khai sinh nước Việt Nam mới",
    year: "02/09/1945",
    location: "Quảng trường Ba Đình, Hà Nội",
    hint: "Sự kiện lịch sử mùa thu năm 1945 khai sinh ra nước Việt Nam Dân chủ Cộng hòa.",
    explanation: "Ngày 2/9/1945, trước hàng chục vạn đồng bào tại Quảng trường Ba Đình, Chủ tịch Hồ Chí Minh đã đọc bản Tuyên ngôn Độc lập bất hủ, tuyên bố nước Việt Nam có quyền hưởng tự do và độc lập."
  },
  {
    id: "ben-nha-rong",
    imageUrl: "/images/gallery/ben-nha-rong.jpg",
    question: "Địa danh lịch sử nổi tiếng này là nơi người thanh niên Nguyễn Tất Thành đã làm gì?",
    voicePrompt: "Địa danh trong bức ảnh này gắn liền với sự kiện lịch sử nào của Bác Hồ?",
    options: [
      "Bến Nhà Rồng - Nơi Bác Hồ ra đi tìm đường cứu nước (05/06/1911)",
      "Cảng Ba Son - Nơi người thanh niên Văn Ba tham gia phong trào công nhân",
      "Bến Bạch Đằng - Nơi Bác trở về Nam Bộ thăm đồng bào miền Nam",
      "Cảng Hải Phòng - Nơi Bác đón kiều bào yêu nước từ Pháp trở về"
    ],
    correctIndex: 0,
    period: "Thời kỳ tìm đường cứu nước",
    year: "05/06/1911",
    location: "Bến cảng Nhà Rồng, Sài Gòn",
    hint: "Bến cảng bên dòng sông Sài Gòn nơi Người bắt đầu hành trình 30 năm bôn ba.",
    explanation: "Ngày 5/6/1911, từ Bến cảng Nhà Rồng (Sài Gòn), người thanh niên yêu nước Nguyễn Tất Thành bước lên tàu buôn Amiral Latouche-Tréville ra đi tìm đường cứu nước cho dân tộc."
  },
  {
    id: "pac-bo",
    imageUrl: "/images/gallery/pac-bo.jpg",
    question: "Di tích lịch sử trong ảnh là nơi Bác Hồ đã sống và làm việc khi nào?",
    voicePrompt: "Di tích trong bức ảnh này là nơi Bác Hồ đã sống và làm việc vào thời điểm nào?",
    options: [
      "Hang Pác Bó (Cao Bằng) - Nơi Bác trở về Tổ quốc đầu năm 1941",
      "Hang Cốc Bó - Căn cứ bí mật trong Chiến dịch Điện Biên Phủ 1954",
      "Động Tiên Sơn - Nơi thành lập Đội Cứu quốc quân",
      "Hang Thẩm Khuyên - Nơi họp Đại hội đại biểu toàn quốc lần thứ II"
    ],
    correctIndex: 0,
    period: "Trở về Tổ quốc (1941)",
    year: "Đầu năm 1941",
    location: "Pác Bó, Hà Quảng, Cao Bằng",
    hint: "Nơi có suối Lê-nin trong xanh và ngọn núi Các Mác hùng vĩ.",
    explanation: "Tháng 2/1941, sau 30 năm bôn ba hải ngoại, Bác Hồ đã trở về Tổ quốc qua cột mốc 108 và chọn Hang Pác Bó (Cao Bằng) làm căn cứ trực tiếp lãnh đạo phong trào cách mạng."
  },
  {
    id: "chien-dich-bien-gioi",
    imageUrl: "/images/gallery/chien-dich-bien-gioi.jpg",
    question: "Bức ảnh bất hủ này ghi lại khoảnh khắc lịch sử nào của Chủ tịch Hồ Chí Minh?",
    voicePrompt: "Bức ảnh bất hủ này ghi lại khoảnh khắc lịch sử nào của Bác Hồ?",
    options: [
      "Bác Hồ quan sát mặt trận trên đỉnh núi Báo Đông - Chiến dịch Biên giới 1950",
      "Bác Hồ thị sát đồi A1 trong Chiến dịch Điện Biên Phủ 1954",
      "Bác chỉ đạo diễn tập quân sự tại Chiến khu Việt Bắc năm 1947",
      "Bác Hồ theo dõi cuộc tiến công giải phóng thị xã Cao Bằng"
    ],
    correctIndex: 0,
    period: "Kháng chiến chống Pháp",
    year: "Thu - Đông 1950",
    location: "Đỉnh núi Báo Đông, Cao Bằng",
    hint: "Bức ảnh do nghệ sĩ nhiếp ảnh Vũ Năng An chụp trên đỉnh núi cao tại mặt trận Đông Khê.",
    explanation: "Bức ảnh ghi lại hình ảnh Bác Hồ chống gậy, chăm chú quan sát trận đánh Đông Khê trên đỉnh núi Báo Đông trong Chiến dịch Biên giới Thu - Đông 1950."
  },
  {
    id: "dai-hoi-tours",
    imageUrl: "/images/gallery/dai-hoi-tours.jpg",
    question: "Bức ảnh này ghi dấu sự kiện quốc tế quan trọng nào của đồng chí Nguyễn Ái Quốc?",
    voicePrompt: "Bức ảnh này ghi lại sự kiện quốc tế quan trọng nào của đồng chí Nguyễn Ái Quốc?",
    options: [
      "Nguyễn Ái Quốc tại Đại hội Tours (Pháp) - Tham gia sáng lập Đảng Cộng sản Pháp (1920)",
      "Đại hội Quốc tế Nông dân tại Moskva năm 1923",
      "Hội nghị Quốc tế Lao động tại Geneva năm 1925",
      "Nguyễn Ái Quốc phát biểu tại Đại hội V Quốc tế Cộng sản năm 1924"
    ],
    correctIndex: 0,
    period: "Hoạt động tại Pháp",
    year: "Tháng 12/1920",
    location: "Tours, Cộng hòa Pháp",
    hint: "Sự kiện lịch sử trên đất Pháp nơi Người bỏ phiếu tán thành Quốc tế thứ ba.",
    explanation: "Tại Đại hội Tours tháng 12/1920, Nguyễn Ái Quốc đã bỏ phiếu tán thành gia nhập Quốc tế III và tham gia sáng lập Đảng Cộng sản Pháp, trở thành người cộng sản Việt Nam đầu tiên."
  },
  {
    id: "di-tich-kim-lien",
    imageUrl: "/images/gallery/di-tich-kim-lien.png",
    question: "Di tích lịch sử Quốc gia đặc biệt trong ảnh có ý nghĩa gì đối với Chủ tịch Hồ Chí Minh?",
    voicePrompt: "Đây là di tích lịch sử nào gắn liền với thời niên thiếu của Bác Hồ?",
    options: [
      "Khu di tích Kim Liên (Nam Đàn, Nghệ An) - Quê hương nuôi dưỡng tuổi thơ của Bác",
      "Khu lưu niệm cụ Phó bảng Nguyễn Sinh Sắc tại Cao Lãnh (Đồng Tháp)",
      "Khu di tích lịch sử Tân Trào (Tuyên Quang)",
      "Khu di tích Pác Bó (Cao Bằng)"
    ],
    correctIndex: 0,
    period: "Cội nguồn quê hương",
    year: "1890 - 1906",
    location: "Nam Đàn, Nghệ An",
    hint: "Chiếc nôi quê hương xứ Nghệ gắn với làng Sen và làng Hoàng Trù.",
    explanation: "Khu di tích Kim Liên lưu giữ trọn vẹn những ký ức tuổi thơ êm đềm và nuôi dưỡng nhân cách cao đẹp của Chủ tịch Hồ Chí Minh tại quê nội Làng Sen và quê ngoại Hoàng Trù."
  },
  {
    id: "kinh-thanh-hue",
    imageUrl: "/images/gallery/kinh-thanh-hue.png",
    question: "Địa danh này ghi dấu giai đoạn nào trong cuộc đời Bác Hồ?",
    voicePrompt: "Địa danh trong bức ảnh này ghi dấu giai đoạn nào của Bác Hồ?",
    options: [
      "Kinh thành Huế - Nơi Bác theo cha sinh sống và học tập thời niên thiếu (1895 - 1909)",
      "Cố đô Hoa Lư - Nơi Bác ghé thăm trên đường công tác",
      "Thành cổ Quảng Trị - Nơi Bác gửi thư động viên bộ đội",
      "Hoàng thành Thăng Long - Nơi Bác chủ trì các phiên họp Chính phủ"
    ],
    correctIndex: 0,
    period: "Thời niên thiếu gian nan",
    year: "1895 - 1909",
    location: "Thừa Thiên - Huế",
    hint: "Kinh đô cổ kính nơi Bác theo cha vào học chữ Hán và tiếng Pháp, sớm chứng kiến nỗi đau mất mẹ.",
    explanation: "Bác Hồ đã có khoảng 10 năm sinh sống và học tập tại Huế. Tại đây Người chứng kiến cảnh lầm than của nhân dân dưới ách thực dân phong kiến và sớm hun đúc ý chí cứu nước."
  },
  {
    id: "lang-sen",
    imageUrl: "/images/gallery/lang-sen.png",
    question: "Ngôi nhà tranh mộc mạc 5 gian trong ảnh là di tích nào?",
    voicePrompt: "Ngôi nhà tranh mộc mạc trong ảnh là di tích lịch sử nào của Bác?",
    options: [
      "Ngôi nhà 5 gian quê nội Bác Hồ tại Làng Sen (Kim Liên, Nam Đàn, Nghệ An)",
      "Ngôi nhà tranh quê ngoại Bác Hồ tại Làng Hoàng Trù",
      "Nhà lưu niệm Bác Hồ tại làng Dương Nỗ (Huế)",
      "Lán Nà Nưa tại Tân Trào (Tuyên Quang)"
    ],
    correctIndex: 0,
    period: "Tuổi thơ quê Bác",
    year: "1901 - 1906",
    location: "Làng Sen, Nam Đàn, Nghệ An",
    hint: "Ngôi nhà gỗ 5 gian do bà con dân làng dựng mừng cụ Nguyễn Sinh Sắc đỗ Phó bảng năm 1901.",
    explanation: "Ngôi nhà gỗ 5 gian lợp mái tranh đơn sơ mộc mạc tại Làng Sen là nơi Bác Hồ đã gắn bó trong những năm tháng niên thiếu khi cha Người đỗ Phó bảng."
  },
  {
    id: "nha-san-bac-ho",
    imageUrl: "/images/gallery/nha-san-bac-ho.jpg",
    question: "Công trình kiến trúc đơn sơ, mộc mạc trong ảnh là nơi nào?",
    voicePrompt: "Công trình kiến trúc đơn sơ trong ảnh là nơi nào gắn bó với Bác Hồ?",
    options: [
      "Nhà sàn Bác Hồ tại Phủ Chủ tịch (Hà Nội)",
      "Lán Khuổi Nặm tại Pác Bó",
      "Trụ sở Bộ Tổng Tham mưu tại ATK Định Hóa",
      "Nhà làm việc của Bác tại Quảng Châu (Trung Quốc)"
    ],
    correctIndex: 0,
    period: "Thời kỳ hòa bình xây dựng đất nước",
    year: "1958 - 1969",
    location: "Khu Phủ Chủ tịch, Ba Đình, Hà Nội",
    hint: "Ngôi nhà gỗ 2 tầng nhìn ra bờ ao cá, nơi Bác sống và làm việc suốt 11 năm cuối đời.",
    explanation: "Nhà sàn Bác Hồ tại Phủ Chủ tịch là nơi Người đã sống và làm việc từ năm 1958 đến khi qua đời năm 1969, biểu tượng ngời sáng cho đức tính giản dị, thanh bạch của Người."
  },
  {
    id: "dien-bien-phu",
    imageUrl: "/images/gallery/dien-bien-phu.jpg",
    question: "Hình ảnh lịch sử này gắn liền với chiến dịch lẫy lừng nào mà Bác Hồ cùng Bộ Chính trị chỉ đạo?",
    voicePrompt: "Hình ảnh này gắn liền với chiến dịch lịch sử lừng lẫy nào?",
    options: [
      "Chiến dịch Điện Biên Phủ 1954 - Lừng lẫy năm châu, chấn động địa cầu",
      "Chiến dịch Việt Bắc Thu - Đông 1947",
      "Chiến dịch Hòa Bình 1951 - 1952",
      "Chiến dịch Tây Bắc 1952"
    ],
    correctIndex: 0,
    period: "Chiến thắng Điện Biên Phủ",
    year: "07/05/1954",
    location: "Điện Biên Phủ",
    hint: "Chiến thắng kết thúc thắng lợi cuộc kháng chiến chống thực dân Pháp xâm lược.",
    explanation: "Dưới sự lãnh đạo sáng suốt của Chủ tịch Hồ Chí Minh và Trung ương Đảng, quân và dân ta đã giành thắng lợi vang dội trong Chiến dịch Điện Biên Phủ 1954."
  },
  {
    id: "tau-latouche-treville",
    imageUrl: "/images/timeline/tau-latouche-treville.jpg",
    question: "Con tàu hơi nước buôn này có tên là gì và mang ý nghĩa lịch sử nào?",
    voicePrompt: "Con tàu lịch sử này có tên là gì và gắn với sự kiện nào của Bác Hồ?",
    options: [
      "Tàu Amiral Latouche-Tréville - Đưa người thanh niên Văn Ba ra đi tìm đường cứu nước",
      "Tàu Đô đốc Courbet - Đưa phái đoàn Việt Nam sang dự Hội nghị Fontainebleau",
      "Tàu Dumont d'Urville - Chở tài liệu cách mạng về nước",
      "Tàu D'Artagnan - Đưa kiều bào Pháp ủng hộ cách mạng"
    ],
    correctIndex: 0,
    period: "Khởi hành tìm đường cứu nước",
    year: "1911",
    location: "Bến Nhà Rồng, Sài Gòn",
    hint: "Con tàu buôn của hãng vận tải Hợp Thành (Chargeurs Réunis) của Pháp cập cảng Sài Gòn năm 1911.",
    explanation: "Người thanh niên Nguyễn Tất Thành nhận làm phụ bếp dưới tên Văn Ba trên con tàu buôn Amiral Latouche-Tréville để rời Tổ quốc ngày 5/6/1911 đi tìm chân lý cứu nước."
  },
  {
    id: "truong-duc-thanh",
    imageUrl: "/images/timeline/truong-duc-thanh.jpg",
    question: "Ngôi trường cổ kính trong ảnh là nơi Bác Hồ đã từng làm công việc gì?",
    voicePrompt: "Ngôi trường cổ kính này là nơi Bác Hồ từng làm công việc gì thời trẻ?",
    options: [
      "Trường Dục Thanh (Phan Thiết) - Nơi thầy giáo Nguyễn Tất Thành dạy học (1910)",
      "Trường Quốc học Quy Nhơn - Nơi Người theo học chữ Pháp",
      "Trường Tiểu học Đông Ba - Nơi Người đạt điểm thi xuất sắc",
      "Trường dòng La San - Nơi Người phụ tá công tác xã hội"
    ],
    correctIndex: 0,
    period: "Thầy giáo trẻ Nguyễn Tất Thành",
    year: "1910 - 1911",
    location: "Phan Thiết, Bình Thuận",
    hint: "Ngôi trường do các sĩ phu yêu nước phong trào Duy Tân sáng lập bên bờ sông Cà Ty.",
    explanation: "Tại Trường Dục Thanh (Phan Thiết), thầy giáo Nguyễn Tất Thành đã dạy chữ Quốc ngữ, chữ Hán và thể dục, truyền tình yêu quê hương đất nước cho học trò trước khi vào Sài Gòn."
  },
  {
    id: "truong-quoc-hoc-hue",
    imageUrl: "/images/timeline/truong-quoc-hoc-hue.jpg",
    question: "Ngôi trường nổi tiếng bên dòng sông Hương này là nơi Bác Hồ đã từng làm gì?",
    voicePrompt: "Ngôi trường nổi tiếng bên dòng sông Hương này là nơi Bác Hồ từng làm gì?",
    options: [
      "Trường Quốc học Huế - Nơi người thanh niên Nguyễn Tất Thành theo học (1907 - 1908)",
      "Nơi Bác Hồ dạy học chữ Hán cho các sĩ tử Nam triều",
      "Nơi Bác thành lập chi bộ thanh niên bí mật đầu tiên",
      "Nơi Bác diễn thuyết trước công chúng về chủ nghĩa yêu nước"
    ],
    correctIndex: 0,
    period: "Thời niên thiếu tại Huế",
    year: "1907 - 1908",
    location: "Thừa Thiên - Huế",
    hint: "Ngôi trường danh tiếng xây dựng bên bờ sông Hương thơ mộng.",
    explanation: "Tại trường Quốc học Huế, Nguyễn Tất Thành đã tiếp thu nền tân học phương Tây, đồng thời trực tiếp tham gia cuộc biểu tình chống sưu thuế của nông dân Thừa Thiên năm 1908."
  },
  {
    id: "duong-kach-menh",
    imageUrl: "/images/timeline/duong-kach-menh.jpg",
    question: "Cuốn sách lý luận cách mạng kinh điển xuất bản năm 1927 trong ảnh có tên là gì?",
    voicePrompt: "Cuốn sách lý luận cách mạng kinh điển xuất bản năm 1927 này có tên là gì?",
    options: [
      "Tác phẩm 'Đường Kách Mệnh' (1927) của đồng chí Nguyễn Ái Quốc",
      "Tác phẩm 'Bản án chế độ thực dân Pháp' (1925)",
      "Tác phẩm 'Chính cương vắn tắt của Đảng' (1930)",
      "Tác phẩm 'Sửa đổi lối làm việc' (1947)"
    ],
    correctIndex: 0,
    period: "Truyền bá chủ nghĩa Mác - Lênin",
    year: "1927",
    location: "Quảng Châu, Trung Quốc",
    hint: "Cuốn sách mở đầu bằng câu nói nổi tiếng của Lênin: 'Không có lý luận cách mạng thì không có phong trào cách mạng'.",
    explanation: "'Đường Kách Mệnh' tập hợp các bài giảng của Nguyễn Ái Quốc tại các lớp huấn luyện chính trị ở Quảng Châu, là cẩm nang gối đầu giường chuẩn bị về tư tưởng cho sự ra đời của Đảng ta."
  },
  {
    id: "nhat-ky-trong-tu",
    imageUrl: "/images/timeline/nhat-ky-trong-tu.jpg",
    question: "Tập thơ chữ Hán vô giá gồm 133 bài thơ được Bác sáng tác trong chốn lao tù này là tác phẩm nào?",
    voicePrompt: "Đây là tập thơ lịch sử vô giá nào của Chủ tịch Hồ Chí Minh?",
    options: [
      "Tập thơ 'Nhật Ký Trong Tù' (Ngục Trung Nhật Ký, 1942 - 1943)",
      "Tập thơ 'Thơ Chúc Tết' của Bác Hồ",
      "Tập thơ 'Việt Bắc' của Hồ Chí Minh",
      "Tập thơ 'Cảnh Khuya' sáng tác tại Chiến khu Việt Bắc"
    ],
    correctIndex: 0,
    period: "Bị giam cầm tại Quảng Tây",
    year: "1942 - 1943",
    location: "Quảng Tây, Trung Quốc",
    hint: "Tập thơ gồm 133 bài viết bằng chữ Hán trong suốt 14 tháng bị giam cầm tại 30 nhà lao.",
    explanation: "'Nhật ký trong tù' là bảo vật quốc gia bất hủ, thể hiện tinh thần thép kiên cường, tấm lòng nhân đạo bao la và tâm hồn thi sĩ lạc quan cách mạng của Bác Hồ."
  },
  {
    id: "lan-na-nua",
    imageUrl: "/images/timeline/lan-na-nua.jpg",
    question: "Căn lán đơn sơ nằm giữa rừng Tân Trào này là di tích lịch sử nào?",
    voicePrompt: "Căn lán lịch sử đơn sơ giữa rừng Tân Trào này có tên là gì?",
    options: [
      "Lán Nà Nưa (Tân Trào, Tuyên Quang) - Nơi Bác chỉ đạo Cách mạng Tháng Tám 1945",
      "Lán Hang Bòng (Định Hóa, Thái Nguyên)",
      "Lán Tỉn Keo (Thái Nguyên) nơi họp Bộ Chính trị bàn chiến cuộc Đông - Xuân",
      "Lán Khuổi Nặm (Pác Bó, Cao Bằng)"
    ],
    correctIndex: 0,
    period: "Tiền khởi nghĩa Cách mạng Tháng Tám",
    year: "Mùa hè năm 1945",
    location: "Tân Trào, Sơn Dương, Tuyên Quang",
    hint: "Nơi Bác căn dặn: 'Dù phải đốt cháy cả dãy Trường Sơn cũng phải kiên quyết giành cho được độc lập!'.",
    explanation: "Tại Lán Nà Nưa, dù đang ốm nặng, Bác Hồ vẫn kiên quyết chỉ đạo chớp thời cơ thuận lợi để phát động Tổng khởi nghĩa giành chính quyền về tay nhân dân trong cả nước."
  },
  {
    id: "lan-khuoi-nam",
    imageUrl: "/images/timeline/lan-khuoi-nam.jpg",
    question: "Căn lán này là nơi diễn ra sự kiện lịch sử quan trọng nào vào tháng 5/1941?",
    voicePrompt: "Căn lán này là nơi diễn ra sự kiện lịch sử quan trọng nào năm 1941?",
    options: [
      "Lán Khuổi Nặm (Pác Bó) - Nơi họp Hội nghị Trung ương 8 thành lập Mặt trận Việt Minh",
      "Nơi Bác Hồ viết bản Tuyên ngôn Độc lập",
      "Nơi thành lập Đội Việt Nam Tuyên truyền Giải phóng quân",
      "Nơi xuất bản số báo Độc Lập đầu tiên"
    ],
    correctIndex: 0,
    period: "Thành lập Mặt trận Việt Minh",
    year: "Tháng 05/1941",
    location: "Pác Bó, Hà Quảng, Cao Bằng",
    hint: "Hội nghị Ban Chấp hành Trung ương Đảng lần thứ 8 do Nguyễn Ái Quốc chủ trì.",
    explanation: "Tại Lán Khuổi Nặm, Hội nghị Trung ương 8 (5/1941) dưới sự chủ trì của Bác đã quyết định đặt nhiệm vụ giải phóng dân tộc lên hàng đầu và thành lập Mặt trận Việt Minh."
  },
  {
    id: "thanh-lap-dang-1930",
    imageUrl: "/images/timeline/thanh-lap-dang-1930.jpg",
    question: "Bức tranh tái hiện sự kiện lịch sử trọng đại nào diễn ra đầu năm 1930?",
    voicePrompt: "Bức tranh tái hiện sự kiện lịch sử trọng đại nào diễn ra đầu năm 1930?",
    options: [
      "Hội nghị thành lập Đảng Cộng sản Việt Nam (03/02/1930 tại Hương Cảng)",
      "Đại hội đại biểu toàn quốc lần thứ I của Đảng tại Ma Cao",
      "Hội nghị thống nhất Việt Minh và Hội Liên Việt",
      "Hội nghị thành lập Hội Việt Nam Cách mạng Thanh niên"
    ],
    correctIndex: 0,
    period: "Thành lập Đảng Cộng sản Việt Nam",
    year: "03/02/1930",
    location: "Cửu Long, Hương Cảng (Hong Kong)",
    hint: "Đồng chí Nguyễn Ái Quốc với tư cách phái viên Quốc tế Cộng sản chủ trì hội nghị hợp nhất.",
    explanation: "Mùa xuân năm 1930, đồng chí Nguyễn Ái Quốc đã chủ trì Hội nghị hợp nhất ba tổ chức cộng sản (Đông Dương CS Đảng, An Nam CS Đảng, Đông Dương CS Liên đoàn) thành lập Đảng Cộng sản Việt Nam duy nhất."
  },
  {
    id: "bao-le-paria",
    imageUrl: "/images/timeline/bao-le-paria.jpg",
    question: "Tờ báo tiếng Pháp nổi tiếng do Nguyễn Ái Quốc làm chủ nhiệm kiêm chủ bút năm 1922 là gì?",
    voicePrompt: "Tờ báo lịch sử bằng tiếng Pháp này có tên là gì?",
    options: [
      "Báo Le Paria (Người Cùng Khổ) xuất bản tại Paris năm 1922",
      "Báo L'Humanité (Nhân Đạo) của Đảng Cộng sản Pháp",
      "Báo Thanh Niên của Hội Việt Nam Cách mạng Thanh niên",
      "Báo Việt Nam Độc Lập xuất bản tại Cao Bằng"
    ],
    correctIndex: 0,
    period: "Báo chí cách mạng tại Paris",
    year: "1922 - 1926",
    location: "Paris, Cộng hòa Pháp",
    hint: "Tờ báo là cơ quan ngôn luận của Hội Liên hiệp Thuộc địa do Nguyễn Ái Quốc sáng lập.",
    explanation: "Báo Le Paria (Người Cùng Khổ) xuất bản số đầu tiên ngày 1/4/1922, là diễn đàn đấu tranh vạch trần tội ác của chủ nghĩa thực dân và đoàn kết các dân tộc bị áp bức."
  },
  {
    id: "cot-moc-108",
    imageUrl: "/images/timeline/cot-moc-108.jpg",
    question: "Cột mốc biên giới thiêng liêng nơi Bác Hồ đặt bước chân đầu tiên trở về Tổ quốc năm 1941 là gì?",
    voicePrompt: "Cột mốc biên giới lịch sử thiêng liêng này mang số hiệu bao nhiêu?",
    options: [
      "Cột mốc 108 biên giới Việt - Trung (nay là cột mốc 675 tại Cao Bằng)",
      "Cột mốc số 0 tại Tràng Định, Lạng Sơn",
      "Cột mốc A Pa Chải tại ngã ba biên giới",
      "Cột mốc 115 tại cửa khẩu Trà Lĩnh"
    ],
    correctIndex: 0,
    period: "Khoảnh khắc trở về Tổ quốc",
    year: "28/01/1941",
    location: "Trường Hà, Hà Quảng, Cao Bằng",
    hint: "Cột mốc bằng đá đánh dấu ranh giới mà Người đã xúc động cúi mình chạm vào đất mẹ.",
    explanation: "Ngày 28/01/1941 (mùng 2 Tết Tân Tỵ), Bác Hồ đã vượt qua cột mốc 108 để trở về quê hương sau 30 năm bôn ba hải ngoại, mở ra thời kỳ chuẩn bị cho thắng lợi của Cách mạng Tháng Tám."
  },
  {
    id: "carlton-hotel",
    imageUrl: "/images/timeline/carlton-hotel.jpg",
    question: "Khách sạn cổ kính tại London nơi người thanh niên Nguyễn Tất Thành từng làm phụ bếp là khách sạn nào?",
    voicePrompt: "Khách sạn cổ kính tại Luân Đôn nơi Bác từng làm việc có tên là gì?",
    options: [
      "Khách sạn Carlton (London, Vương quốc Anh) những năm 1914 - 1917",
      "Khách sạn Savoy trên bờ sông Thames",
      "Khách sạn Ritz London",
      "Khách sạn Grand Hotel Paris"
    ],
    correctIndex: 0,
    period: "Những năm tháng tại nước Anh",
    year: "1914 - 1917",
    location: "London, Vương quốc Anh",
    hint: "Khách sạn sang trọng bậc nhất London nơi có vị bếp trưởng huyền thoại Auguste Escoffier.",
    explanation: "Tại London, Nguyễn Tất Thành làm phụ bếp tại khách sạn Carlton và được vua bếp Auguste Escoffier nhận dạy nghề làm bánh, đồng thời Người học tiếng Anh và nghiên cứu phong trào công nhân Anh."
  },
  {
    id: "ngo-compoint",
    imageUrl: "/images/timeline/ngo-compoint.jpg",
    question: "Ngôi nhà số 9 trong con ngõ nhỏ tại Paris gắn liền với viên gạch sưởi ấm mùa đông của Nguyễn Ái Quốc là gì?",
    voicePrompt: "Con ngõ nhỏ tại Pa-ri gắn liền với viên gạch sưởi mùa đông của Bác có tên là gì?",
    options: [
      "Ngõ Compoint, Quận 17, Paris (1921 - 1923)",
      "Đại lộ Champs-Élysées, Paris",
      "Phố Gobelins, Quận 13, Paris",
      "Phố Montmartre, Paris"
    ],
    correctIndex: 0,
    period: "Gian lao ngày đông Paris",
    year: "1921 - 1923",
    location: "Quận 17, Paris, Pháp",
    hint: "Căn phòng nhỏ vỏn vẹn 9 mét vuông không có lò sưởi.",
    explanation: "Căn phòng gác mái số 9 ngõ Compoint không có hệ thống sưởi, mỗi buổi sáng mùa đông Nguyễn Ái Quốc đã đặt một viên gạch vào lò than của chủ nhà để tối mang về ủ ấm giường nằm."
  },
  {
    id: "lang-bac-ho",
    imageUrl: "/images/gallery/lang-bac-ho.jpg",
    question: "Công trình thiêng liêng tại Quảng trường Ba Đình nơi lưu giữ thi hài Chủ tịch Hồ Chí Minh là gì?",
    voicePrompt: "Công trình thiêng liêng trong bức ảnh này là nơi nào?",
    options: [
      "Lăng Chủ tịch Hồ Chí Minh tại Quảng trường Ba Đình (Hà Nội)",
      "Bảo tàng Hồ Chí Minh tại Ba Đình",
      "Khu tưởng niệm Bác Hồ tại Tân Trào",
      "Đền thờ Bác Hồ tại Định Hóa, Thái Nguyên"
    ],
    correctIndex: 0,
    period: "Di sản vĩnh cửu",
    year: "Khánh thành 1975",
    location: "Quảng trường Ba Đình, Hà Nội",
    hint: "Nơi hàng triệu người con Việt Nam và bạn bè quốc tế viếng thăm Người mỗi năm.",
    explanation: "Lăng Chủ tịch Hồ Chí Minh được khởi công xây dựng năm 1973 và khánh thành ngày 29/8/1975 tại chính vị trí Lễ đài Ba Đình nơi Bác đọc Tuyên ngôn Độc lập năm 1945."
  },
  {
    id: "bac-voi-thieu-nhi",
    imageUrl: "/images/gallery/bac-voi-thieu-nhi.jpg",
    question: "Bức ảnh chan chứa tình cảm ấm áp này thể hiện điều gì ở Chủ tịch Hồ Chí Minh?",
    voicePrompt: "Bức ảnh ấm áp này thể hiện tình cảm của Bác Hồ dành cho ai?",
    options: [
      "Tình yêu thương bao la của Bác Hồ dành cho các cháu thiếu niên, nhi đồng",
      "Bác Hồ thăm các chiến sĩ Trung đoàn Thủ đô",
      "Bác Hồ trò chuyện cùng các đại biểu phụ nữ toàn quốc",
      "Bác Hồ gặp gỡ các giáo viên gương mẫu"
    ],
    correctIndex: 0,
    period: "Tình thương bao la của Bác",
    year: "Thời kỳ kháng chiến và hòa bình",
    location: "Hà Nội",
    hint: "'Ai yêu nhi đồng bằng Bác Hồ Chí Minh' - câu hát bất hủ khắc sâu trong triệu triệu trái tim thiếu nhi.",
    explanation: "Chủ tịch Hồ Chí Minh luôn dành cho các cháu thiếu niên, nhi đồng tình yêu thương bao la và sâu sắc nhất. Người để lại 5 điều dạy vô giá cho các thế hệ măng non đất nước."
  }
];

// Kahoot/Quizizz Answer Card Themes (4 distinct colors & shapes)
const OPTION_STYLES = [
  {
    letter: "A",
    shape: "▲",
    shapeName: "Tam giác",
    bgClass: "from-rose-600 via-rose-700 to-red-800",
    borderClass: "border-rose-400/60 hover:border-rose-300",
    badgeClass: "bg-rose-900/90 text-rose-100 border-rose-400/50",
    shadowClass: "shadow-[0_8px_25px_rgba(225,29,72,0.35)]",
    activeRing: "ring-4 ring-rose-400"
  },
  {
    letter: "B",
    shape: "◆",
    shapeName: "Hình thoi",
    bgClass: "from-blue-600 via-blue-700 to-indigo-800",
    borderClass: "border-blue-400/60 hover:border-blue-300",
    badgeClass: "bg-blue-900/90 text-blue-100 border-blue-400/50",
    shadowClass: "shadow-[0_8px_25px_rgba(37,99,235,0.35)]",
    activeRing: "ring-4 ring-blue-400"
  },
  {
    letter: "C",
    shape: "●",
    shapeName: "Hình tròn",
    bgClass: "from-amber-500 via-amber-600 to-orange-700",
    borderClass: "border-amber-400/60 hover:border-amber-300",
    badgeClass: "bg-amber-900/90 text-amber-100 border-amber-400/50",
    shadowClass: "shadow-[0_8px_25px_rgba(245,158,11,0.35)]",
    activeRing: "ring-4 ring-amber-400"
  },
  {
    letter: "D",
    shape: "■",
    shapeName: "Hình vuông",
    bgClass: "from-emerald-600 via-emerald-700 to-teal-800",
    borderClass: "border-emerald-400/60 hover:border-emerald-300",
    badgeClass: "bg-emerald-900/90 text-emerald-100 border-emerald-400/50",
    shadowClass: "shadow-[0_8px_25px_rgba(16,185,129,0.35)]",
    activeRing: "ring-4 ring-emerald-400"
  }
];

const TOTAL_QUESTION_TIME = 35; // 35 seconds per question

export default function OngVangGame() {
  // Active minigame mode: 'puzzle' (Lật mảnh ghép 6 lá cờ) | 'journey' (Bản đồ hải trình) | 'quiz' (Đố vui 35s)
  const [activeGameTab, setActiveGameTab] = useState('puzzle');
  const [isRulesModalOpen, setIsRulesModalOpen] = useState(false);
  const [rulesTab, setRulesTab] = useState('puzzle');

  // Game state: 'start' | 'playing' | 'gameover'
  const [gameState, setGameState] = useState('start');
  const [selectedTotalQuestions, setSelectedTotalQuestions] = useState(10);
  const [activeQuestions, setActiveQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);

  // In-question states
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [lives, setLives] = useState(3);
  const [timeLeft, setTimeLeft] = useState(TOTAL_QUESTION_TIME);
  const [correctCount, setCorrectCount] = useState(0);

  // Calculate real-time points decreasing from 1000 down to 100 based on remaining time
  const currentPotentialPoints = Math.max(100, Math.round((timeLeft / TOTAL_QUESTION_TIME) * 1000));

  // Audio / Speech settings
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Power-ups
  const [used5050, setUsed5050] = useState(false);
  const [hiddenOptions, setHiddenOptions] = useState([]);
  const [showHint, setShowHint] = useState(false);
  const [usedHint, setUsedHint] = useState(false);

  // Fullscreen Zoom Modal
  const [zoomedImage, setZoomedImage] = useState(null);

  // User Auth & Leaderboard
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [authUsername, setAuthUsername] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authSuccessMsg, setAuthSuccessMsg] = useState('');
  const [leaderboard, setLeaderboard] = useState([]);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);

  const timerRef = useRef(null);
  const questionStartTimeRef = useRef(Date.now());

  // Load user and leaderboard on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('ong_vang_current_user');
      if (saved) setCurrentUser(JSON.parse(saved));
    } catch (e) {}

    fetchLeaderboardApi().then(data => {
      if (data && data.length > 0) setLeaderboard(data);
    });

    // Pre-populate available speech voices
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
    }

    return () => {
      stopVoice();
    };
  }, []);

  // Sync sound FX mute state
  useEffect(() => {
    soundFX.enabled = soundEnabled;
  }, [soundEnabled]);

  const audioPlayerRef = useRef(null);

  // Stop any active speech (both audio player and Web Speech)
  const stopVoice = () => {
    if (audioPlayerRef.current) {
      try {
        audioPlayerRef.current.pause();
        audioPlayerRef.current.currentTime = 0;
      } catch (e) {}
    }
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  };

  // High Quality Vietnamese Voice Narrator (Backend Google Vietnamese TTS + Fallback)
  const speakVoice = (text) => {
    if (!voiceEnabled || !text || !text.trim()) return;
    
    stopVoice();

    try {
      if (!audioPlayerRef.current) {
        audioPlayerRef.current = new Audio();
      }
      const audio = audioPlayerRef.current;
      audio.pause();
      audio.currentTime = 0;
      
      // Native high quality Vietnamese TTS stream from server
      const ttsUrl = `/api/tts?text=${encodeURIComponent(text.trim())}`;
      audio.src = ttsUrl;
      audio.playbackRate = 1.0;

      setIsSpeaking(true);

      audio.onended = () => {
        setIsSpeaking(false);
      };

      audio.onerror = () => {
        console.warn('Backend TTS failed, falling back to Web Speech...');
        speakWebSpeechFallback(text);
      };

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((e) => {
          console.warn('Audio play interrupted or user interaction required:', e.message);
          speakWebSpeechFallback(text);
        });
      }
    } catch (e) {
      speakWebSpeechFallback(text);
    }
  };

  // Web Speech API Fallback
  const speakWebSpeechFallback = (text) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      setIsSpeaking(false);
      return;
    }
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'vi-VN';
      utterance.rate = 0.95;
      utterance.pitch = 1.0;

      const voices = window.speechSynthesis.getVoices();
      const viVoice = voices.find(v => v.lang && (v.lang.toLowerCase().includes('vi') || v.lang.toLowerCase().includes('vn')));
      if (viVoice) utterance.voice = viVoice;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      setIsSpeaking(false);
    }
  };

  // Fisher-Yates shuffle for options and questions
  const shuffleArray = (arr) => {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  // Prepare randomized questions with shuffled options
  const prepareQuestionBank = (count) => {
    const shuffledBank = shuffleArray(PHOTO_QUIZ_BANK);
    const chosen = shuffledBank.slice(0, Math.min(count, shuffledBank.length));

    return chosen.map(q => {
      const rawOptions = [...q.options];
      const correctIdx = q.correctIndex;
      const indexed = rawOptions.map((opt, idx) => ({
        text: opt,
        isCorrect: idx === correctIdx
      }));
      const shuffledOptions = shuffleArray(indexed);
      const newCorrectIdx = shuffledOptions.findIndex(o => o.isCorrect);

      return {
        ...q,
        options: shuffledOptions.map(o => o.text),
        correctIndex: newCorrectIdx
      };
    });
  };

  // Start new game session
  const handleStartGame = () => {
    const questions = prepareQuestionBank(selectedTotalQuestions);
    setActiveQuestions(questions);
    setCurrentIdx(0);
    setSelectedOpt(null);
    setIsAnswered(false);
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setLives(3);
    setTimeLeft(TOTAL_QUESTION_TIME);
    setCorrectCount(0);
    setUsed5050(false);
    setHiddenOptions([]);
    setShowHint(false);
    setUsedHint(false);
    setGameState('playing');

    // Trigger voice for first question
    if (questions[0]) {
      setTimeout(() => {
        const prompt = questions[0].voicePrompt || "Đây là hình ảnh lịch sử nào? Xin mời bạn chọn đáp án.";
        speakVoice(prompt);
      }, 500);
    }
  };

  // Question Timer Countdown: Resets fresh 35.0 seconds for EACH INDIVIDUAL QUESTION
  useEffect(() => {
    if (gameState !== 'playing' || isAnswered) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    // Set starting timestamp and reset time for this specific question
    questionStartTimeRef.current = Date.now();
    setTimeLeft(TOTAL_QUESTION_TIME);

    timerRef.current = setInterval(() => {
      const elapsed = (Date.now() - questionStartTimeRef.current) / 1000;
      const remaining = Math.max(0, +(TOTAL_QUESTION_TIME - elapsed).toFixed(1));

      setTimeLeft(remaining);

      // Play tick sound on whole seconds when time <= 6s
      if (remaining <= 6 && remaining > 0 && Math.abs(remaining - Math.round(remaining)) < 0.06) {
        soundFX.playTick();
      }

      if (remaining <= 0) {
        clearInterval(timerRef.current);
        handleTimeOut();
      }
    }, 100);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState, isAnswered, currentIdx]);

  // Handle Timeout (runs out of time)
  const handleTimeOut = () => {
    setIsAnswered(true);
    setSelectedOpt(-1); // No option selected
    setStreak(0);
    soundFX.playWrong();

    const q = activeQuestions[currentIdx];
    const correctLetter = OPTION_STYLES[q.correctIndex]?.letter || '';
    const correctText = q?.options?.[q.correctIndex] || '';

    speakVoice(`Hết giờ rồi! Đáp án đúng là đáp án ${correctLetter}: ${correctText}.`);
  };

  // Handle User Choosing an Answer
  const handleSelectOption = (idx) => {
    if (isAnswered) return;
    if (timerRef.current) clearInterval(timerRef.current);
    stopVoice();

    setSelectedOpt(idx);
    setIsAnswered(true);

    const q = activeQuestions[currentIdx];
    const isCorrect = idx === q.correctIndex;

    if (isCorrect) {
      // Calculate dynamic score: Base potential score decaying from 1000 + Streak Multiplier
      const basePoints = currentPotentialPoints;
      const currentStreakMultiplier = 1 + streak * 0.2; // 1x, 1.2x, 1.4x...
      const roundScore = Math.round(basePoints * currentStreakMultiplier);

      const newScore = score + roundScore;
      const newStreak = streak + 1;
      setScore(newScore);
      setStreak(newStreak);
      if (newStreak > maxStreak) setMaxStreak(newStreak);
      setCorrectCount(prev => prev + 1);

      soundFX.playCorrect();

      // Confetti burst for high streak
      if (newStreak >= 3) {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 }
        });
      }

      speakVoice("Chính xác! Bạn đã chọn đúng.");
    } else {
      setStreak(0);
      soundFX.playWrong();

      const correctLetter = OPTION_STYLES[q.correctIndex]?.letter || '';
      const correctText = q?.options?.[q.correctIndex] || '';

      speakVoice(`Chưa chính xác! Đáp án đúng là đáp án ${correctLetter}: ${correctText}.`);
    }
  };

  // Next Question
  const handleNextQuestion = () => {
    stopVoice();
    const nextIdx = currentIdx + 1;

    if (nextIdx >= activeQuestions.length) {
      // Finished all questions!
      handleFinishGame(score, correctCount, true);
      return;
    }

    setCurrentIdx(nextIdx);
    setSelectedOpt(null);
    setIsAnswered(false);
    setTimeLeft(TOTAL_QUESTION_TIME);
    setHiddenOptions([]);
    setShowHint(false);

    // Speak prompt for next question
    const nextQ = activeQuestions[nextIdx];
    if (nextQ) {
      setTimeout(() => {
        const prompt = nextQ.voicePrompt || "Đây là hình ảnh lịch sử nào? Xin mời bạn chọn đáp án.";
        speakVoice(prompt);
      }, 400);
    }
  };

  // Finish Game & Record Score
  const handleFinishGame = async (finalScore, finalCorrect, completed) => {
    stopVoice();
    setGameState('gameover');

    if (completed || finalCorrect > 0) {
      soundFX.playVictory();
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.5 }
      });
      speakVoice(`Chúc mừng bạn đã hoàn thành bài thi với ${finalScore} điểm!`);
    }

    // Save score if logged in
    if (currentUser) {
      const res = await saveGameScoreApi({
        userId: currentUser.id,
        score: finalScore,
        correctCount: finalCorrect,
        totalQuestions: activeQuestions.length,
        honeyPoints: finalScore
      });

      if (res && res.success) {
        const updatedUser = {
          ...currentUser,
          highScore: Math.max(currentUser.highScore || 0, finalScore),
          gamesPlayed: (currentUser.gamesPlayed || 0) + 1,
          honeyPoints: (currentUser.honeyPoints || 0) + finalScore
        };
        setCurrentUser(updatedUser);
        localStorage.setItem('ong_vang_current_user', JSON.stringify(updatedUser));
      }
    }
  };

  // Power-up: 50/50 (Hide two wrong options)
  const handleUse5050 = () => {
    if (used5050 || isAnswered) return;
    setUsed5050(true);
    const q = activeQuestions[currentIdx];
    const wrongIndices = q.options
      .map((_, i) => i)
      .filter(i => i !== q.correctIndex);
    const shuffledWrongs = shuffleArray(wrongIndices);
    setHiddenOptions(shuffledWrongs.slice(0, 2));
    soundFX.playTick();
  };

  // Power-up: Hint
  const handleUseHint = () => {
    if (usedHint || isAnswered) return;
    setUsedHint(true);
    setShowHint(true);
    soundFX.playTick();
  };

  // Auth Handler
  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setAuthError('');
    setAuthSuccessMsg('');

    if (!authUsername.trim() || !authPassword.trim()) {
      setAuthError('Vui lòng nhập đầy đủ tên tài khoản và mật khẩu');
      return;
    }

    if (authMode === 'login') {
      const res = await loginUserApi(authUsername, authPassword);
      if (res.success) {
        setCurrentUser(res.user);
        localStorage.setItem('ong_vang_current_user', JSON.stringify(res.user));
        setIsAuthModalOpen(false);
        setAuthUsername('');
        setAuthPassword('');
      } else {
        setAuthError(res.message);
      }
    } else {
      const res = await registerUserApi(authUsername, authPassword);
      if (res.success) {
        setCurrentUser(res.user);
        localStorage.setItem('ong_vang_current_user', JSON.stringify(res.user));
        setAuthSuccessMsg('Đăng ký thành công! Đã tự động đăng nhập.');
        setTimeout(() => {
          setIsAuthModalOpen(false);
          setAuthUsername('');
          setAuthPassword('');
          setAuthSuccessMsg('');
        }, 1200);
      } else {
        setAuthError(res.message);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('ong_vang_current_user');
    setCurrentUser(null);
  };

  const currentQ = activeQuestions[currentIdx] || null;
  const totalQuestions = activeQuestions.length;

  return (
    <section id="quiz" className="py-20 bg-gradient-to-b from-[#140b06] via-[#201108] to-[#140b06] border-t border-b border-amber-900/50 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Dignified and Respectful Title */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-amber-950/80 border border-amber-500/60 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2 shadow-md">
            <Flag className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
            <span>KHÔNG GIAN TƯƠNG TÁC LỊCH SỬ • DI SẢN HỒ CHÍ MINH</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-[#f5efe6] tracking-tight">
            Hành Trình Di Sản Hồ Chí Minh
          </h2>
          <p className="text-stone-300/80 mt-2 text-sm sm:text-base font-serif max-w-3xl mx-auto leading-relaxed">
            Không gian trải nghiệm trực quan, trang trọng giúp thế hệ trẻ tìm hiểu sâu sắc về cuộc đời, sự nghiệp cách mạng vĩ đại và những mốc son lịch sử của Chủ tịch Hồ Chí Minh.
          </p>
        </div>

        {/* Action Bar: Current Mode Indicator & "CÁCH CHƠI" Button on the Right */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 px-1">
          <div className="flex items-center space-x-2 text-xs text-amber-300 font-serif">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-stone-400">Chọn một trong 3 hình thức trải nghiệm bên dưới:</span>
          </div>

          {/* Button Cách Chơi at the Right Corner */}
          <button
            onClick={() => {
              setRulesTab(activeGameTab);
              setIsRulesModalOpen(true);
            }}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-900/90 via-amber-800/90 to-amber-950/90 hover:from-amber-800 hover:to-amber-900 border border-amber-400/80 text-yellow-200 hover:text-white text-xs font-bold flex items-center space-x-1.5 shadow-lg shadow-amber-950/60 transition-all hover:scale-105 active:scale-95"
            title="Nhấp để xem hướng dẫn cách chơi chi tiết"
          >
            <BookOpen className="w-4 h-4 text-yellow-300" />
            <span>Hướng Dẫn Cách Chơi</span>
          </button>
        </div>

        {/* ================= 3 INTERACTIVE GAME SELECTION CARDS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          
          {/* Card Game 1: Lật Mảnh Ghép 6 Lá Cờ VN */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => {
              stopVoice();
              stopVietnameseVoice();
              try { soundFX.playFlip(); } catch (e) {}
              setActiveGameTab('puzzle');
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                stopVoice();
                stopVietnameseVoice();
                try { soundFX.playFlip(); } catch (err) {}
                setActiveGameTab('puzzle');
              }
            }}
            className={`p-4 rounded-2xl border cursor-pointer transition-all duration-300 flex items-start space-x-3.5 group select-none shadow-xl ${
              activeGameTab === 'puzzle'
                ? 'bg-gradient-to-br from-red-950/95 via-[#29130c] to-amber-950/90 border-red-500 ring-2 ring-yellow-400 scale-[1.02] shadow-red-950/80'
                : 'bg-[#1d120a] hover:bg-[#27170e] border-amber-900/60 hover:border-amber-600'
            }`}
          >
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-md transition-transform group-hover:scale-110 ${
              activeGameTab === 'puzzle'
                ? 'bg-red-600 border border-yellow-400 text-yellow-300'
                : 'bg-red-950/80 border border-red-500/50 text-red-300'
            }`}>
              <Flag className="w-5 h-5 fill-current" />
            </div>
            <div className="flex-grow">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-amber-100 text-sm font-serif">1. Lật Mảnh Ghép Lịch Sử</h4>
                {activeGameTab === 'puzzle' && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-900/90 text-yellow-300 font-bold border border-yellow-400/50">
                    Đang chơi
                  </span>
                )}
              </div>
              <p className="text-xs text-stone-300/80 mt-1 font-serif leading-relaxed">
                6 lá cờ Việt Nam che phủ ảnh tư liệu quý. Bấm từng lá cờ để giải mã hoặc điền đoán ngay sự kiện!
              </p>
              <div className="mt-2 text-[11px] font-bold text-amber-400 group-hover:text-yellow-300 flex items-center space-x-1">
                <span>{activeGameTab === 'puzzle' ? '✓ Đang trải nghiệm' : 'Nhấp để chuyển game ➜'}</span>
              </div>
            </div>
          </div>

          {/* Card Game 2: Bản Đồ Hải Trình Vạn Dặm Tương Tác */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => {
              stopVoice();
              stopVietnameseVoice();
              try { soundFX.playShipHorn(); } catch (e) {}
              setActiveGameTab('journey');
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                stopVoice();
                stopVietnameseVoice();
                try { soundFX.playShipHorn(); } catch (err) {}
                setActiveGameTab('journey');
              }
            }}
            className={`p-4 rounded-2xl border cursor-pointer transition-all duration-300 flex items-start space-x-3.5 group select-none shadow-xl ${
              activeGameTab === 'journey'
                ? 'bg-gradient-to-br from-amber-950/95 via-[#29160d] to-yellow-950/80 border-amber-400 ring-2 ring-yellow-400 scale-[1.02] shadow-amber-950/80'
                : 'bg-[#1d120a] hover:bg-[#27170e] border-amber-900/60 hover:border-amber-600'
            }`}
          >
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-md transition-transform group-hover:scale-110 ${
              activeGameTab === 'journey'
                ? 'bg-amber-600 border border-yellow-300 text-stone-950'
                : 'bg-amber-950/80 border border-amber-500/50 text-amber-300'
            }`}>
              <Dices className="w-5 h-5 animate-bounce" />
            </div>
            <div className="flex-grow">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-amber-100 text-sm font-serif">2. Bàn Cờ Hải Trình Vạn Dặm</h4>
                {activeGameTab === 'journey' && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-900/90 text-yellow-300 font-bold border border-yellow-400/50">
                    Đang chơi
                  </span>
                )}
              </div>
              <p className="text-xs text-stone-300/80 mt-1 font-serif leading-relaxed">
                Bàn cờ tỷ phú lịch sử (Business Tour). Đổ xúc xắc đưa con tàu qua 16 ô địa danh lịch sử, vượt thử thách và cắm cờ Tổ quốc!
              </p>
              <div className="mt-2 text-[11px] font-bold text-amber-400 group-hover:text-yellow-300 flex items-center space-x-1">
                <span>{activeGameTab === 'journey' ? '✓ Đang trải nghiệm' : 'Nhấp để chuyển game ➜'}</span>
              </div>
            </div>
          </div>

          {/* Card Game 3: Đố Vui Tốc Độ 35s */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => {
              stopVoice();
              stopVietnameseVoice();
              try { soundFX.playFlip(); } catch (e) {}
              setActiveGameTab('quiz');
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                stopVoice();
                stopVietnameseVoice();
                try { soundFX.playFlip(); } catch (err) {}
                setActiveGameTab('quiz');
              }
            }}
            className={`p-4 rounded-2xl border cursor-pointer transition-all duration-300 flex items-start space-x-3.5 group select-none shadow-xl ${
              activeGameTab === 'quiz'
                ? 'bg-gradient-to-br from-[#2c1809] via-[#29130c] to-[#1e1007] border-yellow-400 ring-2 ring-yellow-400 scale-[1.02] shadow-yellow-950/80'
                : 'bg-[#1d120a] hover:bg-[#27170e] border-amber-900/60 hover:border-amber-600'
            }`}
          >
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-md transition-transform group-hover:scale-110 ${
              activeGameTab === 'quiz'
                ? 'bg-yellow-500 border border-yellow-300 text-stone-950'
                : 'bg-emerald-950/80 border border-emerald-500/50 text-emerald-300'
            }`}>
              <Zap className="w-5 h-5 fill-current" />
            </div>
            <div className="flex-grow">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-amber-100 text-sm font-serif">3. Đố Vui Tốc Độ 35s</h4>
                {activeGameTab === 'quiz' && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-900/90 text-yellow-300 font-bold border border-yellow-400/50">
                    Đang chơi
                  </span>
                )}
              </div>
              <p className="text-xs text-stone-300/80 mt-1 font-serif leading-relaxed">
                24 tư liệu lịch sử có giọng nói tự động, 35 giây làm bài với điểm số đếm lùi và 4 màu Kahoot.
              </p>
              <div className="mt-2 text-[11px] font-bold text-amber-400 group-hover:text-yellow-300 flex items-center space-x-1">
                <span>{activeGameTab === 'quiz' ? '✓ Đang trải nghiệm' : 'Nhấp để chuyển game ➜'}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Content based on selected Tab */}
        {activeGameTab === 'puzzle' && <ManhGhepBiAnGame />}
        {activeGameTab === 'journey' && <HaiTrinhVanDamGame />}
        {activeGameTab === 'quiz' && (
          <>
            {/* ================= SCREEN 1: START SCREEN (CLEANED) ================= */}
            {gameState === 'start' && (
              <div className="duocsang-card rounded-[32px] p-6 sm:p-10 border-2 border-amber-600/50 shadow-2xl space-y-6 animate-fadeIn relative overflow-hidden">

            {/* Audio Settings Bar */}
            <div className="p-4 rounded-2xl bg-[#1a0f08] border border-amber-800/40 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-2 text-xs text-amber-200 font-bold uppercase tracking-wider">
                <Radio className="w-4 h-4 text-amber-400" />
                <span>Cài Đặt Âm Thanh & Giọng Đọc:</span>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setVoiceEnabled(!voiceEnabled)}
                  className={`px-3.5 py-1.5 rounded-xl border text-xs font-semibold flex items-center space-x-2 transition-all ${
                    voiceEnabled 
                      ? 'bg-amber-600/30 border-amber-400 text-amber-200' 
                      : 'bg-stone-900 border-stone-700 text-stone-400'
                  }`}
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Giọng nói: {voiceEnabled ? 'Đang BẬT' : 'Đang TẮT'}</span>
                </button>

                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className={`px-3.5 py-1.5 rounded-xl border text-xs font-semibold flex items-center space-x-2 transition-all ${
                    soundEnabled 
                      ? 'bg-amber-600/30 border-amber-400 text-amber-200' 
                      : 'bg-stone-900 border-stone-700 text-stone-400'
                  }`}
                >
                  {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                  <span>Hiệu ứng âm: {soundEnabled ? 'Đang BẬT' : 'Đang TẮT'}</span>
                </button>
              </div>
            </div>

            {/* Select Number of Questions */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center space-x-1.5">
                <Target className="w-4 h-4 text-amber-400" />
                <span>Chọn Số Lượng Câu Hỏi Trong Trận:</span>
              </label>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { count: 5, label: "5 Câu", desc: "Thử thách nhanh (~1.5 phút)", icon: Zap },
                  { count: 10, label: "10 Câu", desc: "Tiêu chuẩn Quiz (~3 phút)", icon: Compass },
                  { count: 15, label: "15 Câu", desc: "Nâng cao (~5 phút)", icon: Shield },
                  { count: 24, label: "24 Câu", desc: "Toàn bộ kho tư liệu ảnh", icon: Crown },
                ].map((mode) => {
                  const isSelected = selectedTotalQuestions === mode.count;
                  const ModeIcon = mode.icon;
                  return (
                    <button
                      key={mode.count}
                      onClick={() => setSelectedTotalQuestions(mode.count)}
                      className={`p-3.5 rounded-2xl border text-left transition-all ${
                        isSelected 
                          ? 'bg-amber-600/30 border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.3)] scale-[1.02]' 
                          : 'bg-[#1b1008] border-amber-900/50 hover:border-amber-700/60 opacity-80 hover:opacity-100'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className={`font-bold text-sm ${isSelected ? 'text-amber-200' : 'text-stone-300'}`}>
                          {mode.label}
                        </span>
                        <ModeIcon className={`w-4 h-4 ${isSelected ? 'text-amber-300' : 'text-amber-600'}`} />
                      </div>
                      <p className="text-[11px] text-stone-400 mt-0.5">{mode.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Big Start Button */}
            <div className="text-center pt-2">
              <button
                onClick={handleStartGame}
                className="w-full sm:w-auto px-12 py-4 rounded-full bg-gradient-to-r from-[#9c381c] via-[#b84320] to-[#7f2611] text-amber-100 font-bold text-base sm:text-lg tracking-wider flex items-center justify-center space-x-3 shadow-2xl hover:scale-105 active:scale-95 transition-all mx-auto border-2 border-amber-400/80 group shadow-amber-950/60"
              >
                <Play className="w-5 h-5 text-amber-300 fill-amber-300 group-hover:scale-110 transition-transform" />
                <span>BẮT ĐẦU ĐẤU TRƯỜNG QUIZ NGAY</span>
              </button>
              <p className="text-[11px] text-stone-500 mt-2 font-serif">
                Chinh phục trọn vẹn tất cả câu hỏi • 35 giây riêng cho MỖI câu (Được đếm lại 35s từ đầu ở mỗi câu) • Thưởng 1.000 điểm giảm dần • Quyền trợ giúp 50:50 & Gợi ý
              </p>
            </div>

          </div>
        )}

        {/* ================= SCREEN 2: PLAYING SCREEN (QUIZ.COM / KAHOOT STYLE) ================= */}
        {gameState === 'playing' && currentQ && (
          <div className="duocsang-card rounded-[32px] p-4 sm:p-7 border-2 border-amber-600/50 relative overflow-hidden shadow-2xl animate-fadeIn space-y-6">
            
            {/* Top Dashboard: Round, Timer, Score, Streak, Sound Toggles */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-amber-900/50">
              
              {/* Question Index Badge & Lives */}
              <div className="flex items-center space-x-3">
                <span className="px-3.5 py-1.5 rounded-full bg-amber-950 border border-amber-500/50 text-amber-200 text-xs font-bold tracking-wide">
                  CÂU {currentIdx + 1}/{totalQuestions}
                </span>

                <div className="flex items-center space-x-2 bg-[#180e07] px-3.5 py-1 rounded-full border border-amber-900/60 text-xs font-semibold">
                  <span className="text-emerald-400 font-bold flex items-center space-x-1">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                    <span>{correctCount} đúng</span>
                  </span>
                </div>
              </div>

              {/* Real-time Score Ticker Badge */}
              <div className="flex items-center space-x-2 bg-gradient-to-r from-amber-950/90 via-[#26140a] to-amber-950/90 px-4 py-1.5 rounded-full border-2 border-amber-400/80 shadow-lg shadow-amber-950/60">
                <Zap className="w-4 h-4 text-yellow-300 fill-yellow-300 animate-bounce" />
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">Điểm câu này:</span>
                <span className="font-mono text-base font-black text-yellow-200">
                  +{currentPotentialPoints}
                </span>
                <span className="text-[10px] text-stone-400 font-sans hidden sm:inline">/ 1.000</span>
              </div>

              {/* Streak Combo Badge */}
              {streak >= 2 && (
                <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-orange-600 to-amber-600 text-amber-100 text-xs font-black shadow-md animate-bounce">
                  <Flame className="w-3.5 h-3.5 text-yellow-200 fill-yellow-200" />
                  <span>CHUỖI x{streak}!</span>
                </div>
              )}

              {/* Total Score Display */}
              <div className="flex items-center space-x-2">
                <span className="text-xs text-stone-400 uppercase tracking-wider font-semibold">Tổng điểm:</span>
                <span className="font-mono text-base font-black text-amber-300 bg-[#180e07] px-3.5 py-1 rounded-full border border-amber-600/50">
                  {score.toLocaleString()}
                </span>
              </div>

              {/* Sound & Voice Controls */}
              <div className="flex items-center space-x-1.5">
                <button
                  onClick={() => {
                    const next = !voiceEnabled;
                    setVoiceEnabled(next);
                    if (!next) stopVoice();
                  }}
                  title={voiceEnabled ? "Tắt giọng nói" : "Bật giọng nói"}
                  className={`p-2 rounded-xl border transition-colors ${
                    voiceEnabled 
                      ? 'bg-amber-600/30 border-amber-500/60 text-amber-300' 
                      : 'bg-stone-900 border-stone-800 text-stone-500'
                  }`}
                >
                  <Volume2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  title={soundEnabled ? "Tắt hiệu ứng âm" : "Bật hiệu ứng âm"}
                  className={`p-2 rounded-xl border transition-colors ${
                    soundEnabled 
                      ? 'bg-amber-600/30 border-amber-500/60 text-amber-300' 
                      : 'bg-stone-900 border-stone-800 text-stone-500'
                  }`}
                >
                  {soundEnabled ? <Volume1 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </button>
              </div>

            </div>

            {/* Real-time Dynamic Score & Timer Bar (Quiz.com / Kahoot style) */}
            <div className="space-y-1.5 -mt-2">
              <div className="flex flex-wrap items-center justify-between text-xs px-1 font-semibold gap-2">
                <div className="flex items-center space-x-2 text-stone-300">
                  <Clock className={`w-3.5 h-3.5 ${timeLeft <= 6 ? 'text-rose-400 animate-spin' : 'text-amber-400'}`} />
                  <span>Thời gian câu {currentIdx + 1}: <strong className={timeLeft <= 6 ? 'text-rose-400 font-mono font-bold text-sm animate-pulse' : 'text-amber-200 font-mono font-bold text-sm'}>{Number(timeLeft).toFixed(1)}s</strong></span>
                  <span className="text-[10px] text-stone-500 font-sans hidden sm:inline">(35s riêng cho câu này)</span>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-stone-400 text-xs hidden sm:inline">Điểm thưởng giảm dần theo thời gian:</span>
                  <div className={`px-3 py-1 rounded-full border-2 text-xs sm:text-sm font-black font-mono flex items-center space-x-1.5 shadow-md ${
                    timeLeft <= 6 
                      ? 'bg-rose-950/90 border-rose-500 text-rose-300 shadow-rose-950/60 animate-pulse' 
                      : 'bg-gradient-to-r from-amber-950/90 to-yellow-950/90 border-amber-400 text-yellow-300 shadow-amber-950/60'
                  }`}>
                    <Zap className={`w-3.5 h-3.5 ${timeLeft <= 6 ? 'text-rose-400 fill-rose-400' : 'text-yellow-400 fill-yellow-400 animate-bounce'}`} />
                    <span>+{currentPotentialPoints} ĐIỂM</span>
                    <span className="text-[10px] text-stone-400 font-normal font-sans">/ 1.000 MAX</span>
                  </div>
                </div>
              </div>

              {/* Real-time Progress Bar */}
              <div className="w-full bg-[#160c06] h-3.5 sm:h-4 rounded-full overflow-hidden border-2 border-amber-700/60 p-0.5 relative shadow-inner">
                <div 
                  className={`h-full rounded-full transition-all duration-100 relative ${
                    timeLeft <= 6 
                      ? 'bg-gradient-to-r from-red-600 via-rose-500 to-red-400 shadow-[0_0_15px_rgba(239,68,68,0.8)]' 
                      : 'bg-gradient-to-r from-amber-600 via-yellow-400 to-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.6)]'
                  }`}
                  style={{ width: `${Math.max(0, (timeLeft / TOTAL_QUESTION_TIME) * 100)}%` }}
                />
              </div>
            </div>

            {/* ================= MAIN QUESTION & IMAGE AREA ================= */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Left Column: Authentic Historical Photo Container & Fact Card */}
              <div className="lg:col-span-5 flex flex-col items-center space-y-3">
                <div 
                  className="relative group w-full rounded-2xl overflow-hidden border-2 border-amber-500/60 shadow-2xl bg-black aspect-[4/3] flex items-center justify-center cursor-pointer"
                  onClick={() => setZoomedImage(currentQ.imageUrl)}
                  title="Bấm để xem ảnh phóng to"
                >
                  <img
                    src={currentQ.imageUrl}
                    alt={currentQ.question}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="eager"
                  />
                  
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

                  {/* Period Badge on Top Left */}
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-amber-500/50 text-[11px] font-bold text-amber-300 flex items-center space-x-1.5 shadow-lg">
                    <Landmark className="w-3.5 h-3.5 text-amber-400" />
                    <span>{currentQ.period}</span>
                  </div>

                  {/* Zoom Icon Button on Top Right */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setZoomedImage(currentQ.imageUrl);
                    }}
                    className="absolute top-3 right-3 p-2 rounded-full bg-black/70 hover:bg-black/90 border border-amber-500/40 text-amber-300 transition-all hover:scale-110 shadow-lg"
                    title="Phóng to ảnh tư liệu"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>

                  {/* Bottom Image Caption */}
                  <div className="absolute bottom-2 inset-x-3 text-center">
                    <span className="text-[11px] text-stone-300/90 font-serif italic bg-black/60 px-3 py-0.5 rounded-full border border-white/10">
                      Ảnh tư liệu lịch sử chính xác về Chủ tịch Hồ Chí Minh
                    </span>
                  </div>
                </div>

                {/* Voice Reading & Power-ups Controls */}
                <div className="w-full flex items-center justify-between px-1">
                  
                  {/* Replay Voice Button */}
                  <button
                    onClick={() => {
                      const prompt = currentQ.voicePrompt || currentQ.question;
                      speakVoice(prompt);
                    }}
                    className={`px-3.5 py-1.5 rounded-xl border text-xs font-semibold flex items-center space-x-2 transition-all shadow-md ${
                      isSpeaking 
                        ? 'bg-amber-500 border-amber-300 text-stone-950 font-bold scale-105 shadow-amber-500/40' 
                        : 'bg-amber-950/80 hover:bg-amber-900/80 border-amber-600/50 text-amber-300'
                    }`}
                  >
                    <Volume2 className={`w-4 h-4 ${isSpeaking ? 'animate-bounce' : ''}`} />
                    <span>{isSpeaking ? 'Đang đọc...' : 'Nghe lại giọng nói'}</span>
                  </button>

                  {/* Power-up buttons */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={handleUse5050}
                      disabled={used5050 || isAnswered}
                      className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all flex items-center space-x-1 ${
                        used5050 
                          ? 'bg-stone-900 border-stone-800 text-stone-600 cursor-not-allowed opacity-50' 
                          : 'bg-[#22130a] hover:bg-amber-900/60 border-amber-600/50 text-amber-300 hover:scale-105'
                      }`}
                      title="Loại bỏ 2 phương án sai"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>50:50</span>
                    </button>

                    <button
                      onClick={handleUseHint}
                      disabled={usedHint || isAnswered}
                      className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all flex items-center space-x-1 ${
                        usedHint 
                          ? 'bg-stone-900 border-stone-800 text-stone-600 cursor-not-allowed opacity-50' 
                          : 'bg-[#22130a] hover:bg-amber-900/60 border-amber-600/50 text-amber-300 hover:scale-105'
                      }`}
                      title="Hiện gợi ý lịch sử"
                    >
                      <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                      <span>Gợi ý</span>
                    </button>
                  </div>

                </div>

                {/* Hint Card (if activated) */}
                {showHint && (
                  <div className="w-full p-3 rounded-xl bg-amber-950/70 border border-amber-500/40 text-amber-200 text-xs font-serif animate-fadeIn flex items-start space-x-2">
                    <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-amber-300 font-sans">Gợi ý tư liệu:</strong> {currentQ.hint}
                    </div>
                  </div>
                )}

                {/* Historical Fact Card Reveal - Placed under the image without moving right column */}
                {isAnswered && (
                  <div className="w-full p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#2b170c] via-[#381e10] to-[#2b170c] border-2 border-amber-500/60 shadow-xl space-y-3 animate-fadeIn text-left">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-800/40 pb-2">
                      <div className="flex items-center space-x-2">
                        <BookOpen className="w-4 h-4 text-amber-400" />
                        <span className="font-bold text-amber-200 text-xs uppercase tracking-wider">
                          Tư Liệu Lịch Sử Chính Xác:
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 text-[11px] text-stone-400 font-serif">
                        <span><strong>Năm:</strong> {currentQ.year}</span>
                        <span>•</span>
                        <span><strong>Địa danh:</strong> {currentQ.location}</span>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-stone-200 font-serif leading-relaxed">
                      {currentQ.explanation}
                    </p>

                    <div className="pt-1 flex items-center justify-between">
                      <button
                        onClick={() => speakVoice(`Tư liệu lịch sử: Năm ${currentQ.year}, tại ${currentQ.location}. ${currentQ.explanation}`)}
                        className="px-3.5 py-1.5 rounded-xl bg-amber-950/80 hover:bg-amber-900 border border-amber-600/50 text-amber-300 text-xs font-semibold flex items-center space-x-1.5 transition-all shadow-md"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Nghe thuyết minh tư liệu</span>
                      </button>
                    </div>
                  </div>
                )}

              </div>

              {/* Right Column: Question Title, 4 Kahoot/Quizizz Style Cards & Next Button */}
              <div className="lg:col-span-7 space-y-4">
                
                {/* Question Prompt Title (Never moves on answer) */}
                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#22130a] via-[#2d180d] to-[#22130a] border border-amber-500/40 shadow-lg">
                  <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1.5">
                    <HelpCircle className="w-4 h-4" />
                    <span>CÂU HỎI TRẮC NGHIỆM TƯ LIỆU:</span>
                  </div>
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-serif font-black text-amber-100 leading-snug">
                    {currentQ.question}
                  </h3>
                </div>

                {/* 4 Colored Kahoot/Quizizz Options Grid (Never moves on answer) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                  {currentQ.options.map((optText, idx) => {
                    const style = OPTION_STYLES[idx] || OPTION_STYLES[0];
                    const isHidden = hiddenOptions.includes(idx);
                    const isThisSelected = selectedOpt === idx;
                    const isThisCorrect = idx === currentQ.correctIndex;

                    if (isHidden) {
                      return (
                        <div 
                          key={idx} 
                          className="p-4 rounded-2xl border border-stone-800 bg-stone-900/30 opacity-20 pointer-events-none flex items-center justify-center text-xs text-stone-600 font-mono"
                        >
                          [ ĐÃ LOẠI BỎ ]
                        </div>
                      );
                    }

                    // Card visual state based on answered status
                    let stateClasses = `bg-gradient-to-br ${style.bgClass} ${style.borderClass} ${style.shadowClass}`;
                    
                    if (isAnswered) {
                      if (isThisCorrect) {
                        stateClasses = 'bg-gradient-to-br from-emerald-600 via-emerald-700 to-green-900 border-emerald-300 ring-4 ring-emerald-400/80 shadow-[0_0_25px_rgba(16,185,129,0.5)] scale-[1.02]';
                      } else if (isThisSelected) {
                        stateClasses = 'bg-gradient-to-br from-red-700 via-rose-800 to-red-950 border-rose-400 ring-4 ring-rose-500/80 shadow-[0_0_20px_rgba(239,68,68,0.5)]';
                      } else {
                        stateClasses = 'opacity-40 bg-stone-900 border-stone-800';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectOption(idx)}
                        disabled={isAnswered}
                        className={`p-4 rounded-2xl border-2 text-left transition-all duration-200 relative group flex items-start space-x-3 min-h-[92px] ${stateClasses} ${
                          !isAnswered ? 'hover:scale-[1.02] active:scale-[0.98] cursor-pointer' : 'cursor-default'
                        }`}
                      >
                        {/* Shape & Letter Badge */}
                        <div className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 font-black text-sm shadow-md ${style.badgeClass}`}>
                          <span>{style.shape}</span>
                        </div>

                        {/* Option Content Text */}
                        <div className="flex-1 pr-4">
                          <div className="text-[11px] font-bold uppercase tracking-wider text-white/70 mb-0.5">
                            Đáp án {style.letter}
                          </div>
                          <div className="text-sm font-semibold text-white leading-snug font-serif">
                            {optText}
                          </div>
                        </div>

                        {/* Status Icon Indicator */}
                        {isAnswered && isThisCorrect && (
                          <div className="w-7 h-7 rounded-full bg-emerald-500 text-stone-950 flex items-center justify-center shrink-0 absolute top-3 right-3 shadow-lg">
                            <Check className="w-4 h-4 stroke-[3]" />
                          </div>
                        )}
                        {isAnswered && isThisSelected && !isThisCorrect && (
                          <div className="w-7 h-7 rounded-full bg-rose-500 text-white flex items-center justify-center shrink-0 absolute top-3 right-3 shadow-lg">
                            <X className="w-4 h-4 stroke-[3]" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Next Question Action Button (Stably positioned below 4 options) */}
                {isAnswered && (
                  <div className="pt-2 flex justify-end animate-fadeIn">
                    <button
                      onClick={handleNextQuestion}
                      className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 hover:from-amber-500 hover:to-yellow-400 text-stone-950 font-black text-sm tracking-wider flex items-center justify-center space-x-2 shadow-xl hover:scale-105 active:scale-95 transition-all"
                    >
                      <span>{currentIdx + 1 >= totalQuestions ? 'XEM KẾT QUẢ CUỐI CÙNG' : 'CÂU TIẾP THEO'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}

              </div>

            </div>

          </div>
        )}

        {/* ================= SCREEN 3: RESULTS / VICTORY SCREEN ================= */}
        {gameState === 'gameover' && (
          <div className="duocsang-card rounded-[32px] p-6 sm:p-10 border-2 border-amber-600/60 shadow-2xl space-y-8 animate-fadeIn text-center relative overflow-hidden">
            
            {/* Header Badge & Title */}
            <div className="space-y-3">
              <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-amber-500/40 via-amber-700/30 to-amber-950 border-2 border-amber-400/80 flex items-center justify-center shadow-xl shadow-amber-950/80 animate-bounce">
                <Trophy className="w-10 h-10 text-yellow-300" />
              </div>

              <h3 className="text-2xl sm:text-4xl font-serif font-black text-amber-100">
                {correctCount >= totalQuestions * 0.8 
                  ? 'Xuất Sắc! Bậc Thầy Lịch Sử Bác Hồ' 
                  : correctCount >= totalQuestions * 0.5 
                  ? 'Hoàn Thành Tốt Thử Thách Lịch Sử' 
                  : 'Hãy Tiếp Tục Ôn Luyện Kiến Thức Lịch Sử!'}
              </h3>
              
              <p className="text-xs sm:text-sm text-stone-300/90 font-serif max-w-xl mx-auto">
                Bạn đã trả lời đúng <strong>{correctCount}/{totalQuestions}</strong> câu hỏi trắc nghiệm ảnh tư liệu lịch sử về Chủ tịch Hồ Chí Minh.
              </p>
            </div>

            {/* Score & Stats Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 max-w-2xl mx-auto">
              <div className="p-4 rounded-2xl bg-[#1b1008] border border-amber-900/60">
                <div className="text-xs text-stone-400 uppercase tracking-wider font-semibold">Tổng Điểm</div>
                <div className="text-2xl font-black font-mono text-amber-300 mt-1">{score.toLocaleString()}</div>
              </div>

              <div className="p-4 rounded-2xl bg-[#1b1008] border border-amber-900/60">
                <div className="text-xs text-stone-400 uppercase tracking-wider font-semibold">Đúng / Tổng</div>
                <div className="text-2xl font-black font-mono text-emerald-400 mt-1">{correctCount}/{totalQuestions}</div>
              </div>

              <div className="p-4 rounded-2xl bg-[#1b1008] border border-amber-900/60">
                <div className="text-xs text-stone-400 uppercase tracking-wider font-semibold">Độ Chính Xác</div>
                <div className="text-2xl font-black font-mono text-blue-400 mt-1">
                  {totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0}%
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#1b1008] border border-amber-900/60">
                <div className="text-xs text-stone-400 uppercase tracking-wider font-semibold">Chuỗi Dài Nhất</div>
                <div className="text-2xl font-black font-mono text-orange-400 mt-1">x{maxStreak}</div>
              </div>
            </div>

            {/* Gallery of Questions Played (Review Carousel/Grid) */}
            <div className="p-5 rounded-2xl bg-[#180e07] border border-amber-900/60 text-left space-y-3">
              <h4 className="font-bold text-amber-200 text-sm flex items-center space-x-2">
                <Landmark className="w-4 h-4 text-amber-400" />
                <span>Xem Lại Các Bức Ảnh Tư Liệu Đã Trải Nghiệm:</span>
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2.5">
                {activeQuestions.map((q, idx) => (
                  <div
                    key={idx}
                    onClick={() => setZoomedImage(q.imageUrl)}
                    className="group relative rounded-xl overflow-hidden border border-amber-800/50 aspect-square cursor-pointer hover:border-amber-400 transition-all hover:scale-105"
                    title={q.options[q.correctIndex]}
                  >
                    <img src={q.imageUrl} alt={q.id} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors" />
                    <div className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-black/80 text-[10px] text-amber-300 font-bold">
                      #{idx + 1}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={handleStartGame}
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 text-stone-950 font-black text-sm tracking-wider flex items-center space-x-2 shadow-xl hover:scale-105 active:scale-95 transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                <span>CHƠI LẠI TRẬN MỚI</span>
              </button>

              <button
                onClick={() => setGameState('start')}
                className="px-6 py-3.5 rounded-full bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-300 font-bold text-sm tracking-wider transition-all"
              >
                <span>Về Màn Hình Chính</span>
              </button>

              <button
                onClick={() => setIsLeaderboardOpen(true)}
                className="px-6 py-3.5 rounded-full bg-amber-950/80 hover:bg-amber-900/80 border border-amber-600/50 text-amber-300 font-bold text-sm tracking-wider transition-all flex items-center space-x-2"
              >
                <Trophy className="w-4 h-4 text-yellow-400" />
                <span>Xem Bảng Vàng</span>
              </button>
            </div>

          </div>
        )}
        </>
        )}

      </div>

      {/* ================= MODAL: ZOOM IMAGE FULLSCREEN ================= */}
      {zoomedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setZoomedImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] rounded-2xl overflow-hidden border-2 border-amber-500/80 shadow-2xl">
            <img src={zoomedImage} alt="Phóng to ảnh tư liệu" className="w-full h-full object-contain max-h-[85vh]" />
            <button
              onClick={() => setZoomedImage(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/80 border border-amber-400 text-amber-200 flex items-center justify-center hover:scale-110 transition-transform"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* ================= MODAL: AUTH MODAL (LOGIN / REGISTER) ================= */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="duocsang-card max-w-md w-full rounded-3xl p-6 sm:p-8 border-2 border-amber-500/60 shadow-2xl relative space-y-6">
            <button
              onClick={() => setIsAuthModalOpen(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-1">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-950 border border-amber-500/60 flex items-center justify-center text-amber-300 mb-2">
                {authMode === 'login' ? <LogIn className="w-6 h-6" /> : <UserPlus className="w-6 h-6" />}
              </div>
              <h3 className="text-xl font-serif font-bold text-amber-100">
                {authMode === 'login' ? 'Đăng Nhập Tài Khoản' : 'Đăng Ký Chiến Sĩ'}
              </h3>
              <p className="text-xs text-stone-400 font-serif">
                Lưu điểm thi đấu và vinh danh trên Bảng Vàng toàn quốc
              </p>
            </div>

            <form onSubmit={handleAuthSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-amber-300 block mb-1">Tên tài khoản / Biệt danh:</label>
                <input
                  type="text"
                  value={authUsername}
                  onChange={(e) => setAuthUsername(e.target.value)}
                  placeholder="Ví dụ: NguyenVanA"
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-900 border border-amber-900/60 text-stone-200 text-sm focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-amber-300 block mb-1">Mật khẩu:</label>
                <input
                  type="password"
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-900 border border-amber-900/60 text-stone-200 text-sm focus:outline-none focus:border-amber-500"
                />
              </div>

              {authError && (
                <div className="text-xs text-rose-400 bg-rose-950/60 p-2.5 rounded-xl border border-rose-900/60">
                  {authError}
                </div>
              )}

              {authSuccessMsg && (
                <div className="text-xs text-emerald-400 bg-emerald-950/60 p-2.5 rounded-xl border border-emerald-900/60">
                  {authSuccessMsg}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-600 to-yellow-500 text-stone-950 font-bold text-sm shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                {authMode === 'login' ? 'Đăng Nhập Ngay' : 'Tạo Tài Khoản Mới'}
              </button>
            </form>

            <div className="text-center pt-2 border-t border-amber-900/40">
              <button
                onClick={() => {
                  setAuthMode(authMode === 'login' ? 'register' : 'login');
                  setAuthError('');
                  setAuthSuccessMsg('');
                }}
                className="text-xs text-amber-400 hover:text-amber-300 underline font-serif"
              >
                {authMode === 'login' ? 'Chưa có tài khoản? Đăng ký ngay' : 'Đã có tài khoản? Đăng nhập'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: LEADERBOARD ================= */}
      {isLeaderboardOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="duocsang-card max-w-lg w-full rounded-3xl p-6 sm:p-8 border-2 border-amber-500/60 shadow-2xl relative space-y-6">
            <button
              onClick={() => setIsLeaderboardOpen(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-1">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-950 border border-amber-500/60 flex items-center justify-center text-yellow-400 mb-2">
                <Trophy className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif font-bold text-amber-100">
                Bảng Vàng Danh Dự
              </h3>
              <p className="text-xs text-stone-400 font-serif">
                Top những chiến sĩ đạt điểm kỷ lục xuất sắc nhất
              </p>
            </div>

            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {leaderboard.length > 0 ? (
                leaderboard.map((player, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-2xl border flex items-center justify-between ${
                      idx === 0 
                        ? 'bg-amber-950/80 border-amber-400/80 shadow-md' 
                        : idx === 1 
                        ? 'bg-[#22130a] border-amber-600/40' 
                        : idx === 2 
                        ? 'bg-[#1b1008] border-amber-800/40' 
                        : 'bg-stone-900/50 border-stone-800'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                        idx === 0 ? 'bg-yellow-400 text-stone-950' :
                        idx === 1 ? 'bg-stone-300 text-stone-950' :
                        idx === 2 ? 'bg-amber-700 text-stone-100' :
                        'bg-stone-800 text-stone-400'
                      }`}>
                        #{idx + 1}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-amber-200">{player.username}</div>
                        <div className="text-[10px] text-stone-400">{player.title || 'Chiến Sĩ Trẻ'}</div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-xs font-black font-mono text-amber-400">{player.highScore || player.score || 0} điểm</div>
                      <div className="text-[10px] text-stone-500">Đã chơi: {player.gamesPlayed || 1} trận</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-stone-500 text-xs font-serif">
                  Chưa có kỷ lục nào. Hãy là người đầu tiên ghi danh Bảng Vàng!
                </div>
              )}
            </div>

            <div className="text-center pt-2">
              <button
                onClick={() => setIsLeaderboardOpen(false)}
                className="px-6 py-2 rounded-full bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-300 text-xs font-bold"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: HƯỚNG DẪN CÁCH CHƠI ================= */}
      {isRulesModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="duocsang-card max-w-2xl w-full rounded-3xl p-6 sm:p-8 border-2 border-amber-500/70 shadow-2xl relative space-y-6 max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setIsRulesModalOpen(false)}
              className="absolute top-5 right-5 text-stone-400 hover:text-white p-1 rounded-lg hover:bg-stone-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Title */}
            <div className="text-center space-y-1">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-950 border border-amber-400/80 flex items-center justify-center text-yellow-300 mb-2 shadow-lg">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-black text-amber-100">
                Hướng Dẫn Cách Chơi & Trải Nghiệm
              </h3>
              <p className="text-xs text-stone-400 font-serif">
                Quy luật và mẹo đạt điểm cao cho từng hình thức trải nghiệm di sản
              </p>
            </div>

            {/* Rule Selector Tabs */}
            <div className="flex rounded-2xl bg-stone-900/90 p-1 border border-amber-900/60">
              <button
                onClick={() => setRulesTab('puzzle')}
                className={`flex-1 py-2.5 rounded-xl text-xs font-serif font-bold transition-all ${
                  rulesTab === 'puzzle'
                    ? 'bg-gradient-to-r from-red-600 to-amber-600 text-stone-950 shadow-md'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                1. Lật Mảnh Ghép
              </button>
              <button
                onClick={() => setRulesTab('journey')}
                className={`flex-1 py-2.5 rounded-xl text-xs font-serif font-bold transition-all ${
                  rulesTab === 'journey'
                    ? 'bg-gradient-to-r from-amber-600 to-yellow-500 text-stone-950 shadow-md'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                2. Hải Trình Vạn Dặm
              </button>
              <button
                onClick={() => setRulesTab('quiz')}
                className={`flex-1 py-2.5 rounded-xl text-xs font-serif font-bold transition-all ${
                  rulesTab === 'quiz'
                    ? 'bg-gradient-to-r from-amber-600 to-yellow-500 text-stone-950 shadow-md'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                3. Đố Vui Tốc Độ 35s
              </button>
            </div>

            {/* Rules Content */}
            {rulesTab === 'puzzle' && (
              <div className="space-y-4 text-xs font-serif text-stone-200 leading-relaxed animate-fadeIn">
                
                {/* Visual Illustration Diagram for Game 1 */}
                <div className="p-3.5 sm:p-4 rounded-2xl bg-black/70 border border-amber-500/50 shadow-inner grid grid-cols-1 sm:grid-cols-12 gap-3.5 items-center">
                  {/* Left: Mini Flag Grid & Reveal Preview */}
                  <div className="sm:col-span-6 relative aspect-[16/10] rounded-xl overflow-hidden border border-amber-500/60 bg-black shadow-md">
                    <img 
                      src="/images/gallery/tuyen-ngon-doc-lap.jpg" 
                      alt="Ảnh tư liệu mẫu" 
                      className="w-full h-full object-cover" 
                    />
                    {/* Simulated 6-flag Grid */}
                    <div className="absolute inset-0 grid grid-cols-3 grid-rows-2 gap-1 p-1 bg-black/40">
                      <div className="bg-[#da251d] rounded-md flex items-center justify-center border border-amber-400/50 shadow-sm">
                        <span className="text-yellow-300 text-base drop-shadow">★</span>
                      </div>
                      <div className="bg-[#da251d] rounded-md flex items-center justify-center border border-amber-400/50 shadow-sm">
                        <span className="text-yellow-300 text-base drop-shadow">★</span>
                      </div>
                      {/* One revealed piece */}
                      <div className="rounded-md border border-emerald-400/80 bg-emerald-950/30 flex items-center justify-center">
                        <span className="text-[10px] text-emerald-300 font-bold bg-black/80 px-1.5 py-0.5 rounded border border-emerald-500/50">
                          Đã mở ✓
                        </span>
                      </div>
                      <div className="bg-[#da251d] rounded-md flex items-center justify-center border border-amber-400/50 shadow-sm">
                        <span className="text-yellow-300 text-base drop-shadow">★</span>
                      </div>
                      <div className="bg-[#da251d] rounded-md flex items-center justify-center border border-yellow-300 shadow-lg animate-pulse">
                        <span className="text-yellow-300 text-base drop-shadow">★</span>
                      </div>
                      <div className="bg-[#da251d] rounded-md flex items-center justify-center border border-amber-400/50 shadow-sm">
                        <span className="text-yellow-300 text-base drop-shadow">★</span>
                      </div>
                    </div>
                    <div className="absolute bottom-1 left-1 right-1 bg-black/85 backdrop-blur-sm px-2 py-1 rounded text-[10px] text-amber-200 text-center font-serif font-bold border border-amber-500/40">
                      👆 Nhấp vào lá cờ để trả lời câu hỏi mở khóa mảnh ảnh
                    </div>
                  </div>

                  {/* Right: Instant Guessing Simulation Mockup */}
                  <div className="sm:col-span-6 space-y-2 p-3 rounded-xl bg-gradient-to-b from-[#261408] to-[#1a0e06] border border-amber-600/50 shadow-sm">
                    <div className="flex items-center space-x-1.5 text-xs font-bold text-amber-300">
                      <Zap className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                      <span>Tính năng độc đáo: Đoán ngay đáp án</span>
                    </div>
                    
                    <div className="p-2 rounded-lg bg-stone-900 border border-amber-700/60 text-xs text-stone-200 font-sans flex items-center justify-between">
                      <span className="text-stone-400 italic">Nhập:</span>
                      <span className="text-yellow-300 font-bold">Tuyên ngôn độc lập</span>
                    </div>

                    <div className="py-2 px-3 rounded-xl bg-gradient-to-r from-amber-600 to-yellow-500 text-stone-950 text-center font-black text-[11px] uppercase tracking-wider shadow">
                      ⚡ XÁC NHẬN ĐOÁN NGAY (+THƯỞNG LỚN)
                    </div>

                    <div className="text-[11px] text-emerald-300 font-serif leading-tight">
                      ✓ Đoán đúng sẽ mở tung toàn bộ 6 lá cờ cùng lúc và cộng điểm thưởng tối đa!
                    </div>
                  </div>
                </div>

                {/* Text summary instructions */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                  <div className="p-3 rounded-xl bg-stone-900/70 border border-stone-800 space-y-1">
                    <div className="flex items-center space-x-1.5 text-amber-300 font-bold text-xs">
                      <span className="w-5 h-5 rounded-full bg-red-600 text-yellow-300 flex items-center justify-center text-[10px]">1</span>
                      <span>Lật mở từng lá cờ</span>
                    </div>
                    <p className="text-[11px] text-stone-300 font-serif leading-relaxed">
                      Bấm vào lá cờ bất kỳ để trả lời câu hỏi. Đúng sẽ mở góc ảnh và nghe thuyết minh (+250đ).
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-stone-900/70 border border-stone-800 space-y-1">
                    <div className="flex items-center space-x-1.5 text-yellow-300 font-bold text-xs">
                      <span className="w-5 h-5 rounded-full bg-amber-600 text-stone-950 flex items-center justify-center text-[10px]">2</span>
                      <span>Đoán ngay sự kiện</span>
                    </div>
                    <p className="text-[11px] text-stone-300 font-serif leading-relaxed">
                      Nhận diện được bức ảnh? Gõ ngay tên sự kiện/địa danh vào ô "Đoán Ngay Đáp Án".
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-stone-900/70 border border-stone-800 space-y-1">
                    <div className="flex items-center space-x-1.5 text-emerald-300 font-bold text-xs">
                      <span className="w-5 h-5 rounded-full bg-emerald-600 text-stone-950 flex items-center justify-center text-[10px]">3</span>
                      <span>Điểm thưởng kỷ lục</span>
                    </div>
                    <p className="text-[11px] text-stone-300 font-serif leading-relaxed">
                      Đoán trúng càng sớm điểm thưởng càng cao, mở khóa toàn bộ câu chuyện và chuyển vòng mới.
                    </p>
                  </div>
                </div>

              </div>
            )}

            {rulesTab === 'journey' && (
              <div className="space-y-4 text-xs font-serif text-stone-200 leading-relaxed animate-fadeIn">
                
                {/* Visual Illustration Diagram for Game 2 (Monopoly Business Tour) */}
                <div className="p-3.5 sm:p-4 rounded-2xl bg-black/70 border border-amber-600/50 shadow-inner grid grid-cols-1 sm:grid-cols-12 gap-3.5 items-center">
                  {/* Left: Monopoly Board Preview */}
                  <div className="sm:col-span-5 relative aspect-square rounded-xl overflow-hidden border border-amber-500/60 bg-gradient-to-br from-[#1b0f08] to-black shadow-md p-2 flex flex-col justify-between">
                    <div className="grid grid-cols-4 gap-1 text-[8px] font-mono text-center">
                      <span className="p-1 rounded bg-amber-600 text-stone-950 font-bold">1. Bến Rồng</span>
                      <span className="p-1 rounded bg-stone-900 border border-stone-700 text-stone-300">2. Pháp</span>
                      <span className="p-1 rounded bg-amber-950 text-yellow-300">🎁 Cơ Hội</span>
                      <span className="p-1 rounded bg-stone-900 border border-stone-700 text-stone-300">3. Mỹ</span>
                    </div>

                    <div className="my-auto text-center space-y-1">
                      <div className="w-10 h-10 mx-auto rounded-xl bg-red-600 border border-yellow-300 flex items-center justify-center text-yellow-300 text-lg font-black shadow animate-bounce">
                        5
                      </div>
                      <div className="text-[10px] text-amber-300 font-bold">🎲 Đổ xúc xắc 1 - 6 bước</div>
                      <div className="text-[9px] text-stone-400">Tàu di chuyển quanh 16 ô viền</div>
                    </div>

                    <div className="grid grid-cols-4 gap-1 text-[8px] font-mono text-center">
                      <span className="p-1 rounded bg-emerald-950 text-emerald-300 border border-emerald-500">16. Pác Bó 🏁</span>
                      <span className="p-1 rounded bg-stone-900 border border-stone-700 text-stone-300">Hồng Kông</span>
                      <span className="p-1 rounded bg-stone-900 border border-stone-700 text-stone-300">Thái Lan</span>
                      <span className="p-1 rounded bg-stone-900 border border-stone-700 text-stone-300">Quảng Châu</span>
                    </div>

                    <div className="absolute top-2 right-2 bg-black/85 px-2 py-0.5 rounded text-[10px] text-yellow-300 font-bold border border-yellow-400/50 flex items-center space-x-1">
                      <Dices className="w-3 h-3 text-yellow-300" />
                      <span>Bàn Cờ Tỷ Phú</span>
                    </div>
                  </div>

                  {/* Right: How to Play in Business Tour Style */}
                  <div className="sm:col-span-7 space-y-2 p-3 rounded-xl bg-gradient-to-b from-[#241408] to-[#140b04] border border-amber-700/60 shadow-sm">
                    <div className="flex items-center space-x-1.5 text-xs font-bold text-amber-300">
                      <Dices className="w-3.5 h-3.5 text-yellow-400" />
                      <span>Luật chơi Bàn Cờ Hải Trình Vạn Dặm:</span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-black/60 border border-amber-800/40 text-[11px] text-stone-200 space-y-1.5 font-serif">
                      <div className="flex items-start space-x-2">
                        <span className="text-yellow-400 font-bold shrink-0">1.</span>
                        <span>Bấm nút <strong>LẮC XÚC XẮC (ROLL DICE)</strong>: Con tàu sẽ nhảy từng bước theo số điểm ngẫu nhiên (1 đến 6).</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <span className="text-yellow-400 font-bold shrink-0">2.</span>
                        <span>Dừng chân ở ô Địa Danh: Trả lời câu hỏi lịch sử. Đúng sẽ <strong>cắm cờ Tổ quốc 🇻🇳</strong> lên ô đó và tích lũy hải lý!</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <span className="text-yellow-400 font-bold shrink-0">3.</span>
                        <span>Ô Cơ Hội & Vận Mệnh: Nhận thưởng hải lý, tiến thêm bước và vượt bão đại dương.</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <span className="text-yellow-400 font-bold shrink-0">4.</span>
                        <span>Cắm cờ toàn bộ địa danh và về đích tại <strong>Cột mốc 108 Pác Bó</strong> để giành chiến thắng vinh quang!</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3 Step Boxes */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                  <div className="p-3 rounded-xl bg-stone-900/70 border border-stone-800 space-y-1">
                    <div className="flex items-center space-x-1.5 text-yellow-300 font-bold text-xs">
                      <span className="w-5 h-5 rounded-full bg-amber-600 text-stone-950 flex items-center justify-center text-[10px]">1</span>
                      <span>Đổ xúc xắc di chuyển</span>
                    </div>
                    <p className="text-[11px] text-stone-300 font-serif leading-relaxed">
                      Con tàu di chuyển linh hoạt theo chiều kim đồng hồ quanh 16 ô địa danh lịch sử theo xúc xắc.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-stone-900/70 border border-stone-800 space-y-1">
                    <div className="flex items-center space-x-1.5 text-amber-300 font-bold text-xs">
                      <span className="w-5 h-5 rounded-full bg-red-600 text-yellow-300 flex items-center justify-center text-[10px]">2</span>
                      <span>Cắm cờ Việt Nam 🇻🇳</span>
                    </div>
                    <p className="text-[11px] text-stone-300 font-serif leading-relaxed">
                      Giải mã thử thách để cắm cờ Tổ quốc, lưu dấu ấn di sản Bác Hồ tại mỗi quốc gia Người từng đi qua.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-stone-900/70 border border-stone-800 space-y-1">
                    <div className="flex items-center space-x-1.5 text-emerald-300 font-bold text-xs">
                      <span className="w-5 h-5 rounded-full bg-emerald-600 text-stone-950 flex items-center justify-center text-[10px]">3</span>
                      <span>Về đích Pác Bó</span>
                    </div>
                    <p className="text-[11px] text-stone-300 font-serif leading-relaxed">
                      Cập bến mốc 108 Pác Bó khép lại 30 năm bôn ba và nhận Cúp Vàng Đại Thắng lịch sử.
                    </p>
                  </div>
                </div>

              </div>
            )}

            {rulesTab === 'quiz' && (
              <div className="space-y-4 text-xs font-serif text-stone-200 leading-relaxed animate-fadeIn">
                
                {/* Visual Illustration Diagram for Game 3 */}
                <div className="p-3.5 sm:p-4 rounded-2xl bg-black/70 border border-yellow-700/50 shadow-inner grid grid-cols-1 sm:grid-cols-12 gap-3.5 items-center">
                  {/* Left: Historic Photo with Timer */}
                  <div className="sm:col-span-5 relative aspect-[4/3] rounded-xl overflow-hidden border border-yellow-500/60 bg-black shadow-md">
                    <img 
                      src="/images/gallery/chien-dich-bien-gioi.jpg" 
                      alt="Chiến dịch Biên giới" 
                      className="w-full h-full object-cover" 
                    />
                    <div className="absolute top-2 right-2 bg-amber-950/95 border border-amber-400 px-2 py-0.5 rounded text-[11px] font-mono font-bold text-yellow-300 shadow">
                      ⏱ 35 Giây
                    </div>
                    <div className="absolute bottom-1 left-1 right-1 bg-black/85 backdrop-blur-sm px-2 py-1 rounded text-[10px] text-amber-200 text-center font-serif font-bold border border-amber-500/40">
                      🔊 Giọng nói tự động đọc to câu hỏi & đáp án
                    </div>
                  </div>

                  {/* Right: 4 Kahoot colored buttons & timer point decay */}
                  <div className="sm:col-span-7 space-y-2 p-3 rounded-xl bg-gradient-to-b from-[#241408] to-[#170e06] border border-amber-700/50 shadow-sm">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-yellow-300">Điểm đếm lùi thời gian thực:</span>
                      <span className="text-amber-400 font-mono">1.000đ ➔ 100đ</span>
                    </div>

                    {/* 4 Colored Kahoot Answer Cards Mockup */}
                    <div className="grid grid-cols-2 gap-1.5 text-[11px] font-sans font-bold">
                      <div className="p-2 rounded-lg bg-rose-600 text-white flex items-center space-x-1.5 shadow">
                        <span className="w-4 h-4 rounded bg-black/30 flex items-center justify-center text-[10px]">A</span>
                        <span>Đáp án Đỏ (▲)</span>
                      </div>
                      <div className="p-2 rounded-lg bg-blue-600 text-white flex items-center space-x-1.5 shadow">
                        <span className="w-4 h-4 rounded bg-black/30 flex items-center justify-center text-[10px]">B</span>
                        <span>Đáp án Xanh (◆)</span>
                      </div>
                      <div className="p-2 rounded-lg bg-amber-500 text-stone-950 flex items-center space-x-1.5 shadow">
                        <span className="w-4 h-4 rounded bg-black/30 flex items-center justify-center text-[10px]">C</span>
                        <span>Đáp án Vàng (●)</span>
                      </div>
                      <div className="p-2 rounded-lg bg-emerald-600 text-white flex items-center space-x-1.5 shadow">
                        <span className="w-4 h-4 rounded bg-black/30 flex items-center justify-center text-[10px]">D</span>
                        <span>Đáp án Xanh lá (■)</span>
                      </div>
                    </div>

                    <div className="text-[11px] text-emerald-300 font-serif leading-tight">
                      ✓ Trả lời càng nhanh điểm càng cao! Có quyền trợ giúp 50:50 và Xem gợi ý.
                    </div>
                  </div>
                </div>

                {/* 3 Step Boxes */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                  <div className="p-3 rounded-xl bg-stone-900/70 border border-stone-800 space-y-1">
                    <div className="flex items-center space-x-1.5 text-amber-300 font-bold text-xs">
                      <span className="w-5 h-5 rounded-full bg-amber-600 text-stone-950 flex items-center justify-center text-[10px]">1</span>
                      <span>35s Riêng mỗi câu</span>
                    </div>
                    <p className="text-[11px] text-stone-300 font-serif leading-relaxed">
                      Mỗi câu được tính riêng 35 giây độc lập. Điểm bắt đầu từ 1.000 điểm và giảm dần.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-stone-900/70 border border-stone-800 space-y-1">
                    <div className="flex items-center space-x-1.5 text-blue-300 font-bold text-xs">
                      <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">2</span>
                      <span>Giọng nói tự động</span>
                    </div>
                    <p className="text-[11px] text-stone-300 font-serif leading-relaxed">
                      AI tự động đọc câu hỏi, đọc to đáp án đúng và thuyết minh ý nghĩa lịch sử sâu sắc.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-stone-900/70 border border-stone-800 space-y-1">
                    <div className="flex items-center space-x-1.5 text-emerald-300 font-bold text-xs">
                      <span className="w-5 h-5 rounded-full bg-emerald-600 text-stone-950 flex items-center justify-center text-[10px]">3</span>
                      <span>4 Thẻ Kahoot trực quan</span>
                    </div>
                    <p className="text-[11px] text-stone-300 font-serif leading-relaxed">
                      4 màu sắc nổi bật dễ chọn, trợ giúp 50:50 loại trừ 2 phương án sai khi gặp câu khó.
                    </p>
                  </div>
                </div>

              </div>
            )}

            {/* Modal Footer */}
            <div className="text-center pt-2">
              <button
                onClick={() => setIsRulesModalOpen(false)}
                className="px-8 py-3 rounded-full bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 text-stone-950 font-black text-xs uppercase tracking-wider shadow-xl hover:scale-105 active:scale-95 transition-all"
              >
                ĐÃ HIỂU • TRẢI NGHIỆM NGAY
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
