'use client';

import { useTheme } from '@/components/providers/ThemeProvider';

export function Logo({ className = "w-8 h-8" }: { className?: string }) {
  const { theme } = useTheme();

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
        {/* Outer primary ring */}
        <circle cx="45" cy="50" r="42" fill={theme.primary} />
        
        {/* Inner white chat bubble */}
        <path d="M45 15C63 15 78 28 78 45C78 62 63 75 45 75C39 75 33.5 73.2 29 70L15 75L20 62C16.8 57.5 15 51.5 15 45C15 28 28.5 15 45 15Z" 
              fill="#FFFFFF" />
              
        {/* Top right secondary pointer */}
        <path d="M55 35L85 15L70 45L55 35Z" 
              fill={theme.secondary} />
        <path d="M55 35L85 15L65 25L55 35Z" 
              fill={theme.secondary} className="opacity-70" />
      </svg>
    </div>
  );
}
