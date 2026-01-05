import { motion } from 'motion/react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  ArrowLeft, 
  BookOpen, 
  Brain, 
  GraduationCap, 
  Lock, 
  CheckCircle,
  Zap,
  Video,
  FileText,
  Sparkles,
  Trophy,
  Target
} from 'lucide-react';
import { getLevelProgress, canTakeExam } from '../utils/progressTypes';
import { hskLevelInfo } from '../utils/hskData';
import { jlptLevelInfo } from '../utils/japaneseData';

interface LevelMenuProps {
  level: number | string;
  language: 'chinese' | 'japanese';
  userProgress: any;
  onBack: () => void;
  onSelectActivity: (activity: 'vocabulary' | 'exercise' | 'exam' | 'study' | 'grammar' | 'videos', level: number | string) => void;
}

export function LevelMenuNew({ level, language, userProgress, onBack, onSelectActivity }: LevelMenuProps) {
  const levelInfo = language === 'chinese' ? hskLevelInfo : jlptLevelInfo;
  const info = levelInfo[level];
  const progress = getLevelProgress(userProgress, level);
  const canExam = canTakeExam(userProgress, level);

  const completedActivities = progress.completedActivities || 0;
  const progressPercentage = Math.round((completedActivities / 3) * 100) || 0;

  const getLevelDisplayName = () => {
    if (language === 'chinese') {
      return `HSK ${level}`;
    } else {
      if (level === 'hiragana') return 'Hiragana';
      if (level === 'katakana') return 'Katakana';
      return `JLPT ${level}`;
    }
  };

  // Activity cards configuration with beautiful gradients
  const activities = [
    {
      id: 'study',
      title: 'Study Materials',
      description: 'Interactive lessons and flashcards',
      icon: BookOpen,
      gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
      bgGradient: 'from-emerald-50 to-cyan-50 dark:from-emerald-950/30 dark:to-cyan-950/30',
      borderColor: 'border-emerald-200 dark:border-emerald-800',
      isCompleted: progress.vocabularyTestCompleted,
      isLocked: false,
      delay: 0,
    },
    {
      id: 'grammar',
      title: 'Grammar Guide',
      description: 'Grammar patterns and examples',
      icon: Brain,
      gradient: 'from-blue-500 via-indigo-500 to-violet-500',
      bgGradient: 'from-blue-50 to-violet-50 dark:from-blue-950/30 dark:to-violet-950/30',
      borderColor: 'border-blue-200 dark:border-blue-800',
      isCompleted: false,
      isLocked: false,
      delay: 0.1,
    },
    {
      id: 'videos',
      title: 'Video Lessons',
      description: 'Native speaker videos & pronunciation',
      icon: Video,
      gradient: 'from-red-500 via-rose-500 to-pink-500',
      bgGradient: 'from-red-50 to-pink-50 dark:from-red-950/30 dark:to-pink-950/30',
      borderColor: 'border-red-200 dark:border-red-800',
      isCompleted: false,
      isLocked: false,
      delay: 0.2,
    },
    {
      id: 'exercise',
      title: 'Practice Quiz',
      description: '70% passing grade • Unlimited retakes',
      icon: Zap,
      gradient: 'from-purple-500 via-fuchsia-500 to-pink-500',
      bgGradient: 'from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30',
      borderColor: 'border-purple-200 dark:border-purple-800',
      isCompleted: progress.quizCompleted,
      isLocked: false,
      delay: 0.3,
      badge: '70%',
      badgeColor: 'bg-purple-500',
    },
    {
      id: 'exam',
      title: 'Official Exam',
      description: '80% passing • 30 questions • Get Certificate',
      icon: GraduationCap,
      gradient: 'from-amber-500 via-orange-500 to-red-500',
      bgGradient: 'from-amber-50 to-red-50 dark:from-amber-950/30 dark:to-red-950/30',
      borderColor: 'border-amber-200 dark:border-amber-800',
      isCompleted: progress.examPassed,
      isLocked: !canExam,
      delay: 0.4,
      badge: '80%',
      badgeColor: 'bg-orange-500',
    },
    {
      id: 'vocabulary',
      title: 'Old Vocabulary',
      description: 'Legacy vocabulary practice (Optional)',
      icon: FileText,
      gradient: 'from-gray-400 via-gray-500 to-slate-600',
      bgGradient: 'from-gray-50 to-slate-50 dark:from-gray-950/30 dark:to-slate-950/30',
      borderColor: 'border-gray-200 dark:border-gray-800',
      isCompleted: false,
      isLocked: false,
      delay: 0.5,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
      },
    },
  };

  const cardHoverVariants = {
    rest: { 
      scale: 1,
      y: 0,
    },
    hover: { 
      scale: 1.03,
      y: -8,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 20,
      },
    },
    tap: {
      scale: 0.98,
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-black dark:via-gray-900 dark:to-black p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Back Button with animation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Button 
            onClick={onBack} 
            variant="outline"
            className="mb-6 gap-2 hover:gap-3 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
        </motion.div>

        {/* Animated Header Card */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 200,
            damping: 20,
          }}
        >
          <Card className="mb-6 border-2 shadow-2xl bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 text-white border-purple-400 overflow-hidden relative">
            {/* Animated background pattern */}
            <motion.div 
              className="absolute inset-0 opacity-10"
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%'],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              style={{
                backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                backgroundSize: '50px 50px',
              }}
            />
            
            <CardContent className="pt-6 relative z-10">
              <div className="flex flex-col md:flex-row items-start justify-between gap-6">
                <div className="flex-1">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Badge className="bg-white/20 hover:bg-white/30 border-white/40 mb-3 text-white">
                      {getLevelDisplayName()}
                    </Badge>
                  </motion.div>
                  
                  <motion.h1 
                    className="text-4xl mb-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {info.name}
                  </motion.h1>
                  
                  <motion.p 
                    className="text-white/90 mb-4 text-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    {language === 'chinese' 
                      ? `${info.totalWords} words • ${info.hanziCount} characters`
                      : level === 'hiragana' || level === 'katakana'
                      ? `${info.totalWords} characters`
                      : `${info.totalWords} words • ${info.kanjiCount} kanji`
                    }
                  </motion.p>

                  {/* Activity Status Pills */}
                  <motion.div 
                    className="flex flex-wrap gap-2 mb-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Badge variant="secondary" className={`${progress.quizCompleted ? 'bg-green-500 text-white' : 'bg-white/20 text-white'} border-white/40`}>
                      {progress.quizCompleted && <CheckCircle className="w-3 h-3 mr-1" />}
                      Quiz {progress.quizCompleted && '✓'}
                    </Badge>
                    <Badge variant="secondary" className={`${progress.examPassed ? 'bg-green-500 text-white' : 'bg-white/20 text-white'} border-white/40`}>
                      {progress.examPassed && <CheckCircle className="w-3 h-3 mr-1" />}
                      Exam {progress.examPassed && '✓'}
                    </Badge>
                  </motion.div>
                </div>

                {/* Progress Circle */}
                <motion.div 
                  className="flex flex-col items-center"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                    delay: 0.4,
                  }}
                >
                  <div className="relative w-32 h-32">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="rgba(255,255,255,0.2)"
                        strokeWidth="8"
                        fill="none"
                      />
                      <motion.circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="white"
                        strokeWidth="8"
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={`${2 * Math.PI * 56}`}
                        initial={{ strokeDashoffset: 2 * Math.PI * 56 }}
                        animate={{ 
                          strokeDashoffset: 2 * Math.PI * 56 * (1 - progressPercentage / 100),
                        }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <motion.div 
                        className="text-4xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                      >
                        {progressPercentage}%
                      </motion.div>
                      <div className="text-xs text-white/80">Complete</div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Progress Bar */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                style={{ transformOrigin: 'left' }}
              >
                <Progress 
                  value={progressPercentage} 
                  className="h-3 bg-white/20 mt-4"
                />
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Learning Path Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl p-4 text-white shadow-lg"
        >
          <div className="flex items-center gap-3 justify-center flex-wrap">
            <Sparkles className="w-5 h-5" />
            <p className="text-sm sm:text-base">
              <span className="opacity-90">Recommended Path:</span>
              <span className="mx-2">📚 Study</span>
              <span className="opacity-50">→</span>
              <span className="mx-2">🧠 Quiz (70%)</span>
              <span className="opacity-50">→</span>
              <span className="mx-2">🎓 Exam (80%)</span>
              <span className="opacity-50">→</span>
              <span className="mx-2">🏆 Certificate!</span>
            </p>
          </div>
        </motion.div>

        {/* Activity Cards Grid with stagger animation */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {activities.map((activity) => {
            const Icon = activity.icon;
            const isLocked = activity.isLocked;

            return (
              <motion.div
                key={activity.id}
                variants={itemVariants}
                whileHover={!isLocked ? "hover" : "rest"}
                whileTap={!isLocked ? "tap" : "rest"}
                custom={activity.delay}
              >
                <motion.div
                  variants={cardHoverVariants}
                  initial="rest"
                  className={`relative h-full ${isLocked ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  onClick={() => !isLocked && onSelectActivity(activity.id as any, level)}
                >
                  <Card className={`h-full border-2 shadow-lg transition-shadow duration-300 bg-gradient-to-br ${activity.bgGradient} ${activity.borderColor} overflow-hidden relative group`}>
                    {/* Gradient overlay on hover */}
                    <motion.div 
                      className={`absolute inset-0 bg-gradient-to-br ${activity.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                    />
                    
                    {/* Lock overlay */}
                    {isLocked && (
                      <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-[2px] z-10 flex items-center justify-center">
                        <div className="text-center">
                          <Lock className="w-12 h-12 text-white mx-auto mb-2" />
                          <p className="text-white text-sm px-4">Complete Quiz first</p>
                        </div>
                      </div>
                    )}

                    <CardContent className="pt-6 relative">
                      <div className="flex items-start justify-between mb-4">
                        {/* Icon with gradient */}
                        <motion.div 
                          className={`w-14 h-14 rounded-xl bg-gradient-to-br ${activity.gradient} flex items-center justify-center shadow-lg`}
                          whileHover={{ rotate: 360, scale: 1.1 }}
                          transition={{ duration: 0.5 }}
                        >
                          <Icon className="w-7 h-7 text-white" />
                        </motion.div>

                        {/* Badges */}
                        <div className="flex flex-col gap-2 items-end">
                          {activity.badge && (
                            <Badge className={`${activity.badgeColor} text-white border-none`}>
                              {activity.badge}
                            </Badge>
                          )}
                          {activity.isCompleted && (
                            <motion.div
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{ scale: 1, rotate: 0 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              <CheckCircle className="w-6 h-6 text-green-500" />
                            </motion.div>
                          )}
                        </div>
                      </div>

                      <h3 className="text-xl mb-2">{activity.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        {activity.description}
                      </p>

                      {/* Action indicator */}
                      <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {activity.isCompleted ? 'Completed ✓' : isLocked ? 'Locked 🔒' : 'Click to start'}
                        </span>
                        {!isLocked && (
                          <motion.div
                            animate={{ x: [0, 4, 0] }}
                            transition={{ 
                              repeat: Infinity, 
                              duration: 1.5,
                              ease: "easeInOut",
                            }}
                          >
                            <Target className="w-4 h-4 text-gray-400" />
                          </motion.div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-6"
        >
          <Card className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border-amber-200 dark:border-amber-800">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Trophy className="w-5 h-5 text-amber-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-amber-900 dark:text-amber-100 mb-1">
                    Level Completion Requirements
                  </h4>
                  <p className="text-sm text-amber-800 dark:text-amber-200">
                    • Pass Practice Quiz with ≥70% to unlock Official Exam
                    <br />
                    • Pass Official Exam with ≥80% (24/30 questions) to get Certificate
                    <br />
                    • Complete all activities to unlock the next level
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
