// Hiragana and Katakana Exercise Generators
import { completeHiragana, completeKatakana, KanaCharacter } from './completeKanaData';

export interface KanaExercise {
  id: number;
  jlptLevel: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category?: string;
  type?: 'basic' | 'dakuten' | 'handakuten' | 'yoon';
}

// Generate Hiragana Exercises - ALL CHARACTERS
export function generateHiraganaExercises(): KanaExercise[] {
  return generateKanaExercises(completeHiragana, 'hiragana');
}

// Generate Katakana Exercises - ALL CHARACTERS
export function generateKatakanaExercises(): KanaExercise[] {
  return generateKanaExercises(completeKatakana, 'katakana');
}

// Generic function to generate exercises from kana data
function generateKanaExercises(kanaChars: KanaCharacter[], kanaType: string): KanaExercise[] {
  const exercises: KanaExercise[] = [];
  
  kanaChars.forEach((item, index) => {
    // Get wrong answers from the same type to make it more challenging
    const sameTypeChars = kanaChars.filter(c => c.type === item.type && c.romaji !== item.romaji);
    const otherChars = kanaChars.filter(c => c.romaji !== item.romaji);
    
    // Prefer wrong answers from same type, fallback to any other chars
    const wrongAnswerPool = sameTypeChars.length >= 3 ? sameTypeChars : otherChars;
    
    const wrongAnswers = wrongAnswerPool
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map(c => c.romaji);
    
    const allOptions = [item.romaji, ...wrongAnswers].sort(() => Math.random() - 0.5);
    const correctIndex = allOptions.indexOf(item.romaji);
    
    // Create descriptive question based on character type
    let questionPrefix = '';
    if (item.type === 'basic') {
      questionPrefix = 'Basic character';
    } else if (item.type === 'dakuten') {
      questionPrefix = 'Dakuten (゛)';
    } else if (item.type === 'handakuten') {
      questionPrefix = 'Handakuten (゜)';
    } else if (item.type === 'yoon') {
      questionPrefix = 'Combination (Yōon)';
    }
    
    exercises.push({
      id: index + 1,
      jlptLevel: kanaType,
      question: `How do you read this ${kanaType} character: ${item.char}?`,
      options: allOptions,
      correctAnswer: correctIndex,
      explanation: `The ${kanaType} character ${item.char} is read as "${item.romaji}" (${questionPrefix})`,
      category: item.category,
      type: item.type
    });
  });
  
  return exercises;
}

// Get exercises by character type
export function getHiraganaExercisesByType(type: 'basic' | 'dakuten' | 'handakuten' | 'yoon' | 'all'): KanaExercise[] {
  const allExercises = generateHiraganaExercises();
  if (type === 'all') return allExercises;
  return allExercises.filter(ex => ex.type === type);
}

export function getKatakanaExercisesByType(type: 'basic' | 'dakuten' | 'handakuten' | 'yoon' | 'all'): KanaExercise[] {
  const allExercises = generateKatakanaExercises();
  if (type === 'all') return allExercises;
  return allExercises.filter(ex => ex.type === type);
}