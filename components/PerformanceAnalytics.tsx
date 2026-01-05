import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { ArrowLeft, TrendingUp, TrendingDown, Award, Target, Brain, BookOpen, Zap } from 'lucide-react';

interface PerformanceAnalyticsProps {
  userProgress: any;
  onBack: () => void;
}

interface PerformanceMetrics {
  averageScore: number;
  totalAttempts: number;
  passRate: number;
  strongAreas: string[];
  weakAreas: string[];
  improvementTrend: 'improving' | 'stable' | 'declining';
  studyTime: number;
  consistency: number;
}

export function PerformanceAnalytics({ userProgress, onBack }: PerformanceAnalyticsProps) {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<'chinese' | 'japanese' | 'both'>('both');

  useEffect(() => {
    calculateMetrics();
  }, [userProgress, selectedLanguage]);

  const calculateMetrics = () => {
    if (!userProgress) return;

    // Get exam history
    const chineseHistory = userProgress.chinese?.examHistory || [];
    const japaneseHistory = userProgress.japanese?.examHistory || [];
    
    let allHistory = [];
    if (selectedLanguage === 'both') {
      allHistory = [...chineseHistory, ...japaneseHistory];
    } else if (selectedLanguage === 'chinese') {
      allHistory = chineseHistory;
    } else {
      allHistory = japaneseHistory;
    }

    // Calculate average score
    const scores = allHistory.map((exam: any) => exam.score || 0);
    const averageScore = scores.length > 0 
      ? Math.round(scores.reduce((a: number, b: number) => a + b, 0) / scores.length)
      : 0;

    // Calculate pass rate
    const passedExams = allHistory.filter((exam: any) => (exam.score || 0) >= 80);
    const passRate = allHistory.length > 0 
      ? Math.round((passedExams.length / allHistory.length) * 100)
      : 0;

    // Determine improvement trend
    let improvementTrend: 'improving' | 'stable' | 'declining' = 'stable';
    if (scores.length >= 3) {
      const recentScores = scores.slice(-3);
      const olderScores = scores.slice(0, -3);
      const recentAvg = recentScores.reduce((a: number, b: number) => a + b, 0) / recentScores.length;
      const olderAvg = olderScores.length > 0 
        ? olderScores.reduce((a: number, b: number) => a + b, 0) / olderScores.length
        : recentAvg;
      
      if (recentAvg > olderAvg + 5) {
        improvementTrend = 'improving';
      } else if (recentAvg < olderAvg - 5) {
        improvementTrend = 'declining';
      }
    }

    // Calculate study streak consistency
    const currentStreak = userProgress.studyStreak?.current || 0;
    const longestStreak = userProgress.studyStreak?.longest || 0;
    const consistency = longestStreak > 0 ? Math.round((currentStreak / longestStreak) * 100) : 0;

    // Analyze strong and weak areas
    const strongAreas: string[] = [];
    const weakAreas: string[] = [];

    // Check vocabulary performance
    const vocabScore = userProgress.vocabularyPractices || 0;
    if (vocabScore > 50) strongAreas.push('Vocabulary');
    else if (vocabScore < 20) weakAreas.push('Vocabulary');

    // Check exam performance
    if (averageScore >= 90) strongAreas.push('Exam Performance');
    else if (averageScore < 75) weakAreas.push('Exam Performance');

    // Check consistency
    if (currentStreak >= 7) strongAreas.push('Study Consistency');
    else if (currentStreak < 3) weakAreas.push('Study Consistency');

    // Check quiz performance
    const quizzesTaken = userProgress.quizzesTaken || 0;
    if (quizzesTaken > 30) strongAreas.push('Practice Engagement');
    else if (quizzesTaken < 10) weakAreas.push('Practice Engagement');

    setMetrics({
      averageScore,
      totalAttempts: allHistory.length,
      passRate,
      strongAreas,
      weakAreas,
      improvementTrend,
      studyTime: 0, // Placeholder
      consistency,
    });
  };

  const getRecommendations = (): string[] => {
    if (!metrics) return [];
    
    const recommendations: string[] = [];

    if (metrics.averageScore < 80) {
      recommendations.push('📚 Focus on reviewing study materials before taking exams');
      recommendations.push('🎯 Practice more quizzes to strengthen your understanding');
    }

    if (metrics.passRate < 70) {
      recommendations.push('💡 Take time to study the material thoroughly before exams');
      recommendations.push('📝 Use the study guide to understand key concepts');
    }

    if (metrics.weakAreas.includes('Study Consistency')) {
      recommendations.push('🔥 Try to study every day to build a strong learning habit');
      recommendations.push('⏰ Set a specific time each day for studying');
    }

    if (metrics.weakAreas.includes('Vocabulary')) {
      recommendations.push('📖 Spend more time on vocabulary lessons');
      recommendations.push('✍️ Practice writing characters to improve retention');
    }

    if (metrics.improvementTrend === 'declining') {
      recommendations.push('🎓 Consider reviewing previous levels to reinforce fundamentals');
      recommendations.push('💪 Take breaks when needed to avoid burnout');
    }

    if (metrics.improvementTrend === 'improving') {
      recommendations.push('⭐ Great progress! Keep up the excellent work!');
      recommendations.push('🚀 Consider challenging yourself with harder material');
    }

    if (recommendations.length === 0) {
      recommendations.push('✨ You\'re doing great! Keep maintaining your study routine');
      recommendations.push('🎯 Challenge yourself with daily challenges');
    }

    return recommendations;
  };

  if (!metrics) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-black dark:via-gray-900 dark:to-black p-4 flex items-center justify-center">
        <Card>
          <CardContent className="pt-6">
            <p>Loading analytics...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const recommendations = getRecommendations();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-black dark:via-gray-900 dark:to-black p-4">
      <div className="max-w-6xl mx-auto pt-8 pb-20">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>

        {/* Title Card */}
        <Card className="mb-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white">
          <CardContent className="pt-6">
            <h1 className="text-3xl mb-2">📊 Performance Analytics</h1>
            <p className="text-blue-100">
              Insights into your learning progress and recommendations for improvement
            </p>
          </CardContent>
        </Card>

        {/* Language Filter */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex gap-2">
              <Button
                variant={selectedLanguage === 'both' ? 'default' : 'outline'}
                onClick={() => setSelectedLanguage('both')}
              >
                Both Languages
              </Button>
              <Button
                variant={selectedLanguage === 'chinese' ? 'default' : 'outline'}
                onClick={() => setSelectedLanguage('chinese')}
              >
                🇨🇳 Chinese
              </Button>
              <Button
                variant={selectedLanguage === 'japanese' ? 'default' : 'outline'}
                onClick={() => setSelectedLanguage('japanese')}
              >
                🇯🇵 Japanese
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Key Metrics Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Average Score */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <Brain className="w-8 h-8 text-blue-500" />
                <Badge className={metrics.averageScore >= 80 ? 'bg-green-500' : 'bg-yellow-500'}>
                  {metrics.averageScore >= 90 ? 'Excellent' : 
                   metrics.averageScore >= 80 ? 'Good' : 
                   metrics.averageScore >= 70 ? 'Fair' : 'Needs Work'}
                </Badge>
              </div>
              <p className="text-3xl mb-1">{metrics.averageScore}%</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Average Score</p>
            </CardContent>
          </Card>

          {/* Pass Rate */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <Award className="w-8 h-8 text-purple-500" />
                <Badge className={metrics.passRate >= 80 ? 'bg-green-500' : 'bg-orange-500'}>
                  {metrics.passRate}%
                </Badge>
              </div>
              <p className="text-3xl mb-1">{metrics.passRate}%</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Pass Rate</p>
            </CardContent>
          </Card>

          {/* Total Attempts */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <BookOpen className="w-8 h-8 text-green-500" />
                <Badge className="bg-blue-500">
                  Total
                </Badge>
              </div>
              <p className="text-3xl mb-1">{metrics.totalAttempts}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Exams Taken</p>
            </CardContent>
          </Card>

          {/* Consistency */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <Zap className="w-8 h-8 text-yellow-500" />
                {metrics.improvementTrend === 'improving' && (
                  <TrendingUp className="w-6 h-6 text-green-500" />
                )}
                {metrics.improvementTrend === 'declining' && (
                  <TrendingDown className="w-6 h-6 text-red-500" />
                )}
                {metrics.improvementTrend === 'stable' && (
                  <Target className="w-6 h-6 text-blue-500" />
                )}
              </div>
              <p className="text-3xl mb-1">{metrics.consistency}%</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Consistency</p>
            </CardContent>
          </Card>
        </div>

        {/* Trend Analysis */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>📈 Performance Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-4">
              {metrics.improvementTrend === 'improving' && (
                <>
                  <TrendingUp className="w-12 h-12 text-green-500" />
                  <div>
                    <p className="text-xl font-bold text-green-600 dark:text-green-400">Improving!</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Your scores are getting better. Keep up the great work!
                    </p>
                  </div>
                </>
              )}
              {metrics.improvementTrend === 'stable' && (
                <>
                  <Target className="w-12 h-12 text-blue-500" />
                  <div>
                    <p className="text-xl font-bold text-blue-600 dark:text-blue-400">Stable</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Your performance is consistent. Try new study methods to improve further.
                    </p>
                  </div>
                </>
              )}
              {metrics.improvementTrend === 'declining' && (
                <>
                  <TrendingDown className="w-12 h-12 text-red-500" />
                  <div>
                    <p className="text-xl font-bold text-red-600 dark:text-red-400">Needs Attention</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Your recent scores have dropped. Review the recommendations below.
                    </p>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Strong & Weak Areas */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Strong Areas */}
          <Card>
            <CardHeader>
              <CardTitle className="text-green-600 dark:text-green-400">💪 Strong Areas</CardTitle>
            </CardHeader>
            <CardContent>
              {metrics.strongAreas.length > 0 ? (
                <ul className="space-y-2">
                  {metrics.strongAreas.map((area, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Badge className="bg-green-500">✓</Badge>
                      <span>{area}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Keep practicing to develop strong areas!
                </p>
              )}
            </CardContent>
          </Card>

          {/* Weak Areas */}
          <Card>
            <CardHeader>
              <CardTitle className="text-orange-600 dark:text-orange-400">📊 Areas for Improvement</CardTitle>
            </CardHeader>
            <CardContent>
              {metrics.weakAreas.length > 0 ? (
                <ul className="space-y-2">
                  {metrics.weakAreas.map((area, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Badge className="bg-orange-500">!</Badge>
                      <span>{area}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Great! No weak areas identified. Keep up the excellent work!
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle>💡 Personalized Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recommendations.map((recommendation, index) => (
                <div 
                  key={index}
                  className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4"
                >
                  <p className="text-sm">{recommendation}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
