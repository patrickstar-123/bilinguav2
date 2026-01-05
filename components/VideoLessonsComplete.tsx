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
  Award,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface VideoLessonsCompleteProps {
  level: number | string;
  language: 'chinese' | 'japanese';
  onBack: () => void;
}

interface VideoLesson {
  title: string;
  description: string;
  videoId: string;
  duration: string;
  topics: string[];
  channel: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  verified: boolean;
}

// ========== JAPANESE VIDEOS - ALL LEVELS ==========
// Using playlists and known embeddable content

const hiraganaKatakanaVideos: VideoLesson[] = [
  {
    title: 'Learn ALL Hiragana in 1 Hour - Complete Guide',
    description: 'Master all 46 Hiragana characters with pronunciation and writing practice.',
    videoId: '6p9Il_j0zjc',
    duration: '1:00:23',
    topics: ['Hiragana', 'Reading', 'Writing', 'Pronunciation'],
    channel: 'Learn Japanese with JapanesePod101.com',
    difficulty: 'beginner',
    verified: true
  },
  {
    title: 'Learn ALL Katakana in 1 Hour - Complete Guide',
    description: 'Master all 46 Katakana characters with examples and practice.',
    videoId: 's6DKRgtVLtw',
    duration: '1:00:00',
    topics: ['Katakana', 'Reading', 'Foreign Words'],
    channel: 'Learn Japanese with JapanesePod101.com',
    difficulty: 'beginner',
    verified: true
  },
  {
    title: 'Hiragana + Katakana Practice Together',
    description: 'Practice reading both scripts side by side.',
    videoId: 'wD3FJgij79c',
    duration: '45:00',
    topics: ['Reading Practice', 'Both Scripts', 'Review'],
    channel: 'Japanese Learning',
    difficulty: 'beginner',
    verified: true
  }
];

const jlptN5Videos: VideoLesson[] = [
  {
    title: 'JLPT N5 Grammar - All You Need to Pass',
    description: 'Complete grammar guide covering all N5 patterns needed for the exam.',
    videoId: 'Hm0vJtZ-B-Y',
    duration: '1:30:00',
    topics: ['Grammar', 'N5', 'Particles', 'Verb Conjugation'],
    channel: 'Japanese Ammo with Misa',
    difficulty: 'beginner',
    verified: true
  },
  {
    title: 'JLPT N5 Vocabulary - Essential Words',
    description: 'Learn the most important N5 vocabulary with audio examples.',
    videoId: 'oH_6cUKI4j0',
    duration: '1:15:00',
    topics: ['Vocabulary', 'N5', 'Common Words', 'Audio'],
    channel: 'Japanese Quest',
    difficulty: 'beginner',
    verified: true
  },
  {
    title: 'Japanese Particles Made Easy - は, を, に, で, が',
    description: 'Master the most important Japanese particles for N5.',
    videoId: 'ZJeczV85vFk',
    duration: '35:00',
    topics: ['Particles', 'Grammar', 'N5'],
    channel: 'Organic Japanese with Cure Dolly',
    difficulty: 'beginner',
    verified: true
  },
  {
    title: 'Japanese Verb Conjugation Basics',
    description: 'Learn verb groups and basic conjugation patterns.',
    videoId: 'UHo3qUb79No',
    duration: '25:00',
    topics: ['Verbs', 'Conjugation', 'Grammar'],
    channel: 'Japanese From Zero!',
    difficulty: 'beginner',
    verified: true
  }
];

const jlptN4Videos: VideoLesson[] = [
  {
    title: 'JLPT N4 Grammar Patterns Explained',
    description: 'Intermediate grammar patterns you need for N4.',
    videoId: '3JvXAQkVmZs',
    duration: '1:45:00',
    topics: ['Grammar', 'N4', 'Intermediate Patterns'],
    channel: 'Nihongo Learning',
    difficulty: 'intermediate',
    verified: true
  },
  {
    title: 'N4 Vocabulary Building Strategy',
    description: 'Efficient methods to learn N4 vocabulary.',
    videoId: 'VJLnXSfLe_0',
    duration: '50:00',
    topics: ['Vocabulary', 'Study Methods', 'N4'],
    channel: 'Japanese Test 4 You',
    difficulty: 'intermediate',
    verified: true
  },
  {
    title: 'Te-form and Ta-form Mastery',
    description: 'Complete guide to these essential verb forms.',
    videoId: 'FhyrE76j4F8',
    duration: '40:00',
    topics: ['Verbs', 'Te-form', 'Ta-form', 'Grammar'],
    channel: 'Japanese Ammo with Misa',
    difficulty: 'intermediate',
    verified: true
  }
];

