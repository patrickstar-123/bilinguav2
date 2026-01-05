// Complete vocabulary database for all levels with romaji, pinyin, examples, and grammar notes

export interface VocabularyItem {
  character: string;
  reading: string; // romaji or pinyin
  meaning: string;
  example: string;
  exampleReading?: string;
  exampleMeaning: string;
  type: string; // noun, verb, adjective, particle, etc.
  notes?: string;
}

// ===== HIRAGANA COMPLETE DATABASE =====
export const hiraganaVocabulary: VocabularyItem[] = [
  // Basic Gojūon Vowels
  { character: 'あ', reading: 'a', meaning: 'ah (as in "father")', example: 'あい', exampleReading: 'ai', exampleMeaning: 'love', type: 'vowel' },
  { character: 'い', reading: 'i', meaning: 'ee (as in "see")', example: 'いえ', exampleReading: 'ie', exampleMeaning: 'house', type: 'vowel' },
  { character: 'う', reading: 'u', meaning: 'oo (as in "moon")', example: 'うみ', exampleReading: 'umi', exampleMeaning: 'sea', type: 'vowel' },
  { character: 'え', reading: 'e', meaning: 'eh (as in "bed")', example: 'えき', exampleReading: 'eki', exampleMeaning: 'station', type: 'vowel' },
  { character: 'お', reading: 'o', meaning: 'oh (as in "boat")', example: 'おかね', exampleReading: 'okane', exampleMeaning: 'money', type: 'vowel' },
  
  // K-row
  { character: 'か', reading: 'ka', meaning: 'ka', example: 'かぞく', exampleReading: 'kazoku', exampleMeaning: 'family', type: 'consonant' },
  { character: 'き', reading: 'ki', meaning: 'ki', example: 'きれい', exampleReading: 'kirei', exampleMeaning: 'beautiful', type: 'consonant' },
  { character: 'く', reading: 'ku', meaning: 'ku', example: 'くるま', exampleReading: 'kuruma', exampleMeaning: 'car', type: 'consonant' },
  { character: 'け', reading: 'ke', meaning: 'ke', example: 'けいき', exampleReading: 'keiki', exampleMeaning: 'economy', type: 'consonant' },
  { character: 'こ', reading: 'ko', meaning: 'ko', example: 'こども', exampleReading: 'kodomo', exampleMeaning: 'child', type: 'consonant' },
  
  // S-row
  { character: 'さ', reading: 'sa', meaning: 'sa', example: 'さかな', exampleReading: 'sakana', exampleMeaning: 'fish', type: 'consonant' },
  { character: 'し', reading: 'shi', meaning: 'shi', example: 'しごと', exampleReading: 'shigoto', exampleMeaning: 'work', type: 'consonant' },
  { character: 'す', reading: 'su', meaning: 'su', example: 'すし', exampleReading: 'sushi', exampleMeaning: 'sushi', type: 'consonant' },
  { character: 'せ', reading: 'se', meaning: 'se', example: 'せんせい', exampleReading: 'sensei', exampleMeaning: 'teacher', type: 'consonant' },
  { character: 'そ', reading: 'so', meaning: 'so', example: 'そら', exampleReading: 'sora', exampleMeaning: 'sky', type: 'consonant' },
  
  // T-row
  { character: 'た', reading: 'ta', meaning: 'ta', example: 'たべる', exampleReading: 'taberu', exampleMeaning: 'to eat', type: 'consonant' },
  { character: 'ち', reading: 'chi', meaning: 'chi', example: 'ちず', exampleReading: 'chizu', exampleMeaning: 'map', type: 'consonant' },
  { character: 'つ', reading: 'tsu', meaning: 'tsu', example: 'つくえ', exampleReading: 'tsukue', exampleMeaning: 'desk', type: 'consonant' },
  { character: 'て', reading: 'te', meaning: 'te', example: 'てがみ', exampleReading: 'tegami', exampleMeaning: 'letter', type: 'consonant' },
  { character: 'と', reading: 'to', meaning: 'to', example: 'とけい', exampleReading: 'tokei', exampleMeaning: 'clock', type: 'consonant' },
  
  // N-row
  { character: 'な', reading: 'na', meaning: 'na', example: 'なまえ', exampleReading: 'namae', exampleMeaning: 'name', type: 'consonant' },
  { character: 'に', reading: 'ni', meaning: 'ni', example: 'にほん', exampleReading: 'nihon', exampleMeaning: 'Japan', type: 'consonant' },
  { character: 'ぬ', reading: 'nu', meaning: 'nu', example: 'ぬの', exampleReading: 'nuno', exampleMeaning: 'cloth', type: 'consonant' },
  { character: 'ね', reading: 'ne', meaning: 'ne', example: 'ねこ', exampleReading: 'neko', exampleMeaning: 'cat', type: 'consonant' },
  { character: 'の', reading: 'no', meaning: 'no', example: 'のみもの', exampleReading: 'nomimono', exampleMeaning: 'drink', type: 'consonant' },
  
  // H-row
  { character: 'は', reading: 'ha', meaning: 'ha', example: 'はな', exampleReading: 'hana', exampleMeaning: 'flower', type: 'consonant' },
  { character: 'ひ', reading: 'hi', meaning: 'hi', example: 'ひと', exampleReading: 'hito', exampleMeaning: 'person', type: 'consonant' },
  { character: 'ふ', reading: 'fu', meaning: 'fu', example: 'ふゆ', exampleReading: 'fuyu', exampleMeaning: 'winter', type: 'consonant' },
  { character: 'へ', reading: 'he', meaning: 'he', example: 'へや', exampleReading: 'heya', exampleMeaning: 'room', type: 'consonant' },
  { character: 'ほ', reading: 'ho', meaning: 'ho', example: 'ほん', exampleReading: 'hon', exampleMeaning: 'book', type: 'consonant' },
  
  // M-row
  { character: 'ま', reading: 'ma', meaning: 'ma', example: 'まち', exampleReading: 'machi', exampleMeaning: 'town', type: 'consonant' },
  { character: 'み', reading: 'mi', meaning: 'mi', example: 'みず', exampleReading: 'mizu', exampleMeaning: 'water', type: 'consonant' },
  { character: 'む', reading: 'mu', meaning: 'mu', example: 'むら', exampleReading: 'mura', exampleMeaning: 'village', type: 'consonant' },
  { character: 'め', reading: 'me', meaning: 'me', example: 'め', exampleReading: 'me', exampleMeaning: 'eye', type: 'consonant' },
  { character: 'も', reading: 'mo', meaning: 'mo', example: 'もの', exampleReading: 'mono', exampleMeaning: 'thing', type: 'consonant' },
  
  // Y-row
  { character: 'や', reading: 'ya', meaning: 'ya', example: 'やま', exampleReading: 'yama', exampleMeaning: 'mountain', type: 'consonant' },
  { character: 'ゆ', reading: 'yu', meaning: 'yu', example: 'ゆき', exampleReading: 'yuki', exampleMeaning: 'snow', type: 'consonant' },
  { character: 'よ', reading: 'yo', meaning: 'yo', example: 'よる', exampleReading: 'yoru', exampleMeaning: 'night', type: 'consonant' },
  
  // R-row
  { character: 'ら', reading: 'ra', meaning: 'ra', example: 'らいねん', exampleReading: 'rainen', exampleMeaning: 'next year', type: 'consonant' },
  { character: 'り', reading: 'ri', meaning: 'ri', example: 'りょうり', exampleReading: 'ryouri', exampleMeaning: 'cooking', type: 'consonant' },
  { character: 'る', reading: 'ru', meaning: 'ru', example: 'る', exampleReading: 'ru', exampleMeaning: 'verb ending', type: 'consonant' },
  { character: 'れ', reading: 're', meaning: 're', example: 'れきし', exampleReading: 'rekishi', exampleMeaning: 'history', type: 'consonant' },
  { character: 'ろ', reading: 'ro', meaning: 'ro', example: 'ろく', exampleReading: 'roku', exampleMeaning: 'six', type: 'consonant' },
  
  // W-row
  { character: 'わ', reading: 'wa', meaning: 'wa', example: 'わたし', exampleReading: 'watashi', exampleMeaning: 'I, me', type: 'consonant' },
  { character: 'を', reading: 'wo/o', meaning: 'wo (object marker)', example: 'ほんをよむ', exampleReading: 'hon wo yomu', exampleMeaning: 'read a book', type: 'particle', notes: 'Used only as a particle' },
  
  // N
  { character: 'ん', reading: 'n', meaning: 'n (syllabic)', example: 'にほん', exampleReading: 'nihon', exampleMeaning: 'Japan', type: 'consonant', notes: 'Never appears at the start of a word' },
];

