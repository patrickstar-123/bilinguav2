import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ArrowLeft, Volume2, BookOpen } from 'lucide-react';
import { getChineseConjunctions } from '../utils/hskData';
import { getJapaneseConjunctions } from '../utils/japaneseData';
import { getVoiceSettings, findBestVoice, getCurrentVoiceActor } from '../utils/voiceSettings';

interface ConjunctionLessonProps {
  language: 'chinese' | 'japanese';
  onBack: () => void;
}

export function ConjunctionLesson({ language, onBack }: ConjunctionLessonProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const conjunctions = language === 'chinese' 
    ? getChineseConjunctions() 
    : getJapaneseConjunctions();

  const current = conjunctions[currentIndex];

  // Cleanup speech on unmount
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
      console.log('🔇 ConjunctionLesson unmounted - stopping speech');
    };
  }, []);

  const playPronunciation = () => {
    try {
      window.speechSynthesis.cancel();
      
      setTimeout(() => {
        const speak = () => {
          try {
            const text = language === 'chinese' 
              ? (current as any).chinese 
              : (current as any).hiragana;
            
            if (!text) {
              console.error('No text to speak');
              return;
            }
            
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = language === 'chinese' ? 'zh-CN' : 'ja-JP';
            
            // Get available voices
            const voices = window.speechSynthesis.getVoices();
            
            if (voices.length > 0) {
              // Use voice settings from user preferences
              const targetVoice = findBestVoice(voices, language);
              
              if (targetVoice) {
                utterance.voice = targetVoice;
                const actorProfile = getCurrentVoiceActor();
                console.log(`🎤 Using ${actorProfile.name}: ${targetVoice.name} (${targetVoice.lang})`);
              }
            }
            
            // Get voice settings (rate, pitch) from user preferences
            const voiceSettings = getVoiceSettings(language);
            utterance.rate = voiceSettings.rate;
            utterance.pitch = voiceSettings.pitch;
            utterance.volume = 1.0;
            
            utterance.onerror = (event) => {
              // Ignore "interrupted" errors - they're expected when cancelling speech
              if (event.error === 'interrupted' || event.error === 'cancelled') {
                console.log('🔇 Speech interrupted (normal behavior)');
                return;
              }
              console.error('Speech error:', event.error);
            };
            
            utterance.onstart = () => {
              const actor = getCurrentVoiceActor();
              console.log(`🔊 ${actor.icon} ${actor.name}: "${utterance.text}" (${utterance.lang}) - Rate: ${utterance.rate}, Pitch: ${utterance.pitch}`);
            };
            
            window.speechSynthesis.speak(utterance);
          } catch (error) {
            console.error('Error in speak function:', error);
          }
        };
        
        // Load voices and speak
        const voices = window.speechSynthesis.getVoices();
        if (voices.length > 0) {
          speak();
        } else {
          let voicesLoaded = false;
          
          const voicesChangedHandler = () => {
            if (!voicesLoaded) {
              voicesLoaded = true;
              speak();
            }
          };
          
          window.speechSynthesis.addEventListener('voiceschanged', voicesChangedHandler, { once: true });
          
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
      console.error('Failed to play pronunciation:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-950 dark:to-blue-950 p-4">
      <div className="max-w-4xl mx-auto pt-8">
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={() => {
            window.speechSynthesis.cancel();
            onBack();
          }}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="flex gap-2">
            <Badge>{language === 'chinese' ? 'Chinese Conjunctions' : 'Japanese Setsuzokushi'}</Badge>
            <Badge variant="secondary">
              {currentIndex + 1} / {conjunctions.length}
            </Badge>
          </div>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle>
                  {language === 'chinese' ? 'Chinese Conjunctions' : 'Japanese Conjunctions'}
                </CardTitle>
                <p className="text-sm text-gray-500">
                  {language === 'chinese' ? '连词 (Liáncí)' : '接続詞 (Setsuzokushi)'}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-6">
              {/* Main Conjunction */}
              <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-8">
                <div className="text-6xl mb-4">
                  {language === 'chinese' ? (current as any).chinese : (current as any).hiragana}
                </div>
                {language === 'chinese' && (current as any).pinyin && (
                  <div className="text-2xl text-gray-600 mb-2">{(current as any).pinyin}</div>
                )}
                {language === 'japanese' && (current as any).kanji && (
                  <div className="text-2xl text-gray-600 mb-2">{(current as any).kanji}</div>
                )}
                {language === 'japanese' && (current as any).romaji && (
                  <div className="text-xl text-gray-500 mb-2">{(current as any).romaji}</div>
                )}
                <Button
                  variant="outline"
                  size="lg"
                  onClick={playPronunciation}
                  className="mt-4"
                >
                  <Volume2 className="w-5 h-5 mr-2" />
                  Play Pronunciation
                </Button>
              </div>

              {/* Translation */}
              <div className="bg-blue-50 rounded-xl p-6">
                <p className="text-sm text-gray-600 mb-2">English Translation</p>
                <p className="text-3xl">{current.english}</p>
              </div>

              {/* Example */}
              {current.example && (
                <div className="bg-green-50 rounded-xl p-6">
                  <p className="text-sm text-gray-600 mb-2">Example Usage</p>
                  <p className="text-xl">{current.example}</p>
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="flex gap-3 mt-8">
              <Button
                variant="outline"
                onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
                disabled={currentIndex === 0}
                className="flex-1"
              >
                Previous
              </Button>
              <Button
                onClick={() => setCurrentIndex(Math.min(conjunctions.length - 1, currentIndex + 1))}
                disabled={currentIndex === conjunctions.length - 1}
                className="flex-1"
              >
                Next
              </Button>
            </div>

            {/* Progress indicator */}
            <div className="mt-6 grid grid-cols-10 gap-1">
              {conjunctions.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2 rounded-full ${
                    idx === currentIndex
                      ? 'bg-purple-600'
                      : idx < currentIndex
                      ? 'bg-purple-300'
                      : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}