import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Trophy, Target, Book, Zap, Calendar, Award, TrendingUp, CheckCircle } from 'lucide-react';

interface LevelProgress {
  level: number | string;
  quizScore?: number;
  examScore?: number;
  completed?: boolean;
  unlocked: boolean;
  vocabulary?: number;
  grammar?: number;
}

interface ProgressTrackerProps {
  language: 'chinese' | 'japanese';
  userProgress: any;
  currentLevel?: number | string;
}

export function ProgressTracker({ language, userProgress, currentLevel }: ProgressTrackerProps) {
  // Extract progress data
  const getLevelData = (): LevelProgress[] => {
    if (language === 'chinese') {
      return [1, 2, 3, 4, 5, 6].map(level => ({
        level,
        quizScore: userProgress?.[`hsk${level}`]?.quizScore || 0,
        examScore: userProgress?.[`hsk${level}`]?.examScore || 0,
        completed: userProgress?.[`hsk${level}`]?.completed || false,
        unlocked: userProgress?.[`hsk${level}`]?.unlocked || level === 1,
        vocabulary: userProgress?.[`hsk${level}`]?.vocabulary || 0,
        grammar: userProgress?.[`hsk${level}`]?.grammar || 0
      }));
    } else {
      const levels = ['N5', 'N4', 'N3', 'N2', 'N1'];
      const hiraganaCompleted = userProgress?.hiraganaCompleted || false;
      const katakanaCompleted = userProgress?.katakanaCompleted || false;
      
      return levels.map((level, index) => ({
        level,
        quizScore: userProgress?.[`jlpt${level}`]?.quizScore || 0,
        examScore: userProgress?.[`jlpt${level}`]?.examScore || 0,
        completed: userProgress?.[`jlpt${level}`]?.completed || false,
        unlocked: userProgress?.[`jlpt${level}`]?.unlocked || (index === 0 && hiraganaCompleted && katakanaCompleted),
        vocabulary: userProgress?.[`jlpt${level}`]?.vocabulary || 0,
        grammar: userProgress?.[`jlpt${level}`]?.grammar || 0
      }));
    }
  };

  const levelData = getLevelData();
  const totalPoints = userProgress?.totalPoints || 0;
  const completedLevels = levelData.filter(l => l.completed).length;
  const totalLevels = levelData.length;
  const overallProgress = Math.round((completedLevels / totalLevels) * 100);

  // Calculate study streak
  const studyStreak = userProgress?.studyStreak || 0;
  
  // Calculate total activities completed
  const totalActivities = levelData.reduce((sum, level) => {
    return sum + (level.quizScore > 0 ? 1 : 0) + (level.examScore > 0 ? 1 : 0);
  }, 0);

  return (
    <div className="space-y-4">
      {/* Overall Progress Card */}
      <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Your Learning Journey
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Total Points */}
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
              <div className="text-2xl">{totalPoints}</div>
              <p className="text-xs text-gray-600 dark:text-gray-400">Points</p>
            </div>

            {/* Completed Levels */}
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <div className="text-2xl">{completedLevels}/{totalLevels}</div>
              <p className="text-xs text-gray-600 dark:text-gray-400">Levels</p>
            </div>

            {/* Activities */}
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <Book className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div className="text-2xl">{totalActivities}</div>
              <p className="text-xs text-gray-600 dark:text-gray-400">Activities</p>
            </div>

            {/* Study Streak */}
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                  <Zap className="w-6 h-6 text-orange-600" />
                </div>
              </div>
              <div className="text-2xl">{studyStreak}</div>
              <p className="text-xs text-gray-600 dark:text-gray-400">Day Streak</p>
            </div>
          </div>

          {/* Overall Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Overall Progress</span>
              <span className="font-semibold">{overallProgress}%</span>
            </div>
            <Progress value={overallProgress} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Level Progress Cards */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            {language === 'chinese' ? 'HSK' : 'JLPT'} Level Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {levelData.map((level) => {
            const isCurrentLevel = level.level === currentLevel;
            const maxScore = 100;
            const bestScore = Math.max(level.quizScore || 0, level.examScore || 0);
            const scorePercentage = Math.round((bestScore / maxScore) * 100);
            
            return (
              <div
                key={level.level}
                className={`p-4 rounded-lg border-2 ${
                  isCurrentLevel
                    ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-300'
                    : level.completed
                    ? 'bg-green-50 dark:bg-green-900/20 border-green-300'
                    : level.unlocked
                    ? 'bg-gray-50 dark:bg-gray-800 border-gray-300'
                    : 'bg-gray-100 dark:bg-gray-900 border-gray-400 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">
                      {language === 'chinese' ? `HSK ${level.level}` : level.level}
                    </span>
                    {level.completed && (
                      <Badge className="bg-green-600">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Completed
                      </Badge>
                    )}
                    {isCurrentLevel && (
                      <Badge className="bg-blue-600">Current</Badge>
                    )}
                    {!level.unlocked && (
                      <Badge variant="secondary">Locked</Badge>
                    )}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Best: {bestScore}%
                  </div>
                </div>

                {level.unlocked && (
                  <>
                    <Progress value={scorePercentage} className="h-2 mb-2" />
                    <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 dark:text-gray-400">
                      <div>Quiz: {level.quizScore || 0}%</div>
                      <div>Exam: {level.examScore || 0}%</div>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Japanese Kana Progress (if applicable) */}
      {language === 'japanese' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              Kana Mastery
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className={`p-3 rounded-lg ${userProgress?.hiraganaCompleted ? 'bg-green-100 dark:bg-green-900/30' : 'bg-gray-100 dark:bg-gray-800'}`}>
              <div className="flex items-center justify-between">
                <span>Hiragana (ひらがな)</span>
                {userProgress?.hiraganaCompleted ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <Badge variant="secondary">In Progress</Badge>
                )}
              </div>
            </div>
            
            <div className={`p-3 rounded-lg ${userProgress?.katakanaCompleted ? 'bg-green-100 dark:bg-green-900/30' : 'bg-gray-100 dark:bg-gray-800'}`}>
              <div className="flex items-center justify-between">
                <span>Katakana (カタカナ)</span>
                {userProgress?.katakanaCompleted ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <Badge variant="secondary">In Progress</Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
