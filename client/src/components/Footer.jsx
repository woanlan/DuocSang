import React from 'react';
import { Flame, Heart, ArrowUp, ShieldCheck } from 'lucide-react';

export default function Footer({ onNavigate, onOpenAdmin }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#120a05] text-stone-300 border-t border-amber-900/40 pt-16 pb-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Poem Quote */}
        <div className="max-w-2xl mx-auto text-center mb-12 p-6 rounded-3xl bg-[#1b1008] border border-amber-900/40 shadow-xl">
          <p className="font-serif italic text-amber-200/90 text-sm sm:text-base leading-relaxed whitespace-pre-line">
            "Bác để tình thương cho chúng con<br />
            Một đời thanh bạch, chẳng vàng son<br />
            Mong manh áo vải hồn muôn trượng<br />
            Hơn tượng đồng phơi những lối mòn."
          </p>
          <span className="block text-[11px] uppercase tracking-widest text-stone-400 mt-3 font-semibold font-sans">
            — Trích thơ Tố Hữu
          </span>
        </div>

        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12 pb-12 border-b border-amber-950/60">
          
          {/* Col 1: Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-baseline space-x-1">
              <span className="font-brand text-3xl text-amber-300 font-bold">
                Đuốc Sáng
              </span>
              <Flame className="w-5 h-5 text-amber-500 fill-amber-500 -ml-1" />
            </div>
            <p className="text-stone-400 text-xs sm:text-sm leading-relaxed max-w-md font-serif">
              Không gian số hóa di sản, tôn vinh cuộc đời, sự nghiệp cứu nước và tấm gương đạo đức phong cách Hồ Chí Minh – Ngọn đuốc sáng soi đường cho non sông Việt Nam.
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-4 font-sans">
              Khám Phá
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-stone-400 font-serif">
              <li>
                <button onClick={() => onNavigate('timeline')} className="hover:text-amber-300 transition-colors">
                  Hành trình Dựng nước & Cứu nước
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('stories')} className="hover:text-amber-300 transition-colors">
                  Kho tàng câu chuyện cảm động
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('quiz')} className="hover:text-amber-300 transition-colors">
                  Mini game trắc nghiệm lịch sử
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('library')} className="hover:text-amber-300 transition-colors">
                  Thư viện ảnh & ca khúc bất hủ
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Community */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-4 font-sans">
              Kết Nối & Tri Ân
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-stone-400 font-serif">
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-amber-300 transition-colors">
                  Về dự án Đuốc Sáng
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-amber-300 transition-colors">
                  Ghi danh Sổ lưu bút
                </button>
              </li>
              <li>
                <button onClick={scrollToTop} className="hover:text-amber-300 transition-colors flex items-center gap-1 mt-3">
                  <span>Về đầu trang</span>
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Credits & Hidden Admin Access */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-4">
          <p className="font-serif">
            Đời đời nhớ ơn Chủ tịch Hồ Chí Minh vĩ đại!
          </p>
          <div className="flex items-center space-x-3 font-sans">
            <span className="flex items-center space-x-1">
              <span>Dự án Đuốc Sáng • Xây dựng với niềm tự hào dân tộc</span>
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            </span>
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="text-stone-600 hover:text-amber-400 p-1 rounded-lg transition-colors"
                title="Khu vực Quản trị viên"
              >
                <ShieldCheck className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

      </div>
    </footer>
  );
}
