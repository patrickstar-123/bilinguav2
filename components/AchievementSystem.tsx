import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Trophy, Star, Award, Zap, Target, BookOpen, Brain, Flame, ArrowLeft, Lock } from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  requirement: number;
  category: 'quiz' | 'exam' | 'streak' | 'points' | 'writing' | 'special';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlocked: boolean;
  progress: number;
  rewardPoints: number;
}

interface AchievementSystemProps {
  userProgress: any;
  onBack: () => void;
}

export function AchievementSystem({ userProgress, onBack }: AchievementSystemProps) {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  useEffect(() => {
    calculateAchievements();
  }, [userProgress]);

  const calculateAchievements = () => {
    const totalPoints = userProgress?.totalPoints || 0;
    const totalExamsPassed = (userProgress?.chinese?.passedLevels?.length || 0) + 
                            (userProgress?.japanese?.passedLevels?.length || 0);
    const totalQuizzesTaken = userProgress?.quizzesTaken || 0;
    const currentStreak = userProgress?.studyStreak?.current || 0;
    const writingPractices = userProgress?.writingPractices || 0;

    const allAchievements: Achievement[] = [
      // Points Achievements
      {
        id: 'points_1k',
        title: 'Point Collector',
        description: 'Earn 1,000 points',
        icon: '💰',
        requirement: 1000,
        category: 'points',
        rarity: 'common',
        unlocked: totalPoints >= 1000,
        progress: Math.min((totalPoints / 1000) * 100, 100),
        rewardPoints: 100,
      },
      {
        id: 'points_5k',
        title: 'Point Master',
        description: 'Earn 5,000 points',
        icon: '💎',
        requirement: 5000,
        category: 'points',
        rarity: 'rare',
        unlocked: totalPoints >= 5000,
        progress: Math.min((totalPoints / 5000) * 100, 100),
        rewardPoints: 500,
      },
      {
        id: 'points_10k',
        title: 'Point Legend',
        description: 'Earn 10,000 points',
        icon: '👑',
        requirement: 10000,
        category: 'points',
        rarity: 'epic',
        unlocked: totalPoints >= 10000,
        progress: Math.min((totalPoints / 10000) * 100, 100),
        rewardPoints: 1000,
      },
      {
        id: 'points_50k',
        title: 'Point Emperor',
        description: 'Earn 50,000 points',
        icon: '🏆',
        requirement: 50000,
        category: 'points',
        rarity: 'legendary',
        unlocked: totalPoints >= 50000,
        progress: Math.min((totalPoints / 50000) * 100, 100),
        rewardPoints: 5000,
      },

      // Exam Achievements
      {
        id: 'exam_first',
        title: 'First Victory',
        description: 'Pass your first exam',
        icon: '🎓',
        requirement: 1,
        category: 'exam',
        rarity: 'common',
        unlocked: totalExamsPassed >= 1,
        progress: Math.min((totalExamsPassed / 1) * 100, 100),
        rewardPoints: 200,
      },
      {
        id: 'exam_5',
        title: 'Exam Expert',
        description: 'Pass 5 exams',
        icon: '📚',
        requirement: 5,
        category: 'exam',
        rarity: 'rare',
        unlocked: totalExamsPassed >= 5,
        progress: Math.min((totalExamsPassed / 5) * 100, 100),
        rewardPoints: 500,
      },
      {
        id: 'exam_10',
        title: 'Exam Master',
        description: 'Pass 10 exams',
        icon: '🌟',
        requirement: 10,
        category: 'exam',
        rarity: 'epic',
        unlocked: totalExamsPassed >= 10,
        progress: Math.min((totalExamsPassed / 10) * 100, 100),
        rewardPoints: 1000,
      },
      {
        id: 'exam_perfect',
        title: 'Perfectionist',
        description: 'Score 100% on any exam',
        icon: '💯',
        requirement: 1,
        category: 'exam',
        rarity: 'legendary',
        unlocked: userProgress?.perfectExams > 0,
        progress: userProgress?.perfectExams > 0 ? 100 : 0,
        rewardPoints: 2000,
      },

      // Streak Achievements
      {
        id: 'streak_3',
        title: 'Consistent Learner',
        description: 'Maintain a 3-day study streak',
        icon: '🔥',
        requirement: 3,
        category: 'streak',
        rarity: 'common',
        unlocked: currentStreak >= 3,
        progress: Math.min((currentStreak / 3) * 100, 100),
        rewardPoints: 150,
      },
      {
        id: 'streak_7',
        title: 'Week Warrior',
        description: 'Maintain a 7-day study streak',
        icon: '⚡',
        requirement: 7,
        category: 'streak',
        rarity: 'rare',
        unlocked: currentStreak >= 7,
        progress: Math.min((currentStreak / 7) * 100, 100),
        rewardPoints: 350,
      },
      {
        id: 'streak_30',
        title: 'Monthly Master',
        description: 'Maintain a 30-day study streak',
        icon: '🌙',
        requirement: 30,
        category: 'streak',
        rarity: 'epic',
        unlocked: currentStreak >= 30,
        progress: Math.min((currentStreak / 30) * 100, 100),
        rewardPoints: 1500,
      },
      {
        id: 'streak_100',
        title: 'Century Champion',
        description: 'Maintain a 100-day study streak',
        icon: '💫',
        requirement: 100,
        category: 'streak',
        rarity: 'legendary',
        unlocked: currentStreak >= 100,
        progress: Math.min((currentStreak / 100) * 100, 100),
        rewardPoints: 5000,
      },

      // Quiz Achievements
      {
        id: 'quiz_10',
        title: 'Quiz Starter',
        description: 'Complete 10 quizzes',
        icon: '📝',
        requirement: 10,
        category: 'quiz',
        rarity: 'common',
        unlocked: totalQuizzesTaken >= 10,
        progress: Math.min((totalQuizzesTaken / 10) * 100, 100),
        rewardPoints: 100,
      },
      {
        id: 'quiz_50',
        title: 'Quiz Enthusiast',
        description: 'Complete 50 quizzes',
        icon: '✍️',
        requirement: 50,
        category: 'quiz',
        rarity: 'rare',
        unlocked: totalQuizzesTaken >= 50,
        progress: Math.min((totalQuizzesTaken / 50) * 100, 100),
        rewardPoints: 500,
      },
      {
        id: 'quiz_100',
        title: 'Quiz Champion',
        description: 'Complete 100 quizzes',
        icon: '🎯',
        requirement: 100,
        category: 'quiz',
        rarity: 'epic',
        unlocked: totalQuizzesTaken >= 100,
        progress: Math.min((totalQuizzesTaken / 100) * 100, 100),
        rewardPoints: 1000,
      },

      // Writing Achievements
      {
        id: 'writing_10',
        title: 'Calligraphy Beginner',
        description: 'Practice writing 10 characters',
        icon: '🖋️',
        requirement: 10,
        category: 'writing',
        rarity: 'common',
        unlocked: writingPractices >= 10,
        progress: Math.min((writingPractices / 10) * 100, 100),
        rewardPoints: 100,
      },
      {
        id: 'writing_50',
        title: 'Calligraphy Artist',
        description: 'Practice writing 50 characters',
        icon: '🎨',
        requirement: 50,
        category: 'writing',
        rarity: 'rare',
        unlocked: writingPractices >= 50,
        progress: Math.min((writingPractices / 50) * 100, 100),
        rewardPoints: 500,
      },

      // Special Achievements
      {
        id: 'hsk_complete',
        title: 'HSK Graduate',
        description: 'Pass all HSK levels (1-6)',
        icon: '🇨🇳',
        requirement: 6,
        category: 'special',
        rarity: 'legendary',
        unlocked: (userProgress?.chinese?.passedLevels?.length || 0) >= 6,
        progress: Math.min(((userProgress?.chinese?.passedLevels?.length || 0) / 6) * 100, 100),
        rewardPoints: 10000,
      },
      {
        id: 'jlpt_complete',
        title: 'JLPT Master',
        description: 'Pass all JLPT levels (N5-N1)',
        icon: '🇯🇵',
        requirement: 5,
        category: 'special',
        rarity: 'legendary',
        unlocked: (userProgress?.japanese?.passedLevels?.length || 0) >= 5,
        progress: Math.min(((userProgress?.japanese?.passedLevels?.length || 0) / 5) * 100, 100),
        rewardPoints: 10000,
      },
      {
        id: 'polyglot',
        title: 'Polyglot',
        description: 'Pass at least one level in both languages',
        icon: '🌏',
        requirement: 1,
        category: 'special',
        rarity: 'epic',
        unlocked: (userProgress?.chinese?.passedLevels?.length || 0) > 0 && 
                 (userProgress?.japanese?.passedLevels?.length || 0) > 0,
        progress: ((userProgress?.chinese?.passedLevels?.length || 0) > 0 && 
                  (userProgress?.japanese?.passedLevels?.length || 0) > 0) ? 100 : 0,
        rewardPoints: 2000,
      },
    ];

    setAchievements(allAchievements);
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-500';
      case 'rare': return 'bg-blue-500';
      case 'epic': return 'bg-purple-500';
      case 'legendary': return 'bg-gradient-to-r from-yellow-400 to-orange-500';
      default: return 'bg-gray-500';
    }
  };

  const getRarityTextColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-gray-600 dark:text-gray-400';
      case 'rare': return 'text-blue-600 dark:text-blue-400';
      case 'epic': return 'text-purple-600 dark:text-purple-400';
      case 'legendary': return 'text-yellow-600 dark:text-yellow-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  const filteredAchievements = achievements.filter(achievement => {
    if (filter === 'unlocked' && !achievement.unlocked) return false;
    if (filter === 'locked' && achievement.unlocked) return false;
    if (categoryFilter !== 'all' && achievement.category !== categoryFilter) return false;
    return true;
  });

  const totalUnlocked = achievements.filter(a => a.unlocked).length;
  const totalAchievements = achievements.length;
  const completionPercentage = (totalUnlocked / totalAchievements) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-black dark:via-gray-900 dark:to-black p-4">
      <div className="max-w-6xl mx-auto pt-8 pb-20">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>

        {/* Stats Card */}
        <Card className="mb-6 bg-gradient-to-r from-purple-500 to-blue-500 text-white">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-3xl mb-2">🏆 Achievements</h2>
                <p className="text-purple-100">
                  {totalUnlocked} of {totalAchievements} unlocked
                </p>
              </div>
              <div className="text-right">
                <div className="text-4xl">{Math.round(completionPercentage)}%</div>
                <div className="text-sm text-purple-100">Complete</div>
              </div>
            </div>
            <Progress value={completionPercentage} className="h-3 bg-purple-300" />
          </CardContent>
        </Card>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Status Filter */}
              <div className="flex gap-2">
                <Button
                  variant={filter === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter('all')}
                >
                  All
                </Button>
                <Button
                  variant={filter === 'unlocked' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter('unlocked')}
                >
                  Unlocked ({totalUnlocked})
                </Button>
                <Button
                  variant={filter === 'locked' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter('locked')}
                >
                  Locked ({totalAchievements - totalUnlocked})
                </Button>
              </div>

              {/* Category Filter */}
              <div className="flex gap-2 flex-wrap">
                <Button
                  variant={categoryFilter === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCategoryFilter('all')}
                >
                  All Categories
                </Button>
                <Button
                  variant={categoryFilter === 'points' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCategoryFilter('points')}
                >
                  💰 Points
                </Button>
                <Button
                  variant={categoryFilter === 'exam' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCategoryFilter('exam')}
                >
                  🎓 Exams
                </Button>
                <Button
                  variant={categoryFilter === 'quiz' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCategoryFilter('quiz')}
                >
                  📝 Quizzes
                </Button>
                <Button
                  variant={categoryFilter === 'streak' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCategoryFilter('streak')}
                >
                  🔥 Streaks
                </Button>
                <Button
                  variant={categoryFilter === 'writing' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCategoryFilter('writing')}
                >
                  🖋️ Writing
                </Button>
                <Button
                  variant={categoryFilter === 'special' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCategoryFilter('special')}
                >
                  ⭐ Special
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Achievements Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAchievements.map(achievement => (
            <Card
              key={achievement.id}
              className={`relative overflow-hidden transition-all ${
                achievement.unlocked
                  ? 'bg-gradient-to-br from-white to-yellow-50 dark:from-gray-800 dark:to-gray-700 border-2 border-yellow-400 dark:border-yellow-600'
                  : 'opacity-60 hover:opacity-80'
              }`}
            >
              {/* Rarity Badge */}
              <div className={`absolute top-2 right-2 ${getRarityColor(achievement.rarity)} text-white text-xs px-2 py-1 rounded-full uppercase font-bold`}>
                {achievement.rarity}
              </div>

              <CardContent className="pt-6">
                <div className="text-center mb-4">
                  <div className="text-6xl mb-3 filter">
                    {achievement.unlocked ? achievement.icon : '🔒'}
                  </div>
                  <h3 className="font-bold text-lg mb-1">{achievement.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {achievement.description}
                  </p>
                  <Badge className={getRarityColor(achievement.rarity)}>
                    +{achievement.rewardPoints} points
                  </Badge>
                </div>

                {/* Progress Bar */}
                {!achievement.unlocked && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
                      <span>Progress</span>
                      <span>{Math.round(achievement.progress)}%</span>
                    </div>
                    <Progress value={achievement.progress} className="h-2" />
                  </div>
                )}

                {achievement.unlocked && (
                  <div className="text-center">
                    <Badge className="bg-green-500">
                      ✓ Unlocked
                    </Badge>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredAchievements.length === 0 && (
          <Card>
            <CardContent className="pt-6 text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">
                No achievements found with the current filters.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
