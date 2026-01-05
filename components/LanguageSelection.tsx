import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { BookOpen, Globe } from 'lucide-react';

interface LanguageSelectionProps {
  onSelectLanguage: (language: 'chinese' | 'japanese') => void;
}

export function LanguageSelection({ onSelectLanguage }: LanguageSelectionProps) {
  const [selected, setSelected] = useState<'chinese' | 'japanese' | null>(null);

  const handleConfirm = () => {
    if (selected) {
      onSelectLanguage(selected);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-black dark:via-purple-900/20 dark:to-black p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-pink-500/5 rounded-full blur-3xl animate-glow"></div>
      </div>

      <div className="max-w-4xl w-full relative z-10 animate-fade-in-scale">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4 animate-bounce-in">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 rounded-xl flex items-center justify-center shadow-lg hover-lift animate-glow">
              <Globe className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl gradient-text dark:text-white">BilinguaV2</h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 animate-slide-in-left">Choose Your Learning Path ✨</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 animate-slide-in-right">Select the language you want to master</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Chinese Option */}
          <Card 
            className={`cursor-pointer transition-all premium-card hover-lift card-hover-glow animate-slide-in-left ${
              selected === 'chinese' 
                ? 'border-4 border-blue-500 shadow-xl dark:shadow-blue-500/30 scale-105 animate-glow' 
                : 'hover:shadow-lg border-2 dark:border-blue-500/20'
            }`}
            onClick={() => setSelected('chinese')}
          >
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <div className="text-6xl emoji-bounce">🇨🇳</div>
                {selected === 'chinese' && (
                  <Badge className="bg-blue-500 animate-bounce-in shadow-lg">✓ Selected</Badge>
                )}
              </div>
              <CardTitle className="text-2xl bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">Chinese (Mandarin)</CardTitle>
              <CardDescription className="dark:text-gray-300">HSK 1 - HSK 6 | 1200+ Words</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm dark:text-gray-200">📚 <strong>What you'll learn:</strong></p>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 ml-4">
                  <li>• Simplified Chinese characters (汉字)</li>
                  <li>• Pinyin pronunciation system</li>
                  <li>• HSK 1-6 progressive curriculum</li>
                  <li>• 1200+ vocabulary words</li>
                  <li>• 120 grammar patterns</li>
                  <li>• Reading, writing, and conversation</li>
                </ul>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 border border-blue-200 dark:border-blue-500/30">
                <p className="text-sm dark:text-gray-200"><strong>Path:</strong> HSK 1 → HSK 2 → HSK 3 → HSK 4 → HSK 5 → HSK 6</p>
              </div>

              <div className="flex gap-2 flex-wrap">
                <Badge variant="outline" className="dark:border-blue-500/50 dark:text-blue-400">Characters</Badge>
                <Badge variant="outline" className="dark:border-blue-500/50 dark:text-blue-400">Pinyin</Badge>
                <Badge variant="outline" className="dark:border-blue-500/50 dark:text-blue-400">Tones</Badge>
                <Badge variant="outline" className="dark:border-blue-500/50 dark:text-blue-400">Grammar</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Japanese Option */}
          <Card 
            className={`cursor-pointer transition-all premium-card hover-lift card-hover-glow animate-slide-in-right ${
              selected === 'japanese' 
                ? 'border-4 border-purple-500 shadow-xl dark:shadow-purple-500/30 scale-105 animate-glow' 
                : 'hover:shadow-lg border-2 dark:border-purple-500/20'
            }`}
            onClick={() => setSelected('japanese')}
          >
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <div className="text-6xl emoji-bounce">🇯🇵</div>
                {selected === 'japanese' && (
                  <Badge className="bg-purple-500 animate-bounce-in shadow-lg">✓ Selected</Badge>
                )}
              </div>
              <CardTitle className="text-2xl bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">Japanese (日本語)</CardTitle>
              <CardDescription className="dark:text-gray-300">Hiragana → Katakana → N5 - N1 | 1000+ Words</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm dark:text-gray-200">📚 <strong>What you'll learn:</strong></p>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 ml-4">
                  <li>• Hiragana & Katakana (必須)</li>
                  <li>• 2000 Kanji characters</li>
                  <li>• JLPT N5-N1 curriculum</li>
                  <li>• 1000+ vocabulary words</li>
                  <li>• 150 grammar patterns</li>
                  <li>• Keigo (polite speech) & casual forms</li>
                </ul>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3 border border-purple-200 dark:border-purple-500/30">
                <p className="text-sm dark:text-gray-200"><strong>Path:</strong> ひらがな → カタカナ → N5 → N4 → N3 → N2 → N1</p>
              </div>

              <div className="flex gap-2 flex-wrap">
                <Badge variant="outline" className="dark:border-purple-500/50 dark:text-purple-400">Hiragana</Badge>
                <Badge variant="outline" className="dark:border-purple-500/50 dark:text-purple-400">Katakana</Badge>
                <Badge variant="outline" className="dark:border-purple-500/50 dark:text-purple-400">Kanji</Badge>
                <Badge variant="outline" className="dark:border-purple-500/50 dark:text-purple-400">Particles</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        <Button 
          onClick={handleConfirm} 
          disabled={!selected}
          className={`w-full h-12 text-lg transition-all ripple-effect ${
            selected 
              ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 dark:from-blue-500 dark:via-purple-500 dark:to-pink-500 text-white shadow-lg hover:shadow-xl animate-bounce-in hover-lift' 
              : 'opacity-50'
          }`}
        >
          {selected ? (
            <span className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              {`Start Learning ${selected === 'chinese' ? 'Chinese 🇨🇳' : 'Japanese 🇯🇵'}`}
              <span className="text-xl">→</span>
            </span>
          ) : (
            'Select a Language to Continue'
          )}
        </Button>
      </div>
    </div>
  );
}
