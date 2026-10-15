import React, { useState } from 'react';
import { ClipProject, Language } from '../types';
import { Share2, Download, Copy, Check, Link, Sparkles, Film, X, Send } from 'lucide-react';

interface ExportShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: ClipProject;
  language: Language;
}

export const ExportShareModal: React.FC<ExportShareModalProps> = ({
  isOpen,
  onClose,
  project,
  language,
}) => {
  if (!isOpen) return null;

  const isFa = language === 'fa';
  const [copied, setCopied] = useState(false);

  // Encode payload into shareable URL Hash
  const generateShareableUrl = () => {
    try {
      const jsonStr = JSON.stringify(project);
      const encoded = btoa(encodeURIComponent(jsonStr));
      return `${window.location.origin}${window.location.pathname}#card=${encoded}`;
    } catch (err) {
      return window.location.href;
    }
  };

  const shareUrl = generateShareableUrl();

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      isFa
        ? `🎁 کارت و کلیپ تبریک تولد اختصاصی برای ${project.recipientName || 'عزیزم'}:\n${shareUrl}`
        : `🎁 Personalized Birthday Video Card for ${project.recipientName}:\n${shareUrl}`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const handleTelegramShare = () => {
    const text = encodeURIComponent(
      isFa
        ? `🎁 کلیپ تبریک تولد برای ${project.recipientName}`
        : `🎁 Birthday Video Card for ${project.recipientName}`
    );
    window.open(`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden p-6 space-y-6">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-pink-500/20 border border-pink-500/30 flex items-center justify-center text-pink-400">
              <Share2 className="w-4 h-4" />
            </div>
            <h3 className="text-lg font-bold text-white font-lalezar">
              {isFa ? 'خروجی و اشتراک‌گذاری کلیپ تولد' : 'Export & Share Birthday Clip'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg bg-slate-950 border border-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Shareable Link Box */}
        <div className="space-y-3">
          <p className="text-xs font-semibold text-slate-300">
            {isFa ? 'لینک کارت آنلاین تعاملی (قابل پخش روی موبایل و سیستم):' : 'Interactive Online Card Link:'}
          </p>

          <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-xl p-2.5">
            <Link className="w-4 h-4 text-pink-400 shrink-0 ml-1" />
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="w-full bg-transparent text-xs text-slate-300 focus:outline-none truncate"
            />
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-white bg-pink-600 hover:bg-pink-500 rounded-lg shrink-0 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>{isFa ? 'کپی شد' : 'Copied'}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>{isFa ? 'کپی لینک' : 'Copy'}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Social Share Buttons */}
        <div className="space-y-3">
          <p className="text-xs font-semibold text-slate-300">
            {isFa ? 'ارسال سریع پیام تبریک:' : 'Instant Direct Share:'}
          </p>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleWhatsAppShare}
              className="flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-colors shadow-sm"
            >
              <Send className="w-4 h-4" />
              <span>{isFa ? 'واتساپ (WhatsApp)' : 'WhatsApp'}</span>
            </button>

            <button
              onClick={handleTelegramShare}
              className="flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-bold text-white bg-sky-600 hover:bg-sky-500 rounded-xl transition-colors shadow-sm"
            >
              <Send className="w-4 h-4" />
              <span>{isFa ? 'تلگرام (Telegram)' : 'Telegram'}</span>
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="p-3 bg-pink-950/30 border border-pink-500/20 rounded-xl text-xs text-pink-200 flex items-start gap-2">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            {isFa
              ? 'مخاطب با باز کردن این لینک، کلیپ تعاملی شما را همراه با موزیک، پویانمایی و بازی فوت شمع مشاهده خواهد کرد!'
              : 'Opening this link launches an interactive full-screen video card with music, candle blowing & animations!'}
          </p>
        </div>

      </div>
    </div>
  );
};
