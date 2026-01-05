// FIXED VERSION - Copy this function to replace the broken one in hskData.ts

// Helper function to generate dynamic exam questions from vocabulary - FIXED!
export function generateQuestionsFromVocabulary(vocab: any[], count: number = 30): any[] {
  const questions: any[] = [];
  const usedWords = new Set<number>();
  
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
      
      // FIXED: Shuffle FIRST, then find the correct index
      const allOptions = shuffle([word.english, ...wrongAnswers]);
      
      questions.push({
        question: `What does "${word.chinese}" (${word.pinyin}) mean?`,
        options: allOptions,
        correct: allOptions.indexOf(word.english) // Find index AFTER shuffling!
      });
    } else if (questionType === 1) {
      // English to Chinese
      const wrongAnswers = shuffled
        .filter(w => w.id !== word.id && w.category === word.category)
        .slice(0, 3)
        .map(w => w.chinese);
      
      // FIXED: Shuffle FIRST, then find the correct index
      const allOptions = shuffle([word.chinese, ...wrongAnswers]);
      
      questions.push({
        question: `How do you say "${word.english}" in Chinese?`,
        options: allOptions,
        correct: allOptions.indexOf(word.chinese) // Find index AFTER shuffling!
      });
    } else if (questionType === 2) {
      // Pinyin recognition
      const wrongAnswers = shuffled
        .filter(w => w.id !== word.id)
        .slice(0, 3)
        .map(w => w.pinyin);
      
      // FIXED: Shuffle FIRST, then find the correct index
      const allOptions = shuffle([word.pinyin, ...wrongAnswers]);
      
      questions.push({
        question: `What is the pinyin for "${word.chinese}"?`,
        options: allOptions,
        correct: allOptions.indexOf(word.pinyin) // Find index AFTER shuffling!
      });
    } else {
      // Meaning with pinyin given
      const wrongAnswers = shuffled
        .filter(w => w.id !== word.id && w.category === word.category)
        .slice(0, 3)
        .map(w => w.english);
      
      // FIXED: Shuffle FIRST, then find the correct index
      const allOptions = shuffle([word.english, ...wrongAnswers]);
      
      questions.push({
        question: `"${word.pinyin}" means:`,
        options: allOptions,
        correct: allOptions.indexOf(word.english) // Find index AFTER shuffling!
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
      
      // FIXED: Shuffle FIRST, then find the correct index
      const allOptions = shuffle([correct.chinese, ...wrong.map(w => w.chinese)]);
      
      questions.push({
        question: `Which word means "${correct.english}"?`,
        options: allOptions,
        correct: allOptions.indexOf(correct.chinese) // Find index AFTER shuffling!
      });
    }
  }
  
  return questions.slice(0, count);
}

// Helper to shuffle array
function shuffle<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}
