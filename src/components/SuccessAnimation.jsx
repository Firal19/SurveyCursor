import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

const SuccessAnimation = ({ amount, onComplete }) => {
  useEffect(() => {
    // Trigger confetti
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti(Object.assign({}, defaults, { 
        particleCount, 
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#a855f7', '#3b82f6', '#10b981', '#f59e0b']
      }));
      confetti(Object.assign({}, defaults, { 
        particleCount, 
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#a855f7', '#3b82f6', '#10b981', '#f59e0b']
      }));
    }, 250);

    // Auto close after 4 seconds
    const timer = setTimeout(() => {
      onComplete();
    }, 4000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={onComplete}
      >
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, rotate: 180 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="bg-white rounded-3xl p-8 max-w-sm w-full text-center relative overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-200 rounded-full blur-3xl opacity-50 -mr-16 -mt-16" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-200 rounded-full blur-3xl opacity-50 -ml-16 -mb-16" />
          
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="relative inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full mb-6"
          >
            <CheckCircle className="w-12 h-12 text-white" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0"
            >
              <Sparkles className="absolute top-0 right-0 w-4 h-4 text-yellow-400" />
              <Sparkles className="absolute bottom-0 left-0 w-4 h-4 text-yellow-400" />
            </motion.div>
          </motion.div>

          {/* Success Text */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-bold text-gray-900 mb-2"
          >
            Survey Submitted!
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-gray-600 mb-6"
          >
            Great job! Your survey is being reviewed.
          </motion.p>

          {/* Earnings Animation */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
            className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-2xl p-6 mb-6"
          >
            <p className="text-sm text-gray-600 mb-2">Expected Earnings</p>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600"
            >
              +{amount} ETB
            </motion.div>
          </motion.div>

          {/* Money Icons Animation */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ y: 100, opacity: 0, x: Math.random() * 200 - 100 }}
                animate={{ 
                  y: -100, 
                  opacity: [0, 1, 1, 0],
                  x: Math.random() * 200 - 100
                }}
                transition={{ 
                  delay: 0.8 + i * 0.1, 
                  duration: 2,
                  ease: "easeOut"
                }}
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
              >
                <span className="text-2xl">💰</span>
              </motion.div>
            ))}
          </div>

          {/* Action Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onComplete}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            Continue
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SuccessAnimation; 