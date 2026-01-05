import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { 
  BookOpen, 
  MessageSquare, 
  Trophy, 
  Target, 
  Flame,
  Globe,
  LogOut,
  Lock,
  CheckCircle,
  Award,
  FileText,
  Brain,
  Pencil,
  ChevronRight,
  Headphones,
  Settings,
  Moon,
  Sun,
  Zap,
  BarChart3,
  User,
  GraduationCap,
  Languages,
  Sparkles,
  TrendingUp,
  Database,
  BookMarked,
  PenTool,
  Calendar,
  Lightbulb
} from 'lucide-react';
import { hskLevelInfo } from '../utils/hskData';
import { jlptLevelInfo } from '../utils/japaneseData';
import { getLevelProgress, canAccessLevel, canTakeExam } from '../utils/progressTypes';
import { StudyStreakTracker } from './StudyStreakTracker';
import { isCurrentUserAdmin } from '../utils/adminHelper';
import { LanguageToggle } from './LanguageToggle';
import { api } from '../utils/api';
import { motion } from 'motion/react';

interface DashboardProps {
  userName: string;
  userEmail: string;
  userProgress: any;
  selectedLanguage: 'chinese' | 'japanese';
  onSelectLevel: (level: number | string) => void;
  onNavigate: (screen: string) => void;
  onProgressUpdate: () => void;
}

