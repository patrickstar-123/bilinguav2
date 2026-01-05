// Mock user authentication and database using localStorage

export interface User {
  email: string;
  name: string;
  password: string;
  registeredAt: string;
}

export interface UserProgress {
  email: string;
  currentHSKLevel: number; // 1-6
  completedLevels: number[]; // Array of completed HSK levels
  hskProgress: {
    [key: number]: {
      vocabularyLearned: number;
      vocabularyTotal: number;
      exercisesCompleted: number;
      exercisesTotal: number;
      chatSessions: number;
      isCompleted: boolean;
    };
  };
  totalScore: number;
  streak: number;
  lastActiveDate: string;
  achievements: string[];
}

const USERS_KEY = 'bilinguav2_users';
const PROGRESS_KEY = 'bilinguav2_progress';

// Initialize with some demo accounts (kept for backward compatibility)
const DEMO_USERS: User[] = [];

export function initializeStorage() {
  if (!localStorage.getItem(USERS_KEY)) {
    localStorage.setItem(USERS_KEY, JSON.stringify(DEMO_USERS));
  }
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function getUsers(): User[] {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : DEMO_USERS;
}

export function getUserByEmail(email: string): User | null {
  const users = getUsers();
  return users.find(u => u.email.toLowerCase() === email.toLowerCase()) || null;
}

export function registerUser(email: string, name: string, password: string): { success: boolean; message: string } {
  if (!validateEmail(email)) {
    return { success: false, message: 'Invalid email format' };
  }

  if (password.length < 6) {
    return { success: false, message: 'Password must be at least 6 characters' };
  }

  const existingUser = getUserByEmail(email);
  if (existingUser) {
    return { success: false, message: 'Email already registered' };
  }

  const users = getUsers();
  const newUser: User = {
    email,
    name,
    password,
    registeredAt: new Date().toISOString(),
  };

  users.push(newUser);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));

  // Initialize progress for new user
  initializeUserProgress(email);

  return { success: true, message: 'Registration successful' };
}

export function loginUser(email: string, password: string): { success: boolean; message: string; user?: User } {
  if (!validateEmail(email)) {
    return { success: false, message: 'Invalid email format' };
  }

  const user = getUserByEmail(email);
  if (!user) {
    return { success: false, message: 'Email not registered' };
  }

  if (user.password !== password) {
    return { success: false, message: 'Incorrect password' };
  }

  return { success: true, message: 'Login successful', user };
}

export function initializeUserProgress(email: string): UserProgress {
  const hskProgress: UserProgress['hskProgress'] = {};
  
  // Initialize all 6 HSK levels
  for (let i = 1; i <= 6; i++) {
    hskProgress[i] = {
      vocabularyLearned: 0,
      vocabularyTotal: 150 * i, // HSK 1 = 150 words, HSK 2 = 300, etc.
      exercisesCompleted: 0,
      exercisesTotal: 10 * i,
      chatSessions: 0,
      isCompleted: false,
    };
  }

  const progress: UserProgress = {
    email,
    currentHSKLevel: 1,
    completedLevels: [],
    hskProgress,
    totalScore: 0,
    streak: 0,
    lastActiveDate: new Date().toISOString(),
    achievements: ['Welcome to BilinguaV2! 🎉'],
  };

  saveUserProgress(progress);
  return progress;
}

export function getUserProgress(email: string): UserProgress | null {
  const allProgress = localStorage.getItem(PROGRESS_KEY);
  const progressArray: UserProgress[] = allProgress ? JSON.parse(allProgress) : [];
  
  let userProgress = progressArray.find(p => p.email === email);
  
  if (!userProgress) {
    userProgress = initializeUserProgress(email);
  }
  
  return userProgress;
}

export function saveUserProgress(progress: UserProgress): void {
  const allProgress = localStorage.getItem(PROGRESS_KEY);
  let progressArray: UserProgress[] = allProgress ? JSON.parse(allProgress) : [];
  
  const index = progressArray.findIndex(p => p.email === progress.email);
  if (index >= 0) {
    progressArray[index] = progress;
  } else {
    progressArray.push(progress);
  }
  
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progressArray));
}

export function updateStreak(progress: UserProgress): UserProgress {
  const lastActive = new Date(progress.lastActiveDate);
  const today = new Date();
  const diffDays = Math.floor((today.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24));
  
  if (diffDays === 1) {
    progress.streak += 1;
  } else if (diffDays > 1) {
    progress.streak = 1;
  }
  
  progress.lastActiveDate = today.toISOString();
  saveUserProgress(progress);
  return progress;
}

export function canAccessHSKLevel(level: number, progress: UserProgress): boolean {
  if (level === 1) return true;
  return progress.completedLevels.includes(level - 1);
}

export function checkLevelCompletion(level: number, progress: UserProgress): boolean {
  const levelProgress = progress.hskProgress[level];
  if (!levelProgress) return false;
  
  // Require at least 80% vocabulary learned and 80% exercises completed
  const vocabPercent = (levelProgress.vocabularyLearned / levelProgress.vocabularyTotal) * 100;
  const exercisePercent = (levelProgress.exercisesCompleted / levelProgress.exercisesTotal) * 100;
  
  return vocabPercent >= 80 && exercisePercent >= 80 && levelProgress.chatSessions >= 3;
}

export function completeHSKLevel(level: number, progress: UserProgress): UserProgress {
  if (!progress.completedLevels.includes(level)) {
    progress.completedLevels.push(level);
    progress.hskProgress[level].isCompleted = true;
    progress.achievements.push(`Completed HSK ${level}! 🎉`);
    
    if (level < 6) {
      progress.currentHSKLevel = level + 1;
    }
    
    saveUserProgress(progress);
  }
  
  return progress;
}
