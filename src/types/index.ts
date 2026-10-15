export type Language = 'fa' | 'en';

export type TemplateId = 
  | 'persian-gold' 
  | 'royalty-black' 
  | 'cute-pink' 
  | 'neon-cyber' 
  | 'vhs-retro' 
  | 'botanical-elegance' 
  | 'kids-wonderland';

export type TransitionEffect = 
  | 'fade' 
  | 'zoom' 
  | 'slide' 
  | 'flip' 
  | 'hearts' 
  | 'starburst' 
  | 'glitter';

export type TextAnimation = 
  | 'fade' 
  | 'typewriter' 
  | 'bounce' 
  | 'glow' 
  | 'zoom-pop';

export interface Sticker {
  id: string;
  type: 'emoji' | 'calligraphy' | 'crown' | 'hat' | 'balloon' | 'gift' | 'age' | 'heart';
  content: string; // Emoji char, SVG, or image URL
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  scale: number; // 0.5 - 2.5
  rotation: number; // degrees
}

export interface Slide {
  id: string;
  imageUrl: string;
  headline: string;
  subtext: string;
  recipientName: string;
  age?: string;
  senderName: string;
  transition: TransitionEffect;
  textAnim: TextAnimation;
  duration: number; // seconds
  stickers: Sticker[];
  filterStyle?: string; // CSS filter like sepia, contrast, warm, cold
  calligraphyText?: string;
}

export interface MusicTrack {
  id: string;
  name: string;
  nameFa: string;
  artist: string;
  url: string; // audio source or synth key
  isSynth?: boolean;
  synthMelody?: 'persian' | 'classic' | 'upbeat' | 'waltz' | 'chill';
}

export interface ClipProject {
  id: string;
  title: string;
  recipientName: string;
  senderName: string;
  age?: string;
  templateId: TemplateId;
  slides: Slide[];
  selectedMusicId: string;
  voiceNoteUrl?: string; // blob or base64 audio
  voiceNoteDuration?: number;
  candlesCount: number;
  customWishText: string;
  createdAt: number;
}
