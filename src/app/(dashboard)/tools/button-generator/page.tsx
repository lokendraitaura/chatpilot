'use client';

import { useState } from 'react';
import { Copy, Check, Code, Phone, MousePointerClick } from 'lucide-react';
import { generateWhatsAppLink } from '@/lib/whatsapp';
import { useCopy } from '@/hooks/useCopy';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

export default function ButtonGeneratorPage() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [text, setText] = useState('Chat on WhatsApp');
  const [color, setColor] = useState('#25D366');
  const { copied, copy } = useCopy();

  const whatsappLink = generateWhatsAppLink(phoneNumber);
  const embedCode = `<a href="${whatsappLink}" style="background-color: ${color}; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; display: inline-flex; align-items: center; font-weight: bold; font-family: sans-serif;">
  <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" width="20" style="margin-right: 8px;" />
  ${text}
</a>`;

  return (
    <div className="space-y-10 max-w-5xl mx-auto">
      <div className="text-center space-y-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-16 h-16 mx-auto rounded-2xl gradient-primary flex items-center justify-center mb-6"
        >
          <MousePointerClick className="w-8 h-8 text-white" />
        </motion.div>
        <h1 className="text-4xl font-bold">WhatsApp Button Maker</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Create beautiful, high-converting WhatsApp buttons for your website. No coding required.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        <div className="bg-card border border-border rounded-3xl p-8 shadow-sm space-y-8">
          <div className="space-y-4">
            <label className="text-sm font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
              <Phone className="w-4 h-4" /> WhatsApp Number
            </label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="e.g. 1234567890"
              className="w-full p-4 rounded-xl border-2 border-border focus:border-[var(--primary)] bg-background outline-none transition-all font-medium"
            />
          </div>

          <div className="space-y-4">
            <label className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Button Text</label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full p-4 rounded-xl border-2 border-border focus:border-[var(--primary)] bg-background outline-none transition-all font-medium"
            />
          </div>

          <div className="space-y-4">
            <label className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Button Color</label>
            <div className="flex items-center space-x-4">
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-12 h-12 rounded-lg cursor-pointer border-0 p-0"
              />
              <span className="font-mono text-sm uppercase">{color}</span>
            </div>
          </div>
        </div>

        <div className="lg:sticky lg:top-8 flex flex-col space-y-8">
          <div className="bg-card border border-border rounded-3xl p-10 flex flex-col items-center justify-center text-center">
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-8">Live Preview</h3>
            <div 
              style={{ backgroundColor: color }}
              className="px-8 py-4 rounded-2xl text-white font-bold flex items-center space-x-3 shadow-xl cursor-pointer hover:opacity-90 transition-opacity"
            >
              <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" className="w-6 h-6 invert" />
              <span>{text}</span>
            </div>
          </div>

          <div className="bg-card border border-border rounded-3xl p-8 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold uppercase text-xs text-muted-foreground tracking-widest flex items-center gap-2">
                <Code className="w-4 h-4" /> Embed Code
              </h3>
              <button
                onClick={() => copy(embedCode)}
                className="text-xs font-bold text-[var(--primary)] hover:underline cursor-pointer"
              >
                {copied ? 'Copied Code!' : 'Copy Code'}
              </button>
            </div>
            <pre className="p-4 rounded-xl bg-muted/50 border border-border text-[10px] overflow-x-auto font-mono text-muted-foreground whitespace-pre-wrap">
              {embedCode}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
