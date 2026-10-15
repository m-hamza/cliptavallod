import React, { useState, useEffect } from 'react';
import { audioStudio } from '../utils/audio';
import confetti from 'canvas-confetti';
import { Flame, Wind, Mic, Sparkles, RefreshCw } from 'lucide-react';
import { Language } from '../types';

interface CandleBlowingCanvasProps {
  candlesCount: number;
  recipientName: string;
  onUpdateCandlesCount: (count: number) => void;
  language: Language;
}

export const CandleBlowingCanvas: React.FC<CandleBlowingCanvasProps> = ({
  candlesCount,
  recipientName,
  onUpdateCandlesCount,
  language,
}) => {
  const isFa = language === 'fa';
  const [candlesLit, setCandlesLit] = useState<boolean[]>([]);
  const [isAllBlown, setIsAllBlown] = useState(false);
  const [isMicActive, setIsMicActive] = useState(false);

  // Initialize candle state array
  useEffect(() => {
    const count = Math.min(Math.max(candlesCount, 1), 12);
    setCandlesLit(new Array(count).fill(true));
    setIsAllBlown(false);
  }, [candlesCount]);

  // Blow out candles
  const blowOutAllCandles = () => {
    audioStudio.playSFX('candleBlow');
    setCandlesLit(new Array(candlesLit.length).fill(false));
    setIsAllBlown(true);

    setTimeout(() => {
      audioStudio.playSFX('cheer');
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#fbbf24', '#f472b6', '#38bdf8', '#a855f7'],
      });
    }, 300);
  };

  // Relight candles
  const relightCandles = () => {
    setCandlesLit(new Array(candlesLit.length).fill(true));
    setIsAllBlown(false);
  };

  // Microphone blow detection
  const handleEnableMic = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const analyser = audioCtx.createAnalyser();
      const microphone = audioCtx.createMediaStreamSource(stream);
      const javascriptNode = audioCtx.createScriptProcessor(2048, 1, 1);

      analyser.smoothingTimeConstant = 0.8;
      analyser.fftSize = 1024;

      microphone.connect(analyser);
      analyser.connect(javascriptNode);
      javascriptNode.connect(audioCtx.destination);

      setIsMicActive(true);

      javascriptNode.onaudioprocess = () => {
        const array = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(array);
        let values = 0;
        for (let i = 0; i < array.length; i++) {
          values += array[i];
        }
        const average = values / array.length;

        // Blow threshold
        if (average > 45 && !isAllBlown) {
          blowOutAllCandles();
          stream.getTracks().forEach((track) => track.stop());
          javascriptNode.disconnect();
          setIsMicActive(false);
        }
      };
    } catch (err) {
      console.error('Mic blow detection error:', err);
      setIsMicActive(false);
    }
  };

  return (
    <div className="w-full bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold mb-1">
            <Sparkles className="w-4 h-4" />
            <span>{isFa ? 'سرگرمی تعاملی فوت شمع' : 'Interactive Candle Blowing'}</span>
          </div>
          <h3 className="text-xl font-bold text-white font-lalezar">
            {isFa ? 'کیک تولد و فوت کردن شمع‌ها' : 'Birthday Cake & Candles'}
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <label className="text-xs text-slate-300 font-medium">{isFa ? 'تعداد شمع:' : 'Candles Count:'}</label>
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
            {[1, 3, 5, 8, 10].map((num) => (
              <button
                key={num}
                onClick={() => onUpdateCandlesCount(num)}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-colors ${
                  candlesCount === num ? 'bg-pink-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Birthday Cake Scene Canvas Container */}
      <div className="relative w-full h-80 rounded-2xl bg-gradient-to-b from-slate-950 via-purple-950/40 to-slate-950 border border-slate-800/80 flex flex-col items-center justify-center overflow-hidden p-6 shadow-inner">
        
        {/* Glow light background when candles lit */}
        <div
          className={`absolute inset-0 bg-amber-500/10 blur-3xl transition-opacity duration-700 pointer-events-none ${
            isAllBlown ? 'opacity-0' : 'opacity-100'
          }`}
        />

        {/* Message Banner */}
        <div className="relative z-10 text-center mb-8">
          <h4 className="text-2xl font-bold text-amber-300 font-lalezar drop-shadow-md">
            {isAllBlown
              ? isFa
                ? `آرزوی ${recipientName || 'عزیزم'} برآورده شد! 🎉`
                : 'Wish Granted! 🎉'
              : isFa
              ? `شمع‌های کیک تولد ${recipientName || 'عزیزم'}`
              : `Make a Wish, ${recipientName || 'Dear'}!`}
          </h4>
          <p className="text-xs text-slate-400 mt-1">
            {isAllBlown
              ? isFa
                ? 'تمام شمع‌ها با موفقیت فوت شدند! آرزوی قشنگت مستجاب!'
                : 'All candles blown out!'
              : isFa
              ? 'روی دکمه فوت بزنید یا درون میکروفون فوت کنید!'
              : 'Tap blow button or blow into your microphone!'}
          </p>
        </div>

        {/* Cake Illustration with Candles */}
        <div className="relative z-10 flex flex-col items-center">
          
          {/* Candles Row on top of Cake */}
          <div className="flex items-end justify-center gap-3 mb-2">
            {candlesLit.map((isLit, idx) => (
              <div key={idx} className="relative flex flex-col items-center group">
                {/* Flame or Smoke */}
                {isLit ? (
                  <div className="relative w-4 h-7 flex items-center justify-center animate-flicker">
                    <div className="w-3.5 h-6 bg-gradient-to-t from-amber-500 via-yellow-400 to-white rounded-full blur-[1px] shadow-lg shadow-amber-500/80" />
                    <div className="absolute top-1 w-1.5 h-3 bg-white rounded-full" />
                  </div>
                ) : (
                  <div className="w-2 h-6 flex flex-col items-center justify-end">
                    {/* Smoke particles */}
                    <div className="w-1.5 h-1.5 bg-slate-400/80 rounded-full animate-ping mb-1" />
                    <div className="w-1 h-2 bg-slate-500/50 rounded-full" />
                  </div>
                )}

                {/* Candle Wick */}
                <div className="w-0.5 h-2 bg-slate-700" />

                {/* Candle Body */}
                <div className="w-3 h-12 bg-gradient-to-b from-pink-400 via-rose-500 to-purple-600 rounded-t-sm shadow-md border-x border-pink-300/30" />
              </div>
            ))}
          </div>

          {/* Cake Layers */}
          <div className="w-64 h-16 bg-gradient-to-r from-amber-800 via-amber-700 to-amber-900 rounded-t-2xl border-t-4 border-amber-300/40 shadow-xl flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-3 bg-pink-300/30 rounded-t-2xl" />
            <span className="text-xs font-bold text-amber-200 tracking-wider font-lalezar">
              HAPPY BIRTHDAY
            </span>
          </div>

          <div className="w-80 h-20 bg-gradient-to-r from-amber-900 via-amber-800 to-amber-950 rounded-b-3xl border-t-2 border-amber-600/30 shadow-2xl flex items-center justify-center relative">
            <div className="w-full h-2 bg-pink-400/40 my-auto" />
          </div>

          {/* Cake Stand */}
          <div className="w-88 h-4 bg-slate-300 rounded-full shadow-2xl border-b-2 border-slate-400 -mt-1" />
        </div>

      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        {isAllBlown ? (
          <button
            onClick={relightCandles}
            className="flex items-center gap-2 px-6 py-3 text-xs font-bold text-amber-300 bg-amber-950/80 border border-amber-500/40 rounded-xl hover:bg-amber-900 transition-colors shadow-lg"
          >
            <RefreshCw className="w-4 h-4" />
            <span>{isFa ? 'روشن کردن مجدد شمع‌ها' : 'Relight Candles'}</span>
          </button>
        ) : (
          <>
            <button
              onClick={blowOutAllCandles}
              className="flex items-center gap-2 px-6 py-3 text-xs font-bold text-white bg-gradient-to-r from-pink-600 to-rose-500 rounded-xl hover:opacity-95 shadow-lg shadow-pink-500/20 active:scale-95 transition-all"
            >
              <Wind className="w-4 h-4" />
              <span>{isFa ? 'فوت کردن شمع‌ها (کلیک)' : 'Blow Candles (Click)'}</span>
            </button>

            <button
              onClick={handleEnableMic}
              className={`flex items-center gap-2 px-6 py-3 text-xs font-bold rounded-xl transition-all border ${
                isMicActive
                  ? 'bg-emerald-600 text-white animate-pulse border-emerald-400'
                  : 'bg-slate-900 text-slate-200 border-slate-800 hover:border-slate-700'
              }`}
            >
              <Mic className="w-4 h-4 text-emerald-400" />
              <span>
                {isMicActive
                  ? isFa
                    ? 'در حال گوش دادن... به میکروفون فوت کنید!'
                    : 'Listening... Blow into Mic!'
                  : isFa
                  ? 'فوت با میکروفون واقعی'
                  : 'Blow via Microphone'}
              </span>
            </button>
          </>
        )}
      </div>

    </div>
  );
};
