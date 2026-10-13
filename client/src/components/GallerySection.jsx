import React, { useState } from 'react';
import { 
  Camera, Music, Play, MapPin, Calendar, Maximize2, X, Disc, Flame, 
  Video, Film, ExternalLink
} from 'lucide-react';

export default function GallerySection({ multimediaData }) {
  const [activeTab, setActiveTab] = useState('gallery'); // 'gallery' | 'songs' | 'videos'
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');

  const { gallery = [], songs = [], videos = [] } = multimediaData || {};

  // Extract unique categories for gallery filter
  const galleryCategories = ['Tất cả', ...new Set(gallery.map(g => g.category))];
  const filteredGallery = selectedCategory === 'Tất cả' 
    ? gallery 
    : gallery.filter(g => g.category === selectedCategory);

  const handlePlaySong = (song) => {
    setSelectedVideo({
      title: `${song.title} - ${song.artist ? `${song.artist} | ` : ''}Sáng tác: ${song.composer}`,
      youtubeId: song.youtubeId,
      category: 'Giai điệu bất hủ',
      duration: song.duration,
      year: song.year,
      description: `Nhạc sĩ: ${song.composer}${song.artist ? ` • Trình bày: ${song.artist}` : ''} (${song.year})\n\nHoàn cảnh sáng tác: ${song.story}\n\nLời ca bất hủ: "${song.excerpt}"`
    });
  };

  return (
    <section id="library" className="py-20 bg-[#160e08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-5xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-amber-950/70 border border-amber-600/50 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3 shadow-inner">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>KHO TÀNG TƯ LIỆU & GIAI ĐIỆU SỬ THI</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#f5efe6] tracking-tight whitespace-normal sm:whitespace-nowrap">
            Thư Viện Ảnh, Ca Khúc & Phim Tư Liệu
          </h2>
          <p className="text-stone-300/80 mt-3 text-sm sm:text-base font-serif max-w-4xl mx-auto leading-relaxed">
            Lưu giữ những khoảnh khắc lịch sử vô giá, thước phim kinh điển và những khúc ca bất hủ về Người cha già kính yêu của dân tộc
          </p>
        </div>

        {/* 3 Tab Switcher */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 rounded-full bg-[#20140b] border border-amber-800/40 shadow-xl gap-1">
            <button
              onClick={() => setActiveTab('gallery')}
              className={`px-5 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold flex items-center space-x-2 transition-all ${
                activeTab === 'gallery'
                  ? 'duocsang-btn text-amber-100 shadow-md'
                  : 'text-stone-400 hover:text-amber-300'
              }`}
            >
              <Camera className="w-4 h-4" />
              <span>Ảnh Tư Liệu ({gallery.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('songs')}
              className={`px-5 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold flex items-center space-x-2 transition-all ${
                activeTab === 'songs'
                  ? 'duocsang-btn text-amber-100 shadow-md'
                  : 'text-stone-400 hover:text-amber-300'
              }`}
            >
              <Music className="w-4 h-4" />
              <span>Giai Điệu Bất Hủ ({songs.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('videos')}
              className={`px-5 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold flex items-center space-x-2 transition-all ${
                activeTab === 'videos'
                  ? 'duocsang-btn text-amber-100 shadow-md'
                  : 'text-stone-400 hover:text-amber-300'
              }`}
            >
              <Film className="w-4 h-4" />
              <span>Thước Phim Lịch Sử ({videos.length})</span>
            </button>
          </div>
        </div>

        {/* TAB 1: Photo Gallery */}
        {activeTab === 'gallery' && (
          <div>
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
              {galleryCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    selectedCategory === cat
                      ? 'bg-amber-500 text-stone-950 shadow-md'
                      : 'bg-[#22150b] text-stone-400 hover:text-amber-200 border border-amber-900/40'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGallery.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedPhoto(item)}
                  className="duocsang-card rounded-3xl overflow-hidden border border-amber-800/40 cursor-pointer group flex flex-col justify-between hover:border-amber-500/70 transition-all shadow-lg hover:shadow-amber-950/40"
                >
                  <div>
                    <div className="relative aspect-[16/10] overflow-hidden bg-black">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = '/images/banner-custom.jpg';
                        }}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#160d07] via-transparent to-transparent opacity-80" />
                      
                      <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-black/75 text-amber-300 border border-amber-600/40 backdrop-blur-sm">
                        {item.category}
                      </span>

                      <button 
                        className="absolute bottom-3 right-3 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-sm transition-all"
                        aria-label="Xem ảnh chi tiết"
                      >
                        <Maximize2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="p-5">
                      <div className="flex items-center gap-3 text-xs text-stone-400 mb-2">
                        <span className="flex items-center gap-1 text-amber-400 font-semibold">
                          <Calendar className="w-3.5 h-3.5" />
                          {item.year}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          {item.location}
                        </span>
                      </div>

                      <h3 className="font-serif font-bold text-lg text-[#f5efe6] group-hover:text-amber-300 transition-colors line-clamp-1">
                        {item.title}
                      </h3>

                      <p className="text-xs text-stone-300/80 mt-2 line-clamp-2 leading-relaxed font-serif">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="px-5 pb-5 pt-0">
                    <span className="text-xs text-amber-400 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Phóng to xem tư liệu &rarr;
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: Revolutionary Songs */}
        {activeTab === 'songs' && (
          <div className="space-y-6">
            
            {/* Song Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {songs.map((song) => (
                <div
                  key={song.id}
                  className="rounded-3xl p-6 border bg-[#1e130b] border-amber-800/40 hover:border-amber-600 transition-all flex flex-col justify-between shadow-lg hover:shadow-amber-950/40"
                >
                  <div>
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => handlePlaySong(song)}
                          className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all shadow-md shrink-0 duocsang-btn text-amber-200 hover:scale-105 active:scale-95 group cursor-pointer"
                          aria-label={`Nghe trọn vẹn bài hát ${song.title}`}
                          title={`Nghe trọn vẹn bài hát ${song.title}`}
                        >
                          <Play className="w-6 h-6 fill-current ml-0.5 group-hover:scale-110 transition-transform" />
                        </button>

                        <div>
                          <h3 
                            onClick={() => handlePlaySong(song)}
                            className="font-serif font-bold text-xl text-[#f5efe6] hover:text-amber-300 cursor-pointer transition-colors"
                          >
                            {song.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-stone-400 mt-0.5">
                            Nhạc sĩ: <strong className="text-amber-300">{song.composer}</strong> {song.artist ? <>• Trình bày: <strong className="text-amber-200">{song.artist}</strong></> : null} • Sáng tác: {song.year}
                          </p>
                        </div>
                      </div>

                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#2a1b11] text-amber-300 border border-amber-800/40 shrink-0">
                        {song.duration}
                      </span>
                    </div>

                    {/* Lyrics excerpt */}
                    <div className="p-4 rounded-2xl bg-[#140c06] border-l-3 border-amber-500 font-serif italic text-amber-200/90 text-sm leading-relaxed mb-3">
                      "{song.excerpt}"
                    </div>

                    {/* Background story */}
                    <div className="text-xs text-stone-400 leading-relaxed bg-[#170e08] p-3 rounded-xl border border-amber-950 mb-3">
                      <strong className="text-amber-400">Hoàn cảnh sáng tác: </strong>
                      {song.story}
                    </div>
                  </div>

                  {/* Action button: Listen to full real song via YouTube MV / Audio */}
                  <div className="mt-4 pt-3 border-t border-amber-900/40">
                    <button
                      onClick={() => handlePlaySong(song)}
                      className="w-full px-4 py-2.5 rounded-xl duocsang-btn text-xs font-semibold text-amber-100 flex items-center justify-center space-x-2 shadow-md hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
                    >
                      <Play className="w-4 h-4 fill-current text-amber-300" />
                      <span>Thưởng thức trọn vẹn bản thu gốc (Full MV / Ca khúc)</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* TAB 3: Historical Documentaries & Footage (Thước Phim Lịch Sử) */}
        {activeTab === 'videos' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {videos.map((vid) => (
              <div
                key={vid.id}
                onClick={() => setSelectedVideo(vid)}
                className="duocsang-card rounded-3xl overflow-hidden border border-amber-800/40 group cursor-pointer hover:border-amber-500 transition-all shadow-xl flex flex-col justify-between"
              >
                <div>
                  {/* YouTube Thumbnail with Play Overlay */}
                  <div className="relative aspect-video bg-black overflow-hidden">
                    <img
                      src={`https://img.youtube.com/vi/${vid.youtubeId}/hqdefault.jpg`}
                      alt={vid.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform group-hover:bg-red-600 ring-4 ring-white/30">
                        <Play className="w-7 h-7 fill-white ml-1" />
                      </div>
                    </div>

                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-black/80 text-amber-300 border border-amber-600/50 backdrop-blur-sm">
                      {vid.category}
                    </span>

                    <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md text-xs font-semibold bg-black/80 text-stone-200 backdrop-blur-sm">
                      {vid.duration}
                    </span>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold mb-2">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Năm: {vid.year}</span>
                    </div>

                    <h3 className="font-serif font-bold text-xl text-[#f5efe6] group-hover:text-amber-300 transition-colors">
                      {vid.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-stone-300/80 mt-2 font-serif leading-relaxed line-clamp-3">
                      {vid.description}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-0">
                  <div className="flex items-center space-x-2 text-xs font-bold text-amber-400 group-hover:text-amber-300">
                    <Video className="w-4 h-4" />
                    <span>Mở màn ảnh lớn xem tư liệu &rarr;</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Video Cinema Lightbox Modal */}
        {selectedVideo && (
          <div 
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-lg flex items-center justify-center p-4 sm:p-6 animate-fadeIn"
            onClick={() => setSelectedVideo(null)}
          >
            <div 
              className="bg-[#1a0f08] rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-amber-600/60"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-4 sm:p-5 bg-gradient-to-r from-[#7a2810] to-[#3a1106] flex items-center justify-between border-b border-amber-500/30">
                <div className="flex items-center space-x-2">
                  <Film className="w-5 h-5 text-amber-400" />
                  <h3 className="font-serif font-bold text-lg sm:text-xl text-white truncate max-w-xl">
                    {selectedVideo.title}
                  </h3>
                </div>

                <button
                  onClick={() => setSelectedVideo(null)}
                  className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* YouTube Responsive Embed */}
              <div className="relative aspect-video bg-black">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${selectedVideo.youtubeId}?autoplay=1&rel=0`}
                  title={selectedVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              </div>

              {/* Synopsis Details */}
              <div className="p-6 space-y-3 bg-[#160d07]">
                <div className="flex items-center gap-3 text-xs text-stone-400">
                  <span className="px-3 py-1 rounded-full bg-amber-950 text-amber-300 border border-amber-700/50">
                    {selectedVideo.category}
                  </span>
                  <span>Thời lượng: {selectedVideo.duration}</span>
                  <span>•</span>
                  <span>Năm tư liệu: {selectedVideo.year}</span>
                </div>

                <p className="text-stone-300 text-sm leading-relaxed font-serif">
                  {selectedVideo.description}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Photo Lightbox Modal */}
        {selectedPhoto && (
          <div 
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn"
            onClick={() => setSelectedPhoto(null)}
          >
            <div 
              className="bg-[#1c120a] rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-amber-700/50"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[16/10] bg-black">
                <img
                  src={selectedPhoto.imageUrl}
                  alt={selectedPhoto.title}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = '/images/banner-custom.jpg';
                  }}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/70 hover:bg-black/90 text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-3 text-xs text-stone-400 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-900/60 text-amber-200 border border-amber-700/40">
                    {selectedPhoto.category}
                  </span>
                  <span>{selectedPhoto.year}</span>
                  <span>•</span>
                  <span>{selectedPhoto.location}</span>
                </div>

                <h3 className="font-serif font-bold text-2xl text-[#f5efe6] mb-3">
                  {selectedPhoto.title}
                </h3>

                <p className="text-stone-300 text-sm leading-relaxed font-serif">
                  {selectedPhoto.description}
                </p>
              </div>

              <div className="p-4 bg-[#140d07] border-t border-amber-950 flex justify-end">
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="px-5 py-2 rounded-full duocsang-btn text-amber-100 text-xs font-semibold"
                >
                  Đóng ảnh
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
