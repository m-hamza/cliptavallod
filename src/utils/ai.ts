import { GoogleGenAI } from '@google/genai';

export interface AIWishRequest {
  recipientName: string;
  relationship: 'mom' | 'dad' | 'spouse' | 'friend' | 'brother' | 'sister' | 'kid' | 'colleague' | 'general';
  tone: 'poetic' | 'emotional' | 'funny' | 'formal' | 'energetic' | 'nostalgic';
  language: 'fa' | 'en';
  additionalDetails?: string;
}

const FALLBACK_WISHS_FA: Record<string, string[]> = {
  mom: [
    'مادر مهربان و نازنینم، تو همان روشنایی هستی که خانه را گرم نگه می‌دارد. سالروز زمینی شدنت مبارک باد! 🌺',
    'بهترین مادر دنیا، خنده‌هایت درمان تمام خستگی‌های من است. تولدت مبارک، امیدوارم امسال پر از آرامش و تندرستی باشد. ❤️'
  ],
  dad: [
    'پدر عزیزم، تکیه‌گاه محکم و قهرمان همیشگی زندگی‌ام، میلادت خجسته باد! سایه‌ات مستدام و دلت شاد باد. 👑',
    'روز تولد تو، جشن مهربانی و استقامت است. پدر مهربانم تولدت مبارک! 💪'
  ],
  spouse: [
    'همسر مهربانم، هم‌سفر تمام لحظه‌های شیرین و تلخم، تولدت مبارک! با تو زندگی زیباترین ترانه دنیاست. 💖',
    'عشق زندگی من، در روز تولدت آرزو می‌کنم تمام خنده‌های دنیا سهم دل مهربانت باشد. 🌹'
  ],
  friend: [
    'رفیق قدیمی و صمیمی، یک سال بزرگتر و باحال‌تر شدی! تولدت کلی مبارک، بمونی برام رفیق شفیق! 🌟🎉',
    'روز تولدت مبارک بهترین دوست! امیدوارم تمام آرزوهای قشنگت امسال خاطره بشن! 🎁'
  ],
  general: [
    'سالروز طلایی زادروزت مبارک باد! امیدوارم مسیری پر از موفقیت، شادمانی و خنده‌های بی‌دلیل پیش رویت باشد. 🎂✨'
  ]
};

const FALLBACK_WISHS_EN: Record<string, string[]> = {
  general: [
    'Wishing you a day filled with laughter, love, and all the sweet moments you deserve. Happy Birthday! 🎉🎂',
    'May your upcoming year be blessed with boundless success, joy, and unforgettable memories! ✨'
  ]
};

export async function generateAIBirthdayWish(params: AIWishRequest): Promise<string> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || (window as unknown as { GEMINI_API_KEY?: string }).GEMINI_API_KEY;

  if (apiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const promptLang = params.language === 'fa' ? 'فارسی' : 'English';
      
      const prompt = `You are a warm, poetic, creative birthday wish writer. Write a memorable, heartfelt birthday wish in ${promptLang} for someone named "${params.recipientName}".
Relationship: ${params.relationship}
Tone: ${params.tone}
${params.additionalDetails ? `Special details/memories: ${params.additionalDetails}` : ''}

Requirements:
- Keep it 2 to 4 sentences long.
- Include 2 fitting emojis.
- Make it sound natural, meaningful, and emotionally touching.
- Respond with ONLY the birthday wish text, nothing else.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      if (response.text && response.text.trim().length > 0) {
        return response.text.trim();
      }
    } catch (err) {
      console.warn('Gemini API call warning, falling back to built-in generator:', err);
    }
  }

  // Fallback to rich curated templates if API is not available
  const list = params.language === 'fa' 
    ? (FALLBACK_WISHS_FA[params.relationship] || FALLBACK_WISHS_FA.general) 
    : (FALLBACK_WISHS_EN[params.relationship] || FALLBACK_WISHS_EN.general);

  const selected = list[Math.floor(Math.random() * list.length)];
  return selected.replace('عزیزم', params.recipientName).replace('رفیق', params.recipientName);
}
