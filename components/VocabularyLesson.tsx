import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { ArrowLeft, Volume2, CheckCircle, XCircle, Trophy, BookOpen } from 'lucide-react';
import { getVocabularyForLevelOnly as getChineseVocabularyForLevelOnly } from '../utils/hskData';
import { getVocabularyForLevelOnly as getJapaneseVocabularyForLevelOnly } from '../utils/japaneseData';
import { getAllKana, getKanaBySubType } from '../utils/completeKanaData';
import { updateLevelProgress } from '../utils/progressTypes';
import { saveProgressSafe } from '../utils/adminHelper';
import { addPoints, POINTS_PER_CORRECT } from '../utils/points';
import { findBestVoice, getCurrentVoiceActor, getVoiceSettings } from '../utils/voiceActorSystem';

interface VocabularyLessonProps {
  level: number | string;
  language: 'chinese' | 'japanese';
  userProgress: any;
  userEmail: string;
  onBack: () => void;
  onProgressUpdate: () => void;
  kanaSubType?: 'all' | 'basic' | 'dakuten' | 'yoon'; // NEW: optional kana subtype
}

export function VocabularyLesson({ level, language, userProgress, userEmail, onBack, onProgressUpdate, kanaSubType }: VocabularyLessonProps) {
  const [mode, setMode] = useState<'learn' | 'test' | 'review' | 'results'>('learn');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  
  // Test mode state
  const [testAnswers, setTestAnswers] = useState<Record<number, number>>({});
  const [testScore, setTestScore] = useState(0);
  const [showTestResult, setShowTestResult] = useState(false);
  const [hasFailed, setHasFailed] = useState(false);

  // Get vocabulary data based on language and level - LEVEL-SPECIFIC ONLY
  const getVocabulary = () => {
    if (language === 'chinese') {
      return getChineseVocabularyForLevelOnly(level as number);
    } else {
      if (level === 'hiragana' || level === 'katakana') {
        // Use kanaSubType if provided, otherwise default to 'all'
        return getKanaBySubType(level as 'hiragana' | 'katakana', kanaSubType || 'all');
      }
      return getJapaneseVocabularyForLevelOnly(level as string);
    }
  };

  const vocabularyData = getVocabulary();
  
  // Generate test questions (10 random words)
  const generateTestQuestions = () => {
    const shuffled = [...vocabularyData].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(10, vocabularyData.length));
  };

  const [testQuestions] = useState(() => generateTestQuestions());
  
  const currentWord = (mode === 'test' || mode === 'review') ? testQuestions[currentIndex] : vocabularyData[currentIndex];
  const totalItems = (mode === 'test' || mode === 'review') ? testQuestions.length : vocabularyData.length;
  const progress = ((currentIndex + 1) / totalItems) * 100;

  const playPronunciation = () => {
    try {
      window.speechSynthesis.cancel();
      
      // Small delay to ensure cancellation completes
      setTimeout(() => {
        const speak = () => {
          try {
            let textToSpeak = '';
            if (language === 'chinese' && 'chinese' in currentWord) {
              textToSpeak = currentWord.chinese;
            } else if (language === 'japanese') {
              if ('char' in currentWord) {
                textToSpeak = currentWord.char;
              } else if ('character' in currentWord) {
                textToSpeak = currentWord.character;
              } else if ('hiragana' in currentWord) {
                textToSpeak = currentWord.hiragana;
              } else if ('kanji' in currentWord) {
                textToSpeak = currentWord.kanji;
              }
            }
            
            // Validate text
            if (!textToSpeak || textToSpeak.trim() === '' || textToSpeak === 'undefined') {
              console.error('Invalid text to speak:', textToSpeak);
              return;
            }
            
            const utterance = new SpeechSynthesisUtterance(textToSpeak);
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
              // Silent fail for better UX - only log serious errors
              if (event.error === 'not-allowed' || event.error === 'audio-busy') {
                console.warn('⚠ Audio playback issue, please try again');
              }
            };
            
            utterance.onstart = () => {
              const actor = getCurrentVoiceActor();
              console.log(`🔊 ${actor.icon} ${actor.name}: "${utterance.text}" (${utterance.lang}) - Rate: ${utterance.rate}, Pitch: ${utterance.pitch}`);
            };
            
            // Additional safety check
            if (!utterance.text || utterance.text.trim() === '') {
              console.error('Cannot speak empty text');
              return;
            }
            
            window.speechSynthesis.speak(utterance);
          } catch (error) {
            console.error('Error in speak function:', error);
          }
        };
        
        // Check if voices are loaded
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

  const handleNext = () => {
    if (currentIndex < totalItems - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
      // Check if next question was already answered
      const nextAnswered = testAnswers[currentIndex + 1] !== undefined;
      setShowTestResult(nextAnswered);
    } else if (mode === 'learn') {
      // After learning all words, start test
      setMode('test');
      setCurrentIndex(0);
      setIsFlipped(false);
    } else if (mode === 'test') {
      // After finishing all test questions, go to review mode
      setMode('review');
      setCurrentIndex(0);
      setShowTestResult(true);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
      // Check if previous question was already answered
      const prevAnswered = testAnswers[currentIndex - 1] !== undefined;
      setShowTestResult(prevAnswered);
    }
  };

  // Test mode: generate options
  const getTestOptions = () => {
    if (!currentWord) return [];
    
    // For Hiragana/Katakana - test romaji
    if ('character' in currentWord && 'romaji' in currentWord) {
      const correctAnswer = currentWord.romaji;
      
      const otherWords = vocabularyData
        .filter((w: any) => w.romaji !== correctAnswer)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
      
      const options = [
        correctAnswer,
        ...otherWords.map((w: any) => w.romaji)
      ].sort(() => Math.random() - 0.5);
      
      return options;
    }
    
    // For vocabulary words - test English
    const correctAnswer = language === 'chinese' && 'english' in currentWord 
      ? currentWord.english 
      : 'english' in currentWord 
      ? currentWord.english 
      : '';
    
    // Get other random options
    const otherWords = vocabularyData
      .filter(w => {
        const wordEnglish = 'english' in w ? w.english : 'meaning' in w ? w.meaning : '';
        return wordEnglish !== correctAnswer;
      })
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    
    const options = [
      correctAnswer,
      ...otherWords.map(w => 'english' in w ? w.english : 'meaning' in w ? w.meaning : '')
    ].sort(() => Math.random() - 0.5);
    
    return options;
  };

  const [testOptions] = useState<Record<number, string[]>>(() => {
    const options: Record<number, string[]> = {};
    testQuestions.forEach((_, idx) => {
      const word = testQuestions[idx];
      
      // For hiragana/katakana, test romaji
      if ('character' in word && 'romaji' in word) {
        const correctAnswer = word.romaji;
        const otherWords = vocabularyData
          .filter((w: any) => 'romaji' in w && w.romaji !== correctAnswer)
          .sort(() => Math.random() - 0.5)
          .slice(0, 3);
        
        options[idx] = [
          correctAnswer,
          ...otherWords.map((w: any) => w.romaji)
        ].sort(() => Math.random() - 0.5);
      } else {
        // For vocabulary words, test English/meaning
        const correctAnswer = 'english' in word ? word.english : 'meaning' in word ? word.meaning : '';
        
        const otherWords = vocabularyData
          .filter(w => {
            const wordEnglish = 'english' in w ? w.english : 'meaning' in w ? w.meaning : '';
            return wordEnglish !== correctAnswer;
          })
          .sort(() => Math.random() - 0.5)
          .slice(0, 3);
        
        options[idx] = [
          correctAnswer,
          ...otherWords.map(w => 'english' in w ? w.english : 'meaning' in w ? w.meaning : '')
        ].sort(() => Math.random() - 0.5);
      }
    });
    return options;
  });

  const handleTestAnswer = (answerIndex: number) => {
    // If already answered, don't allow re-answering
    if (testAnswers[currentIndex] !== undefined) return;
    
    setTestAnswers({ ...testAnswers, [currentIndex]: answerIndex });
    
    let correctAnswer = '';
    if ('character' in currentWord && 'romaji' in currentWord) {
      correctAnswer = currentWord.romaji;
    } else if ('english' in currentWord) {
      correctAnswer = currentWord.english;
    } else if ('meaning' in currentWord) {
      correctAnswer = currentWord.meaning;
    }
    
    const selectedAnswer = testOptions[currentIndex][answerIndex];
    
    setShowTestResult(true);
    
    if (selectedAnswer === correctAnswer) {
      setTestScore(testScore + 1);
    }
  };

  const handleFinishTest = async () => {
    try {
      // Check if test passed (80% = 8/10 correct)
      const passed = testScore >= 8;
      
      if (!passed) {
        setHasFailed(true);
        setMode('results');
        return;
      }
      
      // Calculate points only if passed
      const points = testScore * POINTS_PER_CORRECT;
      
      // Add points
      addPoints(userEmail, 'flashcard', points);
      
      // Update progress
      let updatedProgress = updateLevelProgress(
        userProgress,
        level,
        'vocabularyTest',
        testScore
      );
      
      // Special handling for Hiragana/Katakana completion
      if (language === 'japanese') {
        if (level === 'hiragana' && testScore >= 8) {
          updatedProgress = {
            ...updatedProgress,
            hiraganaCompleted: true,
            currentLevel: 'katakana', // Move to katakana
          };
        } else if (level === 'katakana' && testScore >= 8) {
          updatedProgress = {
            ...updatedProgress,
            katakanaCompleted: true,
            currentLevel: 'N5', // Move to N5
          };
        }
      }
      
      const userId = localStorage.getItem('bilingua_current_user');
      if (userId) {
        await saveProgressSafe(userId, updatedProgress);
      }
      
      // Force progress update to refresh dashboard
      if (onProgressUpdate) {
        onProgressUpdate();
      }
      
      setHasFailed(false);
      setMode('results');
    } catch (error) {
      console.error('Failed to save progress:', error);
      // Show results anyway
      setMode('results');
    }
  };

  const handleTestComplete = () => {
    // This is now just used for the old "Finish Test" button compatibility
    // Redirect to review mode instead
    setMode('review');
    setCurrentIndex(0);
    setShowTestResult(true);
  };

  const handleBackToMenu = () => {
    onProgressUpdate();
    onBack();
  };

  const handleReviewAnswers = () => {
    setMode('review');
    setCurrentIndex(0);
    setShowTestResult(true);
  };

  const handleReviewNext = () => {
    if (currentIndex < testQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleReviewPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleRetryTest = () => {
    setMode('learn');
    setCurrentIndex(0);
    setTestAnswers({});
    setTestScore(0);
    setShowTestResult(false);
    setIsFlipped(false);
    setHasFailed(false);
  };

  const handleSubmitTest = () => {
    // Go to results with current score
    handleFinishTest();
  };

  // Results screen
  if (mode === 'results') {
    const answeredCount = Object.keys(testAnswers).length;
    const skippedCount = testQuestions.length - answeredCount;
    const percentage = Math.round((testScore / testQuestions.length) * 100);
    const totalPoints = hasFailed ? 0 : testScore * POINTS_PER_CORRECT;
    const passedTest = testScore >= 8;
    const unlockedNext = language === 'japanese' && passedTest && !hasFailed &&
      ((level === 'hiragana') || (level === 'katakana'));
    
    // Failed state (less than 70% correct)
    if (hasFailed) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-pink-50 dark:from-black dark:via-black dark:to-black p-4">
          <div className="max-w-2xl mx-auto pt-8">
            <Card className="text-center border-red-300">
              <CardHeader>
                <div className="mx-auto w-20 h-20 bg-gradient-to-br from-red-400 to-orange-500 rounded-full flex items-center justify-center mb-4">
                  <XCircle className="w-12 h-12 text-white" />
                </div>
                <CardTitle className="text-3xl text-red-700">
                  Test Failed ❌
                </CardTitle>
                <CardDescription>You need to score at least 70% to pass</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="text-6xl mb-2 text-red-600">{percentage}%</div>
                  <p className="text-xl text-gray-600 mb-4">
                    You scored {testScore} out of {testQuestions.length}
                  </p>
                  <Badge className="bg-red-500 mb-4">Failed - Try Again!</Badge>
                </div>

                <div className="bg-gradient-to-r from-red-100 to-orange-100 rounded-lg p-6 border-2 border-red-300">
                  <div className="text-3xl mb-2">❌ No Points Awarded</div>
                  <p className="text-sm text-gray-700">
                    You got {testQuestions.length - testScore} questions wrong (more than 30% incorrect)
                  </p>
                  <p className="text-sm text-red-700 mt-2">
                    ⚠️ You must score at least 70% to pass and earn points
                  </p>
                </div>

                <div className="bg-blue-50 rounded-lg p-4 text-left">
                  <p className="text-sm">
                    <strong>💡 Tip:</strong> Review the learning materials again before retrying the test. Focus on the words you missed!
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button onClick={handleReviewAnswers} variant="outline">
                    Review Answers
                  </Button>
                  <Button onClick={handleRetryTest} className="bg-red-600 hover:bg-red-700">
                    Try Again
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      );
    }
    
    // Passed state
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-black dark:via-black dark:to-black p-4">
        <div className="max-w-2xl mx-auto pt-8">
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center mb-4">
                <Trophy className="w-12 h-12 text-white" />
              </div>
              <CardTitle className="text-3xl">
                Vocabulary Test Complete! 🎉
              </CardTitle>
              <CardDescription>Great job learning new vocabulary!</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="text-6xl mb-2">{percentage}%</div>
                <p className="text-xl text-gray-600 mb-4">
                  You scored {testScore} out of {testQuestions.length}
                </p>
                
                {percentage >= 80 && (
                  <Badge className="bg-green-500 mb-4">优秀! Excellent!</Badge>
                )}
                {percentage >= 60 && percentage < 80 && (
                  <Badge className="bg-blue-500 mb-4">很好! Good Job!</Badge>
                )}
                {percentage >= 70 && percentage < 80 && (
                  <Badge className="bg-orange-500 mb-4">Passed - Keep Practicing!</Badge>
                )}
              </div>

              <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg p-6 border-2 border-yellow-300">
                <div className="text-3xl mb-2">🎯 +{totalPoints} Points!</div>
                <p className="text-sm text-gray-700">
                  {testScore} correct × {POINTS_PER_CORRECT} points each
                </p>
                {skippedCount > 0 && (
                  <p className="text-sm text-orange-700 mt-2">
                    ⚠️ You skipped {skippedCount} question{skippedCount !== 1 ? 's' : ''}
                  </p>
                )}
              </div>

              {unlockedNext && (
                <div className="bg-green-50 rounded-lg p-6 border-2 border-green-300">
                  <div className="text-2xl mb-2">🎓 Level Unlocked!</div>
                  <p className="text-sm text-green-800">
                    {level === 'hiragana' 
                      ? 'Congratulations! You\'ve unlocked Katakana!'
                      : 'Congratulations! You\'ve unlocked JLPT N5!'}
                  </p>
                </div>
              )}

              <div className="bg-blue-50 rounded-lg p-4 text-left">
                <p className="text-sm">
                  <strong>💡 Tip:</strong> You can now take the Practice Quiz for this level!
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={handleReviewAnswers} variant="outline">
                  Review Answers
                </Button>
                <Button size="lg" onClick={handleBackToMenu}>
                  Back to Main Menu
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Review mode (same as quiz - review before submitting)
  if (mode === 'review') {
    let reviewCorrectAnswer = '';
    const reviewWord = testQuestions[currentIndex];
    if ('character' in reviewWord && 'romaji' in reviewWord) {
      reviewCorrectAnswer = reviewWord.romaji;
    } else if ('english' in reviewWord) {
      reviewCorrectAnswer = reviewWord.english;
    } else if ('meaning' in reviewWord) {
      reviewCorrectAnswer = reviewWord.meaning;
    }

    const userAnswer = testAnswers[currentIndex];
    const userAnswerText = userAnswer !== undefined ? testOptions[currentIndex][userAnswer] : null;
    const isReviewCorrect = userAnswerText === reviewCorrectAnswer;
    const allQuestionsAnswered = Object.keys(testAnswers).length === testQuestions.length;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-black dark:via-black dark:to-black p-4">
        <div className="max-w-2xl mx-auto pt-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <Button variant="ghost" onClick={() => {
              setMode('test');
              setCurrentIndex(0);
              setShowTestResult(testAnswers[0] !== undefined);
            }}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Test
            </Button>
            <div className="flex gap-2">
              <Badge>{language === 'chinese' ? `HSK ${level}` : level}</Badge>
              <Badge variant="secondary">Review Mode</Badge>
            </div>
          </div>

          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between text-sm mb-2">
              <span>Question {currentIndex + 1} of {testQuestions.length}</span>
              <span>Answered: {Object.keys(testAnswers).length}/{testQuestions.length}</span>
            </div>
            <Progress value={((currentIndex + 1) / testQuestions.length) * 100} className="h-2" />
          </div>

          {/* Question Card */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Badge variant="outline">Review</Badge>
                <span className="text-sm text-gray-500">Question {currentIndex + 1}</span>
              </div>
              <CardTitle className="text-center bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-6 text-5xl">
                {language === 'chinese' && 'chinese' in reviewWord && reviewWord.chinese}
                {language === 'japanese' && 'character' in reviewWord && reviewWord.character}
                {language === 'japanese' && 'hiragana' in reviewWord && !('character' in reviewWord) && reviewWord.hiragana}
              </CardTitle>
              {language === 'chinese' && 'pinyin' in reviewWord && (
                <p className="text-center text-xl text-gray-600">{reviewWord.pinyin}</p>
              )}
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {testOptions[currentIndex].map((option, idx) => {
                  const isCorrectOption = option === reviewCorrectAnswer;
                  const isUserAnswer = idx === userAnswer;
                  
                  let bgClass = 'border-gray-200';
                  if (isCorrectOption) {
                    bgClass = 'border-green-500 bg-green-50';
                  } else if (isUserAnswer && !isCorrectOption) {
                    bgClass = 'border-red-500 bg-red-50';
                  }

                  return (
                    <div 
                      key={`review-q${currentIndex}-opt-${idx}`}
                      className={`p-4 rounded-lg border-2 ${bgClass}`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-lg">{option}</span>
                        {isCorrectOption && <CheckCircle className="w-5 h-5 text-green-500" />}
                        {isUserAnswer && !isCorrectOption && <XCircle className="w-5 h-5 text-red-500" />}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Result feedback */}
              {userAnswer !== undefined ? (
                <div className={`mt-6 p-4 rounded-lg ${isReviewCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                  <div className="flex items-center gap-2 mb-2">
                    {isReviewCorrect ? (
                      <>
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="text-green-900">Correct! Well done! 🎉</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-5 h-5 text-red-600" />
                        <span className="text-red-900">Incorrect</span>
                      </>
                    )}
                  </div>
                  <p className="text-sm text-gray-700">
                    <strong>Correct answer:</strong> {reviewCorrectAnswer}
                  </p>
                </div>
              ) : (
                <div className="mt-6 p-4 rounded-lg bg-orange-50 border border-orange-200">
                  <p className="text-sm text-orange-900">
                    ⚠️ You haven't answered this question yet
                  </p>
                </div>
              )}

              {/* Navigation */}
              <div className="mt-6 flex gap-3">
                <Button
                  variant="outline"
                  onClick={handleReviewPrevious}
                  disabled={currentIndex === 0}
                  className="flex-1"
                >
                  Previous
                </Button>
                <Button
                  onClick={handleReviewNext}
                  disabled={currentIndex >= testQuestions.length - 1}
                  className="flex-1"
                >
                  Next
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Submit Section */}
          {!allQuestionsAnswered && (
            <Card className="bg-orange-50 border-orange-200 mb-4">
              <CardContent className="pt-6">
                <p className="text-sm text-orange-900">
                  ⚠️ You haven't answered all questions yet. Please go back and complete them before submitting.
                </p>
              </CardContent>
            </Card>
          )}

          <Card className="bg-gradient-to-r from-purple-50 to-blue-50">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <p className="text-lg">
                  Ready to submit your answers?
                </p>
                <p className="text-sm text-gray-600">
                  You answered {Object.keys(testAnswers).length} out of {testQuestions.length} questions
                </p>
                <p className="text-sm text-red-600">
                  ⚠️ You must score at least 70% to pass (max 30% wrong)
                </p>
                <Button 
                  onClick={handleSubmitTest}
                  disabled={!allQuestionsAnswered}
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  Submit Test & See Results
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Test mode
  if (mode === 'test') {
    let correctAnswer = '';
    if ('character' in currentWord && 'romaji' in currentWord) {
      correctAnswer = currentWord.romaji;
    } else if ('english' in currentWord) {
      correctAnswer = currentWord.english;
    } else if ('meaning' in currentWord) {
      correctAnswer = currentWord.meaning;
    }
    
    const selectedAnswerIdx = testAnswers[currentIndex];
    const selectedAnswer = selectedAnswerIdx !== undefined ? testOptions[currentIndex][selectedAnswerIdx] : null;
    const isCorrect = selectedAnswer === correctAnswer;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-black dark:via-black dark:to-black p-4">
        <div className="max-w-2xl mx-auto pt-8">
          <div className="flex items-center justify-between mb-6">
            <Button variant="ghost" onClick={() => setMode('learn')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Learning
            </Button>
            <Badge>Test Mode</Badge>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <CardTitle>Vocabulary Test</CardTitle>
                <Badge variant="secondary">
                  {currentIndex + 1} / {testQuestions.length}
                </Badge>
              </div>
              <Progress value={progress} className="h-2" />
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Question */}
              <div className="text-center bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-8">
                <div className="text-5xl mb-4">
                  {language === 'chinese' && 'chinese' in currentWord && currentWord.chinese}
                  {language === 'japanese' && 'character' in currentWord && currentWord.character}
                  {language === 'japanese' && 'hiragana' in currentWord && !('character' in currentWord) && currentWord.hiragana}
                </div>
                {language === 'chinese' && 'pinyin' in currentWord && (
                  <div className="text-xl text-gray-600">{currentWord.pinyin}</div>
                )}
                {/* Romaji removed from hiragana/katakana to prevent cheating */}
                {language === 'japanese' && 'romaji' in currentWord && 'hiragana' in currentWord && !('character' in currentWord) && (
                  <div className="text-sm text-gray-500 mt-2">Listen to the pronunciation</div>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={playPronunciation}
                  className="mt-4"
                >
                  <Volume2 className="w-4 h-4 mr-2" />
                  Play Sound
                </Button>
              </div>

              {/* Options */}
              <div className="space-y-3" key={`test-q-${currentIndex}`}>
                {testOptions[currentIndex] && testOptions[currentIndex].map((option, idx) => {
                  const isSelected = selectedAnswerIdx === idx;
                  const isThisCorrect = option === correctAnswer;
                  const alreadyAnswered = selectedAnswerIdx !== undefined;
                  
                  let buttonClass = "w-full p-4 text-left border-2 rounded-lg transition-all";
                  
                  if (alreadyAnswered) {
                    if (isThisCorrect) {
                      buttonClass += " bg-green-100 border-green-500";
                    } else if (isSelected && !isThisCorrect) {
                      buttonClass += " bg-red-100 border-red-500";
                    } else {
                      buttonClass += " border-gray-200";
                    }
                  } else {
                    buttonClass += " border-gray-200 hover:border-blue-300";
                  }
                  
                  return (
                    <button
                      key={`test-q${currentIndex}-opt-${idx}`}
                      onClick={() => !alreadyAnswered && handleTestAnswer(idx)}
                      disabled={alreadyAnswered}
                      className={buttonClass}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>

              {/* Result feedback */}
              {selectedAnswerIdx !== undefined && (
                <div className={`p-4 rounded-lg ${isCorrect ? 'bg-green-50' : 'bg-red-50'}`}>
                  <div className="flex items-center gap-2">
                    {isCorrect ? (
                      <>
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="text-green-800">Correct! +{POINTS_PER_CORRECT} points</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-5 h-5 text-red-600" />
                        <span className="text-red-800">Incorrect. The correct answer is: {correctAnswer}</span>
                      </>
                    )}
                  </div>
                </div>
              )}
              
              {/* Unanswered warning */}
              {selectedAnswerIdx === undefined && (
                <div className="p-4 rounded-lg bg-orange-50 border border-orange-200">
                  <p className="text-sm text-orange-900">
                    ⚠️ Please select an answer or click Skip to move to the next question
                  </p>
                </div>
              )}

              {/* Navigation */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentIndex === 0}
                  className="flex-1"
                >
                  Previous
                </Button>
                {currentIndex < testQuestions.length - 1 ? (
                  <Button
                    onClick={handleNext}
                    className="flex-1"
                  >
                    {testAnswers[currentIndex] !== undefined ? 'Next' : 'Skip'}
                  </Button>
                ) : (
                  <Button
                    onClick={handleTestComplete}
                    className="flex-1"
                  >
                    Finish Test
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Learning mode
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-black dark:via-black dark:to-black p-4">
      <div className="max-w-2xl mx-auto pt-8">
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Badge>Learning Mode</Badge>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle>
                  {language === 'chinese' ? `HSK ${level}` : level} Vocabulary
                </CardTitle>
                <p className="text-sm text-gray-500">
                  Flashcard {currentIndex + 1} of {vocabularyData.length}
                </p>
              </div>
            </div>
            <Progress value={progress} className="h-2" />
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Flashcard */}
            <div 
              className="min-h-[300px] bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer"
              onClick={() => setIsFlipped(!isFlipped)}
            >
              {!isFlipped ? (
                // Front: Show word
                <div className="text-center">
                  <div className="text-6xl mb-4">
                    {language === 'chinese' && 'chinese' in currentWord && currentWord.chinese}
                    {language === 'japanese' && 'character' in currentWord && currentWord.character}
                    {language === 'japanese' && 'hiragana' in currentWord && !('character' in currentWord) && currentWord.hiragana}
                  </div>
                  {language === 'chinese' && 'pinyin' in currentWord && (
                    <div className="text-2xl text-gray-600 mb-4">{currentWord.pinyin}</div>
                  )}
                  {language === 'japanese' && 'romaji' in currentWord && (
                    <div className="text-2xl text-gray-600 mb-4">{currentWord.romaji}</div>
                  )}
                  <Button
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      playPronunciation();
                    }}
                  >
                    <Volume2 className="w-5 h-5 mr-2" />
                    Play Sound
                  </Button>
                </div>
              ) : (
                // Back: Show meaning
                <div className="text-center">
                  <div className="text-4xl mb-4">
                    {'english' in currentWord && currentWord.english}
                    {'meaning' in currentWord && currentWord.meaning}
                  </div>
                  <p className="text-gray-600">Click to flip back</p>
                </div>
              )}
            </div>

            <p className="text-center text-sm text-gray-500">
              Click the card to flip and see the meaning
            </p>

            {/* Navigation */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                className="flex-1"
              >
                Previous
              </Button>
              <Button
                onClick={handleNext}
                className="flex-1"
              >
                {currentIndex === vocabularyData.length - 1 ? 'Start Test' : 'Next'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
