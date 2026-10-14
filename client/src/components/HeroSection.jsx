import React, { useState } from 'react';
import { Compass, Flame, ArrowDown, Maximize2, X, Sparkles } from 'lucide-react';
import bannerCustom from '../assets/banner-custom.jpg';

export default function HeroSection({ onExplore }) {
  const [showFullBanner, setShowFullBanner] = useState(false);

  return (
    <section 
      id="hero" 
      className="relative w-full flex items-center justify-center overflow-hidden bg-[#120a05] pt-14 xs:pt-16 sm:pt-20 pb-4 sm:pb-8"
    >
      {/* Banner Container: Preserves 100% of the full panoramic artwork on ALL devices (Mobile, Tablet, Desktop) */}
      <div className="relative w-full max-w-7xl mx-auto px-1 xs:px-2 sm:px-4 md:px-6">
        <div className="relative w-full rounded-xl xs:rounded-2xl sm:rounded-3xl overflow-hidden border border-amber-600/40 shadow-2xl bg-black">
          
          {/* Authentic Full Artwork: Natural height so Bác Hồ (left), Soldiers & Flag (right), and Lăng Bác (bottom) are NEVER cropped */}
          <img 
            src={bannerCustom} 
            alt="Hành trình Dựng nước - Cứu nước của Bác Hồ" 
            className="w-full h-auto block select-none pointer-events-none"
          />

          {/* Atmospheric gentle vignette */}
          <div className="absolute inset-0 bg-radial-gradient opacity-15 pointer-events-none" />

          {/* Hero Content Overlay: Strictly centered in the golden parchment paper between Uncle Ho and the Soldiers */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <div className="w-[54%] xs:w-[50%] sm:w-[48%] md:w-[46%] text-center flex flex-col items-center justify-center pointer-events-auto px-1 sm:px-2">
              
              {/* Subtitle Badge */}
              <div className="inline-flex items-center space-x-1 sm:space-x-1.5 px-1.5 xs:px-2 sm:px-3.5 py-0.5 sm:py-1 rounded-full bg-[#1b1008]/90 border border-amber-500/60 text-amber-300 text-[6px] xs:text-[7.5px] sm:text-[10.5px] md:text-xs font-semibold tracking-wider uppercase shadow-md mb-0.5 xs:mb-1 sm:mb-2 md:mb-3">
                <span className="w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-4 sm:h-4 rounded-full bg-amber-500/20 border border-amber-400/50 flex items-center justify-center shrink-0">
                  <Flame className="w-1.5 h-1.5 xs:w-2 xs:h-2 sm:w-2.5 sm:h-2.5 text-amber-400 fill-amber-400 animate-pulse" />
                </span>
                <span className="truncate">NGỌN ĐUỐC SOI ĐƯỜNG NON SÔNG</span>
              </div>

              {/* Titles */}
              <div className="space-y-0 sm:space-y-0.5 md:space-y-1 mb-0.5 xs:mb-1 sm:mb-2 md:mb-4">
                <p className="text-amber-200 uppercase tracking-[0.1em] sm:tracking-[0.2em] text-[6.5px] xs:text-[8px] sm:text-xs md:text-sm font-bold">
                  Hành trình
                </p>
                <h1 className="font-serif text-[9.5px] xs:text-[12px] sm:text-xl md:text-3xl lg:text-4xl font-black text-[#fffdf8] leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
                  Dựng nước - Cứu nước
                </h1>
                <h2 className="font-serif text-[8.5px] xs:text-[10.5px] sm:text-lg md:text-2xl lg:text-3xl font-black text-[#f8d799] drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)] glow-gold leading-tight">
                  của Bác Hồ
                </h2>
              </div>

              {/* Sacred Quote */}
              <div className="mb-0.5 xs:mb-1.5 sm:mb-2 md:mb-4 max-w-full">
                <div className="inline-block px-1.5 xs:px-2.5 sm:px-4 py-0.5 rounded-full bg-[#140b05]/90 border border-amber-500/40 text-amber-200 font-serif italic text-[5.5px] xs:text-[7px] sm:text-[10px] md:text-xs shadow-md">
                  "Không có gì quý hơn độc lập, tự do!"
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-center gap-1 xs:gap-1.5 sm:gap-2.5 md:gap-3">
                <button
                  onClick={onExplore}
                  className="px-2 xs:px-2.5 sm:px-5 md:px-6 py-0.5 xs:py-1 sm:py-2 rounded-full duocsang-btn text-[#fffbf2] font-bold text-[6.5px] xs:text-[8px] sm:text-xs md:text-sm tracking-wider flex items-center space-x-0.5 xs:space-x-1 sm:space-x-1.5 shadow-md hover:scale-105 active:scale-95 transition-all border border-amber-400/60"
                >
                  <span>Khám phá ngay</span>
                  <Compass className="w-2 h-2 xs:w-2.5 xs:h-2.5 sm:w-3 sm:h-3 text-amber-300 shrink-0" />
                </button>

                <button
                  onClick={() => setShowFullBanner(true)}
                  className="px-1.5 xs:px-2 sm:px-3.5 md:px-4 py-0.5 xs:py-1 sm:py-2 rounded-full bg-[#1c1108]/85 hover:bg-[#28180c] border border-amber-600/50 text-amber-200 text-[6px] xs:text-[7.5px] sm:text-[10.5px] md:text-xs font-medium flex items-center space-x-0.5 xs:space-x-1 transition-all"
                >
                  <Maximize2 className="w-1.5 h-1.5 xs:w-2 xs:h-2 sm:w-2.5 sm:h-2.5 text-amber-400 shrink-0" />
                  <span>Toàn cảnh</span>
                </button>
              </div>

            </div>
          </div>

        </div>
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
