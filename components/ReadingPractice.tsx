import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { ArrowLeft, Trophy, CheckCircle, BookOpen } from 'lucide-react';
import { addPoints, POINTS_PER_CORRECT } from '../utils/points';
import { updateLevelProgress } from '../utils/progressTypes';
import { api } from '../utils/api';

interface ReadingPracticeProps {
  level: number | string;
  language: 'chinese' | 'japanese';
  userProgress: any;
  userEmail: string;
  onBack: () => void;
  onProgressUpdate: () => void;
}

// Reading passages for different levels
const chineseReadingPassages = {
  1: [
    {
      title: '我的家',
      passage: '我有一个家。我的家很大。我有爸爸、妈妈和一个妹妹。我们很爱我们的家。',
      questions: [
        {
          question: '我的家怎么样？',
          options: ['很小', '很大', '很远', '很近'],
          correct: 1
        },
        {
          question: '我有几个妹妹？',
          options: ['一个', '两个', '三个', '没有'],
          correct: 0
        }
      ]
    },
    {
      title: '今天',
      passage: '今天是星期一。今天天气很好。我去学校学习。我很高兴。',
      questions: [
        {
          question: '今天是星期几？',
          options: ['星期一', '星期二', '星期三', '星期四'],
          correct: 0
        },
        {
          question: '今天的天气怎么样？',
          options: ['不好', '很冷', '很好', '下雨'],
          correct: 2
        }
      ]
    }
  ],
  2: [
    {
      title: '我的学习',
      passage: '我每天早上七点起床。我八点去学校。在学校，我学习汉语、数学和英语。我很喜欢学习。下午四点，我回家。',
      questions: [
        {
          question: '我几点起床？',
          options: ['六点', '七点', '八点', '九点'],
          correct: 1
        },
        {
          question: '我在学校学习什么？',
          options: ['只有汉语', '汉语、数学和英语', '只有数学', '只有英语'],
          correct: 1
        }
      ]
    }
  ]
};

const japaneseReadingPassages = {
  N5: [
    {
      title: '私の家族',
      passage: '私は田中です。私の家族は四人です。父、母、妹と私です。父は会社員です。母は先生です。妹は高校生です。私は大学生です。',
      questions: [
        {
          question: '田中さんの家族は何人ですか。',
          options: ['三人', '四人', '五人', '六人'],
          correct: 1
        },
        {
          question: 'お母さんの仕事は何ですか。',
          options: ['会社員', '先生', '学生', '医者'],
          correct: 1
        }
      ]
    },
    {
      title: '毎日',
      passage: '私は毎日七時に起きます。朝ごはんを食べます。それから、学校に行きます。学校で日本語を勉強します。午後三時に帰ります。',
      questions: [
        {
          question: '何時に起きますか。',
          options: ['六時', '七時', '八時', '九時'],
          correct: 1
        },
        {
          question: '学校で何を勉強しますか。',
          options: ['英語', '数学', '日本語', '歴史'],
          correct: 2
        }
      ]
    }
  ],
  N4: [
    {
      title: '週末の予定',
      passage: '今週の週末、友達と京都に行きます。京都は日本の古い都市です。たくさんのお寺や神社があります。私たちは清水寺を見に行きたいです。それから、美味しい和食を食べる予定です。とても楽しみです。',
      questions: [
        {
          question: '今週の週末、どこに行きますか。',
          options: ['東京', '大阪', '京都', '奈良'],
          correct: 2
        },
        {
          question: '京都について正しいものはどれですか。',
          options: ['新しい都市です', '古い都市です', 'お寺がありません', '食べ物がまずいです'],
          correct: 1
        }
      ]
    }
  ]
};

