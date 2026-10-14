import React, { useState, useEffect } from 'react';
import { 
  Sparkles, Award, RotateCcw, HelpCircle, CheckCircle2, 
  XCircle, Zap, Eye, ChevronRight, Trophy, Star, 
  Lightbulb, Volume2, VolumeX, Flame, Flag, Check, X,
  Maximize2, ArrowRight, Compass, ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFX, speakVietnameseVoice, stopVietnameseVoice } from '../utils/gameAudio';

// ================= QUESTION & DATA BANK FOR 6 HISTORICAL PUZZLES =================
export const PUZZLE_LEVELS = [
  {
    id: 1,
    title: "Bác Hồ đọc Tuyên ngôn Độc lập tại Quảng trường Ba Đình",
    year: "02/09/1945",
    location: "Quảng trường Ba Đình, Hà Nội",
    imageUrl: "/images/gallery/tuyen-ngon-doc-lap.jpg",
    period: "Khai sinh nước Việt Nam mới",
    secretAliases: [
      "tuyen ngon doc lap", "tuyên ngôn độc lập", "tuyen ngon",
      "ba dinh", "quang truong ba dinh", "quảng trường ba đình",
      "bac ho doc tuyen ngon", "doc lap", "2/9/1945", "ngay 2 thang 9"
    ],
    hint: "Sự kiện mùa thu năm 1945 khai sinh ra nước Việt Nam Dân chủ Cộng hòa.",
    historicalSignificance: "Bản Tuyên ngôn Độc lập do Chủ tịch Hồ Chí Minh đọc tại Quảng trường Ba Đình ngày 2/9/1945 là áng văn lập quốc vĩ đại, khẳng định quyền độc lập, tự do thiêng liêng của dân tộc Việt Nam trước toàn thế giới.",
    famousQuote: "“Nước Việt Nam có quyền hưởng tự do và độc lập, và sự thật đã thành một nước tự do, độc lập!”",
    tiles: [
      {
        id: 1,
        name: "Lá cờ số 1 (Góc trên bên trái)",
        behindDescription: "Khoảng trời mùa thu lịch sử và cờ đỏ sao vàng tung bay trên lễ đài Ba Đình.",
        question: "Bản Tuyên ngôn Độc lập được Chủ tịch Hồ Chí Minh soạn thảo tại ngôi nhà nào?",
        options: [
          "Số 48 phố Hàng Ngang, Hà Nội",
          "Số 9 ngõ Compoint, Paris",
          "Lán Nà Nưa, Tân Trào",
          "Số 11 phố Hàng Thiếc, Hà Nội"
        ],
        correctIndex: 0,
        explanation: "Tại tầng 2 ngôi nhà số 48 phố Hàng Ngang của gia đình nhà tư sản yêu nước Trịnh Văn Bô, Bác Hồ đã khởi thảo bản Tuyên ngôn Độc lập bất hủ."
      },
      {
        id: 2,
        name: "Lá cờ số 2 (Khu vực trung tâm phía trên)",
        behindDescription: "Chân dung Bác Hồ giản dị trong bộ quần áo kaki sáng màu trước hệ thống micro phát thanh.",
        question: "Trước khi đọc tiếp bản Tuyên ngôn, Bác Hồ đã dừng lại hỏi câu nói nổi tiếng nào với đồng bào?",
        options: [
          "“Tôi nói đồng bào nghe rõ không?”",
          "“Đồng bào có khỏe không?”",
          "“Đồng bào đã sẵn sàng chưa?”",
          "“Nước ta đã độc lập chưa?”"
        ],
        correctIndex: 0,
        explanation: "Câu hỏi ấm áp 'Tôi nói đồng bào nghe rõ không?' của Bác đã xóa tan mọi khoảng cách, gắn kết trái tim của vị Chủ tịch với hàng chục vạn đồng bào."
      },
      {
        id: 3,
        name: "Lá cờ số 3 (Góc trên bên phải)",
        behindDescription: "Bục lễ đài danh dự cùng các thành viên trong Chính phủ Lâm thời nước Việt Nam Dân chủ Cộng hòa.",
        question: "Mở đầu bản Tuyên ngôn Độc lập, Bác Hồ đã trích dẫn bản Tuyên ngôn bất hủ của những quốc gia nào?",
        options: [
          "Tuyên ngôn Độc lập của Mỹ (1776) và Tuyên ngôn Nhân quyền của Pháp (1791)",
          "Tuyên ngôn Đảng Cộng sản của Các Mác và Ăng-ghen",
          "Tuyên ngôn Cách mạng Tháng Mười Nga (1917)",
          "Hiến chương Liên Hợp Quốc (1945)"
        ],
        correctIndex: 0,
        explanation: "Bác đã khéo léo trích dẫn Tuyên ngôn Độc lập năm 1776 của nước Mỹ và Tuyên ngôn Nhân quyền & Dân quyền năm 1791 của Pháp để khẳng định quyền tự do bình đẳng thiêng liêng của mọi dân tộc."
      },
      {
        id: 4,
        name: "Lá cờ số 4 (Góc dưới bên trái)",
        behindDescription: "Đội danh dự giải phóng quân bồng súng trang nghiêm bảo vệ chân bục lễ đài.",
        question: "Ngày Quốc khánh đầu tiên 02/09/1945 diễn ra vào thứ mấy trong tuần?",
        options: [
          "Chủ Nhật",
          "Thứ Bảy",
          "Thứ Hai",
          "Thứ Sáu"
        ],
        correctIndex: 0,
        explanation: "Ngày 02/09/1945 là một ngày Chủ Nhật rực rỡ nắng vàng mùa thu, hàng chục vạn nhân dân Hà Nội và các vùng lân cận đã đổ về Ba Đình lịch sử."
      },
      {
        id: 5,
        name: "Lá cờ số 5 (Khu vực trung tâm phía dưới)",
        behindDescription: "Biển người đồng bào đủ mọi tầng lớp công, nông, trí thức, thanh niên vẫy cờ hoa rợp trời.",
        question: "Tên gọi chính thức của nước ta sau khi Bác đọc bản Tuyên ngôn Độc lập là gì?",
        options: [
          "Việt Nam Dân chủ Cộng hòa",
          "Cộng hòa Xã hội Chủ nghĩa Việt Nam",
          "Việt Nam Độc lập Đồng minh",
          "Việt Nam Dân quốc"
        ],
        correctIndex: 0,
        explanation: "Bản Tuyên ngôn khai sinh ra nước Việt Nam Dân chủ Cộng hòa - nhà nước công nông đầu tiên ở Đông Nam Á."
      },
      {
        id: 6,
        name: "Lá cờ số 6 (Góc dưới bên phải)",
        behindDescription: "Lời thề độc lập thiêng liêng vang vọng của toàn thể quốc dân đồng bào quyết giữ vững tự do.",
        question: "Toàn thể dân tộc Việt Nam quyết đem tinh thần và lực lượng nào để giữ vững nền tự do, độc lập?",
        options: [
          "Toàn bộ tinh thần và lực lượng, tính mạng và của cải",
          "Sức mạnh ngoại giao và quân sự",
          "Sự viện trợ của các cường quốc trên thế giới",
          "Lòng quả cảm và truyền thống cha ông"
        ],
        correctIndex: 0,
        explanation: "Kết thúc bản Tuyên ngôn: 'Nước Việt Nam quyết đem tất cả tinh thần và lực lượng, tính mạng và của cải để giữ vững quyền tự do, độc lập ấy!'"
      }
    ]
  },
  {
    id: 2,
    title: "Bến Nhà Rồng - Nơi Bác Hồ ra đi tìm đường cứu nước",
    year: "05/06/1911",
    location: "Bến cảng Sài Gòn (Bến Nhà Rồng)",
    imageUrl: "/images/gallery/ben-nha-rong.jpg",
    period: "Thời kỳ tìm đường cứu nước",
    secretAliases: [
      "ben nha rong", "bến nhà rồng", "nha rong",
      "ra di tim duong cuu nuoc", "tau latouche treville", "van ba",
      "nguyen tat thanh", "cang sai gon", "5/6/1911"
    ],
    hint: "Bến cảng bên dòng sông Sài Gòn nơi Người thanh niên Nguyễn Tất Thành bắt đầu hành trình 30 năm bôn ba.",
    historicalSignificance: "Ngày 5/6/1911, từ Bến Nhà Rồng, người thanh niên yêu nước Nguyễn Tất Thành với tên gọi Văn Ba đã rời quê hương trên con tàu buôn Amiral Latouche-Tréville, mở ra bước ngoặt vĩ đại cho lịch sử giải phóng dân tộc.",
    famousQuote: "“Tôi muốn đi ra ngoài, xem nước Pháp và các nước khác. Sau khi xem xét họ làm như thế nào, tôi sẽ trở về giúp đồng bào chúng ta.”",
    tiles: [
      {
        id: 1,
        name: "Lá cờ số 1 (Góc trên bên trái)",
        behindDescription: "Kiến trúc đặc trưng hình hai con rồng châu ngọc trên nóc tòa nhà trụ sở hãng vận tải Messageries Maritimes.",
        question: "Bến Nhà Rồng ban đầu vốn là trụ sở của hãng tàu buôn nào?",
        options: [
          "Hãng Vận tải đường biển Messageries Maritimes (Pháp)",
          "Hãng Tàu buôn Hoàng gia Anh (P&O)",
          "Hãng Thương thuyền Đông Dương",
          "Hãng Vận tải Viễn Đông Denis Frères"
        ],
        correctIndex: 0,
        explanation: "Tòa nhà Bến Nhà Rồng được xây dựng năm 1863 làm trụ sở cho hãng vận tải đường biển Messageries Maritimes của Pháp."
      },
      {
        id: 2,
        name: "Lá cờ số 2 (Khu vực trung tâm phía trên)",
        behindDescription: "Khoảng trời bến cảng và bầu không khí sầm uất của thương cảng Sài Gòn đầu thế kỷ XX.",
        question: "Người thanh niên Nguyễn Tất Thành lấy tên là gì khi xin làm việc trên con tàu vượt đại dương?",
        options: [
          "Văn Ba",
          "Nguyễn Ái Quốc",
          "Thầu Chín",
          "Lý Thụy"
        ],
        correctIndex: 0,
        explanation: "Người đã nhận tên gọi mộc mạc 'Văn Ba' và bắt đầu làm công việc phụ bếp đầy vất vả trên con tàu viễn dương."
      },
      {
        id: 3,
        name: "Lá cờ số 3 (Góc trên bên phải)",
        behindDescription: "Mặt nước dòng sông Sài Gòn nơi con tàu Amiral Latouche-Tréville từng neo đậu kéo còi nhổ neo.",
        question: "Tên của con tàu buôn nước Pháp đã đưa người thanh niên Văn Ba rời Tổ quốc là gì?",
        options: [
          "Amiral Latouche-Tréville",
          "Le Dumont d'Urville",
          "SS Pellerin de Latouche",
          "La Marseillaise"
        ],
        correctIndex: 0,
        explanation: "Tàu Đô đốc Amiral Latouche-Tréville là con tàu buôn chạy bằng hơi nước đã đưa Người bắt đầu chuyến hải trình vạn dặm."
      },
      {
        id: 4,
        name: "Lá cờ số 4 (Góc dưới bên trái)",
        behindDescription: "Cột cờ Thủ Ngữ và bến đỗ thuyền bè tấp nập tại ngã ba kênh Tàu Hủ và sông Sài Gòn.",
        question: "Trước khi vào Sài Gòn ra đi tìm đường cứu nước, Bác Hồ từng dạy học tại ngôi trường nào ở Phan Thiết?",
        options: [
          "Trường Dục Thanh",
          "Trường Quốc học Huế",
          "Trường Tiểu học Pháp - Việt Đông Ba",
          "Trường Huỳnh Khương Ninh"
        ],
        correctIndex: 0,
        explanation: "Từ tháng 9/1910 đến tháng 2/1911, thầy giáo Nguyễn Tất Thành dạy học tại trường Dục Thanh (Phan Thiết, Bình Thuận)."
      },
      {
        id: 5,
        name: "Lá cờ số 5 (Khu vực trung tâm phía dưới)",
        behindDescription: "Kè đá hoa cương cổ kính bao quanh bến cảng nơi lưu dấu bước chân lịch sử của Người thanh niên yêu nước.",
        question: "Khi được hỏi lấy tiền đâu để sang phương Tây, Bác Hồ đã giơ hai bàn tay và nói điều gì?",
        options: [
          "“Đây, tiền đây! Chúng ta sẽ làm bất cứ việc gì để sống và để đi.”",
          "“Chúng ta sẽ quyên góp từ kiều bào yêu nước.”",
          "“Ý chí sẽ giúp chúng ta vượt qua mọi gian khổ.”",
          "“Tôi đã chuẩn bị đủ lộ phí cho chuyến đi dài.”"
        ],
        correctIndex: 0,
        explanation: "Bác xòe đôi bàn tay ra và nói với người bạn Tư Lê: 'Đây, tiền đây! Chúng ta sẽ làm việc, chúng ta sẽ làm bất cứ việc gì để sống và để đi!'"
      },
      {
        id: 6,
        name: "Lá cờ số 6 (Góc dưới bên phải)",
        behindDescription: "Tấm bia lưu niệm và bảo tàng Hồ Chí Minh - Chi nhánh TP. Hồ Chí Minh ngày nay.",
        question: "Hành trình bôn ba tìm đường cứu nước của Chủ tịch Hồ Chí Minh kéo dài bao nhiêu năm?",
        options: [
          "30 năm (1911 - 1941)",
          "20 năm (1911 - 1931)",
          "25 năm (1911 - 1936)",
          "35 năm (1911 - 1946)"
        ],
        correctIndex: 0,
        explanation: "Người đã bôn ba qua 3 đại dương, 4 châu lục suốt đúng 30 năm (1911 - 1941) trước khi trở về lãnh đạo cách mạng nước nhà."
      }
    ]
  },
  {
    id: 3,
    title: "Bác Hồ tại Chiến dịch Biên giới Thu - Đông 1950",
    year: "Thu - Đông 1950",
    location: "Đỉnh núi Báo Đông, Cao Bằng",
    imageUrl: "/images/gallery/chien-dich-bien-gioi.jpg",
    period: "Kháng chiến chống thực dân Pháp",
    secretAliases: [
      "chien dich bien gioi", "chiến dịch biên giới", "nui bao dong",
      "núi báo đông", "bac ho quan sat mat tran", "dong khe",
      "đông khê", "bien gioi 1950", "bien gioi thu dong"
    ],
    hint: "Bức ảnh bất hủ của nghệ sĩ Vũ Năng An ghi lại hình ảnh Bác Hồ chống gậy quan sát trận địa Đông Khê trên đỉnh núi cao.",
    historicalSignificance: "Chiến dịch Biên giới Thu - Đông 1950 là chiến dịch đầu tiên quân đội ta chủ động mở cuộc tiến công lớn, đập tan tuyến phòng thủ của thực dân Pháp dọc biên giới Việt - Trung, khai thông con đường liên lạc với quốc tế.",
    famousQuote: "“Chống gậy lên non xem trận địa / Vạn trùng núi đón ngọn mây bồng / Quân ta khí mạnh nuốt ngưu đẩu / Thề diệt xâm lăng giữ núi sông.”",
    tiles: [
      {
        id: 1,
        name: "Lá cờ số 1 (Góc trên bên trái)",
        behindDescription: "Bầu trời biên cương và dãy núi đá vôi trập trùng bao bọc thung lũng Đông Khê.",
        question: "Tác giả bức ảnh lịch sử nổi tiếng 'Bác Hồ trên đỉnh núi Báo Đông' là ai?",
        options: [
          "Nghệ sĩ nhiếp ảnh Vũ Năng An",
          "Nhiếp ảnh gia Đinh Đăng Định",
          "Nhiếp ảnh gia Nguyễn Bá Khoản",
          "Nhiếp ảnh gia Triệu Đại"
        ],
        correctIndex: 0,
        explanation: "Bức ảnh do nghệ sĩ nhiếp ảnh Vũ Năng An chụp sáng sớm ngày 16/9/1950 khi Bác trực tiếp lên đài quan sát trận đánh cứ điểm Đông Khê."
      },
      {
        id: 2,
        name: "Lá cờ số 2 (Khu vực trung tâm phía trên)",
        behindDescription: "Chiếc mũ cối giản dị và ánh mắt kiên định, sâu sắc của Người Cha già dân tộc đang theo dõi diễn biến chiến sự.",
        question: "Cứ điểm mở màn có tính chất quyết định trong Chiến dịch Biên giới 1950 là cứ điểm nào?",
        options: [
          "Cứ điểm Đông Khê",
          "Cứ điểm Thất Khê",
          "Cứ điểm Cao Bằng",
          "Cứ điểm Bản Nùng"
        ],
        correctIndex: 0,
        explanation: "Trận đánh cứ điểm Đông Khê (16-18/9/1950) mở màn chiến dịch đã chia cắt hoàn toàn tuyến phòng thủ đường số 4 của địch."
      },
      {
        id: 3,
        name: "Lá cờ số 3 (Góc trên bên phải)",
        behindDescription: "Ngọn núi mây bồng bềnh và không gian chiến trường hùng vĩ của vùng rừng núi Đông Bắc.",
        question: "Đại tướng nào được Trung ương Đảng và Bác Hồ giao trọng trách Chỉ huy trưởng kiêm Bí thư Đảng ủy Chiến dịch Biên giới?",
        options: [
          "Đại tướng Võ Nguyên Giáp",
          "Đại tướng Nguyễn Chí Thanh",
          "Đại tướng Văn Tiến Dũng",
          "Đại tướng Chu Huy Mân"
        ],
        correctIndex: 0,
        explanation: "Đại tướng Võ Nguyên Giáp được Bác Hồ và Trung ương trực tiếp giao nhiệm vụ chỉ huy chiến dịch quan trọng này."
      },
      {
        id: 4,
        name: "Lá cờ số 4 (Góc dưới bên trái)",
        behindDescription: "Phiến đá hoa rêu phong nơi Bác ngồi chống chiếc gậy mây giản dị trên đỉnh dốc núi.",
        question: "Tấm gương anh hùng đã nhờ đồng đội chặt đứt cánh tay bị thương để tiếp tục xông lên bắn phá lô cốt địch là ai?",
        options: [
          "Anh hùng La Văn Cầu",
          "Anh hùng Cù Chính Lan",
          "Anh hùng Bế Văn Đàn",
          "Anh hùng Phan Đình Giót"
        ],
        correctIndex: 0,
        explanation: "Anh hùng La Văn Cầu trong trận Đông Khê đã nhờ đồng đội chặt đứt cánh tay phải dập nát để ôm bọc phá xông lên phá tan lô cốt đối phương."
      },
      {
        id: 5,
        name: "Lá cờ số 5 (Khu vực trung tâm phía dưới)",
        behindDescription: "Bộ trang phục bộ đội chàm bạc màu cùng đôi dép cao su gắn bó suốt cuộc trường kỳ kháng chiến.",
        question: "Ý nghĩa chiến lược quan trọng nhất sau thắng lợi của Chiến dịch Biên giới 1950 là gì?",
        options: [
          "Khai thông biên giới Việt - Trung, giành quyền chủ động chiến lược trên chiến trường chính Bắc Bộ",
          "Giải phóng hoàn toàn thủ đô Hà Nội",
          "Buộc Pháp phải ký hiệp định đình chiến",
          "Chuyển thủ đô về vùng đồng bằng"
        ],
        correctIndex: 0,
        explanation: "Chiến dịch Biên giới đã khai thông 750km biên giới, phá vỡ thế bao vây cô lập của địch và đưa cuộc kháng chiến sang giai đoạn phản công."
      },
      {
        id: 6,
        name: "Lá cờ số 6 (Góc dưới bên phải)",
        behindDescription: "Đài quan sát thô sơ nơi Bác cùng ban tác chiến họp bàn và chỉ đạo từng mũi tiến công.",
        question: "Bài thơ nổi tiếng Bác Hồ viết khi lên đài quan sát Đông Khê có câu thơ kết là gì?",
        options: [
          "“Thề diệt xâm lăng giữ núi sông.”",
          "“Rực rỡ cờ bay đón ánh hồng.”",
          "“Toàn thắng ngày mai thỏa ước mong.”",
          "“Kháng chiến muôn năm ắt thành công.”"
        ],
        correctIndex: 0,
        explanation: "Bài thơ 'Đăng sơn' (Lên núi): 'Quân ta khí mạnh nuốt ngưu đẩu / Thề diệt xâm lăng giữ núi sông.'"
      }
    ]
  },
  {
    id: 4,
    title: "Hang Pác Bó - Cội nguồn cách mạng khi Bác trở về Tổ quốc",
    year: "Đầu năm 1941",
    location: "Pác Bó, xã Trường Hà, Hà Quảng, Cao Bằng",
    imageUrl: "/images/gallery/pac-bo.jpg",
    period: "Trở về Tổ quốc (1941)",
    secretAliases: [
      "pac bo", "pác bó", "hang pac bo", "hang pác bó",
      "suoi le nin", "suối lê nin", "nui cac mac", "núi các mác",
      "cot moc 108", "cột mốc 108", "cao bang", "cao bằng"
    ],
    hint: "Di tích lịch sử nơi Người trở về Tổ quốc qua cột mốc 108, có bàn đá chông chênh và dòng suối Lê-nin xanh ngọc bích.",
    historicalSignificance: "Ngày 28/1/1941, Bác Hồ vượt qua cột mốc 108 biên giới Việt - Trung về đến Pác Bó. Đây là mốc son chấm dứt 30 năm xa quê hương, trực tiếp lãnh đạo phong trào cách mạng dẫn tới Tổng khởi nghĩa Cách mạng Tháng Tám 1945.",
    famousQuote: "“Bác đã về đây, Tổ quốc ơi! / Nhớ thương hòn đất ấm hơi Người / Ba mươi năm ấy, chân không nghỉ / Mà đến bây giờ mới tới nơi!” (Tố Hữu)",
    tiles: [
      {
        id: 1,
        name: "Lá cờ số 1 (Góc trên bên trái)",
        behindDescription: "Vách đá vôi rêu phong và cửa hang Pác Bó ẩn mình giữa đại ngàn rừng già Cao Bằng.",
        question: "Cột mốc biên giới lịch sử nơi Bác Hồ đặt bước chân đầu tiên trở về đất mẹ là cột mốc số mấy?",
        options: [
          "Cột mốc 108",
          "Cột mốc 100",
          "Cột mốc 115",
          "Cột mốc 92"
        ],
        correctIndex: 0,
        explanation: "Sáng ngày 28/01/1941 (mùng 2 Tết Tân Tỵ), Người đã vượt qua cột mốc 108 biên giới Việt - Trung để trở về Tổ quốc."
      },
      {
        id: 2,
        name: "Lá cờ số 2 (Khu vực trung tâm phía trên)",
        behindDescription: "Ngọn núi Các Mác sừng sững uy nghiêm soi bóng xuống làn nước biếc trong veo.",
        question: "Bác Hồ đã đặt tên cho dòng suối trong vắt và ngọn núi cao trước cửa hang là gì?",
        options: [
          "Suối Lê-nin và Núi Các Mác",
          "Suối Hòa Bình và Núi Tự Do",
          "Suối Độc Lập và Núi Hùng Vương",
          "Suối Giải Phóng và Núi Ba Vì"
        ],
        correctIndex: 0,
        explanation: "Bác đặt tên là Suối Lê-nin và Núi Các Mác nhằm khẳng định ngọn nguồn tư tưởng kim chỉ nam cho con đường cách mạng Việt Nam."
      },
      {
        id: 3,
        name: "Lá cờ số 3 (Góc trên bên phải)",
        behindDescription: "Thảm thực vật nguyên sinh xanh mát che chở cho căn cứ địa cách mạng đầu tiên.",
        question: "Trong tiếng dân tộc Tày - Nùng, tên gọi 'Pác Bó' có nghĩa là gì?",
        options: [
          "Đầu nguồn (Mỏ nước)",
          "Thác nước cao",
          "Hang đá sâu",
          "Rừng thiêng"
        ],
        correctIndex: 0,
        explanation: "Trong tiếng Tày - Nùng, 'Pác Bó' có nghĩa là đầu nguồn hoặc miệng của mỏ nước."
      },
      {
        id: 4,
        name: "Lá cờ số 4 (Góc dưới bên trái)",
        behindDescription: "Chiếc giường nằm đan bằng ván gỗ mộc mạc và bếp lửa sưởi ấm trong lòng hang.",
        question: "Hội nghị Trung ương Đảng lần thứ VIII (5/1941) họp tại lán Khuổi Nặm (Pác Bó) đã quyết định thành lập tổ chức nào?",
        options: [
          "Mặt trận Việt Nam Độc lập Đồng minh (Mặt trận Việt Minh)",
          "Hội Liên hiệp Quốc dân Việt Nam",
          "Đội Việt Nam Tuyên truyền Giải phóng quân",
          "Đội Cứu quốc quân"
        ],
        correctIndex: 0,
        explanation: "Hội nghị TƯ 8 do Bác chủ trì đã quyết định thành lập Mặt trận Việt Minh để tập hợp sức mạnh toàn dân tộc đánh đuổi phát xít Pháp - Nhật."
      },
      {
        id: 5,
        name: "Lá cờ số 5 (Khu vực trung tâm phía dưới)",
        behindDescription: "Chiếc bàn đá tự nhiên chông chênh nơi Bác ngồi dịch lịch sử Đảng Cộng sản Liên Xô.",
        question: "Bài thơ 'Tức cảnh Pác Bó' của Bác có câu mở đầu như thế nào?",
        options: [
          "“Sáng ra bờ suối, tối vào hang”",
          "“Bàn đá chông chênh dịch sử Đảng”",
          "“Cháo bẹ rau măng vẫn sẵn sàng”",
          "“Cuộc đời cách mạng thật là sang”"
        ],
        correctIndex: 0,
        explanation: "Bài thơ mở đầu: 'Sáng ra bờ suối, tối vào hang / Cháo bẹ rau măng vẫn sẵn sàng / Bàn đá chông chênh dịch sử Đảng / Cuộc đời cách mạng thật là sang.'"
      },
      {
        id: 6,
        name: "Lá cờ số 6 (Góc dưới bên phải)",
        behindDescription: "Dòng suối nguồn trong vắt róc rách chảy ra bãi đá cuội ven chân núi.",
        question: "Đội Việt Nam Tuyên truyền Giải phóng quân (tiền thân của Quân đội Nhân dân Việt Nam) được thành lập theo chỉ thị của ai?",
        options: [
          "Chủ tịch Hồ Chí Minh (giao đồng chí Võ Nguyên Giáp phụ trách)",
          "Đồng chí Trường Chinh",
          "Đồng chí Phạm Văn Đồng",
          "Đồng chí Hoàng Văn Thụ"
        ],
        correctIndex: 0,
        explanation: "Tháng 12/1944, Bác Hồ đã ra chỉ thị thành lập Đội VN Tuyên truyền Giải phóng quân tại khu rừng Trần Hưng Đạo (Cao Bằng)."
      }
    ]
  },
  {
    id: 5,
    title: "Nguyễn Ái Quốc tại Đại hội Tours (Cộng hòa Pháp)",
    year: "Tháng 12/1920",
    location: "Thành phố Tours, Cộng hòa Pháp",
    imageUrl: "/images/gallery/dai-hoi-tours.jpg",
    period: "Thời kỳ hoạt động quốc tế tại Pháp",
    secretAliases: [
      "dai hoi tours", "đại hội tours", "tours",
      "dang cong san phap", "nguyen ai quoc tai phap",
      "sang lap dang cong san phap", "quoc te ba", "1920"
    ],
    hint: "Bức ảnh tư liệu lịch sử ghi lại thời khắc người chiến sĩ Nguyễn Ái Quốc bỏ phiếu tán thành gia nhập Quốc tế III và sáng lập Đảng Cộng sản Pháp.",
    historicalSignificance: "Đại hội Tours tháng 12/1920 đánh dấu bước chuyển biến quyết định trong lập trường tư tưởng của Bác: từ người yêu nước tiến bộ trở thành người chiến sĩ cộng sản đầu tiên của dân tộc Việt Nam.",
    famousQuote: "“Luận cương của Lênin làm cho tôi rất cảm động, phấn khởi, sáng tỏ, tin tưởng biết bao! Tôi vui mừng đến phát khóc.”",
    tiles: [
      {
        id: 1,
        name: "Lá cờ số 1 (Góc trên bên trái)",
        behindDescription: "Hội trường Đại hội toàn quốc lần thứ 18 của Đảng Xã hội Pháp tại thành phố Tours.",
        question: "Đồng chí Nguyễn Ái Quốc tham dự Đại hội Tours với tư cách đại biểu của tổ chức nào?",
        options: [
          "Đại biểu duy nhất của các dân tộc thuộc địa Đông Dương",
          "Đại biểu của phong trào sinh viên quốc tế",
          "Đại biểu của Liên minh Lao động Viễn Đông",
          "Đại biểu của Hội những người Việt Nam yêu nước"
        ],
        correctIndex: 0,
        explanation: "Người là đại biểu duy nhất của nhân dân các nước thuộc địa Đông Dương tham dự sự kiện chính trị quan trọng này."
      },
      {
        id: 2,
        name: "Lá cờ số 2 (Khu vực trung tâm phía trên)",
        behindDescription: "Chân dung người thanh niên Nguyễn Ái Quốc đĩnh đạc, tự tin giữa những chính khách Pháp danh tiếng.",
        question: "Tác phẩm lý luận của V.I. Lênin đã chỉ ra con đường cứu nước giải phóng dân tộc cho Người là gì?",
        options: [
          "Sơ thảo lần thứ nhất những luận cương về vấn đề dân tộc và vấn đề thuộc địa",
          "Nhà nước và Cách mạng",
          "Làm gì?",
          "Chủ nghĩa đế quốc - Giai đoạn tột cùng của chủ nghĩa tư bản"
        ],
        correctIndex: 0,
        explanation: "Tháng 7/1920, khi đọc bản Luận cương của Lênin trên báo L'Humanité, Bác đã tìm thấy con đường giải phóng cho dân tộc mình."
      },
      {
        id: 3,
        name: "Lá cờ số 3 (Góc trên bên phải)",
        behindDescription: "Dãy bàn đại biểu cùng các tài liệu nghị quyết và lá phiếu quyết định của Đại hội.",
        question: "Tại Đại hội Tours, Nguyễn Ái Quốc đã bỏ phiếu tán thành gia nhập tổ chức quốc tế nào?",
        options: [
          "Quốc tế thứ ba (Quốc tế Cộng sản - Comintern)",
          "Quốc tế thứ hai",
          "Hội Quốc Liên",
          "Quốc tế Nông dân"
        ],
        correctIndex: 0,
        explanation: "Người đã bỏ phiếu biểu quyết tán thành gia nhập Quốc tế thứ ba do Lênin sáng lập."
      },
      {
        id: 4,
        name: "Lá cờ số 4 (Góc dưới bên trái)",
        behindDescription: "Khu vực khán phòng nơi các nhà báo quốc tế theo dõi bài phát biểu đanh thép của Người đại biểu Đông Dương.",
        question: "Khi một nữ đồng chí hỏi tại sao lại bỏ phiếu cho Quốc tế III, Nguyễn Ái Quốc đã trả lời thế nào?",
        options: [
          "“Vì Quốc tế III rất chú ý đến vấn đề giải phóng các dân tộc thuộc địa.”",
          "“Vì Quốc tế III có tiềm lực quân sự lớn nhất.”",
          "“Vì Lênin là một nhà lãnh đạo vĩ đại.”",
          "“Vì phong trào công nhân châu Âu phát triển rất mạnh.”"
        ],
        correctIndex: 0,
        explanation: "Người trả lời giản dị: 'Tự do cho đồng bào tôi, độc lập cho Tổ quốc tôi, đấy là tất cả những điều tôi muốn; đấy là tất cả những điều tôi hiểu.'"
      },
      {
        id: 5,
        name: "Lá cờ số 5 (Khu vực trung tâm phía dưới)",
        behindDescription: "Bục diễn đàn nơi Nguyễn Ái Quốc cất tiếng nói tố cáo tội ác của chủ nghĩa thực dân Pháp tại Đông Dương.",
        question: "Sau Đại hội Tours, tờ báo cách mạng nào do Người cùng các đồng chí sáng lập năm 1922 tại Paris?",
        options: [
          "Báo Le Paria (Người Cùng Khổ)",
          "Báo L'Humanité (Nhân Đạo)",
          "Báo Thanh Niên",
          "Báo Tiền Phong"
        ],
        correctIndex: 0,
        explanation: "Năm 1922, Người sáng lập báo Le Paria (Người Cùng Khổ), vừa làm chủ nhiệm kiêm thư ký tòa soạn, vừa viết bài và vẽ tranh biếm họa."
      },
      {
        id: 6,
        name: "Lá cờ số 6 (Góc dưới bên phải)",
        behindDescription: "Tấm áp-phích lưu niệm dấu ấn sáng lập Đảng Cộng sản Pháp tháng 12 năm 1920.",
        question: "Ý nghĩa bước ngoặt của sự kiện Đại hội Tours trong cuộc đời hoạt động của Bác là gì?",
        options: [
          "Chuyển từ chủ nghĩa yêu nước sang chủ nghĩa cộng sản khoa học",
          "Bắt đầu học tiếng Pháp và tiếng Anh",
          "Chính thức rời nước Pháp sang Liên Xô",
          "Thành lập Đảng Cộng sản Việt Nam"
        ],
        correctIndex: 0,
        explanation: "Sự kiện Đại hội Tours đánh dấu bước nhảy vọt về chất: từ một người yêu nước trở thành chiến sĩ cộng sản."
      }
    ]
  },
  {
    id: 6,
    title: "Khu Di tích Kim Liên - Quê nội Làng Sen thân yêu",
    year: "Thời niên thiếu",
    location: "Xã Kim Liên, huyện Nam Đàn, Nghệ An",
    imageUrl: "/images/gallery/di-tich-kim-lien.png",
    period: "Cội nguồn quê hương xứ Nghệ",
    secretAliases: [
      "lang sen", "làng sen", "kim lien", "kim liên",
      "nam dan", "nam đàn", "que bac", "quê bác",
      "nghe an", "nghệ an", "nguyen sinh sac", "hoang tru"
    ],
    hint: "Mái nhà tranh đơn sơ dưới bóng tre xanh ngát nơi nuôi dưỡng tâm hồn và nhân cách cao đẹp của Bác Hồ thời niên thiếu.",
    historicalSignificance: "Làng Sen (quê nội) và Làng Hoàng Trù (quê ngoại) xã Kim Liên là cái nôi nuôi dưỡng tình yêu thương con người và ý chí quật cường của Bác Hồ từ thời thơ ấu bên người cha mẫu mực và người mẹ hiền thục.",
    famousQuote: "“Quê hương nghĩa nặng tình sâu / Năm mươi năm ấy biết bao nhiêu tình.”",
    tiles: [
      {
        id: 1,
        name: "Lá cờ số 1 (Góc trên bên trái)",
        behindDescription: "Rặng râm bụt đỏ thắm và hàng cau xanh mướt dẫn lối vào sân nhà tranh.",
        question: "Thân phụ của Chủ tịch Hồ Chí Minh là nhà nho yêu nước nào?",
        options: [
          "Cụ Phó bảng Nguyễn Sinh Sắc",
          "Cụ Cử nhân Phan Bội Châu",
          "Cụ Tú tài Đặng Thúc Hứa",
          "Cụ Hoàng Xuân Hành"
        ],
        correctIndex: 0,
        explanation: "Thân phụ của Bác là cụ Phó bảng Nguyễn Sinh Sắc - một nhà nho thanh liêm, yêu nước thương dân."
      },
      {
        id: 2,
        name: "Lá cờ số 2 (Khu vực trung tâm phía trên)",
        behindDescription: "Mái tranh năm gian mộc mạc ngả màu thời gian dưới rặng tre làng xứ Nghệ.",
        question: "Thân mẫu của Bác Hồ là người phụ nữ hiền thục nào đã sinh thành và nuôi dạy Bác thuở ấu thơ?",
        options: [
          "Bà Hoàng Thị Loan",
          "Bà Nguyễn Thị Thanh",
          "Bà Hà Thị Hy",
          "Bà Lê Thị Huệ"
        ],
        correctIndex: 0,
        explanation: "Bà Hoàng Thị Loan là tấm gương tiêu biểu của người mẹ Việt Nam giàu đức hy sinh, tần tảo nuôi chồng ăn học và chăm sóc các con."
      },
      {
        id: 3,
        name: "Lá cờ số 3 (Góc trên bên phải)",
        behindDescription: "Bầu trời trong xanh và khóm hoa râm bụt nở rộ trước hiên nhà cổ kính.",
        question: "Tên khai sinh thời thơ ấu của Chủ tịch Hồ Chí Minh là gì?",
        options: [
          "Nguyễn Sinh Cung",
          "Nguyễn Tất Thành",
          "Nguyễn Sinh Khiêm",
          "Nguyễn Ái Quốc"
        ],
        correctIndex: 0,
        explanation: "Thời thơ ấu, Bác mang tên Nguyễn Sinh Cung. Đến năm 1901 khi cụ thân sinh đỗ Phó bảng, Người được đặt tên mới là Nguyễn Tất Thành."
      },
      {
        id: 4,
        name: "Lá cờ số 4 (Góc dưới bên trái)",
        behindDescription: "Chiếc phản gỗ mộc mạc nơi cụ Phó bảng thường ngồi đàm đạo việc nước với các sĩ phu yêu nước.",
        question: "Ai là nhà chí sĩ cách mạng nổi tiếng cùng quê Nam Đàn thường sang đàm đạo việc nước với cụ thân sinh của Bác?",
        options: [
          "Cụ Phan Bội Châu",
          "Cụ Phan Châu Trinh",
          "Cụ Huỳnh Thúc Kháng",
          "Cụ Lương Văn Can"
        ],
        correctIndex: 0,
        explanation: "Cụ Phan Bội Châu là bậc tiền bối đồng hương thân thiết, thường sang đàm đạo thế sự và rất khâm phục tư chất thông minh của cậu bé Cung."
      },
      {
        id: 5,
        name: "Lá cờ số 5 (Khu vực trung tâm phía dưới)",
        behindDescription: "Bộ tràng kỷ tre và chiếc án thư bình dị Bác từng ngồi dùi mài kinh sử.",
        question: "Sau bao nhiêu năm bôn ba xa quê, Bác Hồ mới có dịp trở về thăm lại quê hương Làng Sen lần đầu tiên (1957)?",
        options: [
          "51 năm (1906 - 1957)",
          "30 năm (1911 - 1941)",
          "40 năm (1917 - 1957)",
          "20 năm (1937 - 1957)"
        ],
        correctIndex: 0,
        explanation: "Rời quê nhà từ năm 1906, mãi đến ngày 16/06/1957 sau 51 năm bôn ba và lãnh đạo kháng chiến thành công, Bác mới có dịp về thăm lại quê nội Làng Sen."
      },
      {
        id: 6,
        name: "Lá cờ số 6 (Góc dưới bên phải)",
        behindDescription: "Chiếc chum sành đựng nước mát và hàng rào râm bụt gắn bó với kỷ niệm tuổi thơ của Người.",
        question: "Khi về thăm lại quê nhà Làng Sen, Bác Hồ đã xúc động căn dặn đồng bào điều gì?",
        options: [
          "Đoàn kết, hăng say lao động sản xuất, xây dựng quê hương ngày càng giàu đẹp",
          "Xây dựng nhà lưu niệm thật khang trang",
          "Đón thật nhiều du khách quốc tế",
          "Tổ chức lễ hội hàng năm"
        ],
        correctIndex: 0,
        explanation: "Bác ân cần thăm hỏi bà con làng xóm, nhắc nhở giữ gìn nét đẹp tình làng nghĩa xóm, thi đua sản xuất và học tập văn hóa."
      }
    ]
  }
];

