import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import TimelineSection from './components/TimelineSection';
import StoriesSection from './components/StoriesSection';
import StoryModal from './components/StoryModal';
import TeachingsSection from './components/TeachingsSection';
import OngVangGame from './components/OngVangGame';
import GallerySection from './components/GallerySection';
import TributeSection from './components/TributeSection';
import Footer from './components/Footer';
import SearchModal from './components/SearchModal';

import {
  fetchTimeline,
  fetchStories,
  fetchTeachings,
  fetchQuiz,
  fetchMultimedia,
  fetchTributes,
  submitTribute,
  likeStoryApi
} from './services/api';
import {
  fallbackTimeline,
  fallbackStories,
  fallbackTeachings,
  fallbackQuiz,
  fallbackMultimedia,
  fallbackTributes
} from './data/fallbackData';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [timelineData, setTimelineData] = useState(fallbackTimeline);
  const [storiesData, setStoriesData] = useState(fallbackStories);
  const [teachingsData, setTeachingsData] = useState(fallbackTeachings);
  const [multimediaData, setMultimediaData] = useState(fallbackMultimedia);
  const [quizData, setQuizData] = useState(fallbackQuiz);
  const [tributes, setTributes] = useState(fallbackTributes);

  // Modal states
  const [selectedStory, setSelectedStory] = useState(null);
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Load all data on mount
  useEffect(() => {
    async function loadAllData() {
      try {
        const [timeline, stories, teachings, quiz, media, tribs] = await Promise.all([
          fetchTimeline(),
          fetchStories(),
          fetchTeachings(),
          fetchQuiz(),
          fetchMultimedia(),
          fetchTributes()
        ]);

        setTimelineData(timeline);
        setStoriesData(stories);
        setTeachingsData(teachings);
        setQuizData(quiz);
        setMultimediaData(media);
        setTributes(tribs);
      } catch (err) {
        console.error('Lỗi khi tải dữ liệu trang:', err);
      }
    }

    loadAllData();
  }, []);

  // Scroll Spy: Automatically track user scroll position and highlight the corresponding nav item
  useEffect(() => {
    const sectionConfigs = [
      { id: 'hero', navId: 'hero' },
      { id: 'timeline', navId: 'hero' },
      { id: 'stories', navId: 'stories' },
      { id: 'teachings', navId: 'stories' },
      { id: 'quiz', navId: 'quiz' },
      { id: 'library', navId: 'library' },
      { id: 'about', navId: 'about' }
    ];

    let isThrottled = false;

    const handleScrollSpy = () => {
      if (isThrottled) return;
      isThrottled = true;

      requestAnimationFrame(() => {
        isThrottled = false;

        // If user scrolled near bottom of page, activate 'about'
        const isNearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 120;
        if (isNearBottom) {
          setActiveSection('about');
          return;
        }

        // Check which section is currently occupying the focal reading area of the screen
        let currentNav = 'hero';
        for (const sec of sectionConfigs) {
          const el = document.getElementById(sec.id);
          if (el) {
            const rect = el.getBoundingClientRect();
            // Trigger when the element top is near or past the navbar, and still on screen
            if (rect.top <= 260 && rect.bottom >= 100) {
              currentNav = sec.navId;
            }
          }
        }

        setActiveSection(currentNav);
      });
    };

    window.addEventListener('scroll', handleScrollSpy, { passive: true });
    handleScrollSpy();

    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, []);

  const handleNavigate = (sectionId) => {
    setActiveSection(sectionId);
    const elem = document.getElementById(sectionId);
    if (elem) {
      const navOffset = 75;
      const elementPosition = elem.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - navOffset,
        behavior: 'smooth'
      });
    }
  };

  const handleSelectStory = (story) => {
    setSelectedStory(story);
    setIsStoryModalOpen(true);
  };

  const handleCloseStoryModal = () => {
    setIsStoryModalOpen(false);
  };

  const handleLikeStory = async (storyId) => {
    setStoriesData(prev => prev.map(s => {
      if (s.id === storyId) {
        return { ...s, likes: (s.likes || 0) + 1 };
      }
      return s;
    }));

    if (selectedStory && selectedStory.id === storyId) {
      setSelectedStory(prev => ({ ...prev, likes: (prev.likes || 0) + 1 }));
    }

    await likeStoryApi(storyId);
  };

  const handleSubmitTribute = async (tributeData) => {
    const created = await submitTribute(tributeData);
    if (created) {
      setTributes(prev => [created, ...prev]);
    }
  };

  const handleLikeTribute = (tributeId) => {
    setTributes(prev => prev.map(t => {
      if (t.id === tributeId) {
        return { ...t, likes: (t.likes || 0) + 1 };
      }
      return t;
    }));
  };

  return (
    <div className="min-h-screen bg-[#160e08] text-stone-200 flex flex-col font-sans selection:bg-amber-500 selection:text-stone-950">
      
      {/* Top Navigation Bar with "Đuốc Sáng" Brand */}
      <Navbar 
        activeSection={activeSection} 
        onNavigate={handleNavigate}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      <main className="flex-grow">
        {/* Hero Section matching the user's uploaded mockup */}
        <HeroSection onExplore={() => handleNavigate('timeline')} />

        {/* Timeline: Hành trình Dựng nước & Cứu nước */}
        <TimelineSection timelineData={timelineData} />

        {/* Stories: Những câu chuyện cảm động */}
        <StoriesSection 
          storiesData={storiesData} 
          onSelectStory={handleSelectStory}
          onLikeStory={handleLikeStory}
        />

        {/* Teachings & Tư tưởng của Bác */}
        <TeachingsSection teachingsData={teachingsData} />

        {/* Mini Game: Ong Vàng Vượt Ải Lịch Sử */}
        <OngVangGame quizData={quizData} />

        {/* Library: Thư viện tư liệu ảnh & Ca khúc bất hủ */}
        <GallerySection multimediaData={multimediaData} />

        {/* About: Về chúng tôi & Sổ lưu bút tri ân */}
        <TributeSection 
          tributes={tributes}
          onSubmitTribute={handleSubmitTribute}
          onLikeTribute={handleLikeTribute}
        />
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Story Details & TTS Audio Modal */}
      <StoryModal 
        story={selectedStory}
        isOpen={isStoryModalOpen}
        onClose={handleCloseStoryModal}
        onLike={handleLikeStory}
      />

      {/* Quick Search Modal */}
      <SearchModal 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        storiesData={storiesData}
        timelineData={timelineData}
        onSelectStory={handleSelectStory}
        onSelectEra={(idx) => {
          handleNavigate('timeline');
        }}
      />
    </div>
  );
}