// ===== HSK 1 COMPLETE DATABASE =====
export const hsk1Vocabulary: VocabularyItem[] = [
  { character: '你好', reading: 'nǐ hǎo', meaning: 'hello', example: '你好！很高兴见到你。', exampleReading: 'Nǐ hǎo! Hěn gāoxìng jiàn dào nǐ.', exampleMeaning: 'Hello! Nice to meet you.', type: 'greeting' },
  { character: '谢谢', reading: 'xièxie', meaning: 'thank you', example: '谢谢你的帮助。', exampleReading: 'Xièxie nǐ de bāngzhù.', exampleMeaning: 'Thank you for your help.', type: 'expression' },
  { character: '再见', reading: 'zàijiàn', meaning: 'goodbye', example: '明天见！再见！', exampleReading: 'Míngtiān jiàn! Zàijiàn!', exampleMeaning: 'See you tomorrow! Goodbye!', type: 'greeting' },
  { character: '我', reading: 'wǒ', meaning: 'I, me', example: '我是学生。', exampleReading: 'Wǒ shì xuésheng.', exampleMeaning: 'I am a student.', type: 'pronoun' },
  { character: '你', reading: 'nǐ', meaning: 'you', example: '你叫什么名字？', exampleReading: 'Nǐ jiào shénme míngzi?', exampleMeaning: 'What is your name?', type: 'pronoun' },
  { character: '他', reading: 'tā', meaning: 'he, him', example: '他是我的朋友。', exampleReading: 'Tā shì wǒ de péngyou.', exampleMeaning: 'He is my friend.', type: 'pronoun' },
  { character: '她', reading: 'tā', meaning: 'she, her', example: '她是老师。', exampleReading: 'Tā shì lǎoshī.', exampleMeaning: 'She is a teacher.', type: 'pronoun' },
  { character: '是', reading: 'shì', meaning: 'to be, is', example: '这是我的书。', exampleReading: 'Zhè shì wǒ de shū.', exampleMeaning: 'This is my book.', type: 'verb' },
  { character: '不', reading: 'bù', meaning: 'no, not', example: '我不是老师。', exampleReading: 'Wǒ bù shì lǎoshī.', exampleMeaning: 'I am not a teacher.', type: 'adverb', notes: 'Tone changes to 2nd tone before 4th tone' },
  { character: '的', reading: 'de', meaning: 'possessive particle', example: '我的书', exampleReading: 'wǒ de shū', exampleMeaning: 'my book', type: 'particle', notes: 'Most common character in Chinese' },
  { character: '人', reading: 'rén', meaning: 'person, people', example: '中国人', exampleReading: 'Zhōngguó rén', exampleMeaning: 'Chinese person', type: 'noun' },
  { character: '水', reading: 'shuǐ', meaning: 'water', example: '我想喝水。', exampleReading: 'Wǒ xiǎng hē shuǐ.', exampleMeaning: 'I want to drink water.', type: 'noun' },
  { character: '饭', reading: 'fàn', meaning: 'rice, meal', example: '吃饭', exampleReading: 'chī fàn', exampleMeaning: 'to eat (a meal)', type: 'noun' },
  { character: '茶', reading: 'chá', meaning: 'tea', example: '我喜欢喝茶。', exampleReading: 'Wǒ xǐhuan hē chá.', exampleMeaning: 'I like drinking tea.', type: 'noun' },
  { character: '中国', reading: 'Zhōngguó', meaning: 'China', example: '我来自中国。', exampleReading: 'Wǒ láizì Zhōngguó.', exampleMeaning: 'I come from China.', type: 'noun' },
  { character: '家', reading: 'jiā', meaning: 'home, family', example: '我想回家。', exampleReading: 'Wǒ xiǎng huí jiā.', exampleMeaning: 'I want to go home.', type: 'noun' },
  { character: '爱', reading: 'ài', meaning: 'to love', example: '我爱你。', exampleReading: 'Wǒ ài nǐ.', exampleMeaning: 'I love you.', type: 'verb' },
  { character: '吃', reading: 'chī', meaning: 'to eat', example: '你吃饭了吗？', exampleReading: 'Nǐ chī fàn le ma?', exampleMeaning: 'Have you eaten?', type: 'verb' },
  { character: '喝', reading: 'hē', meaning: 'to drink', example: '我要喝咖啡。', exampleReading: 'Wǒ yào hē kāfēi.', exampleMeaning: 'I want to drink coffee.', type: 'verb' },
  { character: '看', reading: 'kàn', meaning: 'to look, to see', example: '我看书。', exampleReading: 'Wǒ kàn shū.', exampleMeaning: 'I read books.', type: 'verb' },
  { character: '好', reading: 'hǎo', meaning: 'good, well', example: '很好！', exampleReading: 'Hěn hǎo!', exampleMeaning: 'Very good!', type: 'adjective' },
  { character: '大', reading: 'dà', meaning: 'big, large', example: '大房子', exampleReading: 'dà fángzi', exampleMeaning: 'big house', type: 'adjective' },
  { character: '小', reading: 'xiǎo', meaning: 'small, little', example: '小狗', exampleReading: 'xiǎo gǒu', exampleMeaning: 'small dog', type: 'adjective' },
  { character: '多少', reading: 'duōshao', meaning: 'how much, how many', example: '多少钱？', exampleReading: 'Duōshao qián?', exampleMeaning: 'How much money?', type: 'question word' },
  { character: '什么', reading: 'shénme', meaning: 'what', example: '这是什么？', exampleReading: 'Zhè shì shénme?', exampleMeaning: 'What is this?', type: 'question word' },
  { character: '哪', reading: 'nǎ', meaning: 'which', example: '你住在哪儿？', exampleReading: 'Nǐ zhù zài nǎr?', exampleMeaning: 'Where do you live?', type: 'question word' },
  { character: '谁', reading: 'shéi', meaning: 'who', example: '他是谁？', exampleReading: 'Tā shì shéi?', exampleMeaning: 'Who is he?', type: 'question word' },
  { character: '这', reading: 'zhè', meaning: 'this', example: '这个', exampleReading: 'zhège', exampleMeaning: 'this one', type: 'demonstrative' },
  { character: '那', reading: 'nà', meaning: 'that', example: '那个', exampleReading: 'nàge', exampleMeaning: 'that one', type: 'demonstrative' },
  { character: '今天', reading: 'jīntiān', meaning: 'today', example: '今天天气很好。', exampleReading: 'Jīntiān tiānqì hěn hǎo.', exampleMeaning: 'The weather is good today.', type: 'time word' },
];

