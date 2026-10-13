import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Heart, 
  Clock, 
  Sparkles, 
  ArrowRight, 
  Flame,
  Globe,
  Compass,
  Shield,
  Coffee,
  UtensilsCrossed,
  Home,
  Gift,
  Headphones,
  Footprints
} from 'lucide-react';

// Dedicated historical vector emblems for each story
const StoryVectorIcon = ({ storyId }) => {
  switch (storyId) {
    case 'doi-dep-cao-su':
      return (
        // Iconic Rubber Sandals ("Đôi dép lốp Bác Hồ") vector
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 4c0-1.1.9-2 2-2s2 .9 2 2v14c0 2.2-1.8 4-4 4s-4-1.8-4-4V6c0-1.1.9-2 2-2z" />
          <path d="M1 9c2.5 1 4.5 1 7 0" />
          <path d="M2 14h5" />
          <path d="M15 4c0-1.1.9-2 2-2s2 .9 2 2v14c0 2.2-1.8 4-4 4s-4-1.8-4-4V6c0-1.1.9-2 2-2z" />
          <path d="M11 9c2.5 1 4.5 1 7 0" />
          <path d="M12 14h5" />
        </svg>
      );
    case 'hai-ban-tay-trang':
      // Voyage of determination across the globe
      return <Globe className="w-5 h-5" />;
    case 'chiec-ao-tran-thu':
      // Soldier quilted vest of deep affection
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 3h12l3 5-3 3v10H6V11L3 8l3-5z" />
          <path d="M12 3v18" />
          <path d="M6 10h12" />
          <path d="M6 15h12" />
        </svg>
      );
    case 'nuoc-nong-va-nuoc-nguoi':
      // Ceramic teacup with curling steam of temperance
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 8h1a4 4 0 0 1 0 8h-1" />
          <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z" />
          <path d="M6 2v3" />
          <path d="M10 2v3" />
          <path d="M14 2v3" />
        </svg>
      );
    case 'thoi-gian-quy-bau-lam':
      // Vintage golden pocket watch of punctuality
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="13" r="8" />
          <path d="M12 9v4l3 2" />
          <path d="M12 5V2" />
          <path d="M9 2h6" />
        </svg>
      );
    case 'bac-chia-keo-cho-thieu-nhi':
      // Box of candies and loving kindness for children
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="8" width="18" height="4" rx="1" />
          <path d="M12 8v13" />
          <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
          <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />
        </svg>
      );
    case 'bat-che-se-doi':
      // Shared bowl of brotherhood and equality
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 11c0 4.97 4.03 9 9 9s9-4.03 9-9H3z" />
          <path d="M8 20v2" />
          <path d="M16 20v2" />
          <path d="M7 6c1 1 2 1 3 0" />
          <path d="M14 6c1 1 2 1 3 0" />
        </svg>
      );
    case 'ngoi-nha-san-don-so':
      // Iconic rustic wooden stilt house
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 10l9-7 9 7v4H3v-4z" />
          <path d="M5 14v7" />
          <path d="M19 14v7" />
          <path d="M10 14v7" />
          <path d="M14 14v7" />
          <path d="M3 21h18" />
        </svg>
      );
    default:
      return <BookOpen className="w-5 h-5" />;
  }
};

