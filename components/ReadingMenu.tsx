import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ArrowLeft, BookOpen, Lock } from 'lucide-react';
import { canAccessLevel } from '../utils/progressTypes';

interface ReadingMenuProps {
  language: 'chinese' | 'japanese';
  userProgress: any;
  onSelectLevel: (level: number | string) => void;
  onBack: () => void;
}

export function ReadingMenu({ language, userProgress, onSelectLevel, onBack }: ReadingMenuProps) {
  const isLevelUnlocked = (level: number | string) => {
    // Use the same logic as Dashboard - check if level is accessible
    return canAccessLevel(userProgress, level);
  };

  const getLevels = () => {
    if (language === 'chinese') {
      return [
        { level: 1, name: 'HSK 1', passages: 3, unlocked: isLevelUnlocked(1) },
        { level: 2, name: 'HSK 2', passages: 4, unlocked: isLevelUnlocked(2) },
        { level: 3, name: 'HSK 3', passages: 5, unlocked: isLevelUnlocked(3) },
        { level: 4, name: 'HSK 4', passages: 5, unlocked: isLevelUnlocked(4) },
        { level: 5, name: 'HSK 5', passages: 5, unlocked: isLevelUnlocked(5) },
        { level: 6, name: 'HSK 6', passages: 5, unlocked: isLevelUnlocked(6) },
      ];
    } else {
      return [
        { level: 'N5', name: 'JLPT N5', passages: 3, unlocked: isLevelUnlocked('N5') },
        { level: 'N4', name: 'JLPT N4', passages: 4, unlocked: isLevelUnlocked('N4') },
        { level: 'N3', name: 'JLPT N3', passages: 5, unlocked: isLevelUnlocked('N3') },
        { level: 'N2', name: 'JLPT N2', passages: 5, unlocked: isLevelUnlocked('N2') },
        { level: 'N1', name: 'JLPT N1', passages: 5, unlocked: isLevelUnlocked('N1') },
      ];
    }
  };

  const levels = getLevels();

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
            <BookOpen className="w-6 h-6 text-blue-600" />
            <h1 className="text-2xl">Reading Practice</h1>
          </div>
        </div>

        {/* Info Card */}
        <Card className="mb-6 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-950 dark:to-cyan-950">
          <CardContent className="pt-6">
            <div className="text-center">
              <h2 className="text-xl mb-2">
                {language === 'chinese' ? '阅读练习 (Yuèdú Liànxí)' : '読解練習 (Dokkai Renshū)'}
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Select a level to practice reading comprehension with passages and questions
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Level Selection */}
        <div className="space-y-4">
          {levels.map((levelInfo) => {
            const isUnlocked = levelInfo.unlocked;
            
            return (
              <Card 
                key={levelInfo.level} 
                className={`transition-all ${
                  !isUnlocked ? 'opacity-60' : 'hover:shadow-lg cursor-pointer'
                }`}
                onClick={() => isUnlocked && onSelectLevel(levelInfo.level)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {isUnlocked ? (
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                          <BookOpen className="w-6 h-6 text-white" />
                        </div>
                      ) : (
                        <div className="w-12 h-12 bg-gray-300 dark:bg-gray-700 rounded-full flex items-center justify-center">
                          <Lock className="w-6 h-6 text-gray-500" />
                        </div>
                      )}
                      <div>
                        <CardTitle>{levelInfo.name}</CardTitle>
                        <CardDescription>
                          {levelInfo.passages} reading passages
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={isUnlocked ? 'default' : 'secondary'}>
                        {isUnlocked ? 'Available' : 'Locked'}
                      </Badge>
                      {isUnlocked && (
                        <Button
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectLevel(levelInfo.level);
                          }}
                        >
                          Start Reading
                        </Button>
                      )}
                    </div>
                  </div>
                </CardHeader>
                {!isUnlocked && (
                  <CardContent>
                    <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                      {language === 'japanese' && (!userProgress.hiraganaCompleted || !userProgress.katakanaCompleted)
                        ? '🔒 Complete Hiragana and Katakana first'
                        : `🔒 Reach ${levelInfo.name} first (complete previous levels)`}
                    </p>
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