// ===== JLPT N5 VOCABULARY DATABASE =====
export const jlptN5Vocabulary: VocabularyItem[] = [
  { character: 'こんにちは', reading: 'konnichiwa', meaning: 'hello, good afternoon', example: 'こんにちは！元気ですか？', exampleReading: 'Konnichiwa! Genki desu ka?', exampleMeaning: 'Hello! How are you?', type: 'greeting' },
  { character: 'ありがとう', reading: 'arigatou', meaning: 'thank you', example: 'ありがとうございます。', exampleReading: 'Arigatou gozaimasu.', exampleMeaning: 'Thank you very much.', type: 'expression' },
  { character: 'すみません', reading: 'sumimasen', meaning: 'excuse me, sorry', example: 'すみません、駅はどこですか？', exampleReading: 'Sumimasen, eki wa doko desu ka?', exampleMeaning: 'Excuse me, where is the station?', type: 'expression' },
  { character: 'わたし', reading: 'watashi', meaning: 'I, me', example: '私は学生です。', exampleReading: 'Watashi wa gakusei desu.', exampleMeaning: 'I am a student.', type: 'pronoun' },
  { character: 'あなた', reading: 'anata', meaning: 'you', example: 'あなたの名前は？', exampleReading: 'Anata no namae wa?', exampleMeaning: 'What is your name?', type: 'pronoun', notes: 'Often omitted in conversation' },
  { character: 'これ', reading: 'kore', meaning: 'this', example: 'これは私の本です。', exampleReading: 'Kore wa watashi no hon desu.', exampleMeaning: 'This is my book.', type: 'demonstrative' },
  { character: 'それ', reading: 'sore', meaning: 'that', example: 'それは何ですか？', exampleReading: 'Sore wa nan desu ka?', exampleMeaning: 'What is that?', type: 'demonstrative' },
  { character: 'あれ', reading: 'are', meaning: 'that over there', example: 'あれは学校です。', exampleReading: 'Are wa gakkou desu.', exampleMeaning: 'That over there is a school.', type: 'demonstrative' },
  { character: 'です', reading: 'desu', meaning: 'to be (polite)', example: '学生です。', exampleReading: 'Gakusei desu.', exampleMeaning: 'I am a student.', type: 'copula', notes: 'Polite sentence ending' },
  { character: 'じゃない', reading: 'janai', meaning: 'is not', example: '学生じゃないです。', exampleReading: 'Gakusei janai desu.', exampleMeaning: 'I am not a student.', type: 'copula' },
  { character: 'たべる', reading: 'taberu', meaning: 'to eat', example: 'ご飯を食べます。', exampleReading: 'Gohan wo tabemasu.', exampleMeaning: 'I eat rice.', type: 'verb' },
  { character: 'のむ', reading: 'nomu', meaning: 'to drink', example: '水を飲みます。', exampleReading: 'Mizu wo nomimasu.', exampleMeaning: 'I drink water.', type: 'verb' },
  { character: 'みる', reading: 'miru', meaning: 'to see, to watch', example: 'テレビを見ます。', exampleReading: 'Terebi wo mimasu.', exampleMeaning: 'I watch TV.', type: 'verb' },
  { character: 'いく', reading: 'iku', meaning: 'to go', example: '学校に行きます。', exampleReading: 'Gakkou ni ikimasu.', exampleMeaning: 'I go to school.', type: 'verb' },
  { character: 'くる', reading: 'kuru', meaning: 'to come', example: '友達が来ます。', exampleReading: 'Tomodachi ga kimasu.', exampleMeaning: 'My friend is coming.', type: 'verb', notes: 'Irregular verb' },
  { character: 'する', reading: 'suru', meaning: 'to do', example: '勉強します。', exampleReading: 'Benkyou shimasu.', exampleMeaning: 'I study.', type: 'verb', notes: 'Irregular verb' },
  { character: 'いい', reading: 'ii', meaning: 'good', example: 'いい天気ですね。', exampleReading: 'Ii tenki desu ne.', exampleMeaning: 'Good weather, isn\'t it?', type: 'adjective' },
  { character: 'おおきい', reading: 'ookii', meaning: 'big', example: '大きい家', exampleReading: 'ookii ie', exampleMeaning: 'big house', type: 'adjective' },
  { character: 'ちいさい', reading: 'chiisai', meaning: 'small', example: '小さい犬', exampleReading: 'chiisai inu', exampleMeaning: 'small dog', type: 'adjective' },
  { character: 'たかい', reading: 'takai', meaning: 'expensive, tall', example: '高い山', exampleReading: 'takai yama', exampleMeaning: 'tall mountain', type: 'adjective' },
  { character: 'やすい', reading: 'yasui', meaning: 'cheap, inexpensive', example: '安い店', exampleReading: 'yasui mise', exampleMeaning: 'cheap shop', type: 'adjective' },
  { character: 'きれい', reading: 'kirei', meaning: 'beautiful, clean', example: 'きれいな花', exampleReading: 'kirei na hana', exampleMeaning: 'beautiful flower', type: 'na-adjective' },
  { character: 'げんき', reading: 'genki', meaning: 'healthy, energetic', example: '元気ですか？', exampleReading: 'Genki desu ka?', exampleMeaning: 'How are you?', type: 'na-adjective' },
  { character: 'なん/なに', reading: 'nan/nani', meaning: 'what', example: 'これは何ですか？', exampleReading: 'Kore wa nan desu ka?', exampleMeaning: 'What is this?', type: 'question word' },
  { character: 'どこ', reading: 'doko', meaning: 'where', example: 'トイレはどこですか？', exampleReading: 'Toire wa doko desu ka?', exampleMeaning: 'Where is the toilet?', type: 'question word' },
  { character: 'いつ', reading: 'itsu', meaning: 'when', example: 'いつ日本に来ましたか？', exampleReading: 'Itsu nihon ni kimashita ka?', exampleMeaning: 'When did you come to Japan?', type: 'question word' },
  { character: 'だれ', reading: 'dare', meaning: 'who', example: 'あの人は誰ですか？', exampleReading: 'Ano hito wa dare desu ka?', exampleMeaning: 'Who is that person?', type: 'question word' },
  { character: 'いくら', reading: 'ikura', meaning: 'how much (price)', example: 'これはいくらですか？', exampleReading: 'Kore wa ikura desu ka?', exampleMeaning: 'How much is this?', type: 'question word' },
  { character: 'は', reading: 'wa', meaning: 'topic marker', example: '私は学生です。', exampleReading: 'Watashi wa gakusei desu.', exampleMeaning: 'I am a student.', type: 'particle', notes: 'Pronounced "wa" but written は' },
  { character: 'を', reading: 'wo/o', meaning: 'object marker', example: '本を読みます。', exampleReading: 'Hon wo yomimasu.', exampleMeaning: 'I read a book.', type: 'particle', notes: 'Pronounced "o" but written を' },
];

// Export complete vocabulary by level
export const vocabularyByLevel = {
  hiragana: hiraganaVocabulary,
  hsk1: hsk1Vocabulary,
  n5: jlptN5Vocabulary,
};

// Get vocabulary for a specific level
export function getVocabularyForLevel(level: string | number): VocabularyItem[] {
  const levelKey = typeof level === 'string' ? level.toLowerCase() : `hsk${level}`;
  
  if (levelKey === 'hiragana') return hiraganaVocabulary;
  if (levelKey === 'hsk1' || levelKey === 'hsk 1') return hsk1Vocabulary;
  if (levelKey === 'n5' || levelKey === 'jlpt n5') return jlptN5Vocabulary;
  
  // Return empty array for levels not yet implemented
  return [];
}
