import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ArrowLeft, BookOpen, Lock } from 'lucide-react';
import { canAccessLevel } from '../utils/progressTypes';

interface ConjunctionMenuProps {
  language: 'chinese' | 'japanese';
  userProgress: any;
  onSelectLevel: (level: number | string) => void;
  onBack: () => void;
}

export function ConjunctionMenu({ language, userProgress, onSelectLevel, onBack }: ConjunctionMenuProps) {
  const isLevelUnlocked = (level: number | string) => {
    // Use the same logic as Dashboard - check if level is accessible
    return canAccessLevel(userProgress, level);
  };

  const getLevels = () => {
    if (language === 'chinese') {
      return [
        { level: 1, name: 'HSK 1', conjunctions: 10, unlocked: isLevelUnlocked(1) },
        { level: 2, name: 'HSK 2', conjunctions: 15, unlocked: isLevelUnlocked(2) },
        { level: 3, name: 'HSK 3', conjunctions: 20, unlocked: isLevelUnlocked(3) },
        { level: 4, name: 'HSK 4', conjunctions: 25, unlocked: isLevelUnlocked(4) },
        { level: 5, name: 'HSK 5', conjunctions: 30, unlocked: isLevelUnlocked(5) },
        { level: 6, name: 'HSK 6', conjunctions: 35, unlocked: isLevelUnlocked(6) },
      ];
    } else {
      return [
        { level: 'N5', name: 'JLPT N5', conjunctions: 10, unlocked: isLevelUnlocked('N5') },
        { level: 'N4', name: 'JLPT N4', conjunctions: 15, unlocked: isLevelUnlocked('N4') },
        { level: 'N3', name: 'JLPT N3', conjunctions: 20, unlocked: isLevelUnlocked('N3') },
        { level: 'N2', name: 'JLPT N2', conjunctions: 25, unlocked: isLevelUnlocked('N2') },
        { level: 'N1', name: 'JLPT N1', conjunctions: 30, unlocked: isLevelUnlocked('N1') },
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
            <BookOpen className="w-6 h-6 text-purple-600" />
            <h1 className="text-2xl">Conjunction Practice</h1>
          </div>
        </div>

        {/* Info Card */}
        <Card className="mb-6 bg-gradient-to-r from-purple-100 to-pink-100">
          <CardContent className="pt-6">
            <div className="text-center">
              <h2 className="text-xl mb-2">
                {language === 'chinese' ? '连词 (Liáncí)' : '接続詞 (Setsuzokushi)'}
              </h2>
              <p className="text-gray-700">
                Select a level to learn connecting words and conjunctions
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
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-lg">
                            {language === 'chinese' ? levelInfo.level : levelInfo.level}
                          </span>
                        </div>
                      ) : (
                        <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                          <Lock className="w-6 h-6 text-gray-500" />
                        </div>
                      )}
                      <div>
                        <CardTitle>{levelInfo.name}</CardTitle>
                        <CardDescription>
                          {levelInfo.conjunctions} conjunctions to learn
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
                          Start Learning
                        </Button>
                      )}
                    </div>
                  </div>
                </CardHeader>
                {!isUnlocked && (
                  <CardContent>
                    <p className="text-sm text-gray-600 text-center">
                      {language === 'japanese' && (!userProgress.hiraganaCompleted || !userProgress.katakanaCompleted)
                        ? '🔒 Complete Hiragana and Katakana first'
                        : `🔒 Reach ${levelInfo.name} first (currently locked)`}
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