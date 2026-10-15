import React from 'react';
import { TEMPLATE_PRESETS, TemplatePreset } from '../constants/presets';
import { TemplateId, Language } from '../types';
import { Sparkles, Check, Wand2 } from 'lucide-react';

interface TemplateSelectorProps {
  selectedTemplateId: TemplateId;
  onSelectTemplate: (preset: TemplatePreset) => void;
  language: Language;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  selectedTemplateId,
  onSelectTemplate,
  language,
}) => {
  const isFa = language === 'fa';

  return (
    <section className="w-full py-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-pink-400 font-medium mb-1">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>{isFa ? 'تم‌های حرفه‌ای تولد' : 'Curated Birthday Themes'}</span>
          </div>
          <h2 className="text-2xl font-bold text-white font-lalezar">
            {isFa ? 'قالب کلیپ خود را انتخاب کنید' : 'Select Your Video Clip Theme'}
          </h2>
        </div>
        <p className="text-xs text-slate-400 max-w-md">
          {isFa
            ? 'هر قالب شامل رنگ‌بندی، قلم‌های زیبا، افکت‌های تصویری و موسیقی اختصاصی است.'
            : 'Each template comes with curated colors, fonts, motion effects, and audio.'}
        </p>
      </div>

      {/* Grid of Template Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {TEMPLATE_PRESETS.map((preset) => {
          const isSelected = selectedTemplateId === preset.id;

          return (
            <div
              key={preset.id}
              onClick={() => onSelectTemplate(preset)}
              className={`group relative cursor-pointer overflow-hidden rounded-2xl p-5 border transition-all duration-300 ${
                isSelected
                  ? 'border-pink-500 bg-slate-900/90 shadow-lg shadow-pink-500/20 ring-1 ring-pink-500/50 scale-[1.02]'
                  : 'border-slate-800 bg-slate-900/50 hover:border-slate-700 hover:bg-slate-900/80 hover:scale-[1.01]'
              }`}
            >
              {/* Preview Banner Gradient */}
              <div
                className={`w-full h-28 rounded-xl bg-gradient-to-br ${preset.previewColor} relative overflow-hidden mb-4 p-3 flex flex-col justify-between shadow-inner`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold tracking-wider text-white/80 bg-black/30 backdrop-blur-md px-2 py-0.5 rounded-md uppercase">
                    {preset.id}
                  </span>
                  {isSelected && (
                    <div className="w-6 h-6 rounded-full bg-pink-500 text-white flex items-center justify-center shadow-md">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}
                </div>

                {/* Decorative Sample Text */}
                <div className="text-center my-auto">
                  <p className={`text-lg font-bold text-white drop-shadow-md ${preset.headerFont}`}>
                    {isFa ? 'تولدت مبارک 🎉' : 'Happy Birthday'}
                  </p>
                </div>
              </div>

              {/* Information */}
              <div>
                <h3 className="text-base font-bold text-slate-100 mb-1 group-hover:text-pink-300 transition-colors">
                  {isFa ? preset.nameFa : preset.name}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {isFa ? preset.descriptionFa : preset.description}
                </p>
              </div>

              {/* Active Pill Indicator */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1 text-[11px]">
                  <Wand2 className="w-3 h-3 text-pink-400" />
                  {isFa ? 'موسیقی متناسب' : 'Matched Audio'}
                </span>
                <span
                  className={`text-[11px] font-medium ${
                    isSelected ? 'text-pink-400' : 'text-slate-400'
                  }`}
                >
                  {isSelected ? (isFa ? 'انتخاب شده' : 'Selected') : isFa ? 'انتخاب قالب' : 'Apply'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
