import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  X, Volume2, VolumeX, Heart, Share2, Sparkles, Check, Flame, 
  Play, Pause, RotateCcw, FastForward, Rewind, Music, Sliders, Headphones
} from 'lucide-react';

// Web Audio API Synthesizer for traditional Vietnamese pentatonic background music (Đàn tranh & Ambient Pad)
class AmbientNarrativeBGM {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.isPlaying = false;
    this.intervalId = null;
    this.volume = 0.22; // default ambient volume
    // Pentatonic scale frequencies (C, D, F, G, A, C5) - C ngũ cung Việt Nam
    this.pentatonic = [261.63, 293.66, 349.23, 392.00, 440.00, 523.25, 587.33, 659.25, 783.99];
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setVolume(val) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.05);
    }
  }

  // Play a soft plucked harmonic string sound (mô phỏng tiếng gảy tơ lụa ngũ cung)
  pluckNote(freq, delay = 0) {
    if (!this.ctx || !this.isPlaying) return;
    try {
      const startTime = this.ctx.currentTime + delay;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime);

      // Warm acoustic envelope
      gain.gain.setValueAtTime(0.0001, startTime);
      gain.gain.exponentialRampToValueAtTime(0.08, startTime + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 1.8);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(startTime);
      osc.stop(startTime + 1.8);
    } catch (e) {}
  }

  // Gentle warm background chord pad
  playWarmDrone() {
    if (!this.ctx || !this.isPlaying) return;
    try {
      const bassFreqs = [130.81, 196.00]; // C3, G3
      bassFreqs.forEach(freq => {
        const osc = this.ctx.createOscillator();
        const filter = this.ctx.createBiquadFilter();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(320, this.ctx.currentTime);

        gain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.035, this.ctx.currentTime + 1.5);
        gain.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + 5.5);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);

        osc.start();
        osc.stop(this.ctx.currentTime + 5.5);
      });
    } catch (e) {}
  }

  start() {
    this.init();
    if (!this.ctx) return;
    this.isPlaying = true;

    // Immediately play first chord
    this.playWarmDrone();
    this.pluckNote(this.pentatonic[0], 0);
    this.pluckNote(this.pentatonic[2], 0.4);
    this.pluckNote(this.pentatonic[4], 0.9);

    // Loop pleasant ambient pattern every 4.5 seconds
    this.intervalId = setInterval(() => {
      if (!this.isPlaying) return;
      this.playWarmDrone();
      
      const note1 = this.pentatonic[Math.floor(Math.random() * 4)];
      const note2 = this.pentatonic[3 + Math.floor(Math.random() * 4)];
      const note3 = this.pentatonic[Math.floor(Math.random() * 5)];

      this.pluckNote(note1, 0.1);
      this.pluckNote(note2, 0.7);
      this.pluckNote(note3, 1.6);
    }, 4500);
  }

  stop() {
    this.isPlaying = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}

