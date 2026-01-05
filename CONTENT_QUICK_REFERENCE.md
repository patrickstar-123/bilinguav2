# 📚 Content Quick Reference - Version 2.6

## 🚀 **INSTANT ACCESS GUIDE**

---

## 🇨🇳 **CHINESE (HSK) CONTENT**

### **How to Use**
```typescript
import { 
  hsk1Vocabulary, 
  hsk2Vocabulary, 
  hsk3Vocabulary,
  hskGrammarPatterns,
  chineseCharactersForWriting,
  allChineseVocabulary 
} from './utils/hskData';

// Get all HSK 1 words
const level1Words = hsk1Vocabulary;

// Get HSK 1 verbs only
const level1Verbs = hsk1Vocabulary.filter(w => w.category === 'verb');

// Get HSK 2 time words
const timeWords = hsk2Vocabulary.filter(w => w.category === 'time');

// Get all verbs across all levels
const allVerbs = hsk2Vocabulary.filter(w => w.category === 'verb');

// Get grammar for HSK 1
const grammar1 = hskGrammarPatterns.filter(g => g.hskLevel === 1);
```

### **Available Data**
```
✅ 150 HSK 1 words
✅ 300 HSK 2 words (cumulative)
✅ 320+ HSK 3 words (started)
✅ 10 grammar patterns
✅ 20 writing characters
```

### **Categories**
```
- greeting (greetings)
- pronoun (I, you, he, she, this, that)
- verb (eat, drink, go, come, see, hear)
- adjective (big, small, good, bad)
- noun (person, place, thing)
- number (1-10, 100, 1000, 10000)
- time (today, tomorrow, morning, afternoon)
- direction (up, down, left, right)
- particle (的, 了, 吗, 呢, 不, 很)
```

---

## 🇯🇵 **JAPANESE (JLPT) CONTENT**

### **How to Use**
```typescript
import { 
  hiraganaChart,
  katakanaChart,
  n5Vocabulary,
  n5Kanji,
  japaneseGrammarPatterns,
  japaneseParticles,
  allJapaneseData 
} from './utils/japaneseData';

// Get all hiragana
const hiragana = hiraganaChart;

// Get all katakana
const katakana = katakanaChart;

// Get N5 verbs
const n5Verbs = n5Vocabulary.filter(w => w.category === 'verb');

// Get N5 kanji
const kanji = n5Kanji;

// Get N5 grammar
const grammar = japaneseGrammarPatterns.filter(g => g.jlptLevel === 'N5');

// Get all particles
const particles = japaneseParticles;
```

### **Available Data**
```
✅ 71 hiragana characters
✅ 71 katakana characters
✅ 300 N5 words
✅ 30+ N5 kanji
✅ 15 grammar patterns
✅ 10 particles
```

### **Categories**
```
- greeting (hello, goodbye, thank you)
- pronoun (I, you, he, she, this, that)
- verb (go, come, eat, drink, see, hear)
- adjective (big, small, good, bad)
- noun (person, place, thing, food, etc.)
- number (1-10, 100, 1000, 10000)
- time (now, today, tomorrow, morning)
- direction (up, down, left, right)
- color (white, black, red, blue)
- body (head, eye, ear, nose, mouth)
- weather (rain, snow, wind, sunny)
```

---

## 💡 **COMMON USE CASES**

### **1. Generate Flashcards**
```typescript
// Chinese flashcards for HSK 1
const flashcards = hsk1Vocabulary.map(word => ({
  front: word.chinese,
  back: `${word.pinyin}\n${word.english}`,
  category: word.category
}));

// Japanese flashcards for N5 verbs
const verbCards = n5Vocabulary
  .filter(w => w.category === 'verb')
  .map(word => ({
    front: word.kanji,
    reading: word.hiragana,
    romaji: word.romaji,
    meaning: word.english
  }));
```

### **2. Generate Quizzes**
```typescript
// HSK 1 quiz (random 10 words)
const quiz = hsk1Vocabulary
  .sort(() => Math.random() - 0.5)
  .slice(0, 10)
  .map(word => ({
    question: `What is ${word.chinese} in English?`,
    answer: word.english,
    options: generateOptions(word.english, hsk1Vocabulary)
  }));

// N5 kanji quiz
const kanjiQuiz = n5Kanji
  .slice(0, 10)
  .map(kanji => ({
    question: `What does ${kanji.character} mean?`,
    answer: kanji.meaning,
    reading: kanji.kunyomi
  }));
```

### **3. Filter by Category**
```typescript
// Get all food-related words
const chineseFood = hsk2Vocabulary.filter(w => 
  w.category === 'noun' && w.id >= 81 && w.id <= 90
);

const japaneseFood = n5Vocabulary.filter(w => 
  w.category === 'noun' && w.id >= 151 && w.id <= 170
);

// Get all adjectives
const chineseAdj = hsk1Vocabulary.filter(w => w.category === 'adjective');
const japaneseAdj = n5Vocabulary.filter(w => w.category === 'adjective');
```

