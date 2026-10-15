import { TemplateId, MusicTrack, TransitionEffect, TextAnimation } from '../types';

export interface TemplatePreset {
  id: TemplateId;
  name: string;
  nameFa: string;
  description: string;
  descriptionFa: string;
  bgGradient: string;
  cardBg: string;
  accentColor: string;
  fontClass: string;
  headerFont: string;
  previewColor: string;
  defaultMusicId: string;
}

export const TEMPLATE_PRESETS: TemplatePreset[] = [
  {
    id: 'persian-gold',
    name: 'Persian Royal Gold',
    nameFa: 'طلایی سلطنتی ایرانی',
    description: 'Classic luxurious gold theme with Persian traditional flourishes',
    descriptionFa: 'تم فاخر طلایی با نقش و نگارهای اسلیمی و اصیل ایرانی',
    bgGradient: 'from-amber-950 via-slate-900 to-amber-950',
    cardBg: 'bg-amber-950/40 border-amber-500/30 shadow-amber-900/30',
    accentColor: '#f59e0b',
    fontClass: 'font-lalezar',
    headerFont: 'font-lalezar',
    previewColor: 'from-amber-500 to-yellow-600',
    defaultMusicId: 'tavallod-classic'
  },
  {
    id: 'royalty-black',
    name: 'Black Velvet Luxury',
    nameFa: 'مخمل مشکی و کریستال',
    description: 'Chic dark theme with crystal sparkles and gold accents',
    descriptionFa: 'طراحی مدرن و لاکچری با درخشش کریستال‌ها روی پس‌زمینه تیره',
    bgGradient: 'from-slate-950 via-zinc-900 to-slate-950',
    cardBg: 'bg-zinc-900/60 border-zinc-700/50 shadow-black/50',
    accentColor: '#e2e8f0',
    fontClass: 'font-vazir',
    headerFont: 'font-vazir',
    previewColor: 'from-slate-400 to-slate-700',
    defaultMusicId: 'piano-ballad'
  },
  {
    id: 'cute-pink',
    name: 'Sweet Pastel Fantasy',
    nameFa: 'فانتزی صورتی و رویایی',
    description: 'Charming pink pastel style with floating hearts and balloons',
    descriptionFa: 'تم ناز و رویایی با بادکنک‌های صورتی و قلب‌های درخشان',
    bgGradient: 'from-pink-950 via-purple-950 to-rose-950',
    cardBg: 'bg-pink-900/30 border-pink-500/30 shadow-pink-950/40',
    accentColor: '#ec4899',
    fontClass: 'font-vazir',
    headerFont: 'font-vazir',
    previewColor: 'from-pink-400 to-rose-500',
    defaultMusicId: 'tavallodateh-upbeat'
  },
  {
    id: 'neon-cyber',
    name: 'Neon Cyber Party',
    nameFa: 'پارتی نئون و هیجان',
    description: 'High energy futuristic neon glows with laser confetti',
    descriptionFa: 'تم مدرن نئونی با نورپردازی لیزری و هیجان فوق‌العاده',
    bgGradient: 'from-purple-950 via-slate-950 to-indigo-950',
    cardBg: 'bg-purple-900/40 border-cyan-400/40 shadow-cyan-900/40',
    accentColor: '#06b6d4',
    fontClass: 'font-vazir',
    headerFont: 'font-vazir',
    previewColor: 'from-cyan-400 to-fuchsia-500',
    defaultMusicId: 'edm-party'
  },
  {
    id: 'vhs-retro',
    name: 'Retro VHS Nostalgia',
    nameFa: 'نوستالژیک دهه شصت و هفتاد',
    description: 'Vintage cassette tape & polaroid aesthetic with warm nostalgia',
    descriptionFa: 'حس و حال صمیمی قدیمی، عکس‌های پلاروید و نوارهای خاطره‌انگیز',
    bgGradient: 'from-orange-950 via-amber-950 to-stone-900',
    cardBg: 'bg-stone-900/80 border-orange-500/30 shadow-orange-950/30',
    accentColor: '#f97316',
    fontClass: 'font-vazir',
    headerFont: 'font-vazir',
    previewColor: 'from-amber-600 to-orange-700',
    defaultMusicId: 'acoustic-celebration'
  },
  {
    id: 'botanical-elegance',
    name: 'Botanical Emerald Floral',
    nameFa: 'گل‌دار زمردی شیک',
    description: 'Fresh botanical garden theme with gold foil floral vines',
    descriptionFa: 'ترکیب سبز زمردی با گل‌های طلایی و برگ‌های طراوت‌بخش',
    bgGradient: 'from-emerald-950 via-slate-950 to-teal-950',
    cardBg: 'bg-emerald-950/50 border-emerald-500/30 shadow-emerald-950/50',
    accentColor: '#10b981',
    fontClass: 'font-vazir',
    headerFont: 'font-vazir',
    previewColor: 'from-emerald-400 to-teal-600',
    defaultMusicId: 'jazz-birthday'
  },
  {
    id: 'kids-wonderland',
    name: 'Kids Cartoon Wonderland',
    nameFa: 'کودکانه و شهر فرنگ',
    description: 'Playful vibrant colors with cute animals, stars and magic',
    descriptionFa: 'تم شاد و رنگارنگ مخصوص کودکان با ستاره‌ها و جادوی کودکانه',
    bgGradient: 'from-blue-950 via-indigo-950 to-sky-950',
    cardBg: 'bg-sky-900/30 border-yellow-400/40 shadow-blue-950/50',
    accentColor: '#eab308',
    fontClass: 'font-vazir',
    headerFont: 'font-vazir',
    previewColor: 'from-sky-400 to-yellow-400',
    defaultMusicId: 'tavallod-classic'
  }
];

