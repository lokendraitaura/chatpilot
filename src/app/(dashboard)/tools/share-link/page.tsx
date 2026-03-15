'use client';

import { useState } from 'react';
import { Share2, Sparkles, Copy, Check, ExternalLink } from 'lucide-react';
import { generateShareLink } from '@/lib/whatsapp';
import { useCopy } from '@/hooks/useCopy';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

export default function ShareLinkPage() {
  const [message, setMessage] = useState('');
  const { copied, copy } = useCopy();

  const shareLink = generateShareLink(message);

  return (
    <div className="space-y-10 max-w-4xl mx-auto">
      <div className="text-center space-y-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-16 h-16 mx-auto rounded-2xl gradient-primary flex items-center justify-center mb-6"
        >
          <Share2 className="w-8 h-8 text-white" />
        </motion.div>
        <h1 className="text-4xl font-bold">Share Link Creator</h1>
        <p className="text-lg text-muted-foreground">Create links that anyone can click to share a specific message to their WhatsApp status or contacts.</p>
      </div>

      <div className="bg-card border border-border rounded-3xl p-8 shadow-sm space-y-8">
        <div className="space-y-4">
          <label className="text-sm font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2 text-left">
            <Sparkles className="w-4 h-4" /> The Message to be Shared
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="e.g. Check out this amazing platform ChatPilot! 🚀"
            className="w-full p-6 rounded-2xl border-2 border-border focus:border-[var(--primary)] bg-background outline-none transition-all h-48 resize-none font-medium"
          />
        </div>

        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-muted/50 border border-border break-all font-mono text-xs text-muted-foreground min-h-[100px] flex items-center justify-center text-center">
            {message ? shareLink : 'Enter a message to generate share link...'}
          </div>

          <div className="flex gap-4">
            <Button
              onClick={() => copy(shareLink)}
              disabled={!message}
              variant={copied ? 'secondary' : 'primary'}
              className="flex-1 py-4"
              leftIcon={copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            >
              {copied ? 'Copied!' : 'Copy Share Link'}
            </Button>
            <a 
              href={shareLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className={`flex-1 px-6 py-4 rounded-xl font-bold bg-muted hover:bg-muted/80 transition-all flex items-center justify-center gap-2 ${!message && 'opacity-50 pointer-events-none'}`}
            >
              <ExternalLink className="w-4 h-4" />
              Test
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