export default function StoriesSection({ storiesData = [], onSelectStory, onLikeStory }) {
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    'Tất cả',
    'Giản dị & Tiết kiệm',
    'Ý chí & Yêu nước',
    'Tình thương bao la',
    'Bài học ứng xử & Lãnh đạo',
    'Yêu thương thiếu nhi',
    'Đồng cam cộng khổ'
  ];

  const filteredStories = storiesData.filter(story => {
    const matchesCat = selectedCategory === 'Tất cả' || story.category === selectedCategory;
    const q = searchTerm.toLowerCase();
    const matchesSearch = !searchTerm || 
      story.title.toLowerCase().includes(q) || 
      story.content.toLowerCase().includes(q) ||
      story.moralLesson.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  return (
    <section id="stories" className="py-20 bg-[#160e08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-5xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-amber-950/70 border border-amber-600/50 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <span className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center border border-amber-400/40">
              <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400 animate-pulse" />
            </span>
            <span>KHO TÀNG ĐẠO ĐỨC & PHONG CÁCH</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#f5efe6] tracking-tight whitespace-normal sm:whitespace-nowrap">
            Những Câu Chuyện Cảm Động Về Bác
          </h2>
          <p className="text-stone-300/80 mt-3 text-sm sm:text-base font-serif max-w-4xl mx-auto leading-relaxed">
            Mỗi mẩu chuyện về Bác là một ngọn đuốc sáng soi rọi tâm hồn, bài học nhân cách giản dị mà cao đẹp
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="duocsang-card rounded-3xl p-5 sm:p-6 mb-10 space-y-4 border border-amber-800/40">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Tìm kiếm câu chuyện, bài học..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#1b1008] border border-amber-900/50 text-stone-200 placeholder-stone-500 text-sm focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="text-xs text-stone-400 font-medium">
              Đang có <span className="font-bold text-amber-300">{filteredStories.length}</span> câu chuyện
            </div>
          </div>

          {/* Categories Pill Bar */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-amber-950/60">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-amber-600 text-stone-950 font-bold shadow-md'
                    : 'bg-[#271910] hover:bg-[#342217] text-stone-300 border border-amber-900/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Stories Grid */}
        {filteredStories.length === 0 ? (
          <div className="text-center py-16 duocsang-card rounded-3xl p-8 border border-amber-900/40">
            <BookOpen className="w-12 h-12 text-stone-600 mx-auto mb-3" />
            <h4 className="text-lg font-serif font-bold text-stone-300">Không tìm thấy câu chuyện phù hợp</h4>
            <p className="text-stone-500 text-xs mt-1">Thử thay đổi từ khóa hoặc chọn danh mục "Tất cả" bạn nhé.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStories.map((story) => (
              <div
                key={story.id}
                className="duocsang-card rounded-3xl border border-amber-800/40 p-6 flex flex-col justify-between group hover:border-amber-600/70 transition-all hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="flex items-center space-x-2.5">
                      {/* Polished Historical Vector Emblem Medal */}
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500/25 via-amber-900/40 to-[#120a05] border border-amber-500/40 flex items-center justify-center text-amber-300 shadow-md shadow-amber-950/60 group-hover:scale-110 group-hover:border-amber-400 group-hover:text-amber-200 group-hover:shadow-amber-500/20 transition-all shrink-0">
                        <StoryVectorIcon storyId={story.id} />
                      </div>

                      <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-amber-950/80 text-amber-300 border border-amber-800/50 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                        <span>{story.category}</span>
                      </span>
                    </div>

                    <span className="text-xs text-stone-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-amber-500" />
                      {story.readTime}
                    </span>
                  </div>

                  <h3 
                    onClick={() => onSelectStory(story)}
                    className="font-serif font-bold text-xl text-[#f5efe6] group-hover:text-amber-300 transition-colors cursor-pointer mb-3 leading-snug"
                  >
                    {story.title}
                  </h3>

                  {/* Quote Snippet */}
                  <div className="p-3.5 rounded-2xl bg-[#1d120a] border-l-3 border-amber-500 font-serif italic text-amber-200/90 text-xs sm:text-sm leading-relaxed mb-4">
                    "{story.quote}"
                  </div>

                  <p className="text-xs text-stone-300/80 line-clamp-3 leading-relaxed">
                    <strong className="text-amber-400">Bài học: </strong>
                    {story.moralLesson}
                  </p>
                </div>

                {/* Footer Actions */}
                <div className="mt-5 pt-4 border-t border-amber-950/60 flex items-center justify-between">
                  <button
                    onClick={() => onLikeStory(story.id)}
                    className="flex items-center space-x-1.5 text-xs font-semibold text-stone-400 hover:text-rose-400 transition-colors"
                  >
                    <Heart className="w-4 h-4" />
                    <span>{story.likes || 0}</span>
                  </button>

                  <button
                    onClick={() => onSelectStory(story)}
                    className="px-4 py-2 rounded-full duocsang-btn text-xs font-semibold text-amber-100 flex items-center space-x-2 group-hover:shadow-lg transition-all"
                  >
                    <Headphones className="w-3.5 h-3.5 text-amber-300" />
                    <span>Đọc & Nghe</span>
                    <ArrowRight className="w-3.5 h-3.5 text-amber-300 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
