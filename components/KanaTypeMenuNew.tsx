import { motion } from 'motion/react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ArrowLeft, BookOpen, Zap, Star, Sparkles } from 'lucide-react';

interface KanaTypeMenuProps {
  kanaType: 'hiragana' | 'katakana';
  userProgress: any;
  onBack: () => void;
  onSelectType: (subType: 'all' | 'basic' | 'dakuten' | 'yoon') => void;
}

export function KanaTypeMenuNew({ kanaType, userProgress, onBack, onSelectType }: KanaTypeMenuProps) {
  const isHiragana = kanaType === 'hiragana';
  
  const typeOptions = [
    {
      id: 'all' as const,
      icon: BookOpen,
      title: 'All Characters',
      description: isHiragana 
        ? 'Learn all 104 Hiragana characters (Basic + Dakuten + Yōon)'
        : 'Learn all 104 Katakana characters (Basic + Dakuten + Yōon)',
      count: 104,
      gradient: 'from-purple-500 via-fuchsia-500 to-pink-500',
      bgGradient: 'from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30',
      borderColor: 'border-purple-200 dark:border-purple-800',
      recommended: true,
      delay: 0,
    },
    {
      id: 'basic' as const,
      icon: Star,
      title: 'Basic (Gojūon)',
      description: isHiragana
        ? 'The 46 fundamental Hiragana characters'
        : 'The 46 fundamental Katakana characters',
      count: 46,
      gradient: 'from-blue-500 via-cyan-500 to-teal-500',
      bgGradient: 'from-blue-50 to-teal-50 dark:from-blue-950/30 dark:to-teal-950/30',
      borderColor: 'border-blue-200 dark:border-blue-800',
      recommended: false,
      delay: 0.1,
    },
    {
      id: 'dakuten' as const,
      icon: Zap,
      title: 'Dakuten & Handakuten',
      description: isHiragana
        ? 'Characters with diacritical marks (゛and ゜) - 25 characters'
        : 'Characters with diacritical marks (゛and ゜) - 25 characters',
      count: 25,
      gradient: 'from-orange-500 via-amber-500 to-yellow-500',
      bgGradient: 'from-orange-50 to-yellow-50 dark:from-orange-950/30 dark:to-yellow-950/30',
      borderColor: 'border-orange-200 dark:border-orange-800',
      recommended: false,
      delay: 0.2,
    },
    {
      id: 'yoon' as const,
      icon: Sparkles,
      title: 'Yōon (Combinations)',
      description: isHiragana
        ? 'Combination characters (きゃ, しゅ, ちょ, etc.) - 33 characters'
        : 'Combination characters (キャ, シュ, チョ, etc.) - 33 characters',
      count: 33,
      gradient: 'from-green-500 via-emerald-500 to-teal-500',
      bgGradient: 'from-green-50 to-teal-50 dark:from-green-950/30 dark:to-teal-950/30',
      borderColor: 'border-green-200 dark:border-green-800',
      recommended: false,
      delay: 0.3,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.9,
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
      scale: 1.05,
      y: -12,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 20,
      },
    },
    tap: {
      scale: 0.97,
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-black dark:via-gray-900 dark:to-black p-4 sm:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
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
            Back to Level Menu
          </Button>
        </motion.div>

        {/* Header Card */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 200,
            damping: 20,
          }}
        >
          <Card className="mb-8 border-2 shadow-2xl bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 text-white border-purple-400 overflow-hidden relative">
            {/* Animated background */}
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
                backgroundImage: 'radial-gradient(circle, white 2px, transparent 2px)',
                backgroundSize: '40px 40px',
              }}
            />

            <CardContent className="pt-8 pb-8 relative z-10">
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                >
                  <Badge className="bg-white/20 hover:bg-white/30 border-white/40 mb-4 text-base px-4 py-1">
                    {isHiragana ? 'Hiragana' : 'Katakana'} Learning
                  </Badge>
                </motion.div>
                
                <motion.h1 
                  className="text-5xl mb-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {isHiragana ? 'ひらがな' : 'カタカナ'}
                </motion.h1>
                
                <motion.p 
                  className="text-white/90 text-lg max-w-2xl mx-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  Choose which type of characters you want to study
                </motion.p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Info Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-6 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-xl p-4 text-white shadow-lg"
        >
          <div className="flex items-center gap-3 justify-center text-center">
            <Sparkles className="w-5 h-5 flex-shrink-0" />
            <p className="text-sm sm:text-base">
              Master these characters before advancing to JLPT levels!
            </p>
          </div>
        </motion.div>

        {/* Type Selection Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 gap-6"
        >
          {typeOptions.map((option) => {
            const Icon = option.icon;
            
            return (
              <motion.div
                key={option.id}
                variants={itemVariants}
                whileHover="hover"
                whileTap="tap"
                custom={option.delay}
              >
                <motion.div
                  variants={cardHoverVariants}
                  initial="rest"
                  className="cursor-pointer h-full"
                  onClick={() => onSelectType(option.id)}
                >
                  <Card className={`h-full border-2 shadow-xl bg-gradient-to-br ${option.bgGradient} ${option.borderColor} overflow-hidden relative group`}>
                    {/* Gradient overlay on hover */}
                    <motion.div 
                      className={`absolute inset-0 bg-gradient-to-br ${option.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                    />

                    {/* Recommended Badge */}
                    {option.recommended && (
                      <motion.div
                        className="absolute top-4 right-4 z-10"
                        initial={{ rotate: -12, scale: 0 }}
                        animate={{ rotate: -12, scale: 1 }}
                        transition={{ delay: 0.6, type: "spring" }}
                      >
                        <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-none shadow-lg">
                          ⭐ Recommended
                        </Badge>
                      </motion.div>
                    )}

                    <CardContent className="pt-8 pb-6 relative">
                      {/* Icon with gradient background */}
                      <motion.div 
                        className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${option.gradient} flex items-center justify-center shadow-lg`}
                        whileHover={{ rotate: 360, scale: 1.15 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Icon className="w-10 h-10 text-white" />
                      </motion.div>

                      {/* Title */}
                      <h3 className="text-2xl text-center mb-3">
                        {option.title}
                      </h3>

                      {/* Character Count Badge */}
                      <div className="flex justify-center mb-4">
                        <Badge 
                          variant="outline" 
                          className="text-base px-4 py-1 bg-white/50 dark:bg-gray-900/50"
                        >
                          {option.count} characters
                        </Badge>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-6 leading-relaxed px-2">
                        {option.description}
                      </p>

                      {/* Start Button */}
                      <motion.div
                        className="flex justify-center"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className={`px-6 py-2 rounded-full bg-gradient-to-r ${option.gradient} text-white shadow-lg font-medium flex items-center gap-2`}>
                          Start Learning
                          <motion.span
                            animate={{ x: [0, 4, 0] }}
                            transition={{ 
                              repeat: Infinity, 
                              duration: 1.5,
                              ease: "easeInOut",
                            }}
                          >
                            →
                          </motion.span>
                        </div>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8"
        >
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-blue-200 dark:border-blue-800">
            <CardContent className="pt-6">
              <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                <p className="mb-2">
                  💡 <strong>Pro Tip:</strong> Start with "All Characters" for comprehensive learning, 
                  or choose specific types if you want focused practice.
                </p>
                <p>
                  ✨ Each type includes interactive flashcards, audio pronunciation, and stroke order practice!
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
