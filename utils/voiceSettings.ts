// Voice Actor Settings

export type VoiceActorType = 'young' | 'mature' | 'professional';

export interface VoiceActorProfile {
  id: VoiceActorType;
  name: string;
  nameJapanese: string;
  nameChinese: string;
  description: string;
  descriptionJapanese: string;
  descriptionChinese: string;
  icon: string;
  // Voice settings for Japanese
  japanese: {
    rate: number;
    pitch: number;
    voiceNames: string[]; // Priority list of voice names to try
  };
  // Voice settings for Chinese
  chinese: {
    rate: number;
    pitch: number;
    voiceNames: string[]; // Priority list of voice names to try
  };
}

// 3 DIFFERENT voice actor profiles
export const VOICE_ACTORS: Record<VoiceActorType, VoiceActorProfile> = {
  young: {
    id: 'young',
    name: 'Yui - Energetic Student',
    nameJapanese: 'ユイ - 元気な学生',
    nameChinese: '小雨 - 活力学生',
    description: 'Cheerful, lively voice. Clear and energetic like a bright student!',
    descriptionJapanese: '明るくて元気な声。はっきりしている学生のよう！',
    descriptionChinese: '开朗、活泼的声音。清晰而充满活力，像个阳光学生！',
    icon: '👧',
    japanese: {
      rate: 0.92,       // MODERATE-FAST - energetic but clear
      pitch: 1.25,      // MODERATE-HIGH - youthful but understandable
      voiceNames: [
        'o-ren',
        'kyoko',
        'google 日本語',
        'microsoft haruka',
        'female',
        'japanese',
      ],
    },
    chinese: {
      rate: 0.88,       // MODERATE-FAST - energetic but clear
      pitch: 1.2,       // MODERATE-HIGH - youthful
      voiceNames: [
        'ting-ting',
        'google 普通话',
        'microsoft huihui',
        'female',
        'chinese',
      ],
    },
  },
  
  mature: {
    id: 'mature',
    name: 'Akari - Kind Teacher',
    nameJapanese: 'あかり - 優しい先生',
    nameChinese: '明理 - 温柔老师',
    description: 'Warm, mature, patient voice. Like a caring oneesan (older sister) teacher.',
    descriptionJapanese: '暖かくて成熟した声。優しいお姉さん先生のよう。',
    descriptionChinese: '温暖、成熟、有耐心的声音。像一位关怀备至的姐姐老师。',
    icon: '👩‍🏫',
    japanese: {
      rate: 0.85,       // MODERATE - clear and patient
      pitch: 1.2,       // MODERATE - mature but friendly
      voiceNames: [
        'o-ren',
        'kyoko',
        'ayumi',
        'hattori',
        'google 日本語',
        'female',
        'japanese',
      ],
    },
    chinese: {
      rate: 0.80,
      pitch: 1.15,      // MODERATE - mature, professional
      voiceNames: [
        'yaoyao',
        'google 普���话',
        'microsoft huihui',
        'female',
        'chinese',
      ],
    },
  },
  
  professional: {
    id: 'professional',
    name: 'Miyuki - News Anchor',
    nameJapanese: 'みゆき - ニュースキャスター',
    nameChinese: '美雪 - 新闻主播',
    description: 'Deep, professional, authoritative voice. Like a news anchor or business professional.',
    descriptionJapanese: '深くてプロフェッショナルな声。ニュースキャスターのよう。',
    descriptionChinese: '深沉、专业、权威的声音。像新闻主播或商务专业人士。',
    icon: '👩‍💼',
    japanese: {
      rate: 0.75,       // SLOW - very clear, formal
      pitch: 1.0,       // LOW - deep, professional
      voiceNames: [
        'google 日本語',
        'microsoft ayumi',
        'kyoko',
        'female',
        'japanese',
      ],
    },
    chinese: {
      rate: 0.70,       // SLOW - very clear
      pitch: 1.0,       // LOW - professional, authoritative
      voiceNames: [
        'google 普通话',
        'microsoft huihui',
        'ting-ting',
        'female',
        'chinese',
      ],
    },
  },
};

// Get saved voice actor preference
export function getSavedVoiceActor(): VoiceActorType {
  const saved = localStorage.getItem('bilingua_voice_actor');
  if (saved && (saved === 'young' || saved === 'mature' || saved === 'professional')) {
    return saved as VoiceActorType;
  }
  return 'mature'; // Default to mature (oneesan teacher)
}

// Save voice actor preference
export function saveVoiceActor(voiceType: VoiceActorType): void {
  localStorage.setItem('bilingua_voice_actor', voiceType);
  console.log(`🎤 Voice actor changed to: ${VOICE_ACTORS[voiceType].name}`);
}

// Get voice settings for current voice actor and language
export function getVoiceSettings(language: 'chinese' | 'japanese'): {
  rate: number;
  pitch: number;
  voiceNames: string[];
} {
  const voiceActor = getSavedVoiceActor();
  const profile = VOICE_ACTORS[voiceActor];
  return language === 'chinese' ? profile.chinese : profile.japanese;
}

// Get current voice actor profile
export function getCurrentVoiceActor(): VoiceActorProfile {
  const voiceType = getSavedVoiceActor();
  return VOICE_ACTORS[voiceType];
}

// Find best matching voice from available voices
export function findBestVoice(
  availableVoices: SpeechSynthesisVoice[],
  language: 'chinese' | 'japanese'
): SpeechSynthesisVoice | null {
  const settings = getVoiceSettings(language);
  const langCode = language === 'chinese' ? 'zh' : 'ja';
  
  // Try each voice name in priority order
  for (const voiceName of settings.voiceNames) {
    const voice = availableVoices.find(v => {
      const matchesLang = v.lang.toLowerCase().includes(langCode) || 
                          v.lang.toLowerCase().includes(language);
      const matchesName = v.name.toLowerCase().includes(voiceName.toLowerCase());
      return matchesLang && matchesName;
    });
    
    if (voice) {
      console.log(`🎤 Selected voice: ${voice.name} (${voice.lang}) for ${getCurrentVoiceActor().name}`);
      return voice;
    }
  }
  
  // Fallback: any voice with matching language
  const fallbackVoice = availableVoices.find(v => 
    v.lang.toLowerCase().includes(langCode) || 
    v.lang.toLowerCase().includes(language)
  );
  
  if (fallbackVoice) {
    console.log(`🎤 Using fallback voice: ${fallbackVoice.name} (${fallbackVoice.lang})`);
  }
  
  return fallbackVoice || null;
}