import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { ArrowLeft, CheckCircle, XCircle, Trophy, Brain, Target, Zap } from 'lucide-react';
import { api } from '../utils/api';
import { getExercisesByLevel } from '../utils/hskData';
import { getExercisesByJLPT } from '../utils/japaneseData';
import { generateHiraganaExercises, generateKatakanaExercises } from '../utils/kanaExercises';
import { addPoints, POINTS_PER_CORRECT } from '../utils/points';

interface PracticeExerciseProps {
  level: number | string;
  language: 'chinese' | 'japanese';
  userProgress: any;
  userEmail: string;
  onBack: () => void;
  onProgressUpdate: () => void;
}

export function PracticeExercise({ level, language, userProgress, userEmail, onBack, onProgressUpdate }: PracticeExerciseProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);
  const [quizComplete, setQuizComplete] = useState(false);
  const [totalPoints, setTotalPoints] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [mode, setMode] = useState<'quiz' | 'review' | 'results'>('quiz');
  const [hasFailed, setHasFailed] = useState(false);

  // Memoize exercises so they don't change on re-render (THIS FIXES THE BUG!)
  const exercises = useMemo(() => {
    if (language === 'chinese') {
      return getExercisesByLevel(level as number);
    } else {
      if (level === 'hiragana') {
        return generateHiraganaExercises() as any;
      } else if (level === 'katakana') {
        return generateKatakanaExercises() as any;
      } else {
        return getExercisesByJLPT(level as string);
      }
    }
  }, [level, language]);
    
  // Check if exercises exist
  if (!exercises || exercises.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-black dark:via-black dark:to-black p-4 flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>No Questions Available</CardTitle>
            <CardDescription>
              There are no quiz questions available for this level yet. Please try another activity or level.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={onBack} className="w-full">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
    
  const exercise = exercises[currentQuestion];
  const progress = ((currentQuestion + 1) / exercises.length) * 100;
  const isCorrect = exercise ? selectedAnswer === (exercise.correctAnswer ?? exercise.correct) : false;

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    
    setShowResult(true);
    
    // Store user's answer
    setUserAnswers({ ...userAnswers, [currentQuestion]: selectedAnswer });
    
    if (isCorrect && !answeredQuestions.includes(currentQuestion)) {
      setScore(score + 1);
      setAnsweredQuestions([...answeredQuestions, currentQuestion]);
    }
  };

  const handleNext = () => {
    if (currentQuestion < exercises.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(userAnswers[currentQuestion + 1] ?? null);
      setShowResult(userAnswers[currentQuestion + 1] !== undefined);
    } else {
      // On last question, move to review screen
      setMode('review');
      setCurrentQuestion(0);
      setSelectedAnswer(userAnswers[0] ?? null);
      setShowResult(true);
    }
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnsweredQuestions([]);
    setQuizComplete(false);
    setTotalPoints(0);
    setUserAnswers({});
    setMode('quiz');
    setHasFailed(false);
  };

  const handleComplete = async () => {
    // Calculate and add points
    if (!quizComplete) {
      const points = score * POINTS_PER_CORRECT;
      setTotalPoints(points);
      addPoints(userEmail, 'quiz', points);
      
      // Update progress
      const { updateLevelProgress } = await import('../utils/progressTypes');
      const updatedProgress = updateLevelProgress(
        userProgress,
        level,
        'quiz',
        score
      );
      
      const userId = localStorage.getItem('bilingua_current_user');
      if (userId) {
        await api.saveProgress(userId, updatedProgress).catch(err => 
          console.error('Failed to save progress:', err)
        );
      }
      
      setQuizComplete(true);
    }
  };

  const handleBackToMenu = () => {
    onProgressUpdate();
    onBack();
  };

  const handleSubmitQuiz = async () => {
    // Calculate percentage - need 70% or higher to pass (max 30% wrong)
    const percentage = (score / exercises.length) * 100;
    const passed = percentage >= 70;
    
    if (!passed) {
      // Failed the quiz - don't save progress or award points
      setHasFailed(true);
      setMode('results');
      return;
    }
    
    // Passed - save progress and award points
    await handleComplete();
    setHasFailed(false);
    setMode('results');
  };

  const handleReviewAnswers = () => {
    setMode('review');
    setCurrentQuestion(0);
    setSelectedAnswer(userAnswers[0] ?? null);
    setShowResult(true);
  };

  const handleReviewNext = () => {
    if (currentQuestion < exercises.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(userAnswers[currentQuestion + 1] ?? null);
    }
  };

  const handleReviewPrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(userAnswers[currentQuestion - 1] ?? null);
    }
  };

  // Review screen (after completing all questions, before Submit)
  if (mode === 'review') {
    const reviewExercise = exercises[currentQuestion];
    const userAnswer = userAnswers[currentQuestion];
    const correctAns = reviewExercise.correctAnswer ?? reviewExercise.correct;
    const isReviewCorrect = userAnswer === correctAns;
    const allQuestionsAnswered = Object.keys(userAnswers).length === exercises.length;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-black dark:via-black dark:to-black p-4">
        <div className="max-w-2xl mx-auto pt-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <Button variant="ghost" onClick={() => {
              setMode('quiz');
              setCurrentQuestion(0);
              setSelectedAnswer(userAnswers[0] ?? null);
              setShowResult(userAnswers[0] !== undefined);
            }}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Quiz
            </Button>
            <div className="flex gap-2">
              <Badge>{language === 'chinese' ? `HSK ${level}` : level}</Badge>
              <Badge variant="secondary">
                Review Mode
              </Badge>
            </div>
          </div>

          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between text-sm mb-2">
              <span>Question {currentQuestion + 1} of {exercises.length}</span>
              <span>Answered: {Object.keys(userAnswers).length}/{exercises.length}</span>
            </div>
            <Progress value={((currentQuestion + 1) / exercises.length) * 100} className="h-2" />
          </div>

          {/* Question Card */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Badge variant="outline">Review</Badge>
                <span className="text-sm text-gray-500">Question {currentQuestion + 1}</span>
              </div>
              <CardTitle className="text-xl">{reviewExercise.question}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {reviewExercise.options.map((option, index) => {
                  const isCorrectOption = index === (reviewExercise.correctAnswer ?? reviewExercise.correct);
                  const isUserAnswer = index === userAnswer;
                  
                  let bgClass = 'border-gray-200';
                  if (isCorrectOption) {
                    bgClass = 'border-green-500 bg-green-50';
                  } else if (isUserAnswer && !isCorrectOption) {
                    bgClass = 'border-red-500 bg-red-50';
                  }

                  return (
                    <div 
                      key={`review-q${currentQuestion}-opt-${index}`}
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
                    <strong>Explanation:</strong> {reviewExercise.explanation}
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
                  disabled={currentQuestion === 0}
                  className="flex-1"
                >
                  Previous
                </Button>
                <Button
                  onClick={handleReviewNext}
                  disabled={currentQuestion >= exercises.length - 1}
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
                  You answered {Object.keys(userAnswers).length} out of {exercises.length} questions
                </p>
                <p className="text-sm text-red-600">
                  ⚠️ You must score at least 70% to pass (max 30% wrong)
                </p>
                <Button 
                  onClick={handleSubmitQuiz}
                  disabled={!allQuestionsAnswered}
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  Submit Quiz & See Results
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Results screen (after Submit button is clicked)
  if (mode === 'results') {
    const percentage = Math.round((score / exercises.length) * 100);
    
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
                  Quiz Failed ❌
                </CardTitle>
                <CardDescription>You need to score at least 70% to pass</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="text-6xl mb-2 text-red-600">{percentage}%</div>
                  <p className="text-xl text-gray-600 mb-4">
                    You scored {score} out of {exercises.length}
                  </p>
                  <Badge className="bg-red-500 mb-4">Failed - Try Again!</Badge>
                </div>

                <div className="bg-gradient-to-r from-red-100 to-orange-100 rounded-lg p-6 border-2 border-red-300">
                  <div className="text-3xl mb-2">❌ No Points Awarded</div>
                  <p className="text-sm text-gray-700">
                    You got {exercises.length - score} questions wrong (more than 30% incorrect)
                  </p>
                  <p className="text-sm text-red-700 mt-2">
                    ⚠️ You must score at least 70% to pass and earn points
                  </p>
                </div>

                <div className="bg-blue-50 rounded-lg p-4 text-left">
                  <p className="text-sm">
                    <strong>💡 Tip:</strong> Review the questions you missed and study the vocabulary/grammar for {language === 'chinese' ? `HSK ${level}` : level} before retrying.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button onClick={handleReviewAnswers} variant="outline">
                    Review Answers
                  </Button>
                  <Button onClick={handleReset} className="bg-red-600 hover:bg-red-700">
                    Try Again
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      );
    }
    
    // Passed state (70% or higher)
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-black dark:via-black dark:to-black p-4">
        <div className="max-w-2xl mx-auto pt-8">
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mb-4">
                <Trophy className="w-12 h-12 text-white" />
              </div>
              <CardTitle className="text-3xl">
                {language === 'chinese' ? `HSK ${level}` : level} Exercise Complete! 🎉
              </CardTitle>
              <CardDescription>Great work on completing this practice session</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="text-6xl mb-2">{percentage}%</div>
                <p className="text-xl text-gray-600 mb-4">
                  You scored {score} out of {exercises.length}
                </p>
                
                {percentage >= 80 && (
                  <Badge className="bg-green-500 mb-4">优秀! Excellent!</Badge>
                )}
                {percentage >= 70 && percentage < 80 && (
                  <Badge className="bg-blue-500 mb-4">很好! Good Job!</Badge>
                )}
                {percentage >= 70 && percentage < 80 && (
                  <Badge className="bg-orange-500 mb-4">Passed - Keep Practicing!</Badge>
                )}
              </div>

              <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg p-6 border-2 border-yellow-300">
                <div className="text-3xl mb-2">🎯 +{score * POINTS_PER_CORRECT} Points!</div>
                <p className="text-sm text-gray-700">
                  {score} correct × {POINTS_PER_CORRECT} points each
                </p>
              </div>

              <div className="bg-blue-50 rounded-lg p-4 text-left">
                <p className="text-sm">
                  <strong>💡 AI Recommendation:</strong> {
                    percentage >= 80 
                      ? `Excellent! You're mastering ${language === 'chinese' ? `HSK ${level}` : level}. Keep up the great work!`
                      : percentage >= 60
                      ? `Good progress! Review the vocabulary and grammar for ${language === 'chinese' ? `HSK ${level}` : level} to strengthen your knowledge.`
                      : `Keep practicing ${language === 'chinese' ? `HSK ${level}` : level} basics. Try the vocabulary flashcards and chat practice.`
                  }
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={handleReviewAnswers} variant="outline">
                  Review Answers
                </Button>
                <Button onClick={handleReset} variant="outline">
                  Try Again
                </Button>
                <Button onClick={handleBackToMenu}>
                  Back to Main Menu
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Safety check - if no exercise, don't render
  if (!exercise) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-black dark:via-black dark:to-black p-4">
      <div className="max-w-2xl mx-auto pt-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="flex gap-2">
            <Badge>{language === 'chinese' ? `HSK ${level}` : level}</Badge>
            <Badge variant="secondary">
              Score: {score}/{exercises.length}
            </Badge>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm mb-2">
            <span>Progress</span>
            <span>Question {currentQuestion + 1} of {exercises.length}</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <Badge variant="outline">Multiple Choice</Badge>
              <span className="text-sm text-gray-500">Question {currentQuestion + 1}</span>
            </div>
            <CardTitle className="text-xl">{exercise.question}</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup 
              key={`question-${currentQuestion}`}
              value={selectedAnswer !== null ? selectedAnswer.toString() : undefined} 
              onValueChange={(value) => {
                setSelectedAnswer(parseInt(value));
                setShowResult(false);
              }}
              disabled={showResult}
            >
              <div className="space-y-3">
                {exercise.options.map((option, index) => (
                  <div 
                    key={`q${currentQuestion}-option-${index}`}
                    className={`flex items-center space-x-2 p-4 rounded-lg border-2 transition-all ${
                      showResult
                        ? index === (exercise.correctAnswer ?? exercise.correct)
                          ? 'border-green-500 bg-green-50'
                          : index === selectedAnswer
                          ? 'border-red-500 bg-red-50'
                          : 'border-gray-200'
                        : selectedAnswer === index
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <RadioGroupItem value={index.toString()} id={`q${currentQuestion}-option-${index}`} />
                    <Label 
                      htmlFor={`q${currentQuestion}-option-${index}`}
                      className="flex-1 cursor-pointer text-lg"
                    >
                      {option}
                    </Label>
                    {showResult && index === (exercise.correctAnswer ?? exercise.correct) && (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    )}
                    {showResult && index === selectedAnswer && index !== (exercise.correctAnswer ?? exercise.correct) && (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
                  </div>
                ))}
              </div>
            </RadioGroup>

            {/* Result and Explanation */}
            {showResult && (
              <div className={`mt-6 p-4 rounded-lg ${
                isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  {isCorrect ? (
                    <>
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-green-900">正确! Correct! Well done! 🎉</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-red-600" />
                      <span className="text-red-900">Not quite right</span>
                    </>
                  )}
                </div>
                <p className="text-sm text-gray-700">
                  <strong>Explanation:</strong> {exercise.explanation}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-6 flex gap-3">
              {!showResult ? (
                <Button 
                  onClick={handleSubmit}
                  disabled={selectedAnswer === null}
                  className="w-full"
                >
                  Check Answer
                </Button>
              ) : (
                <Button 
                  onClick={handleNext}
                  className="w-full"
                >
                  {currentQuestion < exercises.length - 1 ? 'Next Question' : 'See Results'}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* AI Hint */}
        {!showResult && (
          <Card className="bg-purple-50 border-purple-200">
            <CardContent className="pt-6">
              <p className="text-sm">
                <strong>💡 AI Hint:</strong> Think carefully about the {language === 'chinese' ? 'Chinese' : 'Japanese'} grammar and vocabulary you've learned at {language === 'chinese' ? `HSK ${level}` : level}. 
                Remember the patterns and structures!
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}