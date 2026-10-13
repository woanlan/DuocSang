import React, { useState, useEffect } from 'react';
import { Search, Menu, X, Flame, QrCode, Copy, Check, Download } from 'lucide-react';

export default function Navbar({ activeSection, onNavigate, onOpenSearch }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: 'Trang chủ' },
    { id: 'stories', label: 'Câu chuyện' },
    { id: 'quiz', label: 'Mini game' },
    { id: 'library', label: 'Thư viện' },
    { id: 'about', label: 'Về chúng tôi' },
  ];

  const handleItemClick = (id) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText('https://duocsang.onrender.com/');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#150d08]/95 backdrop-blur-md shadow-xl border-b border-amber-900/40 py-3' 
          : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-4 sm:py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Logo "Đuốc Sáng" */}
            <div 
              onClick={() => handleItemClick('hero')} 
              className="flex items-center space-x-2 cursor-pointer group select-none"
            >
              <div className="flex items-baseline space-x-1">
                <span className="font-brand text-3xl sm:text-4xl text-[#f3d08c] group-hover:text-amber-300 transition-colors tracking-wide glow-gold font-bold">
                  Đuốc Sáng
                </span>
                <Flame className="w-5 h-5 text-amber-500 fill-amber-500 -ml-1 group-hover:scale-110 transition-transform animate-pulse" />
              </div>
            </div>

            {/* Desktop Nav Items */}
            <nav className="hidden md:flex items-center space-x-6 lg:space-x-8 text-sm font-medium">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item.id)}
                    className={`transition-all duration-200 tracking-wide font-sans relative py-1 ${
                      isActive
                        ? 'text-amber-300 font-bold border-b-2 border-amber-400 pb-0.5 drop-shadow-[0_2px_10px_rgba(251,191,36,0.35)]'
                        : 'text-stone-300 hover:text-amber-200'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}

              {/* QR Code button */}
              <button
                onClick={() => setIsQrModalOpen(true)}
                className="p-1.5 rounded-full text-stone-300 hover:text-amber-300 hover:bg-white/10 transition-colors flex items-center space-x-1 text-xs"
                title="Quét mã QR truy cập trang web"
              >
                <QrCode className="w-4 h-4 text-amber-400" />
                <span className="text-[11px] font-bold text-amber-200">Mã QR</span>
              </button>

              {/* Search Icon button */}
              <button
                onClick={onOpenSearch}
                className="p-1.5 rounded-full text-stone-300 hover:text-amber-300 hover:bg-white/10 transition-colors"
                aria-label="Tìm kiếm"
              >
                <Search className="w-4 h-4" />
              </button>
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-2">
              <button
                onClick={() => setIsQrModalOpen(true)}
                className="p-2 text-amber-400 hover:text-amber-300"
                aria-label="Mã QR"
              >
                <QrCode className="w-5 h-5" />
              </button>
              <button
                onClick={onOpenSearch}
                className="p-2 text-stone-300 hover:text-amber-300"
                aria-label="Tìm kiếm"
              >
                <Search className="w-5 h-5" />
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-stone-300 hover:text-amber-300"
                aria-label="Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#1c120b]/98 border-b border-amber-900/60 px-6 pt-3 pb-6 shadow-2xl backdrop-blur-xl">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item.id)}
                    className={`text-left py-2.5 font-medium text-base border-b border-amber-950/40 flex items-center justify-between transition-colors ${
                      isActive
                        ? 'text-amber-300 font-bold border-amber-500/60 pl-2'
                        : 'text-stone-200 hover:text-amber-300'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && <span className="w-2 h-2 rounded-full bg-amber-400"></span>}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </header>

      {/* ================= MODAL: QR CODE SHARE ================= */}
      {isQrModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setIsQrModalOpen(false)}
        >
          <div 
            className="duocsang-card max-w-sm w-full rounded-3xl p-6 border-2 border-amber-500/70 shadow-2xl relative text-center space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsQrModalOpen(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-950 border border-amber-500/60 flex items-center justify-center text-amber-300 shadow-inner">
                <QrCode className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif font-black text-amber-100">
                Mã QR Trang Web Đuốc Sáng
              </h3>
              <p className="text-xs text-stone-300/80 font-serif">
                Quét bằng camera điện thoại để truy cập ngay vào website
              </p>
            </div>

            {/* QR Code Container */}
            <div className="p-3 bg-white rounded-2xl max-w-[220px] mx-auto shadow-2xl border-2 border-amber-400/50">
              <img 
                src="/images/qr-code-duocsang.png" 
                alt="QR Code duocsang.onrender.com"
                className="w-full h-auto rounded-xl"
              />
            </div>

            {/* Link display & actions */}
            <div className="space-y-3">
              <div className="p-2.5 rounded-xl bg-stone-900 border border-amber-900/60 text-xs text-amber-300 font-mono break-all select-all">
                https://duocsang.onrender.com/
              </div>

              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={handleCopyLink}
                  className="px-4 py-2 rounded-xl bg-amber-600/30 hover:bg-amber-600/40 border border-amber-500/60 text-amber-200 text-xs font-semibold flex items-center space-x-1.5 transition-all shadow-md"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Đã sao chép!' : 'Sao chép link'}</span>
                </button>

                <a
                  href="/images/qr-code-duocsang.png"
                  download="QR-Code-DuocSang.png"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-yellow-500 text-stone-950 text-xs font-bold flex items-center space-x-1.5 shadow-md hover:scale-105 active:scale-95 transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Tải ảnh QR</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
