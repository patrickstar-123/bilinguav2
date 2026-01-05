// FIXED QUESTION GENERATION - PASTE THESE INTO hskData.ts and japaneseData.ts

// ========================================
// FOR hskData.ts - Replace generateQuestionsFromVocabulary function (line ~1558)
// ========================================

export function generateQuestionsFromVocabulary_FIXED(vocab: any[], count: number = 30): any[] {
  const questions: any[] = [];
  const usedWords = new Set<number>();
  
  // Helper to shuffle array
  const shuffle = <T,>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };
  
  // Shuffle vocabulary
  const shuffled = [...vocab].sort(() => Math.random() - 0.5);
  
  for (let i = 0; i < Math.min(count, vocab.length); i++) {
    const word = shuffled[i];
    if (usedWords.has(word.id)) continue;
    usedWords.add(word.id);
    
    // Generate different types of questions
    const questionType = i % 4;
    
    if (questionType === 0) {
      // Chinese to English
      const wrongAnswers = shuffled
        .filter(w => w.id !== word.id && w.category === word.category)
        .slice(0, 3)
        .map(w => w.english);
      
      const opts = shuffle([word.english, ...wrongAnswers]);
      questions.push({
        question: `What does "${word.chinese}" (${word.pinyin}) mean?`,
        options: opts,
        correctAnswer: opts.indexOf(word.english)  // Use correctAnswer to match PracticeExercise
      });
    } else if (questionType === 1) {
      // English to Chinese
      const wrongAnswers = shuffled
        .filter(w => w.id !== word.id && w.category === word.category)
        .slice(0, 3)
        .map(w => w.chinese);
      
      const opts = shuffle([word.chinese, ...wrongAnswers]);
      questions.push({
        question: `How do you say "${word.english}" in Chinese?`,
        options: opts,
        correctAnswer: opts.indexOf(word.chinese)
      });
    } else if (questionType === 2) {
      // Pinyin recognition
      const wrongAnswers = shuffled
        .filter(w => w.id !== word.id)
        .slice(0, 3)
        .map(w => w.pinyin);
      
      const opts = shuffle([word.pinyin, ...wrongAnswers]);
      questions.push({
        question: `What is the pinyin for "${word.chinese}"?`,
        options: opts,
        correctAnswer: opts.indexOf(word.pinyin)
      });
    } else {
      // Meaning with pinyin given
      const wrongAnswers = shuffled
        .filter(w => w.id !== word.id && w.category === word.category)
        .slice(0, 3)
        .map(w => w.english);
      
      const opts = shuffle([word.english, ...wrongAnswers]);
      questions.push({
        question: `"${word.pinyin}" means:`,
        options: opts,
        correctAnswer: opts.indexOf(word.english)
      });
    }
  }
  
  // If we need more questions, generate category-based questions
  while (questions.length < count && vocab.length > 0) {
    const categories = [...new Set(vocab.map(w => w.category))];
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const categoryWords = vocab.filter(w => w.category === randomCategory);
    
    if (categoryWords.length >= 4) {
      const correct = categoryWords[Math.floor(Math.random() * categoryWords.length)];
      const wrong = categoryWords
        .filter(w => w.id !== correct.id)
        .slice(0, 3);
      
      const opts = shuffle([correct.chinese, ...wrong.map(w => w.chinese)]);
      questions.push({
        question: `Which word means "${correct.english}"?`,
        options: opts,
        correctAnswer: opts.indexOf(correct.chinese)
      });
    }
  }
  
  return questions.slice(0, count);
}

// ========================================
// FOR japaneseData.ts - Replace generateJapaneseQuestionsFromVocabulary function (line ~710)
// ========================================

export function generateJapaneseQuestionsFromVocabulary_FIXED(vocab: any[], count: number = 30): any[] {
  const questions: any[] = [];
  const usedWords = new Set<number>();
  
  // Helper to shuffle array
  const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };
  
  // Shuffle vocabulary
  const shuffled = [...vocab].sort(() => Math.random() - 0.5);
  
  for (let i = 0; i < Math.min(count, vocab.length); i++) {
    const word = shuffled[i];
    if (usedWords.has(word.id)) continue;
    usedWords.add(word.id);
    
    // Generate different types of questions
    const questionType = i % 4;
    
    if (questionType === 0) {
      // Kanji to English
      const wrongAnswers = shuffled
        .filter(w => w.id !== word.id && w.category === word.category)
        .slice(0, 3)
        .map(w => w.english);
      
      const opts = shuffleArray([word.english, ...wrongAnswers]);
      questions.push({
        question: `What does "${word.kanji}" (${word.hiragana}) mean?`,
        options: opts,
        correctAnswer: opts.indexOf(word.english)
      });
    } else if (questionType === 1) {
      // English to Kanji
      const wrongAnswers = shuffled
        .filter(w => w.id !== word.id && w.category === word.category)
        .slice(0, 3)
        .map(w => w.kanji);
      
      const opts = shuffleArray([word.kanji, ...wrongAnswers]);
      questions.push({
        question: `How do you write "${word.english}" in Japanese?`,
        options: opts,
        correctAnswer: opts.indexOf(word.kanji)
      });
    } else if (questionType === 2) {
      // Hiragana recognition
      const wrongAnswers = shuffled
        .filter(w => w.id !== word.id)
        .slice(0, 3)
        .map(w => w.hiragana);
      
      const opts = shuffleArray([word.hiragana, ...wrongAnswers]);
      questions.push({
        question: `What is the reading for "${word.kanji}"?`,
        options: opts,
        correctAnswer: opts.indexOf(word.hiragana)
      });
    } else {
      // Meaning with hiragana given
      const wrongAnswers = shuffled
        .filter(w => w.id !== word.id && w.category === word.category)
        .slice(0, 3)
        .map(w => w.english);
      
      const opts = shuffleArray([word.english, ...wrongAnswers]);
      questions.push({
        question: `"${word.hiragana}" means:`,
        options: opts,
        correctAnswer: opts.indexOf(word.english)
      });
    }
  }
  
  // If we need more questions, generate category-based questions
  while (questions.length < count && vocab.length > 0) {
    const categories = [...new Set(vocab.map(w => w.category))];
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];\n    const categoryWords = vocab.filter(w => w.category === randomCategory);
    
    if (categoryWords.length >= 4) {
      const correct = categoryWords[Math.floor(Math.random() * categoryWords.length)];
      const wrong = categoryWords
        .filter(w => w.id !== correct.id)
        .slice(0, 3);
      
      const opts = shuffleArray([correct.kanji, ...wrong.map(w => w.kanji)]);
      questions.push({
        question: `Which word means "${correct.english}"?`,
        options: opts,
        correctAnswer: opts.indexOf(correct.kanji)
      });
    }
  }
  
  return questions.slice(0, count);
}
