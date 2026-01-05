import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Flame, Calendar, Trophy, TrendingUp } from 'lucide-react';

interface StudyStreakTrackerProps {
  streak: number;
  totalDays: number;
  lastStudyDate?: string;
}

export function StudyStreakTracker({ streak, totalDays, lastStudyDate }: StudyStreakTrackerProps) {
  const today = new Date().toDateString();
  const studiedToday = lastStudyDate === today;

  const getStreakLevel = (streak: number) => {
    if (streak >= 365) return { title: 'Legendary', color: 'from-purple-600 to-pink-600', emoji: '👑' };
    if (streak >= 180) return { title: 'Master', color: 'from-yellow-500 to-orange-500', emoji: '🏆' };
    if (streak >= 90) return { title: 'Expert', color: 'from-blue-500 to-cyan-500', emoji: '⭐' };
    if (streak >= 30) return { title: 'Committed', color: 'from-green-500 to-emerald-500', emoji: '💪' };
    if (streak >= 7) return { title: 'Motivated', color: 'from-indigo-500 to-purple-500', emoji: '🚀' };
    return { title: 'Getting Started', color: 'from-gray-500 to-gray-600', emoji: '🌱' };
  };

  const level = getStreakLevel(streak);

  const getWeekData = () => {
    const week = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      week.push({
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        date: date.toDateString(),
        studied: i === 0 ? studiedToday : Math.random() > 0.3 // Simplified for demo
      });
    }
    return week;
  };

  const weekData = getWeekData();

  return (
    <Card className={`bg-gradient-to-r ${level.color} text-white border-none shadow-lg`}>
      <CardContent className="pt-6">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-3 rounded-xl">
                <Flame className="w-8 h-8" />
              </div>
              <div>
                <p className="text-sm opacity-90">Study Streak</p>
                <p className="text-3xl">{streak} Days {level.emoji}</p>
              </div>
            </div>
            <Badge className="bg-white/20 hover:bg-white/30 text-white border-white/30 px-4 py-2">
              {level.title}
            </Badge>
          </div>

          {/* Weekly Calendar */}
          <div>
            <p className="text-sm opacity-90 mb-2 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              This Week
            </p>
            <div className="grid grid-cols-7 gap-2">
              {weekData.map((day, index) => (
                <div key={index} className="text-center">
                  <p className="text-xs opacity-75 mb-1">{day.day}</p>
                  <div 
                    className={`h-12 rounded-lg flex items-center justify-center transition-all ${
                      day.studied 
                        ? 'bg-white/30 border-2 border-white shadow-lg' 
                        : 'bg-white/10 border-2 border-white/20'
                    }`}
                  >
                    {day.studied && <Flame className="w-5 h-5" />}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4" />
                <p className="text-sm opacity-90">Total Study Days</p>
              </div>
              <p className="text-2xl">{totalDays}</p>
            </div>
            <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-1">
                <Trophy className="w-4 h-4" />
                <p className="text-sm opacity-90">Streak Bonus</p>
              </div>
              <p className="text-2xl">+{streak * 10} pts</p>
            </div>
          </div>

          {/* Motivation */}
          {!studiedToday && (
            <div className="bg-white/20 rounded-lg p-3 text-center backdrop-blur-sm border-2 border-white/30">
              <p className="text-sm">
                💡 Study today to continue your {streak}-day streak!
              </p>
            </div>
          )}
          
          {studiedToday && (
            <div className="bg-white/20 rounded-lg p-3 text-center backdrop-blur-sm border-2 border-white/30">
              <p className="text-sm">
                ✅ Great job! You've studied today! Come back tomorrow! 🎉
              </p>
            </div>
          )}

          {/* Next Milestone */}
          {streak < 365 && (
            <div className="text-center pt-2 border-t border-white/20">
              <p className="text-xs opacity-75 mb-1">Next Milestone</p>
              <p className="text-sm">
                {streak < 7 && `7 days - Motivated 🚀 (${7 - streak} days to go!)`}
                {streak >= 7 && streak < 30 && `30 days - Committed 💪 (${30 - streak} days to go!)`}
                {streak >= 30 && streak < 90 && `90 days - Expert ⭐ (${90 - streak} days to go!)`}
                {streak >= 90 && streak < 180 && `180 days - Master 🏆 (${180 - streak} days to go!)`}
                {streak >= 180 && streak < 365 && `365 days - Legendary 👑 (${365 - streak} days to go!)`}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
