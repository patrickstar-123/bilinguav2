import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { ArrowLeft, Volume2, Trophy, CheckCircle, Headphones } from 'lucide-react';
import { getVocabularyByLevel, getVocabularyForLevelOnly } from '../utils/hskData';
import { getVocabularyByJLPT, hiraganaChart, katakanaChart, getVocabularyForLevelOnly as getJapaneseVocabOnly } from '../utils/japaneseData';
import { addPoints, POINTS_PER_CORRECT } from '../utils/points';
import { updateLevelProgress } from '../utils/progressTypes';
import { api } from '../utils/api';

interface ListeningPracticeProps {
  level: number | string;
  language: 'chinese' | 'japanese';
  userProgress: any;
  userEmail: string;
  onBack: () => void;
  onProgressUpdate: () => void;
}

export function ListeningPractice({ level, language, userProgress, userEmail, onBack, onProgressUpdate }: ListeningPracticeProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  // Get vocabulary data - LEVEL-SPECIFIC ONLY
  const getVocabulary = () => {
    if (language === 'chinese') {
      return getVocabularyForLevelOnly(level as number);
    } else {
      if (level === 'hiragana') return hiraganaChart.filter(c => c.type === 'hiragana');
      if (level === 'katakana') return katakanaChart.filter(c => c.type === 'katakana');
      return getVocabularyForLevelOnly(level as string);
    }
  };

  const vocabularyData = getVocabulary();
  
  // Generate test questions (10 random words)
  const [testQuestions] = useState(() => {
    const shuffled = [...vocabularyData].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(10, vocabularyData.length));
  });

  // Generate options for each question
  const [testOptions] = useState<Record<number, string[]>>(() => {
    const options: Record<number, string[]> = {};
    
    testQuestions.forEach((word, idx) => {
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
    });
    
    return options;
  });

  const currentWord = testQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / testQuestions.length) * 100;

  const playPronunciation = () => {
    try {
      window.speechSynthesis.cancel();
      
      let text = '';
      if (language === 'chinese' && 'chinese' in currentWord) {
        text = currentWord.chinese;
      } else if (language === 'japanese') {
        if ('character' in currentWord) {
          text = currentWord.character;
        } else if ('hiragana' in currentWord) {
          text = currentWord.hiragana;
        }
      }
      
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

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    const correctAnswer = 'english' in currentWord ? currentWord.english : 'meaning' in currentWord ? currentWord.meaning : '';
    const selected = testOptions[currentQuestion][answerIndex];
    
    if (selected === correctAnswer) {
      setCorrectCount(correctCount + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < testQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      handleComplete();
    }
  };

  const handleComplete = async () => {
    try {
      const points = correctCount * POINTS_PER_CORRECT;
      addPoints(userEmail, 'quiz', points);
      
      const updatedProgress = updateLevelProgress(
        userProgress,
        level,
        'listeningTestCompleted',
        correctCount
      );
      
      const userId = localStorage.getItem('bilingua_current_user');
      if (userId) {
        await api.saveProgress(userId, updatedProgress);
      }
      onProgressUpdate();
      setIsComplete(true);
    } catch (error) {
      console.error('Failed to save progress:', error);
      setIsComplete(true);
    }
  };

  const handleBackToMenu = () => {
    onProgressUpdate();
    onBack();
  };

  // Results screen
  if (isComplete) {
    const percentage = Math.round((correctCount / testQuestions.length) * 100);
    const totalPoints = correctCount * POINTS_PER_CORRECT;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-black dark:via-black dark:to-black p-4">
        <div className="max-w-2xl mx-auto pt-8">
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center mb-4">
                <Trophy className="w-12 h-12 text-white" />
              </div>
              <CardTitle className="text-3xl">
                Listening Test Complete! 🎧
              </CardTitle>
              <CardDescription>Great job on your listening skills!</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="text-6xl mb-2">{percentage}%</div>
                <p className="text-xl text-gray-600 mb-4">
                  You scored {correctCount} out of {testQuestions.length}
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
                  {correctCount} correct × {POINTS_PER_CORRECT} points each
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
  const correctAnswer = 'english' in currentWord ? currentWord.english : 'meaning' in currentWord ? currentWord.meaning : '';
  const isCorrect = selectedAnswer !== null && testOptions[currentQuestion][selectedAnswer] === correctAnswer;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-black dark:via-black dark:to-black p-4">
      <div className="max-w-2xl mx-auto pt-8">
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Badge className="bg-blue-500">
            <Headphones className="w-4 h-4 mr-2" />
            Listening Practice
          </Badge>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <CardTitle>Listening Test</CardTitle>
              <Badge variant="secondary">
                {currentQuestion + 1} / {testQuestions.length}
              </Badge>
            </div>
            <Progress value={progress} className="h-2" />
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Listen to audio */}
            <div className="text-center bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl p-12">
              <Headphones className="w-20 h-20 mx-auto mb-6 text-blue-600" />
              <p className="text-lg text-gray-700 mb-6">
                Listen carefully and choose the correct meaning
              </p>
              <Button
                size="lg"
                onClick={playPronunciation}
                className="bg-blue-500 hover:bg-blue-600"
              >
                <Volume2 className="w-6 h-6 mr-2" />
                Play Audio
              </Button>
              <p className="text-sm text-gray-500 mt-4">
                Click to hear the pronunciation
              </p>
            </div>

            {/* Options */}
            <div className="space-y-3">
              <p className="text-sm text-gray-600">What did you hear?</p>
              {testOptions[currentQuestion].map((option, idx) => {
                const isSelected = selectedAnswer === idx;
                const isThisCorrect = option === correctAnswer;
                
                let buttonClass = "w-full p-4 text-left border-2 rounded-lg transition-all";
                
                if (showResult) {
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
                    key={`${currentQuestion}-opt-${idx}`}
                    onClick={() => !showResult && handleAnswer(idx)}
                    disabled={showResult}
                    className={buttonClass}
                  >
                    {option}
                  </button>
                );
              })}
            </div>

            {/* Result feedback */}
            {showResult && (
              <div className={`p-4 rounded-lg ${isCorrect ? 'bg-green-50' : 'bg-red-50'}`}>
                <div className="flex items-center gap-2 mb-2">
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
                {/* Show the word */}
                <div className="mt-3 p-3 bg-white rounded-lg">
                  <p className="text-2xl text-center mb-2">
                    {language === 'chinese' && 'chinese' in currentWord && currentWord.chinese}
                    {language === 'japanese' && 'character' in currentWord && currentWord.character}
                    {language === 'japanese' && 'hiragana' in currentWord && !('character' in currentWord) && currentWord.hiragana}
                  </p>
                  {language === 'chinese' && 'pinyin' in currentWord && (
                    <p className="text-lg text-gray-600 text-center">{currentWord.pinyin}</p>
                  )}
                  {language === 'japanese' && 'romaji' in currentWord && (
                    <p className="text-lg text-gray-600 text-center">{currentWord.romaji}</p>
                  )}
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex gap-3">
              <Button
                onClick={handleNext}
                disabled={!showResult}
                className="flex-1"
              >
                {currentQuestion < testQuestions.length - 1 ? 'Next Question' : 'Finish Test'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}