export function ReadingPractice({ level, language, userProgress, userEmail, onBack, onProgressUpdate }: ReadingPracticeProps) {
  const [currentPassageIndex, setCurrentPassageIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [testScore, setTestScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isComplete, setIsComplete] = useState(false);

  // Get passages based on language and level
  const getPassages = () => {
    if (language === 'chinese') {
      return chineseReadingPassages[level as number] || chineseReadingPassages[1];
    } else {
      return japaneseReadingPassages[level as string] || japaneseReadingPassages.N5;
    }
  };

  const passages = getPassages();
  const currentPassage = passages[currentPassageIndex];
  const currentQuestion = currentPassage.questions[currentQuestionIndex];

  // Calculate total questions
  if (totalQuestions === 0) {
    const total = passages.reduce((sum, p) => sum + p.questions.length, 0);
    setTotalQuestions(total);
  }

  const questionsAnswered = passages.slice(0, currentPassageIndex).reduce((sum, p) => sum + p.questions.length, 0) + currentQuestionIndex;
  const progress = totalQuestions > 0 ? ((questionsAnswered + 1) / totalQuestions) * 100 : 0;

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    if (answerIndex === currentQuestion.correct) {
      setTestScore(testScore + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < currentPassage.questions.length - 1) {
      // Next question in same passage
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else if (currentPassageIndex < passages.length - 1) {
      // Next passage
      setCurrentPassageIndex(currentPassageIndex + 1);
      setCurrentQuestionIndex(0);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      // Complete
      handleComplete();
    }
  };

  const handleComplete = async () => {
    try {
      const points = testScore * POINTS_PER_CORRECT;
      addPoints(userEmail, 'quiz', points);
      
      const updatedProgress = updateLevelProgress(
        userProgress,
        level,
        'readingTestCompleted',
        testScore
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
    const percentage = Math.round((testScore / totalQuestions) * 100);
    const totalPoints = testScore * POINTS_PER_CORRECT;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-black dark:via-black dark:to-black p-4">
        <div className="max-w-2xl mx-auto pt-8">
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-green-400 to-teal-500 rounded-full flex items-center justify-center mb-4">
                <Trophy className="w-12 h-12 text-white" />
              </div>
              <CardTitle className="text-3xl">
                Reading Test Complete! 📖
              </CardTitle>
              <CardDescription>Great job on your reading comprehension!</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="text-6xl mb-2">{percentage}%</div>
                <p className="text-xl text-gray-600 mb-4">
                  You scored {testScore} out of {totalQuestions}
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
  const isCorrect = selectedAnswer !== null && selectedAnswer === currentQuestion.correct;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-black dark:via-black dark:to-black p-4">
      <div className="max-w-3xl mx-auto pt-8">
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Badge className="bg-green-500">
            <BookOpen className="w-4 h-4 mr-2" />
            Reading Practice
          </Badge>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <CardTitle>Reading Comprehension</CardTitle>
              <Badge variant="secondary">
                Question {questionsAnswered + 1} / {totalQuestions}
              </Badge>
            </div>
            <Progress value={progress} className="h-2" />
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Reading passage */}
            <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-8">
              <h3 className="text-2xl mb-4 text-center">{currentPassage.title}</h3>
              <div className="bg-white rounded-lg p-6">
                <p className="text-lg leading-relaxed" style={{ lineHeight: '2' }}>
                  {currentPassage.passage}
                </p>
              </div>
            </div>

            {/* Question */}
            <div className="bg-blue-50 rounded-xl p-6">
              <p className="text-xl mb-4">{currentQuestion.question}</p>
              
              <div className="space-y-3">
                {currentQuestion.options.map((option, idx) => {
                  const isSelected = selectedAnswer === idx;
                  const isThisCorrect = idx === currentQuestion.correct;
                  
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
                      key={idx}
                      onClick={() => !showResult && handleAnswer(idx)}
                      disabled={showResult}
                      className={buttonClass}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Result feedback */}
            {showResult && (
              <div className={`p-4 rounded-lg ${isCorrect ? 'bg-green-50' : 'bg-red-50'}`}>
                <div className="flex items-center gap-2">
                  {isCorrect ? (
                    <>
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-green-800">Correct! +{POINTS_PER_CORRECT} points</span>
                    </>
                  ) : (
                    <>
                      <span className="text-red-800">
                        Incorrect. The correct answer is: {currentQuestion.options[currentQuestion.correct]}
                      </span>
                    </>
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
                {currentPassageIndex < passages.length - 1 || currentQuestionIndex < currentPassage.questions.length - 1
                  ? 'Next Question'
                  : 'Finish Test'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
