'use client';

import { useState } from 'react';
import { Copy, Check, Code, Phone, MousePointerClick } from 'lucide-react';
import { generateWhatsAppLink } from '@/lib/whatsapp';
import { useCopy } from '@/hooks/useCopy';
import { motion } from 'motion/react';
// DashboardLayout removed - handled by (dashboard)/layout.tsx

export default function ButtonGeneratorPage() {
  const [phone, setPhone] = useState('');
  const [buttonText, setButtonText] = useState('Chat with us');
  const [message, setMessage] = useState('');
  const [buttonStyle, setButtonStyle] = useState<'default' | 'rounded' | 'pill' | 'minimal'>('default');
  const [buttonColor, setButtonColor] = useState('#25D366');
  const [textColor, setTextColor] = useState('#FFFFFF');
  const { copied, copy } = useCopy();

  const whatsappLink = phone ? generateWhatsAppLink(phone, message) : '#';

  const buttonStyles = {
    default: 'px-6 py-3 rounded-lg',
    rounded: 'px-6 py-3 rounded-xl',
    pill: 'px-8 py-3 rounded-full',
    minimal: 'px-4 py-2 rounded',
  };

  const generateHTML = () => {
    return `<!-- WhatsApp Chat Button -->
<a href="${whatsappLink}" 
   target="_blank" 
   style="display: inline-flex; align-items: center; gap: 8px; background-color: ${buttonColor}; color: ${textColor}; padding: 12px 24px; border-radius: ${buttonStyle === 'pill' ? '9999px' : buttonStyle === 'rounded' ? '12px' : '8px'}; text-decoration: none; font-weight: 600; transition: opacity 0.2s;">
  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
  ${buttonText}
</a>`;
  };

  return (
    <div className="space-y-8">
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
            Design and generate professional click-to-chat buttons for your website.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Configuration */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm space-y-6"
          >
            <h2 className="text-xl font-bold border-b border-border pb-4">Configuration</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-muted-foreground">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 919876543210"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-background outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-muted-foreground">Button Text</label>
                <input
                  type="text"
                  value={buttonText}
                  onChange={(e) => setButtonText(e.target.value)}
                  placeholder="Chat with us"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-3 text-muted-foreground">Button Style</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['default', 'rounded', 'pill', 'minimal'] as const).map((style) => (
                    <button
                      key={style}
                      onClick={() => setButtonStyle(style)}
                      className={`p-3 rounded-xl border-2 transition-all capitalize text-xs font-bold ${
                        buttonStyle === style
                          ? 'border-[var(--primary)] bg-[var(--primary)]/10 text-[var(--primary)]'
                          : 'border-border hover:border-muted-foreground'
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-muted-foreground">Button Color</label>
                  <input
                    type="color"
                    value={buttonColor}
                    onChange={(e) => setButtonColor(e.target.value)}
                    className="w-full h-10 rounded-lg cursor-pointer bg-background p-1 border border-border"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-muted-foreground">Text Color</label>
                  <input
                    type="color"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="w-full h-10 rounded-lg cursor-pointer bg-background p-1 border border-border"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Preview & Code */}
          <div className="space-y-6 flex flex-col">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm flex-1 flex flex-col"
            >
              <h2 className="text-xl font-bold mb-6">Live Preview</h2>
              <div className="flex-1 flex items-center justify-center p-8 bg-muted/30 rounded-2xl border-2 border-dashed border-border mb-6">
                {phone ? (
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center space-x-2 font-bold transition-transform hover:scale-105 active:scale-95 shadow-lg ${buttonStyles[buttonStyle]}`}
                    style={{ backgroundColor: buttonColor, color: textColor }}
                  >
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" className="shrink-0">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    <span>{buttonText}</span>
                  </a>
                ) : (
                  <p className="text-muted-foreground animate-pulse">Enter phone number to preview</p>
                )}
              </div>

              <div className="bg-muted p-4 rounded-xl border border-border">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold flex items-center gap-2">
                    <Code className="w-4 h-4" />
                    HTML Snippet
                  </h3>
                  <button
                    onClick={() => copy(generateHTML())}
                    disabled={!phone}
                    className="px-3 py-1.5 rounded-lg border border-border hover:bg-card transition-colors flex items-center gap-2 text-xs font-bold disabled:opacity-50"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy Code'}</span>
                  </button>
                </div>
                <pre className="text-[10px] overflow-x-auto text-muted-foreground bg-background/50 p-3 rounded-lg border border-border/50">
                  <code>{generateHTML()}</code>
                </pre>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
  );
}
