'use client';

import { useState } from 'react';
import { Sparkles, Copy, Check, Image as ImageIcon, RefreshCw, LayoutGrid, Info, Heart, Briefcase, Zap, Smile, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCopy } from '@/hooks/useCopy';
import { motion, AnimatePresence } from 'motion/react';
// DashboardLayout removed - handled by (dashboard)/layout.tsx

export default function StatusCaptionPage() {
  const [mood, setMood] = useState('');
  const [category, setCategory] = useState<'motivational' | 'funny' | 'love' | 'lifestyle' | 'business' | 'inspirational'>('motivational');
  const [emojis, setEmojis] = useState(true);
  const [captions, setCaptions] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const { copied, copy } = useCopy();

  const categories = [
    { value: 'motivational', label: 'Motivational', icon: Zap, desc: 'Powerful & bold' },
    { value: 'funny', label: 'Funny', icon: Smile, desc: 'Witty & hilarious' },
    { value: 'love', label: 'Love', icon: Heart, desc: 'Romantic & deep' },
    { value: 'lifestyle', label: 'Lifestyle', icon: Sparkles, desc: 'Vibrant & cool' },
    { value: 'business', label: 'Business', icon: Briefcase, desc: 'Expert & formal' },
    { value: 'inspirational', label: 'Inspirational', icon: Send, desc: 'Deep & moving' },
  ];

  const generateCaptions = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/ai/status-caption', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          topic: `Category: ${category}. Mood: ${mood}. Include Emojis: ${emojis}` 
        }),
      });
      const data = await response.json();
      if (data.success) {
        // Split result by newlines if the AI returns multiple lines
        const result = data.data.split('\n').filter((l: string) => l.trim().length > 0);
        setCaptions(result);
      }
    } catch (error) {
      console.error('Caption Generation Error:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-16 h-16 mx-auto rounded-2xl gradient-primary flex items-center justify-center mb-6"
          >
            <ImageIcon className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-4xl font-bold">Status Caption Generator</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Create high-engagement, AI-powered captions for your WhatsApp status updates instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto items-start text-left">
          {/* Left Column: Config */}
          <div className="lg:col-span-1 space-y-6 text-left">
            <div className="bg-card border border-border rounded-3xl p-6 shadow-sm space-y-6 text-left">
              <div className="space-y-4 text-left">
                <h2 className="text-sm font-bold text-muted-foreground uppercase flex items-center gap-2">
                  <LayoutGrid className="w-4 h-4" />
                  Select Category
                </h2>
                <div className="grid grid-cols-1 gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.value}
                      onClick={() => setCategory(cat.value as any)}
                      className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all cursor-pointer text-left ${
                        category === cat.value
                          ? 'border-[var(--primary)] bg-[var(--primary)]/5 text-[var(--primary)]'
                          : 'border-transparent bg-muted/50 hover:bg-muted text-muted-foreground'
                      }`}
                    >
                      <cat.icon className="w-5 h-5" />
                      <div>
                        <div className="font-bold text-xs uppercase">{cat.label}</div>
                        <div className="text-[10px] opacity-70 leading-tight">{cat.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4 pt-6 border-t border-border text-left">
                <h2 className="text-sm font-bold text-muted-foreground uppercase flex items-center gap-2 text-left">
                  <Sparkles className="w-4 h-4" />
                  Mood / Specific Theme
                </h2>
                <input
                  type="text"
                  value={mood}
                  onChange={(e) => setMood(e.target.value)}
                  placeholder="e.g. Weekend vibes, Rainy day"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-[var(--primary)] outline-none text-sm transition-all"
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50 border border-border text-left">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold uppercase block">Include Emojis</span>
                  <span className="text-[10px] text-muted-foreground">Add visual flair to captions</span>
                </div>
                <button
                  onClick={() => setEmojis(!emojis)}
                  className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer ${
                    emojis ? 'bg-[var(--primary)]' : 'bg-muted-foreground/30'
                  }`}
                >
                  <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${
                    emojis ? 'translate-x-5' : 'translate-x-0'
                  }`} />
                </button>
              </div>

              <Button
                onClick={generateCaptions}
                isLoading={isGenerating}
                className="w-full py-4"
                leftIcon={<Sparkles className="w-5 h-5" />}
              >
                Generate AI Captions
              </Button>
            </div>
          </div>

          {/* Right Column: Output */}
          <div className="lg:col-span-2 space-y-6 text-left">
            <div className="bg-card border border-border rounded-3xl p-6 md:p-8 shadow-sm flex flex-col min-h-[600px] text-left">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-sm font-bold text-muted-foreground uppercase flex items-center gap-2 text-left">
                  <Send className="w-4 h-4" />
                  Suggested Captions
                </h2>
                {captions.length > 0 && (
                  <span className="text-[10px] font-bold text-[var(--primary)] bg-[var(--primary)]/10 px-2 py-1 rounded-full uppercase">
                    {captions.length} Results
                  </span>
                )}
              </div>

              <AnimatePresence mode="popLayout">
                {captions.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4 text-left">
                    {captions.map((caption, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="group relative p-5 rounded-2xl bg-muted/30 border border-transparent hover:border-[var(--primary)] hover:bg-background transition-all"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <p className="text-base font-medium leading-relaxed flex-1">{caption}</p>
                          <button
                            onClick={() => copy(caption)}
                            className="shrink-0 p-2 rounded-xl bg-background border border-border hover:bg-[var(--primary)]/10 hover:border-[var(--primary)] transition-all cursor-pointer opacity-0 group-hover:opacity-100 shadow-sm"
                          >
                            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center p-12 text-center space-y-6 opacity-30">
                    <ImageIcon className="w-16 h-16 text-muted-foreground" />
                    <div className="space-y-2">
                      <p className="text-xl font-bold">Ready to generate</p>
                      <p className="text-sm font-medium max-w-xs mx-auto text-balance">
                        Configure your mood and category, then let AI create the perfect words for your next update.
                      </p>
                    </div>
                  </div>
                )}
              </AnimatePresence>

              <div className="mt-auto pt-6 border-t border-border flex items-start gap-3 text-[10px] text-muted-foreground leading-relaxed">
                <Info className="w-4 h-4 shrink-0 mt-0.5 text-[var(--primary)]" />
                <p>AI generates captions based on current trends and social context. Select any caption to copy it to your clipboard for instant sharing on WhatsApp Status.</p>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}