### **4. Practice Kana**
```typescript
// Hiragana practice
const hiraganaBasic = hiraganaChart.filter(c => 
  ['a', 'i', 'u', 'e', 'o', 'ka', 'ki', 'ku', 'ke', 'ko'].includes(c.romaji)
);

// Katakana practice
const katakanaBasic = katakanaChart.filter(c => 
  ['a', 'i', 'u', 'e', 'o', 'ka', 'ki', 'ku', 'ke', 'ko'].includes(c.romaji)
);
```

### **5. Kanji Writing Practice**
```typescript
// Get kanji for writing
const practiceKanji = n5Kanji.filter(k => k.strokes <= 5);

// Chinese characters
const practiceHanzi = chineseCharactersForWriting.filter(c => c.hskLevel === 1);
```

### **6. Grammar Lessons**
```typescript
// HSK 1 grammar lesson
const lesson1 = hskGrammarPatterns.filter(g => g.hskLevel === 1);

// N5 particles lesson
const particlesLesson = japaneseParticles;

// Grammar exercises
const exercises = lesson1.map(pattern => ({
  pattern: pattern.pattern,
  explanation: pattern.explanation,
  examples: pattern.examples,
  practice: generatePracticeExercises(pattern)
}));
```

---

## 📊 **STATISTICS**

### **Chinese**
```
Total Words: 320+
├── HSK 1: 150 words
├── HSK 2: 300 words (cumulative)
└── HSK 3: 320+ words (started)

Categories: 15+
├── Greetings: 5
├── Pronouns: 20
├── Verbs: 55
├── Adjectives: 35
├── Nouns: 150+
├── Numbers: 14
├── Time: 24
├── Directions: 13
└── Particles: 34

Grammar: 10 patterns
Characters: 20 for writing
```

### **Japanese**
```
Kana: 142 characters
├── Hiragana: 71
└── Katakana: 71

Total Words: 300 (N5)
Categories: 17+
├── Greetings: 10
├── Pronouns: 15
├── Verbs: 50
├── Adjectives: 35
├── Nouns: 145
├── Numbers: 14
├── Time: 29
├── Colors: 7
├── Body: 12
├── Weather: 6
└── Directions: 15

Kanji: 30+ (N5)
Grammar: 15 patterns
Particles: 10
```

---

## 🎯 **WORD ID RANGES**

### **Chinese (HSK 2)**
```
ID 1-5: Greetings
ID 6-20: Pronouns
ID 21-50: Verbs (HSK 1)
ID 51-65: Adjectives (HSK 1)
ID 66-80: Nouns - People (HSK 1)
ID 81-90: Nouns - Food (HSK 1)
ID 91-98: Nouns - Places (HSK 1)
ID 99-110: Nouns - Things (HSK 1)
ID 111-126: Numbers & Time (HSK 1)
ID 127-150: Time & Particles (HSK 1)
ID 151-175: Verbs (HSK 2)
ID 176-195: Adjectives (HSK 2)
ID 196-250: Nouns (HSK 2)
ID 251-261: Time (HSK 2)
ID 262-277: Directions (HSK 2)
ID 278-300: Particles (HSK 2)
```

### **Japanese (N5)**
```
ID 1-10: Greetings
ID 11-25: Pronouns
ID 26-75: Verbs
ID 76-110: Adjectives
ID 111-130: Nouns - People
ID 131-150: Nouns - Places
ID 151-170: Nouns - Food & Drink
ID 171-195: Nouns - Things
ID 196-203: Transportation
ID 204-232: Time
ID 233-246: Numbers
ID 247-253: Colors
ID 254-265: Body Parts
ID 266-271: Weather
ID 272-286: Directions
ID 287-300: Additional
```

---

## 🔍 **SEARCH EXAMPLES**

### **Find Specific Words**
```typescript
// Find "hello" in Chinese
const hello = hsk1Vocabulary.find(w => w.english === 'Hello');
// Result: { chinese: "你好", pinyin: "nǐ hǎo", ... }

// Find "こんにちは" in Japanese
const konnichiwa = n5Vocabulary.find(w => w.hiragana === 'こんにちは');
// Result: { kanji: "こんにちは", romaji: "konnichiwa", ... }
```

### **Filter by Multiple Criteria**
```typescript
// HSK 1 nouns about people
const people = hsk1Vocabulary.filter(w => 
  w.hskLevel === 1 && 
  w.category === 'noun' && 
  w.id >= 66 && w.id <= 80
);

// N5 i-adjectives (ending in い)
const iAdjectives = n5Vocabulary.filter(w => 
  w.category === 'adjective' && 
  w.hiragana.endsWith('い')
);
```

