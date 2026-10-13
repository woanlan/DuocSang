import React, { useState } from 'react';
import { Search, X, BookOpen, Clock, ArrowRight } from 'lucide-react';

export default function SearchModal({ isOpen, onClose, storiesData = [], timelineData = [], onSelectStory, onSelectEra }) {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const q = query.trim().toLowerCase();

  const matchingStories = q ? storiesData.filter(s => 
    s.title.toLowerCase().includes(q) || 
    s.content.toLowerCase().includes(q) ||
    s.moralLesson.toLowerCase().includes(q)
  ) : [];

  const matchingEras = q ? timelineData.filter(e =>
    e.title.toLowerCase().includes(q) ||
    e.period.includes(q) ||
    e.summary.toLowerCase().includes(q) ||
    e.events?.some(ev => ev.name.toLowerCase().includes(q) || ev.description.toLowerCase().includes(q))
  ) : [];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-start justify-center p-4 sm:p-6 pt-20 animate-fadeIn" onClick={onClose}>
      <div 
        className="bg-[#1c120a] w-full max-w-2xl rounded-3xl border border-amber-600/50 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-amber-900/40 flex items-center space-x-3 bg-[#150d08]">
          <Search className="w-5 h-5 text-amber-400 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Tìm kiếm câu chuyện, mốc lịch sử Bác Hồ..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-stone-100 placeholder-stone-500 text-base focus:outline-none"
          />
          <button onClick={onClose} className="p-1 rounded-full text-stone-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="p-4 max-h-[60vh] overflow-y-auto space-y-4">
          {!q ? (
            <div className="text-center py-10 text-stone-500 text-xs sm:text-sm font-serif">
              Nhập từ khóa (ví dụ: "Đôi dép lốp", "Pác Bó", "Bến Nhà Rồng", "1945"...) để tra cứu nhanh.
            </div>
          ) : matchingStories.length === 0 && matchingEras.length === 0 ? (
            <div className="text-center py-10 text-stone-400 text-sm font-serif">
              Không tìm thấy kết quả phù hợp với "{query}".
            </div>
          ) : (
            <>
              {matchingStories.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Câu chuyện về Bác ({matchingStories.length})</span>
                  </h4>
                  <div className="space-y-2">
                    {matchingStories.map(story => (
                      <div
                        key={story.id}
                        onClick={() => { onSelectStory(story); onClose(); }}
                        className="p-3 rounded-xl bg-[#25170e] hover:bg-[#321f14] border border-amber-900/30 cursor-pointer flex items-center justify-between group transition-colors"
                      >
                        <div>
                          <div className="font-serif font-bold text-stone-200 group-hover:text-amber-300 text-sm">
                            {story.title}
                          </div>
                          <div className="text-xs text-stone-400 line-clamp-1 mt-0.5">
                            {story.quote}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-stone-500 group-hover:text-amber-400 shrink-0 ml-2" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {matchingEras.length > 0 && (
                <div className="pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Mốc thời gian lịch sử ({matchingEras.length})</span>
                  </h4>
                  <div className="space-y-2">
                    {matchingEras.map((era, idx) => (
                      <div
                        key={era.id}
                        onClick={() => { onSelectEra(idx); onClose(); }}
                        className="p-3 rounded-xl bg-[#25170e] hover:bg-[#321f14] border border-amber-900/30 cursor-pointer flex items-center justify-between group transition-colors"
                      >
                        <div>
                          <div className="font-serif font-bold text-stone-200 group-hover:text-amber-300 text-sm">
                            {era.period}: {era.title}
                          </div>
                          <div className="text-xs text-stone-400 line-clamp-1 mt-0.5">
                            {era.summary}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-stone-500 group-hover:text-amber-400 shrink-0 ml-2" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
