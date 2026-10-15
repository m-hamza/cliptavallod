import React, { useState } from 'react';
import { PRESET_MUSIC } from '../constants/presets';
import { Language } from '../types';
import { audioStudio } from '../utils/audio';
import { Music, Mic, Square, Play, Volume2, Sparkles, VolumeX, Check } from 'lucide-react';

interface AudioStudioProps {
  selectedMusicId: string;
  onSelectMusic: (id: string, synthMelody: 'persian' | 'classic' | 'upbeat' | 'waltz' | 'chill') => void;
  voiceNoteUrl?: string;
  onUpdateVoiceNote: (url: string) => void;
  language: Language;
}

export const AudioStudio: React.FC<AudioStudioProps> = ({
  selectedMusicId,
  onSelectMusic,
  voiceNoteUrl,
  onUpdateVoiceNote,
  language,
}) => {
  const isFa = language === 'fa';

  const [isRecording, setIsRecording] = useState(false);
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);
  const [playingSynthId, setPlayingSynthId] = useState<string | null>(null);

  // Toggle melody preview
  const handlePreviewMelody = (musicId: string, melody: 'persian' | 'classic' | 'upbeat' | 'waltz' | 'chill') => {
    if (playingSynthId === musicId) {
      audioStudio.stopMelody();
      setPlayingSynthId(null);
    } else {
      setPlayingSynthId(musicId);
      audioStudio.playSynthMelody(melody, false);
    }
  };

  // Start microphone recording
  const handleStartRecording = async () => {
    const success = await audioStudio.startRecording();
    if (success) {
      setIsRecording(true);
    }
  };

  // Stop microphone recording
  const handleStopRecording = async () => {
    const url = await audioStudio.stopRecording();
    setIsRecording(false);
    if (url) {
      onUpdateVoiceNote(url);
    }
  };

  // Play voice message
  const handlePlayVoice = () => {
    if (!voiceNoteUrl) return;
    const audio = new Audio(voiceNoteUrl);
    setIsPlayingVoice(true);
    audio.play();
    audio.onended = () => setIsPlayingVoice(false);
  };

  return (
    <div className="w-full bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-8">
      
      {/* Section Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-pink-500/20 border border-pink-500/30 flex items-center justify-center text-pink-400">
            <Music className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white font-lalezar">
              {isFa ? 'استودیو موسیقی و صدای تبریک' : 'Music & Audio Studio'}
            </h3>
            <p className="text-xs text-slate-400">
              {isFa ? 'موسیقی پس‌زمینه کلیپ را انتخاب کرده یا صدای گرم خودتان را ضبط کنید' : 'Select background soundtrack or record your own personal voice greeting'}
            </p>
          </div>
        </div>
      </div>

      {/* Preset Music Selector Grid */}
      <div>
        <p className="text-sm font-semibold text-slate-200 mb-3 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>{isFa ? 'موسیقی‌های پس‌زمینه تولد' : 'Birthday Background Soundtracks'}</span>
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {PRESET_MUSIC.map((track) => {
            const isSelected = selectedMusicId === track.id;
            const isPlaying = playingSynthId === track.id;

            return (
              <div
                key={track.id}
                className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                  isSelected
                    ? 'bg-pink-950/40 border-pink-500 shadow-md shadow-pink-500/10'
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handlePreviewMelody(track.id, track.synthMelody || 'persian')}
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                      isPlaying
                        ? 'bg-amber-500 text-slate-950'
                        : 'bg-slate-900 text-pink-400 hover:bg-slate-800'
                    }`}
                  >
                    {isPlaying ? <VolumeX className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                  </button>

                  <div>
                    <p className="text-xs font-bold text-white font-vazir">
                      {isFa ? track.nameFa : track.name}
                    </p>
                    <p className="text-[10px] text-slate-400">{track.artist}</p>
                  </div>
                </div>

                <button
                  onClick={() => onSelectMusic(track.id, track.synthMelody || 'persian')}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                    isSelected
                      ? 'bg-pink-500 text-white flex items-center gap-1'
                      : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  {isSelected ? (
                    <>
                      <Check className="w-3 h-3 stroke-[3]" />
                      <span>{isFa ? 'انتخاب شد' : 'Selected'}</span>
                    </>
                  ) : (
                    isFa ? 'انتخاب' : 'Select'
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Voice Recorder Section */}
      <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
              isRecording
                ? 'bg-rose-600 text-white animate-pulse shadow-lg shadow-rose-600/40 ring-4 ring-rose-500/20'
                : 'bg-slate-900 text-pink-400 border border-slate-800'
            }`}
          >
            <Mic className="w-6 h-6" />
          </div>

          <div>
            <h4 className="text-base font-bold text-white font-lalezar">
              {isFa ? 'ضبط پیام صوتی اختصاصی شما' : 'Record Your Personal Voice Greeting'}
            </h4>
            <p className="text-xs text-slate-400">
              {isFa
                ? 'مستقیماً با میکروفون تبریک صوتی صمیمی خود را ضبط کنید تا روی کلیپ پخش شود.'
                : 'Speak directly into your mic to embed a personal vocal wish into the clip card.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {isRecording ? (
            <button
              onClick={handleStopRecording}
              className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 rounded-xl shadow-lg shadow-rose-600/30 active:scale-95 transition-all"
            >
              <Square className="w-4 h-4 fill-white" />
              <span>{isFa ? 'توقف ضبط' : 'Stop Recording'}</span>
            </button>
          ) : (
            <button
              onClick={handleStartRecording}
              className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-pink-600 to-rose-500 hover:opacity-95 rounded-xl shadow-lg shadow-pink-500/20 active:scale-95 transition-all"
            >
              <Mic className="w-4 h-4" />
              <span>{isFa ? 'شروع ضبط صدا' : 'Start Recording'}</span>
            </button>
          )}

          {voiceNoteUrl && !isRecording && (
            <button
              onClick={handlePlayVoice}
              className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-emerald-300 bg-emerald-950/60 border border-emerald-500/40 rounded-xl hover:bg-emerald-900/80 transition-colors"
            >
              <Play className="w-4 h-4 fill-emerald-300" />
              <span>{isPlayingVoice ? (isFa ? 'در حال پخش...' : 'Playing...') : isFa ? 'شنیدن صدا' : 'Play Voice'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Sound Effects Trigger Toolbar */}
      <div className="pt-4 border-t border-slate-800">
        <p className="text-xs font-semibold text-slate-400 mb-3">
          {isFa ? 'تست و اجرای افکت‌های صوتی جشن:' : 'Test Party Sound Effects:'}
        </p>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => audioStudio.playSFX('cheer')}
            className="px-3.5 py-2 text-xs font-semibold text-amber-300 bg-amber-950/50 border border-amber-500/30 rounded-xl hover:bg-amber-900/60 transition-colors"
          >
            👏 {isFa ? 'تشویق و دست هورا' : 'Crowd Cheer'}
          </button>
          <button
            onClick={() => audioStudio.playSFX('cork')}
            className="px-3.5 py-2 text-xs font-semibold text-pink-300 bg-pink-950/50 border border-pink-500/30 rounded-xl hover:bg-pink-900/60 transition-colors"
          >
            🍾 {isFa ? 'باز کردن شامپاین' : 'Cork Pop'}
          </button>
          <button
            onClick={() => audioStudio.playSFX('partyHorn')}
            className="px-3.5 py-2 text-xs font-semibold text-cyan-300 bg-cyan-950/50 border border-cyan-500/30 rounded-xl hover:bg-cyan-900/60 transition-colors"
          >
            🥳 {isFa ? 'شیپور جشن تولد' : 'Party Horn'}
          </button>
          <button
            onClick={() => audioStudio.playSFX('fireworks')}
            className="px-3.5 py-2 text-xs font-semibold text-purple-300 bg-purple-950/50 border border-purple-500/30 rounded-xl hover:bg-purple-900/60 transition-colors"
          >
            🎆 {isFa ? 'آتش‌بازی و فشفشه' : 'Fireworks'}
          </button>
        </div>
      </div>

    </div>
  );
};
