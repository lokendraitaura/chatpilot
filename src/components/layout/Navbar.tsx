'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Sun, Moon, Palette, Check } from 'lucide-react';
import { useTheme } from '@/components/providers/ThemeProvider';
import { THEMES } from '@/lib/constants';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from '@/components/ui/Logo';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const [customPrimary, setCustomPrimary] = useState('#25D366');
  const [customSecondary, setCustomSecondary] = useState('#128C7E');
  
  const { theme, isDark, setTheme, setCustomTheme, toggleDarkMode } = useTheme();

  const handleApplyCustomTheme = () => {
    setCustomTheme(customPrimary, customSecondary);
    setThemeMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 w-full z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link prefetch href="/" className="flex items-center space-x-2 cursor-pointer">
            <Logo className="w-10 h-10" />
            <span className="font-bold text-2xl tracking-tight">
              <span style={{ color: theme.primary }}>Chat</span>
              <span style={{ color: theme.secondary }}>Pilot</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link prefetch href="/tools/link-generator" className="text-sm font-medium hover:text-[var(--primary)] transition-colors cursor-pointer">
              Tools
            </Link>
            <Link prefetch href="/ai/message-generator" className="text-sm font-medium hover:text-[var(--primary)] transition-colors cursor-pointer">
              AI Features
            </Link>
            <Link prefetch href="/#how-it-works" className="text-sm font-medium hover:text-[var(--primary)] transition-colors cursor-pointer">
              How It Works
            </Link>
            
            {/* Theme Selector */}
            <div className="relative">
              <button
                onClick={() => setThemeMenuOpen(!themeMenuOpen)}
                className="p-2 rounded-lg hover:bg-muted transition-colors cursor-pointer"
                aria-label="Change theme"
              >
                <Palette className="w-5 h-5" style={{ color: theme.primary }} />
              </button>
              
              <AnimatePresence>
                {themeMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-80 bg-card border border-border rounded-lg shadow-xl p-4 max-h-[80vh] overflow-y-auto z-50"
                  >
                    <div className="mb-4 pb-4 border-b border-border">
                      <h4 className="text-sm font-bold mb-3">Custom Theme</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <label className="text-xs text-muted-foreground">Primary Color</label>
                          <input 
                            type="color" 
                            value={customPrimary} 
                            onChange={(e) => setCustomPrimary(e.target.value)}
                            className="w-12 h-8 rounded cursor-pointer border-0 p-0"
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <label className="text-xs text-muted-foreground">Secondary Color</label>
                          <input 
                            type="color" 
                            value={customSecondary} 
                            onChange={(e) => setCustomSecondary(e.target.value)}
                            className="w-12 h-8 rounded cursor-pointer border-0 p-0"
                          />
                        </div>
                        <button 
                          onClick={handleApplyCustomTheme}
                          className="w-full mt-2 py-2 bg-[var(--primary)] text-white text-xs font-bold rounded-md hover:opacity-90 transition-opacity"
                        >
                          Apply Custom Theme
                        </button>
                      </div>
                    </div>

                    <h4 className="text-sm font-bold mb-3 text-muted-foreground">Preset Themes</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {THEMES.map((t) => (
                        <button
                          key={t.id}
                          onClick={() => {
                            setTheme(t);
                            setThemeMenuOpen(false);
                          }}
                          className={`p-3 rounded-lg border-2 transition-all cursor-pointer hover:scale-105 ${
                            theme.id === t.id ? 'border-[var(--primary)]' : 'border-transparent hover:border-border'
                          }`}
                        >
                          <div className="flex items-center space-x-2">
                            <div 
                              className="w-6 h-6 rounded-full" 
                              style={{ backgroundColor: t.primary }}
                            />
                            <span className="text-xs font-medium truncate">{t.name}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-muted transition-colors cursor-pointer"
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <Link
              href="/tools/link-generator"
              className="px-4 py-2 rounded-lg text-white font-medium gradient-primary hover:opacity-90 transition-opacity cursor-pointer"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-2 md:hidden">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-muted transition-colors cursor-pointer"
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-muted transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t border-border overflow-hidden"
          >
            <div className="px-4 py-4 space-y-3">
              <Link
                href="/tools/link-generator"
                className="block px-4 py-2 rounded-lg hover:bg-muted transition-colors cursor-pointer"
                onClick={() => setMobileMenuOpen(false)}
              >
                Tools
              </Link>
              <Link
                href="/ai/message-generator"
                className="block px-4 py-2 rounded-lg hover:bg-muted transition-colors cursor-pointer"
                onClick={() => setMobileMenuOpen(false)}
              >
                AI Features
              </Link>
              <Link
                href="/#how-it-works"
                className="block px-4 py-2 rounded-lg hover:bg-muted transition-colors cursor-pointer"
                onClick={() => setMobileMenuOpen(false)}
              >
                How It Works
              </Link>
              
              {/* Theme Selector Mobile */}
              <div className="pt-2">
                <p className="px-4 py-2 text-sm font-medium text-muted-foreground">Choose Theme</p>
                <div className="grid grid-cols-2 gap-2 px-4">
                  {THEMES.slice(0, 6).map((t) => (
                    <button
                      key={t.id}
                      onClick={() => {
                        setTheme(t);
                      }}
                      className={`p-3 rounded-lg border-2 transition-all cursor-pointer ${
                        theme.id === t.id ? 'border-[var(--primary)]' : 'border-border'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-5 h-5 rounded-full" 
                          style={{ backgroundColor: t.primary }}
                        />
                        <span className="text-xs">{t.name}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              
              <Link
                href="/tools/link-generator"
                className="block px-4 py-2 rounded-lg text-white font-medium gradient-primary text-center cursor-pointer"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