export function DashboardNew({ userName, userEmail, userProgress, selectedLanguage, onSelectLevel, onNavigate, onProgressUpdate }: DashboardProps) {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('bilingua_dark_mode') === 'true';
    }
    return false;
  });
  const [isLanguageSwitching, setIsLanguageSwitching] = useState(false);

  // Check if current user is admin
  const isAdmin = isCurrentUserAdmin();

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('bilingua_dark_mode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('bilingua_dark_mode', 'false');
    }
  };

  const handleLanguageSwitch = async (newLanguage: 'chinese' | 'japanese') => {
    const uid = localStorage.getItem('bilingua_current_user');
    if (!uid) {
      console.error('❌ No user ID found');
      return;
    }

    try {
      console.log('🔄 Starting language switch to:', newLanguage);
      
      // Show loading state IMMEDIATELY
      setIsLanguageSwitching(true);

      // Wait for overlay to render
      await new Promise(resolve => setTimeout(resolve, 300));

      // Update progress with new language
      const updatedProgress = {
        ...userProgress,
        selectedLanguage: newLanguage,
      };

      console.log('💾 Saving progress to database...', updatedProgress);
      
      // Save to database and WAIT for completion
      await api.saveProgress(uid, updatedProgress);
      
      console.log('✅ Progress saved to database!');

      // Wait a bit more for DB write to propagate
      await new Promise(resolve => setTimeout(resolve, 500));

      console.log('🔍 Verifying data by reading from database...');
      
      // VERIFY: Read back from database to ensure data is saved
      const verifiedProgress = await api.getProgress(uid);
      
      console.log('📖 Verified progress from DB:', verifiedProgress);
      console.log('✅ Language in DB is:', verifiedProgress.selectedLanguage);

      if (verifiedProgress.selectedLanguage !== newLanguage) {
        throw new Error(`Database verification failed! Expected ${newLanguage} but got ${verifiedProgress.selectedLanguage}`);
      }

      console.log('🎉 Verification successful! Language switch complete.');

      // Wait for animation to finish (total ~1.5 seconds for smooth UX)
      await new Promise(resolve => setTimeout(resolve, 800));

      console.log('🔄 Triggering progress update in parent...');
      
      // Update parent state - this will trigger re-render with new language
      onProgressUpdate();
      
      // Hide loading overlay
      setIsLanguageSwitching(false);
      
      console.log('✅ Language switch completed successfully!');
    } catch (error) {
      console.error('❌ Failed to switch language:', error);
      alert(`Failed to switch language: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again.`);
      setIsLanguageSwitching(false);
    }
  };

  const levelInfo = selectedLanguage === 'chinese' ? hskLevelInfo : jlptLevelInfo;
  const currentLevel = userProgress.currentLevel || (selectedLanguage === 'chinese' ? 1 : 'hiragana');

  // Content statistics
  const contentStats = selectedLanguage === 'chinese' 
    ? { words: 5000, characters: 2217, grammar: 120, levels: 6 }
    : { words: 4000, characters: 2142, grammar: 150, levels: 5 };

  // Get available levels based on language
  const getAvailableLevels = () => {
    if (selectedLanguage === 'chinese') {
      return [1, 2, 3, 4, 5, 6];
    } else {
      return ['hiragana', 'katakana'];
    }
  };

  const getJLPTLevels = () => {
    if (selectedLanguage === 'japanese') {
      return ['N5', 'N4', 'N3', 'N2', 'N1'];
    }
    return [];
  };

  const levels = getAvailableLevels();
  const jlptLevels = getJLPTLevels();

  // Calculate overall completion
  const calculateOverallProgress = () => {
    // Safety check for userProgress
    if (!userProgress) return 0;
    
    let completed = 0;
    let total = 0;
    
    try {
      levels.forEach(level => {
        if (canAccessLevel(userProgress, level)) {
          const progress = getLevelProgress(userProgress, level);
          if (progress.vocabularyTestCompleted) completed++;
          if (progress.quizCompleted) completed++;
          if (progress.examPassed) completed++;
          total += 3;
        }
      });
      
      // Ensure we don't return NaN
      if (total === 0) return 0;
      const percentage = Math.round((completed / total) * 100);
      return isNaN(percentage) ? 0 : percentage;
    } catch (error) {
      console.error('Error calculating progress:', error);
      return 0;
    }
  };

  const overallProgress = calculateOverallProgress();

  const onSelectModule = (module: string) => {
    // Handle special navigation cases
    if (module === 'chat') {
      onNavigate('chat');
    } else if (module === 'leaderboard') {
      onNavigate('leaderboard');
    } else if (module === 'conjunction' || module === 'conjunction-menu') {
      onNavigate('conjunction-menu');
    } else if (module === 'writing-menu') {
      onNavigate('writing-menu');
    } else if (module === 'reading-menu') {
      onNavigate('reading-menu');
    } else if (module === 'listening-menu') {
      onNavigate('listening-menu');
    } else if (module === 'study-methods') {
      onNavigate('study-methods');
    } else if (module === 'settings') {
      onNavigate('settings');
    } else if (module === 'admin') {
      onNavigate('admin');
    } else if (module === 'daily-challenges') {
      onNavigate('daily-challenges');
    } else if (module === 'logout') {
      if (confirm('Are you sure you want to logout?')) {
        localStorage.clear();
        window.location.reload();
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-black dark:via-black dark:to-black">
      {/* Modern Top Navigation Bar */}
      <div className="bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b shadow-lg dark:border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3">
          {/* Top Row - Logo & User */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl">BilinguaV2</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {selectedLanguage === 'chinese' ? '🇨🇳 Chinese (HSK 1-6)' : '🇯🇵 Japanese (N5-N1)'}
                </p>
              </div>
              {/* Animated Language Toggle */}
              <div className="hidden md:block ml-4">
                <LanguageToggle 
                  currentLanguage={selectedLanguage}
                  onToggle={handleLanguageSwitch}
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Stats Badge */}
              <Badge variant="outline" className="hidden md:flex gap-1 px-3 py-1">
                <Database className="w-3 h-3" />
                <span className="text-xs">{contentStats.words.toLocaleString()} words</span>
              </Badge>
              
              {/* Admin Mode Indicator */}
              {isAdmin && (
                <Badge className="gap-1 px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-none">
                  <Sparkles className="w-3 h-3" />
                  <span className="text-xs">Admin Mode</span>
                </Badge>
              )}
              
              {/* User Info */}
              <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-gray-100 dark:bg-gray-900 rounded-lg">
                <User className="w-4 h-4 text-purple-500" />
                <span className="text-sm">{userName}</span>
              </div>

              {/* Dark Mode Toggle */}
              <Button 
                variant="outline" 
                size="icon"
                onClick={toggleDarkMode}
                title={darkMode ? "Light Mode" : "Dark Mode"}
                className="rounded-lg"
              >
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>

              {/* Logout */}
              <Button 
                variant="ghost" 
                size="icon"
                onClick={onNavigate.bind(null, 'logout')}
                className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Quick Action Buttons Row */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {/* Language Toggle for Mobile - show at start on mobile */}
            <div className="md:hidden flex-shrink-0">
              <LanguageToggle 
                currentLanguage={selectedLanguage}
                onToggle={handleLanguageSwitch}
              />
            </div>

            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onSelectModule('chat')}
              className="flex-shrink-0 gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span className="hidden sm:inline">AI Chat</span>
            </Button>

            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onSelectModule('writing-menu')}
              className="flex-shrink-0 gap-2"
            >
              <PenTool className="w-4 h-4" />
              <span className="hidden sm:inline">Writing</span>
            </Button>

            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onSelectModule('conjunction')}
              className="flex-shrink-0 gap-2"
            >
              <Languages className="w-4 h-4" />
              <span className="hidden sm:inline">Grammar</span>
            </Button>

            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onSelectModule('leaderboard')}
              className="flex-shrink-0 gap-2"
            >
              <Trophy className="w-4 h-4" />
              <span className="hidden sm:inline">Leaderboard</span>
            </Button>

            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onSelectModule('settings')}
              className="flex-shrink-0 gap-2"
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </Button>

            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onSelectModule('admin')}
              className="flex-shrink-0 gap-2 border-purple-300 dark:border-purple-700"
            >
              <Sparkles className="w-4 h-4 text-purple-500" />
              <span className="hidden sm:inline">Admin</span>
            </Button>

            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onSelectModule('daily-challenges')}
              className="flex-shrink-0 gap-2 border-orange-300 dark:border-orange-700"
            >
              <Calendar className="w-4 h-4 text-orange-500" />
              <span className="hidden sm:inline">Daily Challenges</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Welcome Banner */}
        <div className="mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 rounded-2xl p-6 text-white shadow-xl">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-3xl mb-2">Welcome back, {userName}! 👋</h2>
              <p className="text-white/90 mb-4">
                {selectedLanguage === 'chinese' 
                  ? `Learning Chinese HSK ${currentLevel} • ${contentStats.words.toLocaleString()} words available`
                  : `Learning Japanese ${currentLevel} • ${contentStats.words.toLocaleString()} words available`}
              </p>
            </div>
            <div className="hidden md:block">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                <TrendingUp className="w-12 h-12" />
              </div>
            </div>
          </div>
        </div>

        {/* Learning Progress Card - PROMINENT */}
        <Card className="mb-6 border-2 shadow-xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-black dark:border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl">Your Learning Progress</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Keep up the great work!</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-5xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {overallProgress}%
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Complete</p>
              </div>
            </div>
            
            <Progress 
              value={overallProgress} 
              className="h-4 mb-4"
            />
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 rounded-lg p-4 border border-blue-200 dark:border-blue-900">
                <div className="flex items-center gap-2 mb-2">
                  <Flame className="w-4 h-4 text-orange-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Current Streak</span>
                </div>
                <p className="text-2xl">{overallProgress > 0 ? '🔥' : '—'}</p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-lg p-4 border border-purple-200 dark:border-purple-900">
                <div className="flex items-center gap-2 mb-2">
                  <Trophy className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Total Points</span>
                </div>
                <p className="text-2xl">{userProgress.totalPoints || 0}</p>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-lg p-4 border border-green-200 dark:border-green-900 col-span-2 md:col-span-1">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Level</span>
                </div>
                <p className="text-2xl">
                  {selectedLanguage === 'chinese' ? `HSK ${currentLevel}` : currentLevel}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white border-none">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Vocabulary</p>
                  <p className="text-2xl">{contentStats.words.toLocaleString()}</p>
                </div>
                <BookOpen className="w-8 h-8 opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-pink-500 text-white border-none">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Characters</p>
                  <p className="text-2xl">{contentStats.characters.toLocaleString()}</p>
                </div>
                <FileText className="w-8 h-8 opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-emerald-500 text-white border-none">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Grammar</p>
                  <p className="text-2xl">{contentStats.grammar}</p>
                </div>
                <Brain className="w-8 h-8 opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-red-500 text-white border-none">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Levels</p>
                  <p className="text-2xl">{contentStats.levels}</p>
                </div>
                <Award className="w-8 h-8 opacity-50" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Access Grid */}
        <h3 className="text-xl mb-4">Quick Access</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card 
            className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 border-blue-200 dark:border-blue-800" 
            onClick={() => onSelectModule('chat')}
          >
            <CardHeader>
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-3 shadow-lg">
                <MessageSquare className="w-7 h-7 text-white" />
              </div>
              <CardTitle className="flex items-center gap-2">
                AI Chat Assistant
                <Badge variant="secondary" className="text-xs">Popular</Badge>
              </CardTitle>
              <CardDescription>Practice conversations with AI tutor</CardDescription>
            </CardHeader>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border-green-200 dark:border-green-800" 
            onClick={() => onSelectModule('writing-menu')}
          >
            <CardHeader>
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-3 shadow-lg">
                <Pencil className="w-7 h-7 text-white" />
              </div>
              <CardTitle>Character Writing</CardTitle>
              <CardDescription>Practice stroke order & writing</CardDescription>
            </CardHeader>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 border-purple-200 dark:border-purple-800" 
            onClick={() => onSelectModule('conjunction-menu')}
          >
            <CardHeader>
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-3 shadow-lg">
                <Languages className="w-7 h-7 text-white" />
              </div>
              <CardTitle>Grammar Patterns</CardTitle>
              <CardDescription>Master {contentStats.grammar} grammar rules</CardDescription>
            </CardHeader>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950 dark:to-orange-950 border-yellow-200 dark:border-yellow-800" 
            onClick={() => onSelectModule('leaderboard')}
          >
            <CardHeader>
              <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mb-3 shadow-lg">
                <Trophy className="w-7 h-7 text-white" />
              </div>
              <CardTitle>Leaderboard</CardTitle>
              <CardDescription>Compete with other learners</CardDescription>
            </CardHeader>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-950 dark:to-rose-950 border-red-200 dark:border-red-800" 
            onClick={() => onSelectModule('reading-menu')}
          >
            <CardHeader>
              <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-rose-500 rounded-xl flex items-center justify-center mb-3 shadow-lg">
                <BookMarked className="w-7 h-7 text-white" />
              </div>
              <CardTitle>Reading Practice</CardTitle>
              <CardDescription>Improve comprehension skills</CardDescription>
            </CardHeader>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-950 dark:to-violet-950 border-indigo-200 dark:border-indigo-800" 
            onClick={() => onSelectModule('listening-menu')}
          >
            <CardHeader>
              <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-violet-500 rounded-xl flex items-center justify-center mb-3 shadow-lg">
                <Headphones className="w-7 h-7 text-white" />
              </div>
              <CardTitle>Listening Practice</CardTitle>
              <CardDescription>Train your ear with audio</CardDescription>
            </CardHeader>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-950 dark:to-cyan-950 border-teal-200 dark:border-teal-800" 
            onClick={() => onSelectModule('study-methods')}
          >
            <CardHeader>
              <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center mb-3 shadow-lg">
                <Lightbulb className="w-7 h-7 text-white" />
              </div>
              <CardTitle className="flex items-center gap-2">
                Study Methods
                <Badge variant="secondary" className="text-xs">New!</Badge>
              </CardTitle>
              <CardDescription>Learn effective study techniques</CardDescription>
            </CardHeader>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950 dark:to-yellow-950 border-amber-200 dark:border-amber-800" 
            onClick={() => onNavigate('achievements')}
          >
            <CardHeader>
              <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-xl flex items-center justify-center mb-3 shadow-lg">
                <Award className="w-7 h-7 text-white" />
              </div>
              <CardTitle className="flex items-center gap-2">
                Achievements
                <Badge variant="secondary" className="text-xs bg-amber-500 text-white">New!</Badge>
              </CardTitle>
              <CardDescription>Track your badges and milestones</CardDescription>
            </CardHeader>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950 dark:to-green-950 border-emerald-200 dark:border-emerald-800" 
            onClick={() => onNavigate('analytics')}
          >
            <CardHeader>
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl flex items-center justify-center mb-3 shadow-lg">
                <BarChart3 className="w-7 h-7 text-white" />
              </div>
              <CardTitle className="flex items-center gap-2">
                Performance Analytics
                <Badge variant="secondary" className="text-xs bg-emerald-500 text-white">New!</Badge>
              </CardTitle>
              <CardDescription>Analyze your learning progress</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Level Progress Section */}
        <h3 className="text-xl mb-4">
          {selectedLanguage === 'chinese' ? 'HSK Levels' : 'JLPT Levels'}
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {selectedLanguage === 'chinese' ? (
            // HSK Levels 1-6
            [1, 2, 3, 4, 5, 6].map((level) => {
              const progress = getLevelProgress(userProgress, level);
              const isAccessible = canAccessLevel(userProgress, level);
              const info = levelInfo[level];

              return (
                <Card 
                  key={level}
                  className={`${
                    isAccessible 
                      ? 'cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105' 
                      : 'opacity-50 cursor-not-allowed'
                  }`}
                  onClick={() => isAccessible && onSelectLevel(level)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant={isAccessible ? "default" : "secondary"}>
                        HSK {level}
                      </Badge>
                      {progress.examPassed && (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      )}
                      {!isAccessible && (
                        <Lock className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                    <CardTitle className="text-lg">{info.name}</CardTitle>
                    <CardDescription className="text-xs">
                      {info.totalWords} words • {info.description}
                    </CardDescription>
                    {isAccessible && (
                      <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm">Progress</span>
                          <span className="text-lg bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            {Math.round(((progress.completedActivities || 0) / 3) * 100) || 0}%
                          </span>
                        </div>
                        <Progress 
                          value={((progress.completedActivities || 0) / 3) * 100 || 0} 
                          className="h-3"
                        />
                        <div className="flex gap-1 mt-2 text-xs">
                          <Badge variant={progress.vocabularyTestCompleted ? "default" : "outline"} className="text-xs py-0">
                            Vocab
                          </Badge>
                          <Badge variant={progress.quizCompleted ? "default" : "outline"} className="text-xs py-0">
                            Quiz
                          </Badge>
                          <Badge variant={progress.examPassed ? "default" : "outline"} className="text-xs py-0">
                            Exam
                          </Badge>
                        </div>
                      </div>
                    )}
                  </CardHeader>
                </Card>
              );
            })
          ) : (
            // Japanese: Hiragana, Katakana, then N5-N1
            <>
              {['hiragana', 'katakana'].map((level) => {
                const progress = getLevelProgress(userProgress, level);
                const isAccessible = canAccessLevel(userProgress, level);
                const info = levelInfo[level];

                return (
                  <Card 
                    key={level}
                    className={`${
                      isAccessible 
                        ? 'cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105' 
                        : 'opacity-50 cursor-not-allowed'
                    }`}
                    onClick={() => isAccessible && onSelectLevel(level)}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant={isAccessible ? "default" : "secondary"}>
                          {level === 'hiragana' ? 'Hiragana' : 'Katakana'}
                        </Badge>
                        {progress.examPassed && (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        )}
                        {!isAccessible && (
                          <Lock className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                      <CardTitle className="text-lg">{info.name}</CardTitle>
                      <CardDescription className="text-xs">
                        {info.totalWords} characters • {info.description}
                      </CardDescription>
                      {isAccessible && (
                        <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm">Progress</span>
                            <span className="text-lg bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                              {Math.round(((progress.completedActivities || 0) / 3) * 100) || 0}%
                            </span>
                          </div>
                          <Progress 
                            value={((progress.completedActivities || 0) / 3) * 100 || 0} 
                            className="h-3"
                          />
                          <div className="flex gap-1 mt-2 text-xs">
                            <Badge variant={progress.vocabularyTestCompleted ? "default" : "outline"} className="text-xs py-0">
                              Vocab
                            </Badge>
                            <Badge variant={progress.quizCompleted ? "default" : "outline"} className="text-xs py-0">
                              Quiz
                            </Badge>
                            <Badge variant={progress.examPassed ? "default" : "outline"} className="text-xs py-0">
                              Exam
                            </Badge>
                          </div>
                        </div>
                      )}
                    </CardHeader>
                  </Card>
                );
              })}

              {['N5', 'N4', 'N3', 'N2', 'N1'].map((level) => {
                const progress = getLevelProgress(userProgress, level);
                const isAccessible = canAccessLevel(userProgress, level);
                const info = levelInfo[level];

                return (
                  <Card 
                    key={level}
                    className={`${
                      isAccessible 
                        ? 'cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105' 
                        : 'opacity-50 cursor-not-allowed'
                    }`}
                    onClick={() => isAccessible && onSelectLevel(level)}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant={isAccessible ? "default" : "secondary"}>
                          {level}
                        </Badge>
                        {progress.examPassed && (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        )}
                        {!isAccessible && (
                          <Lock className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                      <CardTitle className="text-lg">{info.name}</CardTitle>
                      <CardDescription className="text-xs">
                        {info.totalWords} words • {info.kanjiCount} kanji
                      </CardDescription>
                      {isAccessible && (
                        <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm">Progress</span>
                            <span className="text-lg bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                              {Math.round(((progress.completedActivities || 0) / 3) * 100) || 0}%
                            </span>
                          </div>
                          <Progress 
                            value={((progress.completedActivities || 0) / 3) * 100 || 0} 
                            className="h-3"
                          />
                          <div className="flex gap-1 mt-2 text-xs">
                            <Badge variant={progress.vocabularyTestCompleted ? "default" : "outline"} className="text-xs py-0">
                              Vocab
                            </Badge>
                            <Badge variant={progress.quizCompleted ? "default" : "outline"} className="text-xs py-0">
                              Quiz
                            </Badge>
                            <Badge variant={progress.examPassed ? "default" : "outline"} className="text-xs py-0">
                              Exam
                            </Badge>
                          </div>
                        </div>
                      )}
                    </CardHeader>
                  </Card>
                );
              })}
            </>
          )}
        </div>
      </div>

      {/* Language Switching Overlay */}
      {isLanguageSwitching && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999] bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 flex items-center justify-center"
        >
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
            className="text-center text-white"
          >
            {/* Animated Logo */}
            <div className="mb-8 relative">
              <div className="w-24 h-24 mx-auto bg-white/20 rounded-3xl flex items-center justify-center backdrop-blur-xl border-2 border-white/40 shadow-2xl animate-pulse">
                <GraduationCap className="w-12 h-12 text-white" />
              </div>
              {/* Spinning border */}
              <div className="absolute inset-0 w-24 h-24 mx-auto">
                <div className="w-full h-full border-4 border-t-white border-r-white/50 border-b-white/20 border-l-white/50 rounded-3xl animate-spin" style={{ animationDuration: '1.5s' }}></div>
              </div>
            </div>

            {/* Text */}
            <h2 className="text-3xl mb-3 animate-pulse">Switching Language...</h2>
            <p className="text-white/80 text-lg mb-6">
              {selectedLanguage === 'chinese' ? '切换到日语中... 🇯🇵' : '切换到中文中... 🇨🇳'}
            </p>

            {/* Loading dots */}
            <div className="flex gap-2 justify-center">
              <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}