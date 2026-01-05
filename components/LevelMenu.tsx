import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  ArrowLeft, 
  BookOpen, 
  Brain, 
  GraduationCap, 
  Lock, 
  CheckCircle,
  Zap,
  Target,
  Trophy,
  Flame,
  AlertCircle,
  Volume2,
  Lightbulb,
  Video,
  FileText
} from 'lucide-react';
import { getLevelProgress, canTakeExam } from '../utils/progressTypes';
import { hskLevelInfo } from '../utils/hskData';
import { jlptLevelInfo } from '../utils/japaneseData';

interface LevelMenuProps {
  level: number | string;
  language: 'chinese' | 'japanese';
  userProgress: any;
  onBack: () => void;
  onSelectActivity: (activity: 'vocabulary' | 'exercise' | 'exam' | 'study' | 'grammar' | 'videos', level: number | string) => void;
}

export function LevelMenu({ level, language, userProgress, onBack, onSelectActivity }: LevelMenuProps) {
  const levelInfo = language === 'chinese' ? hskLevelInfo : jlptLevelInfo;
  const info = levelInfo[level];
  const progress = getLevelProgress(userProgress, level);
  const canExam = canTakeExam(userProgress, level);

  // Calculate progress percentage
  const completedActivities = progress.completedActivities || 0;
  const progressPercentage = Math.round((completedActivities / 3) * 100) || 0;

  // Get level display name
  const getLevelDisplayName = () => {
    if (language === 'chinese') {
      return `HSK ${level}`;
    } else {
      if (level === 'hiragana') return 'Hiragana';
      if (level === 'katakana') return 'Katakana';
      return `JLPT ${level}`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-black dark:via-gray-900 dark:to-black p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Button 
          onClick={onBack} 
          variant="outline"
          className="mb-6 gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Button>

        {/* Level Header Card */}
        <Card className="mb-6 border-2 shadow-xl bg-gradient-to-br from-purple-600 to-pink-600 text-white border-purple-400">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <Badge className="bg-white/20 hover:bg-white/30 border-white/40 mb-3">
                  {getLevelDisplayName()}
                </Badge>
                <h1 className="text-3xl mb-2">{info.name}</h1>
                <p className="text-white/90 mb-4">
                  {language === 'chinese' 
                    ? `${info.totalWords} words • ${info.hanziCount} characters`
                    : level === 'hiragana' || level === 'katakana'
                    ? `${info.totalWords} characters`
                    : `${info.totalWords} words • ${info.kanjiCount} kanji`
                  }
                </p>
              </div>
              <div className="text-right">
                <div className="text-5xl mb-1">{progressPercentage}%</div>
                <p className="text-sm text-white/80">Complete</p>
              </div>
            </div>

            {/* Progress Bar */}
            <Progress 
              value={progressPercentage} 
              className="h-3 bg-white/20"
            />

            {/* Activity Status */}
            <div className="flex gap-2 mt-4">
              <Badge variant={progress.quizCompleted ? "secondary" : "outline"} className="border-white/40">
                {progress.quizCompleted ? '✓' : '○'} Quiz
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Activity Selection Grid */}
        <div className="mb-6">
          <h2 className="text-2xl mb-4">Choose Your Activity</h2>
          
          {/* Quick Guide Banner */}
          <div className="mb-6 bg-gradient-to-r from-purple-100 via-pink-100 to-orange-100 dark:from-purple-950/50 dark:via-pink-950/50 dark:to-orange-950/50 border-2 border-purple-300 dark:border-purple-700 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl mb-4 flex items-center gap-2">
              <Lightbulb className="w-6 h-6 text-yellow-500" />
              📚 Recommended Learning Path
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-sm">
              <div className="flex items-center gap-2 bg-white/60 dark:bg-black/40 rounded-lg px-3 py-2 border border-green-300 dark:border-green-700">
                <BookOpen className="w-4 h-4 text-green-600 flex-shrink-0" />
                <span className="truncate">1. Study</span>
              </div>
              <div className="flex items-center justify-center">
                <span className="text-gray-400">→</span>
              </div>
              <div className="flex items-center gap-2 bg-white/60 dark:bg-black/40 rounded-lg px-3 py-2 border border-purple-300 dark:border-purple-700">
                <Brain className="w-4 h-4 text-purple-600 flex-shrink-0" />
                <span className="truncate">2. Quiz 70%</span>
              </div>
              <div className="flex items-center justify-center">
                <span className="text-gray-400">→</span>
              </div>
              <div className="flex items-center gap-2 bg-white/60 dark:bg-black/40 rounded-lg px-3 py-2 border border-orange-300 dark:border-orange-700">
                <GraduationCap className="w-4 h-4 text-orange-600 flex-shrink-0" />
                <span className="truncate">3. Exam 80%</span>
              </div>
            </div>
            <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">
              💡 <strong>Tip:</strong> Complete Practice Quiz first to unlock Official Exam (30 questions, 80% to pass)
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            
            {/* Study Guide - MAIN FEATURE! */}
            <Card 
              className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-950 dark:to-teal-950 border-2 border-green-200 dark:border-green-800"
              onClick={() => onSelectActivity('study', level)}
            >
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="flex items-center gap-2">
                  Study Materials
                  <Badge variant="secondary" className="text-xs bg-green-600 text-white">Start Here!</Badge>
                </CardTitle>
                <CardDescription className="dark:text-gray-400">
                  Complete study guide with all vocabulary and grammar
                </CardDescription>
                
                <div className="pt-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Target className="w-4 h-4 text-green-500" />
                    <span>Interactive flashcards</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Volume2 className="w-4 h-4 text-blue-500" />
                    <span>Audio pronunciation</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Lightbulb className="w-4 h-4 text-yellow-500" />
                    <span>Examples & explanations</span>
                  </div>
                </div>

                <div className="pt-4">
                  <Badge className="w-full justify-center bg-green-500 hover:bg-green-600">
                    <BookOpen className="w-3 h-3 mr-1" />
                    Start Studying
                  </Badge>
                </div>
              </CardHeader>
            </Card>

            {/* Grammar Guide - NEW! */}
            <Card 
              className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border-2 border-blue-200 dark:border-blue-800"
              onClick={() => onSelectActivity('grammar', level)}
            >
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="flex items-center gap-2">
                  Grammar Guide
                  <Badge variant="secondary" className="text-xs bg-blue-600 text-white">New!</Badge>
                </CardTitle>
                <CardDescription className="dark:text-gray-400">
                  Essential grammar patterns explained simply
                </CardDescription>
                
                <div className="pt-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Target className="w-4 h-4 text-blue-500" />
                    <span>Clear explanations</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Lightbulb className="w-4 h-4 text-yellow-500" />
                    <span>Real examples</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Common mistakes</span>
                  </div>
                </div>

                <div className="pt-4">
                  <Badge className="w-full justify-center bg-blue-500 hover:bg-blue-600">
                    <FileText className="w-3 h-3 mr-1" />
                    Learn Grammar
                  </Badge>
                </div>
              </CardHeader>
            </Card>

            {/* Video Lessons - NEW! */}
            <Card 
              className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-950 dark:to-pink-950 border-2 border-red-200 dark:border-red-800"
              onClick={() => onSelectActivity('videos', level)}
            >
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                  <Video className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="flex items-center gap-2">
                  Video Lessons
                  <Badge variant="secondary" className="text-xs bg-red-600 text-white">FREE!</Badge>
                </CardTitle>
                <CardDescription className="dark:text-gray-400">
                  Curated video lessons from top teachers
                </CardDescription>
                
                <div className="pt-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Video className="w-4 h-4 text-red-500" />
                    <span>Watch & learn</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Volume2 className="w-4 h-4 text-blue-500" />
                    <span>Native pronunciation</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>100% free content</span>
                  </div>
                </div>

                <div className="pt-4">
                  <Badge className="w-full justify-center bg-red-500 hover:bg-red-600">
                    <Video className="w-3 h-3 mr-1" />
                    Watch Videos
                  </Badge>
                </div>
              </CardHeader>
            </Card>

            {/* Quiz */}
            <Card 
              className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 border-2 border-purple-200 dark:border-purple-800"
              onClick={() => onSelectActivity('exercise', level)}
            >
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="flex items-center gap-2">
                  Practice Quiz
                  {progress.quizCompleted && (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  )}
                </CardTitle>
                <CardDescription className="dark:text-gray-400">
                  Test your knowledge after studying
                </CardDescription>
                
                <div className="pt-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Target className="w-4 h-4 text-purple-500" />
                    <span>Multiple choice questions</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Zap className="w-4 h-4 text-yellow-500" />
                    <span>Review before submitting</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Trophy className="w-4 h-4 text-purple-500" />
                    <span>70% required to pass</span>
                  </div>
                </div>

                <div className="pt-4">
                  <Badge className="w-full justify-center bg-purple-500 hover:bg-purple-600">
                    <Brain className="w-3 h-3 mr-1" />
                    Start Quiz
                  </Badge>
                </div>
              </CardHeader>
            </Card>

            {/* Exam */}
            <Card 
              className={`${
                canExam 
                  ? 'cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105' 
                  : 'opacity-60 cursor-not-allowed'
              } bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950 border-2 border-orange-200 dark:border-orange-800`}
              onClick={() => canExam && onSelectActivity('exam', level)}
            >
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                  {canExam ? (
                    <GraduationCap className="w-8 h-8 text-white" />
                  ) : (
                    <Lock className="w-8 h-8 text-white" />
                  )}
                </div>
                <CardTitle className="flex items-center gap-2">
                  Official Exam
                  {progress.examPassed && (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  )}
                  {!canExam && (
                    <Lock className="w-5 h-5 text-gray-400" />
                  )}
                </CardTitle>
                <CardDescription className="dark:text-gray-400">
                  {canExam 
                    ? 'Take the official level exam' 
                    : 'Complete Quiz first to unlock'}
                </CardDescription>
                
                <div className="pt-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Target className="w-4 h-4 text-orange-500" />
                    <span>Minimum 30 questions</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Zap className="w-4 h-4 text-yellow-500" />
                    <span>Official certificate</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Trophy className="w-4 h-4 text-orange-500" />
                    <span>80% required to pass</span>
                  </div>
                </div>

                {!canExam && (
                  <div className="pt-4 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-900 rounded-lg p-3">
                    <div className="flex gap-2">
                      <AlertCircle className="w-4 h-4 text-yellow-600 dark:text-yellow-500 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-yellow-800 dark:text-yellow-400">
                        Complete the Practice Quiz first to unlock the exam
                      </p>
                    </div>
                  </div>
                )}

                <div className="pt-4">
                  <Badge className={`w-full justify-center ${
                    canExam 
                      ? 'bg-orange-500 hover:bg-orange-600' 
                      : 'bg-gray-400'
                  }`}>
                    {canExam ? (
                      <>
                        <GraduationCap className="w-3 h-3 mr-1" />
                        Take Exam
                      </>
                    ) : (
                      <>
                        <Lock className="w-3 h-3 mr-1" />
                        Locked
                      </>
                    )}
                  </Badge>
                </div>
              </CardHeader>
            </Card>
          </div>
        </div>

        {/* Progress Info Card */}
        <Card className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-black border-2 dark:border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-purple-500" />
              Your Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-purple-50 dark:bg-purple-950/30 rounded-lg p-4 border border-purple-200 dark:border-purple-900">
                <div className="flex items-center gap-2 mb-2">
                  <Brain className="w-4 h-4 text-purple-500" />
                  <span className="text-sm">Practice Quiz</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl">
                    {progress.quizCompleted ? '✓' : '○'}
                  </span>
                  <Badge variant={progress.quizCompleted ? "default" : "outline"}>
                    {progress.quizCompleted ? 'Completed' : 'Not Started'}
                  </Badge>
                </div>
              </div>

              <div className="bg-orange-50 dark:bg-orange-950/30 rounded-lg p-4 border border-orange-200 dark:border-orange-900">
                <div className="flex items-center gap-2 mb-2">
                  <GraduationCap className="w-4 h-4 text-orange-500" />
                  <span className="text-sm">Official Exam</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl">
                    {progress.examPassed ? '✓' : canExam ? '○' : '🔒'}
                  </span>
                  <Badge variant={progress.examPassed ? "default" : canExam ? "outline" : "secondary"}>
                    {progress.examPassed ? 'Passed' : canExam ? 'Available' : 'Locked'}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 rounded-lg">
              <div className="flex gap-2">
                <Lightbulb className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="text-green-900 dark:text-green-300 mb-1">
                    <strong>Recommended Learning Path:</strong>
                  </p>
                  <ol className="text-green-800 dark:text-green-400 list-decimal list-inside space-y-1">
                    <li>Study all materials thoroughly (vocabulary, grammar, examples)</li>
                    <li>Take the Practice Quiz to test your knowledge (70% to pass)</li>
                    <li>Pass the Official Exam to unlock the next level (80% to pass)</li>
                  </ol>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}