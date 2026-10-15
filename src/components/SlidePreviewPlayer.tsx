import React, { useState, useEffect, useRef } from 'react';
import { Slide, TemplateId, Language } from '../types';
import { TEMPLATE_PRESETS } from '../constants/presets';
import { audioStudio } from '../utils/audio';
import confetti from 'canvas-confetti';
import { Play, Pause, RotateCcw, Maximize2, Sparkles, Music, Mic, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SlidePreviewPlayerProps {
  slides: Slide[];
  templateId: TemplateId;
  musicMelody: 'persian' | 'classic' | 'upbeat' | 'waltz' | 'chill';
  voiceNoteUrl?: string;
  language: Language;
}

export const SlidePreviewPlayer: React.FC<SlidePreviewPlayerProps> = ({
  slides,
  templateId,
  musicMelody,
  voiceNoteUrl,
  language,
}) => {
  const isFa = language === 'fa';
  const currentPreset = TEMPLATE_PRESETS.find((p) => p.id === templateId) || TEMPLATE_PRESETS[0];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<number | null>(null);
  const currentSlide = slides[currentIndex] || slides[0];

  // Fire confetti burst when reaching final slide or starting
  const triggerConfetti = () => {
    confetti({
      particleCount: 70,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#f472b6', '#fbbf24', '#38bdf8', '#c084fc', '#4ade80'],
    });
  };

  // Play / Pause video clip timeline
  const togglePlay = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      triggerConfetti();
      if (!isMuted) {
        audioStudio.playSynthMelody(musicMelody, true);
        audioStudio.playSFX('cheer');
      }
    } else {
      setIsPlaying(false);
      audioStudio.stopMelody();
    }
  };

  // Timeline loop ticker
  useEffect(() => {
    if (!isPlaying) return;

    const duration = (currentSlide.duration || 4) * 1000;
    const interval = 50;
    let elapsed = 0;

    const id = window.setInterval(() => {
      elapsed += interval;
      setProgress((elapsed / duration) * 100);

      if (elapsed >= duration) {
        elapsed = 0;
        setProgress(0);
        setCurrentIndex((prev) => {
          const next = (prev + 1) % slides.length;
          if (next === 0) {
            triggerConfetti();
          }
          return next;
        });
      }
    }, interval);

    timerRef.current = id;
    return () => clearInterval(id);
  }, [isPlaying, currentIndex, slides.length, currentSlide.duration]);

  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      audioStudio.stopMelody();
    };
  }, []);

  // Handle Mute toggle
  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      if (isPlaying) {
        audioStudio.playSynthMelody(musicMelody, true);
      }
    } else {
      setIsMuted(true);
      audioStudio.stopMelody();
    }
  };

  // Toggle fullscreen mode
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden rounded-2xl border ${currentPreset.cardBg} shadow-2xl flex flex-col justify-between transition-all duration-500`}
      style={{ aspectRatio: '16/9', minHeight: '340px' }}
    >
      {/* Background Animated Gradient / Photo Frame */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide.id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src={currentSlide.imageUrl}
            alt="Birthday Slide"
            className="w-full h-full object-cover"
          />

          {/* Theme Gradient Overlay for readability */}
          <div className={`absolute inset-0 bg-gradient-to-t ${currentPreset.bgGradient} opacity-75`} />
        </motion.div>
      </AnimatePresence>

      {/* Top Floating Info Bar */}
      <div className="relative z-20 flex items-center justify-between p-4 bg-gradient-to-b from-black/80 via-black/30 to-transparent">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-amber-300 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-amber-500/30 font-lalezar">
            {currentSlide.recipientName || 'عزیزم'}
          </span>
          {currentSlide.age && (
            <span className="text-xs font-bold text-white bg-pink-600 px-2.5 py-0.5 rounded-full shadow-sm">
              {currentSlide.age} {isFa ? 'ساله' : 'yo'} 🎂
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleMute}
            className="p-2 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md border border-white/10 transition-colors"
            title={isMuted ? 'Muted' : 'Sound On'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md border border-white/10 transition-colors"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Slide Content Area */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-center text-center p-6 my-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id + '-text'}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl px-4"
          >
            {/* Calligraphy sticker badge if present */}
            {currentSlide.calligraphyText && (
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="mb-3 text-amber-300 text-2xl md:text-3xl font-lalezar drop-shadow-lg"
              >
                {currentSlide.calligraphyText}
              </motion.div>
            )}

            {/* Main Headline */}
            <h1
              className={`text-2xl md:text-4xl lg:text-5xl font-extrabold text-white drop-shadow-2xl mb-3 tracking-wide ${currentPreset.headerFont}`}
            >
              {currentSlide.headline}
            </h1>

            {/* Subtext Poem */}
            {currentSlide.subtext && (
              <p className="text-sm md:text-lg font-medium text-slate-200 drop-shadow-md max-w-xl mx-auto leading-relaxed font-vazir">
                {currentSlide.subtext}
              </p>
            )}

            {/* Sender signature */}
            {currentSlide.senderName && (
              <p className="mt-4 text-xs md:text-sm text-pink-300 font-semibold drop-shadow-md">
                — {currentSlide.senderName}
              </p>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Floating Animated Stickers */}
        {currentSlide.stickers?.map((stk) => (
          <motion.div
            key={stk.id}
            initial={{ scale: 0 }}
            animate={{ scale: stk.scale, rotate: [stk.rotation, stk.rotation + 5, stk.rotation] }}
            transition={{ repeat: Infinity, duration: 3, repeatType: 'reverse' }}
            className="absolute z-30 pointer-events-none drop-shadow-2xl text-3xl md:text-5xl"
            style={{ left: `${stk.x}%`, top: `${stk.y}%` }}
          >
            {stk.content}
          </motion.div>
        ))}
      </div>

      {/* Bottom Timeline Control Bar */}
      <div className="relative z-20 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col gap-2">
        {/* Progress Bar */}
        <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden backdrop-blur-md">
          <div
            className="h-full bg-gradient-to-r from-pink-500 via-rose-400 to-amber-400 transition-all duration-75"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center justify-between mt-1">
          <div className="flex items-center gap-3">
            <button
              onClick={togglePlay}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-pink-500 hover:bg-pink-400 text-white shadow-lg shadow-pink-500/30 active:scale-95 transition-transform"
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white ml-0.5" />}
            </button>

            <button
              onClick={() => {
                setCurrentIndex(0);
                setProgress(0);
                triggerConfetti();
              }}
              className="p-2 text-slate-300 hover:text-white transition-colors"
              title={isFa ? 'شروع مجدد' : 'Replay'}
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
            <span>
              {currentIndex + 1} / {slides.length}
            </span>
            <span className="text-slate-500">|</span>
            <span className="flex items-center gap-1 text-pink-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              {isFa ? currentPreset.nameFa : currentPreset.name}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
