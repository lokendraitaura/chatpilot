'use client';

import React, { useEffect, useState } from 'react';
import { usePWA } from './PWAProvider';
import { Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function InstallAppButton() {
  const { isInstallable, installApp } = usePWA();
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsStandalone(window.matchMedia('(display-mode: standalone)').matches);
    }
  }, []);

  const handleInstallClick = () => {
    if (isInstallable && installApp) {
      installApp();
    } else {
      alert("GoChatPilot is ready to be installed! \n\nIf you don't see an install prompt, please look for 'Install App' or 'Add to Home Screen' in your browser's menu (⋮ or ≡).");
    }
  };

  if (isStandalone) return null;

  return (
    <AnimatePresence>
      <motion.button
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleInstallClick}
        style={{ backgroundColor: 'var(--primary)' }}
        className="pwa-install-btn flex items-center space-x-2 px-4 py-2 text-white rounded-lg shadow-md hover:shadow-lg hover:opacity-90 transition-all font-medium w-full justify-center lg:justify-start lg:w-auto"
      >
        <Download className="w-5 h-5" />
        <span className="sm:hidden">Install</span>
        <span className="hidden sm:inline">Download</span>
      </motion.button>
    </AnimatePresence>
  );
}
