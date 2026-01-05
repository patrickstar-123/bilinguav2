import { getLevelProgress, updateLevelProgress } from '../utils/progressTypes';
import { canTakeExam as canTakeExamHelper } from '../utils/progressTypes';
import { addPoints, POINTS_PER_CORRECT, EXAM_BONUS_POINTS } from '../utils/points';
import { api } from '../utils/api';
import { saveProgressSafe } from '../utils/adminHelper';
import { getVocabularyForLevelOnly, generateQuestionsFromVocabulary } from '../utils/hskData';
import { getVocabularyForLevelOnly as getJapaneseVocabOnly, generateJapaneseQuestionsFromVocabulary } from '../utils/japaneseData';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { ArrowLeft, CheckCircle, XCircle, Trophy, AlertCircle, Lock } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';
import { OfficialCertificate } from './OfficialCertificate';

interface ExamModeProps {
  level: number | string;
  language: 'chinese' | 'japanese';
  userEmail: string;
  userProgress: any;
  onBack: () => void;
  onComplete: (passed: boolean) => void;
}

interface ExamQuestion {
  question: string;
  options: string[];
  correct: number;
}

// Generate 30 exam questions based on level
function generateExamQuestions(level: number | string, language: 'chinese' | 'japanese'): ExamQuestion[] {
  let questionPool: ExamQuestion[] = [];

  if (language === 'chinese') {
    const vocabulary = getVocabularyForLevelOnly(level as number);
    questionPool = generateQuestionsFromVocabulary(vocabulary);
  } else {
    const vocabulary = getJapaneseVocabOnly(level as string);
    questionPool = generateJapaneseQuestionsFromVocabulary(vocabulary);
  }

  // If we have fewer than 30 questions, repeat them
  while (questionPool.length < 30) {
    questionPool = [...questionPool, ...questionPool];
  }

  // Shuffle and take exactly 30 questions
  const shuffled = [...questionPool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 30);
}