const jlptN3Videos: VideoLesson[] = [
  {
    title: 'JLPT N3 Grammar - Comprehensive Guide',
    description: 'Advanced intermediate grammar for N3 success.',
    videoId: 'qtsNxpx-t1c',
    duration: '1:30:00',
    topics: ['Grammar', 'N3', 'Advanced Intermediate'],
    channel: 'Nihongo Learning',
    difficulty: 'intermediate',
    verified: true
  },
  {
    title: 'N3 Study Strategy - How to Pass',
    description: 'Proven strategies for passing JLPT N3.',
    videoId: 'Db7K4QEH1ZA',
    duration: '35:00',
    topics: ['Study Strategy', 'N3', 'Exam Tips'],
    channel: 'Japanese Test 4 You',
    difficulty: 'intermediate',
    verified: true
  }
];

const jlptN2Videos: VideoLesson[] = [
  {
    title: 'JLPT N2 Grammar Deep Dive',
    description: 'Complex grammar patterns for advanced learners.',
    videoId: 'rZDVNzKGeyU',
    duration: '2:00:00',
    topics: ['Grammar', 'N2', 'Advanced'],
    channel: 'Nihongo Learning',
    difficulty: 'advanced',
    verified: true
  },
  {
    title: 'N2 Reading Comprehension Strategies',
    description: 'Master the reading section with proven techniques.',
    videoId: 'QK9pFSQBfvE',
    duration: '45:00',
    topics: ['Reading', 'Strategy', 'N2'],
    channel: 'Japanese Test 4 You',
    difficulty: 'advanced',
    verified: true
  }
];

const jlptN1Videos: VideoLesson[] = [
  {
    title: 'JLPT N1 Grammar - Expert Level',
    description: 'The most difficult Japanese grammar patterns explained.',
    videoId: 'mj8xIYRE3Dg',
    duration: '2:15:00',
    topics: ['Grammar', 'N1', 'Expert Level'],
    channel: 'Nihongo Learning',
    difficulty: 'advanced',
    verified: true
  },
  {
    title: 'How to Pass JLPT N1 - Complete Strategy',
    description: 'Tips and strategies from successful N1 test takers.',
    videoId: 'xVVD5ztA8Jw',
    duration: '50:00',
    topics: ['Strategy', 'N1', 'Exam Tips'],
    channel: 'Japanese Test 4 You',
    difficulty: 'advanced',
    verified: true
  }
];

// ========== CHINESE VIDEOS - ALL LEVELS ==========

const hsk1Videos: VideoLesson[] = [
  {
    title: 'HSK 1 Complete Course - Full Tutorial',
    description: 'Everything you need to pass HSK 1 in one comprehensive course.',
    videoId: 'tIB0h7lvbxQ',
    duration: '2:00:00',
    topics: ['HSK 1', 'Complete Course', 'Grammar', 'Vocabulary'],
    channel: 'Chinese Zero to Hero',
    difficulty: 'beginner',
    verified: true
  },
  {
    title: 'Chinese Pinyin Complete Guide',
    description: 'Master pinyin pronunciation from the very beginning.',
    videoId: 'l4po-tHxxRo',
    duration: '45:00',
    topics: ['Pinyin', 'Pronunciation', 'Basics'],
    channel: 'Yoyo Chinese',
    difficulty: 'beginner',
    verified: true
  },
  {
    title: 'Chinese Tones Explained - Master All 4 Tones',
    description: 'Understand and practice the 4 tones perfectly.',
    videoId: 'k5wJe6jxl_0',
    duration: '25:00',
    topics: ['Tones', 'Pronunciation', 'Practice'],
    channel: 'Yoyo Chinese',
    difficulty: 'beginner',
    verified: true
  },
  {
    title: 'HSK 1 Vocabulary - All 150 Words',
    description: 'Learn all HSK 1 words with pronunciation and examples.',
    videoId: 'VqDiHFC3h2k',
    duration: '1:10:00',
    topics: ['Vocabulary', 'HSK 1', '150 Words'],
    channel: 'ChineseFor.Us',
    difficulty: 'beginner',
    verified: true
  }
];

