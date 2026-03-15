'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, ExternalLink, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { generateWhatsAppLink } from '@/lib/whatsapp';
import { useCopy } from '@/hooks/useCopy';
// DashboardLayout removed - handled by (dashboard)/layout.tsx

export default function LinkGeneratorPage() {
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const { copied, copy } = useCopy();

  const handleGenerate = () => {
    if (phone) {
      const link = generateWhatsAppLink(phone, message);
      setGeneratedLink(link);
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
            <Phone className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-4xl font-bold">WhatsApp Link Generator</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Create custom WhatsApp links with pre-filled messages instantly.
          </p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm max-w-3xl mx-auto w-full">
          <div className="space-y-6">
            {/* Phone Input */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Phone Number (with country code)
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 919876543210"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all cursor-text"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Include country code (e.g. 91 for India) without + or spaces.
              </p>
            </div>

            {/* Message Input */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Pre-filled Message (Optional)
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Hi! I'd like to know more about..."
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all resize-none cursor-text"
              />
            </div>

            {/* Generate Button */}
            <Button
              onClick={handleGenerate}
              disabled={!phone}
              className="w-full py-4"
            >
              Generate Link
            </Button>

            {/* Generated Link Area */}
            <AnimatePresence>
              {generatedLink && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="space-y-4 pt-6 border-t border-border"
                >
                  <label className="block text-sm font-medium text-[var(--primary)]">
                    Your Link is Ready!
                  </label>
                  <div className="flex flex-col sm:flex-row items-stretch gap-2">
                    <input
                      type="text"
                      value={generatedLink}
                      readOnly
                      className="flex-1 px-4 py-3 rounded-lg border border-border bg-muted/50 text-sm font-mono overflow-x-auto"
                    />
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => copy(generatedLink)}
                        className="flex-1 sm:flex-none justify-center px-4 py-3 rounded-lg border border-border hover:bg-muted transition-colors cursor-pointer flex items-center"
                      >
                        {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                        <span className="sm:hidden ml-2">{copied ? 'Copied' : 'Copy'}</span>
                      </button>
                      <a
                        href={generatedLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 sm:flex-none justify-center px-4 py-3 rounded-lg border border-border hover:bg-muted transition-colors cursor-pointer flex items-center"
                      >
                        <ExternalLink className="w-5 h-5" />
                        <span className="sm:hidden ml-2">Open</span>
                      </a>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* How-to Guide */}
        <div className="max-w-3xl mx-auto p-6 rounded-xl bg-muted/50 border border-border">
          <h3 className="font-semibold mb-3">Quick Guide:</h3>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
            <li>Type the phone number with country code.</li>
            <li>Add your custom message (optional).</li>
            <li>Click generate and copy the magic link!</li>
          </ul>
        </div>
    </div>
  );
}
