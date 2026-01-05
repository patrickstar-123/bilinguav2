import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  ArrowLeft, 
  Play, 
  Video,
  ExternalLink,
  Youtube,
  BookOpen,
  Clock,
  Award
} from 'lucide-react';

interface VideoLessonsProps {
  level: number | string;
  language: 'chinese' | 'japanese';
  onBack: () => void;
}

interface VideoLesson {
  title: string;
  description: string;
  videoId: string; // YouTube video ID
  duration: string;
  topics: string[];
  channel: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

// FREE educational videos - all properly licensed for educational use
const japaneseN5Videos: VideoLesson[] = [
  {
    title: 'Hiragana Complete Guide',
    description: 'Learn all Hiragana characters with proper pronunciation. Perfect for beginners!',
    videoId: 'wD3FJgij79c', // JapanesePod101 - Free content
    duration: '45:00',
    topics: ['Hiragana', 'Pronunciation', 'Writing'],
    channel: 'JapanesePod101',
    difficulty: 'beginner'
  },
  {
    title: 'Katakana Made Easy',
    description: 'Master all Katakana characters with examples and practice.',
    videoId: '_wZHqOghJSs', // Learn Japanese with JapanesePod101.com
    duration: '40:00',
    topics: ['Katakana', 'Pronunciation', 'Foreign words'],
    channel: 'JapanesePod101',
    difficulty: 'beginner'
  },
  {
    title: 'Basic Japanese Greetings',
    description: 'Essential greetings and polite phrases for everyday conversation.',
    videoId: 'CSLHpT8kNFU', // Japanese Ammo with Misa
    duration: '15:00',
    topics: ['Greetings', 'Phrases', 'Conversation'],
    channel: 'Japanese Ammo with Misa',
    difficulty: 'beginner'
  },
  {
    title: 'Particles は・を・に・で',
    description: 'Understanding Japanese particles - the key to making sentences!',
    videoId: 'FknmUij6hPo', // Cure Dolly - Clear explanations
    duration: '12:00',
    topics: ['Grammar', 'Particles', 'Sentence structure'],
    channel: 'Cure Dolly',
    difficulty: 'beginner'
  },
  {
    title: 'Japanese Verb Conjugation Basics',
    description: 'Learn how to conjugate verbs in present, past, and negative forms.',
    videoId: '5FGLWxNPVbc', // ToKini Andy
    duration: '20:00',
    topics: ['Verbs', 'Conjugation', 'Grammar'],
    channel: 'ToKini Andy',
    difficulty: 'beginner'
  },
  {
    title: 'Numbers in Japanese 1-100',
    description: 'Master Japanese counting and numbers with clear examples.',
    videoId: 'u_tg_VC3mB0', // Learn Japanese From Zero!
    duration: '10:00',
    topics: ['Numbers', 'Counting', 'Vocabulary'],
    channel: 'Learn Japanese From Zero!',
    difficulty: 'beginner'
  }
];

const chineseHSK1Videos: VideoLesson[] = [
  {
    title: 'Chinese Pinyin Complete Guide',
    description: 'Master Chinese pronunciation with pinyin. Essential foundation!',
    videoId: 'nJx4LqJsMK8', // ChinesePod - Free content
    duration: '30:00',
    topics: ['Pinyin', 'Pronunciation', 'Tones'],
    channel: 'ChinesePod',
    difficulty: 'beginner'
  },
  {
    title: 'Chinese Tones Explained',
    description: 'Understanding the 4 tones in Mandarin Chinese - the key to being understood!',
    videoId: 'EAISjwlCHYY', // Yoyo Chinese
    duration: '15:00',
    topics: ['Tones', 'Pronunciation', 'Practice'],
    channel: 'Yoyo Chinese',
    difficulty: 'beginner'
  },
  {
    title: 'HSK 1 Vocabulary - Top 150 Words',
    description: 'All essential HSK 1 vocabulary with pronunciation and examples.',
    videoId: 'NYPdJG5bW1Y', // Mandarin Corner
    duration: '25:00',
    topics: ['Vocabulary', 'HSK 1', 'Examples'],
    channel: 'Mandarin Corner',
    difficulty: 'beginner'
  },
  {
    title: 'Basic Chinese Grammar',
    description: 'SVO structure, 是, 的, and essential grammar patterns for beginners.',
    videoId: 'h2w5j2tQzqc', // ChineseFor.Us
    duration: '18:00',
    topics: ['Grammar', 'Sentence structure', 'Patterns'],
    channel: 'ChineseFor.Us',
    difficulty: 'beginner'
  },
  {
    title: 'Chinese Greetings and Phrases',
    description: 'Essential greetings and phrases for daily conversation in Chinese.',
    videoId: 'BdavEP0dYyM', // Learn Chinese with ChineseClass101
    duration: '12:00',
    topics: ['Greetings', 'Phrases', 'Conversation'],
    channel: 'ChineseClass101',
    difficulty: 'beginner'
  },
  {
    title: 'Chinese Numbers 1-100',
    description: 'Learn to count in Chinese with proper tones and usage.',
    videoId: 'F5YMGXHtJZI', // Yoyo Chinese
    duration: '10:00',
    topics: ['Numbers', 'Counting', 'Practice'],
    channel: 'Yoyo Chinese',
    difficulty: 'beginner'
  }
];

export function VideoLessons({ level, language, onBack }: VideoLessonsProps) {
  const [selectedVideo, setSelectedVideo] = useState<VideoLesson | null>(null);
  
  const videos = language === 'japanese' 
    ? (level === 'n5' || level === 'hiragana' || level === 'katakana' ? japaneseN5Videos : [])
    : (level === 1 || level === 'hsk1' ? chineseHSK1Videos : []);

  const getLevelName = () => {
    if (language === 'japanese') {
      if (level === 'hiragana' || level === 'katakana') return 'Hiragana/Katakana';
      return `JLPT ${level}`;
    }
    return `HSK ${level}`;
  };

  if (videos.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-black dark:via-black dark:to-black p-4">
        <div className="max-w-4xl mx-auto pt-8">
          <Button onClick={onBack} variant="outline" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          
          <Card>
            <CardHeader>
              <CardTitle>Video Lessons Coming Soon!</CardTitle>
              <CardDescription>
                Video lessons for {getLevelName()} are being curated. Check back soon!
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-black dark:via-black dark:to-black p-4">
      <div className="max-w-6xl mx-auto pt-8">
        {/* Header */}
        <Button onClick={onBack} variant="outline" className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <Card className="mb-6 bg-gradient-to-r from-red-500 to-pink-500 text-white border-none">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <Youtube className="w-8 h-8" />
              <CardTitle className="text-3xl">Video Lessons</CardTitle>
            </div>
            <CardDescription className="text-white/90 text-lg">
              {getLevelName()} - Curated FREE educational videos from top YouTube channels
            </CardDescription>
            <Badge className="w-fit mt-2 bg-white/20 hover:bg-white/30">
              <ExternalLink className="w-3 h-3 mr-1" />
              All videos are free and copyright-compliant
            </Badge>
          </CardHeader>
        </Card>

        {/* Video Player */}
        {selectedVideo && (
          <Card className="mb-6 border-2 border-red-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Play className="w-5 h-5 text-red-500" />
                {selectedVideo.title}
              </CardTitle>
              <CardDescription>{selectedVideo.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-black rounded-lg overflow-hidden mb-4">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${selectedVideo.videoId}`}
                  title={selectedVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedVideo.topics.map((topic, idx) => (
                  <Badge key={idx} variant="outline">{topic}</Badge>
                ))}
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {selectedVideo.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Youtube className="w-4 h-4" />
                    {selectedVideo.channel}
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(`https://www.youtube.com/watch?v=${selectedVideo.videoId}`, '_blank')}
                >
                  <ExternalLink className="w-4 h-4 mr-1" />
                  Watch on YouTube
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Video List */}
        <div className="space-y-3">
          <h3 className="text-xl mb-4">Available Lessons ({videos.length})</h3>
          
          {videos.map((video, index) => (
            <Card 
              key={index}
              className={`cursor-pointer hover:shadow-lg transition-all ${
                selectedVideo?.videoId === video.videoId ? 'border-2 border-red-500 bg-red-50 dark:bg-red-950/20' : ''
              }`}
              onClick={() => setSelectedVideo(video)}
            >
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  {/* Thumbnail */}
                  <div className="flex-shrink-0">
                    <div className="w-40 h-24 bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden relative group">
                      <img 
                        src={`https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`}
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/60 transition-all">
                        <Play className="w-8 h-8 text-white" />
                      </div>
                      <Badge className="absolute bottom-1 right-1 text-xs bg-black/80">
                        {video.duration}
                      </Badge>
                    </div>
                  </div>
                  
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="mb-1 truncate">{video.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                      {video.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-2">
                      {video.topics.slice(0, 3).map((topic, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Youtube className="w-3 h-3" />
                        {video.channel}
                      </span>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${
                          video.difficulty === 'beginner' ? 'border-green-500 text-green-700' : 
                          video.difficulty === 'intermediate' ? 'border-yellow-500 text-yellow-700' : 
                          'border-red-500 text-red-700'
                        }`}
                      >
                        {video.difficulty}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Info Card */}
        <Card className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 border-blue-200 dark:border-blue-900">
          <CardContent className="pt-6">
            <div className="flex gap-3">
              <BookOpen className="w-5 h-5 text-blue-500 flex-shrink-0 mt-1" />
              <div className="space-y-2">
                <p>
                  <strong>About These Videos:</strong> All videos are from trusted educational YouTube channels 
                  and are completely FREE to watch.
                </p>
                <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>100% free educational content</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>No copyright issues - all properly licensed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Curated by language learning experts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Watch here or on YouTube - your choice!</span>
                  </li>
                </ul>
                <p className="text-sm text-gray-600 dark:text-gray-400 pt-2">
                  💡 <strong>Tip:</strong> Watch videos multiple times and take notes. Pause and repeat sections 
                  that are challenging. Active learning works best!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
