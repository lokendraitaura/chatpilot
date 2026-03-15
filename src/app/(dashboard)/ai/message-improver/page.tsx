'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Copy, CheckCircle2, MessageSquare, ArrowRight, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
// DashboardLayout removed - handled by (dashboard)/layout.tsx

const TONE_OPTIONS = [
  { value: 'professional', label: 'Professional', emoji: '👔' },
  { value: 'friendly', label: 'Friendly', emoji: '😊' },
  { value: 'persuasive', label: 'Persuasive', emoji: '🎯' },
  { value: 'urgent', label: 'Urgent', emoji: '⚡' },
  { value: 'empathetic', label: 'Empathetic', emoji: '🤝' },
];

export default function MessageImprover() {
  const [originalMessage, setOriginalMessage] = useState('');
  const [selectedTone, setSelectedTone] = useState(TONE_OPTIONS[0]);
  const [improvedMessage, setImprovedMessage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleImprove = async () => {
    if (!originalMessage) return;
    setIsGenerating(true);
    try {
      const response = await fetch('/api/ai/message-improver', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: `${originalMessage}. Tone: ${selectedTone.label}` 
        }),
      });
      const data = await response.json();
      if (data.success) {
        setImprovedMessage(data.data);
      }
    } catch (error) {
      console.error('Improvement Error:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = async () => {
    if (!improvedMessage) return;
    try {
      await navigator.clipboard.writeText(improvedMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text', err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* Header */}
        <div className="text-center space-y-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-6 gradient-primary shadow-lg"
          >
            <Sparkles className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">AI Message Improver</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Turn your rough drafts or short notes into polished, professional WhatsApp messages in seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* Left Column: Input */}
          <div className="bg-card rounded-2xl border border-border p-6 shadow-sm space-y-6">
            <div className="space-y-3">
              <label className="text-sm font-semibold flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[var(--primary)]" />
                Original Message
              </label>
              <textarea
                value={originalMessage}
                onChange={(e) => setOriginalMessage(e.target.value)}
                placeholder="Type your rough message here... (e.g. 'tell team meeting at 5pm about project x')"
                className="w-full h-48 px-4 py-3 rounded-xl bg-background border border-border focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] outline-none transition-all resize-none"
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold">Select Tone</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {TONE_OPTIONS.map((tone) => (
                  <button
                    key={tone.value}
                    onClick={() => setSelectedTone(tone)}
                    className={`p-3 rounded-xl border-2 transition-all cursor-pointer text-sm font-medium flex items-center justify-center space-x-2 ${
                      selectedTone.value === tone.value
                        ? 'border-[var(--primary)] bg-[var(--primary)]/10 text-[var(--primary)]'
                        : 'border-transparent bg-muted hover:bg-muted/80 text-muted-foreground'
                    }`}
                  >
                    <span>{tone.emoji}</span>
                    <span>{tone.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <Button
              onClick={handleImprove}
              disabled={!originalMessage}
              isLoading={isGenerating}
              className="w-full py-4 text-base"
              leftIcon={<Sparkles className="w-6 h-6" />}
            >
              Improve Message with AI
            </Button>
          </div>

          {/* Right Column: Output */}
          <div className="flex flex-col h-full space-y-4">
            <div className="hidden lg:flex justify-center items-center py-4">
               <ArrowRight className="w-8 h-8 text-muted-foreground/30 animate-pulse" />
            </div>

            <div className="bg-card rounded-2xl border border-border p-6 shadow-sm flex-1 flex flex-col min-h-[500px]">
              <div className="flex items-center justify-between mb-4">
                <label className="text-sm font-semibold flex items-center gap-2">
                  <Wand2 className="w-4 h-4 text-[var(--primary)]" />
                  Polished Message
                </label>
                {improvedMessage && (
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-[var(--primary)]/10 text-[var(--primary)]">
                    {selectedTone.emoji} {selectedTone.label}
                  </span>
                )}
              </div>

              <div className="flex-1 bg-muted/30 rounded-xl p-6 relative mb-4 overflow-y-auto custom-scrollbar">
                {improvedMessage ? (
                  <div className="whitespace-pre-wrap text-[15px] leading-relaxed text-foreground font-medium">
                    {improvedMessage}
                  </div>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground/50">
                    <Sparkles className="w-12 h-12 mb-2 opacity-50" />
                    <p className="text-sm">Your improved message will appear here</p>
                  </div>
                )}
              </div>

              <Button
                onClick={handleCopy}
                disabled={!improvedMessage}
                variant="outline"
                className="w-full py-4"
              >
                <AnimatePresence mode="wait">
                  {copied ? (
                    <motion.div
                      key="copied"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex items-center space-x-2 text-[var(--primary)]"
                    >
                      <CheckCircle2 className="w-5 h-5" />
                      <span>Copied to Clipboard!</span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="copy"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex items-center space-x-2"
                    >
                      <Copy className="w-5 h-5" />
                      <span>Copy Result</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </div>
          </div>

      </div>
    </div>
  );
}
