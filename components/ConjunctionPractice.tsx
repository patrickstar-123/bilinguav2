import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { ArrowLeft, Volume2, BookOpen, Trophy, CheckCircle } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { getChineseConjunctions, type ChineseConjunction } from '../utils/hskData';
import { getJapaneseConjunctions, getJapaneseParticles } from '../utils/japaneseData';
import { addPoints, POINTS_PER_CORRECT } from '../utils/points';
import { updateLevelProgress } from '../utils/progressTypes';
import { api } from '../utils/api';

interface ConjunctionPracticeProps {
  level: number | string;
  language: 'chinese' | 'japanese';
  userProgress: any;
  userEmail: string;
  onBack: () => void;
  onProgressUpdate: () => void;
}

type Mode = 'learn' | 'test' | 'results';

// Map HSK/JLPT levels to conjunction indices
const getConjunctionsByLevel = (language: 'chinese' | 'japanese', level: number | string) => {
  const allConjunctions = language === 'chinese' 
    ? getChineseConjunctions() 
    : getJapaneseConjunctions();
  
  if (language === 'chinese') {
    // Distribute 15 conjunctions across HSK 1-6
    const hskLevel = Number(level);
    switch (hskLevel) {
      case 1: return allConjunctions.slice(0, 3);   // 和, 或者, 但是
      case 2: return allConjunctions.slice(0, 5);   // + 因为, 所以
      case 3: return allConjunctions.slice(0, 8);   // + 如果, 虽然, 而且
      case 4: return allConjunctions.slice(0, 11);  // + 然后, 不但, 而
      case 5: return allConjunctions.slice(0, 13);  // + 可是, 还是
      case 6: return allConjunctions;               // All 15
      default: return allConjunctions.slice(0, 3);
    }
  } else {
    // Distribute 15 conjunctions across JLPT N5-N1
    switch (level) {
      case 'N5': return allConjunctions.slice(0, 3);   // そして, それから, でも
      case 'N4': return allConjunctions.slice(0, 6);   // + しかし, だから, それで
      case 'N3': return allConjunctions.slice(0, 9);   // + または, あるいは, 因みに
      case 'N2': return allConjunctions.slice(0, 12);  // + ところで, すると, つまり
      case 'N1': return allConjunctions;               // All 15
      default: return allConjunctions.slice(0, 3);
    }
  }
};

