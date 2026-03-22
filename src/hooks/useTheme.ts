'use client';

import { useEffect, useState } from 'react';

export type Theme = {
  id: string;
  name: string;
  primary: string;
  secondary: string;
};

export function useTheme() {
  const [theme, setTheme] = useState<Theme | null>(null);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('gochatpilot-theme');
    const savedMode = localStorage.getItem('gochatpilot-mode');
    
    if (savedTheme) {
      setTheme(JSON.parse(savedTheme));
    }
    
    if (savedMode === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const updateTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('gochatpilot-theme', JSON.stringify(newTheme));
    
    // Apply CSS variables
    document.documentElement.style.setProperty('--primary', newTheme.primary);
    document.documentElement.style.setProperty('--secondary', newTheme.secondary);
  };

  const toggleDarkMode = () => {
    const newMode = !isDark;
    setIsDark(newMode);
    localStorage.setItem('gochatpilot-mode', newMode ? 'dark' : 'light');
    
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return { theme, isDark, updateTheme, toggleDarkMode };
}
