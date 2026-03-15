'use client';

import { useState } from 'react';
import { Bold, Italic, Strikethrough, Code, Copy, Check, Type } from 'lucide-react';
import { formatWhatsAppText } from '@/lib/whatsapp';
import { useCopy } from '@/hooks/useCopy';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

export default function MessageFormatterPage() {
  const [text, setText] = useState('');
  const { copied, copy } = useCopy();

  const actions = [
    { label: 'Bold', icon: Bold, start: '*', end: '*' },
    { label: 'Italic', icon: Italic, start: '_', end: '_' },
    { label: 'Strike', icon: Strikethrough, start: '~', end: '~' },
    { label: 'Monospace', icon: Code, start: '```', end: '```' },
  ];

  const applyFormat = (start: string, end: string) => {
    const textarea = document.getElementById('main-textarea') as HTMLTextAreaElement;
    if (!textarea) return;

    const s = textarea.selectionStart;
    const e = textarea.selectionEnd;
    const selectedText = text.substring(s, e);
    
    if (selectedText) {
      const newText = text.substring(0, s) + start + selectedText + end + text.substring(e);
      setText(newText);
    } else {
      setText(text + start + end);
    }
  };

  return (
    <div className="space-y-10 max-w-5xl mx-auto">
      <div className="text-center space-y-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-16 h-16 mx-auto rounded-2xl gradient-primary flex items-center justify-center mb-6"
        >
          <Type className="w-8 h-8 text-white" />
        </motion.div>
        <h1 className="text-4xl font-bold">WhatsApp Formatter</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Write beautiful WhatsApp messages with bold, italic, and strikethrough styling without remembering codes.
        </p>
      </div>

      <div className="bg-card border border-border rounded-3xl p-8 shadow-sm space-y-6">
        <div className="flex flex-wrap gap-2 pb-4 border-b border-border">
          {actions.map((action) => (
            <Button
              key={action.label}
              variant="secondary"
              size="sm"
              onClick={() => applyFormat(action.start, action.end)}
              className="flex items-center gap-2"
              leftIcon={<action.icon className="w-4 h-4" />}
            >
              {action.label}
            </Button>
          ))}
        </div>

        <textarea
          id="main-textarea"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start typing your message here..."
          className="w-full min-h-[300px] p-6 bg-transparent border-none outline-none resize-none text-lg leading-relaxed font-medium custom-scrollbar"
        />

        <div className="pt-6 border-t border-border flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            {text.length} characters | {text.split(/\s+/).filter(Boolean).length} words
          </p>
          <Button
            onClick={() => copy(text)}
            disabled={!text}
            variant={copied ? 'secondary' : 'primary'}
            leftIcon={copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
          >
            {copied ? 'Copied!' : 'Copy Formatted Text'}
          </Button>
        </div>
      </div>
    </div>
  );
}
