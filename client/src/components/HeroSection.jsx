import React, { useState } from 'react';
import { Compass, Flame, ArrowDown, Maximize2, X, Sparkles } from 'lucide-react';
import bannerCustom from '../assets/banner-custom.jpg';

export default function HeroSection({ onExplore }) {
  const [showFullBanner, setShowFullBanner] = useState(false);

  return (
    <section 
      id="hero" 
      className="relative w-full min-h-[88vh] md:min-h-[94vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-[#120a05] pt-16"
    >
      {/* Full-bleed edge-to-edge background banner */}
      <div className="absolute inset-0 w-full h-full select-none overflow-hidden">
        <img 
          src={bannerCustom} 
          alt="Hành trình Dựng nước - Cứu nước của Bác Hồ" 
          className="w-full h-full object-cover object-center transform scale-[1.01] transition-transform duration-1000"
        />

        {/* Cinematic atmospheric overlays to maintain readability while keeping artwork vibrant */}
        {/* Top vignette for Navbar readability */}
        <div className="absolute inset-x-0 top-0 h-28 sm:h-36 bg-gradient-to-b from-[#100804]/90 via-[#100804]/40 to-transparent pointer-events-none" />
        
        {/* Bottom vignette blending seamlessly into the dark background of the page */}
        <div className="absolute inset-x-0 bottom-0 h-32 sm:h-44 bg-gradient-to-t from-[#160e08] via-[#160e08]/60 to-transparent pointer-events-none" />

        {/* Soft radial focus in center */}
        <div className="absolute inset-0 bg-radial-gradient opacity-30 pointer-events-none" />
      </div>

      {/* Hero Content Overlay: Positioned neatly in the open golden parchment area between Uncle Ho (left) and Soldiers (right) */}
      <div className="relative z-10 max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center justify-center pointer-events-auto py-8 sm:py-12 md:py-16">
        
        {/* Subtitle Badge */}
        <div className="inline-flex items-center space-x-2 px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full bg-[#1b1008]/90 border border-amber-500/60 text-amber-300 text-[11px] sm:text-xs font-semibold tracking-widest uppercase shadow-2xl backdrop-blur-md mb-2.5 sm:mb-4 animate-fadeIn">
          <span className="w-4 h-4 rounded-full bg-amber-500/20 border border-amber-400/50 flex items-center justify-center">
            <Flame className="w-2.5 h-2.5 text-amber-400 fill-amber-400 animate-pulse" />
          </span>
          <span>NGỌN ĐUỐC SOI ĐƯỜNG NON SÔNG</span>
        </div>

        {/* Grand Titles sized compactly to keep within parchment */}
        <div className="space-y-1 mb-3 sm:mb-5">
          <p className="text-amber-200 uppercase tracking-[0.25em] text-xs sm:text-sm md:text-base font-bold drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
            Hành trình
          </p>
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-[#fffdf8] leading-[1.15] drop-shadow-[0_3px_20px_rgba(0,0,0,0.98)]">
            Dựng nước - Cứu nước
          </h1>
          <h2 className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-[#f8d799] drop-shadow-[0_3px_18px_rgba(0,0,0,0.95)] glow-gold">
            của Bác Hồ
          </h2>
        </div>

        {/* Sacred Quote */}
        <div className="mb-4 sm:mb-6 max-w-sm sm:max-w-md mx-auto">
          <div className="inline-block px-4 sm:px-6 py-1.5 sm:py-2 rounded-full bg-[#140b05]/90 backdrop-blur-md border border-amber-500/40 text-amber-200 font-serif italic text-xs sm:text-sm drop-shadow-xl shadow-2xl">
            "Không có gì quý hơn độc lập, tự do!"
          </div>
        </div>

        {/* Grand Action Button "Khám phá ngay" matching the mockup */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <button
            onClick={onExplore}
            className="px-6 sm:px-8 py-2.5 sm:py-3.5 rounded-full duocsang-btn text-[#fffbf2] font-bold text-xs sm:text-sm tracking-wider flex items-center space-x-2.5 shadow-2xl hover:scale-105 active:scale-95 transition-all group border-2 border-amber-400/60"
          >
            <span>Khám phá ngay</span>
            <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-amber-950/60 border border-amber-400/50 flex items-center justify-center group-hover:bg-amber-400 group-hover:text-stone-950 transition-all shadow-inner">
              <Compass className="w-3.5 h-3.5 text-amber-300 group-hover:text-stone-950 group-hover:rotate-45 transition-transform" />
            </span>
          </button>

          <button
            onClick={() => setShowFullBanner(true)}
            className="px-4 sm:px-5 py-2.5 sm:py-3.5 rounded-full bg-[#1c1108]/85 hover:bg-[#28180c] border border-amber-600/50 text-amber-200 text-xs font-medium flex items-center space-x-2 backdrop-blur-md transition-all hover:scale-105 shadow-xl group"
          >
            <span className="w-5 h-5 rounded-full bg-amber-950/60 border border-amber-600/40 flex items-center justify-center group-hover:border-amber-400 transition-colors">
              <Maximize2 className="w-3 h-3 text-amber-400 group-hover:scale-110 transition-transform" />
            </span>
            <span>Xem to toàn cảnh</span>
          </button>
        </div>

      </div>

      {/* Floating Scroll Indicator */}
      <div 
        onClick={onExplore}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center text-stone-300 hover:text-amber-300 cursor-pointer transition-colors opacity-80 hover:opacity-100"
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
