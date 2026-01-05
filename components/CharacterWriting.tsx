import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { ArrowLeft, RotateCw, Check, Lightbulb, Eye, EyeOff } from 'lucide-react';
import { getKanjiByJLPT, type JapaneseKanji } from '../utils/japaneseData';
import { getCharactersByLevel, type ChineseCharacter } from '../utils/hskData';

interface CharacterWritingProps {
  level: number | string;
  language: 'chinese' | 'japanese';
  userProgress: any;
  userEmail: string;
  onBack: () => void;
  onProgressUpdate: () => void;
}

export function CharacterWriting({ level, language, userProgress, userEmail, onBack, onProgressUpdate }: CharacterWritingProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [showGuide, setShowGuide] = useState(true);
  const [attempts, setAttempts] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFlashcard, setShowFlashcard] = useState(true);
  const [isFlipped, setIsFlipped] = useState(false);

  // Get character data
  const getCharacters = () => {
    if (language === 'chinese') {
      return getCharactersByLevel(level as number);
    } else {
      return getKanjiByJLPT(level as string);
    }
  };

  const characters = getCharacters();
  
  // Safety check: if no characters available, show error state
  if (!characters || characters.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-black p-4">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={onBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <CardTitle>Character Writing Practice</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                No characters available for this level.
              </p>
              <Button onClick={onBack}>Return to Dashboard</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  const currentChar = characters[currentIndex];
  const progress = ((currentIndex + 1) / characters.length) * 100;

  useEffect(() => {
    if (!showFlashcard) {
      initCanvas();
    }
  }, [currentChar, showGuide, showFlashcard]);

  const initCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 400;
    canvas.height = 400;

    // Draw grid
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 1;
    
    // Center lines
    ctx.beginPath();
    ctx.moveTo(200, 0);
    ctx.lineTo(200, 400);
    ctx.moveTo(0, 200);
    ctx.lineTo(400, 200);
    ctx.stroke();

    // Border
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, 400, 400);

    // Draw guide character if enabled
    if (showGuide && currentChar) {
      ctx.font = '280px serif';
      ctx.fillStyle = '#e0e0e0';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(currentChar.character, 200, 200);
    }
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    ctx.beginPath();
    
    let x, y;
    if ('touches' in e) {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }
    
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let x, y;
    if ('touches' in e) {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }

    ctx.strokeStyle = '#000';
    ctx.lineWidth = 8;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    initCanvas();
    setAttempts(attempts + 1);
  };

  const handleNext = () => {
    if (currentIndex < characters.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowFlashcard(true);
      setIsFlipped(false);
      setAttempts(0);
    } else {
      onBack();
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowFlashcard(true);
      setIsFlipped(false);
      setAttempts(0);
    }
  };

  // Flashcard mode
  if (showFlashcard) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-black dark:via-black dark:to-black p-4">
        <div className="max-w-2xl mx-auto pt-8">
          <div className="flex items-center justify-between mb-6">
            <Button variant="ghost" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Badge>
              {currentIndex + 1} / {characters.length}
            </Badge>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>
                {language === 'chinese' ? `HSK ${level} Writing` : `${level} Writing`}
              </CardTitle>
              <Progress value={progress} className="h-2 mt-4" />
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Flashcard */}
              <div 
                className="min-h-[400px] bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer"
                onClick={() => setIsFlipped(!isFlipped)}
              >
                {!isFlipped ? (
                  // Front: Show character
                  <div className="text-center">
                    <div className="text-9xl mb-4">
                      {currentChar.character}
                    </div>
                    {language === 'chinese' && (
                      <div className="text-3xl text-gray-600 mb-4">
                        {(currentChar as ChineseCharacter).pinyin}
                      </div>
                    )}
                    {language === 'japanese' && (
                      <div className="space-y-2">
                        <div className="text-xl text-gray-600">
                          音: {(currentChar as JapaneseKanji).onyomi}
                        </div>
                        <div className="text-xl text-gray-600">
                          訓: {(currentChar as JapaneseKanji).kunyomi}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  // Back: Show meaning and examples
                  <div className="text-center w-full">
                    <div className="text-4xl mb-6">
                      {currentChar.meaning}
                    </div>
                    <div className="bg-white/50 rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-2">Examples:</p>
                      <div className="space-y-2">
                        {currentChar.examples.map((example, idx) => (
                          <p key={idx} className="text-lg">{example}</p>
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 mt-4 text-sm">Click to flip back</p>
                  </div>
                )}
              </div>

              <p className="text-center text-sm text-gray-500">
                Click the card to flip • Study before writing
              </p>

              {/* Actions */}
              <div className="space-y-3">
                <Button 
                  size="lg" 
                  className="w-full"
                  onClick={() => setShowFlashcard(false)}
                >
                  Start Writing Practice
                </Button>

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
                    variant="outline"
                    onClick={handleNext}
                    className="flex-1"
                  >
                    {currentIndex === characters.length - 1 ? 'Back to Menu' : 'Next'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Writing practice mode
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-black dark:via-black dark:to-black p-4">
      <div className="max-w-4xl mx-auto pt-8">
        <Button variant="ghost" onClick={() => setShowFlashcard(true)} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Flashcard
        </Button>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Character Info */}
          <Card>
            <CardHeader>
              <CardTitle>Character Practice</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-9xl mb-4">{currentChar.character}</div>
                {language === 'chinese' && (
                  <p className="text-2xl text-gray-600 mb-2">
                    {(currentChar as ChineseCharacter).pinyin}
                  </p>
                )}
                {language === 'japanese' && (
                  <div className="space-y-1 mb-2">
                    <p className="text-lg text-gray-600">
                      音: {(currentChar as JapaneseKanji).onyomi}
                    </p>
                    <p className="text-lg text-gray-600">
                      訓: {(currentChar as JapaneseKanji).kunyomi}
                    </p>
                  </div>
                )}
                <p className="text-xl text-gray-700">{currentChar.meaning}</p>
              </div>

              <div className="space-y-3">
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm mb-2"><strong>📝 Writing Tips:</strong></p>
                  <ul className="text-sm text-gray-700 space-y-1 ml-4">
                    <li>• Follow the stroke order from top to bottom</li>
                    <li>• Write from left to right</li>
                    <li>• Practice each stroke deliberately</li>
                    <li>• Maintain consistent pressure</li>
                  </ul>
                </div>

                <div className="bg-purple-50 rounded-lg p-4">
                  <p className="text-sm mb-2"><strong>Examples:</strong></p>
                  <div className="space-y-1">
                    {currentChar.examples.map((example, idx) => (
                      <p key={idx} className="text-sm">{example}</p>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm">Practice attempts:</span>
                  <Badge>{attempts}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Drawing Canvas */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Draw Here</CardTitle>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setShowGuide(!showGuide)}
                  >
                    {showGuide ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
                    {showGuide ? 'Hide' : 'Show'} Guide
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={clearCanvas}
                  >
                    <RotateCw className="w-4 h-4 mr-2" />
                    Clear
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-white rounded-lg p-4 shadow-inner">
                <canvas
                  ref={canvasRef}
                  className="border-2 border-gray-300 rounded cursor-crosshair touch-none"
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                  style={{ width: '100%', height: 'auto', maxWidth: '400px' }}
                />
              </div>

              <div className="mt-4 text-center text-sm text-gray-600">
                Use your mouse, finger, or stylus to practice writing
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Achievement */}
        {attempts >= 5 && (
          <Card className="mt-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white">
            <CardContent className="pt-6 text-center">
              <Check className="w-12 h-12 mx-auto mb-2" />
              <p className="text-xl">Great Practice! 🎉</p>
              <p className="text-sm mt-2">
                You've practiced this character {attempts} times. Keep it up!
              </p>
            </CardContent>
          </Card>
        )}

        {/* Navigation */}
        <Card className="mt-6">
          <CardContent className="pt-6">
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                className="flex-1"
              >
                Previous Character
              </Button>
              <Button
                onClick={handleNext}
                className="flex-1"
              >
                {currentIndex === characters.length - 1 ? 'Finish' : 'Next Character'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}