import React, { useState, useEffect } from 'react';
import { ClipProject, Language, Slide } from './types';
import { DEFAULT_SLIDES, TEMPLATE_PRESETS, TemplatePreset } from './constants/presets';
import { Header } from './components/Header';
import { TemplateSelector } from './components/TemplateSelector';
import { SlideshowEditor } from './components/SlideshowEditor';
import { SlidePreviewPlayer } from './components/SlidePreviewPlayer';
import { AudioStudio } from './components/AudioStudio';
import { CandleBlowingCanvas } from './components/CandleBlowingCanvas';
import { AIWishGeneratorModal } from './components/AIWishGeneratorModal';
import { ExportShareModal } from './components/ExportShareModal';
import { InteractiveGreetingCardView } from './components/InteractiveGreetingCardView';
import { Sparkles, Wand2, Film, Music, Flame, Heart, Share2, Layers } from 'lucide-react';

export function App() {
  const [language, setLanguage] = useState<Language>('fa');
  const [activeSection, setActiveSection] = useState<'templates' | 'editor' | 'audio' | 'candles'>('editor');
  
  // Shared card check from URL hash
  const [sharedProject, setSharedProject] = useState<ClipProject | null>(null);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash.startsWith('#card=')) {
      try {
        const encoded = hash.replace('#card=', '');
        const jsonStr = decodeURIComponent(atob(encoded));
        const projectData: ClipProject = JSON.parse(jsonStr);
        setSharedProject(projectData);
      } catch (err) {
        console.error('Failed to parse card from URL:', err);
      }
    }
  }, []);

  // Main Project State
  const [project, setProject] = useState<ClipProject>(() => {
    const saved = localStorage.getItem('clip_tavallod_project');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (err) {
        // fallback
      }
    }

    return {
      id: 'proj-' + Date.now(),
      title: 'کلیپ تولد زیبا',
      recipientName: 'سارا',
      senderName: 'از طرف علی',
      age: '25',
      templateId: 'persian-gold',
      slides: DEFAULT_SLIDES,
      selectedMusicId: 'tavallod-classic',
      candlesCount: 5,
      customWishText: '',
      createdAt: Date.now(),
    };
  });

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem('clip_tavallod_project', JSON.stringify(project));
  }, [project]);

  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Handle template switch
  const handleSelectTemplate = (preset: TemplatePreset) => {
    setProject((prev) => ({
      ...prev,
      templateId: preset.id,
      selectedMusicId: preset.defaultMusicId,
    }));
  };

  // Handle slide update
  const handleUpdateSlide = (index: number, updatedSlide: Slide) => {
    setProject((prev) => {
      const newSlides = [...prev.slides];
      newSlides[index] = updatedSlide;
      return { ...prev, slides: newSlides };
    });
  };

  // Add slide
  const handleAddSlide = () => {
    const newSlide: Slide = {
      id: 'slide-' + Date.now(),
      imageUrl: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1200&q=80',
      headline: 'یک سال دیگه هم خاطره شد!',
      subtext: 'با آرزوی بهترین لحظه‌ها برای تو',
      recipientName: project.recipientName,
      senderName: project.senderName,
      transition: 'fade',
      textAnim: 'bounce',
      duration: 4,
      stickers: [],
    };

    setProject((prev) => ({
      ...prev,
      slides: [...prev.slides, newSlide],
    }));
    setActiveSlideIndex(project.slides.length);
  };

  // Delete slide
  const handleDeleteSlide = (index: number) => {
    if (project.slides.length <= 1) return;
    setProject((prev) => {
      const newSlides = prev.slides.filter((_, i) => i !== index);
      return { ...prev, slides: newSlides };
    });
    setActiveSlideIndex((prev) => Math.max(0, prev - 1));
  };

  // Duplicate slide
  const handleDuplicateSlide = (index: number) => {
    const slideToCopy = project.slides[index];
    if (!slideToCopy) return;

    const copySlide: Slide = {
      ...slideToCopy,
      id: 'slide-' + Date.now(),
    };

    setProject((prev) => {
      const newSlides = [...prev.slides];
      newSlides.splice(index + 1, 0, copySlide);
      return { ...prev, slides: newSlides };
    });
    setActiveSlideIndex(index + 1);
  };

  // Apply AI wish text
  const handleApplyAiWish = (wishText: string) => {
    const currentSlide = project.slides[activeSlideIndex] || project.slides[0];
    handleUpdateSlide(activeSlideIndex, {
      ...currentSlide,
      headline: wishText,
    });
  };

  // If opening shared card view from URL
  if (sharedProject) {
    return (
      <InteractiveGreetingCardView
        project={sharedProject}
        language={language}
        onOpenStudio={() => {
          setSharedProject(null);
          window.location.hash = '';
        }}
      />
    );
  }

  const isFa = language === 'fa';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-vazir selection:bg-pink-500 selection:text-white">
      
      {/* Header Bar */}
      <Header
        language={language}
        onLanguageChange={setLanguage}
        onNewProject={() => {
          if (confirm(isFa ? 'آیا می‌خواهید پروژه جدیدی شروع کنید؟' : 'Start a new project?')) {
            localStorage.removeItem('clip_tavallod_project');
            window.location.reload();
          }
        }}
        onOpenShareModal={() => setIsShareModalOpen(true)}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />

      {/* Main Studio Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-8 space-y-8">
        
        {/* Top Section Hero & Video Player Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left / Main Column: Live Video Player */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Film className="w-5 h-5 text-pink-400" />
                <h2 className="text-xl font-bold text-white font-lalezar">
                  {isFa ? 'پیش‌نمایش زنده کلیپ تولد' : 'Live Video Clip Preview'}
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsAiModalOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-amber-300 bg-amber-950/80 border border-amber-500/40 rounded-xl hover:bg-amber-900 transition-colors shadow-sm"
                >
                  <Wand2 className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                  <span>{isFa ? 'متن‌نویس AI' : 'AI Wish Generator'}</span>
                </button>
              </div>
            </div>

            {/* Live Synchronized Player */}
            <SlidePreviewPlayer
              slides={project.slides}
              templateId={project.templateId}
              musicMelody="persian"
              voiceNoteUrl={project.voiceNoteUrl}
              language={language}
            />
          </div>

          {/* Right Column: Quick Template & Project Controls */}
          <div className="lg:col-span-5 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
            <div>
              <div className="flex items-center gap-2 text-xs text-pink-400 font-semibold mb-1">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>{isFa ? 'تنظیمات کلیپ تولد' : 'Clip Details'}</span>
              </div>
              <h3 className="text-xl font-bold text-white font-lalezar">
                {isFa ? 'مشخصات جشن تولد' : 'Birthday Celebration Info'}
              </h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {isFa ? 'نام صاحب تولد (مخاطب)' : 'Birthday Person Name'}
                </label>
                <input
                  type="text"
                  value={project.recipientName}
                  onChange={(e) => setProject({ ...project, recipientName: e.target.value })}
                  placeholder={isFa ? 'مثال: سارا' : 'e.g. Sarah'}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-sm text-white focus:border-pink-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    {isFa ? 'سن / عدد شمع' : 'Age / Candles'}
                  </label>
                  <input
                    type="text"
                    value={project.age || ''}
                    onChange={(e) => setProject({ ...project, age: e.target.value })}
                    placeholder="25"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:border-pink-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    {isFa ? 'فرستنده کلیپ' : 'From Sender'}
                  </label>
                  <input
                    type="text"
                    value={project.senderName}
                    onChange={(e) => setProject({ ...project, senderName: e.target.value })}
                    placeholder={isFa ? 'مثال: از طرف علی' : 'e.g. From Ali'}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:border-pink-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Quick Section Tabs */}
              <div className="pt-2 border-t border-slate-800 grid grid-cols-2 gap-2">
                <button
                  onClick={() => setActiveSection('templates')}
                  className={`flex items-center justify-center gap-2 py-2.5 px-3 text-xs font-bold rounded-xl border transition-colors ${
                    activeSection === 'templates'
                      ? 'bg-pink-600 border-pink-500 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>{isFa ? 'انتخاب قالب' : 'Templates'}</span>
                </button>

                <button
                  onClick={() => setActiveSection('audio')}
                  className={`flex items-center justify-center gap-2 py-2.5 px-3 text-xs font-bold rounded-xl border transition-colors ${
                    activeSection === 'audio'
                      ? 'bg-pink-600 border-pink-500 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <Music className="w-3.5 h-3.5" />
                  <span>{isFa ? 'موسیقی و صدا' : 'Music & Audio'}</span>
                </button>
              </div>

              <button
                onClick={() => setIsShareModalOpen(true)}
                className="w-full py-3 text-xs font-bold text-white bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 rounded-xl hover:opacity-95 shadow-lg shadow-pink-500/20 active:scale-95 transition-all flex items-center justify-center gap-2 font-lalezar"
              >
                <Share2 className="w-4 h-4" />
                <span>{isFa ? 'ساخت و دریافت لینک کارت تبریک' : 'Get Shareable Card Link'}</span>
              </button>
            </div>
          </div>

        </div>

        {/* Section View Switcher */}
        {activeSection === 'templates' && (
          <TemplateSelector
            selectedTemplateId={project.templateId}
            onSelectTemplate={handleSelectTemplate}
            language={language}
          />
        )}

        {activeSection === 'editor' && (
          <SlideshowEditor
            slides={project.slides}
            activeSlideIndex={activeSlideIndex}
            onSelectSlideIndex={setActiveSlideIndex}
            onUpdateSlide={handleUpdateSlide}
            onAddSlide={handleAddSlide}
            onDeleteSlide={handleDeleteSlide}
            onDuplicateSlide={handleDuplicateSlide}
            onOpenAiWishModal={() => setIsAiModalOpen(true)}
            language={language}
          />
        )}

        {activeSection === 'audio' && (
          <AudioStudio
            selectedMusicId={project.selectedMusicId}
            onSelectMusic={(id) => setProject({ ...project, selectedMusicId: id })}
            voiceNoteUrl={project.voiceNoteUrl}
            onUpdateVoiceNote={(url) => setProject({ ...project, voiceNoteUrl: url })}
            language={language}
          />
        )}

        {activeSection === 'candles' && (
          <CandleBlowingCanvas
            candlesCount={project.candlesCount}
            recipientName={project.recipientName}
            onUpdateCandlesCount={(count) => setProject({ ...project, candlesCount: count })}
            language={language}
          />
        )}

      </main>

      {/* Modals */}
      <AIWishGeneratorModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        onApplyWish={handleApplyAiWish}
        defaultRecipientName={project.recipientName}
        language={language}
      />

      <ExportShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        project={project}
        language={language}
      />

      {/* Footer */}
      <footer className="w-full bg-slate-950 border-t border-slate-900 py-6 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="flex items-center gap-1">
            <span>Clip Tavallod</span>
            <span>·</span>
            <span>استودیو تخصصی ساخت کلیپ و کارت تبریک تولد</span>
          </p>
          <p>
            {isFa ? 'طراحی شده با عشق برای لحظه‌های شاد شما 💖' : 'Crafted for celebrating joyful birthday moments'}
          </p>
        </div>
      </footer>

    </div>
  );
}

export default App;
