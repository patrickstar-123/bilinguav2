import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Trophy, Target, TrendingUp, Award, Zap, Star } from 'lucide-react';

interface QuizStatisticsProps {
  score: number;
  totalQuestions: number;
  timeSpent?: number; // in seconds
  correctStreak?: number;
  questionsPerCategory?: Record<string, { correct: number; total: number }>;
  language: 'chinese' | 'japanese';
  level: number | string;
}

export function QuizStatistics({
  score,
  totalQuestions,
  timeSpent,
  correctStreak,
  questionsPerCategory,
  language,
  level
}: QuizStatisticsProps) {
  const percentage = Math.round((score / totalQuestions) * 100);
  const passed = percentage >= 70;
  const wrongAnswers = totalQuestions - score;
  
  // Calculate grade
  const getGrade = () => {
    if (percentage >= 95) return { grade: 'A+', color: 'text-purple-600', bgColor: 'bg-purple-50', borderColor: 'border-purple-300' };
    if (percentage >= 90) return { grade: 'A', color: 'text-blue-600', bgColor: 'bg-blue-50', borderColor: 'border-blue-300' };
    if (percentage >= 85) return { grade: 'B+', color: 'text-green-600', bgColor: 'bg-green-50', borderColor: 'border-green-300' };
    if (percentage >= 80) return { grade: 'B', color: 'text-teal-600', bgColor: 'bg-teal-50', borderColor: 'border-teal-300' };
    if (percentage >= 75) return { grade: 'C+', color: 'text-yellow-600', bgColor: 'bg-yellow-50', borderColor: 'border-yellow-300' };
    if (percentage >= 70) return { grade: 'C', color: 'text-orange-600', bgColor: 'bg-orange-50', borderColor: 'border-orange-300' };
    return { grade: 'F', color: 'text-red-600', bgColor: 'bg-red-50', borderColor: 'border-red-300' };
  };
  
  const gradeInfo = getGrade();
  
  // Calculate average time per question
  const avgTimePerQuestion = timeSpent ? Math.round(timeSpent / totalQuestions) : null;
  
  return (
    <div className="space-y-4">
      {/* Main Score Display */}
      <Card className={`${gradeInfo.bgColor} ${gradeInfo.borderColor} border-2`}>
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div className="flex justify-center items-center gap-4">
              <div className={`text-8xl ${gradeInfo.color}`}>
                {percentage}%
              </div>
              <div className={`text-6xl ${gradeInfo.color} border-4 ${gradeInfo.borderColor} rounded-lg px-6 py-2`}>
                {gradeInfo.grade}
              </div>
            </div>
            <div>
              <p className="text-2xl mb-2">
                {score} / {totalQuestions} Correct
              </p>
              <Badge variant={passed ? 'default' : 'destructive'} className="text-lg px-4 py-2">
                {passed ? '✅ Passed!' : '❌ Failed'}
              </Badge>
            </div>
            <Progress value={percentage} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Detailed Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Accuracy */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Target className="w-4 h-4" />
              Accuracy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-3xl ${gradeInfo.color}`}>
              {percentage}%
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {wrongAnswers} mistakes
            </p>
          </CardContent>
        </Card>

        {/* Performance */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl">
              {score >= totalQuestions * 0.95 ? '🔥' : 
               score >= totalQuestions * 0.85 ? '⭐' :
               score >= totalQuestions * 0.75 ? '💪' : '📚'}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {score >= totalQuestions * 0.95 ? 'Excellent!' :
               score >= totalQuestions * 0.85 ? 'Great job!' :
               score >= totalQuestions * 0.75 ? 'Good work!' :
               score >= totalQuestions * 0.70 ? 'Keep practicing!' : 'Try again!'}
            </p>
          </CardContent>
        </Card>

        {/* Time (if available) */}
        {timeSpent !== undefined && avgTimePerQuestion && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Speed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl">
                {avgTimePerQuestion}s
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                per question
              </p>
            </CardContent>
          </Card>
        )}

        {/* Streak (if available) */}
        {correctStreak !== undefined && correctStreak > 0 && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Star className="w-4 h-4" />
                Best Streak
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl">
                {correctStreak}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                in a row
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Category Breakdown (if available) */}
      {questionsPerCategory && Object.keys(questionsPerCategory).length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Award className="w-5 h-5" />
              Performance by Category
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {Object.entries(questionsPerCategory).map(([category, stats]) => {
              const categoryPercentage = Math.round((stats.correct / stats.total) * 100);
              return (
                <div key={category} className="space-y-1">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-medium">{category}</span>
                    <span className="text-gray-600 dark:text-gray-400">
                      {stats.correct}/{stats.total} ({categoryPercentage}%)
                    </span>
                  </div>
                  <Progress value={categoryPercentage} className="h-2" />
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}

      {/* Achievement Message */}
      {passed && (
        <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-300">
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <div className="text-4xl mb-2">🏆</div>
              <p className="text-lg">
                {percentage >= 95 ? 'Perfect! You\'re a master!' :
                 percentage >= 90 ? 'Outstanding performance!' :
                 percentage >= 85 ? 'Excellent work!' :
                 percentage >= 80 ? 'Great job!' :
                 percentage >= 75 ? 'Well done!' :
                 'You passed! Keep it up!'}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Level: {language === 'chinese' ? `HSK ${level}` : level}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
