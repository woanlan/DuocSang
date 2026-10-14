import React, { useState, useEffect, useRef } from 'react';
import { 
  Anchor, Compass, MapPin, Ship, Award,
  Sparkles, CheckCircle2, Volume2, Trophy, RotateCcw,
  Flag, Shield, Check, X, Dices, Gift, Star,
  HelpCircle, AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFX, speakVietnameseVoice, stopVietnameseVoice } from '../utils/gameAudio';

// ================= PURE SVG VIETNAMESE NATIONAL FLAG (SHARP & RESILIENT ON ALL PLATFORMS) =================
export const VietnamFlagIcon = ({ className = "w-4 h-2.5" }) => (
  <span className={`inline-flex items-center justify-center shrink-0 ${className}`}>
    <svg viewBox="0 0 30 20" className="w-full h-full rounded-[2px] shadow-sm overflow-hidden border border-amber-300/40">
      <rect width="30" height="20" fill="#da251d" />
      <polygon 
        points="15,4 16.35,8.15 20.71,8.15 17.18,10.71 18.53,14.85 15,12.29 11.47,14.85 12.82,10.71 9.29,8.15 13.65,8.15" 
        fill="#ffff00" 
      />
    </svg>
  </span>
);

// ================= 16 HISTORIC BOARD TILES (CLOCKWISE 5x5 BOARD) =================
// 11 Historical Landmarks + 5 Special Event / Supply Stations
export const BOARD_TILES = [
  // Top Row (0 -> 4)
  {
    id: 0,
    row: 0,
    col: 0,
    type: 'landmark',
    stopId: 1,
    title: "Bến Nhà Rồng",
    subtitle: "Khởi hành tìm đường cứu nước (05/06/1911)",
    country: "Sài Gòn - Việt Nam",
    nauticalMiles: 0,
    imageUrl: "/images/gallery/ben-nha-rong.jpg",
    roleTitle: "Người thanh niên Văn Ba",
    vessel: "Tàu Amiral Latouche-Tréville",
    narrative: "Ngày 5/6/1911, từ Bến cảng Nhà Rồng (Sài Gòn), người thanh niên yêu nước Nguyễn Tất Thành bước chân lên tàu buôn Pháp Amiral Latouche-Tréville với tên gọi Văn Ba, bắt đầu chuyến hải trình 30 năm tìm con đường cứu nước, cứu dân.",
    quote: "“Tôi muốn đi ra ngoài, xem nước Pháp và các nước khác. Sau khi xem xét họ làm như thế nào, tôi sẽ trở về giúp đồng bào chúng ta.”",
    question: "Người thanh niên Nguyễn Tất Thành đã nhận làm công việc gì trên tàu buôn Amiral Latouche-Tréville khi rời Bến Nhà Rồng?",
    options: [
      "Phụ bếp với công việc quét dọn, bốc than và rửa bát đĩa",
      "Thủy thủ lái tàu chính",
      "Phiên dịch viên tiếng Pháp cho thuyền trưởng",
      "Thợ cơ khí máy móc hơi nước"
    ],
    correctIndex: 0,
    explanation: "Người đã nhận làm phụ bếp, sẵn sàng lao động tay chân vất vả từ sáng sớm đến đêm khuya trong khoang tàu nóng rực để có cơ hội sang phương Tây tìm đường cứu nước."
  },
  {
    id: 1,
    row: 0,
    col: 1,
    type: 'landmark',
    stopId: 2,
    title: "Marseille & Le Havre",
    subtitle: "Cập cảng nước Pháp (06/07/1911)",
    country: "Cộng hòa Pháp",
    nauticalMiles: 6500,
    imageUrl: "/images/timeline/tau-latouche-treville.jpg",
    roleTitle: "Thủy thủ viễn dương",
    vessel: "Tàu buôn vượt Ấn Độ Dương & Địa Trung Hải",
    narrative: "Sau hơn 1 tháng lênh đênh qua Singapore, Colombo, Djibouti và vượt kênh đào Suez, con tàu cập cảng Marseille. Lần đầu tiên đặt chân lên đất Pháp, Người nhận thấy ở chính 'mẫu quốc' cũng có những người nghèo khổ như đồng bào mình.",
    quote: "“Tại sao người Pháp không khai hóa đồng bào của họ trước khi đi khai hóa chúng ta?”",
    question: "Khi cập cảng Marseille, điều gì khiến người thanh niên Văn Ba ngạc nhiên nhất về xã hội nước Pháp?",
    options: [
      "Ở nước Pháp cũng có những người lao động nghèo khổ bị bóc lột giống như người Việt Nam",
      "Nước Pháp hoàn toàn giàu có và không ai phải làm lụng vất vả",
      "Người Pháp đều được hưởng đặc quyền như nhau",
      "Các thủy thủ da màu được đối xử trọng vọng"
    ],
    correctIndex: 0,
    explanation: "Tại Marseille, Bác thấy những người lao động Pháp nghèo khổ, qua đó nhận thức sâu sắc: người lao động ở đâu cũng bị bóc lột và cần đoàn kết lại."
  },
  {
    id: 2,
    row: 0,
    col: 2,
    type: 'chance',
    title: "Cơ Hội Lịch Sử",
    subtitle: "Thẻ may mắn hải trình",
    icon: 'gift',
    color: 'from-amber-600 to-yellow-500',
    chanceEvents: [
      { text: "Được kiều bào và thủy thủ quốc tế tận tình giúp đỡ! Bạn được tặng thêm +300 hải lý tiếp sức.", bonusMiles: 300, forwardSteps: 0 },
      { text: "Gió thuận buồm xuôi, con tàu lướt sóng nhanh vượt bậc! Bạn tiến thẳng thêm 2 ô.", bonusMiles: 150, forwardSteps: 2 },
      { text: "Học thêm tiếng Anh và tiếng Pháp thông qua sách báo thư viện! Bạn nhận +250 hải lý tri thức.", bonusMiles: 250, forwardSteps: 0 }
    ]
  },
  {
    id: 3,
    row: 0,
    col: 3,
    type: 'landmark',
    stopId: 3,
    title: "New York & Boston",
    subtitle: "Tiếp cận thế giới mới (1912 - 1913)",
    country: "Hoa Kỳ",
    nauticalMiles: 11200,
    imageUrl: "/images/timeline/bac-o-my.jpg",
    roleTitle: "Lao động tự do & quan sát văn minh",
    vessel: "Tàu hàng vượt Đại Tây Dương",
    narrative: "Cuối năm 1912, Người theo tàu sang Mỹ, sống và làm thuê tại New York và Boston. Người thường xuyên đến khu Harlem tìm hiểu đời sống người da màu và nghiên cứu bản Tuyên ngôn Độc lập Mỹ năm 1776.",
    quote: "“Tất cả mọi người đều sinh ra có quyền bình đẳng. Tạo hóa cho họ những quyền không ai có thể xâm phạm được.”",
    question: "Trong thời gian ở Boston (Mỹ), Bác Hồ đã làm công việc gì tại khách sạn danh tiếng Omni Parker House?",
    options: [
      "Làm thợ làm bánh tại bộ phận bếp bánh của khách sạn",
      "Lễ tân trưởng đón khách quốc tế",
      "Quản lý sổ sách và tài chính khách sạn",
      "Bảo vệ sảnh chính khách sạn"
    ],
    correctIndex: 0,
    explanation: "Tại khách sạn Parker House ở Boston, Người làm thợ phụ làm bánh. Đến nay, chiếc bàn đá nơi Bác từng làm bánh vẫn được khách sạn lưu giữ trang trọng như một kỷ vật lịch sử."
  },
  {
    id: 4,
    row: 0,
    col: 4,
    type: 'supply',
    title: "Trạm Kênh Đào Suez",
    subtitle: "Nghỉ ngơi & Tiếp tế hải trình",
    icon: 'anchor',
    color: 'from-cyan-600 to-blue-700',
    rewardText: "Con tàu neo đậu tiếp tế nhiên liệu và nước ngọt qua eo biển Suez. Bạn được phục hồi năng lượng và nhận +200 hải lý tiếp tế!"
  },

  // Right Column (5 -> 8)
  {
    id: 5,
    row: 1,
    col: 4,
    type: 'landmark',
    stopId: 4,
    title: "London",
    subtitle: "Thủ đô sương mù (1913 - 1917)",
    country: "Vương quốc Anh",
    nauticalMiles: 14500,
    imageUrl: "/images/timeline/carlton-hotel.jpg",
    roleTitle: "Đoàn viên Lao động Hải ngoại",
    vessel: "Vượt bão tuyết xứ sương mù",
    narrative: "Đầu năm 1914, Người sang Anh, làm nghề cào tuyết, đốt lò rồi phụ bếp tại khách sạn Carlton dưới sự hướng dẫn của vua đầu bếp Escoffier. Tại đây, Người gia nhập Công đoàn Lao động Hải ngoại và nghiên cứu phong trào công nhân thế giới.",
    quote: "“Dù phải cào tuyết giữa mùa đông lạnh giá buốt xương, ngọn lửa yêu nước trong tim chưa bao giờ nguội tắt.”",
    question: "Tại London, Bác Hồ đã gia nhập tổ chức bí mật tiến bộ nào của những người lao động thuộc địa?",
    options: [
      "Hội những người Lao động Hải ngoại (Overseas Workers Association)",
      "Công đoàn Thủy thủ Viễn đông",
      "Hội Thanh niên Ái quốc Luân Đôn",
      "Hội Trí thức Tiến bộ Anh quốc"
    ],
    correctIndex: 0,
    explanation: "Bác tham gia Hội những người Lao động Hải ngoại gồm các công nhân từ các nước thuộc địa, học hỏi phương pháp đấu tranh nghiệp đoàn của giai cấp vô sản."
  },
  {
    id: 6,
    row: 2,
    col: 4,
    type: 'fate',
    title: "Thử Thách Vận Mệnh",
    subtitle: "Sóng gió đại dương & Bản lĩnh thép",
    icon: 'compass',
    color: 'from-purple-600 to-indigo-700',
    fateEvents: [
      { text: "Vượt qua sự theo dõi gắt gao của mật thám! Nhờ mưu trí, bạn nhận được huy chương kiên định (+250 hải lý).", bonusMiles: 250, forwardSteps: 0 },
      { text: "Bão biển Địa Trung Hải dữ dội! Con tàu phải hạ buồm giữ thăng bằng an toàn, nhận +150 hải lý rèn luyện.", bonusMiles: 150, forwardSteps: 0 }
    ]
  },
  {
    id: 7,
    row: 3,
    col: 4,
    type: 'landmark',
    stopId: 5,
    title: "Paris - Ngõ Compoint",
    subtitle: "Bản Yêu sách & Báo Le Paria (1917 - 1923)",
    country: "Cộng hòa Pháp",
    nauticalMiles: 16800,
    imageUrl: "/images/timeline/ngo-compoint.jpg",
    roleTitle: "Nguyễn Ái Quốc - Chiến sĩ Ái quốc",
    vessel: "Trung tâm phong trào giải phóng dân tộc",
    narrative: "Tại căn gác trọ số 9 ngõ Compoint (Quận 17, Paris), Nguyễn Ái Quốc làm nghề thợ ảnh để kiếm sống. Người gửi Bản Yêu sách của nhân dân An Nam đến Hội nghị Versailles (1919) và bỏ phiếu gia nhập Quốc tế III, sáng lập Đảng Cộng sản Pháp (1920).",
    quote: "“Hỡi đồng bào bị đọa đày đau khổ! Đây là cái cần thiết cho chúng ta, đây là con đường giải phóng chúng ta!”",
    question: "Nguyễn Ái Quốc đã đọc bản văn kiện lịch sử mang tính bước ngoặt nào của Lênin vào tháng 7/1920?",
    options: [
      "Sơ thảo lần thứ nhất những luận cương về vấn đề dân tộc và vấn đề thuộc địa",
      "Tuyên ngôn của Đảng Cộng sản",
      "Nhà nước và Cách mạng",
      "Chính sách kinh tế mới (NEP)"
    ],
    correctIndex: 0,
    explanation: "Đọc Luận cương của Lênin trên báo L'Humanité, Bác đã òa khóc vì xúc động khi tìm thấy con đường cứu nước chân chính cho dân tộc Việt Nam: con đường cách mạng vô sản."
  },
  {
    id: 8,
    row: 4,
    col: 4,
    type: 'landmark',
    stopId: 6,
    title: "Mát-xcơ-va",
    subtitle: "Quê hương Cách mạng Tháng Mười (1923 - 1924)",
    country: "Liên Xô",
    nauticalMiles: 20100,
    imageUrl: "/images/timeline/moskva-1924.jpg",
    roleTitle: "Đại biểu Quốc tế Nông dân & Đệ Tam Quốc tế",
    vessel: "Hành trình bí mật qua Berlin đến Liên Xô",
    narrative: "Mùa hè năm 1923, Nguyễn Ái Quốc bí mật rời Paris sang Liên bang Xô Viết. Người tham dự Đại hội I Quốc tế Nông dân, học tại Trường Đại học Phương Đông và phát biểu đanh thép tại Đại hội V Quốc tế Cộng sản về phong trào giải phóng thuộc địa.",
    quote: "“Chủ nghĩa tư bản là con đỉa hai vòi: một vòi bám vào chính quốc, vòi kia bám vào thuộc địa. Muốn giết nó phải chặt cả hai vòi.”",
    question: "Tại Liên Xô, Bác Hồ đã theo học và tốt nghiệp ngôi trường đào tạo cán bộ cách mạng nổi tiếng nào?",
    options: [
      "Trường Đại học Lao động Cộng sản Phương Đông",
      "Trường Quân sự Hoàng Phố",
      "Trường Đảng cao cấp Matxcơva",
      "Trường Đại học Tổng hợp Lomonosov"
    ],
    correctIndex: 0,
    explanation: "Tại Trường Đại học Phương Đông, Người đã nghiên cứu sâu sắc chủ nghĩa Mác - Lênin và chuẩn bị nền tảng lý luận đào tạo cán bộ cho cách mạng Việt Nam."
  },

  // Bottom Row (9 -> 12, right to left)
  {
    id: 9,
    row: 4,
    col: 3,
    type: 'chance',
    title: "Cơ Hội Lịch Sử",
    subtitle: "Ngọn đuốc Lênin soi đường",
    icon: 'gift',
    color: 'from-amber-600 to-yellow-500',
    chanceEvents: [
      { text: "Tiếp thu Luận cương Lênin soi sáng đường lối cách mạng! Bạn được thưởng lớn +400 hải lý.", bonusMiles: 400, forwardSteps: 0 },
      { text: "Liên lạc mật mã với các đồng chí kiên trung! Con tàu được tăng tốc vượt 2 ô về phía phương Đông.", bonusMiles: 200, forwardSteps: 2 },
      { text: "Được nhân dân lao động quốc tế che chở bí mật vượt biên giới! Nhận +300 hải lý.", bonusMiles: 300, forwardSteps: 0 }
    ]
  },
  {
    id: 10,
    row: 4,
    col: 2,
    type: 'landmark',
    stopId: 7,
    title: "Quảng Châu",
    subtitle: "Ươm mầm hạt giống đỏ (1924 - 1927)",
    country: "Trung Quốc",
    nauticalMiles: 23400,
    imageUrl: "/images/timeline/tru-so-hoi-thanh-nien.jpg",
    roleTitle: "Đồng chí Lý Thụy & Cố vấn Borodin",
    vessel: "Cầu nối phong trào cách mạng về Tổ quốc",
    narrative: "Cuối năm 1924, Người đến Quảng Châu (Trung Quốc) lấy bí danh Lý Thụy. Người sáng lập Hội Việt Nam Cách mạng Thanh niên (6/1925), xuất bản báo Thanh Niên và mở các lớp huấn luyện chính trị đào tạo các chiến sĩ nòng cốt cho cách mạng nước nhà.",
    quote: "“Cách mạng là việc chung cả dân chúng chứ không phải việc một hai người.”",
    question: "Tập hợp các bài giảng lý luận chính trị của Nguyễn Ái Quốc tại các lớp huấn luyện ở Quảng Châu đã được in thành cuốn sách gối đầu giường nào?",
    options: [
      "Đường Kách mệnh (1927)",
      "Bản án chế độ thực dân Pháp",
      "Tuyên ngôn Độc lập",
      "Cương lĩnh chính trị đầu tiên"
    ],
    correctIndex: 0,
    explanation: "Cuốn sách 'Đường Kách mệnh' xuất bản năm 1927 là cẩm nang chính trị vô giá giác ngộ hàng vạn thanh niên yêu nước đứng lên đấu tranh giành độc lập."
  },
  {
    id: 11,
    row: 4,
    col: 1,
    type: 'landmark',
    stopId: 8,
    title: "Bản Đông - Phichit",
    subtitle: "Thầy giáo Thầu Chín (1928 - 1929)",
    country: "Xiêm (Thái Lan)",
    nauticalMiles: 25100,
    imageUrl: "/images/timeline/thau-chin-thai-lan.jpg",
    roleTitle: "Thầy giáo Thầu Chín",
    vessel: "Vùng đất hữu nghị Đông Nam Á",
    narrative: "Mùa thu năm 1928, Người sang Xiêm (Thái Lan) với bí danh Thầu Chín. Người cùng kiều bào mở mang trường học dạy chữ quốc ngữ, mở hội hợp tác, dịch sách báo và gây dựng căn cứ cách mạng vững chắc sát gần biên giới Tổ quốc.",
    quote: "“Muốn cách mạng thành công, trước hết phải làm cho dân giác ngộ, phải thương yêu đùm bọc lẫn nhau.”",
    question: "Khi hoạt động cách mạng giữa cộng đồng kiều bào tại Thái Lan (1928 - 1929), Bác Hồ lấy bí danh thân thương là gì?",
    options: [
      "Thầu Chín",
      "Lý Thụy",
      "Ông Ké",
      "Ba Chín"
    ],
    correctIndex: 0,
    explanation: "Bà con kiều bào tại vùng Udon Thani, Phichit thân thương gọi Người là 'Thầu Chín' (tiếng Thái có nghĩa là bác/chú Chín đầy tôn kính)."
  },
  {
    id: 12,
    row: 4,
    col: 0,
    type: 'landmark',
    stopId: 9,
    title: "Cửu Long - Hồng Kông",
    subtitle: "Thành lập Đảng Cộng sản Việt Nam (03/02/1930)",
    country: "Hồng Kông",
    nauticalMiles: 26800,
    imageUrl: "/images/timeline/thanh-lap-dang-1930.jpg",
    roleTitle: "Phái viên Quốc tế Cộng sản",
    vessel: "Hội nghị hợp nhất lịch sử",
    narrative: "Từ ngày 6/1 đến đầu tháng 2/1930, tại bán đảo Cửu Long (Hồng Kông), Người chủ trì Hội nghị hợp nhất ba tổ chức cộng sản, thành lập nên Đảng Cộng sản Việt Nam quang vinh, chấm dứt thời kỳ khủng hoảng đường lối cứu nước.",
    quote: "“Đảng ta là đạo đức, là văn minh / Là thống nhất, độc lập, là hòa bình ấm no.”",
    question: "Hội nghị thành lập Đảng Cộng sản Việt Nam (03/02/1930) đã hợp nhất những tổ chức cộng sản nào?",
    options: [
      "Đông Dương Cộng sản Đảng, An Nam Cộng sản Đảng và Đông Dương Cộng sản Liên đoàn",
      "Hội Việt Nam Cách mạng Thanh niên và Tân Việt Cách mạng Đảng",
      "Việt Nam Quốc dân Đảng và Đảng Lập hiến",
      "Tâm Tâm Xã và Việt Nam Quang Phục Hội"
    ],
    correctIndex: 0,
    explanation: "Nguyễn Ái Quốc đã khéo léo xóa bỏ bất đồng nội bộ, hợp nhất 3 tổ chức thành một chính đảng duy nhất lấy tên là Đảng Cộng sản Việt Nam."
  },

  // Left Column (13 -> 15, bottom to top)
  {
    id: 13,
    row: 3,
    col: 0,
    type: 'fate',
    title: "Tiếng Gọi Non Sông",
    subtitle: "Biến cố & Ý chí thép",
    icon: 'star',
    color: 'from-rose-700 to-amber-700',
    fateEvents: [
      { text: "Bản lĩnh kiên cường vượt ngục Victoria (Hồng Kông) nhờ luật sư Loseby bảo vệ lẽ phải! Bạn được giải phóng và cộng +350 hải lý.", bonusMiles: 350, forwardSteps: 0 },
      { text: "Phong trào cách mạng trong nước dâng cao! Bạn được tiếp thêm sĩ khí anh hùng, tiến thẳng thêm 1 ô.", bonusMiles: 200, forwardSteps: 1 }
    ]
  },
  {
    id: 14,
    row: 2,
    col: 0,
    type: 'landmark',
    stopId: 10,
    title: "Côn Minh & Quế Lâm",
    subtitle: "Chuẩn bị về nước (1940)",
    country: "Vùng biên giới Việt - Trung",
    nauticalMiles: 28900,
    imageUrl: "/images/timeline/lan-khuoi-nam.jpg",
    roleTitle: "Bác Hồ - Già Thu",
    vessel: "Bắt liên lạc trở về biên ải",
    narrative: "Năm 1940, trước tình hình thế giới chuyển biến mau lẹ, Người tìm về Côn Minh và Quế Lâm, gặp gỡ các đồng chí Võ Nguyên Giáp, Phạm Văn Đồng... trực tiếp chỉ đạo chuẩn bị mọi điều kiện để đưa phong trào cách mạng về lại Tổ quốc.",
    quote: "“Thời cơ đã đến, dù có phải đốt cháy cả dãy Trường Sơn cũng phải kiên quyết giành cho được độc lập!”",
    question: "Tại Côn Minh và Tĩnh Tây, Bác Hồ đã chọn địa danh nào của Tổ quốc làm căn cứ địa đầu tiên khi trở về nước?",
    options: [
      "Pác Bó (Cao Bằng)",
      "Tân Trào (Tuyên Quang)",
      "Định Hóa (Thái Nguyên)",
      "Ba Bể (Bắc Kạn)"
    ],
    correctIndex: 0,
    explanation: "Người nhận định Cao Bằng có thế đất hiểm trở 'tiến có thể đánh, lui có thể giữ', nối liền với hậu phương quốc tế nên chọn làm bàn đạp đầu tiên cho cách mạng Việt Nam."
  },
  {
    id: 15,
    row: 1,
    col: 0,
    type: 'landmark',
    stopId: 11,
    title: "Cột mốc 108 - Pác Bó",
    subtitle: "Mốc son trở về đất mẹ (28/01/1941)",
    country: "Cao Bằng - Việt Nam",
    nauticalMiles: 30000,
    imageUrl: "/images/timeline/cot-moc-108.jpg",
    roleTitle: "Chủ tịch Hồ Chí Minh - Người Cha Già Dân Tộc",
    vessel: "Hành trình 30 năm khép lại - Bình minh độc lập",
    narrative: "Ngày 28/01/1941 (mùng 2 Tết Tân Tỵ), sau 30 năm bôn ba khắp bốn biển năm châu, Bác Hồ kính yêu đã bước qua cột mốc 108 trên biên giới Việt - Trung, nghẹn ngào cúi hôn mảnh đất quê hương Pác Bó (Hà Quảng, Cao Bằng).",
    quote: "“Kìa bóng Bác đang hôn lên hòn đất / Lắng nghe trong màu hồng hình đất nước phôi thai...”",
    question: "Hình ảnh xúc động đầu tiên của Bác Hồ khi bước chân qua cột mốc 108 trở về đất mẹ sau 30 năm xa cách là gì?",
    options: [
      "Bác cúi xuống xúc động hôn lên nắm đất thiêng của Tổ quốc",
      "Bác bắt tay chào các chiến sĩ biên phòng",
      "Bác viết ngay bài thơ Pác Bó",
      "Bác trồng cây đa lưu niệm tại biên giới"
    ],
    correctIndex: 0,
    explanation: "Đúng ngày 28/01/1941, Bác Hồ cùng các đồng chí bí mật đặt chân về Tổ quốc tại Cao Bằng, đánh dấu mốc son rực rỡ chuẩn bị cho ngày Tổng khởi nghĩa Cách mạng Tháng Tám."
  }
];

