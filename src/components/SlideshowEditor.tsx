import React, { useState } from 'react';
import { Slide, Sticker, TransitionEffect, TextAnimation, Language } from '../types';
import { PRESET_BACKGROUND_DESIGNS, CALLIGRAPHY_BADGES } from '../constants/presets';
import { 
  Plus, Trash2, Image as ImageIcon, Sparkles, Wand2, Move, 
  Smile, AlignLeft, Layers, Sliders, Type, Clock, Copy, ArrowRight, ArrowLeft 
} from 'lucide-react';

interface SlideshowEditorProps {
  slides: Slide[];
  activeSlideIndex: number;
  onSelectSlideIndex: (index: number) => void;
  onUpdateSlide: (index: number, updatedSlide: Slide) => void;
  onAddSlide: () => void;
  onDeleteSlide: (index: number) => void;
  onDuplicateSlide: (index: number) => void;
  onOpenAiWishModal: () => void;
  language: Language;
}

export const SlideshowEditor: React.FC<SlideshowEditorProps> = ({
  slides,
  activeSlideIndex,
  onSelectSlideIndex,
  onUpdateSlide,
  onAddSlide,
  onDeleteSlide,
  onDuplicateSlide,
  onOpenAiWishModal,
  language,
}) => {
  const isFa = language === 'fa';
  const currentSlide = slides[activeSlideIndex] || slides[0];

  const [activeTab, setActiveTab] = useState<'content' | 'design' | 'stickers' | 'motion'>('content');

  // Handle image upload from user computer
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onUpdateSlide(activeSlideIndex, {
            ...currentSlide,
            imageUrl: event.target.result as string,
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Add sticker to slide
  const handleAddSticker = (content: string, type: Sticker['type']) => {
    const newSticker: Sticker = {
      id: 'stk-' + Date.now(),
      type,
      content,
      x: 50,
      y: 30 + (currentSlide.stickers?.length || 0) * 15,
      scale: 1.2,
      rotation: 0,
    };
    onUpdateSlide(activeSlideIndex, {
      ...currentSlide,
      stickers: [...(currentSlide.stickers || []), newSticker],
    });
  };

  // Remove sticker
  const handleRemoveSticker = (stickerId: string) => {
    onUpdateSlide(activeSlideIndex, {
      ...currentSlide,
      stickers: currentSlide.stickers.filter((s) => s.id !== stickerId),
    });
  };

  return (
    <div className="w-full bg-slate-900/60 border border-slate-800 rounded-2xl p-5 shadow-xl">
      
      {/* Slide Thumbnails Rail */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-pink-400" />
          <h3 className="text-base font-bold text-white font-lalezar">
            {isFa ? 'اسلایدهای کلیپ تولد' : 'Clip Slides Timeline'}
          </h3>
          <span className="text-xs text-slate-400">({slides.length} {isFa ? 'اسلاید' : 'slides'})</span>
        </div>

        <button
          onClick={onAddSlide}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-pink-300 bg-pink-950/60 border border-pink-500/30 rounded-xl hover:bg-pink-900/80 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>{isFa ? 'افزودن اسلاید جدید' : 'Add Slide'}</span>
        </button>
      </div>

      {/* Thumbnails list */}
      <div className="flex items-center gap-3 overflow-x-auto pb-4 mb-6">
        {slides.map((slide, idx) => {
          const isActive = idx === activeSlideIndex;
          return (
            <div
              key={slide.id}
              onClick={() => onSelectSlideIndex(idx)}
              className={`relative shrink-0 w-28 h-20 rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${
                isActive
                  ? 'border-pink-500 ring-2 ring-pink-500/30 scale-105 shadow-md shadow-pink-500/20'
                  : 'border-slate-800 opacity-70 hover:opacity-100 hover:border-slate-700'
              }`}
            >
              <img
                src={slide.imageUrl}
                alt={`Slide ${idx + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-between p-1.5">
                <span className="text-[10px] font-bold text-white bg-black/50 px-1.5 py-0.5 rounded">
                  {idx + 1}
                </span>
                <span className="text-[9px] text-pink-300 bg-pink-950/80 px-1 rounded">
                  {slide.duration}s
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Slide Toolbar Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setActiveTab('content')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              activeTab === 'content' ? 'bg-pink-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            {isFa ? 'متن و پیام' : 'Text & Message'}
          </button>
          <button
            onClick={() => setActiveTab('design')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              activeTab === 'design' ? 'bg-pink-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            {isFa ? 'تصویر پس‌زمینه' : 'Background Photo'}
          </button>
          <button
            onClick={() => setActiveTab('stickers')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              activeTab === 'stickers' ? 'bg-pink-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            {isFa ? 'استیکر و کالیگرافی' : 'Stickers & Badges'}
          </button>
          <button
            onClick={() => setActiveTab('motion')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              activeTab === 'motion' ? 'bg-pink-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            {isFa ? 'افکت و افکت حرکتی' : 'Transitions & Duration'}
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onDuplicateSlide(activeSlideIndex)}
            className="p-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 rounded-lg border border-slate-800 transition-colors"
            title={isFa ? 'کپی از اسلاید' : 'Duplicate Slide'}
          >
            <Copy className="w-3.5 h-3.5" />
          </button>
          {slides.length > 1 && (
            <button
              onClick={() => onDeleteSlide(activeSlideIndex)}
              className="p-2 text-xs font-medium text-rose-400 hover:text-rose-300 bg-rose-950/40 hover:bg-rose-900/60 rounded-lg border border-rose-800/40 transition-colors"
              title={isFa ? 'حذف اسلاید' : 'Delete Slide'}
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Tab 1: Content & Text */}
      {activeTab === 'content' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Type className="w-3.5 h-3.5 text-pink-400" />
              <span>{isFa ? 'متن اصلی (تیتر اسلاید)' : 'Main Headline'}</span>
            </label>
            <button
              onClick={onOpenAiWishModal}
              className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold text-amber-300 bg-amber-950/80 border border-amber-500/40 rounded-lg hover:bg-amber-900 transition-colors shadow-sm"
            >
              <Wand2 className="w-3 h-3 text-amber-400 animate-pulse" />
              <span>{isFa ? 'نویسنده هوشمند متن تولد (AI)' : 'AI Wish Writer'}</span>
            </button>
          </div>

          <textarea
            value={currentSlide.headline}
            onChange={(e) =>
              onUpdateSlide(activeSlideIndex, {
                ...currentSlide,
                headline: e.target.value,
              })
            }
            rows={2}
            placeholder={isFa ? 'متن تبریک یا آرزوی تولد را بنویسید...' : 'Write headline wish...'}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500 transition-colors font-vazir"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                {isFa ? 'نام صاحب تولد' : 'Recipient Name'}
              </label>
              <input
                type="text"
                value={currentSlide.recipientName}
                onChange={(e) =>
                  onUpdateSlide(activeSlideIndex, {
                    ...currentSlide,
                    recipientName: e.target.value,
                  })
                }
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-pink-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                {isFa ? 'سن / عدد تولد (اختیاری)' : 'Age (Optional)'}
              </label>
              <input
                type="text"
                value={currentSlide.age || ''}
                onChange={(e) =>
                  onUpdateSlide(activeSlideIndex, {
                    ...currentSlide,
                    age: e.target.value,
                  })
                }
                placeholder="25, 30, 18..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-pink-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                {isFa ? 'از طرف (فرستنده)' : 'From (Sender)'}
              </label>
              <input
                type="text"
                value={currentSlide.senderName}
                onChange={(e) =>
                  onUpdateSlide(activeSlideIndex, {
                    ...currentSlide,
                    senderName: e.target.value,
                  })
                }
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-pink-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              {isFa ? 'زیرنویس یا شعر دلنشین' : 'Subtext / Message Poem'}
            </label>
            <input
              type="text"
              value={currentSlide.subtext}
              onChange={(e) =>
                onUpdateSlide(activeSlideIndex, {
                  ...currentSlide,
                  subtext: e.target.value,
                })
              }
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-pink-500 focus:outline-none"
            />
          </div>
        </div>
      )}

      {/* Tab 2: Design & Image */}
      {activeTab === 'design' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-slate-950 p-3 rounded-xl border border-slate-800">
            <div>
              <p className="text-xs font-semibold text-white">
                {isFa ? 'بارگذاری عکس از دستگاه شما' : 'Upload Custom Photo'}
              </p>
              <p className="text-[11px] text-slate-400">
                {isFa ? 'عکس‌های خاطره‌انگیز دوست یا عزیزتان را انتخاب کنید' : 'Upload photos of recipient'}
              </p>
            </div>
            <label className="cursor-pointer px-3 py-1.5 text-xs font-semibold text-white bg-pink-600 hover:bg-pink-500 rounded-lg transition-colors shrink-0">
              <span>{isFa ? 'انتخاب فایل عکس' : 'Browse Photo'}</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>

          <div>
            <p className="text-xs font-semibold text-slate-300 mb-2">
              {isFa ? 'یا استفاده از پس‌زمینه‌های آماده جشن تولد' : 'Or Choose Preset Birthday Background'}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {PRESET_BACKGROUND_DESIGNS.map((bg) => (
                <div
                  key={bg.id}
                  onClick={() =>
                    onUpdateSlide(activeSlideIndex, {
                      ...currentSlide,
                      imageUrl: bg.url,
                    })
                  }
                  className={`group relative h-20 rounded-xl overflow-hidden cursor-pointer border transition-all ${
                    currentSlide.imageUrl === bg.url ? 'border-pink-500 ring-2 ring-pink-500/50' : 'border-slate-800 hover:border-slate-600'
                  }`}
                >
                  <img src={bg.url} alt={bg.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-black/40 flex items-end p-1">
                    <span className="text-[9px] font-medium text-white truncate">{bg.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Stickers & Calligraphy */}
      {activeTab === 'stickers' && (
        <div className="space-y-4">
          <div>
            <p className="text-xs font-semibold text-slate-300 mb-2">
              {isFa ? 'افزودن کالیگرافی تبریک فارسی' : 'Add Persian Calligraphy Badges'}
            </p>
            <div className="flex flex-wrap gap-2">
              {CALLIGRAPHY_BADGES.map((badge, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAddSticker(badge.value, 'calligraphy')}
                  className="px-3 py-1.5 text-xs font-medium text-amber-300 bg-amber-950/60 border border-amber-500/30 rounded-xl hover:bg-amber-900/80 transition-colors font-lalezar"
                >
                  {badge.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold text-slate-300 mb-2">
              {isFa ? 'افزودن آیکون و استیکرهای متحرک' : 'Add Animated Emoji & Symbols'}
            </p>
            <div className="flex flex-wrap gap-2">
              {['👑', '🎈', '🎁', '🎂', '🎉', '💖', '🥳', '🌟', '🌺', '✨'].map((emoji, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAddSticker(emoji, 'emoji')}
                  className="w-10 h-10 text-xl bg-slate-950 border border-slate-800 hover:border-pink-500 rounded-xl flex items-center justify-center transition-transform hover:scale-110"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Applied stickers list */}
          {currentSlide.stickers && currentSlide.stickers.length > 0 && (
            <div className="mt-4 pt-4 border-t border-slate-800">
              <p className="text-xs font-semibold text-slate-300 mb-2">
                {isFa ? 'استیکرهای فعال روی این اسلاید:' : 'Active Stickers on Slide:'}
              </p>
              <div className="flex flex-wrap gap-2">
                {currentSlide.stickers.map((stk) => (
                  <div
                    key={stk.id}
                    className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-white"
                  >
                    <span>{stk.content}</span>
                    <button
                      onClick={() => handleRemoveSticker(stk.id)}
                      className="text-rose-400 hover:text-rose-300 text-xs font-bold"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Motion & Timing */}
      {activeTab === 'motion' && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-pink-400" />
              <span>{isFa ? 'زمان نمایش اسلاید (ثانیه)' : 'Slide Duration'}</span>
            </label>
            <select
              value={currentSlide.duration}
              onChange={(e) =>
                onUpdateSlide(activeSlideIndex, {
                  ...currentSlide,
                  duration: Number(e.target.value),
                })
              }
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-pink-500"
            >
              <option value={2}>2 {isFa ? 'ثانیه (تند)' : 'seconds'}</option>
              <option value={3}>3 {isFa ? 'ثانیه' : 'seconds'}</option>
              <option value={4}>4 {isFa ? 'ثانیه (استاندارد)' : 'seconds'}</option>
              <option value={5}>5 {isFa ? 'ثانیه' : 'seconds'}</option>
              <option value={7}>7 {isFa ? 'ثانیه (آرام)' : 'seconds'}</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              {isFa ? 'جلوه انتقال به اسلاید بعدی' : 'Transition Effect'}
            </label>
            <select
              value={currentSlide.transition}
              onChange={(e) =>
                onUpdateSlide(activeSlideIndex, {
                  ...currentSlide,
                  transition: e.target.value as TransitionEffect,
                })
              }
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-pink-500"
            >
              <option value="fade">{isFa ? 'محو و پدیدار (Fade)' : 'Fade'}</option>
              <option value="zoom">{isFa ? 'زوم سینمایی (Zoom)' : 'Zoom In'}</option>
              <option value="slide">{isFa ? 'اسلاید جانبی (Slide)' : 'Slide'}</option>
              <option value="starburst">{isFa ? 'انفجار ستاره‌ای (Starburst)' : 'Starburst'}</option>
              <option value="glitter">{isFa ? 'درخشش کریستالی (Glitter)' : 'Glitter'}</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              {isFa ? 'پویانمایی متن' : 'Text Animation Style'}
            </label>
            <select
              value={currentSlide.textAnim}
              onChange={(e) =>
                onUpdateSlide(activeSlideIndex, {
                  ...currentSlide,
                  textAnim: e.target.value as TextAnimation,
                })
              }
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-pink-500"
            >
              <option value="bounce">{isFa ? 'پرش شاد (Bounce)' : 'Bounce'}</option>
              <option value="glow">{isFa ? 'درخشش نئونی (Glow)' : 'Glow'}</option>
              <option value="zoom-pop">{isFa ? 'بزرگ‌نمایی سریع (Zoom Pop)' : 'Zoom Pop'}</option>
              <option value="typewriter">{isFa ? 'تایپ ماشینی (Typewriter)' : 'Typewriter'}</option>
            </select>
          </div>
        </div>
      )}

    </div>
  );
};
