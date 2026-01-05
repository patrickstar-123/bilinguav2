import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { ArrowLeft, Volume2, BookOpen, Trophy, CheckCircle } from 'lucide-react';
import { getKanjiByJLPT, type JapaneseKanji } from '../utils/japaneseData';
import { getCharactersByLevel, type ChineseCharacter } from '../utils/hskData';
import { addPoints, POINTS_PER_CORRECT } from '../utils/points';
import { updateLevelProgress } from '../utils/progressTypes';
import { api } from '../utils/api';

interface KanjiPracticeProps {
  level: number | string;
  language: 'chinese' | 'japanese';
  userProgress: any;
  userEmail: string;
  onBack: () => void;
  onProgressUpdate: () => void;
}

type Mode = 'learn' | 'test' | 'results';

export function KanjiPractice({ level, language, userProgress, userEmail, onBack, onProgressUpdate }: KanjiPracticeProps) {
  const [mode, setMode] = useState<Mode>('learn');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  
  // Test mode state
  const [testAnswers, setTestAnswers] = useState<Record<number, number>>({});
  const [testScore, setTestScore] = useState(0);
  const [showTestResult, setShowTestResult] = useState(false);

  // Get kanji/character data based on language and level
  const getKanjiData = () => {
    if (language === 'chinese') {
      return getCharactersByLevel(level as number);
    } else {
      return getKanjiByJLPT(level as string);
    }
  };

  const kanjiData = getKanjiData();
  
  // Generate test questions (all kanji)
  const [testQuestions] = useState(() => {
    return [...kanjiData].sort(() => Math.random() - 0.5);
  });

  const currentKanji = mode === 'test' ? testQuestions[currentIndex] : kanjiData[currentIndex];
  const totalItems = mode === 'test' ? testQuestions.length : kanjiData.length;
  const progress = ((currentIndex + 1) / totalItems) * 100;

  // Generate test options
  const [testOptions] = useState<Record<number, string[]>>(() => {
    const options: Record<number, string[]> = {};
    
    testQuestions.forEach((kanji, idx) => {
      const correctAnswer = kanji.meaning;
      const otherKanji = kanjiData
        .filter(k => k.meaning !== correctAnswer)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
      
      options[idx] = [
        correctAnswer,
        ...otherKanji.map(k => k.meaning)
      ].sort(() => Math.random() - 0.5);
    });
    
    return options;
  });

  const playPronunciation = () => {
    try {
      window.speechSynthesis.cancel();
      
      const text = language === 'chinese' 
        ? (currentKanji as ChineseCharacter).character 
        : (currentKanji as JapaneseKanji).character;
      
      if (text) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = language === 'chinese' ? 'zh-CN' : 'ja-JP';
        utterance.rate = 0.7;
        window.speechSynthesis.speak(utterance);
      }
    } catch (error) {
      console.error('Failed to play pronunciation:', error);
    }
  };

  const handleNext = () => {
    if (currentIndex < totalItems - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
      setShowTestResult(false);
    } else if (mode === 'learn') {
      setMode('test');
      setCurrentIndex(0);
      setIsFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
      setShowTestResult(false);
    }
  };

  const handleTestAnswer = (answerIndex: number) => {
    setTestAnswers({ ...testAnswers, [currentIndex]: answerIndex });
    setShowTestResult(true);
    
    const correctAnswer = currentKanji.meaning;
    const selectedAnswer = testOptions[currentIndex][answerIndex];
    
    if (selectedAnswer === correctAnswer) {
      setTestScore(testScore + 1);
    }
  };

  const handleTestComplete = async () => {
    try {
      const points = testScore * POINTS_PER_CORRECT;
      addPoints(userEmail, 'flashcard', points);
      
      const updatedProgress = updateLevelProgress(
        userProgress,
        level,
        'kanjiTestCompleted',
        testScore
      );
      
      const userId = localStorage.getItem('bilingua_current_user');
      if (userId) {
        await api.saveProgress(userId, updatedProgress);
      }
      onProgressUpdate();
      
      setMode('results');
    } catch (error) {
      console.error('Failed to save progress:', error);
      setMode('results');
    }
  };

  const handleBackToMenu = () => {
    onProgressUpdate();
    onBack();
  };

  // Results screen
  if (mode === 'results') {
    const percentage = Math.round((testScore / testQuestions.length) * 100);
    const totalPoints = testScore * POINTS_PER_CORRECT;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
        <div className="max-w-2xl mx-auto pt-8">
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center mb-4">
                <Trophy className="w-12 h-12 text-white" />
              </div>
              <CardTitle className="text-3xl">
                {language === 'chinese' ? 'Hanzi' : 'Kanji'} Test Complete! 🎉
              </CardTitle>
              <CardDescription>Great job learning characters!</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="text-6xl mb-2">{percentage}%</div>
                <p className="text-xl text-gray-600 mb-4">
                  You scored {testScore} out of {testQuestions.length}
                </p>
                
                {percentage >= 80 && (
                  <Badge className="bg-green-500 mb-4">Excellent! 优秀!</Badge>
                )}
                {percentage >= 60 && percentage < 80 && (
                  <Badge className="bg-blue-500 mb-4">Good Job! 很好!</Badge>
                )}
                {percentage < 60 && (
                  <Badge className="bg-orange-500 mb-4">Keep Practicing!</Badge>
                )}
              </div>

              <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg p-6 border-2 border-yellow-300">
                <div className="text-3xl mb-2">🎯 +{totalPoints} Points!</div>
                <p className="text-sm text-gray-700">
                  {testScore} correct × {POINTS_PER_CORRECT} points each
                </p>
              </div>

              <Button size="lg" onClick={handleBackToMenu} className="w-full">
                Back to Main Menu
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Test mode
  if (mode === 'test') {
    const correctAnswer = currentKanji.meaning;
    const selectedAnswerIdx = testAnswers[currentIndex];
    const selectedAnswer = selectedAnswerIdx !== undefined ? testOptions[currentIndex][selectedAnswerIdx] : null;
    const isCorrect = selectedAnswer === correctAnswer;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
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
                <CardTitle>{language === 'chinese' ? 'Hanzi' : 'Kanji'} Test</CardTitle>
                <Badge variant="secondary">
                  {currentIndex + 1} / {testQuestions.length}
                </Badge>
              </div>
              <Progress value={progress} className="h-2" />
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Question */}
              <div className="text-center bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-8">
                <div className="text-8xl mb-4">
                  {currentKanji.character}
                </div>
                {language === 'chinese' && (
                  <div className="text-2xl text-gray-600 mb-4">
                    {(currentKanji as ChineseCharacter).pinyin}
                  </div>
                )}
                {language === 'japanese' && (
                  <div className="text-xl text-gray-600 mb-2">
                    音読み: {(currentKanji as JapaneseKanji).onyomi} | 
                    訓読み: {(currentKanji as JapaneseKanji).kunyomi}
                  </div>
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
              <div className="space-y-3">
                <p className="text-sm text-gray-600">What does this character mean?</p>
                {testOptions[currentIndex].map((option, idx) => {
                  const isSelected = selectedAnswerIdx === idx;
                  const isThisCorrect = option === correctAnswer;
                  
                  let buttonClass = "w-full p-4 text-left border-2 rounded-lg transition-all";
                  
                  if (showTestResult) {
                    if (isThisCorrect) {
                      buttonClass += " bg-green-100 border-green-500";
                    } else if (isSelected && !isThisCorrect) {
                      buttonClass += " bg-red-100 border-red-500";
                    } else {
                      buttonClass += " border-gray-200";
                    }
                  } else {
                    buttonClass += isSelected 
                      ? " bg-blue-100 border-blue-500" 
                      : " border-gray-200 hover:border-blue-300";
                  }
                  
                  return (
                    <button
                      key={`${currentIndex}-opt-${idx}`}
                      onClick={() => !showTestResult && handleTestAnswer(idx)}
                      disabled={showTestResult}
                      className={buttonClass}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>

              {/* Result feedback */}
              {showTestResult && (
                <div className={`p-4 rounded-lg ${isCorrect ? 'bg-green-50' : 'bg-red-50'}`}>
                  <div className="flex items-center gap-2">
                    {isCorrect ? (
                      <>
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="text-green-800">Correct! +{POINTS_PER_CORRECT} points</span>
                      </>
                    ) : (
                      <>
                        <span className="text-red-800">Incorrect. The correct answer is: {correctAnswer}</span>
                      </>
                    )}
                  </div>
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
                    disabled={!showTestResult}
                    className="flex-1"
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    onClick={handleTestComplete}
                    disabled={!showTestResult}
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
                  {language === 'chinese' ? `HSK ${level} Hanzi` : `${level} Kanji`}
                </CardTitle>
                <p className="text-sm text-gray-500">
                  Character {currentIndex + 1} of {kanjiData.length}
                </p>
              </div>
            </div>
            <Progress value={progress} className="h-2" />
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Character Card */}
            <div 
              className="min-h-[400px] bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer"
              onClick={() => setIsFlipped(!isFlipped)}
            >
              {!isFlipped ? (
                // Front: Show character
                <div className="text-center">
                  <div className="text-9xl mb-4">
                    {currentKanji.character}
                  </div>
                  {language === 'chinese' && (
                    <div className="text-3xl text-gray-600 mb-4">
                      {(currentKanji as ChineseCharacter).pinyin}
                    </div>
                  )}
                  {language === 'japanese' && (
                    <div className="space-y-2">
                      <div className="text-xl text-gray-600">
                        音読み: {(currentKanji as JapaneseKanji).onyomi}
                      </div>
                      <div className="text-xl text-gray-600">
                        訓読み: {(currentKanji as JapaneseKanji).kunyomi}
                      </div>
                    </div>
                  )}
                  <Button
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      playPronunciation();
                    }}
                    className="mt-4"
                  >
                    <Volume2 className="w-5 h-5 mr-2" />
                    Play Sound
                  </Button>
                </div>
              ) : (
                // Back: Show meaning and examples
                <div className="text-center w-full">
                  <div className="text-4xl mb-6">
                    {currentKanji.meaning}
                  </div>
                  <div className="bg-white/50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-2">Examples:</p>
                    <div className="space-y-2">
                      {currentKanji.examples.map((example, idx) => (
                        <p key={idx} className="text-lg">{example}</p>
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 mt-4 text-sm">Click to flip back</p>
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
                {currentIndex === kanjiData.length - 1 ? 'Start Test' : 'Next'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
