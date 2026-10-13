import React from 'react';

export default function TopBar() {
  return (
    <div className="bg-[#120904] text-stone-200 text-xs py-1.5 px-4 border-b border-amber-900/30">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <span className="w-4 h-4 rounded-full bg-red-700 border border-amber-400/80 flex items-center justify-center shadow-xs shrink-0">
            <span className="text-[10px] text-amber-300 leading-none font-bold">★</span>
          </span>
          <span className="italic font-serif text-amber-200/90 hidden sm:inline">
            "Dân ta phải biết sử ta, cho tường gốc tích nước nhà Việt Nam"
          </span>
          <span className="italic font-serif text-amber-200/90 sm:hidden">
            "Dân ta phải biết sử ta"
          </span>
        </div>

        <div className="text-[11px] text-stone-400 font-serif">
          Chủ tịch Hồ Chí Minh (1890 - 1969)
        </div>
      </div>
    </div>
  );
}
