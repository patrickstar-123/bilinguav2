import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ArrowLeft, Trophy, Target, BookOpen, Brain } from 'lucide-react';
import { api } from '../utils/api';

interface LeaderboardProps {
  userEmail: string;
  onBack: () => void;
}

export function Leaderboard({ userEmail, onBack }: LeaderboardProps) {
  const [activeTab, setActiveTab] = useState<'total' | 'exam' | 'quiz' | 'flashcard'>('total');
  const [languageTab, setLanguageTab] = useState<'all' | 'chinese' | 'japanese'>('all');
  const [userRank, setUserRank] = useState<number>(0);
  const [userPoints, setUserPoints] = useState<any>({ totalPoints: 0, examPoints: 0, quizPoints: 0, flashcardPoints: 0 });
  const [leaderboardData, setLeaderboardData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [userEmail, activeTab, languageTab]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      
      // Get user ID
      const userId = localStorage.getItem('bilingua_current_user');
      if (!userId) return;
      
      // Load user points
      const points = await api.getPoints(userId);
      setUserPoints(points);
      
      // Load leaderboard
      const data = await api.getLeaderboard(languageTab);
      
      // Sort by active tab
      const sortKey = activeTab === 'total' ? 'totalPoints' : `${activeTab}Points`;
      const sorted = [...data].sort((a: any, b: any) => (b[sortKey] || 0) - (a[sortKey] || 0));
      
      setLeaderboardData(sorted.slice(0, 100));
      
      // Calculate rank
      const rank = sorted.findIndex((p: any) => p.email === userEmail) + 1;
      setUserRank(rank);
      
    } catch (error) {
      console.error('Failed to load leaderboard:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getPointsForTab = (points: any) => {
    switch (activeTab) {
      case 'exam':
        return points.examPoints;
      case 'quiz':
        return points.quizPoints;
      case 'flashcard':
        return points.flashcardPoints;
      default:
        return points.totalPoints;
    }
  };

  const getMedalEmoji = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  };

  const getPointsForDisplay = (entry: any) => {
    switch (activeTab) {
      case 'exam':
        return entry.examPoints || 0;
      case 'quiz':
        return entry.quizPoints || 0;
      case 'flashcard':
        return entry.flashcardPoints || 0;
      default:
        return entry.totalPoints || 0;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-black dark:via-black dark:to-black p-4">
      <div className="max-w-4xl mx-auto pt-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <div className="flex items-center gap-2">
            <Trophy className="w-6 h-6 text-yellow-500" />
            <h1 className="text-2xl">Global Leaderboard</h1>
          </div>
        </div>

        {/* Language Filter */}
        <Card className="mb-4">
          <CardContent className="pt-6 pb-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm">Filter by Language:</span>
            </div>
            <div className="flex gap-2">
              <Button
                variant={languageTab === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setLanguageTab('all')}
                className="flex-1"
              >
                🌍 All
              </Button>
              <Button
                variant={languageTab === 'chinese' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setLanguageTab('chinese')}
                className="flex-1"
              >
                🇨🇳 Chinese
              </Button>
              <Button
                variant={languageTab === 'japanese' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setLanguageTab('japanese')}
                className="flex-1"
              >
                🇯🇵 Japanese
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* User Stats Card */}
        <Card className="mb-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-none">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90 mb-1">Your Rank</p>
                <p className="text-4xl">{userRank > 0 ? getMedalEmoji(userRank) : '—'}</p>
              </div>
              <div className="text-right">
                <p className="text-sm opacity-90 mb-1">Your Points</p>
                <div className="space-y-1">
                  {activeTab === 'total' && (
                    <p className="text-3xl">{userPoints.totalPoints}</p>
                  )}
                  {activeTab === 'exam' && (
                    <p className="text-3xl">{userPoints.examPoints}</p>
                  )}
                  {activeTab === 'quiz' && (
                    <p className="text-3xl">{userPoints.quizPoints}</p>
                  )}
                  {activeTab === 'flashcard' && (
                    <p className="text-3xl">{userPoints.flashcardPoints}</p>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Leaderboard Tabs */}
        <Card>
          <CardHeader>
            <CardTitle>Rankings</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
              <TabsList className="grid w-full grid-cols-4 mb-6">
                <TabsTrigger value="total" className="flex items-center gap-2">
                  <Trophy className="w-4 h-4" />
                  <span className="hidden sm:inline">Overall</span>
                </TabsTrigger>
                <TabsTrigger value="exam" className="flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  <span className="hidden sm:inline">Exams</span>
                </TabsTrigger>
                <TabsTrigger value="quiz" className="flex items-center gap-2">
                  <Brain className="w-4 h-4" />
                  <span className="hidden sm:inline">Quizzes</span>
                </TabsTrigger>
                <TabsTrigger value="flashcard" className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  <span className="hidden sm:inline">Flashcards</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="space-y-3">
                {leaderboardData.length === 0 ? (
                  <div className="text-center py-12">
                    <Trophy className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500">No data yet. Be the first to earn points!</p>
                  </div>
                ) : (
                  leaderboardData.map((entry, index) => {
                    const isCurrentUser = entry.email === userEmail;
                    const rank = index + 1;
                    const points = getPointsForTab(entry);

                    return (
                      <div
                        key={entry.email}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          isCurrentUser
                            ? 'bg-blue-50 border-blue-500'
                            : rank <= 3
                            ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-300'
                            : 'bg-white border-gray-200'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            {/* Rank */}
                            <div className={`text-2xl min-w-[60px] text-center ${
                              rank <= 3 ? '' : 'text-gray-600'
                            }`}>
                              {getMedalEmoji(rank)}
                            </div>

                            {/* User info */}
                            <div>
                              <p className="font-medium flex items-center gap-2">
                                {entry.email.split('@')[0]}
                                {isCurrentUser && (
                                  <Badge variant="secondary">You</Badge>
                                )}
                              </p>
                              <p className="text-sm text-gray-500">
                                {activeTab === 'total' && `Total: ${entry.totalPoints} pts`}
                                {activeTab === 'exam' && `Exam: ${entry.examPoints} pts`}
                                {activeTab === 'quiz' && `Quiz: ${entry.quizPoints} pts`}
                                {activeTab === 'flashcard' && `Flashcard: ${entry.flashcardPoints} pts`}
                              </p>
                            </div>
                          </div>

                          {/* Points */}
                          <div className="text-right">
                            <p className="text-2xl">{points}</p>
                            <p className="text-xs text-gray-500">points</p>
                          </div>
                        </div>

                        {/* Additional stats for top 3 */}
                        {rank <= 3 && (
                          <div className="mt-3 pt-3 border-t border-gray-200 grid grid-cols-3 gap-2 text-center text-xs">
                            <div>
                              <p className="text-gray-500">Exam</p>
                              <p className="font-medium">{entry.examPoints}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Quiz</p>
                              <p className="font-medium">{entry.quizPoints}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Flashcard</p>
                              <p className="font-medium">{entry.flashcardPoints}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Info section */}
        <Card className="mt-6 bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="space-y-2 text-sm">
              <p className="font-medium text-blue-900">How to earn points:</p>
              <ul className="space-y-1 text-blue-800 ml-4">
                <li>• Vocabulary Test: 10 points per correct answer</li>
                <li>• Practice Quiz: 10 points per correct answer</li>
                <li>• Official Exam: 10 points per correct + 50 bonus for passing</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