export const PRESET_MUSIC: MusicTrack[] = [
  {
    id: 'tavallod-classic',
    name: 'Tavallod Mobarak (Persian Classic)',
    nameFa: 'تولد تولد تولدت مبارک (کلاسیک ایرانی)',
    artist: 'Persian Traditional Synth',
    url: '',
    isSynth: true,
    synthMelody: 'persian'
  },
  {
    id: 'tavallodateh-upbeat',
    name: 'Tavallodateh Party Mix',
    nameFa: 'میکس شاد تولدت مبارک (پرانرژی)',
    artist: 'Clip Tavallod Studio',
    url: '',
    isSynth: true,
    synthMelody: 'upbeat'
  },
  {
    id: 'piano-ballad',
    name: 'Romantic Birthday Piano',
    nameFa: 'پیانو لایت و ملایم تولد',
    artist: 'Serenade Ensemble',
    url: '',
    isSynth: true,
    synthMelody: 'classic'
  },
  {
    id: 'jazz-birthday',
    name: 'Cozy Celebration Jazz',
    nameFa: 'جاز دلنشین جشن تولد',
    artist: 'Midnight Trio',
    url: '',
    isSynth: true,
    synthMelody: 'chill'
  },
  {
    id: 'acoustic-celebration',
    name: 'Acoustic Guitar Birthday Waltz',
    nameFa: 'گیتار آکوستیک و والس تولد',
    artist: 'Acoustic Dreams',
    url: '',
    isSynth: true,
    synthMelody: 'waltz'
  },
  {
    id: 'edm-party',
    name: 'Future Neon Birthday Beat',
    nameFa: 'بیت الکترونیک نئونی و مهیج',
    artist: 'Pulse Cyber',
    url: '',
    isSynth: true,
    synthMelody: 'upbeat'
  }
];

