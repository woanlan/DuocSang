import React, { useState } from 'react';
import { Heart, Send, MapPin, CheckCircle2, Feather, Flame, Sparkles } from 'lucide-react';

export default function TributeSection({ tributes = [], onSubmitTribute, onLikeTribute }) {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [location, setLocation] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [likedMap, setLikedMap] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !content.trim()) {
      alert('Vui lòng nhập họ tên và nội dung cảm tưởng của bạn.');
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmitTribute({
        name: name.trim(),
        role: role.trim() || 'Người con đất Việt kính dâng',
        location: location.trim() || 'Việt Nam',
        content: content.trim()
      });

      setName('');
      setRole('');
      setLocation('');
      setContent('');
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 4000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLike = (id) => {
    if (!likedMap[id]) {
      onLikeTribute(id);
      setLikedMap(prev => ({ ...prev, [id]: true }));
    }
  };

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-[#160e08] via-[#20140b] to-[#120b06] border-t border-amber-900/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-5xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-amber-950/70 border border-amber-600/50 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>VỀ CHÚNG TÔI & LỜI TRI ÂN</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#f5efe6] tracking-tight whitespace-normal sm:whitespace-nowrap">
            Về Dự Án "Đuốc Sáng" & Sổ Lưu Bút
          </h2>
          <p className="text-stone-300/80 mt-3 text-sm sm:text-base font-serif max-w-4xl mx-auto leading-relaxed">
            Dự án giáo dục truyền thống cách mạng, thắp sáng tình yêu sử Việt và lòng biết ơn vô hạn hướng về Chủ tịch Hồ Chí Minh
          </p>
        </div>

        {/* About Duoc Sang Intro Card */}
        <div className="duocsang-card rounded-3xl p-6 sm:p-10 mb-12 border border-amber-700/40">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center sm:text-left">
            <div className="space-y-2">
              <span className="text-amber-400 font-brand text-2xl">Đuốc Sáng Là Gì?</span>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-serif">
                Đuốc Sáng là không gian số hóa lịch sử nhằm lan tỏa những câu chuyện xúc động, tư tưởng vĩ đại và nhân cách cao đẹp của Bác Hồ tới thế hệ trẻ hôm nay.
              </p>
            </div>
            <div className="space-y-2">
              <span className="text-amber-400 font-brand text-2xl">Sứ Mệnh Thiêng Liêng</span>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-serif">
                Bồi đắp lòng tự hào dân tộc, khơi dậy khát vọng cống hiến và tinh thần "Học tập và làm theo tư tưởng, đạo đức, phong cách Hồ Chí Minh".
              </p>
            </div>
            <div className="space-y-2">
              <span className="text-amber-400 font-brand text-2xl">Gửi Gắm Tri Ân</span>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-serif">
                Mỗi lời cảm tưởng gửi vào Sổ lưu bút là một đóa sen thơm kính dâng Người, kết nối hàng triệu con tim Việt Nam từ khắp mọi miền.
              </p>
            </div>
          </div>
        </div>

        {/* Guestbook Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Input Form */}
          <div className="lg:col-span-5 duocsang-card rounded-3xl p-6 sm:p-8 border border-amber-800/40">
            <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#f5efe6] mb-2 flex items-center space-x-2">
              <Feather className="w-5 h-5 text-amber-500" />
              <span>Ghi Dòng Cảm Tưởng</span>
            </h3>
            <p className="text-stone-400 text-xs mb-5 font-serif">
              Lời tri ân của bạn sẽ được lưu giữ trang trọng trên sổ lưu niệm chung của Đuốc Sáng.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  Họ và tên của bạn <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Nguyễn Minh Đức"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#1a1008] border border-amber-900/50 text-stone-200 text-sm focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    Đơn vị / Trường học
                  </label>
                  <input
                    type="text"
                    placeholder="Ví dụ: Đoàn viên thanh niên"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#1a1008] border border-amber-900/50 text-stone-200 text-sm focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    Nơi ở / Quê quán
                  </label>
                  <input
                    type="text"
                    placeholder="Ví dụ: Nghệ An, Hà Nội..."
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#1a1008] border border-amber-900/50 text-stone-200 text-sm focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  Lời tri ân thiêng liêng kính dâng Bác <span className="text-rose-400">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Ghi lại những cảm xúc sâu lắng, lời hứa học tập, rèn luyện và noi gương Bác..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#1a1008] border border-amber-900/50 text-stone-200 text-sm focus:outline-none focus:border-amber-500"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-full duocsang-btn text-amber-100 font-semibold flex items-center justify-center space-x-2 shadow-lg disabled:opacity-50"
              >
                <Send className="w-4 h-4 text-amber-300" />
                <span>{isSubmitting ? 'Đang gửi dòng cảm tưởng...' : 'Kính Cẩn Gửi Lời Tri Ân'}</span>
              </button>
            </form>

            {showSuccessToast && (
              <div className="mt-4 p-3 rounded-xl bg-emerald-950/80 border border-emerald-500 text-emerald-200 text-xs flex items-center space-x-2 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Cảm ơn bạn! Dòng tri ân của bạn đã được ghi vào Sổ Lưu Bút thành công.</span>
              </div>
            )}
          </div>

          {/* Right: Tribute List */}
          <div className="lg:col-span-7 space-y-3.5">
            <div className="flex items-center justify-between pb-2 border-b border-amber-900/40">
              <h4 className="font-serif font-bold text-lg text-[#f5efe6]">
                Những Dòng Tri Ân Mới Nhất ({tributes.length})
              </h4>
              <span className="text-xs text-stone-400">
                Lưu giữ ngàn đời
              </span>
            </div>

            <div className="space-y-3.5 max-h-[580px] overflow-y-auto pr-1">
              {tributes.map((item) => (
                <div
                  key={item.id}
                  className="p-5 rounded-2xl duocsang-card border border-amber-900/40"
                >
                  <div className="flex items-start justify-between gap-3 mb-1.5">
                    <div>
                      <h5 className="font-serif font-bold text-base text-amber-200">
                        {item.name}
                      </h5>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-stone-400 mt-0.5">
                        <span className="text-stone-300 font-medium">{item.role}</span>
                        <span>•</span>
                        <span className="flex items-center gap-0.5">
                          <MapPin className="w-3 h-3 text-amber-500" />
                          {item.location}
                        </span>
                      </div>
                    </div>

                    <span className="text-[11px] text-stone-400 px-2 py-0.5 rounded bg-[#1f130a] border border-amber-900/30">
                      {item.date}
                    </span>
                  </div>

                  <p className="font-serif text-stone-200/90 text-sm leading-relaxed my-2 italic">
                    "{item.content}"
                  </p>

                  <div className="flex justify-end pt-2 border-t border-amber-950/50">
                    <button
                      onClick={() => handleLike(item.id)}
                      className={`flex items-center space-x-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg border transition-colors ${
                        likedMap[item.id]
                          ? 'bg-rose-950/60 border-rose-500 text-rose-300'
                          : 'bg-[#1e130b] border-amber-900/30 text-stone-400 hover:text-rose-400'
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${likedMap[item.id] ? 'fill-rose-400 text-rose-400' : ''}`} />
                      <span>{item.likes || 0} Đồng cảm</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