// Helper to remove Vietnamese diacritics for flexible fuzzy guessing
function normalizeVN(str) {
  if (!str) return '';
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export default function ManhGhepBiAnGame() {
  const [currentLevelIdx, setCurrentLevelIdx] = useState(0);
  const [revealedTiles, setRevealedTiles] = useState([]); // Array of tile IDs (1 to 6)
  const [activeTile, setActiveTile] = useState(null); // Tile currently being challenged
  const [selectedOption, setSelectedOption] = useState(null);
  const [showQuestionResult, setShowQuestionResult] = useState(false);
  const [isQuestionCorrect, setIsQuestionCorrect] = useState(false);
  const [tileUnlockNotice, setTileUnlockNotice] = useState(null); // Feedback of what's behind the flag

  // Instant Guessing states
  const [guessInput, setGuessInput] = useState('');
  const [guessFeedback, setGuessFeedback] = useState(null); // { type: 'success' | 'error', text: '' }
  const [isLevelSolved, setIsLevelSolved] = useState(false);
  const [isSolvedByInstantGuess, setIsSolvedByInstantGuess] = useState(false);

  // Score & Game Stats
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showHintModal, setShowHintModal] = useState(false);
  const [zoomedImage, setZoomedImage] = useState(false);

  const currentLevel = PUZZLE_LEVELS[currentLevelIdx];
  const allTilesRevealed = revealedTiles.length === 6;

  // Check if level finished
  useEffect(() => {
    if (allTilesRevealed && !isLevelSolved) {
      handleCompleteLevel(false);
    }
  }, [allTilesRevealed]);

  // Clean voice on unmount
  useEffect(() => {
    return () => {
      stopVietnameseVoice();
    };
  }, []);

  // Handle clicking on a Vietnamese flag
  const handleTileClick = (tile) => {
    stopVietnameseVoice();
    soundFX.playFlip();
    if (revealedTiles.includes(tile.id)) {
      // Already revealed: Show the information behind this flag
      setTileUnlockNotice({
        tileNumber: tile.id,
        tileName: tile.name,
        desc: tile.behindDescription
      });
      return;
    }

    // Open question challenge for this tile
    setActiveTile(tile);
    setSelectedOption(null);
    setShowQuestionResult(false);
    setGuessFeedback(null);
  };

  // Answer tile challenge
  const handleAnswerSubmit = (optionIndex) => {
    if (selectedOption !== null || !activeTile) return;
    setSelectedOption(optionIndex);
    setShowQuestionResult(true);

    const isCorrect = optionIndex === activeTile.correctIndex;
    setIsQuestionCorrect(isCorrect);

    if (isCorrect) {
      soundFX.playCorrect();
      speakVietnameseVoice("Chính xác! Bạn đã chọn đúng.");
      setScore(prev => prev + 250);
      setStreak(prev => prev + 1);
      const newRevealed = [...revealedTiles, activeTile.id];
      setRevealedTiles(newRevealed);

      // Show insight of what was hidden behind this flag
      setTileUnlockNotice({
        tileNumber: activeTile.id,
        tileName: activeTile.name,
        desc: activeTile.behindDescription
      });
    } else {
      soundFX.playWrong();
      setStreak(0);
      const correctLetter = String.fromCharCode(65 + activeTile.correctIndex);
      const correctText = activeTile.options[activeTile.correctIndex];
      speakVietnameseVoice(`Chưa chính xác! Đáp án đúng là đáp án ${correctLetter}: ${correctText}.`);
    }
  };

  // Close question modal
  const handleCloseQuestionModal = () => {
    stopVietnameseVoice();
    setActiveTile(null);
    setSelectedOption(null);
    setShowQuestionResult(false);
  };

  // ================= INSTANT GUESS LOGIC =================
  const handleInstantGuessSubmit = (e) => {
    if (e) e.preventDefault();
    if (!guessInput.trim() || isLevelSolved) return;

    const normInput = normalizeVN(guessInput);
    
    // Check if input matches any of the secret aliases
    const isMatched = currentLevel.secretAliases.some(alias => {
      const normAlias = normalizeVN(alias);
      return normInput.includes(normAlias) || normAlias.includes(normInput) && normInput.length >= 5;
    });

    if (isMatched) {
      // VICTORY BY INSTANT GUESS!
      soundFX.playVictory();
      speakVietnameseVoice(`Chính xác! Bạn đã giải mã thành công: ${currentLevel.title}.`);
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (err) {}

      // Calculate big bonus for remaining unopened flags
      const unopenedCount = 6 - revealedTiles.length;
      const instantBonus = 500 + unopenedCount * 300;
      setScore(prev => prev + instantBonus);

      // Unveil all 6 flags at once
      setRevealedTiles([1, 2, 3, 4, 5, 6]);
      setIsLevelSolved(true);
      setIsSolvedByInstantGuess(true);
      setGuessFeedback({
        type: 'success',
        text: `XUẤT SẮC! Bạn đã đoán chính xác: "${currentLevel.title}"! (+${instantBonus} điểm thưởng)`
      });
      setGuessInput('');
    } else {
      soundFX.playWrong();
      speakVietnameseVoice("Chưa chính xác rồi! Hãy mở thêm lá cờ hoặc dùng nút Gợi ý để quan sát thêm chi tiết nhé.");
      setGuessFeedback({
        type: 'error',
        text: 'Chưa chính xác rồi! Hãy mở thêm lá cờ hoặc dùng nút "Gợi ý" để quan sát thêm chi tiết nhé!'
      });
    }
  };

  // Trigger level victory
  const handleCompleteLevel = (byInstant = false) => {
    setIsLevelSolved(true);
    setIsSolvedByInstantGuess(byInstant);
    soundFX.playVictory();
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {}
  };

  // Next level
  const handleNextLevel = () => {
    soundFX.playSparkle();
    const nextIdx = (currentLevelIdx + 1) % PUZZLE_LEVELS.length;
    setCurrentLevelIdx(nextIdx);
    setRevealedTiles([]);
    setActiveTile(null);
    setSelectedOption(null);
    setShowQuestionResult(false);
    setTileUnlockNotice(null);
    setGuessInput('');
    setGuessFeedback(null);
    setIsLevelSolved(false);
    setIsSolvedByInstantGuess(false);
  };

  // Reset current puzzle
  const handleResetCurrentPuzzle = () => {
    soundFX.playFlip();
    setRevealedTiles([]);
    setActiveTile(null);
    setSelectedOption(null);
    setShowQuestionResult(false);
    setTileUnlockNotice(null);
    setGuessInput('');
    setGuessFeedback(null);
    setIsLevelSolved(false);
    setIsSolvedByInstantGuess(false);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      
      {/* Header bar: Score, Level indicator, Action controls */}
      <div className="bg-[#1e130a]/90 backdrop-blur-md p-4 sm:p-5 rounded-3xl border border-amber-600/30 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-600 to-amber-600 border border-amber-400/60 flex items-center justify-center shadow-lg shadow-red-950/50">
            <Flag className="w-6 h-6 text-yellow-300 fill-yellow-300 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs uppercase tracking-widest font-black text-amber-400 bg-amber-950/80 px-2.5 py-0.5 rounded-full border border-amber-500/40">
                MÀN {currentLevelIdx + 1} / {PUZZLE_LEVELS.length}
              </span>
              <span className="text-xs text-stone-400 font-serif">Thời kỳ: {currentLevel.period}</span>
            </div>
            <h3 className="text-base sm:text-lg font-serif font-bold text-amber-100 flex items-center gap-1.5 mt-0.5">
              <span>Lật Mảnh Ghép Tư Liệu Bí Ẩn</span>
            </h3>
          </div>
        </div>

        {/* Stats & Actions */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <div className="bg-stone-900/90 border border-amber-900/60 px-3.5 py-1.5 rounded-2xl text-center shadow-inner">
            <div className="text-[10px] text-stone-400 uppercase font-semibold">Điểm số</div>
            <div className="text-base font-black font-mono text-yellow-400">{score}</div>
          </div>

          <div className="bg-stone-900/90 border border-amber-900/60 px-3.5 py-1.5 rounded-2xl text-center shadow-inner">
            <div className="text-[10px] text-stone-400 uppercase font-semibold">Đã mở</div>
            <div className="text-base font-black font-mono text-amber-300">
              {revealedTiles.length}/6 <span className="text-xs text-stone-400 font-normal">lá cờ</span>
            </div>
          </div>

          <button
            onClick={() => setShowHintModal(true)}
            className="p-2.5 rounded-xl bg-amber-950/60 hover:bg-amber-900/80 border border-amber-500/50 text-amber-300 hover:text-amber-100 transition-all flex items-center space-x-1 text-xs font-bold"
            title="Xem gợi ý lịch sử"
          >
            <Lightbulb className="w-4 h-4 text-yellow-400" />
            <span className="hidden sm:inline">Gợi ý</span>
          </button>

          <button
            onClick={handleResetCurrentPuzzle}
            className="p-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-300 hover:text-white transition-all text-xs"
            title="Làm mới lại màn này"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Puzzle Playground */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column (Puzzle Canvas with 6 Vietnamese Flags) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] bg-stone-950 rounded-3xl overflow-hidden border-2 border-amber-600/50 shadow-2xl p-1.5 duocsang-card">
            
            {/* The Hidden Authentic Historical Photo */}
            <div className="relative w-full h-full rounded-2xl overflow-hidden bg-black select-none">
              <img 
                src={currentLevel.imageUrl} 
                alt="Tư liệu lịch sử bí ẩn" 
                className="w-full h-full object-cover transition-transform duration-700 pointer-events-none"
              />

              {/* Grid of 6 Vietnamese Flag Tiles (3 Columns x 2 Rows) */}
              <div className="absolute inset-0 grid grid-cols-3 grid-rows-2 gap-1.5 p-1 bg-black/40">
                {currentLevel.tiles.map((tile) => {
                  const isRevealed = revealedTiles.includes(tile.id);
                  return (
                    <div 
                      key={tile.id}
                      className="relative w-full h-full perspective-1000 group cursor-pointer"
                      onClick={() => handleTileClick(tile)}
                    >
                      {/* Flag Tile Surface */}
                      <div className={`w-full h-full rounded-xl transition-all duration-500 transform relative overflow-hidden flex flex-col items-center justify-center select-none shadow-lg ${
                        isRevealed 
                          ? 'opacity-0 pointer-events-none scale-90 translate-y-2' 
                          : 'opacity-100 hover:scale-[1.02] border border-amber-400/60 hover:border-yellow-300 hover:shadow-yellow-500/30'
                      }`}
                      style={{
                        background: 'linear-gradient(135deg, #c41c15 0%, #da251d 50%, #b31610 100%)'
                      }}
                      >
                        {/* Vietnamese Flag Red Silk Texture & Gold Star */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/10 pointer-events-none" />
                        
                        {/* Golden 5-pointed Star centered on Red Background */}
                        <div className="relative flex items-center justify-center p-2">
                          <svg 
                            viewBox="0 0 100 100" 
                            className="w-14 h-14 sm:w-20 sm:h-20 text-yellow-300 drop-shadow-[0_2px_12px_rgba(255,235,59,0.85)] group-hover:scale-110 transition-transform duration-300 pointer-events-none"
                            fill="currentColor"
                          >
                            {/* Standard 5-pointed Star SVG */}
                            <polygon points="50,5 64,36 98,36 70,57 81,91 50,70 19,91 30,57 2,36 36,36" />
                          </svg>
                        </div>

                        {/* Subtle pulsing ring on hover */}
                        <div className="absolute inset-0 rounded-xl border border-yellow-300/0 group-hover:border-yellow-300/40 transition-colors pointer-events-none" />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Fullscreen Magnifier button */}
              <button
                onClick={() => setZoomedImage(true)}
                className="absolute bottom-3 right-3 z-20 p-2 rounded-xl bg-black/70 hover:bg-black/90 border border-amber-400/60 text-amber-300 transition-all hover:scale-105"
                title="Phóng to ảnh"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Notice: Content behind the selected/unlocked flag */}
          {tileUnlockNotice && (
            <div className="p-4 rounded-2xl bg-amber-950/70 border border-amber-500/50 shadow-lg animate-fadeIn flex items-start space-x-3">
              <div className="w-8 h-8 rounded-xl bg-amber-900 border border-amber-400 flex-shrink-0 flex items-center justify-center text-yellow-300 font-bold text-xs">
                #{tileUnlockNotice.tileNumber}
              </div>
              <div className="flex-grow">
                <div className="text-xs font-bold text-amber-300 flex items-center justify-between">
                  <span>Dữ liệu mở khóa từ {tileUnlockNotice.tileName}:</span>
                  <button 
                    onClick={() => setTileUnlockNotice(null)}
                    className="text-stone-400 hover:text-white text-xs"
                  >
                    ✕
                  </button>
                </div>
                <p className="text-xs text-stone-200 font-serif mt-1 leading-relaxed">
                  {tileUnlockNotice.desc}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Instant Guessing + Game Status + Level Progression */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* ================= ĐOÁN NGAY ĐÁP ÁN (INSTANT GUESS FORM) ================= */}
          <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-b from-[#251509] to-[#1a0e06] border-2 border-amber-500/60 shadow-xl relative overflow-hidden duocsang-card">
            
            <div className="flex items-center space-x-2.5 mb-2">
              <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-400/60 flex items-center justify-center text-yellow-400">
                <Zap className="w-5 h-5 fill-yellow-400" />
              </div>
              <div>
                <h4 className="text-sm sm:text-base font-serif font-black text-amber-200 uppercase tracking-wide">
                  Đoán Ngay Đáp Án
                </h4>
                <p className="text-[11px] text-stone-400 font-serif">
                  Nhận diện được sự kiện? Đoán ngay để mở toàn bộ 6 lá cờ!
                </p>
              </div>
            </div>

            {!isLevelSolved ? (
              <form onSubmit={handleInstantGuessSubmit} className="space-y-3 mt-3">
                <div className="relative">
                  <input
                    type="text"
                    value={guessInput}
                    onChange={(e) => setGuessInput(e.target.value)}
                    placeholder="Ví dụ: Tuyên ngôn độc lập, Bến Nhà Rồng..."
                    className="w-full px-4 py-3 rounded-2xl bg-stone-900/90 border border-amber-700/60 text-stone-100 placeholder-stone-500 text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-500/30 transition-all font-sans pr-10"
                  />
                  {guessInput && (
                    <button
                      type="button"
                      onClick={() => setGuessInput('')}
                      className="absolute right-3 top-3.5 text-stone-400 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {guessFeedback && (
                  <div className={`p-3 rounded-xl text-xs font-serif leading-relaxed flex items-start space-x-2 border ${
                    guessFeedback.type === 'success' 
                      ? 'bg-emerald-950/80 border-emerald-600/60 text-emerald-200' 
                      : 'bg-rose-950/80 border-rose-600/60 text-rose-200 animate-shake'
                  }`}>
                    {guessFeedback.type === 'success' ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                    )}
                    <span>{guessFeedback.text}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={!guessInput.trim()}
                  className={`w-full py-3 px-4 rounded-2xl font-bold text-xs tracking-wider uppercase flex items-center justify-center space-x-2 shadow-lg transition-all ${
                    guessInput.trim()
                      ? 'bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 text-stone-950 hover:scale-[1.02] active:scale-[0.98]'
                      : 'bg-stone-800 text-stone-500 cursor-not-allowed border border-stone-700'
                  }`}
                >
                  <Zap className="w-4 h-4 fill-stone-950" />
                  <span>Xác Nhận Đoán Ngay (+Thưởng Lớn)</span>
                </button>
              </form>
            ) : (
              /* Solved Celebration Banner */
              <div className="space-y-4 mt-2">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-950/90 to-yellow-950/50 border border-amber-400/70 text-center space-y-2">
                  <div className="w-12 h-12 mx-auto rounded-full bg-yellow-400/20 border border-yellow-400 flex items-center justify-center text-yellow-300 animate-bounce">
                    <Trophy className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-serif font-black text-amber-200">
                    BỨC ẢNH ĐÃ ĐƯỢC GIẢI MÃ HOÀN TOÀN!
                  </h4>
                  <p className="text-xs text-stone-300 font-serif leading-relaxed">
                    {currentLevel.title} ({currentLevel.year})
                  </p>
                </div>

                <button
                  onClick={handleNextLevel}
                  className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 text-stone-950 font-black text-xs tracking-wider uppercase flex items-center justify-center space-x-2 shadow-xl hover:scale-105 active:scale-95 transition-all"
                >
                  <span>MẢNH GHÉP TIẾP THEO</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Hint Trigger Pill */}
            <div className="mt-4 pt-3 border-t border-amber-900/40 flex items-center justify-between text-xs text-stone-400 font-serif">
              <span>Còn che: <strong className="text-yellow-400 font-mono">{6 - revealedTiles.length}</strong> lá cờ</span>
              <button
                onClick={() => setShowHintModal(true)}
                className="text-amber-400 hover:text-amber-300 underline flex items-center space-x-1"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Xem gợi ý bối cảnh</span>
              </button>
            </div>
          </div>

          {/* Historical Chronicle & Story Behind the Photo (shown only when solved) */}
          {isLevelSolved && (
            <div className="p-5 rounded-3xl bg-stone-950/80 border border-amber-900/50 shadow-md space-y-2.5 animate-fadeIn">
              <h5 className="text-xs uppercase font-bold tracking-wider text-amber-400 flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Ý Nghĩa Lịch Sử & Tư Liệu</span>
              </h5>
              <p className="text-xs text-stone-200 font-serif leading-relaxed">
                {currentLevel.historicalSignificance}
              </p>
              <blockquote className="p-3 rounded-xl bg-amber-950/40 border-l-2 border-amber-500 text-xs italic text-amber-200 font-serif">
                {currentLevel.famousQuote}
              </blockquote>
            </div>
          )}

        </div>

      </div>

      {/* ================= MODAL: QUESTION CHALLENGE FOR A FLAG TILE ================= */}
      {activeTile && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="duocsang-card max-w-xl w-full rounded-3xl p-6 sm:p-8 border-2 border-amber-500/70 shadow-2xl relative space-y-5">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-amber-900/60 pb-3">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-xl bg-red-600 border border-yellow-400 flex items-center justify-center shadow-md">
                  <Star className="w-5 h-5 text-yellow-300 fill-yellow-300" />
                </div>
                <div>
                  <span className="text-[10px] text-amber-400 uppercase font-black tracking-wider block">
                    THỬ THÁCH MỞ KHÓA
                  </span>
                  <h4 className="text-sm sm:text-base font-serif font-bold text-amber-100">
                    {activeTile.name}
                  </h4>
                </div>
              </div>

              <button
                onClick={handleCloseQuestionModal}
                className="text-stone-400 hover:text-white p-1 rounded-lg hover:bg-stone-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Question Text */}
            <div className="space-y-2">
              <p className="text-sm sm:text-base text-amber-50 font-serif font-semibold leading-relaxed">
                {activeTile.question}
              </p>
            </div>

            {/* Options list */}
            <div className="space-y-2.5 pt-1">
              {activeTile.options.map((option, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === activeTile.correctIndex;
                let btnStyle = "bg-stone-900/90 hover:bg-stone-800 border-stone-800 text-stone-200";

                if (showQuestionResult) {
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
                    disabled={showQuestionResult}
                    onClick={() => handleAnswerSubmit(idx)}
                    className={`w-full p-3.5 sm:p-4 rounded-2xl border text-left text-xs sm:text-sm font-sans flex items-start space-x-3 transition-all ${btnStyle}`}
                  >
                    <span className="w-6 h-6 rounded-lg bg-black/40 border border-amber-600/40 flex items-center justify-center text-xs font-bold text-amber-300 flex-shrink-0 mt-0.5">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="flex-grow font-serif leading-snug">{option}</span>
                    {showQuestionResult && isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    )}
                    {showQuestionResult && isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Feedback & Behind Flag Explanation */}
            {showQuestionResult && (
              <div className="space-y-3 pt-2 animate-fadeIn">
                <div className={`p-4 rounded-2xl border ${
                  isQuestionCorrect 
                    ? 'bg-emerald-950/70 border-emerald-600/60 text-emerald-200' 
                    : 'bg-rose-950/70 border-rose-600/60 text-rose-200'
                }`}>
                  <div className="font-bold text-xs uppercase flex items-center space-x-1.5 mb-1">
                    {isQuestionCorrect ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>CHÍNH XÁC! LÁ CỜ ĐÃ ĐƯỢC LẬT MỞ</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-rose-400" />
                        <span>CHƯA ĐÚNG RỒI! HÃY THỬ LẠI SAU NHÉ</span>
                      </>
                    )}
                  </div>
                  <p className="text-xs font-serif leading-relaxed text-stone-200">
                    {activeTile.explanation}
                  </p>
                  
                  {isQuestionCorrect && (
                    <div className="mt-2 pt-2 border-t border-emerald-800/50 text-xs text-yellow-300 font-bold flex items-center space-x-1">
                      <span>✨ Đằng sau lá cờ hé lộ:</span>
                      <span className="text-stone-200 font-normal italic">{activeTile.behindDescription}</span>
                    </div>
                  )}
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    onClick={handleCloseQuestionModal}
                    className="px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-600 to-yellow-500 text-stone-950 font-bold text-xs tracking-wider uppercase shadow-md hover:scale-105 transition-all"
                  >
                    TIẾP TỤC KHÁM PHÁ
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* ================= MODAL: HISTORICAL HINT ================= */}
      {showHintModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="duocsang-card max-w-md w-full rounded-3xl p-6 border-2 border-amber-500/60 shadow-2xl space-y-4">
            <div className="flex items-center space-x-2 text-yellow-400">
              <Lightbulb className="w-5 h-5" />
              <h4 className="text-base font-serif font-bold text-amber-100">Gợi Ý Bí Mật</h4>
            </div>
            <p className="text-xs sm:text-sm text-stone-300 font-serif leading-relaxed">
              {currentLevel.hint}
            </p>
            <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-900/60 text-xs text-amber-300 font-serif">
              💡 <strong>Mẹo:</strong> Bạn có thể gõ tên sự kiện bằng tiếng Việt có dấu hoặc không dấu trong ô "Đoán Ngay Đáp Án" để lật mở toàn bộ bức tranh!
            </div>
            <div className="text-right pt-2">
              <button
                onClick={() => setShowHintModal(false)}
                className="px-5 py-2 rounded-full bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-200 text-xs font-bold"
              >
                Đã hiểu
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: ZOOM IMAGE FULLSCREEN ================= */}
      {zoomedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setZoomedImage(false)}
        >
          <div className="relative max-w-4xl max-h-[90vh] rounded-3xl overflow-hidden border-2 border-amber-500 shadow-2xl">
            <img src={currentLevel.imageUrl} alt="Ảnh phóng to" className="w-full h-full object-contain max-h-[85vh]" />
            <button
              onClick={() => setZoomedImage(false)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/80 border border-amber-400 text-amber-200 flex items-center justify-center hover:scale-110"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
