import React from 'react';

export default function Breadcrumb({ currentSectionName = 'Trang chủ' }) {
  return (
    <div className="bg-[#FAF5EE] border-b border-[#E8DFC8] py-2 px-4 sm:px-8 text-xs text-stone-600">
      <div className="max-w-7xl mx-auto flex items-center space-x-1 font-serif">
        <span className="text-stone-500">Bạn đang ở:</span>
        <span className="text-stone-800 font-semibold">{currentSectionName}</span>
      </div>
    </div>
  );
}
