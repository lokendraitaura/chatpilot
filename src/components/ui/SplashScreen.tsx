'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from '@/components/ui/Logo';

export function SplashScreen() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Hide the splash screen after 2 seconds to allow full app render
    const timer = setTimeout(() => {
      setShow(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } }}
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-background"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ 
              scale: [0.5, 1.1, 1], 
              opacity: [0, 1, 1],
            }}
            transition={{ 
              duration: 1.0, 
              times: [0, 0.7, 1],
              ease: "easeOut"
            }}
            className="flex flex-col items-center justify-center space-y-6"
          >
            {/* Animated Logo Bounce */}
            <motion.div
              animate={{ 
                y: [0, -12, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Logo className="w-28 h-28 drop-shadow-2xl" />
            </motion.div>
            
            {/* Title & Loading Bar */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex flex-col items-center space-y-4"
            >
              <h1 className="text-4xl font-bold tracking-tight">GoChatPilot</h1>
              <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden relative">
                <motion.div 
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
                  className="w-full h-full bg-[var(--primary)] absolute top-0 left-0 rounded-full"
                />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
