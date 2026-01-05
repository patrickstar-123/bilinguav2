// Complete Hiragana and Katakana Data with all character types

export interface KanaCharacter {
  char: string;
  romaji: string;
  type: 'basic' | 'dakuten' | 'handakuten' | 'yoon';
  category: string;
  meaning?: string;
}

// COMPLETE HIRAGANA DATA
export const completeHiragana: KanaCharacter[] = [
  // Basic Hiragana (Gojūon) - 46 characters
  // Vowels
  { char: 'あ', romaji: 'a', type: 'basic', category: 'Vowels' },
  { char: 'い', romaji: 'i', type: 'basic', category: 'Vowels' },
  { char: 'う', romaji: 'u', type: 'basic', category: 'Vowels' },
  { char: 'え', romaji: 'e', type: 'basic', category: 'Vowels' },
  { char: 'お', romaji: 'o', type: 'basic', category: 'Vowels' },
  
  // K-row
  { char: 'か', romaji: 'ka', type: 'basic', category: 'K-row' },
  { char: 'き', romaji: 'ki', type: 'basic', category: 'K-row' },
  { char: 'く', romaji: 'ku', type: 'basic', category: 'K-row' },
  { char: 'け', romaji: 'ke', type: 'basic', category: 'K-row' },
  { char: 'こ', romaji: 'ko', type: 'basic', category: 'K-row' },
  
  // S-row
  { char: 'さ', romaji: 'sa', type: 'basic', category: 'S-row' },
  { char: 'し', romaji: 'shi', type: 'basic', category: 'S-row' },
  { char: 'す', romaji: 'su', type: 'basic', category: 'S-row' },
  { char: 'せ', romaji: 'se', type: 'basic', category: 'S-row' },
  { char: 'そ', romaji: 'so', type: 'basic', category: 'S-row' },
  
  // T-row
  { char: 'た', romaji: 'ta', type: 'basic', category: 'T-row' },
  { char: 'ち', romaji: 'chi', type: 'basic', category: 'T-row' },
  { char: 'つ', romaji: 'tsu', type: 'basic', category: 'T-row' },
  { char: 'て', romaji: 'te', type: 'basic', category: 'T-row' },
  { char: 'と', romaji: 'to', type: 'basic', category: 'T-row' },
  
  // N-row
  { char: 'な', romaji: 'na', type: 'basic', category: 'N-row' },
  { char: 'に', romaji: 'ni', type: 'basic', category: 'N-row' },
  { char: 'ぬ', romaji: 'nu', type: 'basic', category: 'N-row' },
  { char: 'ね', romaji: 'ne', type: 'basic', category: 'N-row' },
  { char: 'の', romaji: 'no', type: 'basic', category: 'N-row' },
  
  // H-row
  { char: 'は', romaji: 'ha', type: 'basic', category: 'H-row' },
  { char: 'ひ', romaji: 'hi', type: 'basic', category: 'H-row' },
  { char: 'ふ', romaji: 'fu', type: 'basic', category: 'H-row' },
  { char: 'へ', romaji: 'he', type: 'basic', category: 'H-row' },
  { char: 'ほ', romaji: 'ho', type: 'basic', category: 'H-row' },
  
  // M-row
  { char: 'ま', romaji: 'ma', type: 'basic', category: 'M-row' },
  { char: 'み', romaji: 'mi', type: 'basic', category: 'M-row' },
  { char: 'む', romaji: 'mu', type: 'basic', category: 'M-row' },
  { char: 'め', romaji: 'me', type: 'basic', category: 'M-row' },
  { char: 'も', romaji: 'mo', type: 'basic', category: 'M-row' },
  
  // Y-row
  { char: 'や', romaji: 'ya', type: 'basic', category: 'Y-row' },
  { char: 'ゆ', romaji: 'yu', type: 'basic', category: 'Y-row' },
  { char: 'よ', romaji: 'yo', type: 'basic', category: 'Y-row' },
  
  // R-row
  { char: 'ら', romaji: 'ra', type: 'basic', category: 'R-row' },
  { char: 'り', romaji: 'ri', type: 'basic', category: 'R-row' },
  { char: 'る', romaji: 'ru', type: 'basic', category: 'R-row' },
  { char: 'れ', romaji: 're', type: 'basic', category: 'R-row' },
  { char: 'ろ', romaji: 'ro', type: 'basic', category: 'R-row' },
  
  // W-row
  { char: 'わ', romaji: 'wa', type: 'basic', category: 'W-row' },
  { char: 'を', romaji: 'wo', type: 'basic', category: 'W-row' },
  
  // N
  { char: 'ん', romaji: 'n', type: 'basic', category: 'N' },
  
  // Dakuten (voiced) - 25 characters
  // G-row
  { char: 'が', romaji: 'ga', type: 'dakuten', category: 'G-row (Dakuten)' },
  { char: 'ぎ', romaji: 'gi', type: 'dakuten', category: 'G-row (Dakuten)' },
  { char: 'ぐ', romaji: 'gu', type: 'dakuten', category: 'G-row (Dakuten)' },
  { char: 'げ', romaji: 'ge', type: 'dakuten', category: 'G-row (Dakuten)' },
  { char: 'ご', romaji: 'go', type: 'dakuten', category: 'G-row (Dakuten)' },
  
  // Z-row
  { char: 'ざ', romaji: 'za', type: 'dakuten', category: 'Z-row (Dakuten)' },
  { char: 'じ', romaji: 'ji', type: 'dakuten', category: 'Z-row (Dakuten)' },
  { char: 'ず', romaji: 'zu', type: 'dakuten', category: 'Z-row (Dakuten)' },
  { char: 'ぜ', romaji: 'ze', type: 'dakuten', category: 'Z-row (Dakuten)' },
  { char: 'ぞ', romaji: 'zo', type: 'dakuten', category: 'Z-row (Dakuten)' },
  
  // D-row
  { char: 'だ', romaji: 'da', type: 'dakuten', category: 'D-row (Dakuten)' },
  { char: 'ぢ', romaji: 'ji', type: 'dakuten', category: 'D-row (Dakuten)' },
  { char: 'づ', romaji: 'zu', type: 'dakuten', category: 'D-row (Dakuten)' },
  { char: 'で', romaji: 'de', type: 'dakuten', category: 'D-row (Dakuten)' },
  { char: 'ど', romaji: 'do', type: 'dakuten', category: 'D-row (Dakuten)' },
  
  // B-row
  { char: 'ば', romaji: 'ba', type: 'dakuten', category: 'B-row (Dakuten)' },
  { char: 'び', romaji: 'bi', type: 'dakuten', category: 'B-row (Dakuten)' },
  { char: 'ぶ', romaji: 'bu', type: 'dakuten', category: 'B-row (Dakuten)' },
  { char: 'べ', romaji: 'be', type: 'dakuten', category: 'B-row (Dakuten)' },
  { char: 'ぼ', romaji: 'bo', type: 'dakuten', category: 'B-row (Dakuten)' },
  
  // Handakuten (p-sounds) - 5 characters
  { char: 'ぱ', romaji: 'pa', type: 'handakuten', category: 'P-row (Handakuten)' },
  { char: 'ぴ', romaji: 'pi', type: 'handakuten', category: 'P-row (Handakuten)' },
  { char: 'ぷ', romaji: 'pu', type: 'handakuten', category: 'P-row (Handakuten)' },
  { char: 'ぺ', romaji: 'pe', type: 'handakuten', category: 'P-row (Handakuten)' },
  { char: 'ぽ', romaji: 'po', type: 'handakuten', category: 'P-row (Handakuten)' },
  
  // Yōon (combination characters) - 33 characters
  // K-combinations
  { char: 'きゃ', romaji: 'kya', type: 'yoon', category: 'K-Yōon' },
  { char: 'きゅ', romaji: 'kyu', type: 'yoon', category: 'K-Yōon' },
  { char: 'きょ', romaji: 'kyo', type: 'yoon', category: 'K-Yōon' },
  
  // S-combinations
  { char: 'しゃ', romaji: 'sha', type: 'yoon', category: 'S-Yōon' },
  { char: 'しゅ', romaji: 'shu', type: 'yoon', category: 'S-Yōon' },
  { char: 'しょ', romaji: 'sho', type: 'yoon', category: 'S-Yōon' },
  
  // T-combinations
  { char: 'ちゃ', romaji: 'cha', type: 'yoon', category: 'T-Yōon' },
  { char: 'ちゅ', romaji: 'chu', type: 'yoon', category: 'T-Yōon' },
  { char: 'ちょ', romaji: 'cho', type: 'yoon', category: 'T-Yōon' },
  
  // N-combinations
  { char: 'にゃ', romaji: 'nya', type: 'yoon', category: 'N-Yōon' },
  { char: 'にゅ', romaji: 'nyu', type: 'yoon', category: 'N-Yōon' },
  { char: 'にょ', romaji: 'nyo', type: 'yoon', category: 'N-Yōon' },
  
  // H-combinations
  { char: 'ひゃ', romaji: 'hya', type: 'yoon', category: 'H-Yōon' },
  { char: 'ひゅ', romaji: 'hyu', type: 'yoon', category: 'H-Yōon' },
  { char: 'ひょ', romaji: 'hyo', type: 'yoon', category: 'H-Yōon' },
  
  // M-combinations
  { char: 'みゃ', romaji: 'mya', type: 'yoon', category: 'M-Yōon' },
  { char: 'みゅ', romaji: 'myu', type: 'yoon', category: 'M-Yōon' },
  { char: 'みょ', romaji: 'myo', type: 'yoon', category: 'M-Yōon' },
  
  // R-combinations
  { char: 'りゃ', romaji: 'rya', type: 'yoon', category: 'R-Yōon' },
  { char: 'りゅ', romaji: 'ryu', type: 'yoon', category: 'R-Yōon' },
  { char: 'りょ', romaji: 'ryo', type: 'yoon', category: 'R-Yōon' },
  
  // G-combinations
  { char: 'ぎゃ', romaji: 'gya', type: 'yoon', category: 'G-Yōon' },
  { char: 'ぎゅ', romaji: 'gyu', type: 'yoon', category: 'G-Yōon' },
  { char: 'ぎょ', romaji: 'gyo', type: 'yoon', category: 'G-Yōon' },
  
  // J-combinations
  { char: 'じゃ', romaji: 'ja', type: 'yoon', category: 'J-Yōon' },
  { char: 'じゅ', romaji: 'ju', type: 'yoon', category: 'J-Yōon' },
  { char: 'じょ', romaji: 'jo', type: 'yoon', category: 'J-Yōon' },
  
  // B-combinations
  { char: 'びゃ', romaji: 'bya', type: 'yoon', category: 'B-Yōon' },
  { char: 'びゅ', romaji: 'byu', type: 'yoon', category: 'B-Yōon' },
  { char: 'びょ', romaji: 'byo', type: 'yoon', category: 'B-Yōon' },
  
  // P-combinations
  { char: 'ぴゃ', romaji: 'pya', type: 'yoon', category: 'P-Yōon' },
  { char: 'ぴゅ', romaji: 'pyu', type: 'yoon', category: 'P-Yōon' },
  { char: 'ぴょ', romaji: 'pyo', type: 'yoon', category: 'P-Yōon' },
];

