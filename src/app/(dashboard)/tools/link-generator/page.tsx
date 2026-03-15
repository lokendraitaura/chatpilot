'use client';

import { useState } from 'react';
import { Phone, MessageSquare, Link as LinkIcon, Copy, Check, ExternalLink, Zap } from 'lucide-react';
import { generateWhatsAppLink } from '@/lib/whatsapp';
import { useCopy } from '@/hooks/useCopy';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

export default function LinkGeneratorPage() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const { copied, copy } = useCopy();

  const whatsappLink = generateWhatsAppLink(phoneNumber, message);

  return (
    <div className="space-y-10 max-w-5xl mx-auto">
      <div className="text-center space-y-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-16 h-16 mx-auto rounded-2xl gradient-primary flex items-center justify-center mb-6"
        >
          <LinkIcon className="w-8 h-8 text-white" />
        </motion.div>
        <h1 className="text-4xl font-bold">WhatsApp Link Generator</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Create custom WhatsApp links that customers can click to chat with you instantly without saving your number.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        <div className="bg-card border border-border rounded-3xl p-8 shadow-sm space-y-8">
          <div className="space-y-4">
            <label className="text-sm font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
              <Phone className="w-4 h-4" /> Phone Number
            </label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="e.g. 1234567890 (inc. country code)"
              className="w-full p-4 rounded-xl border-2 border-border focus:border-[var(--primary)] bg-background outline-none transition-all font-medium"
            />
          </div>

          <div className="space-y-4">
            <label className="text-sm font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
              <MessageSquare className="w-4 h-4" /> Pre-filled Message (Optional)
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="e.g. Hi ChatPilot! I'd like to learn more about your platform."
              className="w-full p-4 rounded-xl border-2 border-border focus:border-[var(--primary)] bg-background outline-none transition-all h-40 resize-none font-medium text-sm"
            />
          </div>

          <div className="flex items-start gap-4 p-4 bg-blue-500/5 text-blue-500 rounded-2xl text-xs leading-relaxed border border-blue-500/10">
            <Zap className="w-5 h-5 shrink-0" />
            <p>Pro Tip: Use pre-filled messages to track where your leads are coming from (e.g. 'Hi, I saw your ad on Instagram').</p>
          </div>
        </div>

        <div className="lg:sticky lg:top-8 space-y-6 text-left">
          <div className="bg-card border-2 border-[var(--primary)]/20 rounded-3xl p-8 shadow-xl space-y-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--primary)]/5 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform" />
            
            <h3 className="font-bold text-xl relative z-10">Your generated link is ready</h3>
            
            <div className="p-6 rounded-2xl bg-muted/50 border border-border break-all font-mono text-xs leading-relaxed text-muted-foreground relative z-10 min-h-[100px] flex items-center justify-center">
              {phoneNumber ? whatsappLink : 'Enter phone number to generate link...'}
            </div>

            <div className="grid grid-cols-2 gap-4 relative z-10">
              <Button
                onClick={() => copy(whatsappLink)}
                disabled={!phoneNumber}
                variant={copied ? 'secondary' : 'primary'}
                className="w-full py-4 text-sm"
                leftIcon={copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              >
                {copied ? 'Copied!' : 'Copy Link'}
              </Button>

              <a 
                href={whatsappLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className={`flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold bg-muted hover:bg-muted/80 transition-all text-sm ${!phoneNumber && 'opacity-50 pointer-events-none'}`}
              >
                <ExternalLink className="w-4 h-4" />
                Test Link
              </a>
            </div>
          </div>
          
          <p className="px-4 text-xs text-muted-foreground leading-relaxed">
            Note: ChatPilot links are standard WhatsApp links (`wa.me`) and are 100% safe and secure.
          </p>
        </div>
      </div>
    </div>
  );
}
