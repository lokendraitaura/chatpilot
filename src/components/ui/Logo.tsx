'use client';

import { useTheme } from '@/components/providers/ThemeProvider';

export function Logo({ className = "w-8 h-8" }: { className?: string }) {
  const { theme } = useTheme();

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
        <circle cx="50" cy="50" r="50" fill={theme.primary} />
        <path d="M 50 22 C 65.5 22 78 34.5 78 50 C 78 65.5 65.5 78 50 78 C 43 78 36.5 75.5 31.5 71 L 18 76 L 22.5 63 C 18.5 58.5 16 52.5 16 46 C 16 32.7 31.2 22 50 22 Z" fill="#FFFFFF" />
        <path d="M 54 38 L 86 14 L 62 46 Z" fill={theme.secondary} />
      </svg>
    </div>
  );
}
