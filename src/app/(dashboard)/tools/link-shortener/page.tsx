'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link2, Copy, CheckCircle2, Wand2, Scissors, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
// DashboardLayout removed - handled by (dashboard)/layout.tsx

export default function LinkShortener() {
  const [longUrl, setLongUrl] = useState('');
  const [customAlias, setCustomAlias] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleShorten = () => {
    if (!longUrl) return;

    setIsLoading(true);
    // Simulate API call for URL shortening
    setTimeout(() => {
      const alias = customAlias || Math.random().toString(36).substring(2, 7);
      setShortUrl(`https://cpil.ot/${alias}`);
      setIsLoading(false);
    }, 800);
  };

  const handleCopy = async () => {
    if (!shortUrl) return;
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text', err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-16 h-16 mx-auto rounded-2xl gradient-primary flex items-center justify-center mb-6"
          >
            <Scissors className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-4xl font-bold">Smart Link Shortener</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Create clean, concise links for your WhatsApp marketing. Short links are more trustworthy, consume less space, and look professional.
          </p>
        </div>

        <div className="bg-card p-6 md:p-8 rounded-2xl border border-border shadow-sm">
          <div className="space-y-6">
            
            {/* Input Form */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                  <Link2 className="w-4 h-4 text-muted-foreground" />
                  Paste your long URL here
                </label>
                <div className="relative">
                  <input
                    type="url"
                    value={longUrl}
                    onChange={(e) => setLongUrl(e.target.value)}
                    placeholder="https://your-very-long-whatsapp-api-link.com/..."
                    className="w-full px-4 py-4 rounded-xl bg-background border border-border focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] outline-none transition-all pr-12 text-sm sm:text-base"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                  <Wand2 className="w-4 h-4 text-muted-foreground" />
                  Custom Back-half (Optional)
                </label>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                    <span className="text-muted-foreground hidden sm:inline px-2">cpil.ot/</span>
                    <input
                      type="text"
                      value={customAlias}
                      onChange={(e) => setCustomAlias(e.target.value)}
                      placeholder="my-custom-link"
                      className="flex-1 px-4 py-3 rounded-lg bg-background border border-border focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] outline-none transition-all text-sm"
                    />
                </div>
              </div>

              <Button
                onClick={handleShorten}
                disabled={!longUrl}
                isLoading={isLoading}
                className="w-full py-4 mt-2 text-base"
                leftIcon={<Scissors className="w-5 h-5" />}
              >
                Shorten URL
              </Button>
            </div>

            {/* Result Area */}
            <AnimatePresence>
              {shortUrl && !isLoading && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="pt-6 border-t border-border overflow-hidden"
                >
                  <label className="block text-sm font-medium mb-2 text-[var(--primary)]">Your Short Link is Ready 🎉</label>
                  <div className="flex flex-col sm:flex-row items-stretch gap-3">
                    <div className="flex-1 bg-muted/50 p-4 rounded-xl border border-border/50 font-mono text-[var(--primary)] text-sm sm:text-base break-all flex items-center">
                      {shortUrl}
                    </div>
                    
                    <Button
                      onClick={handleCopy}
                      variant="outline"
                      className="px-6 py-4 sm:py-0 w-full sm:w-auto"
                      leftIcon={copied ? <CheckCircle2 className="w-5 h-5 text-[var(--primary)]" /> : <Copy className="w-5 h-5" />}
                    >
                      <span className={copied ? 'text-[var(--primary)]' : ''}>
                        {copied ? 'Copied' : 'Copy'}
                      </span>
                    </Button>
                  </div>
                  
                  <div className="mt-4 flex items-start gap-2 p-3 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-lg text-xs md:text-sm">
                      <Info className="w-4 h-4 shrink-0 mt-0.5" />
                      <p>Short links are perfect for Instagram bios, SMS campaigns, or Twitter where character counts are limited.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
          </div>
        </div>
      </div>
  );
}
