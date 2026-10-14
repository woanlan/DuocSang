import React, { useState } from 'react';
import { Compass, Flame, ArrowDown, Maximize2, X, Sparkles } from 'lucide-react';
import bannerCustom from '../assets/banner-custom.jpg';

export default function HeroSection({ onExplore }) {
  const [showFullBanner, setShowFullBanner] = useState(false);

  return (
    <section 
      id="hero" 
      className="relative w-full aspect-[16/10] xs:aspect-[16/9] sm:aspect-[16/9] md:aspect-auto md:min-h-[92vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-[#120a05] pt-12 xs:pt-14 sm:pt-16 md:pt-0"
    >
      {/* Full-bleed edge-to-edge background banner: Preserves full width so Uncle Ho (left) and Soldiers (right) are always 100% visible */}
      <div className="absolute inset-0 w-full h-full select-none overflow-hidden">
        <img 
          src={bannerCustom} 
          alt="Hành trình Dựng nước - Cứu nước của Bác Hồ" 
          className="w-full h-full object-cover object-center transform scale-[1.005] transition-transform duration-1000"
        />

        {/* Cinematic atmospheric overlays to maintain readability while keeping artwork vibrant */}
        {/* Top vignette for Navbar readability */}
        <div className="absolute inset-x-0 top-0 h-14 sm:h-28 md:h-36 bg-gradient-to-b from-[#100804]/90 via-[#100804]/40 to-transparent pointer-events-none" />
        
        {/* Bottom vignette blending seamlessly into the dark background of the page */}
        <div className="absolute inset-x-0 bottom-0 h-16 sm:h-32 md:h-44 bg-gradient-to-t from-[#160e08] via-[#160e08]/60 to-transparent pointer-events-none" />

        {/* Soft radial focus in center */}
        <div className="absolute inset-0 bg-radial-gradient opacity-20 pointer-events-none" />
      </div>

      {/* Hero Content Overlay: Strictly positioned in the open golden parchment area between Uncle Ho (left) and Soldiers (right) */}
      <div className="relative z-10 w-full max-w-[62%] xs:max-w-[55%] sm:max-w-md md:max-w-xl lg:max-w-2xl mx-auto px-1 xs:px-2 sm:px-6 text-center flex flex-col items-center justify-center pointer-events-auto py-1 xs:py-2 sm:py-6 md:py-16">
        
        {/* Subtitle Badge */}
        <div className="inline-flex items-center space-x-1 sm:space-x-2 px-2 xs:px-2.5 sm:px-4 py-0.5 sm:py-1.5 rounded-full bg-[#1b1008]/90 border border-amber-500/60 text-amber-300 text-[7px] xs:text-[8px] sm:text-[11px] md:text-xs font-semibold tracking-wider sm:tracking-widest uppercase shadow-2xl backdrop-blur-md mb-1 sm:mb-3 animate-fadeIn">
          <span className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-amber-500/20 border border-amber-400/50 flex items-center justify-center shrink-0">
            <Flame className="w-1.5 h-1.5 xs:w-2 xs:h-2 sm:w-2.5 sm:h-2.5 text-amber-400 fill-amber-400 animate-pulse" />
          </span>
          <span className="truncate">NGỌN ĐUỐC SOI ĐƯỜNG NON SÔNG</span>
        </div>

        {/* Grand Titles */}
        <div className="space-y-0.5 sm:space-y-1 mb-1 sm:mb-4">
          <p className="text-amber-200 uppercase tracking-[0.15em] sm:tracking-[0.25em] text-[7.5px] xs:text-[9px] sm:text-xs md:text-base font-bold drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
            Hành trình
          </p>
          <h1 className="font-serif text-xs xs:text-sm sm:text-2xl md:text-4xl lg:text-5xl font-black text-[#fffdf8] leading-tight drop-shadow-[0_3px_20px_rgba(0,0,0,0.98)] break-words">
            Dựng nước - Cứu nước
          </h1>
          <h2 className="font-serif text-[11px] xs:text-xs sm:text-xl md:text-3xl lg:text-4xl font-black text-[#f8d799] drop-shadow-[0_3px_18px_rgba(0,0,0,0.95)] glow-gold leading-tight">
            của Bác Hồ
          </h2>
        </div>

        {/* Sacred Quote */}
        <div className="mb-1.5 sm:mb-4 max-w-full">
          <div className="inline-block px-2 xs:px-3 sm:px-6 py-0.5 sm:py-1.5 rounded-full bg-[#140b05]/90 backdrop-blur-md border border-amber-500/40 text-amber-200 font-serif italic text-[7px] xs:text-[8px] sm:text-xs md:text-sm drop-shadow-xl shadow-2xl break-words">
            "Không có gì quý hơn độc lập, tự do!"
          </div>
        </div>

        {/* Grand Action Button */}
        <div className="flex flex-row items-center justify-center gap-1.5 sm:gap-4 max-w-full">
          <button
            onClick={onExplore}
            className="px-2.5 xs:px-3 sm:px-8 py-1 sm:py-3.5 rounded-full duocsang-btn text-[#fffbf2] font-bold text-[8px] xs:text-[9px] sm:text-xs md:text-sm tracking-wide sm:tracking-wider flex items-center space-x-1 sm:space-x-2.5 shadow-2xl hover:scale-105 active:scale-95 transition-all group border border-amber-400/60 sm:border-2"
          >
            <span>Khám phá ngay</span>
            <span className="w-4 h-4 sm:w-7 sm:h-7 rounded-full bg-amber-950/60 border border-amber-400/50 flex items-center justify-center group-hover:bg-amber-400 group-hover:text-stone-950 transition-all shadow-inner shrink-0">
              <Compass className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-amber-300 group-hover:text-stone-950 group-hover:rotate-45 transition-transform" />
            </span>
          </button>

          <button
            onClick={() => setShowFullBanner(true)}
            className="px-2 xs:px-2.5 sm:px-5 py-1 sm:py-3.5 rounded-full bg-[#1c1108]/85 hover:bg-[#28180c] border border-amber-600/50 text-amber-200 text-[8px] xs:text-[9px] sm:text-xs font-medium flex items-center space-x-1 sm:space-x-2 backdrop-blur-md transition-all hover:scale-105 shadow-xl group"
          >
            <span className="w-3.5 h-3.5 sm:w-5 sm:h-5 rounded-full bg-amber-950/60 border border-amber-600/40 flex items-center justify-center group-hover:border-amber-400 transition-colors shrink-0">
              <Maximize2 className="w-2 h-2 sm:w-3 sm:h-3 text-amber-400 group-hover:scale-110 transition-transform" />
            </span>
            <span className="hidden xs:inline sm:inline">Toàn cảnh</span>
          </button>
        </div>

      </div>

      {/* Floating Scroll Indicator (Visible on desktop) */}
      <div 
        onClick={onExplore}
        className="hidden md:flex absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex-col items-center text-stone-300 hover:text-amber-300 cursor-pointer transition-colors opacity-80 hover:opacity-100"
      >
        <span className="text-[11px] sm:text-xs uppercase tracking-widest font-medium mb-1 drop-shadow-md">
          Cuộn để khám phá
        </span>
        <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5 animate-bounce text-amber-400" />
      </div>

      {/* Fullscreen Banner Lightbox Modal */}
      {showFullBanner && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-lg flex items-center justify-center p-4 sm:p-8 animate-fadeIn"
          onClick={() => setShowFullBanner(false)}
        >
          <div className="relative max-w-7xl w-full" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setShowFullBanner(false)}
              className="absolute -top-12 right-0 p-2 text-stone-300 hover:text-white transition-colors bg-white/10 hover:bg-white/20 rounded-full"
            >
              <X className="w-6 h-6" />
            </button>
            <img 
              src={bannerCustom} 
              alt="Toàn cảnh Banner Bác Hồ" 
              className="w-full h-auto rounded-2xl border-2 border-amber-500/60 shadow-[0_0_50px_rgba(245,158,11,0.3)]"
            />
            <p className="text-center text-amber-200 font-serif italic mt-3 text-sm sm:text-base">
              Bức họa trường thiên: Chủ tịch Hồ Chí Minh - Dựng nước và Cứu nước
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
