'use client';

import { useState } from 'react';
import { Sparkles, Copy, Check, Smile, LayoutGrid, Info, MessageSquare, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCopy } from '@/hooks/useCopy';
import { motion, AnimatePresence } from 'motion/react';
// DashboardLayout removed - handled by (dashboard)/layout.tsx

export default function EmojiSuggesterPage() {
  const [message, setMessage] = useState('');
  const [suggestions, setSuggestions] = useState<Array<{ emoji: string; name: string; relevance: string }>>([]);
  const [enhancedMessage, setEnhancedMessage] = useState('');
  const { copied, copy } = useCopy();
  const [copiedEmoji, setCopiedEmoji] = useState<string | null>(null);

  const [isGenerating, setIsGenerating] = useState(false);

  const suggestEmojis = async () => {
    if (!message) return;
    setIsGenerating(true);
    try {
      const response = await fetch('/api/ai/emoji-suggester', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });
      const data = await response.json();
      if (data.success) {
        setEnhancedMessage(data.data);
        // Extract emojis from the data string if needed, 
        // but the prompt returns the message with emojis.
        // For the "Suggestions" list, we can just show the enhanced result.
        setSuggestions([{ 
          emoji: '✨', 
          name: 'AI Enhanced', 
          relevance: 'Auto-added optimal emojis' 
        }]);
      }
    } catch (error) {
      console.error('Emoji Suggestion Error:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const addEmojiToMessage = (emoji: string) => {
    setEnhancedMessage(prev => prev + ' ' + emoji);
  };

  const copyEmoji = (emoji: string) => {
    copy(emoji);
    setCopiedEmoji(emoji);
    setTimeout(() => setCopiedEmoji(null), 2000);
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-16 h-16 mx-auto rounded-2xl gradient-primary flex items-center justify-center mb-6"
          >
            <Smile className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-4xl font-bold">AI Emoji Suggester</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get perfect emoji suggestions and instantly enhance your messages for better engagement.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto items-start text-left">
          {/* Left Column: Input */}
          <div className="space-y-6 text-left">
            <div className="bg-card border border-border rounded-3xl p-6 md:p-8 shadow-sm space-y-8 text-left">
              <div className="space-y-4 text-left">
                <h2 className="text-sm font-bold text-muted-foreground uppercase flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Your Message
                </h2>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type or paste your message here..."
                  className="w-full min-h-[160px] p-6 rounded-2xl border-2 border-border focus:border-[var(--primary)] bg-background outline-none transition-all resize-none text-base font-medium"
                />
              </div>

              <Button
                onClick={suggestEmojis}
                disabled={!message}
                isLoading={isGenerating}
                className="w-full py-4 text-lg"
                leftIcon={<Sparkles className="w-5 h-5" />}
              >
                Suggest Emojis
              </Button>

              {/* Enhanced Preview Area */}
              <AnimatePresence>
                {enhancedMessage && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4 pt-6 border-t border-border overflow-hidden text-left"
                  >
                    <div className="flex items-center justify-between">
                      <h2 className="text-sm font-bold text-muted-foreground uppercase flex items-center gap-2 text-left">
                        <Send className="w-4 h-4" />
                        Enhanced Message
                      </h2>
                      <button
                        onClick={() => copy(enhancedMessage)}
                        className="text-xs font-bold text-[var(--primary)] hover:underline cursor-pointer"
                      >
                        {copied ? 'Copied!' : 'Copy Message'}
                      </button>
                    </div>
                    <div className="p-5 rounded-2xl bg-muted/50 border border-border text-base leading-relaxed font-medium">
                      {enhancedMessage}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column: Suggestions */}
          <div className="lg:sticky lg:top-8 text-left">
            <div className="bg-card border border-border rounded-3xl p-6 md:p-8 shadow-sm space-y-6 flex flex-col h-full text-left">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold text-muted-foreground uppercase flex items-center gap-2 text-left">
                  <LayoutGrid className="w-4 h-4" />
                  AI Suggestions
                </h2>
              </div>

              <div className="flex-1 bg-muted/30 rounded-2xl p-6 min-h-[500px] overflow-y-auto space-y-3 text-left custom-scrollbar">
                {suggestions.length > 0 ? (
                  suggestions.map((s, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="p-4 rounded-xl bg-background border border-border hover:border-[var(--primary)] transition-all group/emoji text-left"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="text-3xl drop-shadow-sm">{s.emoji}</div>
                          <div>
                            <div className="text-xs font-bold">{s.name}</div>
                            <div className="text-[10px] text-muted-foreground leading-tight">{s.relevance}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => addEmojiToMessage(s.emoji)}
                            className="p-2 rounded-lg bg-muted hover:bg-[var(--primary)]/10 text-muted-foreground hover:text-[var(--primary)] transition-colors cursor-pointer"
                            title="Add to message"
                          >
                            <LayoutGrid className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => copyEmoji(s.emoji)}
                            className="p-2 rounded-lg bg-muted hover:bg-green-500/10 text-muted-foreground hover:text-green-500 transition-colors cursor-pointer"
                            title="Copy emoji"
                          >
                            {copiedEmoji === s.emoji ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="h-full flex flex-col items-center justify-center p-8 text-center space-y-4 opacity-50">
                    <Smile className="w-12 h-12 text-muted-foreground" />
                    <p className="text-sm font-medium">Suggestions will appear here after analysis</p>
                  </div>
                )}
              </div>

              <div className="flex items-start gap-2 p-4 bg-[var(--primary)]/5 text-[var(--primary)] rounded-2xl text-[10px] leading-relaxed">
                <Info className="w-4 h-4 shrink-0 mt-0.5" />
                <p>AI scans your message for intent and emotional cues to suggest the most engaging emojis for WhatsApp.</p>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}
