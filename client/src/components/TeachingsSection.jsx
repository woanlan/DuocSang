import React, { useState } from 'react';
import { Bookmark, Sparkles, Heart, Users, ShieldCheck, Shuffle, BookCheck, Star, Award } from 'lucide-react';

export default function TeachingsSection({ teachingsData }) {
  const [activeTab, setActiveTab] = useState('five');
  const [randomQuoteIndex, setRandomQuoteIndex] = useState(0);

  const { fiveTeachings = [], youthTeachings = {}, moralPrinciples = [], testamentExcerpts = [], famousQuotes = [] } = teachingsData || {};

  const shuffleQuote = () => {
    if (famousQuotes.length > 1) {
      let nextIndex;
      try {
        do {
          nextIndex = Math.floor(Math.random() * famousQuotes.length);
        } while (nextIndex === randomQuoteIndex);
      } catch (e) {
        nextIndex = (randomQuoteIndex + 1) % famousQuotes.length;
      }
      setRandomQuoteIndex(nextIndex);
    }
  };

  const currentQuote = famousQuotes[randomQuoteIndex] || famousQuotes[0];

  if (!teachingsData) return null;

  return (
    <section id="teachings" className="py-20 bg-gradient-to-b from-[#160e08] via-[#20140b] to-[#160e08] border-t border-b border-amber-900/40 relative">
      {/* Decorative subtle ambient warm glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-5xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-amber-950/70 border border-amber-600/50 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>NGỌN ĐUỐC SOI ĐƯỜNG CỦA DÂN TỘC</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#f5efe6] tracking-tight whitespace-normal sm:whitespace-nowrap">
            Tư Tưởng & Lời Dạy Của Bác
          </h2>
          <p className="text-stone-300/80 mt-3 text-sm sm:text-base font-serif max-w-4xl mx-auto leading-relaxed">
            Hệ thống tư tưởng nhân văn sâu sắc kết tinh từ truyền thống yêu nước của dân tộc và tinh hoa văn hóa nhân loại
          </p>
        </div>

        {/* Daily Random Quote Widget */}
        {currentQuote && (
          <div className="max-w-4xl mx-auto mb-14 bg-[#1c120a] rounded-3xl p-6 sm:p-10 border border-amber-700/50 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-2.5 h-full bg-gradient-to-b from-amber-500 via-amber-600 to-amber-700" />
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pl-2">
              <div className="space-y-3">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-300 bg-amber-950/80 px-3.5 py-1.5 rounded-full border border-amber-600/40">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span>DANH NGÔN BẤT HỦ ĐỂ SUY NGẪM HÔM NAY</span>
                </span>
                
                <blockquote className="font-serif italic text-2xl sm:text-3xl text-amber-200 font-bold leading-snug">
                  "{currentQuote.quote}"
                </blockquote>
                
                <p className="text-xs sm:text-sm text-stone-400 font-serif italic">
                  {currentQuote.context} — Năm {currentQuote.year}
                </p>
              </div>

              <button
                onClick={shuffleQuote}
                className="self-end sm:self-center shrink-0 px-5 py-3 rounded-2xl duocsang-btn text-amber-100 text-xs font-semibold flex items-center space-x-2 transition-all shadow-md active:scale-95"
              >
                <Shuffle className="w-4 h-4" />
                <span>Đổi Lời Dạy Khác</span>
              </button>
            </div>
          </div>
        )}

        {/* Tabs Bar */}
        <div className="flex justify-center mb-12 overflow-x-auto pb-2">
          <div className="inline-flex p-1.5 rounded-2xl bg-[#140c06] border border-amber-800/50 shadow-xl max-w-full">
            {[
              { id: 'five', label: '5 Điều Bác Hồ Dạy', icon: Heart },
              { id: 'youth', label: 'Lời Dạy Thanh Niên', icon: Users },
              { id: 'moral', label: 'Cần - Kiệm - Liêm - Chính', icon: ShieldCheck },
              { id: 'testament', label: 'Di Chúc Bất Tử', icon: BookCheck },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center space-x-2 transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-stone-950 font-bold shadow-md shadow-amber-900/30'
                      : 'text-stone-300 hover:text-amber-200 hover:bg-[#25170f]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content Display */}
        <div className="max-w-5xl mx-auto">
          
          {/* 1. Five Teachings Tab */}
          {activeTab === 'five' && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-amber-200">
                  5 Điều Bác Hồ Dạy Thiếu Niên Nhi Đồng
                </h3>
                <p className="text-stone-300/80 text-sm mt-1 font-serif">
                  Bài học vỡ lòng thiêng liêng, là kim chỉ nam rèn luyện nhân cách theo suốt cuộc đời mỗi con người Việt Nam
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {fiveTeachings.map((item) => (
                  <div
                    key={item.number}
                    className="p-6 sm:p-7 rounded-3xl bg-[#1c120a] border border-amber-800/40 shadow-xl hover:border-amber-500/70 hover:bg-[#23170e] hover:-translate-y-0.5 transition-all group"
                  >
                    <div className="flex items-center space-x-4 mb-3">
                      <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#7a2810] to-[#3a1106] text-amber-300 font-serif font-black flex items-center justify-center text-lg shadow-md border border-amber-500/50">
                        {item.number}
                      </div>
                      <h4 className="font-serif font-bold text-xl text-amber-200 group-hover:text-amber-100 transition-colors">
                        Điều {item.number}: {item.text}
                      </h4>
                    </div>
                    <p className="text-stone-300/90 text-sm sm:text-base leading-relaxed pl-14 font-serif">
                      {item.detail}
                    </p>
                  </div>
                ))}

                {/* Final Card: Tribute Poem for Children */}
                <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-[#5a1c0b] via-[#3a1106] to-[#200a03] text-white flex flex-col justify-center shadow-xl border border-amber-600/50">
                  <h4 className="font-serif font-bold text-xl text-amber-300 mb-2">
                    "Trẻ em như búp trên cành"
                  </h4>
                  <p className="text-sm sm:text-base text-amber-100/90 leading-relaxed font-serif italic">
                    Biết ăn ngủ, biết học hành là ngoan. Sinh thời, dù bận trăm công nghìn việc lớn của đất nước, Bác luôn dành cho các cháu thiếu nhi tình yêu thương bao la và niềm tin gửi gắm tương lai non sông.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 2. Youth Teachings Tab */}
          {activeTab === 'youth' && (
            <div className="bg-[#1c120a] rounded-3xl p-6 sm:p-10 border border-amber-800/40 shadow-xl space-y-8">
              <div className="text-center max-w-2xl mx-auto">
                <span className="px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-amber-950/80 text-amber-300 border border-amber-600/40 inline-block mb-3">
                  THẾ HỆ RƯỜNG CỘT NƯỚC NHÀ
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-amber-200">
                  {youthTeachings.title}
                </h3>
                <p className="text-stone-400 text-xs sm:text-sm mt-1 font-serif">
                  {youthTeachings.context}
                </p>
              </div>

              {/* Poem box framed like traditional calligraphy */}
              <div className="max-w-lg mx-auto text-center p-8 rounded-3xl bg-[#140c06] border border-amber-600/50 shadow-inner">
                <p className="font-serif font-bold text-xl sm:text-2xl text-amber-200 leading-loose whitespace-pre-line italic">
                  {youthTeachings.poem}
                </p>
              </div>

              {/* Core Values */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {youthTeachings.coreValues && youthTeachings.coreValues.map((val, idx) => (
                  <div key={idx} className="p-6 rounded-2xl bg-[#140c06] border border-amber-900/40 hover:border-amber-600/50 transition-colors">
                    <h5 className="font-serif font-bold text-base text-amber-300 mb-2">
                      {val.title}
                    </h5>
                    <p className="text-xs sm:text-sm text-stone-300/80 leading-relaxed font-serif">
                      {val.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. Moral Principles Tab */}
          {activeTab === 'moral' && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-amber-200">
                  Cần - Kiệm - Liêm - Chính - Chí Công Vô Tư
                </h3>
                <p className="text-stone-300/80 text-sm mt-1 font-serif">
                  Bốn đức tính cốt lõi của người cán bộ và công dân chân chính, ví như bốn mùa của đất trời
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {moralPrinciples.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-6 sm:p-7 rounded-3xl bg-[#1c120a] border border-amber-800/40 shadow-xl hover:border-amber-500/70 hover:bg-[#23170e] transition-all"
                  >
                    <div className="text-3xl font-serif font-bold text-amber-300 mb-2 pb-2 border-b border-amber-800/40">
                      {item.keyword}
                    </div>
                    <p className="text-stone-300/90 text-sm leading-relaxed font-serif">
                      {item.meaning}
                    </p>
                  </div>
                ))}

                {/* Additional quote card */}
                <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-[#2a170b] to-[#180e07] border border-amber-600/50 flex flex-col justify-center">
                  <p className="font-serif italic text-amber-200/95 text-xs sm:text-sm leading-relaxed">
                    "Trời có bốn mùa: Xuân, Hạ, Thu, Đông.<br />
                    Đất có bốn phương: Đông, Tây, Nam, Bắc.<br />
                    Người có bốn đức: Cần, Kiệm, Liêm, Chính.<br />
                    Thiếu một mùa thì không thành trời. Thiếu một phương thì không thành đất. Thiếu một đức thì không thành người."
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 4. Testament Tab */}
          {activeTab === 'testament' && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-amber-200">
                  Những Lời Dặn Dò Trong Bản Di Chúc Bất Tử
                </h3>
                <p className="text-stone-300/80 text-sm mt-1 font-serif">
                  Được Bác viết và hoàn thiện từ năm 1965 đến 1969, kết tinh tình cảm thiêng liêng nhất với Tổ quốc và nhân loại
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {testamentExcerpts.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-6 sm:p-7 rounded-3xl bg-[#1c120a] border border-amber-800/40 shadow-xl hover:border-amber-500/70 hover:bg-[#23170e] transition-all"
                  >
                    <span className="text-xs font-semibold uppercase tracking-wider text-amber-300 bg-amber-950/80 px-3 py-1 rounded-lg border border-amber-600/40 inline-block mb-3">
                      {item.topic}
                    </span>
                    <blockquote className="font-serif italic text-stone-200/95 text-sm sm:text-base leading-relaxed">
                      "{item.content}"
                    </blockquote>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
