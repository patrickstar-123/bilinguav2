import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { ArrowLeft, BookOpen, Volume2, Lightbulb, CheckCircle, Sparkles } from 'lucide-react';
import { getVocabularyByJLPT } from '../utils/japaneseData';
import { getVocabularyByLevel } from '../utils/hskData';
import { getAllKana, getBasicKana, getDakutenKana, getYoonKana, hiraganaCount, katakanaCount } from '../utils/completeKanaData';

interface ImprovedStudyGuideProps {
  level: number | string;
  language: 'chinese' | 'japanese';
  onBack: () => void;
  onStartQuiz: () => void;
}

export function ImprovedStudyGuide({ level, language, onBack, onStartQuiz }: ImprovedStudyGuideProps) {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'basic' | 'dakuten' | 'yoon'>('basic');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMeaning, setShowMeaning] = useState(false);

  // Get study materials based on level and category
  const getStudyContent = () => {
    if (language === 'chinese') {
      const vocab = getVocabularyByLevel(level as number);
      return vocab.slice(0, 50).map(item => ({
        native: item.hanzi,
        pronunciation: item.pinyin,
        meaning: item.english,
        examples: item.sentences || [],
        category: 'Vocabulary'
      }));
    } else {
      // For Japanese
      if (level === 'hiragana' || level === 'katakana') {
        const kanaType = level === 'hiragana' ? 'hiragana' : 'katakana';
        let chars;
        
        if (selectedCategory === 'all') {
          chars = getAllKana(kanaType);
        } else if (selectedCategory === 'basic') {
          chars = getBasicKana(kanaType);
        } else if (selectedCategory === 'dakuten') {
          chars = getDakutenKana(kanaType);
        } else { // yoon
          chars = getYoonKana(kanaType);
        }

        return chars.map(item => ({
          native: item.char,
          pronunciation: item.romaji,
          meaning: `${item.category} - ${item.type === 'basic' ? 'Basic Gojūon' : item.type === 'dakuten' || item.type === 'handakuten' ? 'Diacritical marks' : 'Combination (Yōon)'}`,
          examples: [],
          category: item.category,
          type: item.type
        }));
      } else {
        const vocab = getVocabularyByJLPT(level as string);
        return vocab.slice(0, 50).map(item => ({
          native: item.kanji,
          pronunciation: item.hiragana,
          meaning: item.english,
          examples: [],
          category: 'Vocabulary'
        }));
      }
    }
  };

  const studyContent = getStudyContent();
  const current = studyContent[currentIndex];

  const getLevelName = () => {
    if (language === 'chinese') {
      return `HSK ${level}`;
    } else {
      if (level === 'hiragana') return 'Hiragana';
      if (level === 'katakana') return 'Katakana';
      return `JLPT ${level}`;
    }
  };

  const playPronunciation = () => {
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(current.native);
      utterance.lang = language === 'chinese' ? 'zh-CN' : 'ja-JP';
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    } catch (error) {
      console.log('Speech synthesis not available');
    }
  };

  const handleNext = () => {
    if (currentIndex < studyContent.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowMeaning(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowMeaning(false);
    }
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category as 'all' | 'basic' | 'dakuten' | 'yoon');
    setCurrentIndex(0);
    setShowMeaning(false);
  };

  const isKanaLevel = level === 'hiragana' || level === 'katakana';
  const counts = level === 'hiragana' ? hiraganaCount : katakanaCount;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-black dark:via-black dark:to-black p-4">
      <div className="max-w-5xl mx-auto pt-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-blue-600" />
            <h1 className="text-2xl">Study Materials</h1>
          </div>
          <Badge className="bg-blue-600">{getLevelName()}</Badge>
        </div>

        {/* Info Card */}
        <Card className="mb-6 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-950 dark:to-purple-950">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl mb-2">
                📚 {language === 'chinese' ? '学习材料' : '勉強資料'} - Study Materials
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                Review these {language === 'chinese' ? 'words and phrases' : 'characters and words'} before taking the quiz
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Category Tabs for Kana */}
        {isKanaLevel && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-600" />
                Choose Category to Study
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={selectedCategory} onValueChange={handleCategoryChange} className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="basic" className="flex flex-col items-center gap-1">
                    <span>Basic Gojūon</span>
                    <Badge variant="secondary" className="text-xs">{counts.basic} chars</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="dakuten" className="flex flex-col items-center gap-1">
                    <span>Dakuten ゛゜</span>
                    <Badge variant="secondary" className="text-xs">{counts.dakuten + counts.handakuten} chars</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="yoon" className="flex flex-col items-center gap-1">
                    <span>Yōon</span>
                    <Badge variant="secondary" className="text-xs">{counts.yoon} chars</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="all" className="flex flex-col items-center gap-1">
                    <span>All</span>
                    <Badge variant="secondary" className="text-xs">{counts.total} chars</Badge>
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              {/* Category descriptions */}
              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                {selectedCategory === 'basic' && (
                  <div>
                    <p className="text-sm">
                      <strong>Basic Gojūon (五十音):</strong> The fundamental 46 {level} characters. Master these first!
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      Includes: vowels (a, i, u, e, o) and K, S, T, N, H, M, Y, R, W rows plus ん/ン
                    </p>
                  </div>
                )}
                {selectedCategory === 'dakuten' && (
                  <div>
                    <p className="text-sm">
                      <strong>Dakuten (゛) & Handakuten (゜):</strong> Modified characters with diacritical marks for voiced sounds.
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      Includes: G, Z, D, B rows (dakuten) and P row (handakuten) - {counts.dakuten + counts.handakuten} total
                    </p>
                  </div>
                )}
                {selectedCategory === 'yoon' && (
                  <div>
                    <p className="text-sm">
                      <strong>Yōon (拗音):</strong> Combination characters that create contracted sounds.
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      Includes: きゃ (kya), しゅ (shu), ちょ (cho), etc. - {counts.yoon} combinations
                    </p>
                  </div>
                )}
                {selectedCategory === 'all' && (
                  <div>
                    <p className="text-sm">
                      <strong>All Characters:</strong> Complete {level} character set with all types.
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      Total: {counts.total} characters (Basic: {counts.basic}, Dakuten: {counts.dakuten + counts.handakuten}, Yōon: {counts.yoon})
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Progress */}
        <div className="mb-4 flex justify-between items-center">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Item {currentIndex + 1} of {studyContent.length}
          </span>
          <Button onClick={onStartQuiz} className="bg-green-600 hover:bg-green-700">
            Ready? Start Quiz →
          </Button>
        </div>

        {/* Progress Bar */}
        <Progress value={((currentIndex + 1) / studyContent.length) * 100} className="mb-6 h-2" />

        {/* Study Card */}
        <Card className="mb-6">
          <CardHeader>
            <div className="text-center">
              <Badge variant="outline" className="mb-4">
                {current.category || 'Study Item'}
              </Badge>
              <CardTitle className="text-center">
                <div className="text-7xl mb-4 font-bold">{current.native}</div>
                <div className="text-3xl text-gray-600 dark:text-gray-400 mb-2">
                  {current.pronunciation}
                </div>
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            {/* Show/Hide Meaning */}
            <div className="text-center mb-6">
              {!showMeaning ? (
                <Button 
                  onClick={() => setShowMeaning(true)}
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  <Lightbulb className="w-4 h-4 mr-2" />
                  Show Meaning
                </Button>
              ) : (
                <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 p-6 rounded-lg border-2 border-green-300 dark:border-green-700">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-lg">Meaning:</span>
                  </div>
                  <div className="text-2xl text-green-900 dark:text-green-100">{current.meaning}</div>
                </div>
              )}
            </div>

            {/* Pronunciation Button */}
            <div className="text-center mb-6">
              <Button 
                onClick={playPronunciation}
                variant="outline"
                className="w-full sm:w-auto"
              >
                <Volume2 className="w-4 h-4 mr-2" />
                Hear Pronunciation
              </Button>
            </div>

            {/* Examples (if available) */}
            {current.examples && current.examples.length > 0 && showMeaning && (
              <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg border border-purple-200 dark:border-purple-800 mb-6">
                <p className="text-sm mb-2">
                  <strong>Example Sentences:</strong>
                </p>
                {current.examples.slice(0, 2).map((example, idx) => (
                  <p key={idx} className="text-sm text-gray-700 dark:text-gray-300 mb-1">
                    • {example}
                  </p>
                ))}
              </div>
            )}

            {/* Navigation */}
            <div className="mt-6 flex gap-3">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                className="flex-1"
              >
                ← Previous
              </Button>
              <Button
                onClick={handleNext}
                disabled={currentIndex >= studyContent.length - 1}
                className="flex-1"
              >
                Next →
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Study Tips */}
        <Card className="bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800 mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Lightbulb className="w-5 h-5 text-yellow-600" />
              Study Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li>• Try to memorize the pronunciation and meaning together</li>
              <li>• Use the audio feature to practice correct pronunciation</li>
              <li>• Review all items at least once before starting the quiz</li>
              {isKanaLevel && (
                <>
                  <li>• Master Basic Gojūon first, then Dakuten, then Yōon</li>
                  <li>• Practice writing each character to reinforce memory</li>
                </>
              )}
              <li>• You need 70% or higher to pass the quiz</li>
              <li>• Take your time - understanding is more important than speed</li>
            </ul>
          </CardContent>
        </Card>

        {/* Ready Button */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-950 dark:to-emerald-950 border-green-300 dark:border-green-700">
            <CardContent className="pt-6">
              <div className="text-xl mb-4">
                {currentIndex >= studyContent.length - 10 
                  ? "🎯 Great! You've studied most of the material!" 
                  : "📖 Keep studying to prepare for the quiz!"}
              </div>
              <Button 
                onClick={onStartQuiz}
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-lg px-8"
              >
                I'm Ready! Start Quiz →
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