// COMPLETE KATAKANA DATA
export const completeKatakana: KanaCharacter[] = [
  // Basic Katakana (Gojūon) - 46 characters
  // Vowels
  { char: 'ア', romaji: 'a', type: 'basic', category: 'Vowels' },
  { char: 'イ', romaji: 'i', type: 'basic', category: 'Vowels' },
  { char: 'ウ', romaji: 'u', type: 'basic', category: 'Vowels' },
  { char: 'エ', romaji: 'e', type: 'basic', category: 'Vowels' },
  { char: 'オ', romaji: 'o', type: 'basic', category: 'Vowels' },
  
  // K-row
  { char: 'カ', romaji: 'ka', type: 'basic', category: 'K-row' },
  { char: 'キ', romaji: 'ki', type: 'basic', category: 'K-row' },
  { char: 'ク', romaji: 'ku', type: 'basic', category: 'K-row' },
  { char: 'ケ', romaji: 'ke', type: 'basic', category: 'K-row' },
  { char: 'コ', romaji: 'ko', type: 'basic', category: 'K-row' },
  
  // S-row
  { char: 'サ', romaji: 'sa', type: 'basic', category: 'S-row' },
  { char: 'シ', romaji: 'shi', type: 'basic', category: 'S-row' },
  { char: 'ス', romaji: 'su', type: 'basic', category: 'S-row' },
  { char: 'セ', romaji: 'se', type: 'basic', category: 'S-row' },
  { char: 'ソ', romaji: 'so', type: 'basic', category: 'S-row' },
  
  // T-row
  { char: 'タ', romaji: 'ta', type: 'basic', category: 'T-row' },
  { char: 'チ', romaji: 'chi', type: 'basic', category: 'T-row' },
  { char: 'ツ', romaji: 'tsu', type: 'basic', category: 'T-row' },
  { char: 'テ', romaji: 'te', type: 'basic', category: 'T-row' },
  { char: 'ト', romaji: 'to', type: 'basic', category: 'T-row' },
  
  // N-row
  { char: 'ナ', romaji: 'na', type: 'basic', category: 'N-row' },
  { char: 'ニ', romaji: 'ni', type: 'basic', category: 'N-row' },
  { char: 'ヌ', romaji: 'nu', type: 'basic', category: 'N-row' },
  { char: 'ネ', romaji: 'ne', type: 'basic', category: 'N-row' },
  { char: 'ノ', romaji: 'no', type: 'basic', category: 'N-row' },
  
  // H-row
  { char: 'ハ', romaji: 'ha', type: 'basic', category: 'H-row' },
  { char: 'ヒ', romaji: 'hi', type: 'basic', category: 'H-row' },
  { char: 'フ', romaji: 'fu', type: 'basic', category: 'H-row' },
  { char: 'ヘ', romaji: 'he', type: 'basic', category: 'H-row' },
  { char: 'ホ', romaji: 'ho', type: 'basic', category: 'H-row' },
  
  // M-row
  { char: 'マ', romaji: 'ma', type: 'basic', category: 'M-row' },
  { char: 'ミ', romaji: 'mi', type: 'basic', category: 'M-row' },
  { char: 'ム', romaji: 'mu', type: 'basic', category: 'M-row' },
  { char: 'メ', romaji: 'me', type: 'basic', category: 'M-row' },
  { char: 'モ', romaji: 'mo', type: 'basic', category: 'M-row' },
  
  // Y-row
  { char: 'ヤ', romaji: 'ya', type: 'basic', category: 'Y-row' },
  { char: 'ユ', romaji: 'yu', type: 'basic', category: 'Y-row' },
  { char: 'ヨ', romaji: 'yo', type: 'basic', category: 'Y-row' },
  
  // R-row
  { char: 'ラ', romaji: 'ra', type: 'basic', category: 'R-row' },
  { char: 'リ', romaji: 'ri', type: 'basic', category: 'R-row' },
  { char: 'ル', romaji: 'ru', type: 'basic', category: 'R-row' },
  { char: 'レ', romaji: 're', type: 'basic', category: 'R-row' },
  { char: 'ロ', romaji: 'ro', type: 'basic', category: 'R-row' },
  
  // W-row
  { char: 'ワ', romaji: 'wa', type: 'basic', category: 'W-row' },
  { char: 'ヲ', romaji: 'wo', type: 'basic', category: 'W-row' },
  
  // N
  { char: 'ン', romaji: 'n', type: 'basic', category: 'N' },
  
  // Dakuten (voiced) - 25 characters
  // G-row
  { char: 'ガ', romaji: 'ga', type: 'dakuten', category: 'G-row (Dakuten)' },
  { char: 'ギ', romaji: 'gi', type: 'dakuten', category: 'G-row (Dakuten)' },
  { char: 'グ', romaji: 'gu', type: 'dakuten', category: 'G-row (Dakuten)' },
  { char: 'ゲ', romaji: 'ge', type: 'dakuten', category: 'G-row (Dakuten)' },
  { char: 'ゴ', romaji: 'go', type: 'dakuten', category: 'G-row (Dakuten)' },
  
  // Z-row
  { char: 'ザ', romaji: 'za', type: 'dakuten', category: 'Z-row (Dakuten)' },
  { char: 'ジ', romaji: 'ji', type: 'dakuten', category: 'Z-row (Dakuten)' },
  { char: 'ズ', romaji: 'zu', type: 'dakuten', category: 'Z-row (Dakuten)' },
  { char: 'ゼ', romaji: 'ze', type: 'dakuten', category: 'Z-row (Dakuten)' },
  { char: 'ゾ', romaji: 'zo', type: 'dakuten', category: 'Z-row (Dakuten)' },
  
  // D-row
  { char: 'ダ', romaji: 'da', type: 'dakuten', category: 'D-row (Dakuten)' },
  { char: 'ヂ', romaji: 'ji', type: 'dakuten', category: 'D-row (Dakuten)' },
  { char: 'ヅ', romaji: 'zu', type: 'dakuten', category: 'D-row (Dakuten)' },
  { char: 'デ', romaji: 'de', type: 'dakuten', category: 'D-row (Dakuten)' },
  { char: 'ド', romaji: 'do', type: 'dakuten', category: 'D-row (Dakuten)' },
  
  // B-row
  { char: 'バ', romaji: 'ba', type: 'dakuten', category: 'B-row (Dakuten)' },
  { char: 'ビ', romaji: 'bi', type: 'dakuten', category: 'B-row (Dakuten)' },
  { char: 'ブ', romaji: 'bu', type: 'dakuten', category: 'B-row (Dakuten)' },
  { char: 'ベ', romaji: 'be', type: 'dakuten', category: 'B-row (Dakuten)' },
  { char: 'ボ', romaji: 'bo', type: 'dakuten', category: 'B-row (Dakuten)' },
  
  // Handakuten (p-sounds) - 5 characters
  { char: 'パ', romaji: 'pa', type: 'handakuten', category: 'P-row (Handakuten)' },
  { char: 'ピ', romaji: 'pi', type: 'handakuten', category: 'P-row (Handakuten)' },
  { char: 'プ', romaji: 'pu', type: 'handakuten', category: 'P-row (Handakuten)' },
  { char: 'ペ', romaji: 'pe', type: 'handakuten', category: 'P-row (Handakuten)' },
  { char: 'ポ', romaji: 'po', type: 'handakuten', category: 'P-row (Handakuten)' },
  
  // Yōon (combination characters) - 33 characters
  // K-combinations
  { char: 'キャ', romaji: 'kya', type: 'yoon', category: 'K-Yōon' },
  { char: 'キュ', romaji: 'kyu', type: 'yoon', category: 'K-Yōon' },
  { char: 'キョ', romaji: 'kyo', type: 'yoon', category: 'K-Yōon' },
  
  // S-combinations
  { char: 'シャ', romaji: 'sha', type: 'yoon', category: 'S-Yōon' },
  { char: 'シュ', romaji: 'shu', type: 'yoon', category: 'S-Yōon' },
  { char: 'ショ', romaji: 'sho', type: 'yoon', category: 'S-Yōon' },
  
  // T-combinations
  { char: 'チャ', romaji: 'cha', type: 'yoon', category: 'T-Yōon' },
  { char: 'チュ', romaji: 'chu', type: 'yoon', category: 'T-Yōon' },
  { char: 'チョ', romaji: 'cho', type: 'yoon', category: 'T-Yōon' },
  
  // N-combinations
  { char: 'ニャ', romaji: 'nya', type: 'yoon', category: 'N-Yōon' },
  { char: 'ニュ', romaji: 'nyu', type: 'yoon', category: 'N-Yōon' },
  { char: 'ニョ', romaji: 'nyo', type: 'yoon', category: 'N-Yōon' },
  
  // H-combinations
  { char: 'ヒャ', romaji: 'hya', type: 'yoon', category: 'H-Yōon' },
  { char: 'ヒュ', romaji: 'hyu', type: 'yoon', category: 'H-Yōon' },
  { char: 'ヒョ', romaji: 'hyo', type: 'yoon', category: 'H-Yōon' },
  
  // M-combinations
  { char: 'ミャ', romaji: 'mya', type: 'yoon', category: 'M-Yōon' },
  { char: 'ミュ', romaji: 'myu', type: 'yoon', category: 'M-Yōon' },
  { char: 'ミョ', romaji: 'myo', type: 'yoon', category: 'M-Yōon' },
  
  // R-combinations
  { char: 'リャ', romaji: 'rya', type: 'yoon', category: 'R-Yōon' },
  { char: 'リュ', romaji: 'ryu', type: 'yoon', category: 'R-Yōon' },
  { char: 'リョ', romaji: 'ryo', type: 'yoon', category: 'R-Yōon' },
  
  // G-combinations
  { char: 'ギャ', romaji: 'gya', type: 'yoon', category: 'G-Yōon' },
  { char: 'ギュ', romaji: 'gyu', type: 'yoon', category: 'G-Yōon' },
  { char: 'ギョ', romaji: 'gyo', type: 'yoon', category: 'G-Yōon' },
  
  // J-combinations
  { char: 'ジャ', romaji: 'ja', type: 'yoon', category: 'J-Yōon' },
  { char: 'ジュ', romaji: 'ju', type: 'yoon', category: 'J-Yōon' },
  { char: 'ジョ', romaji: 'jo', type: 'yoon', category: 'J-Yōon' },
  
  // B-combinations
  { char: 'ビャ', romaji: 'bya', type: 'yoon', category: 'B-Yōon' },
  { char: 'ビュ', romaji: 'byu', type: 'yoon', category: 'B-Yōon' },
  { char: 'ビョ', romaji: 'byo', type: 'yoon', category: 'B-Yōon' },
  
  // P-combinations
  { char: 'ピャ', romaji: 'pya', type: 'yoon', category: 'P-Yōon' },
  { char: 'ピュ', romaji: 'pyu', type: 'yoon', category: 'P-Yōon' },
  { char: 'ピョ', romaji: 'pyo', type: 'yoon', category: 'P-Yōon' },
];

