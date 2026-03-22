'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

interface PWAContextType {
  isInstallable: boolean;
  installApp: () => Promise<void>;
}

const PWAContext = createContext<PWAContextType>({
  isInstallable: false,
  installApp: async () => {},
});

export const usePWA = () => useContext(PWAContext);

export function PWAProvider({ children }: { children: React.ReactNode }) {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    // Register Service Worker
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    }

    const checkCapturedPrompt = () => {
      if ((window as any).deferredPWAPrompt) {
        console.log('📦 Using captured PWA prompt');
        setDeferredPrompt((window as any).deferredPWAPrompt);
        setIsInstallable(true);
      }
    };

    // Capture the install prompt
    const handleBeforeInstallPrompt = (e: any) => {
      console.log('✅ beforeinstallprompt event fired');
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
      (window as any).deferredPWAPrompt = e;
    };

    const handleAppInstalled = () => {
      setIsInstallable(false);
      setDeferredPrompt(null);
      (window as any).deferredPWAPrompt = null;
      console.log('🎉 PWA was installed successfully');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    window.addEventListener('pwa-ready', checkCapturedPrompt);

    checkCapturedPrompt();

    console.log('📡 PWA Listeners initialized');

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.removeEventListener('pwa-ready', checkCapturedPrompt);
    };
  }, []);

  const installApp = async () => {
    if (!deferredPrompt) return;
    
    // Show the install prompt
    deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }
    
    // We've used the prompt, and can't use it again, throw it away
    setDeferredPrompt(null);
    setIsInstallable(false);
  };

  return (
    <PWAContext.Provider value={{ isInstallable, installApp }}>
      {children}
    </PWAContext.Provider>
  );
}
