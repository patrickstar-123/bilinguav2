import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Trophy, Award, Star, Download, Share2 } from 'lucide-react';
import { copyToClipboard } from '../utils/clipboard';

interface OfficialCertificateProps {
  username: string;
  level: number | string;
  language: 'chinese' | 'japanese';
  score: number;
  date: string;
  totalPoints: number;
  onClose: () => void;
}

export function OfficialCertificate({ 
  username, 
  level, 
  language, 
  score, 
  date, 
  totalPoints,
  onClose 
}: OfficialCertificateProps) {
  // Format level display correctly
  const levelDisplay = language === 'chinese' 
    ? `HSK ${level}` 
    : `JLPT ${typeof level === 'string' ? level : 'N' + (6 - level)}`;
  
  const languageDisplay = language === 'chinese' ? 'Chinese (Mandarin)' : 'Japanese';
  
  // Get language flag emoji
  const languageFlag = language === 'chinese' ? '🇨🇳' : '🇯🇵';

  const downloadCertificate = () => {
    // In a real app, this would generate a PDF
    alert('Certificate download feature coming soon! 📜');
  };

  const shareCertificate = async () => {
    // In a real app, this would share to social media
    const text = `🎉 I just passed ${levelDisplay} with ${score}% on BilinguaV2! 🏆`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'BilinguaV2 Achievement',
          text: text,
        });
      } catch (error: any) {
        // User cancelled or share failed, try clipboard
        if (error.name !== 'AbortError') {
          const success = await copyToClipboard(text);
          if (success) {
            alert('Achievement text copied to clipboard! 📋');
          } else {
            alert('Unable to share. Text: ' + text);
          }
        }
      }
    } else {
      // No share API, use clipboard
      const success = await copyToClipboard(text);
      if (success) {
        alert('Achievement text copied to clipboard! 📋');
      } else {
        alert('Unable to copy. Please copy this text manually:\n\n' + text);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 dark:from-black dark:via-black dark:to-black p-4 flex items-center justify-center">
      <div className="max-w-4xl w-full">
        {/* Confetti Effect (using emojis) */}
        <div className="text-center mb-8 animate-pulse">
          <div className="text-6xl">
            🎉 🎊 🏆 ⭐ 🎓 🌟 🎯 ✨
          </div>
        </div>

        <Card className="bg-gradient-to-br from-white via-yellow-50 to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border-4 border-yellow-400 dark:border-yellow-600 shadow-2xl">
          <CardContent className="p-8 md:p-12">
            {/* Header Badge */}
            <div className="flex justify-center mb-6">
              <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-2 text-lg">
                OFFICIAL CERTIFICATE
              </Badge>
            </div>

            {/* Trophy Icon */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                  <Trophy className="w-20 h-20 text-white" />
                </div>
                <div className="absolute -top-2 -right-2">
                  <Star className="w-12 h-12 text-yellow-400 animate-spin" style={{ animationDuration: '3s' }} />
                </div>
                <div className="absolute -bottom-2 -left-2">
                  <Award className="w-12 h-12 text-orange-400 animate-pulse" />
                </div>
              </div>
            </div>

            {/* Certificate Title */}
            <div className="text-center space-y-4 mb-8">
              <h1 className="text-5xl md:text-6xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-600 dark:from-yellow-400 dark:to-orange-400">
                Certificate of Achievement
              </h1>
              <div className="h-1 w-64 mx-auto bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 rounded-full"></div>
            </div>

            {/* Certificate Body */}
            <div className="text-center space-y-6 mb-8">
              <p className="text-xl text-gray-700 dark:text-gray-300">
                This certifies that
              </p>
              
              <div className="py-4 px-8 bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-gray-700 dark:to-gray-600 rounded-lg border-2 border-yellow-300 dark:border-yellow-600">
                <p className="text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                  {username}
                </p>
              </div>

              <p className="text-xl text-gray-700 dark:text-gray-300">
                has successfully completed and passed
              </p>

              <div className="py-6 px-8 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-lg border-2 border-blue-300 dark:border-blue-600">
                <p className="text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-600 dark:from-yellow-400 dark:to-orange-400">
                  {levelDisplay} {languageDisplay}
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
                  Official Examination
                </p>
              </div>
            </div>

            {/* Performance Stats */}
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900 dark:to-emerald-900 rounded-lg p-4 text-center border-2 border-green-300 dark:border-green-600">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Score</p>
                <p className="text-3xl text-green-600 dark:text-green-400">{score}%</p>
              </div>
              
              <div className="bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900 dark:to-cyan-900 rounded-lg p-4 text-center border-2 border-blue-300 dark:border-blue-600">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Date</p>
                <p className="text-lg text-blue-600 dark:text-blue-400">{date}</p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 rounded-lg p-4 text-center border-2 border-purple-300 dark:border-purple-600">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Points Earned</p>
                <p className="text-3xl text-purple-600 dark:text-purple-400">{totalPoints}</p>
              </div>
            </div>

            {/* Performance Rating */}
            <div className="mb-8">
              <div className="bg-gradient-to-r from-yellow-200 to-orange-200 dark:from-yellow-800 dark:to-orange-800 rounded-lg p-6 text-center border-2 border-yellow-400 dark:border-yellow-600">
                <p className="text-2xl mb-2">
                  {score >= 95 ? '🌟 EXCELLENT PERFORMANCE 🌟' :
                   score >= 90 ? '⭐ OUTSTANDING ACHIEVEMENT ⭐' :
                   score >= 85 ? '✨ GREAT SUCCESS ✨' :
                   '🎯 CONGRATULATIONS 🎯'}
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {score >= 95 ? 'Near perfect score! You are a master!' :
                   score >= 90 ? 'Exceptional understanding demonstrated!' :
                   score >= 85 ? 'You have shown strong comprehension!' :
                   'You have successfully passed this level!'}
                </p>
              </div>
            </div>

            {/* Signature Line */}
            <div className="border-t-2 border-gray-300 dark:border-gray-600 pt-6 mb-8">
              <div className="grid md:grid-cols-2 gap-8 text-center">
                <div>
                  <div className="h-px bg-gray-400 dark:bg-gray-600 w-48 mx-auto mb-2"></div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">BilinguaV2 Platform</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">Official Language Certification</p>
                </div>
                <div>
                  <div className="h-px bg-gray-400 dark:bg-gray-600 w-48 mx-auto mb-2"></div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Certification Date</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">{date}</p>
                </div>
              </div>
            </div>

            {/* Certificate ID */}
            <div className="text-center mb-8">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Certificate ID: BILV2-{language.toUpperCase()}-{level}-{Date.now().toString().slice(-8)}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col md:flex-row gap-4">
              <Button
                size="lg"
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                onClick={downloadCertificate}
              >
                <Download className="w-4 h-4 mr-2" />
                Download Certificate
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                className="flex-1"
                onClick={shareCertificate}
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share Achievement
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                className="flex-1"
                onClick={onClose}
              >
                Return to Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer Message */}
        <div className="text-center mt-8">
          <p className="text-gray-600 dark:text-gray-400">
            🎓 Keep learning and advancing to the next level! 🚀
          </p>
        </div>
      </div>
    </div>
  );
}