export function ExamMode({ level, language, userEmail, userProgress, onBack, onComplete }: ExamModeProps) {
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [resultsSaved, setResultsSaved] = useState(false);
  const [examQuestions, setExamQuestions] = useState<ExamQuestion[]>([]);
  const [showCertificate, setShowCertificate] = useState(false);
  const [certificateData, setCertificateData] = useState<any>(null);

  const totalQuestions = examQuestions.length || 30;
  
  // Check prerequisites - Use helper function that respects admin mode
  const levelProgress = getLevelProgress(userProgress, level);
  const canTakeExam = canTakeExamHelper(userProgress, level);

  const startExam = () => {
    try {
      const questions = generateExamQuestions(level, language);
      setExamQuestions(questions);
      setAnswers(new Array(questions.length).fill(null));
      setStarted(true);
    } catch (error) {
      console.error('Error generating exam questions:', error);
      alert('Failed to generate exam. Please try again.');
      onBack();
    }
  };

  if (!started) {
    // Show prerequisites screen if not met
    if (!canTakeExam) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-black dark:via-black dark:to-black p-4">
          <div className="max-w-2xl mx-auto pt-8">
            <Button variant="ghost" onClick={onBack} className="mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-center mb-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center">
                    <Lock className="w-12 h-12 text-white" />
                  </div>
                </div>
                <CardTitle className="text-3xl text-center">
                  Exam Locked 🔒
                </CardTitle>
                <CardDescription className="text-center">
                  Complete the requirements below to unlock this exam
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Alert className="bg-yellow-50 border-yellow-300">
                  <AlertCircle className="h-4 w-4 text-yellow-600" />
                  <AlertDescription>
                    <strong>Prerequisites Required:</strong>
                    <ul className="mt-2 space-y-2">
                      <li className="flex items-center gap-2">
                        {levelProgress.vocabularyTestCompleted ? (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-600" />
                        )}
                        <span>Complete Vocabulary Flashcard Test</span>
                      </li>
                      <li className="flex items-center gap-2">
                        {levelProgress.quizCompleted ? (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-600" />
                        )}
                        <span>Complete Practice Quiz</span>
                      </li>
                    </ul>
                  </AlertDescription>
                </Alert>

                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm">
                    <strong>💡 Why these requirements?</strong><br />
                    The vocabulary test and practice quiz help ensure you're ready for the official exam. Complete them first to unlock this exam!
                  </p>
                </div>

                <Button 
                  size="lg" 
                  className="w-full"
                  onClick={onBack}
                >
                  Back to Dashboard
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-black dark:via-black dark:to-black p-4">
        <div className="max-w-2xl mx-auto pt-8">
          <Button variant="ghost" onClick={onBack} className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-center mb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                  <Trophy className="w-12 h-12 text-white" />
                </div>
              </div>
              <CardTitle className="text-3xl text-center">
                {language === 'chinese' ? 'HSK' : 'JLPT'} {level} Final Exam
              </CardTitle>
              <CardDescription className="text-center">
                Complete this exam to unlock the next level
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <ul className="list-disc ml-4 space-y-1">
                    <li><strong>Questions:</strong> 30 multiple choice questions</li>
                    <li><strong>Passing Score:</strong> 80% or higher (24+ correct answers)</li>
                    <li><strong>Time:</strong> No time limit - take your time</li>
                    <li><strong>Retakes:</strong> You can retake the exam if you don't pass</li>
                    <li><strong>Points:</strong> 10 points per correct + 50 bonus for passing</li>
                  </ul>
                </AlertDescription>
              </Alert>

              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm">
                  <strong>📚 Exam Coverage:</strong> This exam tests all vocabulary, grammar, 
                  and concepts from {language === 'chinese' ? 'HSK' : 'JLPT'} {level}. Make sure you've 
                  completed all lessons and practice exercises!
                </p>
              </div>

              <Button 
                size="lg" 
                className="w-full"
                onClick={startExam}
              >
                Start Exam
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (showResults) {
    const correctCount = answers.filter((answer, idx) => answer === examQuestions[idx].correct).length;
    const percentage = Math.round((correctCount / totalQuestions) * 100);
    const passed = percentage >= 80;

    // Calculate points
    const basePoints = correctCount * POINTS_PER_CORRECT;
    const bonusPoints = passed ? EXAM_BONUS_POINTS : 0;
    const totalPoints = basePoints + bonusPoints;

    // Save results (only once)
    if (!resultsSaved) {
      setResultsSaved(true);
      setSubmitting(true);
      
      // Add points
      addPoints(userEmail, 'exam', totalPoints);
      
      // Update progress
      const updatedProgress = updateLevelProgress(
        userProgress,
        level,
        'exam',
        correctCount,
        passed
      );
      
      const userId = localStorage.getItem('bilingua_current_user');
      if (userId) {
        saveProgressSafe(userId, updatedProgress)
          .then(() => {
            setSubmitting(false);
            // Prepare certificate data if passed
            if (passed) {
              setCertificateData({
                username: localStorage.getItem('bilingua_username') || 'Student',
                level,
                language,
                score: percentage,
                date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
                totalPoints
              });
            }
          })
          .catch(err => {
            console.error('Failed to save progress:', err);
            setSubmitting(false);
          });
      } else {
        setSubmitting(false);
      }
    }
    
    // Show certificate if passed and certificate data is ready
    if (passed && showCertificate && certificateData) {
      return (
        <OfficialCertificate
          username={certificateData.username}
          level={certificateData.level}
          language={certificateData.language}
          score={certificateData.score}
          date={certificateData.date}
          totalPoints={certificateData.totalPoints}
          onClose={() => onComplete(true)}
        />
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-black dark:via-black dark:to-black p-4">
        <div className="max-w-2xl mx-auto pt-8">
          <Card className="text-center">
            <CardHeader>
              <div className={`mx-auto w-24 h-24 rounded-full flex items-center justify-center mb-4 ${
                passed ? 'bg-green-100' : 'bg-orange-100'
              }`}>
                {passed ? (
                  <Trophy className="w-16 h-16 text-green-600" />
                ) : (
                  <AlertCircle className="w-16 h-16 text-orange-600" />
                )}
              </div>
              <CardTitle className="text-3xl">
                {passed ? '合格! You Passed! 🎉' : 'Keep Studying! 📚'}
              </CardTitle>
              <CardDescription>
                {passed 
                  ? 'Congratulations! You can now advance to the next level!' 
                  : 'Don\'t worry! Review the material and try again.'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="text-7xl mb-4">{percentage}%</div>
                <p className="text-xl text-gray-600 mb-2">
                  {correctCount} / {totalQuestions} Correct
                </p>
                {passed ? (
                  <Badge className="bg-green-500 text-lg py-1 px-4">PASSED</Badge>
                ) : (
                  <Badge className="bg-orange-500 text-lg py-1 px-4">NEED 80% TO PASS</Badge>
                )}
              </div>

              <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg p-6 border-2 border-yellow-300">
                <div className="text-3xl mb-2">🎯 +{totalPoints} Points!</div>
                <p className="text-sm text-gray-700">
                  {correctCount} correct × {POINTS_PER_CORRECT} = {basePoints} points
                  {passed && ` + 50 bonus points = ${totalPoints} total`}
                </p>
              </div>

              <div className="bg-blue-50 rounded-lg p-4 text-left">
                <p className="text-sm">
                  <strong>📊 Results Breakdown:</strong><br />
                  • Correct Answers: {correctCount}<br />
                  • Wrong Answers: {totalQuestions - correctCount}<br />
                  • Accuracy: {percentage}%<br />
                  • Required to Pass: 80% ({Math.ceil(totalQuestions * 0.8)} questions)
                </p>
              </div>

              {passed && (
                <div className="bg-green-50 rounded-lg p-4 border-2 border-green-300">
                  <p className="text-sm text-green-800">
                    <strong>🎓 Level Unlocked!</strong><br />
                    You can now access {language === 'chinese' ? `HSK ${(level as number) + 1}` : 'the next level'}!
                  </p>
                </div>
              )}

              <div className="flex flex-col gap-3">
                {passed && certificateData && (
                  <Button 
                    size="lg"
                    className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white"
                    onClick={() => setShowCertificate(true)}
                    disabled={submitting}
                  >
                    🏆 View Official Certificate 🏆
                  </Button>
                )}
                {!passed && (
                  <Button 
                    size="lg" 
                    onClick={() => {
                      setStarted(false);
                      setCurrentQuestion(0);
                      setAnswers([]);
                      setShowResults(false);
                      setSelectedAnswer(null);
                      setExamQuestions([]);
                      setSubmitting(false);
                      setResultsSaved(false);
                    }}
                  >
                    Retake Exam
                  </Button>
                )}
                <Button 
                  size="lg" 
                  variant={passed ? "outline" : "default"}
                  onClick={() => onComplete(passed)}
                  disabled={submitting}
                >
                  {submitting ? 'Saving...' : 'Return to Dashboard'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const progress = ((currentQuestion + 1) / totalQuestions) * 100;
  const currentQ = examQuestions[currentQuestion];

  if (!currentQ) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-black dark:via-black dark:to-black p-4 flex items-center justify-center">
        <Card>
          <CardContent className="pt-6">
            <p>Loading exam...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleNext = () => {
    // Always save current answer before moving
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = selectedAnswer;
    setAnswers(newAnswers);

    if (currentQuestion < totalQuestions - 1) {
      const nextQuestion = currentQuestion + 1;
      setCurrentQuestion(nextQuestion);
      // Load the previously selected answer for next question
      setSelectedAnswer(newAnswers[nextQuestion] ?? null);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      // Always save current answer before moving
      const newAnswers = [...answers];
      newAnswers[currentQuestion] = selectedAnswer;
      setAnswers(newAnswers);
      
      const prevQuestion = currentQuestion - 1;
      setCurrentQuestion(prevQuestion);
      // Load the previously selected answer for previous question
      setSelectedAnswer(newAnswers[prevQuestion] ?? null);
    }
  };

  const handleSubmit = async () => {
    // Save current answer
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = selectedAnswer;
    setAnswers(newAnswers);

    const correctCount = newAnswers.filter((answer, idx) => answer === examQuestions[idx]?.correct).length;
    const percentage = Math.round((correctCount / totalQuestions) * 100);
    const passed = percentage >= 80;

    setSubmitting(true);
    try {
      await api.submitExam({
        email: userEmail,
        language,
        level,
        score: correctCount,
        totalQuestions,
        passed
      });
      console.log('Exam submitted successfully');
    } catch (error) {
      console.error('Failed to submit exam:', error);
      // Continue to show results even if submission fails
    } finally {
      setSubmitting(false);
      setShowResults(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-black dark:via-black dark:to-black p-4">
      <div className="max-w-2xl mx-auto pt-8">
        <div className="flex items-center justify-between mb-6">
          <Badge variant="secondary">
            Question {currentQuestion + 1} of {totalQuestions}
          </Badge>
          <Badge>
            Answered: {answers.filter(a => a !== null).length}/{totalQuestions}
          </Badge>
        </div>

        <div className="mb-8">
          <Progress value={progress} className="h-3" />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">{currentQ.question}</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup 
              key={`exam-question-${currentQuestion}`}
              value={selectedAnswer !== null ? selectedAnswer.toString() : undefined} 
              onValueChange={(value) => {
                const newAnswer = parseInt(value);
                setSelectedAnswer(newAnswer);
                // Immediately save to answers array
                const newAnswers = [...answers];
                newAnswers[currentQuestion] = newAnswer;
                setAnswers(newAnswers);
              }}
            >
              <div className="space-y-3">
                {currentQ.options.map((option, index) => (
                  <div 
                    key={`exam-q${currentQuestion}-option-${index}`}
                    className={`flex items-center space-x-2 p-4 rounded-lg border-2 transition-all ${
                      selectedAnswer === index
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <RadioGroupItem value={index.toString()} id={`exam-q${currentQuestion}-option-${index}`} />
                    <Label 
                      htmlFor={`exam-q${currentQuestion}-option-${index}`}
                      className="flex-1 cursor-pointer text-lg"
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>

            <div className="flex gap-3 mt-6">
              <Button 
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className="flex-1"
              >
                Previous
              </Button>
              {currentQuestion < totalQuestions - 1 ? (
                <Button 
                  onClick={handleNext}
                  className="flex-1"
                >
                  Next
                </Button>
              ) : (
                <Button 
                  onClick={handleSubmit}
                  className="flex-1"
                  disabled={submitting}
                >
                  {submitting ? 'Submitting...' : 'Submit Exam'}
                </Button>
              )}
            </div>

            {currentQuestion === totalQuestions - 1 && answers.filter(a => a !== null).length < totalQuestions && (
              <Alert className="mt-4 bg-yellow-50 border-yellow-200">
                <AlertCircle className="h-4 w-4 text-yellow-600" />
                <AlertDescription className="text-yellow-800">
                  You have {answers.filter(a => a === null).length} unanswered question(s). 
                  You can still submit, but it's recommended to answer all questions.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}