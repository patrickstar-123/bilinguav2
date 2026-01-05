import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { ArrowLeft, BookOpen, Volume2, Lightbulb, CheckCircle, Sparkles, Eye, EyeOff } from 'lucide-react';
import { getVocabularyByJLPT, getVocabularyForLevelOnly as getJapaneseVocabOnly } from '../utils/japaneseData';
import { getVocabularyByLevel, getVocabularyForLevelOnly } from '../utils/hskData';
import { getAllKana, getBasicKana, getDakutenKana, getYoonKana } from '../utils/completeKanaData';

interface ImprovedStudyGuideCompleteProps {
  level: number | string;
  language: 'chinese' | 'japanese';
  onBack: () => void;
  onStartQuiz: () => void;
}

export function ImprovedStudyGuideComplete({ level, language, onBack, onStartQuiz }: ImprovedStudyGuideCompleteProps) {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'basic' | 'dakuten' | 'yoon'>('basic');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMeaning, setShowMeaning] = useState(false);
  const [showPronunciation, setShowPronunciation] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  // Get study materials - LEVEL-SPECIFIC ONLY (no cumulative content)
  const getStudyContent = () => {
    if (language === 'chinese') {
      // Get ONLY the vocabulary for this specific level
      const vocab = getVocabularyForLevelOnly(level as number);
      return vocab.map(item => ({
        native: item.chinese || item.hanzi, // Hanzi characters
        pronunciation: item.pinyin, // Pinyin romanization
        meaning: item.english,
        category: item.category || 'Vocabulary',
        type: 'word'
      }));
    } else {
      // Japanese
      if (level === 'hiragana' || level === 'katakana') {
        const kanaType = level === 'hiragana' ? 'hiragana' : 'katakana';
        let chars;
        
        if (selectedCategory === 'all') {
          chars = getAllKana(kanaType);
        } else if (selectedCategory === 'basic') {
          chars = getBasicKana(kanaType);
        } else if (selectedCategory === 'dakuten') {
          chars = getDakutenKana(kanaType);
        } else {
          chars = getYoonKana(kanaType);
        }

        return chars.map(char => ({
          native: char.char,  // FIXED: Was char.character, should be char.char
          pronunciation: char.romaji, // Romaji
          meaning: `Sound: ${char.romaji}`,
          category: level === 'hiragana' ? 'Hiragana' : 'Katakana',
          type: 'kana'
        }));
      } else {
        // JLPT vocabulary
        const vocab = getVocabularyByJLPT(level as string);
        return vocab.map(item => ({
          native: item.kanji || item.japanese, // Kanji/Japanese characters
          pronunciation: item.hiragana || item.reading || item.romaji, // Hiragana reading (NOT romaji!)
          romaji: item.romaji, // Keep romaji separate
          meaning: item.english || item.meaning,
          category: item.type || 'Vocabulary',
          type: 'word',
          example: item.example
        }));
      }
    }
  };

  const studyContent = getStudyContent();
  const currentCard = studyContent[currentIndex];

  const getLevelName = () => {
    if (language === 'japanese') {
      if (level === 'hiragana') return 'Hiragana';
      if (level === 'katakana') return 'Katakana';
      return `JLPT ${level.toString().toUpperCase()}`;
    }
    return `HSK ${level}`;
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

  const playPronunciation = () => {
    try {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      // Small delay to ensure cancellation completes
      setTimeout(() => {
        setIsPlaying(true);
        
        const speak = () => {
          try {
            const utterance = new SpeechSynthesisUtterance();
            
            // Set text first and validate
            let textToSpeak = '';
            if (language === 'chinese') {
              textToSpeak = currentCard.native || '';
              utterance.lang = 'zh-CN';
            } else if (level === 'hiragana' || level === 'katakana') {
              textToSpeak = currentCard.native || '';
              utterance.lang = 'ja-JP';
            } else {
              textToSpeak = currentCard.native || '';
              utterance.lang = 'ja-JP';
            }
            
            // Validate text
            if (!textToSpeak || textToSpeak.trim() === '' || textToSpeak === 'undefined') {
              console.error('Invalid text to speak:', textToSpeak);
              setIsPlaying(false);
              return;
            }
            
            utterance.text = textToSpeak;
            
            // Get available voices
            const voices = window.speechSynthesis.getVoices();
            
            if (voices.length > 0) {
              let targetVoice = null;
              
              if (language === 'chinese') {
                // For Chinese, prefer female voice
                targetVoice = voices.find(voice => 
                  (voice.lang.startsWith('zh') || voice.lang.includes('CN')) &&
                  (voice.name.toLowerCase().includes('female') || 
                   voice.name.toLowerCase().includes('huihui') ||
                   voice.name.toLowerCase().includes('yaoyao') ||
                   voice.name.toLowerCase().includes('ting-ting'))
                );
                
                // Fallback to any Chinese voice
                if (!targetVoice) {
                  targetVoice = voices.find(voice => 
                    voice.lang.startsWith('zh') || 
                    voice.lang.includes('CN') ||
                    voice.name.toLowerCase().includes('chinese') ||
                    voice.name.toLowerCase().includes('mandarin')
                  );
                }
              } else {
                // For Japanese, PRIORITIZE FEMALE VOICES
                targetVoice = voices.find(voice => 
                  (voice.lang.startsWith('ja') || voice.lang.includes('JP')) &&
                  (voice.name.toLowerCase().includes('female') ||
                   voice.name.toLowerCase().includes('kyoko') ||
                   voice.name.toLowerCase().includes('otoya') ||
                   voice.name.toLowerCase().includes('haruka') ||
                   voice.name.toLowerCase().includes('sayaka') ||
                   voice.name.toLowerCase().includes('ayumi'))
                );
                
                // Fallback to any Japanese voice
                if (!targetVoice) {
                  targetVoice = voices.find(voice => 
                    voice.lang.startsWith('ja') || 
                    voice.lang.includes('JP') ||
                    voice.name.toLowerCase().includes('japanese')
                  );
                }
              }
              
              if (targetVoice) {
                utterance.voice = targetVoice;
                console.log(`🔊 Using voice: ${targetVoice.name} (${targetVoice.lang})`);
              } else {
                console.log(`⚠️ No native ${language} voice found, using default`);
              }
            }
            
            // Set speech parameters - MORE ENGAGING!
            if (language === 'japanese') {
              utterance.rate = 0.85;
              utterance.pitch = 1.3;
              utterance.volume = 1.0;
            } else {
              utterance.rate = 0.75;
              utterance.pitch = 1.1;
              utterance.volume = 1.0;
            }
            
            // Event handlers
            utterance.onend = () => {
              setIsPlaying(false);
              console.log('✅ Speech completed');
            };
            
            utterance.onerror = (event) => {
              console.error('Speech error:', event.error, event);
              setIsPlaying(false);
              
              // Only show alert for serious errors
              if (event.error === 'not-allowed' || event.error === 'audio-busy') {
                console.warn('⚠️ Audio playback issue, please try again');
              }
            };
            
            utterance.onstart = () => {
              console.log(`🔊 Playing: "${utterance.text}" (${utterance.lang}) - Rate: ${utterance.rate}, Pitch: ${utterance.pitch}`);
            };
            
            // Additional safety check
            if (!utterance.text || utterance.text.trim() === '') {
              console.error('Cannot speak empty text');
              setIsPlaying(false);
              return;
            }
            
            // Speak
            window.speechSynthesis.speak(utterance);
            
          } catch (error) {
            console.error('Error in speak function:', error);
            setIsPlaying(false);
          }
        };
        
        // Load voices and speak
        const voices = window.speechSynthesis.getVoices();
        
        if (voices.length > 0) {
          speak();
        } else {
          // Wait for voices to load
          let voicesLoaded = false;
          
          const voicesChangedHandler = () => {
            if (!voicesLoaded) {
              voicesLoaded = true;
              speak();
            }
          };
          
          window.speechSynthesis.addEventListener('voiceschanged', voicesChangedHandler, { once: true });
          
          // Fallback timeout
          setTimeout(() => {
            if (!voicesLoaded) {
              voicesLoaded = true;
              window.speechSynthesis.removeEventListener('voiceschanged', voicesChangedHandler);
              speak();
            }
          }, 500);
        }
      }, 150);
      
    } catch (error) {
      console.error('Speech synthesis error:', error);
      setIsPlaying(false);
    }
  };

  const progress = ((currentIndex + 1) / studyContent.length) * 100;

  if (studyContent.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-black dark:via-black dark:to-black p-4">
        <div className="max-w-4xl mx-auto pt-8">
          <Button onClick={onBack} variant="outline" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Menu
          </Button>
          
          <Card>
            <CardHeader>
              <CardTitle>No Study Materials Available</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Study materials for {getLevelName()} are being prepared.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-black dark:via-black dark:to-black p-4">
      <div className="max-w-4xl mx-auto pt-8">
        {/* Header */}
        <Button onClick={onBack} variant="outline" className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Menu
        </Button>

        {/* Title Card */}
        <Card className="mb-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-none">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <BookOpen className="w-8 h-8" />
                  <CardTitle className="text-3xl">Study Materials - {getLevelName()}</CardTitle>
                </div>
                <p className="text-white/90 text-lg">
                  {language === 'chinese' ? '📖 Learn Hanzi (汉字) with Pinyin' : '📖 Learn Kanji/Kana with Romaji'}
                </p>
              </div>
            </div>
            <div className="flex gap-2 mt-3">
              <Badge className="bg-white/20 hover:bg-white/30">
                {studyContent.length} {currentCard?.type === 'kana' ? 'Characters' : 'Words'}
              </Badge>
              <Badge className="bg-white/20 hover:bg-white/30">
                Card {currentIndex + 1} of {studyContent.length}
              </Badge>
            </div>
          </CardHeader>
        </Card>

        {/* Category Selection for Kana */}
        {(level === 'hiragana' || level === 'katakana') && (
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex gap-2 flex-wrap">
                <Button
                  variant={selectedCategory === 'basic' ? 'default' : 'outline'}
                  onClick={() => {
                    setSelectedCategory('basic');
                    setCurrentIndex(0);
                  }}
                >
                  Basic (あ-ん)
                </Button>
                <Button
                  variant={selectedCategory === 'dakuten' ? 'default' : 'outline'}
                  onClick={() => {
                    setSelectedCategory('dakuten');
                    setCurrentIndex(0);
                  }}
                >
                  Dakuten (が-ぽ)
                </Button>
                <Button
                  variant={selectedCategory === 'yoon' ? 'default' : 'outline'}
                  onClick={() => {
                    setSelectedCategory('yoon');
                    setCurrentIndex(0);
                  }}
                >
                  Yōon (きゃ-ぴょ)
                </Button>
                <Button
                  variant={selectedCategory === 'all' ? 'default' : 'outline'}
                  onClick={() => {
                    setSelectedCategory('all');
                    setCurrentIndex(0);
                  }}
                >
                  All Characters
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Progress Bar */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                <span>Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-3" />
            </div>
          </CardContent>
        </Card>

        {/* Main Study Card - LARGE with Characters */}
        <Card className="mb-6 border-2 border-purple-500 shadow-xl">
          <CardContent className="pt-8">
            {/* Character Display - HUGE */}
            <div className="text-center mb-8">
              <div className="inline-block">
                <Badge variant="secondary" className="mb-4">
                  {currentCard.category}
                </Badge>
                {/* MAIN CHARACTER - VERY LARGE */}
                <div 
                  className="text-9xl mb-6 cursor-pointer select-text"
                  style={{ 
                    fontFamily: language === 'chinese' ? 'Noto Sans SC, sans-serif' : 'Noto Sans JP, sans-serif',
                    lineHeight: 1.2
                  }}
                >
                  {currentCard.native}
                </div>

                {/* Pronunciation - Always Visible and LARGE */}
                <div className="mb-6">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowPronunciation(!showPronunciation)}
                    >
                      {showPronunciation ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={playPronunciation}
                      disabled={isPlaying}
                    >
                      <Volume2 className="w-4 h-4" />
                    </Button>
                  </div>
                  {showPronunciation && (
                    <div className="text-4xl text-blue-600 dark:text-blue-400 mb-2 font-mono">
                      {currentCard.pronunciation}
                    </div>
                  )}
                  <div className="text-sm text-gray-500">
                    {language === 'chinese' ? 'Pinyin' : 'Romaji / Hiragana'}
                  </div>
                </div>

                {/* Meaning - Toggle to Show */}
                <div className="min-h-[100px] flex flex-col items-center justify-center">
                  {!showMeaning ? (
                    <Button 
                      onClick={() => setShowMeaning(true)}
                      size="lg"
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    >
                      <Eye className="w-5 h-5 mr-2" />
                      Show Meaning
                    </Button>
                  ) : (
                    <div className="text-center">
                      <div className="text-3xl mb-3 text-gray-900 dark:text-gray-100">
                        {currentCard.meaning}
                      </div>
                      {currentCard.example && (
                        <div className="text-sm text-gray-600 dark:text-gray-400 max-w-md">
                          <span className="font-mono">{currentCard.example}</span>
                        </div>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowMeaning(false)}
                        className="mt-2"
                      >
                        <EyeOff className="w-4 h-4 mr-1" />
                        Hide
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between gap-4 mt-8 pt-6 border-t">
              <Button
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                size="lg"
                variant="outline"
              >
                ← Previous
              </Button>

              <div className="text-center">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Card {currentIndex + 1} / {studyContent.length}
                </div>
              </div>

              <Button
                onClick={handleNext}
                disabled={currentIndex === studyContent.length - 1}
                size="lg"
                variant="outline"
              >
                Next →
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Navigation */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Quick Jump - Navigate to Any Card</CardTitle>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Click any card to jump directly to it ({studyContent.length} total)
            </p>
          </CardHeader>
          <CardContent>
            <div className="max-h-[400px] overflow-y-auto">
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2">
                {studyContent.map((item, idx) => (
                  <button
                    key={`quick-jump-${idx}`}
                    onClick={() => {
                      setCurrentIndex(idx);
                      setShowMeaning(false);
                      // Scroll to top to see the card
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`
                      p-3 rounded-lg border-2 transition-all duration-200
                      hover:scale-105 hover:shadow-md
                      ${currentIndex === idx 
                        ? 'bg-blue-500 text-white border-blue-600 shadow-lg font-bold' 
                        : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500'
                      }
                    `}
                    style={{ fontFamily: language === 'chinese' ? 'Noto Sans SC' : 'Noto Sans JP' }}
                  >
                    <div className="text-lg font-bold mb-1">
                      {item.native}
                    </div>
                    <div className={`text-xs ${currentIndex === idx ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'}`}>
                      #{idx + 1}
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
              💡 Tip: Scroll through the grid to see all {studyContent.length} cards
            </div>
          </CardContent>
        </Card>

        {/* Study Tips */}
        <Card className="mb-6 bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-950 dark:to-teal-950 border-green-200 dark:border-green-900">
          <CardContent className="pt-6">
            <div className="flex gap-3">
              <Lightbulb className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
              <div>
                <p className="mb-2">
                  <strong>📚 Study Tips:</strong>
                </p>
                <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>Characters First:</strong> Look at the {language === 'chinese' ? 'Hanzi (汉字)' : 'Kanji/Kana'} and try to remember it visually
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>Pronunciation:</strong> The {language === 'chinese' ? 'Pinyin' : 'Romaji/Hiragana'} shows you how to say it correctly
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>Test Yourself:</strong> Try to recall the meaning before clicking "Show Meaning"
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>Repetition:</strong> Go through all cards 3-5 times for best memory retention
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>Practice:</strong> After studying, take the quiz to test your knowledge!
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ready for Quiz */}
        <Card className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-950 dark:to-pink-950 border-purple-300 dark:border-purple-800">
          <CardContent className="pt-6">
            <div className="text-center">
              <Sparkles className="w-12 h-12 mx-auto mb-4 text-purple-500" />
              <h3 className="text-xl mb-2">Ready to Test Your Knowledge?</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                You've studied {currentIndex + 1} of {studyContent.length} items. Take the quiz when you feel ready!
              </p>
              <Button
                onClick={onStartQuiz}
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                Start Practice Quiz →
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}