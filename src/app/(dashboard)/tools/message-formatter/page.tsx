'use client';

import { useState } from 'react';
import { Bold, Italic, Strikethrough, Code, Copy, Check, Type } from 'lucide-react';
import { formatWhatsAppText } from '@/lib/whatsapp';
import { useCopy } from '@/hooks/useCopy';
import { motion, AnimatePresence } from 'motion/react';
// DashboardLayout removed - handled by (dashboard)/layout.tsx

export default function MessageFormatterPage() {
  const [text, setText] = useState('');
  const [preview, setPreview] = useState('');
  const { copied, copy } = useCopy();

  const applyFormat = (format: 'bold' | 'italic' | 'strikethrough' | 'monospace') => {
    const selection = window.getSelection();
    const selectedText = selection?.toString() || text;
    
    if (selectedText) {
      const formatted = formatWhatsAppText(selectedText, format);
      const newText = text.replace(selectedText, formatted);
      setText(newText);
      setPreview(newText);
    }
  };

  const formatButtons = [
    { label: 'Bold', icon: Bold, format: 'bold' as const, example: '*text*' },
    { label: 'Italic', icon: Italic, format: 'italic' as const, example: '_text_' },
    { label: 'Strike', icon: Strikethrough, format: 'strikethrough' as const, example: '~text~' },
    { label: 'Mono', icon: Code, format: 'monospace' as const, example: '```text```' },
  ];

  return (
    <div className="space-y-8">
        <div className="text-center space-y-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-16 h-16 mx-auto rounded-2xl gradient-primary flex items-center justify-center mb-6"
          >
            <Type className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-4xl font-bold">WhatsApp Text Formatter</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Easily apply Bold, Italic, and Strikethrough to your WhatsApp messages.
          </p>
        </div>

        <div className="max-w-4xl mx-auto w-full space-y-6">
          <div className="bg-card border border-border rounded-3xl p-6 md:p-8 shadow-sm space-y-6 overflow-hidden">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-2 p-2 bg-muted/50 rounded-2xl border border-border">
              {formatButtons.map((btn) => (
                <button
                  key={btn.format}
                  onClick={() => applyFormat(btn.format)}
                  className="flex items-center space-x-2 px-4 py-2.5 rounded-xl border border-border bg-card hover:bg-[var(--primary)]/10 hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all cursor-pointer group"
                >
                  <btn.icon className="w-4 h-4" />
                  <span className="text-sm font-bold">{btn.label}</span>
                </button>
              ))}
            </div>

            {/* Input Area */}
            <div className="relative group">
              <textarea
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                  setPreview(e.target.value);
                }}
                placeholder="Type your message here... Select text and click buttons to format."
                rows={10}
                className="w-full px-6 py-5 rounded-2xl border-2 border-border focus:border-[var(--primary)] bg-background outline-none transition-all resize-none font-mono text-sm leading-relaxed"
              />
              <div className="absolute top-4 right-4 text-xs font-mono text-muted-foreground bg-muted p-1 px-2 rounded-md group-focus-within:text-[var(--primary)] group-focus-within:bg-[var(--primary)]/10 transition-colors">
                {text.length} chars
              </div>
            </div>

            {/* Copy Button */}
            <button
              onClick={() => copy(text)}
              disabled={!text}
              className="w-full py-4 rounded-2xl gradient-primary text-white font-bold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center space-x-2 shadow-lg shadow-[var(--primary)]/20 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-5 h-5" />
                  <span>Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5" />
                  <span>Copy Formatted Text</span>
                </>
              )}
            </button>
          </div>

          {/* Tips Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {formatButtons.map((btn) => (
              <div key={btn.format} className="p-3 rounded-2xl border border-border bg-muted/30 text-center">
                <span className="text-[10px] uppercase font-bold text-muted-foreground block mb-1">{btn.label}</span>
                <code className="text-xs font-mono text-[var(--primary)] font-bold">{btn.example}</code>
              </div>
            ))}
          </div>
        </div>
      </div>
  );
}
