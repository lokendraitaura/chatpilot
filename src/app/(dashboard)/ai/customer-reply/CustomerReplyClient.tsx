'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Copy, Check, MessageCircle, LayoutGrid, Heart, Briefcase, Users, Send, Smile, Shield, Clock, User, Zap, Search, HelpCircle, Target, Coffee, Minus, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCopy } from '@/hooks/useCopy';
import { toast } from 'sonner';

export default function CustomerReplyClient() {
  const [customerMessage, setCustomerMessage] = useState('');
  const [tone, setTone] = useState<string>('helpful');
  const [context, setContext] = useState('');
  const [generatedReply, setGeneratedReply] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { copied, copy } = useCopy();

  const tones = [
    { value: 'helpful', label: 'Helpful', icon: Heart, desc: 'Supportive & kind' },
    { value: 'apologetic', label: 'Apologetic', icon: Users, desc: 'Empathetic & sorry' },
    { value: 'professional', label: 'Professional', icon: Briefcase, desc: 'Formal & official' },
    { value: 'friendly', label: 'Friendly', icon: Send, desc: 'Warm & casual' },
    { value: 'empathetic', label: 'Empathetic', icon: Heart, desc: 'Deep understanding' },
    { value: 'direct', label: 'Direct', icon: Send, desc: 'Clear & concise' },
    { value: 'reassuring', label: 'Reassuring', icon: Heart, desc: 'Comforting' },
    { value: 'urgent', label: 'Urgent', icon: Briefcase, desc: 'Immediate action' },
    { value: 'educational', label: 'Educational', icon: Users, desc: 'Guiding & teaching' },
    { value: 'diplomatic', label: 'Diplomatic', icon: Briefcase, desc: 'Careful & tactful' },
    { value: 'enthusiastic', label: 'Enthusiastic', icon: Sparkles, desc: 'High energy' },
    { value: 'humorous', label: 'Humorous', icon: Smile, desc: 'Funny & light' },
    { value: 'firm', label: 'Firm', icon: Shield, desc: 'Strict & decisive' },
    { value: 'patient', label: 'Patient', icon: Clock, desc: 'Taking time' },
    { value: 'respectful', label: 'Respectful', icon: User, desc: 'Very polite' },
    { value: 'assertive', label: 'Assertive', icon: Zap, desc: 'Confident' },
    { value: 'curious', label: 'Curious', icon: Search, desc: 'Asking more' },
    { value: 'grateful', label: 'Grateful', icon: Heart, desc: 'Thankful' },
    { value: 'conciliatory', label: 'Conciliatory', icon: Users, desc: 'Peace-making' },
    { value: 'skeptical', label: 'Skeptical', icon: HelpCircle, desc: 'Doubtful' },
    { value: 'persuasive', label: 'Persuasive', icon: Target, desc: 'Convincing' },
    { value: 'vibrant', label: 'Vibrant', icon: Sparkles, desc: 'Lively' },
    { value: 'calm', label: 'Calm', icon: Coffee, desc: 'Relaxed' },
    { value: 'authoritative', label: 'Authoritative', icon: Shield, desc: 'Commanding' },
    { value: 'supportive', label: 'Supportive', icon: Heart, desc: 'Backing up' },
    { value: 'witty', label: 'Witty', icon: Zap, desc: 'Clever reply' },
    { value: 'bold', label: 'Bold', icon: Zap, desc: 'Fearless' },
    { value: 'minimalist', label: 'Minimalist', icon: Minus, desc: 'Very short' },
    { value: 'detailed', label: 'Detailed', icon: FileText, desc: 'Full info' },
    { value: 'sincere', label: 'Sincere', icon: Heart, desc: 'Genuine' },
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
      } else { 
        toast.error(data.error || 'Generation failed. Please try again or wait a minute.'); 
      } 
    } catch (error) { 
      console.error('Generation Error:', error); 
      toast.error('Experiencing high network load or rate limits. Please wait a moment.'); 
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

            <div className="space-y-4 pt-6 border-t border-border text-left font-medium">
              <h2 className="text-sm font-bold text-muted-foreground uppercase flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Select Response Tone
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
                className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-[var(--primary)] outline-none text-sm font-medium"
              />
            </div>

            <Button
              onClick={generateReply}
              disabled={!customerMessage}
              isLoading={isGenerating}
              className="w-full py-4 text-sm font-bold"
              leftIcon={<Sparkles className="w-5 h-5" />}
            >
              Generate AI Reply
            </Button>
          </div>
        </div>

        <div className="lg:sticky lg:top-8 text-left">
          <div className="bg-card border border-border rounded-3xl p-6 md:p-8 shadow-sm space-y-6 flex flex-col h-full text-left">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-muted-foreground uppercase flex items-center gap-2 font-medium">
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
            </div>

            <Button
              onClick={() => copy(generatedReply)}
              disabled={!generatedReply}
              variant={copied ? 'secondary' : 'outline'}
              className="w-full py-4 font-bold text-sm"
              leftIcon={copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
            >
              {copied ? 'Copied Successfully' : 'Copy AI Response'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
