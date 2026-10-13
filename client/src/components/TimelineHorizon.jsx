import React, { useState } from 'react';

export default function TimelineHorizon({ timelineData = [], selectedIndex, onSelectIndex }) {
  if (!timelineData || timelineData.length === 0) return null;

  const currentEra = timelineData[selectedIndex] || timelineData[0];

  return (
    <div className="relative border-b-2 border-[#E5DAC8] bg-[#F9F5EE] overflow-hidden">
      
      {/* Background vintage sepia landscape watermark */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none mix-blend-multiply"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1600&q=80')`,
          backgroundPosition: 'center',
          backgroundSize: 'cover'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 relative z-10">
        
        {/* Horizontal Timeline Bar */}
        <div className="overflow-x-auto pb-4 scrollbar-none mb-6">
          <div className="min-w-max flex items-center justify-between mx-auto px-4 relative">
            
            {/* Connecting Dotted Line */}
            <div className="absolute left-6 right-6 top-[34px] h-[2px] bg-amber-400/70 border-b border-dashed border-amber-600/60 -z-0" />

            {timelineData.map((era, idx) => {
              const isSelected = selectedIndex === idx;
              return (
                <div 
                  key={era.id} 
                  onClick={() => onSelectIndex(idx)}
                  className="flex flex-col items-center cursor-pointer group px-3 sm:px-4 z-10"
                >
                  {/* Period Title Label */}
                  <div className={`text-xs sm:text-sm font-serif text-center max-w-[140px] mb-2 leading-tight transition-colors ${
                    isSelected 
                      ? 'font-bold text-stone-950 scale-105' 
                      : 'text-stone-600 group-hover:text-stone-900 font-medium'
                  }`}>
                    {era.period}
                    <span className="block text-[11px] text-stone-500 font-sans mt-0.5">
                      {era.badge}
                    </span>
                  </div>

                  {/* Dot Node */}
                  <div className={`w-4 h-4 rounded-full border-2 transition-all flex items-center justify-center ${
                    isSelected 
                      ? 'bg-amber-600 border-amber-800 ring-4 ring-amber-200 scale-125' 
                      : 'bg-white border-amber-500 group-hover:border-amber-700'
                  }`}>
                    {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                </div>
              );
            })}

          </div>
        </div>

        {/* Selected Era Content Box (Exact "Người Kể Sử" Style) */}
        <div className="max-w-4xl mx-auto pt-4 border-t border-amber-200/70">
          <h2 className="font-serif font-black text-xl sm:text-2xl text-[#8B2500] uppercase tracking-wide flex items-center gap-2 mb-3">
            <span>⇒</span>
            <span>{currentEra.title} ({currentEra.period})</span>
          </h2>

          <div className="space-y-3 font-serif text-stone-800 text-sm sm:text-base leading-relaxed text-justify">
            <p className="italic text-stone-700 font-medium bg-amber-100/50 p-3 rounded-lg border-l-2 border-[#8B2500]">
              {currentEra.summary}
            </p>

            <p>
              {currentEra.events && currentEra.events[0] && (
                <>
                  <strong>{currentEra.events[0].date} ({currentEra.events[0].name}): </strong>
                  {currentEra.events[0].description}
                </>
              )}
            </p>

            {currentEra.events && currentEra.events.length > 1 && (
              <p>
                <strong>{currentEra.events[1].date} ({currentEra.events[1].name}): </strong>
                {currentEra.events[1].description}
              </p>
            )}
          </div>

          {/* Quick links to see details of this era */}
          <div className="mt-4 pt-3 flex items-center justify-between text-xs text-stone-500 font-sans">
            <span>Địa bàn hoạt động: <strong className="text-stone-800">{currentEra.location}</strong></span>
            <span className="text-[#8B2500] font-semibold cursor-pointer hover:underline">
              Xem toàn bộ {currentEra.events?.length || 0} sự kiện của chặng này ↓
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
