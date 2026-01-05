import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { ArrowLeft, Trophy, Flame, Star, CheckCircle, Lock, Gift } from 'lucide-react';

interface DailyChallengesProps {
  language: 'chinese' | 'japanese';
  userProgress: any;
  onBack: () => void;
  onProgressUpdate: () => void;
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  reward: number;
  icon: string;
  completed: boolean;
  target: number;
  current: number;
}

export function DailyChallenges({ language, userProgress, onBack, onProgressUpdate }: DailyChallengesProps) {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [streak, setStreak] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [completedToday, setCompletedToday] = useState(0);

  useEffect(() => {
    loadDailyChallenges();
    loadStreak();
  }, []);

  const loadDailyChallenges = () => {
    const today = new Date().toDateString();
    const savedDate = localStorage.getItem('bilingua_challenges_date');
    const savedChallenges = localStorage.getItem('bilingua_challenges');

    if (savedDate === today && savedChallenges) {
      setChallenges(JSON.parse(savedChallenges));
    } else {
      // Generate new daily challenges
      const newChallenges = generateDailyChallenges(language);
      setChallenges(newChallenges);
      localStorage.setItem('bilingua_challenges_date', today);
      localStorage.setItem('bilingua_challenges', JSON.stringify(newChallenges));
    }
  };

  const loadStreak = () => {
    const streak = parseInt(localStorage.getItem('bilingua_streak') || '0');
    const lastVisit = localStorage.getItem('bilingua_last_visit');
    const today = new Date().toDateString();

    if (lastVisit === today) {
      setStreak(streak);
    } else {
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      if (lastVisit === yesterday) {
        // Continue streak
        setStreak(streak);
      } else {
        // Reset streak
        setStreak(0);
        localStorage.setItem('bilingua_streak', '0');
      }
    }
  };

  const generateDailyChallenges = (lang: 'chinese' | 'japanese'): Challenge[] => {
    return [
      {
        id: 'study-10',
        title: 'Study Session',
        description: 'Study 10 new words',
        reward: 50,
        icon: '📚',
        completed: false,
        target: 10,
        current: 0
      },
      {
        id: 'quiz-perfect',
        title: 'Perfect Quiz',
        description: 'Get 100% on any quiz',
        reward: 100,
        icon: '⭐',
        completed: false,
        target: 1,
        current: 0
      },
      {
        id: 'practice-30',
        title: 'Practice Master',
        description: 'Complete 30 practice questions',
        reward: 75,
        icon: '💪',
        completed: false,
        target: 30,
        current: 0
      },
      {
        id: 'video-lesson',
        title: 'Video Learner',
        description: 'Watch 2 video lessons',
        reward: 60,
        icon: '🎬',
        completed: false,
        target: 2,
        current: 0
      },
      {
        id: 'writing-practice',
        title: 'Character Writing',
        description: lang === 'chinese' ? 'Practice 15 Hanzi characters' : 'Practice 15 Kanji/Kana',
        reward: 80,
        icon: '✍️',
        completed: false,
        target: 15,
        current: 0
      },
      {
        id: 'streak-continue',
        title: 'Stay Consistent',
        description: 'Log in for 7 days straight',
        reward: 200,
        icon: '🔥',
        completed: false,
        target: 7,
        current: Math.min(streak, 7)
      }
    ];
  };

  const completeChallenge = (challengeId: string) => {
    const updated = challenges.map(c => 
      c.id === challengeId ? { ...c, completed: true, current: c.target } : c
    );
    setChallenges(updated);
    localStorage.setItem('bilingua_challenges', JSON.stringify(updated));
    
    const challenge = challenges.find(c => c.id === challengeId);
    if (challenge) {
      setTotalPoints(prev => prev + challenge.reward);
      setCompletedToday(prev => prev + 1);
    }
    
    onProgressUpdate();
  };

  const completedChallenges = challenges.filter(c => c.completed).length;
  const totalRewards = challenges.reduce((sum, c) => sum + (c.completed ? c.reward : 0), 0);
  const maxRewards = challenges.reduce((sum, c) => sum + c.reward, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-900 dark:via-purple-900 dark:to-gray-900 p-4">
      <div className="max-w-4xl mx-auto pt-8">
        {/* Header */}
        <Button onClick={onBack} variant="outline" className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        {/* Title */}
        <div className="text-center mb-8">
          <div className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 p-4 rounded-2xl mb-4">
            <Trophy className="w-16 h-16 text-white" />
          </div>
          <h1 className="text-4xl mb-3 text-gray-900 dark:text-white">Daily Challenges</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Complete challenges to earn bonus points! 🎯
          </p>
        </div>

        {/* Streak Card */}
        <Card className="mb-6 bg-gradient-to-r from-orange-500 to-red-500 text-white border-none">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-4 rounded-xl">
                  <Flame className="w-12 h-12" />
                </div>
                <div>
                  <p className="text-sm opacity-90">Current Streak</p>
                  <p className="text-4xl">{streak} Days 🔥</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm opacity-90">Keep it going!</p>
                <p className="text-2xl">+{streak * 10} Bonus</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Progress Summary */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Today's Progress</p>
                <p className="text-2xl">
                  {completedChallenges} / {challenges.length} Completed
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600 dark:text-gray-400">Points Earned</p>
                <p className="text-2xl text-green-600 dark:text-green-400">
                  +{totalRewards} / {maxRewards}
                </p>
              </div>
            </div>
            <Progress value={(completedChallenges / challenges.length) * 100} className="h-3" />
          </CardContent>
        </Card>

        {/* Challenges List */}
        <div className="space-y-4">
          {challenges.map((challenge, index) => (
            <Card 
              key={challenge.id}
              className={`transition-all hover:shadow-lg ${
                challenge.completed 
                  ? 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-300 dark:border-green-700' 
                  : 'hover:scale-[1.02]'
              }`}
            >
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  {/* Icon */}
                  <div className={`text-5xl ${challenge.completed ? 'opacity-50' : ''}`}>
                    {challenge.icon}
                  </div>

                  {/* Challenge Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-xl">{challenge.title}</h3>
                      {challenge.completed && (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      )}
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      {challenge.description}
                    </p>
                    
                    {/* Progress Bar */}
                    {!challenge.completed && (
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">
                            Progress: {challenge.current} / {challenge.target}
                          </span>
                          <span className="text-gray-600 dark:text-gray-400">
                            {Math.round((challenge.current / challenge.target) * 100)}%
                          </span>
                        </div>
                        <Progress value={(challenge.current / challenge.target) * 100} className="h-2" />
                      </div>
                    )}
                  </div>

                  {/* Reward */}
                  <div className="text-center">
                    <Badge 
                      className={`text-lg px-4 py-2 ${
                        challenge.completed 
                          ? 'bg-green-600 text-white' 
                          : 'bg-yellow-500 text-white'
                      }`}
                    >
                      <Star className="w-4 h-4 mr-1 inline" />
                      +{challenge.reward}
                    </Badge>
                    {challenge.completed && (
                      <p className="text-sm text-green-600 dark:text-green-400 mt-2">
                        ✅ Completed!
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Complete All Bonus */}
        <Card className="mt-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-none">
          <CardContent className="pt-6">
            <div className="text-center">
              <Gift className="w-16 h-16 mx-auto mb-4" />
              <h3 className="text-2xl mb-2">Complete All Challenges!</h3>
              <p className="text-lg mb-4 opacity-90">
                Finish all daily challenges to unlock a special bonus reward
              </p>
              {completedChallenges === challenges.length ? (
                <div>
                  <Badge className="bg-white text-purple-600 text-2xl px-6 py-3">
                    🎉 BONUS: +500 Points! 🎉
                  </Badge>
                  <p className="mt-2">Amazing work! Come back tomorrow for new challenges!</p>
                </div>
              ) : (
                <Badge className="bg-white/20 text-white text-xl px-6 py-3">
                  <Lock className="w-5 h-5 mr-2 inline" />
                  Complete {challenges.length - completedChallenges} more challenge{challenges.length - completedChallenges !== 1 ? 's' : ''}
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Tips */}
        <Card className="mt-6 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-blue-200 dark:border-blue-800">
          <CardContent className="pt-6">
            <h3 className="text-lg mb-3 flex items-center gap-2">
              <Star className="w-5 h-5 text-blue-500" />
              Pro Tips
            </h3>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>New challenges are generated every day at midnight</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Complete all challenges to earn a massive bonus!</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Keep your streak alive by logging in daily for extra points</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Challenge progress is automatically tracked as you study</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
