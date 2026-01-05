import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ArrowLeft, BookOpen, Volume2, Lightbulb, CheckCircle } from 'lucide-react';
import { getVocabularyByJLPT, getJapaneseConjunctions } from '../utils/japaneseData';
import { getVocabularyByLevel, getChineseConjunctions } from '../utils/hskData';
import { completeHiragana, completeKatakana } from '../utils/completeKanaData';

interface StudyGuideProps {
  level: number | string;
  language: 'chinese' | 'japanese';
  onBack: () => void;
  onStartQuiz: () => void;
}

export function StudyGuide({ level, language, onBack, onStartQuiz }: StudyGuideProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMeaning, setShowMeaning] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Get study materials
  const getStudyContent = () => {
    if (language === 'chinese') {
      const vocab = getVocabularyByLevel(level as number);
      return vocab.slice(0, 30).map(item => ({
        native: item.chinese,  // FIXED: Was item.hanzi, should be item.chinese
        pronunciation: item.pinyin,
        meaning: item.english,
        examples: item.sentences || []
      }));
    } else {
      // For Japanese
      if (level === 'hiragana' || level === 'katakana') {
        // Return FULL kana character set
        const chars = level === 'hiragana' ? completeHiragana : completeKatakana;

        return chars.map(item => ({
          native: item.char,
          pronunciation: item.romaji,
          meaning: item.meaning,
          examples: []
        }));
      } else {
        const vocab = getVocabularyByJLPT(level as string);
        return vocab.slice(0, 30).map(item => ({
          native: item.kanji,
          pronunciation: item.hiragana,
          meaning: item.english,
          examples: []
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
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      setIsPlaying(true);
      
      // Small delay to ensure cancellation completes
      setTimeout(() => {
        const speak = () => {
          try {
            const utterance = new SpeechSynthesisUtterance();
            
            // Set text first and validate
            let textToSpeak = '';
            if (language === 'chinese') {
              textToSpeak = current.native || '';
              utterance.lang = 'zh-CN';
            } else if (level === 'hiragana' || level === 'katakana') {
              textToSpeak = current.native || '';
              utterance.lang = 'ja-JP';
            } else {
              textToSpeak = current.native || '';
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-black dark:via-black dark:to-black p-4">
      <div className="max-w-4xl mx-auto pt-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-blue-600" />
            <h1 className="text-2xl">Study Guide</h1>
          </div>
          <Badge className="bg-blue-600">{getLevelName()}</Badge>
        </div>

        {/* Info Card */}
        <Card className="mb-6 bg-gradient-to-r from-blue-100 to-purple-100">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl mb-2">
                📚 {language === 'chinese' ? '学习材料' : '勉強資料'} - Study Materials
              </div>
              <p className="text-gray-700">
                Review these {language === 'chinese' ? 'words and phrases' : 'characters and words'} before taking the quiz
              </p>
              <p className="text-sm text-gray-600 mt-2">
                {studyContent.length} items to study
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Progress */}
        <div className="mb-4 flex justify-between items-center">
          <span className="text-sm text-gray-600">
            Item {currentIndex + 1} of {studyContent.length}
          </span>
          <Button onClick={onStartQuiz} className="bg-green-600 hover:bg-green-700">
            Ready? Start Quiz →
          </Button>
        </div>

        {/* Study Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-center">
              <div className="text-6xl mb-4 font-bold">{current.native}</div>
              <div className="text-2xl text-gray-600 mb-2">
                {current.pronunciation}
              </div>
            </CardTitle>
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
                <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border-2 border-green-300">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-lg">Meaning:</span>
                  </div>
                  <div className="text-2xl text-green-900">{current.meaning}</div>
                </div>
              )}
            </div>

            {/* Pronunciation Button */}
            <div className="text-center mb-6">
              <Button 
                onClick={playPronunciation}
                variant="outline"
                className="w-full sm:w-auto"
                disabled={isPlaying}
              >
                <Volume2 className="w-4 h-4 mr-2" />
                Hear Pronunciation
              </Button>
            </div>

            {/* Examples (if available) */}
            {current.examples && current.examples.length > 0 && showMeaning && (
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <p className="text-sm mb-2">
                  <strong>Example Sentences:</strong>
                </p>
                {current.examples.slice(0, 2).map((example, idx) => (
                  <p key={idx} className="text-sm text-gray-700 mb-1">
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
        <Card className="bg-yellow-50 border-yellow-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Lightbulb className="w-5 h-5 text-yellow-600" />
              Study Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Try to memorize the pronunciation and meaning together</li>
              <li>• Use the audio feature to practice correct pronunciation</li>
              <li>• Review all items at least once before starting the quiz</li>
              <li>• You need 70% or higher to pass the quiz</li>
              <li>• Take your time - understanding is more important than speed</li>
            </ul>
          </CardContent>
        </Card>

        {/* Ready Button */}
        <div className="mt-6 text-center">
          <Card className="bg-gradient-to-r from-green-100 to-emerald-100 border-green-300">
            <CardContent className="pt-6">
              <div className="text-xl mb-4">
                {currentIndex >= studyContent.length - 5 
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