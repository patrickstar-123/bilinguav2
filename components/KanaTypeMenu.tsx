import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ArrowLeft, BookOpen, Zap, Star } from 'lucide-react';

interface KanaTypeMenuProps {
  kanaType: 'hiragana' | 'katakana';
  userProgress: any;
  onBack: () => void;
  onSelectType: (subType: 'all' | 'basic' | 'dakuten' | 'yoon') => void;
}

export function KanaTypeMenu({ kanaType, userProgress, onBack, onSelectType }: KanaTypeMenuProps) {
  const isHiragana = kanaType === 'hiragana';
  
  const typeOptions = [
    {
      id: 'all' as const,
      icon: BookOpen,
      title: 'All Characters',
      description: isHiragana 
        ? 'Learn all 104 Hiragana characters (Basic + Dakuten + Yōon)'
        : 'Learn all 104 Katakana characters (Basic + Dakuten + Yōon)',
      count: 104,
      gradient: 'from-purple-500 to-pink-500',
      recommended: true
    },
    {
      id: 'basic' as const,
      icon: Star,
      title: 'Basic (Gojūon)',
      description: isHiragana
        ? 'The 46 fundamental Hiragana characters'
        : 'The 46 fundamental Katakana characters',
      count: 46,
      gradient: 'from-blue-500 to-cyan-500',
      recommended: false
    },
    {
      id: 'dakuten' as const,
      icon: Zap,
      title: 'Dakuten & Handakuten',
      description: isHiragana
        ? 'Characters with diacritical marks (゛and ゜) - 25 characters'
        : 'Characters with diacritical marks (゛and ゜) - 25 characters',
      count: 25,
      gradient: 'from-orange-500 to-red-500',
      recommended: false
    },
    {
      id: 'yoon' as const,
      icon: Star,
      title: 'Yōon (Combinations)',
      description: isHiragana
        ? 'Combination characters (きゃ, しゅ, ちょ, etc.) - 33 characters'
        : 'Combination characters (キャ, シュ, チョ, etc.) - 33 characters',
      count: 33,
      gradient: 'from-green-500 to-emerald-500',
      recommended: false
    }
  ];

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

        {/* Header */}
        <Card className="mb-6 border-2 shadow-xl bg-gradient-to-br from-purple-600 to-pink-600 text-white border-purple-400">
          <CardContent className="pt-6">
            <div className="text-center">
              <Badge className="bg-white/20 hover:bg-white/30 border-white/40 mb-3">
                {isHiragana ? 'Hiragana' : 'Katakana'}
              </Badge>
              <h1 className="text-3xl mb-2">
                {isHiragana ? 'ひらがな' : 'カタカナ'} Learning
              </h1>
              <p className="text-white/90">
                Choose which type of characters you want to study
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Type Selection Cards */}
        <div className="grid gap-4">
          {typeOptions.map((option) => {
            const Icon = option.icon;
            
            return (
              <Card 
                key={option.id}
                className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-purple-400"
                onClick={() => onSelectType(option.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${option.gradient} flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl">
                          {option.title}
                        </h3>
                        {option.recommended && (
                          <Badge className="bg-green-500 text-white border-green-600">
                            Recommended
                          </Badge>
                        )}
                        <Badge variant="outline" className="ml-auto">
                          {option.count} chars
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        {option.description}
                      </p>
                      
                      {/* Details */}
                      <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                        {option.id === 'all' && (
                          <>
                            <span>📚 Complete Coverage</span>
                            <span>⏱️ ~3-4 hours</span>
                          </>
                        )}
                        {option.id === 'basic' && (
                          <>
                            <span>⭐ Foundation</span>
                            <span>⏱️ ~1.5 hours</span>
                          </>
                        )}
                        {option.id === 'dakuten' && (
                          <>
                            <span>⚡ Diacritical Marks</span>
                            <span>⏱️ ~1 hour</span>
                          </>
                        )}
                        {option.id === 'yoon' && (
                          <>
                            <span>🎯 Combinations</span>
                            <span>⏱️ ~1 hour</span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Arrow */}
                    <div className="flex items-center">
                      <Button variant="ghost" size="sm">
                        Start →
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Info Card */}
        <Card className="mt-6 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
          <CardContent className="pt-6">
            <div className="flex gap-3">
              <div className="text-2xl">💡</div>
              <div className="flex-1 text-sm space-y-2">
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Recommended Learning Path:</strong>
                </p>
                <ol className="list-decimal list-inside space-y-1 text-gray-600 dark:text-gray-400">
                  <li>Start with <strong>Basic (Gojūon)</strong> - Master the foundation first</li>
                  <li>Progress to <strong>Dakuten & Handakuten</strong> - Add voiced sounds</li>
                  <li>Learn <strong>Yōon</strong> - Master combination sounds</li>
                  <li>Practice <strong>All Characters</strong> together - Complete mastery</li>
                </ol>
                <p className="text-gray-600 dark:text-gray-400 mt-3">
                  ⏱️ Total study time: Approximately 3-4 hours to complete all {isHiragana ? 'Hiragana' : 'Katakana'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}