// List of all 11 landmark tile IDs where Vietnamese flag must be planted
export const LANDMARK_TILE_IDS = [0, 1, 3, 5, 7, 8, 10, 11, 12, 14, 15];

// Helper to shuffle options so correct answer is randomly distributed among A, B, C, D
function shuffleTileOptions(tile) {
  if (!tile || !tile.options) return tile;
  const indexed = tile.options.map((opt, idx) => ({
    text: opt,
    isCorrect: idx === tile.correctIndex
  }));
  for (let i = indexed.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indexed[i], indexed[j]] = [indexed[j], indexed[i]];
  }
  const newCorrectIndex = indexed.findIndex(item => item.isCorrect);
  return {
    ...tile,
    options: indexed.map(item => item.text),
    correctIndex: newCorrectIndex
  };
}

export default function HaiTrinhVanDamGame() {
  // Current tile index on board (0 to 15)
  const [currentTileIdx, setCurrentTileIdx] = useState(0);
  // Claimed tiles where Vietnamese flag is successfully planted
  const [claimedTiles, setClaimedTiles] = useState([]);
  const [totalNauticalMiles, setTotalNauticalMiles] = useState(0);
  const [diceCount, setDiceCount] = useState(0); // Number of rolls
  const [diceValue, setDiceValue] = useState(1); // 1 to 6
  const [isRolling, setIsRolling] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [isWaitingChallenge, setIsWaitingChallenge] = useState(false);
  const [diceTransform, setDiceTransform] = useState({ rotateX: 0, rotateY: 0, scale: 1 });

  // Modals
  const [activeChallengeTile, setActiveChallengeTile] = useState(null); // Landmark challenge
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);

  // Chance / Fate notification modal
  const [chanceModalInfo, setChanceModalInfo] = useState(null);

  // Grand victory modal (when all 11 flags are planted)
  const [isGrandFinale, setIsGrandFinale] = useState(false);

  // Clean voice on unmount
  useEffect(() => {
    return () => {
      stopVietnameseVoice();
    };
  }, []);

  // Number of landmark flags claimed so far
  const totalLandmarks = LANDMARK_TILE_IDS.length; // 11
  const claimedCount = claimedTiles.filter(id => LANDMARK_TILE_IDS.includes(id)).length;
  const progressPercent = Math.round((claimedCount / totalLandmarks) * 100);

  // ================= TRUE RANDOM WITH BALANCED BAG SHUFFLE (ANTI-DUPLICATE & FAIR DISTRIBUTION) =================
  const lastRollRef = useRef(null);
  const diceBagRef = useRef([]);

  const getNextRandomDice = () => {
    // If bag has fewer than 1 item, refill with a fresh shuffled set of [1, 2, 3, 4, 5, 6]
    if (!diceBagRef.current || diceBagRef.current.length === 0) {
      const bag = [1, 2, 3, 4, 5, 6];
      // Fisher-Yates shuffle using crypto.getRandomValues if available
      for (let i = bag.length - 1; i > 0; i--) {
        let j = 0;
        if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
          const uintArr = new Uint32Array(1);
          window.crypto.getRandomValues(uintArr);
          j = uintArr[0] % (i + 1);
        } else {
          j = Math.floor(Math.random() * (i + 1));
        }
        [bag[i], bag[j]] = [bag[j], bag[i]];
      }
      // Guarantee the first number does not repeat the previous roll
      if (bag[0] === lastRollRef.current && bag.length > 1) {
        [bag[0], bag[1]] = [bag[1], bag[0]];
      }
      diceBagRef.current = bag;
    }

    const nextRoll = diceBagRef.current.shift();
    lastRollRef.current = nextRoll;
    return nextRoll;
  };

  // ================= ULTRA SMOOTH 3D DECELERATING DICE ROLL =================
  const handleRollDice = () => {
    if (isRolling || isMoving || isWaitingChallenge || activeChallengeTile || chanceModalInfo || isGrandFinale) return;

    stopVietnameseVoice();
    setIsRolling(true);
    soundFX.playDiceRoll();

    const finalDice = getNextRandomDice();

    // Smooth physics deceleration intervals (ms)
    const intervals = [40, 50, 60, 75, 95, 120, 155, 200, 260];
    let step = 0;

    const runDeceleratingRoll = () => {
      if (step < intervals.length) {
        // Tumbling random face during roll
        const tumbleVal = Math.floor(Math.random() * 6) + 1;
        setDiceValue(tumbleVal);
        setDiceTransform({
          rotateX: Math.floor(Math.random() * 360),
          rotateY: Math.floor(Math.random() * 360),
          scale: 1.08 + Math.random() * 0.08
        });
        step++;
        setTimeout(runDeceleratingRoll, intervals[step - 1]);
      } else {
        // Final landing with bounce and snap to the fair random number
        setDiceValue(finalDice);
        setDiceTransform({ rotateX: 0, rotateY: 0, scale: 1 });
        setIsRolling(false);
        setDiceCount(prev => prev + 1);

        // Move character step-by-step
        setTimeout(() => {
          moveTokenStepByStep(finalDice);
        }, 250);
      }
    };

    runDeceleratingRoll();
  };

  // Step-by-step movement along the 16 board tiles
  const moveTokenStepByStep = (stepsRemaining, startIdx = currentTileIdx) => {
    setIsMoving(true);
    let currentStep = 0;
    let targetIdx = startIdx;

    const stepInterval = setInterval(() => {
      currentStep++;
      targetIdx = (targetIdx + 1) % 16;
      setCurrentTileIdx(targetIdx);
      soundFX.playStep();

      if (currentStep >= stepsRemaining) {
        clearInterval(stepInterval);
        setIsMoving(false);
        // Landed on target tile! Wait 2 seconds for player to observe before showing question
        setIsWaitingChallenge(true);
        setTimeout(() => {
          setIsWaitingChallenge(false);
          handleLandedOnTile(targetIdx);
        }, 2000);
      }
    }, 280);
  };

  // Handle landing on a specific tile
  const handleLandedOnTile = (tileIndex) => {
    const tile = BOARD_TILES[tileIndex];
    if (!tile) return;

    // Check tile type
    if (tile.type === 'landmark') {
      if (claimedTiles.includes(tile.id)) {
        // Flag already planted earlier: Praise and give travel bonus
        soundFX.playSparkle();
        setTotalNauticalMiles(prev => prev + 100);
        speakVietnameseVoice(`Bạn đã dừng chân tại ${tile.title}. Địa danh này đã được cắm cờ Tổ quốc Việt Nam, bạn nhận thêm 100 hải lý tiếp sức!`);
      } else {
        // Not claimed yet: Open question challenge with shuffled options
        const shuffled = shuffleTileOptions(tile);
        setActiveChallengeTile(shuffled);
        setSelectedOption(null);
        setIsAnswerChecked(false);
        // Automatically read question aloud
        speakVietnameseVoice(shuffled.question);
      }
    } else if (tile.type === 'chance') {
      // Chance tile
      const randomEvent = tile.chanceEvents[Math.floor(Math.random() * tile.chanceEvents.length)];
      soundFX.playSparkle();
      setChanceModalInfo({
        title: "CƠ HỘI LỊCH SỬ",
        subtitle: "Thẻ may mắn hải trình",
        text: randomEvent.text,
        bonusMiles: randomEvent.bonusMiles,
        forwardSteps: randomEvent.forwardSteps,
        icon: 'gift'
      });
      speakVietnameseVoice(randomEvent.text);

      if (randomEvent.bonusMiles) {
        setTotalNauticalMiles(prev => prev + randomEvent.bonusMiles);
      }
    } else if (tile.type === 'fate') {
      // Fate tile
      const randomEvent = tile.fateEvents[Math.floor(Math.random() * tile.fateEvents.length)];
      soundFX.playSparkle();
      setChanceModalInfo({
        title: "VẬN MỆNH LỊCH SỬ",
        subtitle: "Sóng gió đại dương & Bản lĩnh thép",
        text: randomEvent.text,
        bonusMiles: randomEvent.bonusMiles,
        forwardSteps: randomEvent.forwardSteps,
        icon: 'compass'
      });
      speakVietnameseVoice(randomEvent.text);

      if (randomEvent.bonusMiles) {
        setTotalNauticalMiles(prev => prev + randomEvent.bonusMiles);
      }
    } else if (tile.type === 'supply') {
      // Supply station
      soundFX.playShipHorn();
      setTotalNauticalMiles(prev => prev + 200);
      setChanceModalInfo({
        title: "TRẠM TIẾP TẾ SUEZ",
        subtitle: "Bổ sung nhiên liệu & nước ngọt",
        text: tile.rewardText,
        bonusMiles: 200,
        forwardSteps: 0,
        icon: 'anchor'
      });
      speakVietnameseVoice(tile.rewardText);
    }
  };

  // Close Chance / Fate modal
  const handleCloseChanceModal = () => {
    stopVietnameseVoice();
    const info = chanceModalInfo;
    setChanceModalInfo(null);
    if (info && info.forwardSteps > 0) {
      setTimeout(() => {
        moveTokenStepByStep(info.forwardSteps, currentTileIdx);
      }, 300);
    }
  };

  // Submit challenge answer in question modal
  const handleAnswerSubmit = (optionIndex) => {
    if (selectedOption !== null || !activeChallengeTile) return;
    setSelectedOption(optionIndex);
    setIsAnswerChecked(true);

    const isCorrect = optionIndex === activeChallengeTile.correctIndex;
    setIsAnswerCorrect(isCorrect);

    if (isCorrect) {
      soundFX.playShipHorn();
      soundFX.playCorrect();
      
      const newClaimed = [...new Set([...claimedTiles, activeChallengeTile.id])];
      setClaimedTiles(newClaimed);
      setTotalNauticalMiles(prev => prev + 350);

      const updatedCount = newClaimed.filter(id => LANDMARK_TILE_IDS.includes(id)).length;

      // Check if ALL 11 landmark flags have been planted!
      if (updatedCount >= totalLandmarks) {
        speakVietnameseVoice(`Chính xác! Bạn đã cắm lá cờ Tổ quốc thứ ${updatedCount} và hoàn thành xuất sắc toàn bộ 11 mốc son lịch sử của Bác Hồ!`);
        setTimeout(() => {
          setIsGrandFinale(true);
          soundFX.playVictory();
          try {
            confetti({
              particleCount: 180,
              spread: 100,
              origin: { y: 0.55 }
            });
          } catch (e) {}
        }, 1200);
      } else {
        speakVietnameseVoice(`Chính xác! Bạn đã cắm cờ Việt Nam thành công tại ${activeChallengeTile.title}. Bạn đã cắm được ${updatedCount} trên 11 lá cờ!`);
      }
    } else {
      soundFX.playWrong();
      const correctLetter = String.fromCharCode(65 + activeChallengeTile.correctIndex);
      const correctText = activeChallengeTile.options[activeChallengeTile.correctIndex];
      speakVietnameseVoice(`Chưa chính xác! Đáp án đúng là đáp án ${correctLetter}: ${correctText}. Bạn chưa cắm được cờ tại đây, hãy thử lại ở vòng sau nhé!`);
    }
  };

  const handleCloseChallengeModal = () => {
    stopVietnameseVoice();
    setActiveChallengeTile(null);
    setSelectedOption(null);
    setIsAnswerChecked(false);
  };

  const handleRestartGame = () => {
    stopVietnameseVoice();
    soundFX.playShipHorn();
    lastRollRef.current = null;
    diceBagRef.current = [];
    setCurrentTileIdx(0);
    setClaimedTiles([]);
    setTotalNauticalMiles(0);
    setDiceCount(0);
    setDiceValue(1);
    setIsWaitingChallenge(false);
    setIsGrandFinale(false);
    setActiveChallengeTile(null);
    setChanceModalInfo(null);
  };

  // Get current tile data
  const currentTile = BOARD_TILES[currentTileIdx];

  // Grid style for 5x5 board
  const getGridStyle = (tile) => ({
    gridRowStart: tile.row + 1,
    gridColumnStart: tile.col + 1
  });

  // Render 3D Dice Pips (All 5-pointed golden stars ★)
  const renderDicePips = (val) => {
    const StarPip = ({ className = "text-xs sm:text-sm" }) => (
      <span className={`text-yellow-300 drop-shadow-[0_0_8px_rgba(255,235,59,0.95)] leading-none select-none inline-flex items-center justify-center ${className}`}>
        ★
      </span>
    );

    switch(val) {
      case 1:
        return (
          <div className="flex items-center justify-center w-full h-full">
            <StarPip className="text-2xl sm:text-3xl md:text-4xl animate-pulse" />
          </div>
        );
      case 2:
        return (
          <div className="w-full h-full p-2 sm:p-2.5 flex flex-col justify-between">
            <div className="flex justify-start"><StarPip className="text-sm sm:text-base" /></div>
            <div className="flex justify-end"><StarPip className="text-sm sm:text-base" /></div>
          </div>
        );
      case 3:
        return (
          <div className="w-full h-full p-1.5 sm:p-2 flex flex-col justify-between">
            <div className="flex justify-start"><StarPip className="text-xs sm:text-sm" /></div>
            <div className="flex justify-center"><StarPip className="text-xs sm:text-sm" /></div>
            <div className="flex justify-end"><StarPip className="text-xs sm:text-sm" /></div>
          </div>
        );
      case 4:
        return (
          <div className="w-full h-full p-1.5 sm:p-2 flex flex-col justify-between">
            <div className="flex justify-between">
              <StarPip className="text-xs sm:text-sm" />
              <StarPip className="text-xs sm:text-sm" />
            </div>
            <div className="flex justify-between">
              <StarPip className="text-xs sm:text-sm" />
              <StarPip className="text-xs sm:text-sm" />
            </div>
          </div>
        );
      case 5:
        return (
          <div className="w-full h-full p-1.5 sm:p-2 flex flex-col justify-between relative">
            <div className="flex justify-between">
              <StarPip className="text-[11px] sm:text-xs" />
              <StarPip className="text-[11px] sm:text-xs" />
            </div>
            <div className="flex justify-center my-auto">
              <StarPip className="text-xs sm:text-sm" />
            </div>
            <div className="flex justify-between">
              <StarPip className="text-[11px] sm:text-xs" />
              <StarPip className="text-[11px] sm:text-xs" />
            </div>
          </div>
        );
      case 6:
      default:
        return (
          <div className="w-full h-full p-1.5 sm:p-2 flex justify-between">
            <div className="flex flex-col justify-between">
              <StarPip className="text-[11px] sm:text-xs" />
              <StarPip className="text-[11px] sm:text-xs" />
              <StarPip className="text-[11px] sm:text-xs" />
            </div>
            <div className="flex flex-col justify-between">
              <StarPip className="text-[11px] sm:text-xs" />
              <StarPip className="text-[11px] sm:text-xs" />
              <StarPip className="text-[11px] sm:text-xs" />
            </div>
          </div>
        );
    }
  };

  return (
    <div id="journey-game-container" className="w-full max-w-5xl mx-auto space-y-2 sm:space-y-3">
      
      {/* ================= COMPACT HISTORICAL HUD BAR (PROGRESS & STATS) ================= */}
      <div className="bg-[#17100a]/95 backdrop-blur-md px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl border border-amber-600/40 shadow-lg flex items-center justify-between gap-2.5">
        
        {/* Left: Title & Subtitle */}
        <div className="flex items-center space-x-2.5 min-w-0">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-amber-600 to-yellow-500 border border-yellow-300 flex items-center justify-center text-stone-950 font-black shadow shrink-0">
            <Compass className="w-4 h-4 sm:w-5 sm:h-5 text-stone-950 animate-spin-slow" />
          </div>
          <div className="min-w-0">
            <h3 className="text-xs sm:text-sm md:text-base font-serif font-bold text-amber-100 leading-tight break-words">
              Hành Trình Theo Chân Bác
            </h3>
            <span className="text-[9px] sm:text-[10px] text-amber-400 font-serif block break-words">
              16 Mốc Son Lịch Sử (1911 - 1941)
            </span>
          </div>
        </div>

        {/* Center: Vietnam Flag Goal & Progress */}
        <div className="flex-1 max-w-xs sm:max-w-sm mx-1 sm:mx-3">
          <div className="flex items-center justify-between text-[10px] sm:text-xs font-serif mb-1 px-0.5">
            <span className="text-yellow-300 font-bold flex items-center space-x-1.5 whitespace-nowrap">
              <VietnamFlagIcon className="w-4 h-3 rounded-[2px] shrink-0" />
              <span>Cờ đã cắm: <span className="font-mono text-amber-200">{claimedCount}/{totalLandmarks}</span></span>
            </span>
            <span className="text-amber-300 font-mono font-bold ml-1">{progressPercent}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-stone-900 overflow-hidden border border-amber-900/60 p-0.5">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-red-600 via-amber-500 to-yellow-400 transition-all duration-500 shadow"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Right: Stats & Restart */}
        <div className="flex items-center space-x-2 shrink-0">
          <div className="bg-stone-900/90 border border-amber-900/60 px-2.5 py-1 rounded-xl text-center hidden md:block">
            <span className="text-[9px] text-stone-400 uppercase">Hải Lý: </span>
            <span className="text-xs font-bold font-mono text-cyan-300">{totalNauticalMiles.toLocaleString()} hl</span>
          </div>

          <div className="bg-stone-900/90 border border-amber-900/60 px-2.5 py-1 rounded-xl text-center hidden sm:block">
            <span className="text-[9px] text-stone-400 uppercase">Lượt: </span>
            <span className="text-xs font-bold font-mono text-amber-200">#{diceCount}</span>
          </div>

          <button
            onClick={handleRestartGame}
            className="p-1.5 sm:p-2 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-300 hover:text-white transition-all text-xs"
            title="Làm mới lại hành trình"
          >
            <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>

      {/* ================= 16-TILE HISTORICAL BOARD (5x5 GRID) ================= */}
      <div 
        className="relative aspect-square mx-auto p-1.5 sm:p-2.5 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#120a06] via-[#1c100a] to-[#0c0604] border-2 sm:border-4 border-amber-600/60 shadow-2xl overflow-hidden select-none"
        style={{
          width: 'min(96vw, calc(100vh - 145px), 580px)',
          height: 'min(96vw, calc(100vh - 145px), 580px)',
          maxHeight: 'min(96vw, calc(100vh - 145px), 580px)'
        }}
      >
        {/* Subtle Map Watermark Texture in background */}
        <div className="absolute inset-0 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:20px_20px] opacity-15 pointer-events-none" />

        {/* 5x5 Grid Container */}
        <div className="relative w-full h-full grid grid-cols-5 grid-rows-5 gap-1 sm:gap-1.5">
          
          {/* RENDER THE 16 PERIMETER TILES */}
          {BOARD_TILES.map((tile) => {
            const isCurrentPos = currentTileIdx === tile.id;
            const isClaimed = claimedTiles.includes(tile.id);
            const isLandmark = tile.type === 'landmark';
            const isCorner = (tile.row === 0 && tile.col === 0) || 
                             (tile.row === 0 && tile.col === 4) || 
                             (tile.row === 4 && tile.col === 4) || 
                             (tile.row === 4 && tile.col === 0);

            return (
              <div
                key={tile.id}
                style={getGridStyle(tile)}
                onClick={() => {
                  if (tile.type === 'landmark') {
                    handleLandedOnTile(tile.id);
                  }
                }}
                className={`relative rounded-lg sm:rounded-xl border transition-all duration-300 flex flex-col justify-between p-1 sm:p-1.5 cursor-pointer overflow-hidden ${
                  isCurrentPos 
                    ? 'ring-2 sm:ring-4 ring-yellow-400 border-yellow-300 bg-gradient-to-b from-amber-800/95 to-amber-950 z-20 scale-[1.02] shadow-[0_0_20px_rgba(251,191,36,0.7)]' 
                    : isClaimed
                      ? 'border-yellow-400/80 ring-1 ring-yellow-400/50 bg-gradient-to-b from-[#2e120a] to-[#180a05] hover:border-yellow-300'
                      : tile.type === 'chance'
                        ? 'border-amber-500/60 bg-gradient-to-b from-[#2e1908] to-[#1a0f05] hover:border-yellow-400'
                        : tile.type === 'fate'
                          ? 'border-purple-600/60 bg-gradient-to-b from-[#211129] to-[#120917] hover:border-purple-400'
                          : tile.type === 'supply'
                            ? 'border-cyan-600/60 bg-gradient-to-b from-[#0e222d] to-[#08131a] hover:border-cyan-400'
                            : 'border-amber-900/50 bg-[#160d07]/90 hover:bg-[#24150b] hover:border-amber-600/70'
                }`}
              >
                {/* Tile Header Bar */}
                <div className="flex items-center justify-between gap-0.5 z-10 leading-none">
                  <span className={`text-[7px] sm:text-[9px] font-mono font-bold px-1 py-0.2 rounded shrink-0 ${
                    isCorner ? 'bg-amber-600 text-stone-950' : 'bg-black/60 text-amber-300'
                  }`}>
                    #{tile.id + 1}
                  </span>

                  {/* PROMINENT PLANTED VIETNAMESE FLAG BADGE */}
                  {isClaimed && isLandmark ? (
                    <div className="flex items-center space-x-1 px-1 sm:px-1.5 py-0.5 rounded-full bg-gradient-to-r from-red-600 to-red-700 border border-yellow-300 text-yellow-200 shadow-sm animate-pulse">
                      <VietnamFlagIcon className="w-2.5 h-1.5 sm:w-3 sm:h-2" />
                      <span className="text-[6px] sm:text-[8px] font-black font-sans uppercase tracking-tighter">ĐÃ CẮM CỜ</span>
                    </div>
                  ) : isLandmark ? (
                    <span className="text-[6px] sm:text-[8px] font-bold text-stone-400 font-serif whitespace-nowrap">Chưa cắm</span>
                  ) : null}

                  {tile.type === 'chance' && (
                    <span className="text-[8px] sm:text-[9px] text-yellow-300 whitespace-nowrap">🎁 Cơ hội</span>
                  )}
                  {tile.type === 'fate' && (
                    <span className="text-[8px] sm:text-[9px] text-purple-300 whitespace-nowrap">⚡ Vận mệnh</span>
                  )}
                  {tile.type === 'supply' && (
                    <span className="text-[8px] sm:text-[9px] text-cyan-300 whitespace-nowrap">⚓ Tiếp tế</span>
                  )}
                </div>

                {/* Tile Main Content: Historical Vintage Photo */}
                <div className="my-auto text-center px-0.5 space-y-0.5">
                  {tile.imageUrl ? (
                    <div className="w-full aspect-[16/10] max-h-7 xs:max-h-8 sm:max-h-11 md:max-h-13 rounded sm:rounded-md overflow-hidden border border-amber-900/60 mx-auto relative bg-black shadow-inner">
                      <img 
                        src={tile.imageUrl} 
                        alt={tile.title} 
                        className="w-full h-full object-cover filter contrast-105"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/images/gallery/ben-nha-rong.jpg";
                        }}
                      />
                      {/* Crisp Vietnam Flag Pin on Image when claimed */}
                      {isClaimed && (
                        <div className="absolute top-0.5 right-0.5 z-10 flex items-center space-x-0.5 px-1 py-0.5 rounded bg-black/85 backdrop-blur-[1px] border border-yellow-400 shadow">
                          <VietnamFlagIcon className="w-3 h-2" />
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="w-5 h-5 sm:w-7 sm:h-7 mx-auto rounded-full bg-black/40 border border-amber-500/40 flex items-center justify-center text-amber-300">
                      {tile.type === 'chance' && <Gift className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-yellow-300" />}
                      {tile.type === 'fate' && <Compass className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-purple-300" />}
                      {tile.type === 'supply' && <Anchor className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-cyan-300" />}
                    </div>
                  )}

                  <h5 className="font-bold text-[7px] sm:text-[8.5px] md:text-[10px] text-amber-100 font-serif leading-tight line-clamp-2 break-words">
                    {tile.title}
                  </h5>
                  <p className="text-[6px] sm:text-[7.5px] text-stone-400 font-serif leading-none line-clamp-1 block">
                    {tile.subtitle || tile.country}
                  </p>
                </div>

                {/* ================= 3D CHARACTER TOKEN: BÁC HỒ (BUSINESS TOUR FIGURINE) ================= */}
                {isCurrentPos && (
                  <div className="absolute inset-0 z-30 flex flex-col items-center justify-end pb-0.5 sm:pb-1 pointer-events-none">
                    <div className={`relative flex flex-col items-center transition-all duration-300 ${
                      isMoving ? 'scale-125 -translate-y-2.5 sm:-translate-y-4 drop-shadow-[0_16px_16px_rgba(0,0,0,0.85)]' : 'scale-105 -translate-y-0.5 sm:-translate-y-1'
                    }`}>
                      {/* Name Tag Badge */}
                      <div className="px-1.5 py-0.2 rounded-full bg-gradient-to-r from-red-700 via-amber-600 to-red-700 text-yellow-200 border border-yellow-300 text-[6px] sm:text-[8px] font-black uppercase tracking-wider shadow mb-0.5 flex items-center space-x-0.5 animate-pulse shrink-0">
                        <span className="text-yellow-300 text-[6px]">★</span>
                        <span>BÁC HỒ</span>
                        <span className="text-yellow-300 text-[6px]">★</span>
                      </div>

                      {/* 3D Figurine Pawn from Business Tour */}
                      <div className="relative h-11 xs:h-13 sm:h-16 md:h-18 flex items-end justify-center filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]">
                        <img 
                          src="/images/bac-ho-character.png" 
                          alt="Nhân vật Bác Hồ" 
                          className="h-full w-auto object-contain object-bottom pointer-events-none drop-shadow-[0_0_6px_rgba(251,191,36,0.7)]"
                        />
                      </div>

                      {/* Base spotlight glow */}
                      <div className="w-6 sm:w-10 h-1.5 sm:h-2 rounded-full bg-yellow-400/90 blur-[2px] -mt-0.5 animate-pulse" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* ================= CENTER ARENA: DICE & CHARACTER SHOWCASE ================= */}
          <div className="col-start-2 col-end-5 row-start-2 row-end-5 rounded-xl sm:rounded-2xl bg-gradient-to-b from-[#180e07]/95 via-[#120a05]/95 to-[#0a0503]/95 border border-amber-600/40 shadow-inner p-1.5 sm:p-3 flex flex-col justify-between items-center text-center relative overflow-hidden">
            
            {/* Center Background Compass Rose graphic */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
              <Compass className="w-64 h-64 text-amber-400" />
            </div>

            {/* Top of Center: Character Showcase (Bác Hồ) */}
            <div className="w-full max-w-sm flex items-center justify-between gap-1.5 px-2 py-1 rounded-xl bg-gradient-to-r from-stone-950/90 via-amber-950/80 to-stone-950/90 border border-amber-500/60 shadow">
              <div className="flex items-center space-x-1.5 min-w-0">
                <div className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full p-0.5 bg-gradient-to-br from-yellow-300 via-amber-400 to-yellow-600 shadow shrink-0 overflow-hidden">
                  <img 
                    src="/images/bac-ho-character.png" 
                    alt="Bác Hồ" 
                    className="w-full h-full object-contain object-top scale-125"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-red-600 border border-yellow-300 flex items-center justify-center text-[6px] text-yellow-300 font-bold z-10">
                    ★
                  </span>
                </div>
                <div className="text-left min-w-0">
                  <div className="flex items-center space-x-1">
                    <span className="text-[7px] sm:text-[8px] uppercase font-bold text-amber-400 tracking-wider">Hải Trình</span>
                    <span className="text-[7px] px-1 py-0.2 rounded-full bg-red-900 text-yellow-300 font-bold border border-yellow-400/50">Hoa Tiêu</span>
                  </div>
                  <h4 className="text-[10px] sm:text-xs font-bold text-yellow-100 font-serif leading-tight whitespace-nowrap">Chủ tịch Hồ Chí Minh</h4>
                </div>
              </div>

              {/* Current tile status */}
              <div className="text-right shrink-0">
                <div className="text-[7px] sm:text-[8px] text-stone-400 font-serif">Đang dừng:</div>
                <div className="text-[9px] sm:text-[10px] font-bold text-yellow-400 font-serif leading-tight">
                  {currentTile.title}
                </div>
              </div>
            </div>

            {/* Middle of Center: Smooth 3D Animated Dice */}
            <div className="my-auto py-1 flex flex-col items-center justify-center space-y-1">
              <div 
                className={`relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-xl sm:rounded-2xl bg-gradient-to-br from-red-600 via-red-700 to-rose-900 border border-yellow-300 shadow-[0_6px_20px_rgba(220,38,38,0.6)] flex items-center justify-center select-none transition-transform duration-100 ${
                  isRolling ? 'scale-110 shadow-[0_0_25px_rgba(251,191,36,0.9)]' : 'hover:scale-105'
                }`}
                style={{
                  transform: `rotateX(${diceTransform.rotateX}deg) rotateY(${diceTransform.rotateY}deg) scale(${diceTransform.scale})`,
                  transformStyle: 'preserve-3d'
                }}
              >
                {/* 3D Dice Pips (Exact 1 to 6 golden stars matching the roll) */}
                {renderDicePips(diceValue)}
              </div>

              <div className="text-[9px] sm:text-[11px] text-amber-200/90 font-serif leading-none flex items-center justify-center">
                {isRolling ? (
                  <span>Đang lắc xúc xắc...</span>
                ) : isMoving ? (
                  <span>Bác Hồ đang di chuyển...</span>
                ) : isWaitingChallenge ? (
                  <span className="text-yellow-300 font-bold">Đã đến nơi! Chuẩn bị mở câu hỏi...</span>
                ) : (
                  <span>
                    Kết quả: <strong className="text-yellow-300 font-mono text-xs sm:text-sm font-bold">{diceValue} nút</strong> ({diceValue} bước)
                  </span>
                )}
              </div>
            </div>

            {/* Bottom of Center: BIG ROLL DICE BUTTON */}
            <div className="w-full max-w-xs space-y-1">
              <button
                disabled={isRolling || isMoving || isWaitingChallenge || Boolean(activeChallengeTile)}
                onClick={handleRollDice}
                className={`w-full py-2 sm:py-2.5 px-4 rounded-xl font-black text-[11px] sm:text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center space-x-1.5 shadow-lg ${
                  isRolling || isMoving || isWaitingChallenge
                    ? 'bg-stone-800 text-stone-500 border border-stone-700 cursor-not-allowed'
                    : 'bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-stone-950 border border-yellow-200 shadow-amber-900/50 hover:scale-105 active:scale-95'
                }`}
              >
                <Dices className={`w-4 h-4 text-stone-950 ${isRolling ? 'animate-spin' : ''}`} />
                <span>{isRolling ? "ĐANG LẮC..." : isMoving ? "TIẾN BƯỚC..." : isWaitingChallenge ? "CHUẨN BỊ..." : "LẮC XÚC XẮC"}</span>
              </button>

              <div className="text-[8px] sm:text-[9px] text-stone-400 font-serif leading-tight text-center">
                Lắc xúc xắc để cắm đủ 11 lá cờ Tổ quốc
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* ================= MODAL: LANDMARK CHALLENGE QUESTION ================= */}
      {activeChallengeTile && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
          <div className="duocsang-card max-w-xl w-full rounded-3xl p-5 sm:p-8 border-2 border-amber-500/80 shadow-2xl relative space-y-5 max-h-[92vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-amber-900/60 pb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-amber-600 border border-yellow-400 flex items-center justify-center text-yellow-300 shadow">
                  <Flag className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <span className="text-[10px] text-amber-400 uppercase font-black tracking-wider block">
                    THỬ THÁCH CẮM CỜ TỔ QUỐC (MỐC #{activeChallengeTile.stopId}/11)
                  </span>
                  <h4 className="text-sm sm:text-base font-serif font-bold text-amber-100">
                    {activeChallengeTile.title} ({activeChallengeTile.country})
                  </h4>
                </div>
              </div>

              {/* Re-read question & Close */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => speakVietnameseVoice(activeChallengeTile.question)}
                  className="px-2.5 py-1.5 rounded-xl bg-amber-950/80 hover:bg-amber-900 border border-amber-500/50 text-yellow-300 hover:text-white transition-all flex items-center space-x-1.5 text-xs shadow-sm hover:scale-105"
                  title="Nghe lại câu hỏi"
                >
                  <Volume2 className="w-3.5 h-3.5 text-yellow-400" />
                  <span className="font-serif">Đọc lại</span>
                </button>

                <button
                  onClick={handleCloseChallengeModal}
                  className="text-stone-400 hover:text-white p-1 rounded-lg hover:bg-stone-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Milestone Narrative & Photo */}
            <div className="p-3.5 rounded-2xl bg-stone-900/80 border border-amber-900/50 flex flex-col sm:flex-row items-center gap-3.5">
              {activeChallengeTile.imageUrl && (
                <div className="w-full sm:w-44 aspect-[4/3] rounded-xl overflow-hidden border border-amber-500/40 shrink-0 bg-black flex items-center justify-center shadow-md">
                  <img 
                    src={activeChallengeTile.imageUrl} 
                    alt={activeChallengeTile.title} 
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/images/gallery/ben-nha-rong.jpg";
                    }}
                  />
                </div>
              )}
              <div className="space-y-1 text-left flex-grow">
                <div className="text-xs text-yellow-400 font-bold font-serif">{activeChallengeTile.roleTitle}</div>
                <p className="text-xs text-stone-300 font-serif leading-relaxed line-clamp-3">
                  {activeChallengeTile.narrative}
                </p>
                {activeChallengeTile.quote && (
                  <p className="text-[11px] text-amber-200/90 font-serif italic border-l-2 border-amber-500 pl-2 mt-1">
                    {activeChallengeTile.quote}
                  </p>
                )}
              </div>
            </div>

            {/* Question Text */}
            <div className="space-y-2">
              <div className="flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-amber-400">
                <HelpCircle className="w-4 h-4 text-yellow-400" />
                <span>Câu Hỏi Trắc Nghiệm Mở Khóa Cắm Cờ:</span>
              </div>
              <p className="text-sm sm:text-base text-amber-50 font-serif font-semibold leading-relaxed">
                {activeChallengeTile.question}
              </p>
            </div>

            {/* Shuffled Options */}
            <div className="space-y-2.5 pt-1">
              {activeChallengeTile.options.map((option, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === activeChallengeTile.correctIndex;
                let btnStyle = "bg-stone-900/90 hover:bg-stone-800 border-stone-800 text-stone-200";

                if (isAnswerChecked) {
                  if (isCorrect) {
                    btnStyle = "bg-emerald-950 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500/50";
                  } else if (isSelected && !isCorrect) {
                    btnStyle = "bg-rose-950 border-rose-500 text-rose-200";
                  } else {
                    btnStyle = "bg-stone-900/40 border-stone-800 text-stone-500 opacity-60";
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswerChecked}
                    onClick={() => handleAnswerSubmit(idx)}
                    className={`w-full p-3.5 sm:p-4 rounded-2xl border text-left text-xs sm:text-sm font-sans flex items-start space-x-3 transition-all ${btnStyle}`}
                  >
                    <span className="w-6 h-6 rounded-lg bg-black/40 border border-amber-600/40 flex items-center justify-center text-xs font-bold text-amber-300 flex-shrink-0 mt-0.5">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="flex-grow font-serif leading-snug">{option}</span>
                    {isAnswerChecked && isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    )}
                    {isAnswerChecked && isSelected && !isCorrect && (
                      <X className="w-5 h-5 text-rose-400 flex-shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Answer Result & Explanation */}
            {isAnswerChecked && (
              <div className="space-y-3 pt-2 animate-fadeIn">
                <div className={`p-4 rounded-2xl border ${
                  isAnswerCorrect 
                    ? 'bg-emerald-950/70 border-emerald-600/60 text-emerald-200' 
                    : 'bg-rose-950/70 border-rose-600/60 text-rose-200'
                }`}>
                  <div className="font-bold text-xs uppercase flex items-center space-x-1.5 mb-1">
                    {isAnswerCorrect ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>CHÍNH XÁC! ĐÃ CẮM CỜ VIỆT NAM THÀNH CÔNG (+350 HẢI LÝ)</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-4 h-4 text-rose-400" />
                        <span>CHƯA CHÍNH XÁC RỒI! HÃY THỬ LẠI Ở VÒNG SAU</span>
                      </>
                    )}
                  </div>
                  <p className="text-xs font-serif leading-relaxed text-stone-200">
                    {activeChallengeTile.explanation}
                  </p>
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    onClick={handleCloseChallengeModal}
                    className="px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-600 to-yellow-500 text-stone-950 font-bold text-xs tracking-wider uppercase shadow-md hover:scale-105 transition-all"
                  >
                    TIẾP TỤC ĐỔ XÚC XẮC
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* ================= MODAL: CHANCE / FATE CARD ================= */}
      {chanceModalInfo && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="duocsang-card max-w-md w-full rounded-3xl p-6 sm:p-7 border-2 border-yellow-400 shadow-2xl space-y-4 text-center">
            
            <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-amber-500 to-yellow-400 border border-yellow-200 flex items-center justify-center text-stone-950 shadow-lg animate-bounce">
              {chanceModalInfo.icon === 'gift' && <Gift className="w-7 h-7 text-stone-950" />}
              {chanceModalInfo.icon === 'compass' && <Compass className="w-7 h-7 text-stone-950" />}
              {chanceModalInfo.icon === 'anchor' && <Anchor className="w-7 h-7 text-stone-950" />}
            </div>

            <div className="space-y-1">
              <span className="text-[10px] text-amber-400 uppercase font-black tracking-wider block">
                {chanceModalInfo.subtitle}
              </span>
              <h4 className="text-lg font-serif font-bold text-yellow-300">
                {chanceModalInfo.title}
              </h4>
            </div>

            <div className="p-4 rounded-2xl bg-black/60 border border-amber-600/40 text-xs sm:text-sm font-serif text-stone-200 leading-relaxed">
              {chanceModalInfo.text}
            </div>

            {chanceModalInfo.bonusMiles > 0 && (
              <div className="text-xs font-bold text-cyan-300 font-mono">
                ✨ Thưởng hải lý: +{chanceModalInfo.bonusMiles} hl
              </div>
            )}

            <div className="pt-2">
              <button
                onClick={handleCloseChanceModal}
                className="w-full py-3 rounded-full bg-gradient-to-r from-amber-600 to-yellow-500 text-stone-950 font-bold text-xs uppercase tracking-wider shadow-md hover:scale-105 transition-all"
              >
                NHẬN THƯỞNG & ĐI TIẾP
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ================= MODAL: GRAND FINALE (ALL 11 FLAGS PLANTED) ================= */}
      {isGrandFinale && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="duocsang-card max-w-xl w-full rounded-3xl p-6 sm:p-8 border-2 border-yellow-400 shadow-2xl text-center space-y-5">
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-yellow-400/30 to-amber-600/30 border-2 border-yellow-400 flex items-center justify-center text-yellow-300 animate-bounce">
              <Trophy className="w-10 h-10" />
            </div>

            <div className="space-y-1.5">
              <span className="text-xs uppercase tracking-widest text-yellow-400 font-bold">
                ĐẠI THẮNG TOÀN DIỆN HẢI TRÌNH 30 NĂM
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-amber-100">
                Đã Cắm Đủ 11 Lá Cờ Tổ Quốc Việt Nam!
              </h3>
            </div>

            <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-700/50 text-xs sm:text-sm text-stone-200 font-serif leading-relaxed space-y-2.5">
              <p>
                Chúc mừng bạn đã hoàn thành xuất sắc toàn bộ hành trình lịch sử! Từ bến cảng Nhà Rồng năm 1911 đến mốc 108 Pác Bó năm 1941, mỗi lá cờ Tổ quốc được cắm xuống là một dấu ấn di sản thiêng liêng trên con đường giải phóng dân tộc của Chủ tịch Hồ Chí Minh.
              </p>
              <div className="flex justify-center items-center space-x-4 pt-2 font-mono text-xs">
                <span className="text-yellow-300 font-bold flex items-center space-x-1.5">
                  <VietnamFlagIcon className="w-4 h-3 rounded-[2px]" />
                  <span>Hoàn thành: 11 / 11 Cờ Tổ Quốc</span>
                </span>
                <span className="text-cyan-300 font-bold">⚓ Tổng: {totalNauticalMiles.toLocaleString()} hải lý</span>
              </div>
            </div>

            <div className="flex justify-center space-x-3 pt-2">
              <button
                onClick={handleRestartGame}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-amber-600 to-yellow-500 text-stone-950 font-bold text-xs uppercase tracking-wider shadow-lg hover:scale-105 transition-all flex items-center space-x-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>CHƠI LẠI VÒNG MỚI</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
