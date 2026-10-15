import React, { useState } from 'react';
import { ClipProject, Language } from '../types';
import { SlidePreviewPlayer } from './SlidePreviewPlayer';
import { CandleBlowingCanvas } from './CandleBlowingCanvas';
import { audioStudio } from '../utils/audio';
import confetti from 'canvas-confetti';
import { Gift, Sparkles, Heart, Play, Music, Volume2, PlusCircle, VolumeX } from 'lucide-react';
import { TEMPLATE_PRESETS } from '../constants/presets';

interface InteractiveGreetingCardViewProps {
  project: ClipProject;
  language: Language;
  onOpenStudio: () => void;
}

export const InteractiveGreetingCardView: React.FC<InteractiveGreetingCardViewProps> = ({
  project,
  language,
  onOpenStudio,
}) => {
  const isFa = language === 'fa';
  const [isOpenGift, setIsOpenGift] = useState(false);
  const [candlesCount, setCandlesCount] = useState(project.candlesCount || 3);

  const preset = TEMPLATE_PRESETS.find((p) => p.id === project.templateId) || TEMPLATE_PRESETS[0];

  const handleOpenSurprise = () => {
    setIsOpenGift(true);
    audioStudio.playSFX('cork');

    setTimeout(() => {
      confetti({
        particleCount: 120,
        spread: 100,
        origin: { y: 0.5 },
        colors: ['#f472b6', '#fbbf24', '#38bdf8', '#c084fc', '#4ade80'],
      });
      audioStudio.playSFX('cheer');
    }, 400);
  };

  return (
    <div className={`min-h-screen w-full bg-gradient-to-b ${preset.bgGradient} text-white flex flex-col items-center justify-center p-4 md:p-8 font-vazir relative overflow-hidden`}>
      
      {/* Background Floating Glitter Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/10 rounded-full blur-[120px] pointer-events-none" />

      {!isOpenGift ? (
        /* Envelope / Surprise Gift Screen */
        <div className="relative z-10 max-w-md w-full bg-slate-900/80 border border-slate-700/60 rounded-3xl p-8 text-center shadow-2xl backdrop-blur-xl space-y-6 animate-float">
          
          <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-pink-500 via-rose-500 to-amber-400 p-0.5 shadow-xl shadow-pink-500/30 flex items-center justify-center">
            <div className="w-full h-full bg-slate-950 rounded-[22px] flex items-center justify-center text-4xl">
              🎁
            </div>
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold font-lalezar mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{isFa ? 'یک هدیه تصویری برای شما' : 'A Birthday Surprise For You'}</span>
            </div>

            <h1 className="text-3xl font-extrabold text-white font-lalezar drop-shadow-md">
              {project.recipientName || (isFa ? 'عزیزم' : 'Dear Friend')}
            </h1>

            {project.senderName && (
              <p className="text-sm text-pink-300 font-medium mt-1">
                {isFa ? 'از طرف:' : 'From:'} {project.senderName}
              </p>
            )}
          </div>

          <button
            onClick={handleOpenSurprise}
            className="w-full py-4 text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-pink-400 to-rose-400 rounded-2xl hover:opacity-95 shadow-xl shadow-pink-500/30 active:scale-95 transition-all flex items-center justify-center gap-2 font-lalezar"
          >
            <Gift className="w-5 h-5 fill-slate-950" />
            <span>{isFa ? 'باز کردن کارت تبریک تولد' : 'Open Birthday Greeting Card'}</span>
          </button>
        </div>
      ) : (
        /* Full Opened Interactive Card View */
        <div className="relative z-10 max-w-4xl w-full space-y-8 my-auto">
          
          {/* Top Bar */}
          <div className="flex items-center justify-between bg-slate-950/80 border border-slate-800 rounded-2xl p-4 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="text-2xl">🎂</div>
              <div>
                <h2 className="text-lg font-bold text-white font-lalezar">
                  {isFa ? `تولدت مبارک ${project.recipientName}!` : `Happy Birthday ${project.recipientName}!`}
                </h2>
                <p className="text-xs text-pink-300">
                  {isFa ? `با آرزوی بهترین‌ها از طرف ${project.senderName || 'دوستدارت'}` : `With best wishes from ${project.senderName}`}
                </p>
              </div>
            </div>

            <button
              onClick={onOpenStudio}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-pink-600 hover:bg-pink-500 rounded-xl transition-colors shadow-md shadow-pink-600/20"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{isFa ? 'ساخت کلیپ تولد جدید' : 'Create Video Clip'}</span>
            </button>
          </div>

          {/* Video Player Frame */}
          <SlidePreviewPlayer
            slides={project.slides}
            templateId={project.templateId}
            musicMelody="persian"
            voiceNoteUrl={project.voiceNoteUrl}
            language={language}
          />

          {/* Voice Greeting audio player if present */}
          {project.voiceNoteUrl && (
            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center">
                  <Volume2 className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">
                    {isFa ? 'پیام صوتی اختصاصیفرستنده' : 'Personal Voice Message'}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    {isFa ? 'برای شنیدن صدای صمیمی کلیک کنید' : 'Click to play vocal wish'}
                  </p>
                </div>
              </div>

              <audio controls src={project.voiceNoteUrl} className="h-8" />
            </div>
          )}

          {/* Interactive Cake Candle Blowing */}
          <CandleBlowingCanvas
            candlesCount={candlesCount}
            recipientName={project.recipientName}
            onUpdateCandlesCount={setCandlesCount}
            language={language}
          />

        </div>
      )}

    </div>
  );
};
