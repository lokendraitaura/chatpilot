'use client';

import { useState } from 'react';
import { Scissors, Copy, Check, ExternalLink, Link as LinkIcon, Sparkles, AlertCircle } from 'lucide-react';
import { useCopy } from '@/hooks/useCopy';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

export default function LinkShortenerClient() {
  const [url, setUrl] = useState('');
  const [shortened, setShortened] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { copied, copy } = useCopy();

  const handleShorten = async () => {
    if (!url) return;
    setLoading(true);
    setError('');
    setShortened('');

    try {
      let finalUrl = url.trim();
      if (!finalUrl.startsWith('http')) {
        finalUrl = 'https://' + finalUrl;
      }

      const shorteners = [
        { name: 'is.gd', url: `https://is.gd/create.php?format=simple&url=${encodeURIComponent(finalUrl)}` },
        { name: 'v.gd', url: `https://v.gd/create.php?format=simple&url=${encodeURIComponent(finalUrl)}` },
        { name: 'tinyurl', url: `https://tinyurl.com/api-create.php?url=${encodeURIComponent(finalUrl)}` }
      ];

      let shortUrl = '';
      for (const service of shorteners) {
        try {
          const response = await fetch(service.url);
          if (response.ok) {
            shortUrl = await response.text();
            if (shortUrl.startsWith('http')) break;
          }
        } catch (e) {
          continue;
        }
      }

      if (!shortUrl || !shortUrl.startsWith('http')) {
        throw new Error('All shortening services failed');
      }

      setShortened(shortUrl.trim());
    } catch (err) {
      setError('Could not shorten this URL. Please check that it\'s a valid URL and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleShorten();
  };

  return (
    <div className="space-y-10 max-w-4xl mx-auto">
      <div className="text-center space-y-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-16 h-16 mx-auto rounded-2xl gradient-primary flex items-center justify-center mb-6"
        >
          <Scissors className="w-8 h-8 text-white" />
        </motion.div>
        <h1 className="text-4xl font-bold">Link Shortener</h1>
        <p className="text-lg text-muted-foreground">Turn long, messy WhatsApp links into clean, short ones that boost clicks.</p>
      </div>

      <div className="bg-card border border-border rounded-3xl p-8 shadow-sm space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
            <LinkIcon className="w-4 h-4" /> Enter Long URL
          </label>
          <input
            type="url"
            value={url}
            onChange={(e) => { setUrl(e.target.value); setError(''); }}
            onKeyDown={handleKeyDown}
            placeholder="https://wa.me/1234567890?text=..."
            className="w-full p-4 rounded-xl border-2 border-border focus:border-[var(--primary)] bg-background outline-none transition-all font-medium"
          />
        </div>

        <Button
          onClick={handleShorten}
          disabled={!url || loading}
          isLoading={loading}
          className="w-full py-4 text-lg"
          leftIcon={<Sparkles className="w-5 h-5" />}
        >
          Shorten Link
        </Button>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm"
            >
              <AlertCircle className="w-5 h-5 shrink-0" />
              {error}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {shortened && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card border-2 border-[var(--primary)]/20 rounded-3xl p-8 shadow-xl space-y-6 text-center"
          >
            <h3 className="font-bold uppercase tracking-widest text-[var(--primary)] text-xs">Your Short Link</h3>
            <div className="text-2xl font-bold break-all text-foreground select-all">{shortened}</div>
            <div className="flex gap-4">
              <Button
                onClick={() => copy(shortened)}
                variant={copied ? 'secondary' : 'primary'}
                className="flex-1 py-4"
                leftIcon={copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              >
                {copied ? 'Copied!' : 'Copy Link'}
              </Button>
              <a
                href={shortened}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-6 py-4 rounded-xl font-bold bg-muted hover:bg-muted/80 transition-all flex items-center justify-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                Visit
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
