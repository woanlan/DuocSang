import React, { useState } from 'react';
import { 
  Compass, 
  Anchor, 
  Globe, 
  Mountain, 
  Flag, 
  Shield, 
  HeartHandshake, 
  MapPin, 
  Calendar, 
  ChevronRight, 
  ChevronLeft,
  Flame,
  X,
  ArrowRight,
  BookOpen,
  Ship,
  Navigation,
  Sparkles,
  Award,
  Camera,
  Landmark,
  Quote,
  Lightbulb
} from 'lucide-react';

const landmarkStations = [
  {
    id: "lang-sen",
    num: "01",
    name: "Làng Sen",
    country: "Nghệ An, Việt Nam",
    continent: "Châu Á",
    period: "1890",
    years: "1890 - 1895",
    alias: "Nguyễn Sinh Cung",
    transport: "Đi bộ, đò ngang",
    stage: "stage-1",
    eraIndex: 0,
    headline: "Cội nguồn quê hương xứ Nghệ",
    summary: "Nơi cậu bé Nguyễn Sinh Cung cất tiếng khóc chào đời và nuôi dưỡng tâm hồn yêu nước trong câu ca ví giặm bên nếp nhà tranh mộc mạc làng Sen.",
    highlight: "Khởi nguồn của một nhân cách vĩ đại",
    imageUrl: "/images/timeline/lang-sen-que-bac.png"
  },
  {
    id: "hue",
    num: "02",
    name: "Kinh thành Huế",
    country: "Thừa Thiên - Huế",
    continent: "Châu Á",
    period: "1895 - 1909",
    years: "1895 - 1909",
    alias: "Nguyễn Sinh Cung / Nguyễn Tất Thành",
    transport: "Đi bộ vượt đèo Ngang",
    stage: "stage-1",
    eraIndex: 0,
    headline: "Thấm thía nỗi đau mất nước và mất mẹ",
    summary: "Học tập chữ Hán và tiếng Pháp tại trường Quốc học Huế; chứng kiến cảnh đồng bào quằn quại trong phong trào chống sưu thuế Trung Kỳ 1908.",
    highlight: "Quyết tâm từ bỏ con đường cử nghiệp phong kiến",
    imageUrl: "/images/timeline/kinh-thanh-hue.png"
  },
  {
    id: "duc-thanh",
    num: "03",
    name: "Trường Dục Thanh",
    country: "Phan Thiết, Bình Thuận",
    continent: "Châu Á",
    period: "1910",
    years: "09/1910 - 02/1911",
    alias: "Thầy giáo Nguyễn Tất Thành",
    transport: "Tàu hỏa xuyên Việt, xe ngựa",
    stage: "stage-1",
    eraIndex: 0,
    headline: "Gieo mầm ái quốc cho tuổi trẻ",
    summary: "Thầy giáo Thành dạy chữ Quốc ngữ, chữ Pháp và thể dục, truyền lửa tự cường dân tộc cho học trò trước khi bước chân vào Sài Gòn.",
    highlight: "Rèn luyện thể lực và chuẩn bị xuất dương",
    imageUrl: "/images/timeline/truong-duc-thanh.jpg"
  },
  {
    id: "ben-nha-rong",
    num: "04",
    name: "Bến Nhà Rồng",
    country: "Sài Gòn, Việt Nam",
    continent: "Châu Á",
    period: "1911",
    years: "05/06/1911",
    alias: "Văn Ba",
    transport: "Tàu buôn Amiral Latouche-Tréville",
    stage: "stage-1",
    eraIndex: 1,
    headline: "Xuất phát điểm của hải trình 30 năm",
    summary: "Chàng thanh niên Văn Ba nhận công việc phụ bếp nặng nhọc, rời bến cảng Sài Gòn bước ra thế giới bao la để tìm con đường cứu nước đích thực.",
    highlight: "Bước ngoặt mở đầu hành trình vĩ đại",
    imageUrl: "/images/gallery/ben-nha-rong.jpg"
  },
  {
    id: "marseille-paris",
    num: "05",
    name: "Marseille / Paris",
    country: "Cộng hòa Pháp",
    continent: "Châu Âu",
    period: "1911 - 1923",
    years: "1911, 1917 - 1923",
    alias: "Nguyễn Ái Quốc",
    transport: "Tàu buôn vượt Địa Trung Hải",
    stage: "stage-2",
    eraIndex: 1,
    headline: "Đến với Luận cương Lênin & Thành lập ĐCS Pháp",
    summary: "Soạn thảo Bản Yêu sách 8 điểm gửi Hội nghị Versailles 1919; đọc Luận cương Lênin tại ngõ Compoint và bỏ phiếu gia nhập Quốc tế III tại Đại hội Tours 1920.",
    highlight: "Tìm ra con đường giải phóng: Cách mạng Vô sản",
    imageUrl: "/images/gallery/dai-hoi-tours.jpg"
  },
  {
    id: "london",
    num: "06",
    name: "London",
    country: "Vương quốc Anh",
    continent: "Châu Âu",
    period: "1913 - 1917",
    years: "1913 - 1917",
    alias: "Văn Ba",
    transport: "Tàu thủy xuyên eo biển Manche",
    stage: "stage-2",
    eraIndex: 1,
    headline: "Lao động tôi luyện giữa sương mù xứ sương mù",
    summary: "Quét tuyết, đốt lò, phụ bếp tại khách sạn Carlton; học tiếng Anh, tham gia Công đoàn Thủy thủ hải ngoại và nghiên cứu chính trị thế giới.",
    highlight: "Hiểu sâu sắc bản chất giai cấp công nhân quốc tế",
    imageUrl: "/images/timeline/carlton-hotel.jpg"
  },
  {
    id: "boston-new-york",
    num: "07",
    name: "Boston / New York",
    country: "Hoa Kỳ",
    continent: "Châu Mỹ",
    period: "1912 - 1913",
    years: "1912 - 1913",
    alias: "Văn Ba",
    transport: "Tàu buôn vượt Đại Tây Dương",
    stage: "stage-2",
    eraIndex: 1,
    headline: "Tìm hiểu Tuyên ngôn Độc lập Mỹ & khu Harlem",
    summary: "Làm bánh tại khách sạn Parker House (Boston), đến tượng Nữ Thần Tự Do (New York), giao lưu với người da màu bị áp bức tại Harlem.",
    highlight: "Tiếp thu tinh hoa Tuyên ngôn Độc lập Mỹ 1776",
    imageUrl: "/images/timeline/villa-des-gobelins.jpg"
  },
  {
    id: "moskva",
    num: "08",
    name: "Moskva",
    country: "Liên Xô (Nga)",
    continent: "Châu Âu",
    period: "1923 - 1938",
    years: "1923 - 1924 & 1934 - 1938",
    alias: "Nguyễn Ái Quốc / Lin",
    transport: "Tàu biển bí mật từ Đức sang Petrograd",
    stage: "stage-3",
    eraIndex: 2,
    headline: "Thành trì Cách mạng Tháng Mười & Quốc tế III",
    summary: "Dự Đại hội V Quốc tế Cộng sản, học tại Trường Đại học Phương Đông và Viện Nghiên cứu Dân tộc; kiên trì bảo vệ quyền lợi cách mạng thuộc địa.",
    highlight: "Hoàn thiện hệ thống tư tưởng giải phóng dân tộc thuộc địa",
    imageUrl: "/images/timeline/moskva-1924.jpg"
  },
  {
    id: "quang-chau",
    num: "09",
    name: "Quảng Châu",
    country: "Trung Quốc",
    continent: "Châu Á",
    period: "1924 - 1927",
    years: "1924 - 1927",
    alias: "Lý Thụy",
    transport: "Tàu hỏa xuyên lục địa, tàu biển",
    stage: "stage-3",
    eraIndex: 2,
    headline: "Lò đào tạo cán bộ nòng cốt & 'Đường Kách mệnh'",
    summary: "Thành lập Hội Việt Nam Cách mạng Thanh niên tại số 13/1 đường Văn Minh; xuất bản Báo Thanh niên và đào tạo thế hệ lãnh đạo tiên phong.",
    highlight: "Chuẩn bị trực tiếp về tư tưởng và tổ chức cho sự ra đời của Đảng",
    imageUrl: "/images/timeline/duong-kach-menh.jpg"
  },
  {
    id: "huong-cang",
    num: "10",
    name: "Hương Cảng",
    country: "Hong Kong, Trung Quốc",
    continent: "Châu Á",
    period: "1930 - 1933",
    years: "1930 - 1933",
    alias: "Tống Văn Sơ",
    transport: "Tàu biển ven bờ",
    stage: "stage-3",
    eraIndex: 2,
    headline: "Thành lập Đảng & Vụ án Tống Văn Sơ",
    summary: "Chủ trì Hội nghị thành lập Đảng Cộng sản Việt Nam 3/2/1930; vượt qua 20 tháng ngục tù Victoria nhờ sự trợ giúp của luật sư Loseby tiến bộ.",
    highlight: "Sáng lập Đảng Cộng sản Việt Nam & Bản lĩnh kiên cường",
    imageUrl: "/images/timeline/thanh-lap-dang-1930.jpg"
  },
  {
    id: "pac-bo",
    num: "11",
    name: "Pác Bó",
    country: "Cao Bằng, Việt Nam",
    continent: "Châu Á",
    period: "1941",
    years: "28/01/1941",
    alias: "Già Thu / Bác Hồ",
    transport: "Đi bộ đường rừng vượt mốc 108",
    stage: "stage-4",
    eraIndex: 3,
    headline: "Giây phút thiêng liêng sau 30 năm bôn ba",
    summary: "Bác đặt chân về Tổ quốc mùa xuân 1941, ở hang Pác Bó dịch sử Đảng, chỉ đạo Hội nghị Trung ương 8 thành lập Mặt trận Việt Minh giương cao cờ độc lập.",
    highlight: "Chấm dứt 30 năm bôn ba, trực tiếp chỉ huy cách mạng",
    imageUrl: "/images/gallery/pac-bo.jpg"
  },
  {
    id: "tan-trao",
    num: "12",
    name: "Tân Trào",
    country: "Tuyên Quang, Việt Nam",
    continent: "Châu Á",
    period: "1945",
    years: "05/1945 - 08/1945",
    alias: "Hồ Chí Minh",
    transport: "Đi bộ đường rừng, cáng",
    stage: "stage-4",
    eraIndex: 4,
    headline: "Thủ đô Khu Giải phóng & Lệnh Tổng khởi nghĩa",
    summary: "Lán Nà Nưa, Cây đa Tân Trào, Đại hội Quốc dân ban bố Quân lệnh số 1 phát lệnh Tổng khởi nghĩa Cách mạng Tháng Tám giành chính quyền về tay nhân dân.",
    highlight: "Phát lệnh Cách mạng Tháng Tám toàn thắng",
    imageUrl: "/images/timeline/lan-na-nua.jpg"
  },
  {
    id: "quang-truong-ba-dinh",
    num: "13",
    name: "Ba Đình",
    country: "Hà Nội, Việt Nam",
    continent: "Châu Á",
    period: "1945",
    years: "02/09/1945",
    alias: "Chủ tịch Hồ Chí Minh",
    transport: "Ô tô hành quân",
    stage: "stage-4",
    eraIndex: 4,
    headline: "Đọc Tuyên ngôn Độc lập - Khai sinh VNDCCH",
    summary: "Trước 50 vạn đồng bào cờ hoa rợp trời, Chủ tịch Hồ Chí Minh dõng dạc tuyên bố nước Việt Nam có quyền hưởng tự do và độc lập, khai sinh nền cộng hòa.",
    highlight: "Khai sinh nước Việt Nam Dân chủ Cộng hòa",
    imageUrl: "/images/gallery/tuyen-ngon-doc-lap.jpg"
  },
  {
    id: "dien-bien-phu",
    num: "14",
    name: "Điện Biên Phủ",
    country: "Điện Biên, Việt Nam",
    continent: "Châu Á",
    period: "1954",
    years: "1953 - 1954",
    alias: "Chủ tịch Hồ Chí Minh",
    transport: "Chỉ đạo từ căn cứ Định Hóa",
    stage: "stage-4",
    eraIndex: 5,
    headline: "Chiến thắng 'Lừng lẫy năm châu, chấn động địa cầu'",
    summary: "Bác cùng Bộ Chính trị thông qua quyết tâm tác chiến lịch sử; căn dặn Đại tướng Võ Nguyên Giáp 'chắc thắng mới đánh', làm nên thiên sử vàng Điện Biên.",
    highlight: "Xóa sổ chủ nghĩa thực dân cũ tại Đông Dương",
    imageUrl: "/images/gallery/dien-bien-phu.jpg"
  },
  {
    id: "ha-noi",
    num: "15",
    name: "Hà Nội",
    country: "Thủ đô Hà Nội",
    continent: "Châu Á",
    period: "1969",
    years: "1954 - 1969",
    alias: "Bác Hồ kính yêu",
    transport: "Nhà sàn Phủ Chủ tịch & Lăng Bác",
    stage: "stage-4",
    eraIndex: 6,
    headline: "Bản Di chúc Bất tử & Nơi an nghỉ vĩnh hằng",
    summary: "15 năm Bác sống thanh bạch tại Nhà sàn ao cá, viết Di chúc gửi gắm muôn vàn tình thương yêu cho toàn dân tộc, soi sáng con đường độc lập - tự do - hạnh phúc.",
    highlight: "Di sản tư tưởng Hồ Chí Minh sống mãi muôn đời",
    imageUrl: "/images/gallery/lang-bac-ho.jpg"
  }
];

