import React from 'react';
import { Film, Sparkles, Share2, PlusCircle, Globe } from 'lucide-react';
import { Language } from '../types';

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onNewProject: () => void;
  onOpenShareModal: () => void;
  activeSection: 'templates' | 'editor' | 'audio' | 'candles';
  onSectionChange: (section: 'templates' | 'editor' | 'audio' | 'candles') => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onLanguageChange,
  onNewProject,
  onOpenShareModal,
  activeSection,
  onSectionChange,
}) => {
  const isFa = language === 'fa';

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
        
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-500 via-rose-500 to-amber-400 p-0.5 shadow-lg shadow-pink-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-xl">
              🎂
            </div>
          </div>
          <a
            href="/"
            className="text-xl font-bold tracking-tight bg-gradient-to-r from-pink-400 via-rose-300 to-amber-200 bg-clip-text text-transparent whitespace-nowrap shrink-0 font-lalezar"
          >
            {isFa ? 'کلیپ تولد' : 'Clip Tavallod'}
          </a>
        </div>

        {/* Zone 2: Clean 4–5 single-line navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <button
            onClick={() => onSectionChange('templates')}
            className={`transition-colors whitespace-nowrap shrink-0 py-1 ${
              activeSection === 'templates'
                ? 'text-pink-400 border-b-2 border-pink-500 font-semibold'
                : 'hover:text-slate-100'
            }`}
          >
            {isFa ? 'قالب‌های آماده‌' : 'Templates'}
          </button>

          <button
            onClick={() => onSectionChange('editor')}
            className={`transition-colors whitespace-nowrap shrink-0 py-1 ${
              activeSection === 'editor'
                ? 'text-pink-400 border-b-2 border-pink-500 font-semibold'
                : 'hover:text-slate-100'
            }`}
          >
            {isFa ? 'ویرایشگر کلیپ' : 'Video Editor'}
          </button>

          <button
            onClick={() => onSectionChange('audio')}
            className={`transition-colors whitespace-nowrap shrink-0 py-1 ${
              activeSection === 'audio'
                ? 'text-pink-400 border-b-2 border-pink-500 font-semibold'
                : 'hover:text-slate-100'
            }`}
          >
            {isFa ? 'موسیقی و صدا' : 'Music & Audio'}
          </button>

          <button
            onClick={() => onSectionChange('candles')}
            className={`transition-colors whitespace-nowrap shrink-0 py-1 ${
              activeSection === 'candles'
                ? 'text-pink-400 border-b-2 border-pink-500 font-semibold'
                : 'hover:text-slate-100'
            }`}
          >
            {isFa ? 'کیک و فوت شمع' : 'Cake & Candles'}
          </button>
        </nav>

        {/* Zone 3: Single primary action + language toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onLanguageChange(isFa ? 'en' : 'fa')}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-300 bg-slate-900 border border-slate-800 rounded-lg hover:border-slate-700 hover:text-white transition-colors whitespace-nowrap shrink-0"
            title="تغییر زبان / Switch Language"
          >
            <Globe className="w-3.5 h-3.5 text-pink-400" />
            <span>{isFa ? 'English' : 'فارسی'}</span>
          </button>

          <button
            onClick={onOpenShareModal}
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 rounded-xl hover:opacity-95 shadow-md shadow-pink-500/20 active:scale-95 transition-all whitespace-nowrap shrink-0"
          >
            <Share2 className="w-4 h-4" />
            <span>{isFa ? 'خروجی و اشتراک‌گذاری' : 'Export & Share'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
