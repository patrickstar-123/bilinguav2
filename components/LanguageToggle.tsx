import { motion } from 'motion/react';
import { useState } from 'react';

interface LanguageToggleProps {
  currentLanguage: 'chinese' | 'japanese';
  onToggle: (newLanguage: 'chinese' | 'japanese') => void;
}

export function LanguageToggle({ currentLanguage, onToggle }: LanguageToggleProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleToggle = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    const newLang = currentLanguage === 'chinese' ? 'japanese' : 'chinese';
    
    // Trigger callback immediately (no delay - parent will handle it)
    onToggle(newLang);
    
    // Reset animation after sparkles finish
    setTimeout(() => {
      setIsAnimating(false);
    }, 600);
  };

  const isChinese = currentLanguage === 'chinese';

  return (
    <button
      onClick={handleToggle}
      disabled={isAnimating}
      className="relative inline-flex items-center h-10 w-[180px] rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-1 shadow-lg hover:shadow-xl transition-shadow disabled:opacity-50"
    >
      {/* Background Slider */}
      <motion.div
        className="absolute h-8 w-[88px] bg-white rounded-full shadow-md"
        initial={false}
        animate={{
          x: isChinese ? 2 : 88,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
      />

      {/* Chinese Option */}
      <motion.div
        className="relative z-10 flex-1 h-8 flex items-center justify-center gap-1"
        animate={{
          scale: isChinese ? 1 : 0.9,
        }}
        transition={{ duration: 0.2 }}
      >
        <span className="text-lg">🇨🇳</span>
        <span className={`text-sm ${isChinese ? 'text-purple-600' : 'text-white'} transition-colors duration-300`}>
          中文
        </span>
      </motion.div>

      {/* Japanese Option */}
      <motion.div
        className="relative z-10 flex-1 h-8 flex items-center justify-center gap-1"
        animate={{
          scale: !isChinese ? 1 : 0.9,
        }}
        transition={{ duration: 0.2 }}
      >
        <span className="text-lg">🇯🇵</span>
        <span className={`text-sm ${!isChinese ? 'text-purple-600' : 'text-white'} transition-colors duration-300`}>
          日本語
        </span>
      </motion.div>

      {/* Animated Sparkles */}
      {isAnimating && (
        <>
          <motion.div
            className="absolute top-0 left-1/2 w-2 h-2 bg-yellow-300 rounded-full"
            initial={{ opacity: 0, y: 0, x: -4 }}
            animate={{ 
              opacity: [0, 1, 0],
              y: -20,
              x: [-4, -10]
            }}
            transition={{ duration: 0.6 }}
          />
          <motion.div
            className="absolute top-0 left-1/2 w-2 h-2 bg-pink-300 rounded-full"
            initial={{ opacity: 0, y: 0, x: -4 }}
            animate={{ 
              opacity: [0, 1, 0],
              y: -20,
              x: [-4, 2]
            }}
            transition={{ duration: 0.6, delay: 0.1 }}
          />
          <motion.div
            className="absolute top-0 left-1/2 w-2 h-2 bg-blue-300 rounded-full"
            initial={{ opacity: 0, y: 0, x: -4 }}
            animate={{ 
              opacity: [0, 1, 0],
              y: -20,
              x: [-4, 8]
            }}
            transition={{ duration: 0.6, delay: 0.2 }}
          />
        </>
      )}
    </button>
  );
}