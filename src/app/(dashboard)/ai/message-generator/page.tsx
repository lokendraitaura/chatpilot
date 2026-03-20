'use client';

import { useState } from 'react';
import { Sparkles, Copy, Check, MessageSquare, Send, Heart, Briefcase, Users, LayoutGrid, Info, Smile, Zap, Target, Minus, HelpCircle, Shield, User, MessageCircle } from 'lucide-react';
import { useCopy } from '@/hooks/useCopy';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function MessageGeneratorPage() {
  const [purpose, setPurpose] = useState('');
  const [tone, setTone] = useState<string>('professional');
  const [context, setContext] = useState('');
  const [generatedMessage, setGeneratedMessage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { copied, copy } = useCopy();

  const tones = [
    { value: 'professional', label: 'Professional', icon: Briefcase, desc: 'Formal & official' },
    { value: 'friendly', label: 'Friendly', icon: Heart, desc: 'Warm & kind' },
    { value: 'casual', label: 'Casual', icon: Send, desc: 'Light & easy' },
    { value: 'formal', label: 'Formal', icon: Briefcase, desc: 'Strict & serious' },
    { value: 'enthusiastic', label: 'Enthusiastic', icon: Sparkles, desc: 'High energy' },
    { value: 'persuasive', label: 'Persuasive', icon: Users, desc: 'Action focused' },
    { value: 'urgent', label: 'Urgent', icon: Briefcase, desc: 'Time-sensitive' },
    { value: 'empathetic', label: 'Empathetic', icon: Heart, desc: 'Understanding' },
    { value: 'direct', label: 'Direct', icon: Send, desc: 'Straight to point' },
    { value: 'educational', label: 'Educational', icon: Sparkles, desc: 'Informative' },
    { value: 'witty', label: 'Witty', icon: Users, desc: 'Clever & sharp' },
    { value: 'diplomatic', label: 'Diplomatic', icon: Users, desc: 'Tactful approach' },
    { value: 'humorous', label: 'Humorous', icon: Smile, desc: 'Lighthearted' },
    { value: 'sarcastic', label: 'Sarcastic', icon: Smile, desc: 'Dry humor' },
    { value: 'bold', label: 'Bold', icon: Zap, desc: 'Strong & clear' },
    { value: 'calm', label: 'Calm', icon: Heart, desc: 'Peaceful' },
    { value: 'assertive', label: 'Assertive', icon: Zap, desc: 'Confident' },
    { value: 'supportive', label: 'Supportive', icon: Heart, desc: 'Helpful' },
    { value: 'salesy', label: 'Salesy', icon: Target, desc: 'Conversion focused' },
    { value: 'storytelling', label: 'Storytelling', icon: Users, desc: 'Narrative' },
    { value: 'minimalist', label: 'Minimalist', icon: Minus, desc: 'Very concise' },
    { value: 'mysterious', label: 'Mysterious', icon: HelpCircle, desc: 'Intriguing' },
    { value: 'authoritative', label: 'Authoritative', icon: Shield, desc: 'Expert tone' },
    { value: 'reassuring', label: 'Reassuring', icon: Shield, desc: 'Comforting' },
    { value: 'playful', label: 'Playful', icon: Smile, desc: 'Fun focused' },
    { value: 'humble', label: 'Humble', icon: User, desc: 'Modest' },
    { value: 'corporate', label: 'Corporate', icon: Briefcase, desc: 'Office style' },
    { value: 'inspirational', label: 'Inspirational', icon: Zap, desc: 'Visionary' },
    { value: 'conversational', label: 'Conversational', icon: MessageCircle, desc: 'Natural flow' },
    { value: 'firm', label: 'Firm', icon: Shield, desc: 'Unwavering' },
  ];

  const generateMessage = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/ai/message-generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          prompt: `${purpose}. Tone: ${tone}. Context: ${context}` 
        }),
      });
      const data = await response.json();
      if (data.success) {
        setGeneratedMessage(data.data);
      }
    } catch (error) {
      console.error('Generation Error:', error);
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
            <Sparkles className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-4xl font-bold">AI Message Generator</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Craft high-converting, professional WhatsApp messages for any business purpose instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto items-start text-left">
          {/* Left Column: Config */}
          <div className="space-y-6 text-left">
            <div className="bg-card border border-border rounded-3xl p-6 md:p-8 shadow-sm space-y-8 text-left">
              <div className="space-y-4 text-left">
                <h2 className="text-sm font-bold text-muted-foreground uppercase flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Message Purpose
                </h2>
                <input
                  type="text"
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  placeholder="e.g. Schedule a demo, Follow up on last meeting"
                  className="w-full px-5 py-4 rounded-xl border-2 border-border focus:border-[var(--primary)] bg-background outline-none transition-all font-medium"
                />
              </div>

              <div className="space-y-4 pt-6 border-t border-border text-left">
                <h2 className="text-sm font-bold text-muted-foreground uppercase flex items-center gap-2 text-left">
                  <Sparkles className="w-4 h-4" />
                  Desired Tone
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[250px] overflow-y-auto custom-scrollbar pr-2">
                  {tones.map((t) => (
                    <button
                      key={t.value}
                      onClick={() => setTone(t.value as any)}
                      className={`flex flex-col gap-2 p-4 rounded-xl border-2 transition-all cursor-pointer text-left ${
                        tone === t.value
                          ? 'border-[var(--primary)] bg-[var(--primary)]/5 text-[var(--primary)]'
                          : 'border-transparent bg-muted/50 hover:bg-muted text-muted-foreground'
                      }`}
                    >
                      <t.icon className="w-5 h-5" />
                      <div>
                        <div className="font-bold text-[10px] uppercase truncate">{t.label}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4 pt-6 border-t border-border text-left">
                <h2 className="text-sm font-bold text-muted-foreground uppercase flex items-center gap-2 text-left">
                  <LayoutGrid className="w-4 h-4" />
                  Additional Context
                </h2>
                <textarea
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                  placeholder="Any specific names, links, or dates to include..."
                  className="w-full min-h-[120px] p-4 rounded-xl border-2 border-border focus:border-[var(--primary)] bg-background outline-none transition-all resize-none text-sm leading-relaxed"
                />
              </div>

              <Button
                onClick={generateMessage}
                disabled={!purpose}
                isLoading={isGenerating}
                className="w-full py-4 text-lg"
                leftIcon={<Sparkles className="w-5 h-5" />}
              >
                Create AI Message
              </Button>
            </div>
          </div>

          {/* Right Column: Output */}
          <div className="lg:sticky lg:top-8 text-left">
            <div className="bg-card border border-border rounded-3xl p-6 md:p-8 shadow-sm space-y-6 flex flex-col h-full text-left">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold text-muted-foreground uppercase flex items-center gap-2 text-left">
                  <Send className="w-4 h-4" />
                  Generated Result
                </h2>
                {generatedMessage && (
                  <button
                    onClick={() => copy(generatedMessage)}
                    className="text-xs font-bold text-[var(--primary)] hover:underline cursor-pointer"
                  >
                    {copied ? 'Copied!' : 'Copy to Clipboard'}
                  </button>
                )}
              </div>

              <div className="flex-1 bg-muted/30 rounded-2xl p-6 min-h-[500px] flex flex-col relative group/preview text-left transition-all border border-border/50 hover:border-[var(--primary)]/30">
                <textarea
                  readOnly
                  value={generatedMessage}
                  className="flex-1 w-full bg-transparent border-none outline-none resize-none font-medium text-base leading-relaxed text-foreground custom-scrollbar"
                  placeholder="Your custom AI-generated message will appear here..."
                />
                {!generatedMessage && !isGenerating && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center space-y-4 opacity-50">
                    <MessageSquare className="w-12 h-12 text-muted-foreground" />
                    <p className="text-sm font-medium">No message generated yet</p>
                  </div>
                )}
              </div>

              <div className="flex items-start gap-2 p-4 bg-[var(--primary)]/5 text-[var(--primary)] rounded-2xl text-[10px] leading-relaxed">
                <Info className="w-4 h-4 shrink-0 mt-0.5" />
                <p>Pro Tip: Use the persuasive tone for high-conversion sales outreach messages.</p>
              </div>

              <Button
                onClick={() => copy(generatedMessage)}
                disabled={!generatedMessage}
                variant={copied ? 'secondary' : 'outline'}
                className={cn(
                  "w-full py-4",
                  copied && "text-green-500 bg-green-500/10 border-green-500/20"
                )}
                leftIcon={copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              >
                {copied ? 'Copied Successfully' : 'Copy Response'}
              </Button>
            </div>
          </div>
      </div>
    </div>
  );
}