export default function StoryModal({ story, isOpen, onClose, onLike }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentParagraphIdx, setCurrentParagraphIdx] = useState(-1);
  const [speechRate, setSpeechRate] = useState(1.0);
  const [bgmEnabled, setBgmEnabled] = useState(true);
  const [bgmVolume, setBgmVolume] = useState(0.25);
  const [voiceVolume, setVoiceVolume] = useState(1.0);
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const [isCopied, setIsCopied] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);

  const bgmRef = useRef(null);
  const audioPlayerRef = useRef(null);
  const paragraphsRef = useRef([]);

  // Safely stop speaking
  const stopSpeaking = useCallback(() => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause();
      audioPlayerRef.current.currentTime = 0;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (bgmRef.current) {
      bgmRef.current.stop();
    }
    setIsPlaying(false);
    setIsPaused(false);
    setIsLoadingAudio(false);
    setCurrentParagraphIdx(-1);
  }, []);

  // Play single paragraph by index using authentic Vietnamese Audio Stream
  const playParagraph = useCallback((index) => {
    if (!paragraphsRef.current || index >= paragraphsRef.current.length) {
      stopSpeaking();
      return;
    }

    setCurrentParagraphIdx(index);
    const text = paragraphsRef.current[index];
    if (!text || !text.trim()) {
      playParagraph(index + 1);
      return;
    }

    setIsLoadingAudio(true);

    if (!audioPlayerRef.current) {
      audioPlayerRef.current = new Audio();
    }

    const audio = audioPlayerRef.current;
    audio.pause();
    audio.currentTime = 0;

    // Use our dedicated backend Vietnamese TTS streaming endpoint
    const ttsUrl = `/api/tts?text=${encodeURIComponent(text.trim())}`;
    audio.src = ttsUrl;
    audio.playbackRate = speechRate;
    audio.volume = voiceVolume;

    audio.oncanplay = () => {
      setIsLoadingAudio(false);
    };

    audio.onended = () => {
      // Natural breath pause between paragraphs
      setTimeout(() => {
        playParagraph(index + 1);
      }, 400);
    };

    audio.onerror = () => {
      console.warn('Backend TTS stream failed, trying Web Speech API fallback...');
      setIsLoadingAudio(false);
      // Fallback to Web Speech if network error
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'vi-VN';
        utterance.rate = speechRate;
        utterance.onend = () => {
          setTimeout(() => playParagraph(index + 1), 400);
        };
        window.speechSynthesis.speak(utterance);
      } else {
        stopSpeaking();
      }
    };

    audio.play().catch(e => {
      console.warn('Audio play notice:', e.message);
      setIsLoadingAudio(false);
    });
  }, [speechRate, voiceVolume, stopSpeaking]);

  // Initialize BGM generator on mount
  useEffect(() => {
    bgmRef.current = new AmbientNarrativeBGM();
    return () => {
      if (bgmRef.current) {
        bgmRef.current.stop();
      }
      if (audioPlayerRef.current) {
        audioPlayerRef.current.pause();
      }
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Update BGM volume when slider changes
  useEffect(() => {
    if (bgmRef.current) {
      bgmRef.current.setVolume(bgmEnabled ? bgmVolume : 0);
    }
  }, [bgmVolume, bgmEnabled]);

  // Update audio playback rate if changed while playing
  useEffect(() => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.playbackRate = speechRate;
      audioPlayerRef.current.volume = voiceVolume;
    }
  }, [speechRate, voiceVolume]);

  // Prepare paragraphs when story changes (Title -> Golden Quote -> All Paragraphs -> Moral Lesson)
  useEffect(() => {
    if (story) {
      const queue = [];
      if (story.title && story.title.trim()) {
        queue.push(story.title.trim());
      }
      if (story.quote && story.quote.trim()) {
        queue.push(story.quote.trim());
      }
      if (story.content) {
        const parts = story.content.split('\n\n').filter(p => p.trim().length > 0);
        queue.push(...parts);
      }
      if (story.moralLesson && story.moralLesson.trim()) {
        queue.push(`Bài học sâu sắc cho thế hệ hôm nay: ${story.moralLesson.trim()}`);
      }
      paragraphsRef.current = queue;
    } else {
      paragraphsRef.current = [];
    }
    stopSpeaking();
    setCurrentParagraphIdx(-1);
  }, [story, stopSpeaking]);

  // Stop speaking when modal is closed
  useEffect(() => {
    if (!isOpen) {
      stopSpeaking();
    }
  }, [isOpen, stopSpeaking]);

  const handleTogglePlay = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      setIsPaused(false);

      if (bgmEnabled && bgmRef.current) {
        bgmRef.current.start();
      }

      const startIndex = currentParagraphIdx >= 0 ? currentParagraphIdx : 0;
      playParagraph(startIndex);
    } else {
      if (isPaused) {
        if (audioPlayerRef.current) {
          audioPlayerRef.current.play().catch(() => {});
        }
        setIsPaused(false);
        if (bgmEnabled && bgmRef.current) {
          bgmRef.current.start();
        }
      } else {
        if (audioPlayerRef.current) {
          audioPlayerRef.current.pause();
        }
        setIsPaused(true);
        if (bgmRef.current) {
          bgmRef.current.stop();
        }
      }
    }
  };

  const handleRestart = () => {
    stopSpeaking();
    setIsPlaying(true);
    setIsPaused(false);
    if (bgmEnabled && bgmRef.current) {
      bgmRef.current.start();
    }
    playParagraph(0);
  };

  const handleSkipForward = () => {
    if (currentParagraphIdx < paragraphsRef.current.length - 1) {
      if (audioPlayerRef.current) {
        audioPlayerRef.current.pause();
      }
      playParagraph(currentParagraphIdx + 1);
    }
  };

  const handleSkipBackward = () => {
    if (currentParagraphIdx > 0) {
      if (audioPlayerRef.current) {
        audioPlayerRef.current.pause();
      }
      playParagraph(currentParagraphIdx - 1);
    }
  };

  const handleShare = () => {
    if (!story) return;
    const text = `Đọc câu chuyện "${story.title}" về Bác Hồ trên Đuốc Sáng: ${story.quote || ''}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const handleLike = () => {
    if (!hasLiked && story) {
      if (onLike) onLike(story.id);
      setHasLiked(true);
    }
  };

  if (!isOpen || !story) return null;

  const contentParagraphs = story.content ? story.content.split('\n\n').filter(p => p.trim().length > 0) : [];
  const hasQuote = Boolean(story.quote && story.quote.trim());
  const quoteIdx = hasQuote ? 1 : -1;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div 
        className="bg-[#1c120a] w-full max-w-3xl rounded-3xl shadow-2xl border border-amber-600/50 overflow-hidden relative my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="bg-gradient-to-r from-[#7a2810] via-[#5a1c0b] to-[#3a1106] px-6 py-5 text-white flex items-center justify-between border-b border-amber-500/30">
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-400 text-stone-950 shadow-sm">
              {story.category}
            </span>
            <span className="text-xs text-amber-200 font-serif">
              Thời gian đọc: {story.readTime}
            </span>
          </div>

          <button
            onClick={() => {
              stopSpeaking();
              onClose();
            }}
            className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors"
            aria-label="Đóng"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[70vh] overflow-y-auto space-y-6">
          <div>
            <h3 
              onClick={() => {
                stopSpeaking();
                setIsPlaying(true);
                setIsPaused(false);
                if (bgmEnabled && bgmRef.current) bgmRef.current.start();
                playParagraph(0);
              }}
              className={`text-2xl sm:text-3xl font-serif font-bold tracking-tight cursor-pointer transition-all p-2 -ml-2 rounded-xl ${
                isPlaying && currentParagraphIdx === 0
                  ? 'text-amber-300 bg-amber-950/70 border-l-4 border-amber-400 pl-3 shadow-md'
                  : 'text-[#f5efe6] hover:text-amber-200'
              }`}
              title="Nhấp để nghe đọc tiêu đề"
            >
              {story.title}
            </h3>
          </div>

          {/* Inspiring Audio Player Studio Bar with Real Vietnamese Voice Stream */}
          <div className="rounded-2xl bg-[#140c06] border border-amber-800/50 p-4 shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-4">
              
              {/* Main Playback Controls */}
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleRestart}
                  className="p-2 rounded-xl bg-[#23150b] text-amber-300 hover:text-amber-100 hover:bg-[#341d0f] transition-colors border border-amber-900/40"
                  title="Phát lại từ đầu"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <button
                  onClick={handleSkipBackward}
                  disabled={currentParagraphIdx <= 0}
                  className="p-2 rounded-xl bg-[#23150b] text-amber-300 disabled:opacity-40 hover:text-amber-100 hover:bg-[#341d0f] transition-colors border border-amber-900/40"
                  title="Đoạn trước"
                >
                  <Rewind className="w-4 h-4" />
                </button>

                <button
                  onClick={handleTogglePlay}
                  className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center space-x-2 transition-all shadow-md ${
                    isPlaying && !isPaused
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 animate-pulse'
                      : 'duocsang-btn text-amber-100'
                  }`}
                >
                  {isLoadingAudio ? (
                    <>
                      <Headphones className="w-4 h-4 animate-spin text-amber-400" />
                      <span>Đang nạp giọng đọc...</span>
                    </>
                  ) : isPlaying && !isPaused ? (
                    <>
                      <Pause className="w-4 h-4" />
                      <span>Tạm dừng</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-current" />
                      <span>{isPaused ? 'Tiếp tục nghe' : 'Lắng nghe câu chuyện'}</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleSkipForward}
                  disabled={currentParagraphIdx >= paragraphsRef.current.length - 1}
                  className="p-2 rounded-xl bg-[#23150b] text-amber-300 disabled:opacity-40 hover:text-amber-100 hover:bg-[#341d0f] transition-colors border border-amber-900/40"
                  title="Đoạn tiếp theo"
                >
                  <FastForward className="w-4 h-4" />
                </button>
              </div>

              {/* Status indicator & Settings Drawer Toggle */}
              <div className="flex items-center space-x-2">
                {isPlaying && !isPaused && (
                  <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-950/70 border border-amber-600/40">
                    <span className="w-1.5 h-3.5 bg-amber-400 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-5 bg-amber-400 rounded-full animate-bounce [animation-delay:0.15s]"></span>
                    <span className="w-1.5 h-2.5 bg-amber-400 rounded-full animate-bounce [animation-delay:0.3s]"></span>
                    <span className="text-xs text-amber-300 font-serif ml-1">Đang đọc diễn cảm...</span>
                  </div>
                )}

                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className={`p-2 rounded-xl border transition-colors flex items-center space-x-1 text-xs font-semibold ${
                    showSettings 
                      ? 'bg-amber-900/50 border-amber-500 text-amber-200' 
                      : 'bg-[#23150b] border-amber-900/40 text-stone-300 hover:bg-[#341d0f]'
                  }`}
                  title="Tùy chỉnh tốc độ & nhạc nền"
                >
                  <Sliders className="w-4 h-4" />
                  <span className="hidden sm:inline">Âm lượng & Tốc độ</span>
                </button>
              </div>
            </div>

            {/* Expanded Settings Drawer */}
            {showSettings && (
              <div className="mt-4 pt-4 border-t border-amber-900/40 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs animate-fadeIn">
                
                {/* Voice Speed Controls */}
                <div className="space-y-2">
                  <label className="text-stone-300 font-semibold flex items-center space-x-1.5">
                    <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                    <span>Tốc độ phát âm:</span>
                  </label>
                  <div className="flex space-x-2">
                    {[
                      { label: 'Thong thả (0.85x)', rate: 0.85 },
                      { label: 'Chuẩn (1.0x)', rate: 1.0 },
                      { label: 'Nhanh (1.15x)', rate: 1.15 }
                    ].map(item => (
                      <button
                        key={item.rate}
                        onClick={() => setSpeechRate(item.rate)}
                        className={`flex-1 py-1.5 px-2 rounded-lg border font-medium transition-all text-center ${
                          speechRate === item.rate
                            ? 'bg-amber-950/80 border-amber-500 text-amber-200 shadow-sm'
                            : 'bg-[#1b1007] border-amber-950 text-stone-400 hover:text-stone-200'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>

                  <div className="pt-2 space-y-1">
                    <div className="flex justify-between text-[11px] text-stone-400">
                      <span>Âm lượng giọng đọc:</span>
                      <span>{Math.round(voiceVolume * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0.1"
                      max="1.0"
                      step="0.05"
                      value={voiceVolume}
                      onChange={(e) => setVoiceVolume(parseFloat(e.target.value))}
                      className="w-full accent-amber-500 h-1.5 bg-stone-800 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>

                {/* Ambient Pentatonic BGM Control */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-stone-300 font-semibold flex items-center space-x-1.5">
                      <Music className="w-3.5 h-3.5 text-amber-400" />
                      <span>Nhạc ngũ cung đệm nền:</span>
                    </label>
                    <button
                      onClick={() => setBgmEnabled(!bgmEnabled)}
                      className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                        bgmEnabled 
                          ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-600/50' 
                          : 'bg-stone-800 text-stone-400'
                      }`}
                    >
                      {bgmEnabled ? 'Đang bật' : 'Đã tắt'}
                    </button>
                  </div>

                  <div className="pt-2 space-y-1">
                    <div className="flex justify-between text-[11px] text-stone-400">
                      <span>Âm lượng nhạc nền:</span>
                      <span>{Math.round(bgmVolume * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0.05"
                      max="0.6"
                      step="0.05"
                      value={bgmVolume}
                      onChange={(e) => setBgmVolume(parseFloat(e.target.value))}
                      disabled={!bgmEnabled}
                      className="w-full accent-amber-500 h-1.5 bg-stone-800 rounded-lg cursor-pointer disabled:opacity-30"
                    />
                  </div>
                </div>

              </div>
            )}
          </div>

          {/* Social Interactions */}
          <div className="flex items-center justify-between border-b border-amber-900/30 pb-4">
            <div className="flex items-center space-x-2">
              <button
                onClick={handleLike}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 border transition-colors ${
                  hasLiked 
                    ? 'bg-rose-950/60 border-rose-500 text-rose-300' 
                    : 'bg-[#25170f] border-amber-900/40 text-stone-300 hover:bg-[#321f14]'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${hasLiked ? 'fill-rose-400 text-rose-400' : ''}`} />
                <span>Yêu thích ({story.likes || 0})</span>
              </button>

              <button
                onClick={handleShare}
                className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-[#25170f] border border-amber-900/40 text-stone-300 hover:bg-[#321f14] flex items-center space-x-1.5 transition-colors"
              >
                {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{isCopied ? 'Đã sao chép!' : 'Chia sẻ'}</span>
              </button>
            </div>

            <span className="text-xs text-stone-400 font-serif italic">
              * Nhấp từng đoạn dưới đây để nghe đọc trực tiếp từ đoạn đó
            </span>
          </div>

          {/* Quote Banner */}
          {hasQuote && (
            <div 
              onClick={() => {
                stopSpeaking();
                setIsPlaying(true);
                setIsPaused(false);
                if (bgmEnabled && bgmRef.current) bgmRef.current.start();
                playParagraph(quoteIdx);
              }}
              className={`p-4 rounded-2xl border-l-4 font-serif italic text-base sm:text-lg shadow-inner cursor-pointer transition-all ${
                isPlaying && currentParagraphIdx === quoteIdx
                  ? 'bg-amber-950/80 border-amber-400 text-amber-100 ring-1 ring-amber-400/50 shadow-md font-medium'
                  : 'bg-[#140c06] border-amber-500 text-amber-200/90 hover:bg-amber-950/30'
              }`}
              title="Nhấp để nghe đọc câu danh ngôn này"
            >
              "{story.quote}"
            </div>
          )}

          {/* Story Full Text with Interactive Paragraph Synchronization */}
          <div className="text-stone-200 leading-relaxed text-base sm:text-lg space-y-4 font-serif">
            {contentParagraphs.map((paragraph, index) => {
              const pIdxInQueue = (hasQuote ? 2 : 1) + index;
              const isCurrentReading = isPlaying && currentParagraphIdx === pIdxInQueue;

              return (
                <p 
                  key={index}
                  onClick={() => {
                    stopSpeaking();
                    setIsPlaying(true);
                    setIsPaused(false);
                    if (bgmEnabled && bgmRef.current) bgmRef.current.start();
                    playParagraph(pIdxInQueue);
                  }}
                  className={`p-3 rounded-xl transition-all cursor-pointer ${
                    isCurrentReading 
                      ? 'bg-amber-950/70 border-l-4 border-amber-400 text-amber-100 shadow-md font-medium pl-4' 
                      : 'hover:bg-amber-950/20 text-stone-300'
                  }`}
                  title="Nhấp để nghe đọc đoạn này"
                >
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* Moral Lesson Card with Synchronization */}
          {story.moralLesson && (
            <div 
              onClick={() => {
                stopSpeaking();
                setIsPlaying(true);
                setIsPaused(false);
                if (bgmEnabled && bgmRef.current) bgmRef.current.start();
                playParagraph(paragraphsRef.current.length - 1);
              }}
              className={`p-5 sm:p-6 rounded-2xl border transition-all cursor-pointer ${
                isPlaying && currentParagraphIdx === paragraphsRef.current.length - 1
                  ? 'bg-amber-950/80 border-amber-400 shadow-lg ring-1 ring-amber-400/50 text-amber-100'
                  : 'bg-[#140c06] border-amber-800/40 hover:bg-amber-950/30'
              }`}
              title="Nhấp để nghe đọc bài học này"
            >
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center space-x-2 mb-2 font-sans">
                <Flame className="w-4 h-4 text-amber-500" />
                <span>Bài học sâu sắc cho thế hệ hôm nay</span>
              </h4>
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed font-serif">
                {story.moralLesson}
              </p>
            </div>
          )}
        </div>

        {/* Modal Bottom Footer */}
        <div className="bg-[#140c06] px-6 py-4 border-t border-amber-900/40 flex justify-between items-center">
          <span className="text-xs text-stone-400 font-serif">
            Di sản đạo đức & phong cách Hồ Chí Minh
          </span>
          <button
            onClick={() => {
              stopSpeaking();
              onClose();
            }}
            className="px-5 py-2.5 rounded-full duocsang-btn text-amber-100 text-xs font-semibold"
          >
            Đóng câu chuyện
          </button>
        </div>
      </div>
    </div>
  );
}
