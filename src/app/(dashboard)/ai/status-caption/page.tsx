'use client';

import { useState } from 'react';
import { Sparkles, Copy, Check, Image as ImageIcon, RefreshCw, LayoutGrid, Info, Heart, Briefcase, Zap, Smile, Send, Minus, Laugh, Skull, User, Globe, Clock, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCopy } from '@/hooks/useCopy';
import { motion, AnimatePresence } from 'framer-motion';

export default function StatusCaptionPage() {
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState<string>('witty');
  const [generatedCaption, setGeneratedCaption] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { copied, copy } = useCopy();

  const tones = [
    { value: 'witty' as const, label: 'Witty', icon: Zap, desc: 'Funny & clever' },
    { value: 'inspirational' as const, label: 'Inspirational', icon: Heart, desc: 'Deep & meaningful' },
    { value: 'promotional' as const, label: 'Promotional', icon: Briefcase, desc: 'Sales focused' },
    { value: 'casual' as const, label: 'Casual', icon: Smile, desc: 'Simple & easy' },
    { value: 'emotional' as const, label: 'Emotional', icon: Heart, desc: 'Heartfelt' },
    { value: 'sarcastic' as const, label: 'Sarcastic', icon: Smile, desc: 'Dry humor' },
    { value: 'professional' as const, label: 'Professional', icon: Briefcase, desc: 'Formal' },
    { value: 'adventurous' as const, label: 'Adventurous', icon: Globe, desc: 'Travel focused' },
    { value: 'nostalgic' as const, label: 'Nostalgic', icon: Clock, desc: 'Old memories' },
    { value: 'bold' as const, label: 'Bold', icon: Zap, desc: 'Strong' },
    { value: 'storytelling' as const, label: 'Storytelling', icon: BookOpen, desc: 'Narrative' },
    { value: 'sassy' as const, label: 'Sassy', icon: User, desc: 'With attitude' },
    { value: 'thoughtful' as const, label: 'Thoughtful', icon: User, desc: 'Reflective' },
  ];

  const generateCaption = async () => {
    if (!topic) return;
    setIsGenerating(true);
    try {
      const response = await fetch('/api/ai/status-caption', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          prompt: `${topic}. Tone: ${tone}` 
        }),
      });
      const data = await response.json();
      if (data.success) {
        setGeneratedCaption(data.data);
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
          <h1 className="text-4xl font-bold">AI Status Caption</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Create engaging captions for your WhatsApp status or business stories instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto items-start">
          {/* Left Column */}
          <div className="space-y-6 text-left">
            <div className="bg-card border border-border rounded-3xl p-6 md:p-8 shadow-sm space-y-8 text-left">
              <div className="space-y-4 text-left">
                <h2 className="text-sm font-bold text-muted-foreground uppercase flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" />
                  What are you posting?
                </h2>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g. New watch collection, morning coffee, office view"
                  className="w-full px-5 py-4 rounded-xl border-2 border-border focus:border-[var(--primary)] bg-background outline-none transition-all font-medium"
                />
              </div>

              <div className="space-y-4 pt-6 border-t border-border text-left">
                <h2 className="text-sm font-bold text-muted-foreground uppercase flex items-center gap-2 text-left">
                  <Sparkles className="w-4 h-4" />
                  Caption Style
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[250px] overflow-y-auto custom-scrollbar pr-2">
                  {tones.map((t) => (
                    <button
                      key={t.value}
                      onClick={() => setTone(t.value)}
                      className={`flex flex-col gap-2 p-4 rounded-xl border-2 transition-all cursor-pointer text-left ${
                        tone === t.value
                          ? 'border-[var(--primary)] bg-[var(--primary)]/5 text-[var(--primary)]'
                          : 'border-transparent bg-muted/50 hover:bg-muted text-muted-foreground'
                      }`}
                    >
                      <t.icon className="w-5 h-5" />
                      <div>
                        <div className="font-bold text-xs">{t.label}</div>
                        <div className="text-[10px] opacity-70 leading-tight">{t.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <Button
                onClick={generateCaption}
                disabled={!topic}
                isLoading={isGenerating}
                className="w-full py-4"
                leftIcon={<Sparkles className="w-5 h-5" />}
              >
                Generate Captions
              </Button>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:sticky lg:top-8 text-left">
            <div className="bg-card border border-border rounded-3xl p-6 md:p-8 shadow-sm space-y-6 flex flex-col h-full text-left">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold text-muted-foreground uppercase flex items-center gap-2 text-left">
                  <Send className="w-4 h-4" />
                  Generated Captions
                </h2>
                {generatedCaption && (
                  <button
                    onClick={() => copy(generatedCaption)}
                    className="text-xs font-bold text-[var(--primary)] hover:underline cursor-pointer"
                  >
                    {copied ? 'Copied!' : 'Copy All'}
                  </button>
                )}
              </div>

              <div className="flex-1 bg-muted/30 rounded-2xl p-6 min-h-[400px] flex flex-col relative group/preview text-left transition-all border border-border/50 hover:border-[var(--primary)]/30">
                <textarea
                  readOnly
                  value={generatedCaption}
                  className="flex-1 w-full bg-transparent border-none outline-none resize-none font-medium text-base leading-relaxed text-foreground custom-scrollbar"
                  placeholder="The AI-generated captions will appear here..."
                />
              </div>

              <div className="flex items-start gap-2 p-4 bg-[var(--primary)]/5 text-[var(--primary)] rounded-2xl text-[10px] leading-relaxed">
                <Info className="w-4 h-4 shrink-0 mt-0.5" />
                <p>ChatPilot AI generates multiple options so you can choose the one that fits your brand best.</p>
              </div>

              <Button
                onClick={() => copy(generatedCaption)}
                disabled={!generatedCaption}
                variant={copied ? 'secondary' : 'outline'}
                className="w-full py-4"
                leftIcon={copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              >
                {copied ? 'Copied to Clipboard' : 'Copy All Options'}
              </Button>
            </div>
          </div>
        </div>
    </div>
  );
}
