'use client';

import { useState } from 'react';
import { Sparkles, Copy, Check, Smile, LayoutGrid, Info, MessageSquare, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCopy } from '@/hooks/useCopy';
import { motion, AnimatePresence } from 'framer-motion';

export default function EmojiSuggesterPage() {
  const [message, setMessage] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const { copied, copy } = useCopy();

  const handleGenerate = async () => {
    if (!message) return;
    setLoading(true);
    try {
      const response = await fetch('/api/ai/emoji-suggester', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
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
            <Smile className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-4xl font-bold">AI Emoji Suggester</h1>
          <p className="text-lg text-muted-foreground">Make your messages 10x more engaging with perfect emoji placement.</p>
        </div>

        <div className="bg-card border border-border rounded-3xl p-8 shadow-sm space-y-6">
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Your Message
            </h2>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Paste your message here to add emojis..."
              className="w-full min-h-[200px] p-6 rounded-2xl border-2 border-border focus:border-[var(--primary)] bg-background outline-none transition-all resize-none font-medium"
            />
          </div>

          <Button
            onClick={handleGenerate}
            disabled={!message}
            isLoading={loading}
            className="w-full py-4 text-lg"
            leftIcon={<Sparkles className="w-5 h-5" />}
          >
            Add Emojis
          </Button>
        </div>

        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card border-2 border-[var(--primary)]/20 rounded-3xl p-8 shadow-xl space-y-6 relative overflow-hidden"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-xl">Enhanced Version</h3>
                  <Button
                    onClick={() => copy(result)}
                    variant="secondary"
                    size="sm"
                    className="flex items-center gap-2"
                    leftIcon={copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  >
                    {copied ? 'Copied!' : 'Copy Enhanced'}
                  </Button>
                </div>
                <div className="p-6 rounded-2xl bg-muted/30 border border-border min-h-[200px] flex flex-col">
                  <p className="flex-1 text-foreground font-medium leading-relaxed whitespace-pre-line custom-scrollbar">{result}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
    </div>
  );
}
