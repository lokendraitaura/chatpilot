'use client';

import { useState } from 'react';
import { Sparkles, Copy, Check, RefreshCw, MessageCircle, LayoutGrid, Heart, Briefcase, Users, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCopy } from '@/hooks/useCopy';
import { motion, AnimatePresence } from 'framer-motion';

export default function CustomerReplyPage() {
  const [customerMessage, setCustomerMessage] = useState('');
  const [tone, setTone] = useState<'helpful' | 'apologetic' | 'professional' | 'friendly'>('helpful');
  const [context, setContext] = useState('');
  const [generatedReply, setGeneratedReply] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { copied, copy } = useCopy();

  const tones = [
    { value: 'helpful' as const, label: 'Helpful', icon: Heart, desc: 'Supportive & kind' },
    { value: 'apologetic' as const, label: 'Apologetic', icon: Users, desc: 'Empathetic & sorry' },
    { value: 'professional' as const, label: 'Professional', icon: Briefcase, desc: 'Formal & official' },
    { value: 'friendly' as const, label: 'Friendly', icon: Send, desc: 'Warm & casual' },
  ];

  const generateReply = async () => {
    if (!customerMessage) return;
    setIsGenerating(true);
    try {
      const response = await fetch('/api/ai/customer-reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          query: `Message: ${customerMessage}. Tone: ${tone}. Context: ${context}` 
        }),
      });
      const data = await response.json();
      if (data.success) {
        setGeneratedReply(data.data);
      }
    } catch (error) {
      console.error('Reply Generation Error:', error);
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
          <h1 className="text-4xl font-bold">AI Customer Reply</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Generate professional, empathetic customer service responses instantly based on customer queries.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto items-start">
          {/* Left Column: Editor */}
          <div className="space-y-6 text-left">
            <div className="bg-card border border-border rounded-3xl p-6 md:p-8 shadow-sm space-y-8 text-left">
              <div className="space-y-4 text-left">
                <h2 className="text-sm font-bold text-muted-foreground uppercase flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Customer Query
                </h2>
                <textarea
                  value={customerMessage}
                  onChange={(e) => setCustomerMessage(e.target.value)}
                  placeholder="Paste the message from your customer here..."
                  className="w-full min-h-[160px] p-6 rounded-2xl border-2 border-border focus:border-[var(--primary)] bg-background outline-none transition-all resize-none text-base font-medium"
                />
              </div>

              <div className="space-y-4 pt-6 border-t border-border text-left">
                <h2 className="text-sm font-bold text-muted-foreground uppercase flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Select Response Tone
                </h2>
                <div className="grid grid-cols-2 gap-3">
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

              <div className="space-y-4 pt-6 border-t border-border text-left">
                <h2 className="text-sm font-bold text-muted-foreground uppercase flex items-center gap-2">
                  <LayoutGrid className="w-4 h-4" />
                  Additional Context (Optional)
                </h2>
                <input
                  type="text"
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                  placeholder="e.g. Refund processed, shipping tomorrow"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-[var(--primary)] outline-none text-sm"
                />
              </div>

              <Button
                onClick={generateReply}
                disabled={!customerMessage}
                isLoading={isGenerating}
                className="w-full py-4"
                leftIcon={<Sparkles className="w-5 h-5" />}
              >
                Generate AI Reply
              </Button>
            </div>
          </div>

          {/* Right Column: Output */}
          <div className="lg:sticky lg:top-8 text-left">
            <div className="bg-card border border-border rounded-3xl p-6 md:p-8 shadow-sm space-y-6 flex flex-col h-full text-left">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold text-muted-foreground uppercase flex items-center gap-2">
                  <Send className="w-4 h-4" />
                  Generated Reply
                </h2>
                {generatedReply && (
                  <button
                    onClick={() => copy(generatedReply)}
                    className="text-xs font-bold text-[var(--primary)] hover:underline cursor-pointer"
                  >
                    {copied ? 'Copied!' : 'Copy Reply'}
                  </button>
                )}
              </div>

              <div className="flex-1 bg-muted/30 rounded-2xl p-6 min-h-[500px] flex flex-col relative group/preview text-left transition-all border border-border/50 hover:border-[var(--primary)]/30">
                <textarea
                  readOnly
                  value={generatedReply}
                  className="flex-1 w-full bg-transparent border-none outline-none resize-none font-medium text-base leading-relaxed text-foreground custom-scrollbar"
                  placeholder="The AI-generated response will appear here..."
                />
                {!generatedReply && !isGenerating && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center space-y-4 opacity-50">
                    <MessageCircle className="w-12 h-12 text-muted-foreground" />
                    <p className="text-sm font-medium">No reply generated yet</p>
                  </div>
                )}
              </div>

              <button
                onClick={() => copy(generatedReply)}
                disabled={!generatedReply}
                className={`w-full py-4 rounded-2xl font-bold transition-all flex items-center justify-center space-x-2 cursor-pointer ${
                  copied 
                    ? 'bg-green-500/10 text-green-500 border border-green-500/20' 
                    : 'border-2 border-border hover:border-[var(--primary)] hover:bg-[var(--primary)]/5 text-foreground'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                <span>{copied ? 'Copied' : 'Copy AI Response'}</span>
              </button>
            </div>
          </div>
        </div>
    </div>
  );
}
