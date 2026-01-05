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
  Sun
} from 'lucide-react';
import { hskLevelInfo } from '../utils/hskData';
import { jlptLevelInfo } from '../utils/japaneseData';
import { getLevelProgress, canAccessLevel, canTakeExam } from '../utils/progressTypes';

interface DashboardProps {
  username: string;
  userEmail: string;
  userProgress: any;
  selectedLanguage: 'chinese' | 'japanese';
  onSelectModule: (module: string, level?: number | string) => void;
  onLogout: () => void;
}

export function Dashboard({ username, userEmail, userProgress, selectedLanguage, onSelectModule, onLogout }: DashboardProps) {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('bilingua_dark_mode') === 'true';
    }
    return false;
  });

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

  const levelInfo = selectedLanguage === 'chinese' ? hskLevelInfo : jlptLevelInfo;
  const currentLevel = userProgress.currentLevel || (selectedLanguage === 'chinese' ? 1 : 'hiragana');

  // Get available levels based on language
  const getAvailableLevels = () => {
    if (selectedLanguage === 'chinese') {
      return [1, 2, 3, 4, 5, 6];
    } else {
      // Japanese: Always show hiragana/katakana separately, then JLPT levels
      return ['hiragana', 'katakana'];
    }
  };

  // Get JLPT levels separately
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-black dark:via-black dark:to-black">
      {/* Header */}
      <div className="bg-white dark:bg-black border-b shadow-sm dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-3xl">🌍 BilinguaV2</h1>
                <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-none">
                  {selectedLanguage === 'chinese' ? 'HSK 中文' : 'JLPT 日本語'}
                </Badge>
              </div>
              <p className="text-gray-500 dark:text-gray-400">
                Welcome back, {username}! Ready to learn today? 🚀
              </p>
            </div>
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                size="icon"
                onClick={toggleDarkMode}
                title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                className="hidden sm:flex"
              >
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
              <Button variant="outline" onClick={() => onSelectModule('leaderboard')}>
                <Trophy className="w-4 h-4 mr-2" />
                Leaderboard
              </Button>
              <Button variant="outline" onClick={() => onSelectModule('languageSwitch')}>
                <Globe className="w-4 h-4 mr-2" />
                Switch Language
              </Button>
              <Button variant="outline" onClick={() => onSelectModule('settings')}>
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <Button variant="ghost" onClick={onLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Overall Progress Card */}
        <Card className="mb-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-none">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm opacity-90">Overall Progress</p>
                <p className="text-4xl">{overallProgress}%</p>
              </div>
              <div className="text-right">
                <p className="text-sm opacity-90">Current Level</p>
                <p className="text-2xl">
                  {selectedLanguage === 'chinese' ? `HSK ${currentLevel}` : currentLevel}
                </p>
              </div>
            </div>
            <Progress value={overallProgress} className="h-3 bg-white/20" />
          </CardContent>
        </Card>

        {/* Quick Access Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => onSelectModule('study')}>
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-lg flex items-center justify-center mb-3">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <CardTitle>📖 Study Materials</CardTitle>
              <CardDescription>Lessons, Videos & Grammar</CardDescription>
            </CardHeader>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => onSelectModule('videos')}>
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg flex items-center justify-center mb-3">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <CardTitle>🎥 Video Lessons</CardTitle>
              <CardDescription>Watch & Learn</CardDescription>
            </CardHeader>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => onSelectModule('grammar')}>
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-500 rounded-lg flex items-center justify-center mb-3">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <CardTitle>📝 Grammar Guide</CardTitle>
              <CardDescription>Learn grammar rules</CardDescription>
            </CardHeader>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => onSelectModule('chat')}>
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-3">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <CardTitle>💬 AI Chat</CardTitle>
              <CardDescription>Practice conversation</CardDescription>
            </CardHeader>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => onSelectModule('writing-menu')}>
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-3">
                <Pencil className="w-6 h-6 text-white" />
              </div>
              <CardTitle>✍️ Writing</CardTitle>
              <CardDescription>Practice characters</CardDescription>
            </CardHeader>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => onSelectModule('listening-menu')}>
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-lg flex items-center justify-center mb-3">
                <Headphones className="w-6 h-6 text-white" />
              </div>
              <CardTitle>🎧 Listening</CardTitle>
              <CardDescription>Practice listening</CardDescription>
            </CardHeader>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => onSelectModule('reading-menu')}>
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-green-500 rounded-lg flex items-center justify-center mb-3">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <CardTitle>📚 Reading</CardTitle>
              <CardDescription>Practice reading</CardDescription>
            </CardHeader>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => onSelectModule('conjunction-menu')}>
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-3">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <CardTitle>🔗 Conjunctions</CardTitle>
              <CardDescription>Learn connectors</CardDescription>
            </CardHeader>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => onSelectModule('daily-challenges')}>
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center mb-3">
                <Flame className="w-6 h-6 text-white" />
              </div>
              <CardTitle>🔥 Daily Challenges</CardTitle>
              <CardDescription>Earn bonus points</CardDescription>
            </CardHeader>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => onSelectModule('study-methods')}>
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-500 rounded-lg flex items-center justify-center mb-3">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <CardTitle>🎓 Study Methods</CardTitle>
              <CardDescription>Learn how to study</CardDescription>
            </CardHeader>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => onSelectModule('leaderboard')}>
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center mb-3">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <CardTitle>🏆 Leaderboard</CardTitle>
              <CardDescription>View rankings</CardDescription>
            </CardHeader>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => onSelectModule('level-menu')}>
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mb-3">
                <Target className="w-6 h-6 text-white" />
              </div>
              <CardTitle>🎯 Level Menu</CardTitle>
              <CardDescription>View all activities</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Character Learning Section (Japanese Only) */}
        {selectedLanguage === 'japanese' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl">Character Learning</h2>
              <Badge variant="secondary">
                Foundation Required
              </Badge>
            </div>

            {levels.map((level) => {
              const isAccessible = canAccessLevel(userProgress, level);
              
              return (
                <Card key={level} className={!isAccessible ? 'opacity-60' : ''}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {isAccessible ? (
                          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                            <BookOpen className="w-6 h-6 text-white" />
                          </div>
                        ) : (
                          <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                            <Lock className="w-6 h-6 text-gray-500" />
                          </div>
                        )}
                        <div>
                          <CardTitle className="capitalize">{level}</CardTitle>
                          <CardDescription>
                            Learn Japanese {level === 'hiragana' ? 'Hiragana' : 'Katakana'} characters
                          </CardDescription>
                        </div>
                      </div>
                      {(level === 'hiragana' && userProgress.hiraganaCompleted) || 
                       (level === 'katakana' && userProgress.katakanaCompleted) ? (
                        <Badge className="bg-green-500">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Complete
                        </Badge>
                      ) : (
                        <Badge variant="outline">In Progress</Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      className="w-full"
                      onClick={() => onSelectModule('vocabulary', level)}
                      disabled={!isAccessible}
                    >
                      {isAccessible ? 'Start Learning' : 'Locked'}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Main Levels Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl">
              {selectedLanguage === 'chinese' ? 'HSK Levels' : 'JLPT Levels'}
            </h2>
            <Badge variant="secondary">
              {selectedLanguage === 'chinese' 
                ? `${levels.filter(l => canAccessLevel(userProgress, l)).length} / ${levels.length} Unlocked`
                : userProgress.hiraganaCompleted && userProgress.katakanaCompleted
                ? `${jlptLevels.filter(l => canAccessLevel(userProgress, l)).length} / ${jlptLevels.length} Unlocked`
                : '🔒 Complete Hiragana & Katakana'}
            </Badge>
          </div>

          {(selectedLanguage === 'chinese' ? levels : jlptLevels).map((level) => {
            const isAccessible = canAccessLevel(userProgress, level);
            const progress = getLevelProgress(userProgress, level);
            const canExam = canTakeExam(userProgress, level);
            
            return (
              <Card key={level} className={!isAccessible ? 'opacity-60' : ''}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {isAccessible ? (
                          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-lg">
                              {selectedLanguage === 'chinese' ? level : level}
                            </span>
                          </div>
                        ) : (
                          <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                            <Lock className="w-6 h-6 text-gray-500" />
                          </div>
                        )}
                        <div>
                          <CardTitle>
                            {selectedLanguage === 'chinese' ? `HSK Level ${level}` : `JLPT ${level}`}
                          </CardTitle>
                          <CardDescription>
                            {isAccessible 
                              ? 'Complete flashcards & quiz, then pass exam to unlock next level'
                              : selectedLanguage === 'japanese' && !userProgress.hiraganaCompleted
                              ? '🔒 Complete Hiragana and Katakana first'
                              : 'Pass the previous level exam to unlock'}
                          </CardDescription>
                        </div>
                      </div>
                      {progress.examPassed && (
                        <Badge className="bg-green-500">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Completed
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  
                  {!isAccessible && selectedLanguage === 'japanese' && (
                    <CardContent>
                      <div className="text-center py-4">
                        <Lock className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500">
                          Complete Hiragana and Katakana to unlock
                        </p>
                      </div>
                    </CardContent>
                  )}
                  
                  {isAccessible && (
                    <CardContent className="space-y-3">
                      {/* Activity 1: Vocabulary Flashcards */}
                      <div className={`p-4 rounded-lg border-2 transition-all ${
                        progress.vocabularyTestCompleted
                          ? 'bg-green-50 border-green-300'
                          : 'bg-white border-gray-200 hover:border-blue-300'
                      }`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                              progress.vocabularyTestCompleted
                                ? 'bg-green-500'
                                : 'bg-blue-500'
                            }`}>
                              <BookOpen className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <p className="font-medium">📚 Vocabulary Flashcards</p>
                              <p className="text-sm text-gray-500">
                                Learn words + Take test
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {progress.vocabularyTestCompleted && (
                              <Badge variant="secondary" className="bg-green-100 text-green-800">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Done
                              </Badge>
                            )}
                            <Button
                              size="sm"
                              variant={progress.vocabularyTestCompleted ? 'outline' : 'default'}
                              onClick={() => onSelectModule('vocabulary', level)}
                            >
                              {progress.vocabularyTestCompleted ? 'Review' : 'Start'}
                              <ChevronRight className="w-4 h-4 ml-1" />
                            </Button>
                          </div>
                        </div>
                        {progress.vocabularyTestScore !== undefined && (
                          <div className="mt-2 text-sm text-gray-600">
                            Score: {progress.vocabularyTestScore} / 10
                          </div>
                        )}
                      </div>

                      {/* Activity 2: Practice Quiz */}
                      <div className={`p-4 rounded-lg border-2 transition-all ${
                        progress.quizCompleted
                          ? 'bg-green-50 border-green-300'
                          : 'bg-white border-gray-200 hover:border-blue-300'
                      }`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                              progress.quizCompleted
                                ? 'bg-green-500'
                                : 'bg-purple-500'
                            }`}>
                              <Brain className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <p className="font-medium">✏️ Practice Quiz</p>
                              <p className="text-sm text-gray-500">
                                Test your knowledge
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {progress.quizCompleted && (
                              <Badge variant="secondary" className="bg-green-100 text-green-800">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Done
                              </Badge>
                            )}
                            <Button
                              size="sm"
                              variant={progress.quizCompleted ? 'outline' : 'default'}
                              onClick={() => onSelectModule('exercise', level)}
                            >
                              {progress.quizCompleted ? 'Retry' : 'Start'}
                              <ChevronRight className="w-4 h-4 ml-1" />
                            </Button>
                          </div>
                        </div>
                        {progress.quizScore !== undefined && (
                          <div className="mt-2 text-sm text-gray-600">
                            Score: {progress.quizScore} / 10
                          </div>
                        )}
                      </div>

                      {/* Activity 3: Writing Practice */}
                      <div className="p-4 rounded-lg border-2 transition-all bg-orange-50 border-orange-300 hover:border-orange-400 cursor-pointer"
                        onClick={() => onSelectModule('writing-level', level)}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-orange-500">
                              <Pencil className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <p className="font-medium">✍️ Writing Practice</p>
                              <p className="text-sm text-gray-500">
                                Practice character writing
                              </p>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectModule('writing-level', level);
                            }}
                          >
                            Practice
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </Button>
                        </div>
                      </div>

                      {/* Activity 4: Kanji/Hanzi Practice */}
                      <div className="p-4 rounded-lg border-2 transition-all bg-pink-50 border-pink-300 hover:border-pink-400 cursor-pointer"
                        onClick={() => onSelectModule('kanji', level)}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-pink-500">
                              <BookOpen className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <p className="font-medium">{selectedLanguage === 'chinese' ? '📝 Hanzi' : '📝 Kanji'}</p>
                              <p className="text-sm text-gray-500">
                                Learn characters
                              </p>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectModule('kanji', level);
                            }}
                          >
                            Learn
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </Button>
                        </div>
                      </div>

                      {/* Activity 5: Listening Practice */}
                      <div className="p-4 rounded-lg border-2 transition-all bg-cyan-50 border-cyan-300 hover:border-cyan-400 cursor-pointer"
                        onClick={() => onSelectModule('listening', level)}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-cyan-500">
                              <Brain className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <p className="font-medium">🎧 Listening</p>
                              <p className="text-sm text-gray-500">
                                Practice listening comprehension
                              </p>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectModule('listening', level);
                            }}
                          >
                            Listen
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </Button>
                        </div>
                      </div>

                      {/* Activity 6: Reading Practice */}
                      <div className="p-4 rounded-lg border-2 transition-all bg-teal-50 border-teal-300 hover:border-teal-400 cursor-pointer"
                        onClick={() => onSelectModule('reading', level)}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-teal-500">
                              <FileText className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <p className="font-medium">📖 Reading</p>
                              <p className="text-sm text-gray-500">
                                Practice reading comprehension
                              </p>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectModule('reading', level);
                            }}
                          >
                            Read
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </Button>
                        </div>
                      </div>

                      {/* Activity 7: Conjunction Practice */}
                      <div className="p-4 rounded-lg border-2 transition-all bg-purple-50 border-purple-300 hover:border-purple-400 cursor-pointer"
                        onClick={() => onSelectModule('conjunction', level)}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-purple-500">
                              <FileText className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <p className="font-medium">🔗 Conjunctions</p>
                              <p className="text-sm text-gray-500">
                                Learn connecting words
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                              Extra
                            </Badge>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={(e) => {
                                e.stopPropagation();
                                onSelectModule('conjunction', level);
                              }}
                            >
                              Learn
                              <ChevronRight className="w-4 h-4 ml-1" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Activity 8: Official Exam */}
                      <div className={`p-4 rounded-lg border-2 transition-all ${
                        !canExam
                          ? 'bg-gray-50 border-gray-200 opacity-60'
                          : progress.examPassed
                          ? 'bg-green-50 border-green-300'
                          : 'bg-yellow-50 border-yellow-300 hover:border-yellow-400'
                      }`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                              !canExam
                                ? 'bg-gray-400'
                                : progress.examPassed
                                ? 'bg-green-500'
                                : 'bg-yellow-500'
                            }`}>
                              {!canExam ? (
                                <Lock className="w-5 h-5 text-white" />
                              ) : (
                                <Trophy className="w-5 h-5 text-white" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium">🎯 Official Exam</p>
                              <p className="text-sm text-gray-500">
                                {!canExam 
                                  ? 'Complete flashcards & quiz to unlock'
                                  : 'Pass to unlock next level (80%)'}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {!canExam && (
                              <Badge variant="secondary" className="bg-gray-100">
                                <Lock className="w-3 h-3 mr-1" />
                                Locked
                              </Badge>
                            )}
                            {canExam && progress.examPassed && (
                              <Badge variant="secondary" className="bg-green-100 text-green-800">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Passed
                              </Badge>
                            )}
                            <Button
                              size="sm"
                              variant={progress.examPassed ? 'outline' : 'default'}
                              onClick={() => onSelectModule('exam', level)}
                              disabled={!canExam}
                            >
                              {progress.examPassed ? 'Retake' : 'Start'}
                              <ChevronRight className="w-4 h-4 ml-1" />
                            </Button>
                          </div>
                        </div>
                        {progress.examScore !== undefined && (
                          <div className="mt-2 text-sm text-gray-600">
                            Score: {progress.examScore}%
                          </div>
                        )}
                      </div>
                    </CardContent>
                  )}
                </Card>
              );
            })}
        </div>
      </div>
    </div>
  );
}