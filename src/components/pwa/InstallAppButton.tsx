'use client';

import React from 'react';
import { usePWA } from './PWAProvider';
import { Download } from 'lucide-react';
import { motion } from 'framer-motion';

export function InstallAppButton() {
  const { isInstallable, installApp } = usePWA();

  const handleInstallClick = () => {
    if (isInstallable && installApp) {
      installApp();
    } else {
      alert("App installation is managed by your browser natively! Look for the 'Install App' / 'Add to Home Screen' icon in your browser's address bar or menu options.");
    }
  };

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
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
  );
}
