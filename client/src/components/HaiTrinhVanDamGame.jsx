import React, { useState, useEffect } from 'react';
import { 
  Anchor, Compass, MapPin, Navigation, Ship, Wind, Award,
  Sparkles, CheckCircle2, ChevronRight, ChevronLeft, Volume2,
  VolumeX, Trophy, RotateCcw, BookOpen, Flag, Shield, Eye,
  Maximize2, ArrowRight, Play, Check, X
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFX, speakVietnameseVoice, stopVietnameseVoice } from '../utils/gameAudio';

// ================= 10 HISTORIC MILESTONES OF THE 30-YEAR VOYAGE =================
export const JOURNEY_STOPS = [
  {
    id: 1,
    city: "Sài Gòn - Bến Nhà Rồng",
    country: "Việt Nam",
    year: "05/06/1911",
    lat: 10.768,
    lng: 106.706,
    mapX: 77.5, // Percent position on map canvas
    mapY: 62.0,
    roleTitle: "Người thanh niên Văn Ba",
    vessel: "Tàu Amiral Latouche-Tréville",
    nauticalMiles: 0,
    imageUrl: "/images/gallery/ben-nha-rong.jpg",
    narrative: "Ngày 5/6/1911, từ Bến cảng Nhà Rồng (Sài Gòn), người thanh niên yêu nước Nguyễn Tất Thành bước chân lên tàu buôn Pháp Amiral Latouche-Tréville với tên gọi Văn Ba, bắt đầu chuyến hải trình 30 năm tìm con đường cứu nước, cứu dân.",
    quote: "“Tôi muốn đi ra ngoài, xem nước Pháp và các nước khác. Sau khi xem xét họ làm như thế nào, tôi sẽ trở về giúp đồng bào chúng ta.”",
    question: "Người thanh niên Nguyễn Tất Thành đã nhận làm công việc gì trên tàu buôn Amiral Latouche-Tréville?",
    options: [
      "Phụ bếp với công việc quét dọn, bốc vác than và rửa bát đĩa",
      "Thủy thủ lái tàu chính",
      "Phiên dịch viên tiếng Pháp cho thuyền trưởng",
      "Thợ cơ khí máy móc hơi nước"
    ],
    correctIndex: 0,
    explanation: "Người đã nhận làm phụ bếp, sẵn sàng lao động tay chân vất vả từ sáng sớm đến đêm khuya trong khoang tàu nóng rực để có cơ hội sang phương Tây tìm đường cứu nước."
  },
  {
    id: 2,
    city: "Marseille & Le Havre",
    country: "Cộng hòa Pháp",
    year: "06/07/1911",
    lat: 43.296,
    lng: 5.369,
    mapX: 47.5,
    mapY: 34.0,
    roleTitle: "Thủy thủ viễn dương",
    vessel: "Tàu buôn vượt Ấn Độ Dương & Địa Trung Hải",
    nauticalMiles: 6500,
    imageUrl: "/images/timeline/tau-latouche-treville.jpg",
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
    explanation: "Người nhận ra ở đâu cũng có hai loại người: kẻ bóc lột và người bị bóc lột. Người lao động Pháp cũng chịu cảnh bần hàn và bất công, chỉ có bọn thực dân cai trị là tàn bạo."
  },
  {
    id: 3,
    city: "Boston & New York",
    country: "Hợp chúng quốc Hoa Kỳ",
    year: "1912 - 1913",
    lat: 42.360,
    lng: -71.058,
    mapX: 27.0,
    mapY: 34.5,
    roleTitle: "Thợ làm bánh & Lao động tự do",
    vessel: "Tàu hàng vượt Đại Tây Dương",
    nauticalMiles: 11200,
    imageUrl: "/images/gallery/tuyen-ngon-doc-lap.jpg",
    narrative: "Cuối năm 1912, Người sang Hoa Kỳ, làm thợ bánh tại khách sạn Omni Parker House (Boston) và sống ở khu Harlem (New York). Người nghiên cứu sâu Tuyên ngôn Độc lập Mỹ năm 1776 và chứng kiến nạn phân biệt chủng tộc với người da màu.",
    quote: "“Tất cả mọi người đều sinh ra có quyền bình đẳng. Tạo hóa cho họ những quyền không ai có thể xâm phạm được.”",
    question: "Tại Boston (Mỹ), người thanh niên yêu nước Nguyễn Tất Thành đã làm việc tại địa điểm nổi tiếng nào?",
    options: [
      "Khách sạn Omni Parker House",
      "Đại học Harvard",
      "Cảng biển Boston Harbor",
      "Tòa thị chính Boston"
    ],
    correctIndex: 0,
    explanation: "Tại khách sạn Omni Parker House lịch sử ở Boston, Người làm thợ phụ làm bánh và tranh thủ thời gian tự học tiếng Anh cũng như tìm hiểu văn hóa chính trị Mỹ."
  },
  {
    id: 4,
    city: "London",
    country: "Vương quốc Anh",
    year: "1913 - 1917",
    lat: 51.507,
    lng: -0.127,
    mapX: 46.0,
    mapY: 30.5,
    roleTitle: "Lao động & Hội viên Lao động Hải ngoại",
    vessel: "Hành trình sương mù London",
    nauticalMiles: 14500,
    imageUrl: "/images/timeline/carlton-hotel.jpg",
    narrative: "Đến thủ đô sương mù London, Người làm đủ nghề: cào tuyết cho một trường học, đốt lò, rồi làm phụ bếp tại khách sạn Carlton dưới sự hướng dẫn của bếp trưởng huyền thoại Auguste Escoffier. Người gia nhập Công đoàn Lao động Hải ngoại.",
    quote: "“Học để làm việc, làm người, làm cán bộ. Học để phụng sự Tổ quốc, phụng sự nhân dân.”",
    question: "Khách sạn sang trọng nơi Bác Hồ từng làm việc trong thời gian sống tại thủ đô London nước Anh là gì?",
    options: [
      "Khách sạn Carlton",
      "Khách sạn The Ritz",
      "Khách sạn Savoy",
      "Khách sạn Claridge's"
    ],
    correctIndex: 0,
    explanation: "Khách sạn Carlton là nơi Người phụ bếp và kết thân với phong trào công nhân tiến bộ Anh, tích lũy kiến thức sâu rộng về xã hội tư bản phương Tây."
  },
  {
    id: 5,
    city: "Paris - Ngõ Compoint & Đại hội Tours",
    country: "Cộng hòa Pháp",
    year: "1917 - 1923",
    lat: 48.856,
    lng: 2.352,
    mapX: 47.0,
    mapY: 32.5,
    roleTitle: "Chiến sĩ Nguyễn Ái Quốc",
    vessel: "Trung tâm phong trào giải phóng thuộc địa",
    nauticalMiles: 15200,
    imageUrl: "/images/gallery/dai-hoi-tours.jpg",
    narrative: "Năm 1917, Người trở lại Pháp, lấy tên Nguyễn Ái Quốc. Năm 1919 gửi 'Bản Yêu sách của nhân dân An Nam' tới Hội nghị Versailles. Tháng 12/1920, bỏ phiếu sáng lập Đảng Cộng sản Pháp tại Đại hội Tours và sáng lập báo Le Paria (1922).",
    quote: "“Luận cương của Lênin làm cho tôi rất cảm động, phấn khởi, sáng tỏ, tin tưởng biết bao! Hỡi đồng bào bị đày đọa đau khổ! Đây là cái cần thiết cho chúng ta!”",
    question: "Bản văn kiện lịch sử nào của V.I. Lênin đã giúp Nguyễn Ái Quốc tìm thấy con đường giải phóng cho dân tộc?",
    options: [
      "Sơ thảo lần thứ nhất những luận cương về vấn đề dân tộc và vấn đề thuộc địa",
      "Tuyên ngôn của Đảng Cộng sản",
      "Cách mạng và Nhà nước",
      "Kinh tế chính trị học Mác - Lênin"
    ],
    correctIndex: 0,
    explanation: "Đọc Luận cương của Lênin trên báo L'Humanité tháng 7/1920, Nguyễn Ái Quốc đã thốt lên trong niềm xúc động tột cùng và tìm ra con đường cứu nước đúng đắn."
  },
  {
    id: 6,
    city: "Moskva (Mát-xcơ-va)",
    country: "Liên Xô",
    year: "1923 - 1924",
    lat: 55.755,
    lng: 37.617,
    mapX: 58.5,
    mapY: 27.5,
    roleTitle: "Cán bộ Quốc tế Cộng sản",
    vessel: "Đoàn tàu xuyên Siberia",
    nauticalMiles: 17800,
    imageUrl: "/images/timeline/moskva-1924.jpg",
    narrative: "Tháng 6/1923, Nguyễn Ái Quốc bí mật sang Moskva, quê hương Cách mạng Tháng Mười. Người dự Đại hội Quốc tế Nông dân, Đại hội V Quốc tế Cộng sản và học tập, nghiên cứu tại Trường Đại học Phương Đông.",
    quote: "“Chỉ có chủ nghĩa xã hội, chủ nghĩa cộng sản mới giải phóng được các dân tộc bị áp bức và những người lao động trên thế giới khỏi ách nô lệ.”",
    question: "Nguyễn Ái Quốc đã học tập và nghiên cứu lý luận cách mạng tại ngôi trường danh tiếng nào ở Moskva?",
    options: [
      "Trường Đại học Lao động Cộng sản Phương Đông",
      "Trường Đại học Tổng hợp Lomonosov",
      "Học viện Quân sự Frunze",
      "Trường Đảng cao cấp Moskva"
    ],
    correctIndex: 0,
    explanation: "Tại Trường Đại học Phương Đông, Người vừa theo học lý luận Mác - Lênin, vừa truyền bá tư tưởng cách mạng cho sinh viên các nước phương Đông."
  },
  {
    id: 7,
    city: "Quảng Châu",
    country: "Trung Quốc",
    year: "1924 - 1927",
    lat: 23.129,
    lng: 113.264,
    mapX: 79.5,
    mapY: 53.0,
    roleTitle: "Đồng chí Lý Thụy",
    vessel: "Hội Việt Nam Cách mạng Thanh niên",
    nauticalMiles: 23500,
    imageUrl: "/images/timeline/tru-so-hoi-thanh-nien.jpg",
    narrative: "Cuối năm 1924, Người đến Quảng Châu với bí danh Lý Thụy. Người thành lập Hội Việt Nam Cách mạng Thanh niên (6/1925), mở các lớp huấn luyện chính trị đào tạo cán bộ cốt cán và xuất bản cuốn sách bất hủ 'Đường Kách Mệnh' (1927).",
    quote: "“Cách mệnh trước hết phải có cái gì? Trước hết phải có Đảng cách mệnh, để trong thì vận động và tổ chức dân chúng, ngoài thì liên lạc với dân tộc bị áp bức.”",
    question: "Tác phẩm lý luận cách mạng đầu tiên tập hợp các bài giảng của Nguyễn Ái Quốc tại Quảng Châu xuất bản năm 1927 có tên là gì?",
    options: [
      "Đường Kách Mệnh",
      "Bản án chế độ thực dân Pháp",
      "Lời kêu gọi toàn quốc kháng chiến",
      "Nhật ký trong tù"
    ],
    correctIndex: 0,
    explanation: "Cuốn 'Đường Kách Mệnh' đã trang bị vũ khí tư tưởng cho các cán bộ cách mạng Việt Nam, chuẩn bị trực tiếp về mặt chính trị và tư tưởng cho việc thành lập Đảng."
  },
  {
    id: 8,
    city: "Bản Đông - Phichit",
    country: "Xiêm (Thái Lan)",
    year: "1928 - 1929",
    lat: 16.442,
    lng: 100.347,
    mapX: 76.0,
    mapY: 58.5,
    roleTitle: "Thầy giáo Thầu Chín",
    vessel: "Vùng đất hữu nghị Đông Nam Á",
    nauticalMiles: 25100,
    imageUrl: "/images/timeline/thau-chin-thai-lan.jpg",
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
    id: 9,
    city: "Cửu Long (Kowloon) - Hồng Kông",
    country: "Hồng Kông",
    year: "03/02/1930",
    lat: 22.319,
    lng: 114.169,
    mapX: 80.5,
    mapY: 53.5,
    roleTitle: "Phái viên Quốc tế Cộng sản",
    vessel: "Hội nghị hợp nhất lịch sử",
    nauticalMiles: 26800,
    imageUrl: "/images/timeline/thanh-lap-dang-1930.jpg",
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
  {
    id: 10,
    city: "Cột mốc 108 - Pác Bó (Cao Bằng)",
    country: "Tổ quốc Việt Nam Thân Yêu",
    year: "28/01/1941",
    lat: 22.980,
    lng: 106.050,
    mapX: 77.0,
    mapY: 51.0,
    roleTitle: "Bác Hồ - Già Thu",
    vessel: "Hành trình 30 năm khép lại - Bình minh dân tộc",
    nauticalMiles: 30000,
    imageUrl: "/images/gallery/pac-bo.jpg",
    narrative: "Sáng 28/01/1941 (Mùng 2 Tết Tân Tỵ), sau 30 năm bôn ba qua 3 đại dương và 4 châu lục, Người vượt qua cột mốc 108 biên giới Việt - Trung trở về Tổ quốc. Người cúi xuống hôn lên mảnh đất quê hương, trực tiếp lãnh đạo Cách mạng Tháng Tám thắng lợi.",
    quote: "“Kìa bóng Bác đang hôn lên hòn đất / Lắng nghe trong màu hồng hình đất nước phôi thai.” (Chế Lan Viên)",
    question: "Ngày Bác Hồ vượt cột mốc 108 trở về đất mẹ sau 30 năm bôn ba là ngày nào?",
    options: [
      "28/01/1941 (Mùng 2 Tết Tân Tỵ)",
      "05/06/1941",
      "02/09/1941",
      "19/05/1941"
    ],
    correctIndex: 0,
    explanation: "Đúng ngày 28/01/1941, Bác Hồ cùng các đồng chí bí mật đặt chân về Tổ quốc tại Cao Bằng, đánh dấu mốc son rực rỡ chuẩn bị cho ngày độc lập."
  }
];

export default function HaiTrinhVanDamGame() {
  const [currentStopIndex, setCurrentStopIndex] = useState(0); // Current active stop
  const [visitedStops, setVisitedStops] = useState([0]); // Set of unlocked stops (start with stop 0 unlocked)
  const [selectedPortModal, setSelectedPortModal] = useState(null); // Port being viewed
  const [challengeOption, setChallengeOption] = useState(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const [totalNauticalMiles, setTotalNauticalMiles] = useState(0);
  const [gameScore, setGameScore] = useState(0);
  const [isGrandFinale, setIsGrandFinale] = useState(false);

  const activePort = JOURNEY_STOPS[currentStopIndex];

  // Clean voice on unmount
  useEffect(() => {
    return () => {
      stopVietnameseVoice();
    };
  }, []);

  // Open modal for a port
  const handleOpenPort = (stop, index) => {
    stopVietnameseVoice();
    soundFX.playFlip();
    setSelectedPortModal({ stop, index });
    setChallengeOption(null);
    setIsAnswerChecked(false);
    // Read the harbor challenge question aloud immediately
    speakVietnameseVoice(stop.question);
  };

  // Submit challenge answer
  const handleAnswerSubmit = (optionIndex) => {
    if (challengeOption !== null || !selectedPortModal) return;
    setChallengeOption(optionIndex);
    setIsAnswerChecked(true);

    const isCorrect = optionIndex === selectedPortModal.stop.correctIndex;
    setIsAnswerCorrect(isCorrect);

    if (isCorrect) {
      soundFX.playShipHorn();
      soundFX.playCorrect();
      speakVietnameseVoice("Chính xác! Bạn đã chọn đúng. Con tàu đã cập cảng thành công.");
      setGameScore(prev => prev + 300);
      setTotalNauticalMiles(selectedPortModal.stop.nauticalMiles);

      // If this is the current active stop, advance to next stop
      if (selectedPortModal.index === currentStopIndex) {
        const nextIdx = currentStopIndex + 1;
        if (nextIdx < JOURNEY_STOPS.length) {
          if (!visitedStops.includes(nextIdx)) {
            setVisitedStops(prev => [...prev, nextIdx]);
          }
          setCurrentStopIndex(nextIdx);
        } else {
          // Reached Pác Bó - Victory!
          setIsGrandFinale(true);
          soundFX.playVictory();
          speakVietnameseVoice("Chúc mừng bạn đã hoàn thành xuất sắc hải trình ba mươi năm tìm đường cứu nước!");
          try {
            confetti({
              particleCount: 150,
              spread: 90,
              origin: { y: 0.6 }
            });
          } catch (e) {}
        }
      }
    } else {
      soundFX.playWrong();
      const correctLetter = String.fromCharCode(65 + selectedPortModal.stop.correctIndex);
      const correctText = selectedPortModal.stop.options[selectedPortModal.stop.correctIndex];
      speakVietnameseVoice(`Chưa chính xác! Đáp án đúng là đáp án ${correctLetter}: ${correctText}.`);
    }
  };

  const handleCloseModal = () => {
    stopVietnameseVoice();
    setSelectedPortModal(null);
    setChallengeOption(null);
    setIsAnswerChecked(false);
  };

  const handleRestartJourney = () => {
    stopVietnameseVoice();
    soundFX.playShipHorn();
    setCurrentStopIndex(0);
    setVisitedStops([0]);
    setSelectedPortModal(null);
    setChallengeOption(null);
    setIsAnswerChecked(false);
    setTotalNauticalMiles(0);
    setGameScore(0);
    setIsGrandFinale(false);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      
      {/* Header bar: Nautical Compass & Voyage Log */}
      <div className="bg-[#17100a]/90 backdrop-blur-md p-4 sm:p-5 rounded-3xl border border-amber-600/30 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-700 to-yellow-600 border border-amber-400/60 flex items-center justify-center shadow-lg text-stone-950">
            <Compass className="w-6 h-6 animate-spin-slow text-yellow-200" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs uppercase tracking-widest font-black text-amber-400 bg-amber-950/80 px-2.5 py-0.5 rounded-full border border-amber-500/40">
                TRẠM {currentStopIndex + 1} / {JOURNEY_STOPS.length}
              </span>
              <span className="text-xs text-stone-400 font-serif">Hành trình 30 năm (1911 - 1941)</span>
            </div>
            <h3 className="text-base sm:text-lg font-serif font-bold text-amber-100 flex items-center gap-1.5 mt-0.5">
              <span>Bản Đồ Hải Trình Vạn Dặm Tương Tác</span>
            </h3>
          </div>
        </div>

        {/* Nautical Progress stats */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <div className="bg-stone-900/90 border border-amber-900/60 px-3.5 py-1.5 rounded-2xl text-center shadow-inner">
            <div className="text-[10px] text-stone-400 uppercase font-semibold">Hải lý tích lũy</div>
            <div className="text-base font-black font-mono text-cyan-300">
              {totalNauticalMiles.toLocaleString()} <span className="text-[10px] text-stone-400 font-normal">hl</span>
            </div>
          </div>

          <div className="bg-stone-900/90 border border-amber-900/60 px-3.5 py-1.5 rounded-2xl text-center shadow-inner">
            <div className="text-[10px] text-stone-400 uppercase font-semibold">Điểm hải trình</div>
            <div className="text-base font-black font-mono text-yellow-400">{gameScore}</div>
          </div>

          <button
            onClick={handleRestartJourney}
            className="p-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-300 hover:text-white transition-all text-xs"
            title="Bắt đầu lại hải trình"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ================= INTERACTIVE VOYAGE MAP CANVAS ================= */}
      <div className="relative w-full rounded-3xl overflow-hidden border-2 border-amber-600/50 shadow-2xl bg-[#0f171e] duocsang-card">
        
        {/* Ocean Background with Stylized Latitude / Longitude Grid */}
        <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] min-h-[380px] sm:min-h-[460px] overflow-hidden select-none bg-gradient-to-b from-[#0a1118] via-[#0d1622] to-[#121c29]">
          
          {/* Subtle Nautical Compass Rose in Background */}
          <div className="absolute top-6 right-8 w-32 h-32 sm:w-48 sm:h-48 opacity-10 pointer-events-none text-amber-300">
            <Compass className="w-full h-full animate-spin-slow" />
          </div>

          {/* Stylized Continents Outlines SVG & Nautical Route */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              {/* Glowing Route Gradient */}
              <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="50%" stopColor="#ef4444" />
                <stop offset="100%" stopColor="#eab308" />
              </linearGradient>

              {/* Ocean Grid Pattern */}
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(217, 119, 6, 0.07)" strokeWidth="0.2" />
              </pattern>
            </defs>

            {/* Grid overlay */}
            <rect width="100" height="100" fill="url(#grid)" />

            {/* Approximate Silhouette of World Continents for Historical Maritime Atmosphere */}
            {/* Eurasia / Africa / Americas soft decorative shapes */}
            <path 
              d="M 40,20 Q 55,15 75,22 Q 88,30 85,55 Q 75,70 65,55 Q 55,45 42,40 Z" 
              fill="rgba(40, 55, 71, 0.35)" 
              stroke="rgba(217, 119, 6, 0.25)" 
              strokeWidth="0.3"
            />
            <path 
              d="M 18,22 Q 32,20 35,38 Q 28,55 18,45 Z" 
              fill="rgba(40, 55, 71, 0.3)" 
              stroke="rgba(217, 119, 6, 0.2)" 
              strokeWidth="0.3"
            />
            <path 
              d="M 45,45 Q 55,45 52,65 Q 48,78 42,60 Z" 
              fill="rgba(40, 55, 71, 0.25)" 
              stroke="rgba(217, 119, 6, 0.2)" 
              strokeWidth="0.3"
            />

            {/* Nautical Route Waypoint Line connecting stops */}
            {JOURNEY_STOPS.map((stop, idx) => {
              if (idx === 0) return null;
              const prev = JOURNEY_STOPS[idx - 1];
              const isPassed = visitedStops.includes(idx);
              return (
                <line
                  key={idx}
                  x1={`${prev.mapX}%`}
                  y1={`${prev.mapY}%`}
                  x2={`${stop.mapX}%`}
                  y2={`${stop.mapY}%`}
                  stroke={isPassed ? "url(#routeGradient)" : "rgba(120, 113, 108, 0.35)"}
                  strokeWidth={isPassed ? "0.6" : "0.3"}
                  strokeDasharray={isPassed ? "1, 0.6" : "0.8, 0.8"}
                  className={isPassed ? "animate-pulse" : ""}
                />
              );
            })}
          </svg>

          {/* Interactive Port Waypoint Pins */}
          {JOURNEY_STOPS.map((stop, index) => {
            const isCurrent = index === currentStopIndex;
            const isUnlocked = visitedStops.includes(index);
            const isPassed = isUnlocked && !isCurrent;

            return (
              <div
                key={stop.id}
                style={{ left: `${stop.mapX}%`, top: `${stop.mapY}%` }}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20 group cursor-pointer"
                onClick={() => handleOpenPort(stop, index)}
              >
                {/* Pulsing Radar Ring for Active Port */}
                {isCurrent && (
                  <div className="absolute inset-0 -m-3 rounded-full bg-amber-400/30 animate-ping pointer-events-none" />
                )}

                {/* Waypoint Marker Pin */}
                <div className={`relative w-8 h-8 sm:w-10 sm:h-10 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-xl ${
                  isCurrent
                    ? 'bg-gradient-to-tr from-amber-600 to-yellow-400 border-2 border-yellow-200 text-stone-950 scale-110 shadow-amber-500/50'
                    : isPassed
                    ? 'bg-[#1b2b3a] border border-amber-400/80 text-yellow-400 hover:scale-105'
                    : 'bg-stone-900/90 border border-stone-700 text-stone-500 opacity-70 hover:opacity-100'
                }`}>
                  {isCurrent ? (
                    <Ship className="w-5 h-5 text-stone-950 animate-bounce" />
                  ) : isPassed ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Anchor className="w-4 h-4 text-stone-400" />
                  )}

                  {/* Stop Number Tag */}
                  <span className={`absolute -bottom-2 -right-1 text-[9px] font-black font-mono px-1 rounded ${
                    isCurrent ? 'bg-black text-yellow-300' : 'bg-stone-800 text-stone-300'
                  }`}>
                    #{index + 1}
                  </span>
                </div>

                {/* Port Hover Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:flex flex-col items-center pointer-events-none whitespace-nowrap z-30">
                  <div className="px-3 py-1.5 rounded-xl bg-black/90 border border-amber-400/80 text-center shadow-2xl backdrop-blur-md">
                    <div className="text-[11px] font-bold text-amber-200">{stop.city}</div>
                    <div className="text-[9px] text-stone-400 font-serif">{stop.year} - {stop.country}</div>
                  </div>
                  <div className="w-2 h-2 bg-black border-r border-b border-amber-400 rotate-45 -mt-1" />
                </div>
              </div>
            );
          })}

          {/* Active Ship Status HUD at Map Bottom */}
          <div className="absolute bottom-3 left-3 right-3 z-30 bg-[#121a22]/90 backdrop-blur-md p-3 sm:p-4 rounded-2xl border border-amber-500/40 shadow-xl flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-amber-950/80 border border-amber-500/60 flex items-center justify-center text-yellow-300">
                <Ship className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] text-amber-400 uppercase font-black tracking-wider">
                  CẢNG ĐẾN HIỆN TẠI: #{currentStopIndex + 1}
                </div>
                <div className="text-sm sm:text-base font-serif font-bold text-amber-100 flex items-center space-x-2">
                  <span>{activePort.city}</span>
                  <span className="text-xs text-stone-400 font-normal">({activePort.year})</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleOpenPort(activePort, currentStopIndex)}
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 text-stone-950 font-black text-xs tracking-wider uppercase flex items-center space-x-2 shadow-lg hover:scale-105 active:scale-95 transition-all"
              >
                <span>CẬP CẢNG & THỬ THÁCH</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* ================= VOYAGE TIMELINE STRIP ================= */}
      <div className="p-4 rounded-3xl bg-[#1b120a]/80 border border-amber-900/60 space-y-3">
        <div className="flex items-center justify-between text-xs text-amber-300 font-serif">
          <span className="font-bold uppercase tracking-wider flex items-center space-x-1.5">
            <Navigation className="w-4 h-4 text-amber-400" />
            <span>Mốc Son Hải Trình (1911 - 1941)</span>
          </span>
          <span>Đã vượt qua: {visitedStops.length} / {JOURNEY_STOPS.length} trạm</span>
        </div>

        {/* Scrollable Waypoints Ribbon */}
        <div className="flex items-center space-x-2.5 overflow-x-auto pb-2 pt-1 scrollbar-thin">
          {JOURNEY_STOPS.map((stop, idx) => {
            const isUnlocked = visitedStops.includes(idx);
            const isCurrent = idx === currentStopIndex;
            return (
              <button
                key={stop.id}
                onClick={() => handleOpenPort(stop, idx)}
                className={`flex-shrink-0 px-3.5 py-2 rounded-2xl border text-left transition-all ${
                  isCurrent 
                    ? 'bg-amber-950 border-amber-400 text-amber-200 ring-2 ring-amber-500/40 shadow-lg' 
                    : isUnlocked 
                    ? 'bg-stone-900/80 border-amber-800/60 text-stone-300 hover:border-amber-600' 
                    : 'bg-stone-950 border-stone-800 text-stone-600 opacity-60'
                }`}
              >
                <div className="text-[10px] font-mono text-amber-400 font-bold">Trạm #{idx + 1} - {stop.year}</div>
                <div className="text-xs font-serif font-bold truncate max-w-[130px]">{stop.city}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ================= MODAL: PORT LOG & MARITIME CHALLENGE ================= */}
      {selectedPortModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="duocsang-card max-w-2xl w-full rounded-3xl p-6 sm:p-8 border-2 border-amber-500/70 shadow-2xl relative space-y-5 max-h-[92vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-amber-900/60 pb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-950 border border-amber-400 flex items-center justify-center text-yellow-300">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-amber-400 uppercase font-black tracking-wider block">
                    NHẬT KÝ HẢI TRÌNH - TRẠM #{selectedPortModal.index + 1}
                  </span>
                  <h4 className="text-base sm:text-lg font-serif font-bold text-amber-100">
                    {selectedPortModal.stop.city} ({selectedPortModal.stop.year})
                  </h4>
                </div>
              </div>

              <button
                onClick={handleCloseModal}
                className="text-stone-400 hover:text-white p-1 rounded-lg hover:bg-stone-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Historical Photo & Narrative */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
              <div className="sm:col-span-5 h-44 rounded-2xl overflow-hidden border border-amber-600/40 bg-black shadow-md">
                <img 
                  src={selectedPortModal.stop.imageUrl} 
                  alt={selectedPortModal.stop.city}
                  className="w-full h-full object-cover" 
                />
              </div>

              <div className="sm:col-span-7 space-y-2 text-xs font-serif leading-relaxed text-stone-200">
                <div className="flex items-center space-x-2 text-[11px] text-amber-300 font-bold">
                  <span>Vai trò: {selectedPortModal.stop.roleTitle}</span>
                </div>
                <p>{selectedPortModal.stop.narrative}</p>
                <blockquote className="p-2.5 rounded-xl bg-amber-950/40 border-l-2 border-amber-500 text-[11px] italic text-amber-200 font-serif">
                  {selectedPortModal.stop.quote}
                </blockquote>
              </div>
            </div>

            {/* Port Challenge: "Thử Thách Vượt Sóng Cập Cảng" */}
            <div className="pt-2 border-t border-amber-900/60 space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-amber-400">
                  <Shield className="w-4 h-4 text-yellow-400" />
                  <span>Thử Thách Cập Cảng Để Nhổ Neo Tiếp Tục Hải Trình</span>
                </div>
                <button
                  onClick={() => speakVietnameseVoice(selectedPortModal.stop.question)}
                  className="px-2.5 py-1 rounded-xl bg-amber-950/80 hover:bg-amber-900 border border-amber-500/50 text-yellow-300 hover:text-white transition-all flex items-center space-x-1.5 text-xs shadow-sm hover:scale-105"
                  title="Nghe lại câu hỏi"
                >
                  <Volume2 className="w-3.5 h-3.5 text-yellow-400" />
                  <span className="font-serif">Đọc lại</span>
                </button>
              </div>

              <p className="text-xs sm:text-sm font-serif font-semibold text-amber-100">
                {selectedPortModal.stop.question}
              </p>

              {/* Options */}
              <div className="space-y-2 pt-1">
                {selectedPortModal.stop.options.map((opt, idx) => {
                  const isSelected = challengeOption === idx;
                  const isCorrect = idx === selectedPortModal.stop.correctIndex;
                  let style = "bg-stone-900/90 hover:bg-stone-800 border-stone-800 text-stone-200";

                  if (isAnswerChecked) {
                    if (isCorrect) {
                      style = "bg-emerald-950 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500/50";
                    } else if (isSelected && !isCorrect) {
                      style = "bg-rose-950 border-rose-500 text-rose-200";
                    } else {
                      style = "bg-stone-900/40 border-stone-800 text-stone-500 opacity-60";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={isAnswerChecked}
                      onClick={() => handleAnswerSubmit(idx)}
                      className={`w-full p-3 rounded-2xl border text-left text-xs font-serif flex items-start space-x-3 transition-all ${style}`}
                    >
                      <span className="w-5 h-5 rounded-lg bg-black/50 border border-amber-600/40 flex items-center justify-center text-xs font-bold text-amber-300 flex-shrink-0 mt-0.5">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="flex-grow leading-relaxed">{opt}</span>
                    </button>
                  );
                })}
              </div>

              {/* Feedback */}
              {isAnswerChecked && (
                <div className={`p-4 rounded-2xl border text-xs font-serif leading-relaxed animate-fadeIn ${
                  isAnswerCorrect 
                    ? 'bg-emerald-950/80 border-emerald-600/60 text-emerald-200' 
                    : 'bg-rose-950/80 border-rose-600/60 text-rose-200'
                }`}>
                  <div className="font-bold uppercase text-[11px] mb-1 flex items-center space-x-1.5">
                    {isAnswerCorrect ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>CHÍNH XÁC! TÀU ĐÃ CẬP CẢNG THÀNH CÔNG (+300 ĐIỂM)</span>
                      </>
                    ) : (
                      <>
                        <X className="w-4 h-4 text-rose-400" />
                        <span>CHƯA CHÍNH XÁC! HÃY NGHIÊN CỨU LẠI NHẬT KÝ</span>
                      </>
                    )}
                  </div>
                  <p>{selectedPortModal.stop.explanation}</p>
                </div>
              )}

              <div className="flex justify-end pt-2">
                <button
                  onClick={handleCloseModal}
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-600 to-yellow-500 text-stone-950 font-bold text-xs tracking-wider uppercase shadow-md hover:scale-105 transition-all"
                >
                  TIẾP TỤC HẢI TRÌNH
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* ================= MODAL: GRAND FINALE (REACHED PÁC BÓ) ================= */}
      {isGrandFinale && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="duocsang-card max-w-xl w-full rounded-3xl p-6 sm:p-8 border-2 border-yellow-400 shadow-2xl text-center space-y-5">
            <div className="w-16 h-16 mx-auto rounded-full bg-yellow-400/20 border-2 border-yellow-400 flex items-center justify-center text-yellow-300 animate-bounce">
              <Trophy className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <span className="text-xs uppercase font-black tracking-widest text-amber-400 bg-amber-950 px-3 py-1 rounded-full border border-amber-500">
                VINH DANH ĐẠI HOA TIÊU LỊCH SỬ
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-black text-amber-100 pt-2">
                HẢI TRÌNH 30 NĂM ĐÃ HOÀN TẤT VẺ VANG!
              </h3>
              <p className="text-xs text-stone-300 font-serif leading-relaxed max-w-md mx-auto pt-1">
                Chúc mừng bạn đã vượt qua toàn bộ 10 mốc son lịch sử trên khắp thế giới để cùng Người trở về Pác Bó (Cao Bằng) - nơi bình minh độc lập bắt đầu bừng sáng!
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-600/50 text-xs italic text-amber-200 font-serif leading-relaxed">
              “Sáng ra bờ suối, tối vào hang / Cháo bẹ rau măng vẫn sẵn sàng / Bàn đá chông chênh dịch sử Đảng / Cuộc đời cách mạng thật là sang.”
            </div>

            <div className="flex justify-center space-x-3 pt-2">
              <button
                onClick={handleRestartJourney}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 text-stone-950 font-black text-xs tracking-wider uppercase shadow-xl hover:scale-105 transition-all"
              >
                KHÁM PHÁ LẠI TỪ ĐẦU
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
