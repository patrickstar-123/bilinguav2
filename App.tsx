import { useState, useEffect } from 'react';
import { LoginPage } from './components/LoginPage';
import { DashboardNew } from './components/DashboardNew';
import { LanguageSelection } from './components/LanguageSelection';
import { LevelMenuNew } from './components/LevelMenuNew';
import { VocabularyLesson } from './components/VocabularyLesson';
import { AIChatAssistant } from './components/AIChatAssistant';
import { PracticeExercise } from './components/PracticeExercise';
import { ExamMode } from './components/ExamMode';
import { Leaderboard } from './components/Leaderboard';
import { CharacterWriting } from './components/CharacterWriting';
import { WritingMenu } from './components/WritingMenu';
import { KanjiPractice } from './components/KanjiPractice';
import { ListeningMenu } from './components/ListeningMenu';
import { ListeningPractice } from './components/ListeningPractice';
import { ReadingMenu } from './components/ReadingMenu';
import { ReadingPractice } from './components/ReadingPractice';
import { ConjunctionMenu } from './components/ConjunctionMenu';
import { ConjunctionPractice } from './components/ConjunctionPractice';
import { KanaTypeMenuNew } from './components/KanaTypeMenuNew';
import { ImprovedStudyGuideComplete } from './components/ImprovedStudyGuideComplete';
import { GrammarGuideComplete } from './components/GrammarGuideComplete';
import { VideoLessonsComplete } from './components/VideoLessonsComplete';
import { Settings } from './components/Settings';
import { DataDeletionTool } from './components/DataDeletionTool';
import { DailyChallenges } from './components/DailyChallenges';
import { StudyMethodsGuide } from './components/StudyMethodsGuide';
import { AdminPanel } from './components/AdminPanel';
import { LoadingScreen } from './components/LoadingScreen';
import { AdminSetup } from './components/AdminSetup';
import { AdminQuickSetup } from './components/AdminQuickSetup';
import { AchievementSystem } from './components/AchievementSystem';
import { PerformanceAnalytics } from './components/PerformanceAnalytics';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Toaster } from './components/ui/sonner';
import { api } from './utils/api';
import { confirmAndDelete, getDataStats } from './utils/deleteAllData';

// PWA Service Worker Registration - Makes app installable on Android!
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log('✅ PWA Ready! App can be installed on your phone.'))
      .catch(err => console.error('❌ Service Worker failed:', err));
  });
}

type Screen = 'login' | 'admin-setup' | 'languageSelect' | 'dashboard' | 'level-menu' | 'vocabulary' | 'vocabulary-test' | 'study' | 'grammar' | 'videos' | 'chat' | 'exercise' | 'exam' | 'leaderboard' | 'writing-menu' | 'writing-level' | 'conjunction-menu' | 'conjunction' | 'kanji' | 'listening-menu' | 'listening' | 'reading-menu' | 'reading' | 'settings' | 'delete-tool' | 'admin' | 'daily-challenges' | 'study-methods' | 'achievements' | 'analytics' | 'kana-type-menu';