// Helper functions
export function getAllKana(kanaType: 'hiragana' | 'katakana') {
  return kanaType === 'hiragana' ? completeHiragana : completeKatakana;
}

// Get kana by sub-type selection (for menu)
export function getKanaBySubType(kanaType: 'hiragana' | 'katakana', subType: 'all' | 'basic' | 'dakuten' | 'yoon') {
  if (subType === 'all') {
    return getAllKana(kanaType);
  } else if (subType === 'basic') {
    return getBasicKana(kanaType);
  } else if (subType === 'dakuten') {
    return getDakutenKana(kanaType);
  } else if (subType === 'yoon') {
    return getYoonKana(kanaType);
  }
  return getAllKana(kanaType);
}

export function getBasicKana(kanaType: 'hiragana' | 'katakana') {
  return getKanaByType(kanaType, 'basic');
}

export function getDakutenKana(kanaType: 'hiragana' | 'katakana') {
  const dakuten = getKanaByType(kanaType, 'dakuten');
  const handakuten = getKanaByType(kanaType, 'handakuten');
  return [...dakuten, ...handakuten];
}

export function getYoonKana(kanaType: 'hiragana' | 'katakana') {
  return getKanaByType(kanaType, 'yoon');
}

export function getKanaByType(kanaType: 'hiragana' | 'katakana', charType?: 'basic' | 'dakuten' | 'handakuten' | 'yoon') {
  const data = kanaType === 'hiragana' ? completeHiragana : completeKatakana;
  if (charType) {
    return data.filter(char => char.type === charType);
  }
  return data;
}

// Get character count
export const hiraganaCount = {
  basic: completeHiragana.filter(c => c.type === 'basic').length,
  dakuten: completeHiragana.filter(c => c.type === 'dakuten').length,
  handakuten: completeHiragana.filter(c => c.type === 'handakuten').length,
  yoon: completeHiragana.filter(c => c.type === 'yoon').length,
  total: completeHiragana.length
};

export const katakanaCount = {
  basic: completeKatakana.filter(c => c.type === 'basic').length,
  dakuten: completeKatakana.filter(c => c.type === 'dakuten').length,
  handakuten: completeKatakana.filter(c => c.type === 'handakuten').length,
  yoon: completeKatakana.filter(c => c.type === 'yoon').length,
  total: completeKatakana.length
};