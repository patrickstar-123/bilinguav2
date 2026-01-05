import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { CheckCircle, XCircle, Lightbulb, Volume2 } from 'lucide-react';
import { Button } from './ui/button';

interface AnswerExplanationProps {
  isCorrect: boolean;
  selectedAnswer: string;
  correctAnswer: string;
  explanation?: string;
  category?: string;
  language: 'chinese' | 'japanese';
  onPlayAudio?: () => void;
  showPlayButton?: boolean;
}

export function AnswerExplanation({
  isCorrect,
  selectedAnswer,
  correctAnswer,
  explanation,
  category,
  language,
  onPlayAudio,
  showPlayButton = true
}: AnswerExplanationProps) {
  return (
    <Card className={`border-2 ${isCorrect ? 'bg-green-50 dark:bg-green-900/20 border-green-300' : 'bg-red-50 dark:bg-red-900/20 border-red-300'}`}>
      <CardContent className="pt-4 space-y-3">
        {/* Status Badge */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isCorrect ? (
              <>
                <CheckCircle className="w-5 h-5 text-green-600" />
                <Badge className="bg-green-600">Correct!</Badge>
              </>
            ) : (
              <>
                <XCircle className="w-5 h-5 text-red-600" />
                <Badge className="bg-red-600">Incorrect</Badge>
              </>
            )}
            {category && (
              <Badge variant="outline" className="ml-2">
                {category}
              </Badge>
            )}
          </div>
          
          {/* Audio Button */}
          {showPlayButton && onPlayAudio && (
            <Button
              size="sm"
              variant="outline"
              onClick={onPlayAudio}
              className="gap-2"
            >
              <Volume2 className="w-4 h-4" />
              Pronounce
            </Button>
          )}
        </div>

        {/* Answer Comparison */}
        <div className="space-y-2">
          {!isCorrect && (
            <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg border border-red-300">
              <p className="text-sm text-red-800 dark:text-red-200">
                <span className="font-semibold">Your answer:</span> {selectedAnswer}
              </p>
            </div>
          )}
          
          <div className={`p-3 rounded-lg border ${isCorrect ? 'bg-green-100 dark:bg-green-900/30 border-green-300' : 'bg-emerald-100 dark:bg-emerald-900/30 border-emerald-300'}`}>
            <p className="text-sm text-green-800 dark:text-green-200">
              <span className="font-semibold">Correct answer:</span> {correctAnswer}
            </p>
          </div>
        </div>

        {/* Explanation */}
        {explanation && (
          <div className="flex gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200">
            <Lightbulb className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm font-semibold text-blue-900 dark:text-blue-100">
                Explanation:
              </p>
              <p className="text-sm text-blue-800 dark:text-blue-200">
                {explanation}
              </p>
            </div>
          </div>
        )}

        {/* Learning Tip for Wrong Answers */}
        {!isCorrect && (
          <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200">
            <p className="text-sm text-purple-800 dark:text-purple-200">
              <span className="font-semibold">💡 Tip:</span> Review this {language === 'chinese' ? 'word' : 'word'} again and practice writing it down to help memorize it better.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