function AppContent() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [userProgress, setUserProgress] = useState<any>(null);
  const [selectedLevel, setSelectedLevel] = useState<number | string>(1);
  const [selectedLanguage, setSelectedLanguage] = useState<'chinese' | 'japanese'>('chinese');
  const [isNewUser, setIsNewUser] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [kanaSubType, setKanaSubType] = useState<'all' | 'basic' | 'dakuten' | 'yoon'>('all');

  // Initialize dark mode on mount
  useEffect(() => {
    const darkMode = localStorage.getItem('bilingua_dark_mode') === 'true';
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Expose delete functions to window for console access
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).deleteAllData = confirmAndDelete;
      (window as any).getDataStats = getDataStats;
    }
  }, []);

  const handleLogin = async (email: string, name: string, newUser: boolean = false) => {
    const uid = localStorage.getItem('bilingua_current_user');
    if (!uid) {
      console.error('No user ID found after login');
      return;
    }
    
    // Check if admin account
    const isAdmin = localStorage.getItem('bilingua_is_admin') === 'true';
    if (isAdmin) {
      console.log('🔑 ADMIN ACCOUNT LOGGED IN - All levels unlocked!');
      const adminData = JSON.parse(localStorage.getItem('bilingua_admin_data') || '{}');
      setUserEmail(email);
      setUserName(name);
      setUserProgress(adminData);
      setSelectedLanguage(adminData.selectedLanguage || 'chinese');
      setCurrentScreen('dashboard');
      return;
    }
    
    setUserEmail(email);
    setUserName(name);
    setIsNewUser(newUser);
    
    if (newUser) {
      // New user needs to select language
      setCurrentScreen('languageSelect');
    } else {
      // Existing user - load their progress
      setIsLoading(true);
      try {
        const progress = await api.getProgress(uid);
        setUserProgress(progress);
        setSelectedLanguage(progress.selectedLanguage || 'chinese');
        setCurrentScreen('dashboard');
      } catch (error) {
        console.error('Failed to load progress:', error);
        setCurrentScreen('languageSelect');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleLanguageSelect = async (language: 'chinese' | 'japanese') => {
    setSelectedLanguage(language);
    const uid = localStorage.getItem('bilingua_current_user');
    if (!uid) return;

    const initialProgress = {
      selectedLanguage: language,
      chinese: {
        passedLevels: [],
        currentLevel: 1,
        hiraganaCompleted: false,
        katakanaCompleted: false,
        examHistory: [],
      },
      japanese: {
        passedLevels: [],
        currentLevel: 'hiragana',
        hiraganaCompleted: false,
        katakanaCompleted: false,
        examHistory: [],
      },
      totalPoints: 0,
      studyStreak: {
        current: 0,
        longest: 0,
        lastStudyDate: new Date().toISOString().split('T')[0],
      },
      quizzesTaken: 0,
      vocabularyPractices: 0,
      writingPractices: 0,
    };

    setUserProgress(initialProgress);
    await api.saveProgress(uid, initialProgress);
    setCurrentScreen('dashboard');
  };

  const handleProgressUpdate = async () => {
    const uid = localStorage.getItem('bilingua_current_user');
    if (!uid) return;

    try {
      console.log('🔄 Loading latest progress from database...');
      const progress = await api.getProgress(uid);
      console.log('📖 Progress loaded:', progress);
      console.log('🌐 Selected language from DB:', progress.selectedLanguage);
      
      setUserProgress(progress);
      
      // IMPORTANT: Update selectedLanguage state as well!
      if (progress.selectedLanguage) {
        setSelectedLanguage(progress.selectedLanguage);
        console.log('✅ Language state updated to:', progress.selectedLanguage);
      }
    } catch (error) {
      console.error('❌ Failed to load progress:', error);
    }
  };

  const handleBackToDashboard = () => {
    handleProgressUpdate();
    setCurrentScreen('dashboard');
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  // Render current screen
  if (currentScreen === 'login') {
    return <LoginPage onLogin={handleLogin} onAdminSetup={() => setCurrentScreen('admin-setup')} />;
  }

  if (currentScreen === 'admin-setup') {
    return <AdminQuickSetup onComplete={() => setCurrentScreen('login')} />;
  }

  if (currentScreen === 'languageSelect') {
    return (
      <LanguageSelection
        onSelectLanguage={handleLanguageSelect}
        userName={userName}
      />
    );
  }

  if (currentScreen === 'dashboard') {
    return (
      <DashboardNew
        userName={userName}
        userEmail={userEmail}
        userProgress={userProgress}
        selectedLanguage={selectedLanguage}
        onSelectLevel={(level) => {
          setSelectedLevel(level);
          // All levels (including Hiragana/Katakana) go to level-menu now!
          setCurrentScreen('level-menu');
        }}
        onNavigate={(screen) => setCurrentScreen(screen as Screen)}
        onProgressUpdate={handleProgressUpdate}
      />
    );
  }

  if (currentScreen === 'level-menu') {
    return (
      <LevelMenuNew
        level={selectedLevel}
        language={selectedLanguage}
        userProgress={userProgress}
        onBack={handleBackToDashboard}
        onSelectActivity={(activity, level) => {
          setSelectedLevel(level);
          
          // For Hiragana/Katakana vocabulary - go to kana-type-menu to choose All/Basic/Dakuten/Yōon
          if ((level === 'hiragana' || level === 'katakana') && activity === 'vocabulary') {
            setCurrentScreen('kana-type-menu');
            return;
          }
          
          // For Study Materials on Hiragana/Katakana, also use kana-type-menu
          if ((level === 'hiragana' || level === 'katakana') && activity === 'study') {
            setCurrentScreen('kana-type-menu');
            return;
          }
          
          // All other activities (Quiz, Exam, Videos, Grammar) work normally
          const screenMap = {
            'vocabulary': 'vocabulary',
            'exercise': 'exercise',
            'exam': 'exam',
            'study': 'study',
            'grammar': 'conjunction-menu',
            'videos': 'videos'
          };
          setCurrentScreen(screenMap[activity] as Screen);
        }}
      />
    );
  }

  if (currentScreen === 'kana-type-menu') {
    return (
      <KanaTypeMenuNew
        kanaType={selectedLevel as 'hiragana' | 'katakana'}
        userProgress={userProgress}
        onBack={() => setCurrentScreen('level-menu')}
        onSelectType={(subType) => {
          setKanaSubType(subType);
          setCurrentScreen('vocabulary');
        }}
      />
    );
  }

  if (currentScreen === 'vocabulary') {
    return (
      <VocabularyLesson
        level={selectedLevel}
        language={selectedLanguage}
        userProgress={userProgress}
        userEmail={userEmail}
        onBack={() => {
          // If hiragana/katakana, go back to kana-type-menu, otherwise level-menu
          if (selectedLevel === 'hiragana' || selectedLevel === 'katakana') {
            setCurrentScreen('kana-type-menu');
          } else {
            setCurrentScreen('level-menu');
          }
        }}
        onProgressUpdate={handleProgressUpdate}
        kanaSubType={kanaSubType}
      />
    );
  }

  if (currentScreen === 'vocabulary-test' || currentScreen === 'exercise') {
    return (
      <PracticeExercise
        level={selectedLevel}
        language={selectedLanguage}
        userProgress={userProgress}
        userEmail={userEmail}
        onBack={() => setCurrentScreen('level-menu')}
        onComplete={() => {
          handleProgressUpdate();
          setCurrentScreen('level-menu');
        }}
      />
    );
  }

  if (currentScreen === 'study') {
    return (
      <ImprovedStudyGuideComplete
        level={selectedLevel}
        language={selectedLanguage}
        onBack={() => setCurrentScreen('level-menu')}
      />
    );
  }

  if (currentScreen === 'grammar') {
    return (
      <GrammarGuideComplete
        level={selectedLevel}
        language={selectedLanguage}
        onBack={() => setCurrentScreen('level-menu')}
      />
    );
  }

  if (currentScreen === 'videos') {
    return (
      <VideoLessonsComplete
        level={selectedLevel}
        language={selectedLanguage}
        onBack={() => setCurrentScreen('level-menu')}
      />
    );
  }

  if (currentScreen === 'chat') {
    return (
      <AIChatAssistant
        level={selectedLevel}
        language={selectedLanguage}
        onBack={() => setCurrentScreen('level-menu')}
      />
    );
  }

  if (currentScreen === 'exam') {
    return (
      <ExamMode
        level={selectedLevel}
        language={selectedLanguage}
        userProgress={userProgress}
        userEmail={userEmail}
        onBack={() => setCurrentScreen('level-menu')}
        onComplete={(passed) => {
          handleProgressUpdate();
          setCurrentScreen('level-menu');
        }}
      />
    );
  }

  if (currentScreen === 'leaderboard') {
    return (
      <Leaderboard
        currentUserEmail={userEmail}
        language={selectedLanguage}
        onBack={handleBackToDashboard}
      />
    );
  }

  if (currentScreen === 'writing-menu') {
    return (
      <WritingMenu
        language={selectedLanguage}
        userProgress={userProgress}
        onBack={handleBackToDashboard}
        onSelectLevel={(level) => {
          setSelectedLevel(level);
          setCurrentScreen('writing-level');
        }}
      />
    );
  }

  if (currentScreen === 'writing-level') {
    return (
      <CharacterWriting
        level={selectedLevel}
        language={selectedLanguage}
        userProgress={userProgress}
        userEmail={userEmail}
        onBack={() => setCurrentScreen('writing-menu')}
        onProgressUpdate={handleProgressUpdate}
      />
    );
  }

  if (currentScreen === 'kanji') {
    return (
      <KanjiPractice
        level={selectedLevel}
        language={selectedLanguage}
        userProgress={userProgress}
        userEmail={userEmail}
        onBack={() => setCurrentScreen('writing-menu')}
        onProgressUpdate={handleProgressUpdate}
      />
    );
  }

  if (currentScreen === 'listening-menu') {
    return (
      <ListeningMenu
        language={selectedLanguage}
        userProgress={userProgress}
        onBack={handleBackToDashboard}
        onSelectLevel={(level) => {
          setSelectedLevel(level);
          setCurrentScreen('listening');
        }}
      />
    );
  }

  if (currentScreen === 'listening') {
    return (
      <ListeningPractice
        level={selectedLevel}
        language={selectedLanguage}
        userProgress={userProgress}
        userEmail={userEmail}
        onBack={() => setCurrentScreen('listening-menu')}
        onProgressUpdate={handleProgressUpdate}
      />
    );
  }

  if (currentScreen === 'reading-menu') {
    return (
      <ReadingMenu
        language={selectedLanguage}
        userProgress={userProgress}
        onBack={handleBackToDashboard}
        onSelectLevel={(level) => {
          setSelectedLevel(level);
          setCurrentScreen('reading');
        }}
      />
    );
  }

  if (currentScreen === 'reading') {
    return (
      <ReadingPractice
        level={selectedLevel}
        language={selectedLanguage}
        userProgress={userProgress}
        userEmail={userEmail}
        onBack={() => setCurrentScreen('reading-menu')}
        onProgressUpdate={handleProgressUpdate}
      />
    );
  }

  if (currentScreen === 'conjunction-menu') {
    return (
      <ConjunctionMenu
        language={selectedLanguage}
        userProgress={userProgress}
        onBack={handleBackToDashboard}
        onSelectLevel={(level) => {
          setSelectedLevel(level);
          setCurrentScreen('conjunction');
        }}
      />
    );
  }

  if (currentScreen === 'conjunction') {
    return (
      <ConjunctionPractice
        level={selectedLevel}
        language={selectedLanguage}
        userProgress={userProgress}
        userEmail={userEmail}
        onBack={() => setCurrentScreen('conjunction-menu')}
        onProgressUpdate={handleProgressUpdate}
      />
    );
  }

  if (currentScreen === 'settings') {
    return (
      <Settings
        onBack={handleBackToDashboard}
        onNavigate={(screen) => setCurrentScreen(screen as Screen)}
      />
    );
  }

  if (currentScreen === 'delete-tool') {
    return (
      <DataDeletionTool
        onBack={() => setCurrentScreen('settings')}
      />
    );
  }

  if (currentScreen === 'admin') {
    return (
      <AdminPanel
        onBack={handleBackToDashboard}
      />
    );
  }

  if (currentScreen === 'daily-challenges') {
    return (
      <DailyChallenges
        userProgress={userProgress}
        userEmail={userEmail}
        language={selectedLanguage}
        onBack={handleBackToDashboard}
        onProgressUpdate={handleProgressUpdate}
      />
    );
  }

  if (currentScreen === 'study-methods') {
    return (
      <StudyMethodsGuide
        onBack={handleBackToDashboard}
      />
    );
  }

  if (currentScreen === 'achievements') {
    return (
      <AchievementSystem
        userProgress={userProgress}
        onBack={handleBackToDashboard}
      />
    );
  }

  if (currentScreen === 'analytics') {
    return (
      <PerformanceAnalytics
        userProgress={userProgress}
        onBack={handleBackToDashboard}
      />
    );
  }

  return <LoginPage onLogin={handleLogin} onAdminSetup={() => setCurrentScreen('admin-setup')} />;
}

export default function App() {
  return (
    <ErrorBoundary onReset={() => window.location.href = '/'}>
      <AppContent />
      <Toaster />
    </ErrorBoundary>
  );
}