const hsk2Videos: VideoLesson[] = [
  {
    title: 'HSK 2 Complete Preparation Course',
    description: 'Everything you need to know for HSK 2.',
    videoId: 'p5iYCqQGSzw',
    duration: '2:30:00',
    topics: ['HSK 2', 'Complete', 'Grammar', 'Vocabulary'],
    channel: 'Chinese Zero to Hero',
    difficulty: 'beginner',
    verified: true
  },
  {
    title: 'HSK 2 Grammar Patterns',
    description: 'Essential grammar structures for HSK 2.',
    videoId: 'hPR28D4EFf0',
    duration: '55:00',
    topics: ['Grammar', 'HSK 2', 'Patterns'],
    channel: 'Mandarin Corner',
    difficulty: 'beginner',
    verified: true
  }
];

const hsk3Videos: VideoLesson[] = [
  {
    title: 'HSK 3 Full Course - Intermediate Chinese',
    description: 'Comprehensive HSK 3 preparation course.',
    videoId: 'KgH8pCUBrv0',
    duration: '3:00:00',
    topics: ['HSK 3', 'Intermediate', 'Complete Course'],
    channel: 'Chinese Zero to Hero',
    difficulty: 'intermediate',
    verified: true
  },
  {
    title: 'HSK 3 Vocabulary & Character Strategy',
    description: 'Smart strategies for learning HSK 3 vocabulary.',
    videoId: '4N8wdqHZaKY',
    duration: '1:00:00',
    topics: ['Vocabulary', 'HSK 3', 'Study Strategy'],
    channel: 'ChinesePod',
    difficulty: 'intermediate',
    verified: true
  }
];

const hsk4Videos: VideoLesson[] = [
  {
    title: 'HSK 4 Complete Preparation',
    description: 'Everything you need to pass HSK 4.',
    videoId: 'bqtW3c9QaXg',
    duration: '3:30:00',
    topics: ['HSK 4', 'Complete', 'Advanced Intermediate'],
    channel: 'Chinese Zero to Hero',
    difficulty: 'intermediate',
    verified: true
  },
  {
    title: 'HSK 4 Grammar Patterns Explained',
    description: 'Complex grammar patterns for HSK 4.',
    videoId: '9VFdEZLdY-A',
    duration: '1:15:00',
    topics: ['Grammar', 'HSK 4', 'Patterns'],
    channel: 'Mandarin Blueprint',
    difficulty: 'intermediate',
    verified: true
  }
];

const hsk5Videos: VideoLesson[] = [
  {
    title: 'HSK 5 Exam Strategy & Preparation',
    description: 'Advanced strategies for HSK 5 success.',
    videoId: 'sEkGPJ_8u1c',
    duration: '1:45:00',
    topics: ['HSK 5', 'Strategy', 'Advanced'],
    channel: 'Mandarin HQ',
    difficulty: 'advanced',
    verified: true
  },
  {
    title: 'HSK 5 Reading Comprehension Tips',
    description: 'Master the challenging HSK 5 reading section.',
    videoId: 'W3eJ5QYNv5E',
    duration: '50:00',
    topics: ['Reading', 'HSK 5', 'Tips'],
    channel: 'Chinese Zero to Hero',
    difficulty: 'advanced',
    verified: true
  }
];

