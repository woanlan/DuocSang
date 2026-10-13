import React, { useState } from 'react';
import { Search } from 'lucide-react';

export default function HeaderBanner({ onSearch, onNavigate }) {
  const [searchInput, setSearchInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchInput);
    }
  };

  return (
    <div className="relative bg-[#3e2415] text-white py-6 sm:py-8 px-4 sm:px-8 border-b-2 border-[#7a411e] overflow-hidden">
      {/* Background sepia vintage landscape texture */}
      <div 
        className="absolute inset-0 opacity-25 mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1600&q=80')`,
          backgroundPosition: 'center',
          backgroundSize: 'cover'
        }}
      />
      
      {/* Subtle overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#2e1709]/95 via-[#4a2610]/85 to-[#2e1709]/95 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-5">
        
        {/* Brand / Logo */}
        <div 
          onClick={() => onNavigate && onNavigate('home')}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          {/* Vertical Golden Bar */}
          <div className="w-1.5 h-12 sm:h-14 bg-amber-500 rounded-full group-hover:bg-amber-400 transition-colors shrink-0" />
          
          <div>
            <h1 className="font-serif font-black text-2xl sm:text-3xl lg:text-4xl tracking-wide text-white group-hover:text-amber-200 transition-colors leading-tight">
              Người Kể Sử
            </h1>
            <p className="text-xs sm:text-sm text-amber-200/80 font-serif italic tracking-wide mt-0.5">
              Khơi dậy tình yêu sử Việt • Chủ tịch Hồ Chí Minh vĩ đại
            </p>
          </div>
        </div>

        {/* Search Bar - Exact pill shape with brown-orange button */}
        <form onSubmit={handleSubmit} className="w-full md:w-80 lg:w-96">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Tìm kiếm mốc lịch sử, câu chuyện, lời dạy..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full py-2.5 pl-5 pr-12 rounded-full bg-black/40 border border-amber-900/60 text-white placeholder-stone-400 text-sm focus:outline-none focus:ring-1 focus:ring-amber-500 backdrop-blur-sm"
            />
            <button
              type="submit"
              className="absolute right-1 w-9 h-9 rounded-full bg-[#a0522d] hover:bg-[#b85d19] text-white flex items-center justify-center transition-colors shadow-sm"
              aria-label="Tìm kiếm"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
