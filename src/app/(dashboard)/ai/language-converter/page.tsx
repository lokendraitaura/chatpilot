'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Languages, Copy, Check, Sparkles, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
// DashboardLayout removed - handled by (dashboard)/layout.tsx
import { useCopy } from '@/hooks/useCopy';

const LANGUAGES = [
  'Hindi', 'English', 'Spanish', 'French', 'German', 'Arabic', 'Bengali', 'Marathi', 'Telugu', 'Tamil', 'Gujarati'
];

export default function LanguageConverterPage() {
  const [message, setMessage] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('Hindi');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const { copied, copy } = useCopy();

  const handleGenerate = async () => {
    if (!message || !targetLanguage) return;
    setLoading(true);
    try {
      const response = await fetch('/api/ai/language-converter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, targetLanguage }),
      });
      const data = await response.json();
      if (data.success) {
        setResult(data.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="text-center space-y-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-16 h-16 mx-auto rounded-2xl gradient-primary flex items-center justify-center mb-6"
          >
            <Languages className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-4xl font-bold">AI Language Converter</h1>
          <p className="text-lg text-muted-foreground">Translate your WhatsApp messages into any language with natural flow.</p>
        </div>

        <div className="bg-card border border-border rounded-3xl p-8 shadow-sm space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Source Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here..."
                className="w-full h-32 p-4 rounded-2xl border-2 border-border focus:border-[var(--primary)] bg-background outline-none transition-all resize-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Select Target Language</label>
              <div className="grid grid-cols-2 gap-2">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setTargetLanguage(lang)}
                    className={`p-3 rounded-xl border-2 font-bold text-sm transition-all ${
                      targetLanguage === lang
                        ? 'border-[var(--primary)] bg-[var(--primary)]/5 text-[var(--primary)]'
                        : 'border-transparent bg-muted/50 text-muted-foreground hover:bg-muted'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <Button
            onClick={handleGenerate}
            disabled={!message}
            isLoading={loading}
            className="w-full py-4 text-lg"
            leftIcon={<Globe className="w-5 h-5" />}
          >
            Translate Message
          </Button>
        </div>

        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card border-2 border-[var(--primary)]/20 rounded-3xl p-8 shadow-xl space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-xl">Translated Message ({targetLanguage})</h3>
                  <Button
                    onClick={() => copy(result)}
                    variant="secondary"
                    size="sm"
                    className="flex items-center gap-2"
                    leftIcon={copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  >
                    {copied ? 'Copied!' : 'Copy Translation'}
                  </Button>
                </div>
                <div className="p-6 rounded-2xl bg-muted/30 border border-border min-h-[350px] flex flex-col">
                  <p className="flex-1 text-foreground font-medium leading-relaxed whitespace-pre-line custom-scrollbar">{result}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
    </div>
  );
}
