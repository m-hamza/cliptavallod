import React, { useState } from 'react';
import { generateAIBirthdayWish, AIWishRequest } from '../utils/ai';
import { Language } from '../types';
import { Wand2, Sparkles, Check, X, RefreshCw, Heart } from 'lucide-react';

interface AIWishGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyWish: (wishText: string) => void;
  defaultRecipientName: string;
  language: Language;
}

export const AIWishGeneratorModal: React.FC<AIWishGeneratorModalProps> = ({
  isOpen,
  onClose,
  onApplyWish,
  defaultRecipientName,
  language,
}) => {
  if (!isOpen) return null;

  const isFa = language === 'fa';

  const [recipientName, setRecipientName] = useState(defaultRecipientName || (isFa ? 'سارا' : 'Sarah'));
  const [relationship, setRelationship] = useState<AIWishRequest['relationship']>('friend');
  const [tone, setTone] = useState<AIWishRequest['tone']>('poetic');
  const [additionalDetails, setAdditionalDetails] = useState('');
  
  const [generatedWish, setGeneratedWish] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    setIsLoading(true);
    const wish = await generateAIBirthdayWish({
      recipientName,
      relationship,
      tone,
      language: isFa ? 'fa' : 'en',
      additionalDetails,
    });
    setGeneratedWish(wish);
    setIsLoading(false);
  };

  const handleApply = () => {
    if (generatedWish) {
      onApplyWish(generatedWish);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden p-6 space-y-5">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Wand2 className="w-4 h-4 animate-pulse" />
            </div>
            <h3 className="text-lg font-bold text-white font-lalezar">
              {isFa ? 'نویسنده هوشمند متون تولد (AI)' : 'AI Birthday Wish Generator'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg bg-slate-950 border border-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Inputs */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                {isFa ? 'نام مخاطب تولد' : 'Recipient Name'}
              </label>
              <input
                type="text"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                {isFa ? 'نسبت / ارتباط' : 'Relationship'}
              </label>
              <select
                value={relationship}
                onChange={(e) => setRelationship(e.target.value as AIWishRequest['relationship'])}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-amber-500"
              >
                <option value="friend">{isFa ? 'دوست و صمیمی' : 'Best Friend'}</option>
                <option value="spouse">{isFa ? 'همسر و عشق' : 'Spouse / Partner'}</option>
                <option value="mom">{isFa ? 'مادر مهربان' : 'Mother'}</option>
                <option value="dad">{isFa ? 'پدر عزیز' : 'Father'}</option>
                <option value="sister">{isFa ? 'خواهر' : 'Sister'}</option>
                <option value="brother">{isFa ? 'برادر' : 'Brother'}</option>
                <option value="kid">{isFa ? 'کودک / فرزند' : 'Kid / Child'}</option>
                <option value="colleague">{isFa ? 'همکار' : 'Colleague'}</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                {isFa ? 'لحن متن' : 'Tone & Mood'}
              </label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value as AIWishRequest['tone'])}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-amber-500"
              >
                <option value="poetic">{isFa ? 'شاعرانه و ادبی' : 'Poetic & Literary'}</option>
                <option value="emotional">{isFa ? 'عاطفی و صمیمی' : 'Emotional & Heartfelt'}</option>
                <option value="funny">{isFa ? 'خنده‌دار و بامزه' : 'Funny & Playful'}</option>
                <option value="energetic">{isFa ? 'پرانرژی و هیجانی' : 'Energetic'}</option>
                <option value="formal">{isFa ? 'رسمی و محترمانه' : 'Formal & Respectful'}</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                {isFa ? 'نکات اختصاصی (اختیاری)' : 'Special Details (Optional)'}
              </label>
              <input
                type="text"
                value={additionalDetails}
                onChange={(e) => setAdditionalDetails(e.target.value)}
                placeholder={isFa ? 'مثلاً: عاشق سفر و موسیقی' : 'e.g., loves travel'}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-amber-500"
              />
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className="w-full py-2.5 text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 rounded-xl hover:opacity-95 shadow-md shadow-amber-500/20 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>{isFa ? 'در حال نگارش متن شاعرانه...' : 'Writing Birthday Wish...'}</span>
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4" />
                <span>{isFa ? 'تولید متن با هوش مصنوعی' : 'Generate Wish Text'}</span>
              </>
            )}
          </button>
        </div>

        {/* Output Box */}
        {generatedWish && (
          <div className="bg-slate-950 border border-amber-500/30 rounded-2xl p-4 space-y-3">
            <p className="text-xs font-semibold text-amber-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isFa ? 'متن پیشنهادی هوش مصنوعی:' : 'Generated Birthday Wish:'}</span>
            </p>
            <p className="text-sm font-medium text-slate-100 leading-relaxed font-vazir bg-slate-900/80 p-3 rounded-xl border border-slate-800">
              {generatedWish}
            </p>
            <button
              onClick={handleApply}
              className="w-full py-2 text-xs font-bold text-white bg-pink-600 hover:bg-pink-500 rounded-xl transition-colors flex items-center justify-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>{isFa ? 'جایگذاری روی این اسلاید' : 'Apply to Current Slide'}</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