export default function TimelineSection({ timelineData = [] }) {
  const [selectedEraIndex, setSelectedEraIndex] = useState(0);
  const [selectedEventIndex, setSelectedEventIndex] = useState(null);
  const [selectedStationIndex, setSelectedStationIndex] = useState(null);
  const [selectedStageFilter, setSelectedStageFilter] = useState('all');

  const iconMap = {
    Compass: Compass,
    Anchor: Anchor,
    Globe: Globe,
    Mountain: Mountain,
    Flag: Flag,
    Shield: Shield,
    HeartHandshake: HeartHandshake
  };

  if (!timelineData || timelineData.length === 0) return null;

  const currentEra = timelineData[selectedEraIndex] || timelineData[0];
  const EraIcon = iconMap[currentEra.icon] || Compass;
  const selectedEvent = selectedEventIndex !== null && currentEra?.events?.[selectedEventIndex] 
    ? currentEra.events[selectedEventIndex] 
    : null;
  const selectedStation = selectedStationIndex !== null && landmarkStations[selectedStationIndex]
    ? landmarkStations[selectedStationIndex]
    : null;

  const filteredStations = selectedStageFilter === 'all'
    ? landmarkStations
    : landmarkStations.filter(st => st.stage === selectedStageFilter);

  const nextEra = () => {
    if (selectedEraIndex < timelineData.length - 1) {
      setSelectedEraIndex(selectedEraIndex + 1);
      setSelectedEventIndex(null);
    }
  };

  const prevEra = () => {
    if (selectedEraIndex > 0) {
      setSelectedEraIndex(selectedEraIndex - 1);
      setSelectedEventIndex(null);
    }
  };

  const handleNextEvent = () => {
    if (selectedEventIndex !== null && selectedEventIndex < currentEra.events.length - 1) {
      setSelectedEventIndex(selectedEventIndex + 1);
    }
  };

  const handlePrevEvent = () => {
    if (selectedEventIndex !== null && selectedEventIndex > 0) {
      setSelectedEventIndex(selectedEventIndex - 1);
    }
  };

  return (
    <section id="timeline" className="py-20 bg-gradient-to-b from-[#160e08] via-[#21140c] to-[#160e08] border-t border-b border-amber-900/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-5xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-amber-950/70 border border-amber-600/50 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>NGỌN ĐUỐC SOI ĐƯỜNG NON SÔNG</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#f5efe6] tracking-tight whitespace-normal sm:whitespace-nowrap">
            Hành Trình Dựng Nước & Cứu Nước
          </h2>
          <p className="text-stone-300/80 mt-3 text-sm sm:text-base font-serif max-w-3xl mx-auto">
            Khám phá 7 chặng đường lịch sử hào hùng của người thanh niên yêu nước Nguyễn Tất Thành đến vị Lãnh tụ vĩ đại giải phóng dân tộc
          </p>
        </div>

        {/* Horizontal Timeline Eras Bar */}
        <div className="mb-10 overflow-x-auto pb-4 scrollbar-none">
          <div className="flex space-x-2 sm:space-x-3 min-w-max mx-auto justify-center px-2">
            {timelineData.map((era, index) => {
              const Icon = iconMap[era.icon] || Compass;
              const isSelected = selectedEraIndex === index;
              return (
                <button
                  key={era.id}
                  onClick={() => setSelectedEraIndex(index)}
                  className={`px-4 sm:px-5 py-3 rounded-2xl flex items-center space-x-2.5 transition-all text-xs sm:text-sm font-semibold border ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#9c381c] to-[#6d200e] text-[#fbebd0] border-amber-500/80 shadow-lg shadow-black/50 scale-105'
                      : 'bg-[#25170e]/80 hover:bg-[#311f13] text-stone-300 border-amber-900/40'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-amber-300' : 'text-amber-600'}`} />
                  <span>{era.period}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Era Detailed Card */}
        <div className="duocsang-card rounded-3xl p-6 sm:p-10 mb-10 transition-all border border-amber-700/40 relative">
          
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-amber-900/40">
            <div className="flex items-start space-x-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/25 via-amber-900/40 to-[#120a05] border border-amber-500/40 flex items-center justify-center text-amber-300 shadow-xl shrink-0">
                <EraIcon className="w-7 h-7 text-amber-300" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-900/60 text-amber-200 border border-amber-600/40">
                    {currentEra.badge}
                  </span>
                  <span className="text-xs font-semibold text-stone-400 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    {currentEra.period}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#f5efe6] mt-1">
                  {currentEra.title}
                </h3>
                <p className="text-amber-200/90 font-serif italic text-sm sm:text-base mt-1">
                  {currentEra.subtitle}
                </p>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 px-4 py-2.5 bg-[#1f130a] rounded-2xl border border-amber-800/40 text-amber-200 text-xs sm:text-sm font-medium self-start">
              <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
              <span>{currentEra.location}</span>
            </div>
          </div>

          {/* Era Summary */}
          <div className="my-6 p-5 rounded-2xl bg-[#1b1008] border-l-4 border-amber-500 text-stone-200 text-sm sm:text-base leading-relaxed font-serif">
            {currentEra.summary}
          </div>

          {/* Events List */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                <span>CÁC DẤU MỐC LỊCH SỬ TIÊU BIỂU:</span>
              </h4>
              <div className="inline-flex items-center gap-1.5 text-[11px] text-amber-300 font-serif bg-amber-950/70 px-3 py-1 rounded-full border border-amber-800/40 shadow-inner">
                <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                <span>Bấm vào từng dấu mốc để xem hình ảnh & tư liệu chi tiết</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentEra.events.map((evt, idx) => (
                <div 
                  key={evt.id || idx}
                  onClick={() => setSelectedEventIndex(idx)}
                  className="p-5 rounded-2xl bg-[#1d120a]/90 border border-amber-900/40 hover:border-amber-500/80 transition-all cursor-pointer group hover:shadow-xl hover:shadow-amber-950/60 hover:bg-[#25170e] relative flex flex-col justify-between"
                  title="Bấm để xem tư liệu lịch sử chi tiết"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-amber-900/50 text-amber-200 border border-amber-700/40">
                        {evt.date}
                      </span>
                      <span className="text-[11px] text-amber-400 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        <span>Chi tiết tư liệu</span>
                        <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                      </span>
                    </div>

                    <h5 className="font-serif font-bold text-[#f5efe6] text-base mb-1.5 group-hover:text-amber-300 transition-colors">
                      {evt.name}
                    </h5>

                    <p className="text-stone-300/80 text-xs sm:text-sm leading-relaxed line-clamp-3">
                      {evt.description}
                    </p>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-amber-900/30 flex items-center justify-between text-[11px] text-stone-400">
                    <span className="flex items-center gap-1 text-amber-400/90 break-words">
                      <MapPin className="w-3 h-3 text-amber-500 shrink-0" />
                      <span>{evt.location || currentEra.location}</span>
                    </span>
                    <span className="text-amber-300 font-medium group-hover:underline flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                      <span>Mở tư liệu</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination Navigation */}
          <div className="flex items-center justify-between pt-6 mt-8 border-t border-amber-900/40">
            <button
              onClick={prevEra}
              disabled={selectedEraIndex === 0}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 border transition-all ${
                selectedEraIndex === 0
                  ? 'opacity-40 cursor-not-allowed bg-transparent text-stone-500 border-stone-800'
                  : 'bg-[#2b1b11] hover:bg-[#382316] text-stone-200 border-amber-800/60 cursor-pointer'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Chặng trước</span>
            </button>

            <span className="text-xs font-semibold text-stone-400">
              Chặng <strong className="text-amber-300 font-bold">{selectedEraIndex + 1}</strong> / {timelineData.length}
            </span>

            <button
              onClick={nextEra}
              disabled={selectedEraIndex === timelineData.length - 1}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 border transition-all ${
                selectedEraIndex === timelineData.length - 1
                  ? 'opacity-40 cursor-not-allowed bg-transparent text-stone-500 border-stone-800'
                  : 'bg-[#2b1b11] hover:bg-[#382316] text-stone-200 border-amber-800/60 cursor-pointer'
              }`}
            >
              <span>Chặng sau</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bản Đồ Số Tương Tác & 15 Trạm Dừng Chân Lịch Sử (Upgraded Journey Map) */}
        <div id="journey-map" className="rounded-3xl bg-[#1c120a] p-6 sm:p-10 border border-amber-700/50 shadow-2xl relative overflow-hidden">
          
          {/* Subtle decorative glow in background */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-8 relative z-10">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-amber-950/80 border border-amber-600/50 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-2.5 shadow-inner">
              <Navigation className="w-3.5 h-3.5 text-amber-400" />
              <span>HẢI TRÌNH 30 NĂM QUA 3 ĐẠI DƯƠNG, 4 CHÂU LỤC</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#f5efe6] tracking-tight">
              Bản Đồ Số Tương Tác: 15 Trạm Dừng Chân Lịch Sử
            </h3>
            <p className="text-xs sm:text-sm text-stone-300/80 mt-2 font-serif">
              Bấm vào từng trạm dừng chân để khám phá tọa độ, phương tiện con tàu Bác đã đi, bí danh và hoạt động cách mạng của Người
            </p>
          </div>

          {/* Stage Filter Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8 relative z-10">
            {[
              { id: 'all', label: 'Tất cả 15 Trạm (1890 - 1969)', icon: Compass },
              { id: 'stage-1', label: 'Trong nước (1890 - 1911)', icon: MapPin },
              { id: 'stage-2', label: 'Vượt đại dương (1911 - 1920)', icon: Ship },
              { id: 'stage-3', label: 'Quốc tế Cộng sản (1920 - 1940)', icon: Globe },
              { id: 'stage-4', label: 'Trở về & Thắng lợi (1941 - 1969)', icon: Award }
            ].map((f) => {
              const FilterIcon = f.icon;
              const isSelected = selectedStageFilter === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => setSelectedStageFilter(f.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-amber-500 text-stone-950 font-bold shadow-md shadow-amber-950/60 scale-105'
                      : 'bg-[#26170e] text-stone-300 hover:text-amber-200 border border-amber-900/40 hover:border-amber-700'
                  }`}
                >
                  <FilterIcon className={`w-3.5 h-3.5 ${isSelected ? 'text-stone-950' : 'text-amber-400'}`} />
                  <span>{f.label}</span>
                </button>
              );
            })}
          </div>

          {/* Interactive Stepper Track (15 Stations) */}
          <div className="relative z-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
              {filteredStations.map((station) => {
                const originalIndex = landmarkStations.findIndex(s => s.id === station.id);
                const isSelected = selectedStationIndex === originalIndex;

                return (
                  <div
                    key={station.id}
                    onClick={() => setSelectedStationIndex(originalIndex)}
                    className={`rounded-2xl p-4 border transition-all cursor-pointer group flex flex-col justify-between relative ${
                      isSelected
                        ? 'bg-gradient-to-br from-[#381c0f] to-[#1c0f08] border-amber-400 ring-2 ring-amber-400/40 shadow-xl shadow-amber-950/70 scale-[1.02]'
                        : 'bg-[#22140a]/90 border-amber-800/40 hover:border-amber-500 hover:bg-[#2b180d] hover:shadow-lg hover:shadow-black/50'
                    }`}
                  >
                    <div>
                      {/* Station Number & Continent Badge */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="w-7 h-7 rounded-lg bg-amber-950/90 text-amber-300 border border-amber-700/50 text-xs font-bold flex items-center justify-center shrink-0">
                          {station.num}
                        </span>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-black/50 text-amber-300/90 border border-amber-900/40 truncate">
                          {station.continent}
                        </span>
                      </div>

                      {/* Station Name */}
                      <h5 className="font-serif font-bold text-base text-[#f5efe6] group-hover:text-amber-300 transition-colors line-clamp-1">
                        {station.name}
                      </h5>

                      {/* Year & Country */}
                      <div className="text-[11px] text-amber-400 font-semibold mt-0.5">
                        {station.period} • {station.country}
                      </div>

                      {/* Headline */}
                      <p className="text-xs text-stone-300/80 font-serif line-clamp-2 mt-2 leading-relaxed">
                        {station.headline}
                      </p>
                    </div>

                    {/* Bottom CTA */}
                    <div className="mt-3 pt-2 border-t border-amber-900/30 flex items-center justify-between text-[11px] text-stone-400">
                      <span className="text-amber-400/80 truncate max-w-[120px] italic">
                        {station.alias}
                      </span>
                      <span className="text-amber-300 font-semibold flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                        <span>Chi tiết</span>
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-stone-400 font-serif relative z-10 text-center">
            <Lightbulb className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Mẹo: Bấm vào từng trạm dừng chân ở trên để xem trọn vẹn thông tin tư liệu, con tàu di chuyển và chuyển nhanh đến chặng lịch sử tương ứng.</span>
          </div>

        </div>

        {/* Station Spotlight Modal */}
        {selectedStation && (
          <div 
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn"
            onClick={() => setSelectedStationIndex(null)}
          >
            <div 
              className="bg-[#1c120a] rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-amber-600/70 text-[#f5efe6] relative my-auto scrollbar-thin scrollbar-thumb-amber-800"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 z-20 bg-gradient-to-r from-[#7a2810] via-[#4d170a] to-[#250d06] p-4 sm:p-6 border-b border-amber-500/40 flex items-start justify-between gap-4 shadow-lg">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-black/60 text-amber-300 border border-amber-600/50">
                      Trạm số {selectedStation.num} / 15
                    </span>
                    <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-amber-500 text-stone-950">
                      {selectedStation.continent} • {selectedStation.country}
                    </span>
                  </div>
                  <h3 className="font-serif font-bold text-2xl sm:text-3xl text-white">
                    {selectedStation.name} ({selectedStation.period})
                  </h3>
                </div>

                <button
                  onClick={() => setSelectedStationIndex(null)}
                  className="p-2 rounded-full bg-black/40 hover:bg-white/20 text-white transition-colors shrink-0 cursor-pointer"
                  aria-label="Đóng"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-5 sm:p-8 space-y-6">
                
                {/* Photo if available */}
                {selectedStation.imageUrl && (
                  <div className="rounded-2xl overflow-hidden border border-amber-800/50 bg-black shadow-lg">
                    <div className="relative aspect-[16/9] overflow-hidden bg-stone-950">
                      <img
                        src={selectedStation.imageUrl}
                        alt={selectedStation.name}
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = '/images/banner-custom.jpg';
                        }}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-4 right-4 text-xs text-amber-200/95 font-serif italic flex items-center gap-1.5">
                        <Camera className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>Địa danh lịch sử: {selectedStation.name} • {selectedStation.country}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Key metadata grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="bg-[#140c06] p-3.5 rounded-xl border border-amber-900/40">
                    <div className="text-[11px] text-amber-400 font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Thời gian:</span>
                    </div>
                    <div className="text-sm font-semibold text-stone-200">
                      {selectedStation.years}
                    </div>
                  </div>

                  <div className="bg-[#140c06] p-3.5 rounded-xl border border-amber-900/40">
                    <div className="text-[11px] text-amber-400 font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
                      <Ship className="w-3.5 h-3.5" />
                      <span>Phương tiện / Con tàu:</span>
                    </div>
                    <div className="text-sm font-semibold text-stone-200 break-words" title={selectedStation.transport}>
                      {selectedStation.transport}
                    </div>
                  </div>

                  <div className="bg-[#140c06] p-3.5 rounded-xl border border-amber-900/40">
                    <div className="text-[11px] text-amber-400 font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Bí danh của Bác:</span>
                    </div>
                    <div className="text-sm font-semibold text-amber-300">
                      {selectedStation.alias}
                    </div>
                  </div>
                </div>

                {/* Headline & Summary */}
                <div className="space-y-3">
                  <h4 className="font-serif font-bold text-xl text-amber-300 border-b border-amber-900/40 pb-2">
                    {selectedStation.headline}
                  </h4>
                  <p className="text-stone-200 text-sm sm:text-base leading-relaxed font-serif whitespace-pre-line">
                    {selectedStation.summary}
                  </p>
                </div>

                {/* Highlight Badge */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-[#2c170d] to-[#1c1008] border border-amber-700/50 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0 border border-amber-500/40">
                    <Flag className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                      Điểm son lịch sử
                    </div>
                    <div className="text-sm font-serif font-semibold text-[#fbebd0]">
                      {selectedStation.highlight}
                    </div>
                  </div>
                </div>

                {/* Action button: Go directly to this Era */}
                <button
                  onClick={() => {
                    setSelectedEraIndex(selectedStation.eraIndex);
                    setSelectedStationIndex(null);
                    document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full py-3 px-5 rounded-2xl duocsang-btn text-amber-100 text-xs sm:text-sm font-bold flex items-center justify-center space-x-2 shadow-lg hover:scale-102 active:scale-95 transition-all cursor-pointer"
                >
                  <Navigation className="w-4 h-4 text-amber-300" />
                  <span>Xem Chi Tiết Chặng Lịch Sử Này Trên Dòng Thời Gian &rarr;</span>
                </button>

              </div>

              {/* Modal Footer with navigation */}
              <div className="sticky bottom-0 z-20 bg-[#140c06] p-4 sm:p-5 border-t border-amber-950 flex items-center justify-between gap-3 shadow-lg">
                <button
                  onClick={() => setSelectedStationIndex(Math.max(0, selectedStationIndex - 1))}
                  disabled={selectedStationIndex === 0}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 border transition-all ${
                    selectedStationIndex === 0
                      ? 'opacity-30 cursor-not-allowed border-stone-800 text-stone-600'
                      : 'bg-[#22140a] hover:bg-[#311c0f] text-amber-300 border-amber-800/60 cursor-pointer'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Trạm trước</span>
                </button>

                <span className="text-xs text-stone-400">
                  {selectedStationIndex + 1} / {landmarkStations.length} trạm
                </span>

                <button
                  onClick={() => setSelectedStationIndex(Math.min(landmarkStations.length - 1, selectedStationIndex + 1))}
                  disabled={selectedStationIndex === landmarkStations.length - 1}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 border transition-all ${
                    selectedStationIndex === landmarkStations.length - 1
                      ? 'opacity-30 cursor-not-allowed border-stone-800 text-stone-600'
                      : 'bg-[#22140a] hover:bg-[#311c0f] text-amber-300 border-amber-800/60 cursor-pointer'
                  }`}
                >
                  <span>Trạm sau</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Historical Event Detail Modal */}
        {selectedEvent && (
          <div 
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn"
            onClick={() => setSelectedEventIndex(null)}
          >
            <div 
              className="bg-[#1c120a] rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-amber-600/70 text-[#f5efe6] relative my-auto scrollbar-thin scrollbar-thumb-amber-800"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 z-20 bg-gradient-to-r from-[#7a2810] via-[#4d170a] to-[#250d06] p-4 sm:p-6 border-b border-amber-500/40 flex items-start justify-between gap-4 shadow-lg">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-black/60 text-amber-300 border border-amber-600/50">
                      {currentEra.badge} ({currentEra.period})
                    </span>
                    <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-amber-500 text-stone-950">
                      {selectedEvent.date}
                    </span>
                  </div>
                  <h3 className="font-serif font-bold text-xl sm:text-2xl text-white">
                    {selectedEvent.name}
                  </h3>
                </div>

                <button
                  onClick={() => setSelectedEventIndex(null)}
                  className="p-2 rounded-full bg-black/40 hover:bg-white/20 text-white transition-colors shrink-0 cursor-pointer"
                  aria-label="Đóng cửa sổ"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-5 sm:p-8 space-y-6">
                
                {/* Historical Photo with verified caption */}
                {selectedEvent.imageUrl && (
                  <div className="rounded-2xl overflow-hidden border border-amber-800/50 bg-black shadow-lg">
                    <div className="relative aspect-[16/9] sm:aspect-[21/9] overflow-hidden bg-stone-950">
                      <img
                        src={selectedEvent.imageUrl}
                        alt={selectedEvent.name}
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = '/images/banner-custom.jpg';
                        }}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-4 right-4 text-xs text-amber-200/95 font-serif italic flex items-center gap-1.5">
                        <Camera className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>{selectedEvent.imageCaption || `Ảnh tư liệu lịch sử: ${selectedEvent.name}`}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Location Badge */}
                <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-stone-300 bg-[#160d07] p-3.5 rounded-xl border border-amber-900/40">
                  <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
                    <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>Địa danh lịch sử:</span>
                  </div>
                  <span className="text-amber-200 font-medium">
                    {selectedEvent.location || currentEra.location}
                  </span>
                </div>

                {/* Historical Context (Bối cảnh lịch sử) */}
                {selectedEvent.historicalContext && (
                  <div className="p-4 sm:p-5 rounded-2xl bg-[#23150c] border-l-4 border-amber-600 text-sm leading-relaxed">
                    <h4 className="font-bold text-amber-400 uppercase tracking-wider text-xs mb-1.5 flex items-center gap-1.5">
                      <Landmark className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>Bối cảnh lịch sử:</span>
                    </h4>
                    <p className="text-stone-300 font-serif leading-relaxed">
                      {selectedEvent.historicalContext}
                    </p>
                  </div>
                )}

                {/* Detailed Historical Documentation (Diễn biến chi tiết) */}
                <div className="space-y-3">
                  <h4 className="font-serif font-bold text-lg text-amber-300 flex items-center gap-2 border-b border-amber-900/40 pb-2">
                    <BookOpen className="w-5 h-5 text-amber-400" />
                    <span>Tư liệu lịch sử chi tiết & Hoạt động cách mạng:</span>
                  </h4>
                  <div className="text-stone-200 text-sm sm:text-base leading-relaxed font-serif space-y-3 whitespace-pre-line">
                    {selectedEvent.detailedContent || selectedEvent.description}
                  </div>
                </div>

                {/* Historical Significance (Ý nghĩa lịch sử) */}
                {selectedEvent.significance && (
                  <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#2c170d] to-[#1c1008] border border-amber-700/50">
                    <h4 className="font-bold text-amber-300 text-xs uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>Ý nghĩa & Tầm vóc lịch sử:</span>
                    </h4>
                    <p className="text-stone-300 text-sm font-serif leading-relaxed">
                      {selectedEvent.significance}
                    </p>
                  </div>
                )}

                {/* Quote (Lời Người để lại) */}
                {selectedEvent.quote && (
                  <div className="p-5 rounded-2xl bg-[#140c06] border-l-4 border-amber-500 font-serif italic text-amber-200 text-sm sm:text-base leading-relaxed shadow-inner">
                    "{selectedEvent.quote}"
                  </div>
                )}

              </div>

              {/* Modal Footer with navigation */}
              <div className="sticky bottom-0 z-20 bg-[#140c06] p-4 sm:p-5 border-t border-amber-950 flex items-center justify-between gap-3 shadow-lg">
                <button
                  onClick={handlePrevEvent}
                  disabled={selectedEventIndex === 0}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 border transition-all ${
                    selectedEventIndex === 0
                      ? 'opacity-30 cursor-not-allowed border-stone-800 text-stone-600'
                      : 'bg-[#22140a] hover:bg-[#311c0f] text-amber-300 border-amber-800/60 cursor-pointer'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Dấu mốc trước</span>
                </button>

                <span className="text-xs text-stone-400">
                  {selectedEventIndex + 1} / {currentEra.events.length} dấu mốc
                </span>

                <button
                  onClick={handleNextEvent}
                  disabled={selectedEventIndex === currentEra.events.length - 1}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 border transition-all ${
                    selectedEventIndex === currentEra.events.length - 1
                      ? 'opacity-30 cursor-not-allowed border-stone-800 text-stone-600'
                      : 'bg-[#22140a] hover:bg-[#311c0f] text-amber-300 border-amber-800/60 cursor-pointer'
                  }`}
                >
                  <span>Dấu mốc sau</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
