// Progress tracking types for BilinguaV2
import { isCurrentUserAdmin } from './adminHelper';

export interface LevelProgress {
  // HSK/JLPT level identifier
  level: number | string;
  
  // Three main activities
  vocabularyTestCompleted: boolean;
  quizCompleted: boolean;
  examCompleted: boolean;
  examPassed: boolean; // Must be true to unlock next level
  
  // Scores
  vocabularyTestScore?: number;
  quizScore?: number;
  examScore?: number;
  
  // Timestamps
  vocabularyTestDate?: string;
  quizDate?: string;
  examDate?: string;
}

export interface UserProgress {
  email: string;
  name: string;
  selectedLanguage: 'chinese' | 'japanese';
  currentLevel: number | string;
  
  // Progress for each level
  levelProgress: {
    [key: string]: LevelProgress;
  };
  
  // Special requirements for Japanese
  hiraganaCompleted?: boolean;
  katakanaCompleted?: boolean;
  
  lastUpdated: string;
}

export function createDefaultProgress(email: string, name: string, language: 'chinese' | 'japanese'): UserProgress {
  return {
    email,
    name,
    selectedLanguage: language,
    currentLevel: language === 'chinese' ? 1 : 'hiragana',
    levelProgress: {},
    hiraganaCompleted: false,
    katakanaCompleted: false,
    lastUpdated: new Date().toISOString(),
  };
}

export function getLevelProgress(userProgress: UserProgress, level: number | string): LevelProgress & { completedActivities?: number } {
  const key = String(level);
  
  if (!userProgress.levelProgress[key]) {
    return {
      level,
      vocabularyTestCompleted: false,
      quizCompleted: false,
      examCompleted: false,
      examPassed: false,
      completedActivities: 0,
    };
  }
  
  const progress = userProgress.levelProgress[key];
  
  // Calculate completed activities count
  let completedCount = 0;
  if (progress.vocabularyTestCompleted) completedCount++;
  if (progress.quizCompleted) completedCount++;
  if (progress.examCompleted) completedCount++;
  
  return {
    ...progress,
    completedActivities: completedCount,
  };
}

export function canTakeExam(userProgress: UserProgress, level: number | string): boolean {
  // Admin accounts can take exams without prerequisites
  if (isCurrentUserAdmin()) {
    console.log('🔑 Admin mode: Can take exam for level', level);
    return true;
  }
  
  const progress = getLevelProgress(userProgress, level);
  return progress.vocabularyTestCompleted && progress.quizCompleted;
}

export function canAccessLevel(userProgress: UserProgress, level: number | string): boolean {
  // Admin accounts have access to all levels
  if (isCurrentUserAdmin()) {
    console.log('🔑 Admin mode: Level', level, 'unlocked');
    return true;
  }
  
  const language = userProgress.selectedLanguage;
  
  // For Chinese
  if (language === 'chinese' && typeof level === 'number') {
    if (level === 1) return true; // HSK 1 always accessible
    
    // IMPORTANT: If this level has ANY activity completed, it should be accessible!
    const currentProgress = getLevelProgress(userProgress, level);
    if (currentProgress.vocabularyTestCompleted || currentProgress.quizCompleted || currentProgress.examCompleted) {
      console.log('✅ Level', level, 'is accessible (already started)');
      return true;
    }
    
    // Check if previous level exam was passed
    const prevProgress = getLevelProgress(userProgress, level - 1);
    const canAccess = prevProgress.examPassed;
    console.log('🔍 Can access level', level, '?', canAccess, '| Previous level passed:', prevProgress.examPassed);
    return canAccess;
  }
  
  // For Japanese
  if (language === 'japanese') {
    if (level === 'hiragana') return true;
    
    // IMPORTANT: If hiragana/katakana has any progress, keep it accessible
    if (level === 'katakana') {
      const kanaProgress = getLevelProgress(userProgress, 'katakana');
      if (kanaProgress.vocabularyTestCompleted || kanaProgress.quizCompleted || kanaProgress.examCompleted) {
        return true;
      }
      return userProgress.hiraganaCompleted || false;
    }
    
    // JLPT levels require both hiragana and katakana
    if (level === 'N5') {
      // If N5 already started, keep it accessible
      const n5Progress = getLevelProgress(userProgress, 'N5');
      if (n5Progress.vocabularyTestCompleted || n5Progress.quizCompleted || n5Progress.examCompleted) {
        return true;
      }
      return userProgress.hiraganaCompleted && userProgress.katakanaCompleted;
    }
    
    // Higher JLPT levels require previous level exam pass
    const levelOrder = ['N5', 'N4', 'N3', 'N2', 'N1'];
    const currentIndex = levelOrder.indexOf(String(level));
    if (currentIndex > 0) {
      // If this level already has progress, keep it accessible
      const currentProgress = getLevelProgress(userProgress, level);
      if (currentProgress.vocabularyTestCompleted || currentProgress.quizCompleted || currentProgress.examCompleted) {
        return true;
      }
      
      const prevLevel = levelOrder[currentIndex - 1];
      const prevProgress = getLevelProgress(userProgress, prevLevel);
      return prevProgress.examPassed;
    }
  }
  
  return false;
}

export function updateLevelProgress(
  userProgress: UserProgress,
  level: number | string,
  type: 'vocabularyTest' | 'quiz' | 'exam',
  score: number,
  passed?: boolean
): UserProgress {
  const key = String(level);
  const currentProgress = getLevelProgress(userProgress, level);
  
  const updatedProgress = { ...currentProgress };
  
  if (type === 'vocabularyTest') {
    updatedProgress.vocabularyTestCompleted = true;
    updatedProgress.vocabularyTestScore = score;
    updatedProgress.vocabularyTestDate = new Date().toISOString();
  } else if (type === 'quiz') {
    updatedProgress.quizCompleted = true;
    updatedProgress.quizScore = score;
    updatedProgress.quizDate = new Date().toISOString();
  } else if (type === 'exam') {
    updatedProgress.examCompleted = true;
    updatedProgress.examScore = score;
    updatedProgress.examPassed = passed || false;
    updatedProgress.examDate = new Date().toISOString();
  }
  
  return {
    ...userProgress,
    levelProgress: {
      ...userProgress.levelProgress,
      [key]: updatedProgress,
    },
    lastUpdated: new Date().toISOString(),
  };
}