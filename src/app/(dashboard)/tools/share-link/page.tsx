'use client';

import { useState } from 'react';
import { Share2, Sparkles, Copy, Check, ExternalLink } from 'lucide-react';
import { generateShareLink } from '@/lib/whatsapp';
import { useCopy } from '@/hooks/useCopy';
import { motion, AnimatePresence } from 'motion/react';
// DashboardLayout removed - handled by (dashboard)/layout.tsx

export default function ShareLinkPage() {
  const [message, setMessage] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const { copied, copy } = useCopy();

  const handleGenerate = () => {
    if (message) {
      const link = generateShareLink(message);
      setGeneratedLink(link);
    }
  };

  const quickTemplates = [
    { label: 'Product Launch', icon: Sparkles, text: '🎉 Exciting news! Check out our latest product: [Product Name]. Get yours now!' },
    { label: 'Event Invite', icon: Share2, text: '📅 You\'re invited to [Event Name] on [Date]. Don\'t miss out!' },
    { label: 'Special Offer', icon: Sparkles, text: '🎁 Limited time offer! Get [Discount]% off on [Product/Service]. Use code: [CODE]' },
    { label: 'News Update', icon: Share2, text: '📢 Important update: [Your announcement here]' },
  ];

  const useTemplate = (text: string) => {
    setMessage(text);
  };

  return (
    <div className="space-y-8">
        <div className="text-center space-y-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-16 h-16 mx-auto rounded-2xl gradient-primary flex items-center justify-center mb-6"
          >
            <Share2 className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-4xl font-bold">WhatsApp Share Link</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Create broadcast-ready links to share your message with multiple people instantly.
          </p>
        </div>

        <div className="max-w-4xl mx-auto w-full space-y-6">
          {/* Templates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {quickTemplates.map((template, index) => (
              <button
                key={index}
                onClick={() => useTemplate(template.text)}
                className="flex items-center gap-4 p-4 rounded-2xl border border-border bg-card hover:border-[var(--primary)] hover:bg-[var(--primary)]/5 transition-all text-left cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-xl bg-muted group-hover:bg-[var(--primary)]/10 flex items-center justify-center shrink-0 transition-colors">
                  <template.icon className="w-5 h-5 text-muted-foreground group-hover:text-[var(--primary)]" />
                </div>
                <div>
                  <div className="text-sm font-bold">{template.label}</div>
                  <div className="text-xs text-muted-foreground line-clamp-1">{template.text}</div>
                </div>
              </button>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card border border-border rounded-3xl p-6 md:p-8 shadow-sm space-y-6"
          >
            <div>
              <label className="block text-sm font-bold mb-3 text-muted-foreground">Broadcast Message</label>
              <div className="relative">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell your customers something exciting..."
                  rows={6}
                  className="w-full px-6 py-5 rounded-2xl border-2 border-border focus:border-[var(--primary)] bg-background outline-none transition-all resize-none text-base leading-relaxed"
                />
              </div>
              <div className="flex items-center justify-between mt-3 px-2 text-xs font-bold text-muted-foreground">
                <span>{message.length} characters</span>
                <span className="text-[var(--primary)]">No limit</span>
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={!message}
              className="w-full py-4 rounded-2xl gradient-primary text-white font-bold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center space-x-2 shadow-lg shadow-[var(--primary)]/20 cursor-pointer"
            >
              <Share2 className="w-5 h-5" />
              <span>Generate Shareable Link</span>
            </button>

            <AnimatePresence>
              {generatedLink && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4 pt-6 border-t border-border mt-6"
                >
                  <div className="p-4 rounded-2xl bg-muted border border-border space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-muted-foreground uppercase">Your Link</span>
                      <button
                        onClick={() => copy(generatedLink)}
                        className="text-[var(--primary)] text-xs font-bold hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        {copied ? 'Copied!' : 'Copy Link'}
                      </button>
                    </div>
                    <div className="font-mono text-xs break-all text-muted-foreground bg-background p-3 rounded-lg border border-border/50">
                      {generatedLink}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => copy(generatedLink)}
                        className="flex-1 py-3 rounded-xl border border-border bg-card hover:bg-muted font-bold text-xs flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Copy className="w-4 h-4" />
                        Copy
                      </button>
                      <a
                        href={generatedLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-3 rounded-xl border border-border bg-card hover:bg-muted font-bold text-xs flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Open
                      </a>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
  );
}