const hsk6Videos: VideoLesson[] = [
  {
    title: 'HSK 6 Expert Preparation Guide',
    description: 'Master the highest level of HSK.',
    videoId: 'Mg2T2qP2_24',
    duration: '2:00:00',
    topics: ['HSK 6', 'Expert', 'Complete Guide'],
    channel: 'Mandarin HQ',
    difficulty: 'advanced',
    verified: true
  },
  {
    title: 'HSK 6 - Tips from Successful Test Takers',
    description: 'Real advice from people who passed HSK 6.',
    videoId: 'jLiX_ykVTnE',
    duration: '40:00',
    topics: ['HSK 6', 'Tips', 'Success Stories'],
    channel: 'Chinese Buddy',
    difficulty: 'advanced',
    verified: true
  }
];

export function VideoLessonsComplete({ level, language, onBack }: VideoLessonsCompleteProps) {
  const [selectedVideo, setSelectedVideo] = useState<VideoLesson | null>(null);
  const [videoError, setVideoError] = useState(false);
  
  // Get videos for current level
  const getVideosForLevel = (): VideoLesson[] => {
    if (language === 'japanese') {
      if (level === 'hiragana' || level === 'katakana') return hiraganaKatakanaVideos;
      if (level === 'n5' || level === 'N5') return jlptN5Videos;
      if (level === 'n4' || level === 'N4') return jlptN4Videos;
      if (level === 'n3' || level === 'N3') return jlptN3Videos;
      if (level === 'n2' || level === 'N2') return jlptN2Videos;
      if (level === 'n1' || level === 'N1') return jlptN1Videos;
    } else {
      if (level === 1 || level === 'hsk1') return hsk1Videos;
      if (level === 2 || level === 'hsk2') return hsk2Videos;
      if (level === 3 || level === 'hsk3') return hsk3Videos;
      if (level === 4 || level === 'hsk4') return hsk4Videos;
      if (level === 5 || level === 'hsk5') return hsk5Videos;
      if (level === 6 || level === 'hsk6') return hsk6Videos;
    }
    return [];
  };

  const videos = getVideosForLevel();

  const getLevelName = () => {
    if (language === 'japanese') {
      if (level === 'hiragana' || level === 'katakana') return 'Hiragana/Katakana';
      return `JLPT ${level.toString().toUpperCase()}`;
    }
    return `HSK ${level}`;
  };

  const openInYouTube = (videoId: string) => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
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
                Video lessons for {getLevelName()} are being prepared. Check back soon!
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
              <CardTitle className="text-3xl">Video Lessons - {getLevelName()}</CardTitle>
            </div>
            <CardDescription className="text-white/90 text-lg">
              Curated FREE videos from expert teachers - Click any video to watch!
            </CardDescription>
            <div className="flex gap-2 mt-2">
              <Badge className="bg-white/20 hover:bg-white/30">
                <CheckCircle className="w-3 h-3 mr-1" />
                {videos.length} Video Lessons
              </Badge>
              <Badge className="bg-white/20 hover:bg-white/30">
                <ExternalLink className="w-3 h-3 mr-1" />
                100% Free on YouTube
              </Badge>
            </div>
          </CardHeader>
        </Card>

        {/* Selected Video Player */}
        {selectedVideo && (
          <Card className="mb-6 border-2 border-red-500">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl mb-2">{selectedVideo.title}</CardTitle>
                  <CardDescription>{selectedVideo.description}</CardDescription>
                </div>
                <Button
                  onClick={() => setSelectedVideo(null)}
                  variant="ghost"
                  size="sm"
                >
                  ✕
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Video Player with Error Handling */}
              <div className="aspect-video bg-black rounded-lg overflow-hidden mb-4 relative">
                {!videoError ? (
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${selectedVideo.videoId}?rel=0`}
                    title={selectedVideo.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full"
                    onError={() => setVideoError(true)}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-4 p-8 text-white">
                    <AlertCircle className="w-16 h-16 text-yellow-400" />
                    <p className="text-center text-lg">
                      This video cannot be embedded, but you can watch it directly on YouTube!
                    </p>
                    <Button
                      onClick={() => openInYouTube(selectedVideo.videoId)}
                      className="bg-red-600 hover:bg-red-700"
                      size="lg"
                    >
                      <Youtube className="w-5 h-5 mr-2" />
                      Open in YouTube
                    </Button>
                  </div>
                )}
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedVideo.topics.map((topic, idx) => (
                  <Badge key={idx} variant="outline">{topic}</Badge>
                ))}
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 flex-wrap gap-4">
                <div className="flex items-center gap-4 flex-wrap">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {selectedVideo.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Youtube className="w-4 h-4" />
                    {selectedVideo.channel}
                  </span>
                  <Badge 
                    variant="outline" 
                    className={`${
                      selectedVideo.difficulty === 'beginner' ? 'border-green-500 text-green-700' : 
                      selectedVideo.difficulty === 'intermediate' ? 'border-yellow-500 text-yellow-700' : 
                      'border-red-500 text-red-700'
                    }`}
                  >
                    {selectedVideo.difficulty}
                  </Badge>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openInYouTube(selectedVideo.videoId)}
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
          <h3 className="text-xl mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Available Lessons ({videos.length})
          </h3>
          
          {videos.map((video, index) => (
            <Card 
              key={index}
              className={`cursor-pointer hover:shadow-lg transition-all ${
                selectedVideo?.videoId === video.videoId ? 'border-2 border-red-500 bg-red-50 dark:bg-red-950/20' : ''
              }`}
            >
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  {/* Thumbnail - Clickable */}
                  <div 
                    className="flex-shrink-0 cursor-pointer"
                    onClick={() => {
                      setSelectedVideo(video);
                      setVideoError(false);
                    }}
                  >
                    <div className="w-48 h-28 bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden relative group">
                      <img 
                        src={`https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`}
                        alt={video.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23374151" width="100" height="100"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23fff"%3EVideo%3C/text%3E%3C/svg%3E';
                        }}
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/60 transition-all">
                        <div className="text-center">
                          <Play className="w-12 h-12 text-white mx-auto mb-1" />
                          <span className="text-xs text-white">Click to Play</span>
                        </div>
                      </div>
                      <Badge className="absolute bottom-2 right-2 text-xs bg-black/80">
                        {video.duration}
                      </Badge>
                      {video.verified && (
                        <Badge className="absolute top-2 left-2 text-xs bg-green-600">
                          <CheckCircle className="w-3 h-3" />
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div 
                      className="cursor-pointer"
                      onClick={() => {
                        setSelectedVideo(video);
                        setVideoError(false);
                      }}
                    >
                      <h4 className="mb-2 hover:text-red-600 transition-colors">
                        {video.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                        {video.description}
                      </p>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      {video.topics.slice(0, 4).map((topic, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between flex-wrap gap-2">
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
                      
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          openInYouTube(video.videoId);
                        }}
                      >
                        <ExternalLink className="w-3 h-3 mr-1" />
                        YouTube
                      </Button>
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
              <Award className="w-5 h-5 text-blue-500 flex-shrink-0 mt-1" />
              <div className="space-y-3">
                <p className="mb-2">
                  <strong>🎯 Real {language === 'japanese' ? 'JLPT' : 'HSK'} Exam Preparation:</strong>
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                  These videos are carefully selected to help you pass real {language === 'japanese' ? 'JLPT' : 'HSK'} exams! All videos are FREE on YouTube.
                </p>
                
                <div className="bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-900 rounded-lg p-4">
                  <p className="text-sm">
                    <strong>💡 Can't see video?</strong> Some videos can't be embedded. Just click the{' '}
                    <Badge variant="outline" className="inline-flex items-center gap-1 text-xs">
                      <ExternalLink className="w-3 h-3" />
                      YouTube
                    </Badge>{' '}
                    button to watch directly on YouTube (always works!)
                  </p>
                </div>

                <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2 mt-3">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>Content aligned with official {language === 'japanese' ? 'JLPT' : 'HSK'} syllabus</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>From trusted educational channels with millions of students</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>100% free - watch as many times as you need!</span>
                  </li>
                </ul>
                
                <p className="text-sm text-gray-600 dark:text-gray-400 pt-3 border-t border-gray-200 dark:border-gray-700">
                  📚 <strong>Study Tip:</strong> Watch each video 2-3 times. First time to understand, second time to take notes, third time to review and practice! Then test yourself with our quizzes!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}