export function ConjunctionPractice({ level, language, userProgress, userEmail, onBack, onProgressUpdate }: ConjunctionPracticeProps) {
  const [mode, setMode] = useState<Mode>('learn');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [testMode, setTestMode] = useState<'meaning' | 'particle'>('meaning'); // For Japanese: test meanings or particles
  
  // Test mode state
  const [testAnswers, setTestAnswers] = useState<Record<number, number>>({});
  const [testScore, setTestScore] = useState(0);
  const [showTestResult, setShowTestResult] = useState(false);

  // Cleanup speech on unmount
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
      console.log('🔇 ConjunctionPractice unmounted - stopping speech');
    };
  }, []);

  const conjunctions = getConjunctionsByLevel(language, level);
  const particles = language === 'japanese' ? getJapaneseParticles().slice(0, 5) : []; // Get first 5 particles for testing
  
  // Generate test questions (conjunctions OR particles for Japanese)
  const [testQuestions] = useState(() => {
    if (language === 'japanese' && testMode === 'particle') {
      return [...particles].sort(() => Math.random() - 0.5);
    }
    return [...conjunctions].sort(() => Math.random() - 0.5);
  });

  // Generate test options for each question
  const [testOptions] = useState<Record<number, string[]>>(() => {
    const options: Record<number, string[]> = {};
    
    if (language === 'japanese' && testMode === 'particle') {
      // Particle test: show sentence with blank, choose correct particle
      testQuestions.forEach((particle: any, idx) => {
        const correctAnswer = particle.particle;
        const otherParticles = particles
          .filter(p => p.particle !== correctAnswer)
          .sort(() => Math.random() - 0.5)
          .slice(0, 3);
        
        options[idx] = [
          correctAnswer,
          ...otherParticles.map(p => p.particle)
        ].sort(() => Math.random() - 0.5);
      });
    } else {
      // Meaning test: choose correct English translation
      testQuestions.forEach((conj: any, idx) => {
        const correctAnswer = conj.english;
        const otherConjs = conjunctions
          .filter(c => c.english !== correctAnswer)
          .sort(() => Math.random() - 0.5)
          .slice(0, 3);
        
        options[idx] = [
          correctAnswer,
          ...otherConjs.map(c => c.english)
        ].sort(() => Math.random() - 0.5);
      });
    }
    return options;
  });

  const currentConjunction = mode === 'test' ? testQuestions[currentIndex] : conjunctions[currentIndex];
  const totalItems = mode === 'test' ? testQuestions.length : conjunctions.length;
  const progress = ((currentIndex + 1) / totalItems) * 100;

  const playPronunciation = () => {
    try {
      window.speechSynthesis.cancel();
      
      const text = language === 'chinese' 
        ? (currentConjunction as any).chinese 
        : (currentConjunction as any).hiragana;
      
      if (text) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = language === 'chinese' ? 'zh-CN' : 'ja-JP';
        utterance.rate = 0.7;
        utterance.pitch = 1;
        
        utterance.onerror = (event) => {
          // Ignore "interrupted" errors - they're expected when cancelling speech
          if (event.error === 'interrupted' || event.error === 'cancelled') {
            console.log('🔇 Speech interrupted (normal behavior)');
            return;
          }
          console.error('Speech synthesis error:', event);
        };
        
        window.speechSynthesis.speak(utterance);
      }
    } catch (error) {
      console.error('Failed to play pronunciation:', error);
    }
  };

  const handleNext = () => {
    if (currentIndex < totalItems - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowTestResult(false);
    } else if (mode === 'learn') {
      // After learning, start test
      setMode('test');
      setCurrentIndex(0);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowTestResult(false);
    }
  };

  const handleTestAnswer = (answerIndex: number) => {
    setTestAnswers({ ...testAnswers, [currentIndex]: answerIndex });
    setShowTestResult(true);
    
    let correctAnswer = '';
    if (language === 'japanese' && testMode === 'particle') {
      correctAnswer = (currentConjunction as any).particle;
    } else {
      correctAnswer = currentConjunction.english;
    }
    
    const selectedAnswer = testOptions[currentIndex][answerIndex];
    
    if (selectedAnswer === correctAnswer) {
      setTestScore(testScore + 1);
    }
  };

  const handleTestComplete = async () => {
    try {
      // Calculate points
      const points = testScore * POINTS_PER_CORRECT;
      
      // Add points
      addPoints(userEmail, 'flashcard', points);
      
      // Update progress
      const updatedProgress = updateLevelProgress(
        userProgress,
        level,
        'vocabularyTest',
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
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center mb-4">
                <Trophy className="w-12 h-12 text-white" />
              </div>
              <CardTitle className="text-3xl">
                Conjunction Test Complete! 🎉
              </CardTitle>
              <CardDescription>You've mastered the connectors!</CardDescription>
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
    let correctAnswer = '';
    let questionText = '';
    
    if (language === 'japanese' && testMode === 'particle') {
      correctAnswer = (currentConjunction as any).particle;
      questionText = 'Choose the correct particle:';
    } else {
      correctAnswer = currentConjunction.english;
      questionText = language === 'japanese' ? 'What does this conjunction mean?' : 'What does this conjunction mean?';
    }
    
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
                <CardTitle>Conjunction Test</CardTitle>
                <Badge variant="secondary">
                  {currentIndex + 1} / {testQuestions.length}
                </Badge>
              </div>
              <Progress value={progress} className="h-2" />
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Question */}
              <div className="text-center bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-8">
                {language === 'japanese' && testMode === 'particle' ? (
                  <>
                    <p className="text-sm text-gray-600 mb-2">Fill in the blank:</p>
                    <div className="text-3xl mb-4">{(currentConjunction as any).testSentence}</div>
                    <p className="text-lg text-gray-700">{(currentConjunction as any).translation}</p>
                  </>
                ) : (
                  <>
                    <div className="text-5xl mb-4">
                      {language === 'chinese' && (currentConjunction as any).chinese}
                      {language === 'japanese' && (currentConjunction as any).hiragana}
                    </div>
                    {language === 'chinese' && (currentConjunction as any).pinyin && (
                      <div className="text-xl text-gray-600 mb-4">{(currentConjunction as any).pinyin}</div>
                    )}
                    {language === 'japanese' && (currentConjunction as any).romaji && (
                      <div className="text-xl text-gray-600 mb-4">{(currentConjunction as any).romaji}</div>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={playPronunciation}
                    >
                      <Volume2 className="w-4 h-4 mr-2" />
                      Play Sound
                    </Button>
                  </>
                )}
              </div>

              {/* Options */}
              <div>
                <p className="text-sm text-gray-600 mb-3">{questionText}</p>
                <RadioGroup
                  value={selectedAnswerIdx !== undefined ? String(selectedAnswerIdx) : undefined}
                  onValueChange={(value) => handleTestAnswer(Number(value))}
                  key={`question-${currentIndex}`}
                >
                  <div className="space-y-3">
                    {testOptions[currentIndex].map((option, idx) => (
                      <div
                        key={`${currentIndex}-${idx}-${option}`}
                        className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all ${
                          showTestResult && option === correctAnswer
                            ? 'border-green-500 bg-green-50'
                            : showTestResult && selectedAnswerIdx === idx
                            ? 'border-red-500 bg-red-50'
                            : 'border-gray-200 hover:border-purple-300'
                        }`}
                      >
                        <RadioGroupItem value={String(idx)} id={`option-${idx}`} disabled={showTestResult} />
                        <Label htmlFor={`option-${idx}`} className="flex-1 cursor-pointer">
                          {option}
                        </Label>
                        {showTestResult && option === correctAnswer && (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        )}
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              {/* Result feedback */}
              {showTestResult && (
                <div className={`p-4 rounded-lg ${isCorrect ? 'bg-green-50' : 'bg-orange-50'}`}>
                  <p className={`text-center ${isCorrect ? 'text-green-700' : 'text-orange-700'}`}>
                    {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
                  </p>
                </div>
              )}

              {/* Navigation */}
              <div className="flex gap-3">
                {currentIndex < testQuestions.length - 1 ? (
                  <Button
                    onClick={handleNext}
                    disabled={!showTestResult}
                    className="flex-1"
                  >
                    Next Question
                  </Button>
                ) : (
                  <Button
                    onClick={handleTestComplete}
                    disabled={!showTestResult}
                    className="flex-1"
                  >
                    Complete Test
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Learn mode
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-black dark:via-black dark:to-black p-4">
      <div className="max-w-4xl mx-auto pt-8">
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="flex gap-2">
            <Badge>
              {language === 'chinese' 
                ? `HSK ${level} Conjunctions` 
                : `${level} Conjunctions`}
            </Badge>
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
            <Progress value={progress} className="h-2" />
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-6">
              {/* Main Conjunction */}
              <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-8">
                <div className="text-6xl mb-4">
                  {language === 'chinese' && (currentConjunction as any).chinese}
                  {language === 'japanese' && (currentConjunction as any).hiragana}
                </div>
                {language === 'chinese' && (currentConjunction as any).pinyin && (
                  <div className="text-2xl text-gray-600 mb-2">{(currentConjunction as any).pinyin}</div>
                )}
                {language === 'japanese' && (currentConjunction as any).kanji && (
                  <div className="text-2xl text-gray-600 mb-2">{(currentConjunction as any).kanji}</div>
                )}
                {language === 'japanese' && (currentConjunction as any).romaji && (
                  <div className="text-xl text-gray-500 mb-2">{(currentConjunction as any).romaji}</div>
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
                <p className="text-3xl">{currentConjunction.english}</p>
              </div>

              {/* Example */}
              <div className="bg-green-50 rounded-xl p-6">
                <p className="text-sm text-gray-600 mb-2">Example Usage</p>
                <p className="text-xl">{currentConjunction.example}</p>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex gap-3 mt-8">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                className="flex-1"
              >
                Previous
              </Button>
              {currentIndex < conjunctions.length - 1 ? (
                <Button
                  onClick={handleNext}
                  className="flex-1"
                >
                  Next
                </Button>
              ) : (
                <Button
                  onClick={() => setMode('test')}
                  className="flex-1"
                >
                  Start Test
                </Button>
              )}
            </div>

            {/* Progress indicator */}
            <div className="mt-6 flex gap-1 flex-wrap justify-center">
              {conjunctions.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2 w-8 rounded-full ${
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