### **Group by Category**
```typescript
// Group Chinese words by category
const grouped = hsk1Vocabulary.reduce((acc, word) => {
  const cat = word.category || 'other';
  if (!acc[cat]) acc[cat] = [];
  acc[cat].push(word);
  return acc;
}, {});

// Result: { verb: [...], noun: [...], adjective: [...] }
```

---

## 🎓 **LEARNING PATHS**

### **Chinese Beginner Path**
```
Week 1-2: HSK 1 Greetings & Pronouns (25 words)
Week 3-4: HSK 1 Basic Verbs (30 words)
Week 5-6: HSK 1 Adjectives & Nouns (40 words)
Week 7-8: HSK 1 Numbers & Time (25 words)
Week 9-10: HSK 1 Particles & Review (30 words)
Week 11-12: HSK 1 Complete (150 words)
```

### **Japanese Beginner Path**
```
Week 1: Hiragana あ-row to た-row (25 chars)
Week 2: Hiragana な-row to ん + dakuten (46 chars)
Week 3: Katakana ア-row to タ-row (25 chars)
Week 4: Katakana ナ-row to ン + dakuten (46 chars)
Week 5-6: N5 Greetings & Pronouns (25 words)
Week 7-8: N5 Basic Verbs (50 words)
Week 9-10: N5 Adjectives & Nouns (80 words)
Week 11-12: N5 Time, Numbers, & More (100 words)
Week 13-14: Basic Kanji (10-20 kanji)
Week 15-16: N5 Complete (300 words + 30 kanji)
```

---

## 💾 **DATA EXPORT**

### **Chinese**
```typescript
// Export for external use
export const chineseData = {
  vocabulary: {
    hsk1: hsk1Vocabulary,
    hsk2: hsk2Vocabulary,
    hsk3: hsk3Vocabulary,
  },
  grammar: hskGrammarPatterns,
  characters: chineseCharactersForWriting,
  counts: hskWordCounts,
};
```

### **Japanese**
```typescript
// Export for external use
export const japaneseData = {
  kana: {
    hiragana: hiraganaChart,
    katakana: katakanaChart,
  },
  vocabulary: {
    n5: n5Vocabulary,
  },
  kanji: n5Kanji,
  grammar: japaneseGrammarPatterns,
  particles: japaneseParticles,
  counts: jlptWordCounts,
};
```

---

## ⚡ **QUICK TIPS**

### **Performance**
```typescript
// Cache frequently used data
const cachedHSK1 = useMemo(() => hsk1Vocabulary, []);
const cachedN5 = useMemo(() => n5Vocabulary, []);

// Use indices for fast lookup
const wordMap = new Map(hsk1Vocabulary.map(w => [w.id, w]));
const getWord = (id) => wordMap.get(id);
```

### **Randomization**
```typescript
// Shuffle for random practice
const shuffle = (array) => [...array].sort(() => Math.random() - 0.5);

// Get random words
const random10 = shuffle(hsk1Vocabulary).slice(0, 10);
```

### **Difficulty Progression**
```typescript
// Easy to hard
const byDifficulty = [
  ...hsk1Vocabulary.filter(w => w.category === 'number'),
  ...hsk1Vocabulary.filter(w => w.category === 'pronoun'),
  ...hsk1Vocabulary.filter(w => w.category === 'verb'),
  ...hsk1Vocabulary.filter(w => w.category === 'adjective'),
  ...hsk1Vocabulary.filter(w => w.category === 'noun'),
];
```

---

## ✅ **CHECKLIST FOR USAGE**

### **Before Using**
```
[ ] Import the data files
[ ] Understand the data structure
[ ] Know which level you need
[ ] Check available categories
[ ] Plan your lesson structure
```

### **During Development**
```
[ ] Filter by level appropriately
[ ] Use categories for organization
[ ] Validate data before display
[ ] Handle edge cases
[ ] Test with different word counts
```

### **For Production**
```
[ ] Cache data where possible
[ ] Optimize queries
[ ] Handle missing data gracefully
[ ] Provide fallbacks
[ ] Test across all levels
```

---

## 🎉 **YOU'RE READY!**

You now have access to:
- ✅ 620+ vocabulary entries
- ✅ 142 kana characters
- ✅ 30+ kanji with full details
- ✅ 25 grammar patterns
- ✅ 10 particle explanations
- ✅ 15+ organized categories
- ✅ Complete learning paths

**Start building amazing language learning features!** 🚀📚

---

**Version:** 2.6  
**Data Files:** `/utils/hskData.ts`, `/utils/japaneseData.ts`  
**Total Content:** 3800+ lines of comprehensive data  
**Ready For:** Immediate use in your application  

**Happy coding!** 💻✨
