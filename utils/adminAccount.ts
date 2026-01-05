// ADMIN ACCOUNT SYSTEM FOR TESTING & BUG FINDING
// This account bypasses all level locks and can access everything!

export interface AdminCredentials {
  email: string;
  password: string;
}

// ADMIN ACCOUNT - Use this to test everything!
export const ADMIN_ACCOUNT: AdminCredentials = {
  email: 'admin@bilinguav2.com',
  password: 'Admin123!Test'
};

// Check if user is admin
export function isAdminAccount(email: string): boolean {
  return email.toLowerCase() === ADMIN_ACCOUNT.email.toLowerCase();
}

// Validate admin login
export function validateAdminLogin(email: string, password: string): boolean {
  return email.toLowerCase() === ADMIN_ACCOUNT.email.toLowerCase() && 
         password === ADMIN_ACCOUNT.password;
}

// Get admin user data (bypasses all restrictions)
export function getAdminUserData() {
  return {
    id: 'admin-user-id',
    email: ADMIN_ACCOUNT.email,
    name: 'Admin Test Account',
    isAdmin: true,
    selectedLanguage: 'chinese',
    
    // JAPANESE - ALL LEVELS UNLOCKED
    hiraganaCompleted: true,
    katakanaCompleted: true,
    hiraganaComplete: true,
    katakanaComplete: true,
    
    // Unlocked levels array for both languages
    unlockedLevels: ['hiragana', 'katakana', 'n5', 'n4', 'n3', 'n2', 'n1', 1, 2, 3, 4, 5, 6],
    
    // HSK Progress (Chinese)
    hsk1: { unlocked: true, completed: true, examPassed: true, score: 100, quizPassed: true },
    hsk2: { unlocked: true, completed: true, examPassed: true, score: 100, quizPassed: true },
    hsk3: { unlocked: true, completed: true, examPassed: true, score: 100, quizPassed: true },
    hsk4: { unlocked: true, completed: true, examPassed: true, score: 100, quizPassed: true },
    hsk5: { unlocked: true, completed: true, examPassed: true, score: 100, quizPassed: true },
    hsk6: { unlocked: true, completed: true, examPassed: true, score: 100, quizPassed: true },
    
    // JLPT Progress (Japanese)
    jlptN5: { unlocked: true, completed: true, examPassed: true, score: 100, quizPassed: true },
    jlptN4: { unlocked: true, completed: true, examPassed: true, score: 100, quizPassed: true },
    jlptN3: { unlocked: true, completed: true, examPassed: true, score: 100, quizPassed: true },
    jlptN2: { unlocked: true, completed: true, examPassed: true, score: 100, quizPassed: true },
    jlptN1: { unlocked: true, completed: true, examPassed: true, score: 100, quizPassed: true },
    
    // Level progress
    levelProgress: {
      hiragana: { unlocked: true, completed: true, score: 100 },
      katakana: { unlocked: true, completed: true, score: 100 },
      n5: { unlocked: true, completed: true, score: 100 },
      n4: { unlocked: true, completed: true, score: 100 },
      n3: { unlocked: true, completed: true, score: 100 },
      n2: { unlocked: true, completed: true, score: 100 },
      n1: { unlocked: true, completed: true, score: 100 },
      1: { unlocked: true, completed: true, score: 100 },
      2: { unlocked: true, completed: true, score: 100 },
      3: { unlocked: true, completed: true, score: 100 },
      4: { unlocked: true, completed: true, score: 100 },
      5: { unlocked: true, completed: true, score: 100 },
      6: { unlocked: true, completed: true, score: 100 }
    },
    
    // Points and stats
    points: 999999,
    totalPoints: 999999,
    achievements: ['Master', 'Expert', 'Pro', 'Advanced', 'Intermediate', 'Beginner'],
    streak: 365,
    
    // Exam scores
    examScores: {
      hiragana: 100,
      katakana: 100,
      n5: 100,
      n4: 100,
      n3: 100,
      n2: 100,
      n1: 100,
      hsk1: 100,
      hsk2: 100,
      hsk3: 100,
      hsk4: 100,
      hsk5: 100,
      hsk6: 100
    },
    
    // Current levels
    currentLevel: 1,
    currentJLPTLevel: 'n5',
    
    // Admin privileges
    canAccessAllLevels: true,
    canSeeAllFeatures: true,
    canBypassExams: true,
    isTestAccount: true
  };
}

// Display admin info for easy access
export function getAdminLoginInfo() {
  return {
    title: '🔑 ADMIN TEST ACCOUNT',
    credentials: {
      email: ADMIN_ACCOUNT.email,
      password: ADMIN_ACCOUNT.password
    },
    features: [
      '✅ All levels unlocked (N5-N1, HSK 1-6)',
      '✅ Bypass all exams and requirements',
      '✅ Access all features immediately',
      '✅ Perfect for testing and finding bugs',
      '✅ Unlimited points and achievements'
    ],
    instructions: [
      '1. Use this account to test all features',
      '2. All levels are immediately accessible',
      '3. No need to pass exams to unlock',
      '4. Report any bugs you find',
      '5. Perfect for comprehensive testing'
    ]
  };
}

// Log admin credentials to console (for easy copy-paste)
export function logAdminCredentials() {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🔑 ADMIN TEST ACCOUNT - BILINGUAV2');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`📧 Email: ${ADMIN_ACCOUNT.email}`);
  console.log(`🔒 Password: ${ADMIN_ACCOUNT.password}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('✨ Features:');
  console.log('   • All JLPT levels unlocked (N5-N1)');
  console.log('   • All HSK levels unlocked (1-6)');
  console.log('   • Bypass all exams and quizzes');
  console.log('   • Access all study materials');
  console.log('   • Perfect for testing & bug finding');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('💡 Use this account to test everything!');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
}