export const CALLIGRAPHY_BADGES = [
  { label: 'تولدت مبارک', value: 'تولدت مبارک 🎉' },
  { label: 'عشقم تولدت مبارک', value: 'عشقم تولدت مبارک ❤️' },
  { label: 'بهترین رفیق تولدت مبارک', value: 'بهترین رفیق تولدت مبارک 🌟' },
  { label: 'مادر مهربانم تولدت مبارک', value: 'مادر مهربانم تولدت مبارک 🌺' },
  { label: 'پدر عزیزم تولدت مبارک', value: 'پدر عزیزم تولدت مبارک 👑' },
  { label: 'خواهرم تولدت مبارک', value: 'خواهرم تولدت مبارک 💖' },
  { label: 'برادرم تولدت مبارک', value: 'برادرم تولدت مبارک 💪' },
  { label: 'یک سال بزرگتر و زیباتر', value: 'یک سال بزرگتر و زیباتر 🎂' },
  { label: 'Happy Birthday', value: 'Happy Birthday! ✨' },
  { label: 'Wishing You Joy', value: 'Wishing You Infinite Joy 🎁' }
];

export const DEFAULT_SLIDES = [
  {
    id: 'slide-1',
    imageUrl: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=80',
    headline: 'امروز روز توست!',
    subtext: 'روزی که زمین با خنده‌های تو قشنگ‌تر شد',
    recipientName: 'عزیزم',
    age: '25',
    senderName: 'از طرف تمام دوستدارانت',
    transition: 'fade' as TransitionEffect,
    textAnim: 'bounce' as TextAnimation,
    duration: 4,
    stickers: [
      { id: 'stk-1', type: 'calligraphy' as const, content: 'تولدت مبارک 🎉', x: 50, y: 15, scale: 1.2, rotation: 0 },
      { id: 'stk-2', type: 'crown' as const, content: '👑', x: 50, y: 35, scale: 1.5, rotation: -5 }
    ],
    calligraphyText: 'تولدت مبارک 🎉'
  },
  {
    id: 'slide-2',
    imageUrl: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1200&q=80',
    headline: 'آرزوهای طلایی برای سال جدید زندگیت',
    subtext: 'امیدوارم امسال پر از خنده‌های بی‌دلیل و موفقیت‌های بزرگ باشه',
    recipientName: 'عزیزم',
    senderName: 'از طرف دوستدارت',
    transition: 'zoom' as TransitionEffect,
    textAnim: 'glow' as TextAnimation,
    duration: 5,
    stickers: [
      { id: 'stk-3', type: 'balloon' as const, content: '🎈', x: 20, y: 25, scale: 1.3, rotation: 10 },
      { id: 'stk-4', type: 'gift' as const, content: '🎁', x: 80, y: 70, scale: 1.2, rotation: -8 }
    ]
  },
  {
    id: 'slide-3',
    imageUrl: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=1200&q=80',
    headline: 'شمع‌ها رو فوت کن و آرزو کن!',
    subtext: 'همیشه شاد باش و مثل خورشید بدرخش',
    recipientName: 'عزیزم',
    senderName: 'با یک دنیا عشق',
    transition: 'starburst' as TransitionEffect,
    textAnim: 'zoom-pop' as TextAnimation,
    duration: 5,
    stickers: [
      { id: 'stk-5', type: 'heart' as const, content: '💖', x: 50, y: 80, scale: 1.4, rotation: 0 }
    ]
  }
];

export const PRESET_BACKGROUND_DESIGNS = [
  {
    id: 'design-gold-bokeh',
    name: 'طلایی و درخشش (Gold Bokeh)',
    url: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=80',
    gradient: 'from-amber-900/80 via-slate-900/90 to-black'
  },
  {
    id: 'design-confetti-party',
    name: 'جشن و نقل‌های رنگارنگ (Confetti)',
    url: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1200&q=80',
    gradient: 'from-purple-900/80 via-indigo-950/90 to-black'
  },
  {
    id: 'design-cake-candles',
    name: 'کیک تولد و شمع (Birthday Cake)',
    url: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=1200&q=80',
    gradient: 'from-pink-900/80 via-rose-950/90 to-black'
  },
  {
    id: 'design-sparkler-night',
    name: 'آتش‌بازی و فشفشه (Sparklers)',
    url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
    gradient: 'from-blue-900/80 via-slate-950/90 to-black'
  },
  {
    id: 'design-pastel-balloons',
    name: 'بادکنک‌های رویایی (Pastel Balloons)',
    url: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1200&q=80',
    gradient: 'from-rose-900/80 via-pink-950/90 to-black'
  }
];
