'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { THEMES } from '@/lib/constants';

type Theme = typeof THEMES[0];

interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  setTheme: (theme: Theme) => void;
  setCustomTheme: (primary: string, secondary: string) => void;
  toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(THEMES[1]); // WhatsApp Classic as default
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Load saved preferences
    const savedTheme = localStorage.getItem('chatpilot-theme');
    const savedMode = localStorage.getItem('chatpilot-mode');
    
    if (savedTheme) {
      const parsedTheme = JSON.parse(savedTheme);
      setThemeState(parsedTheme);
      applyTheme(parsedTheme);
    }
    
    if (savedMode === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Dynamic Favicon Update
  useEffect(() => {
    if (!mounted) return;

    const svg = `
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="45" cy="50" r="42" fill="${theme.primary}" />
        <path d="M45 15C63 15 78 28 78 45C78 62 63 75 45 75C39 75 33.5 73.2 29 70L15 75L20 62C16.8 57.5 15 51.5 15 45C15 28 28.5 15 45 15Z" fill="#FFFFFF" />
        <path d="M55 35L85 15L70 45L55 35Z" fill="${theme.secondary}" />
      </svg>
    `.trim().replace(/"/g, "'");

    const encodedSvg = encodeURIComponent(svg);
    const dataUrl = `data:image/svg+xml,${encodedSvg}`;

    let link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.getElementsByTagName('head')[0].appendChild(link);
    }
    link.href = dataUrl;
  }, [theme, mounted]);

  const applyTheme = (newTheme: Theme) => {
    document.documentElement.style.setProperty('--primary', newTheme.primary);
    document.documentElement.style.setProperty('--secondary', newTheme.secondary);
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('chatpilot-theme', JSON.stringify(newTheme));
    applyTheme(newTheme);
  };

  const setCustomTheme = (primary: string, secondary: string) => {
    const customTheme: Theme = {
      id: 'custom',
      name: 'Custom Theme',
      primary,
      secondary,
    };
    setTheme(customTheme);
  };

  const toggleDarkMode = () => {
    const newMode = !isDark;
    setIsDark(newMode);
    localStorage.setItem('chatpilot-mode', newMode ? 'dark' : 'light');
    
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ theme, isDark, setTheme, setCustomTheme, toggleDarkMode }}>
      <div className={isDark ? 'dark' : ''}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
