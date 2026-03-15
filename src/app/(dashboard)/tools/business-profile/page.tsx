'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link as LinkIcon, Copy, CheckCircle2, Store, MapPin, Globe, Phone, Mail, LayoutGrid, Info } from 'lucide-react';
// DashboardLayout removed - handled by (dashboard)/layout.tsx
import { WHATSAPP_BASE_URL } from '@/lib/constants';

export default function BusinessProfileMaker() {
  const [businessName, setBusinessName] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [website, setWebsite] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [copied, setCopied] = useState(false);

  // Auto-format the message based on input
  const generatedMessage = [
    businessName ? `*${businessName}*` : '',
    description ? `\n${description}\n` : '',
    address ? `📍 ${address}` : '',
    website ? `🌐 ${website}` : '',
    email ? `✉️ ${email}` : '',
  ].filter(Boolean).join('\n');

  // URL encode the message for WhatsApp
  const generateWaLink = () => {
    if (!phoneNumber) return '';
    const cleanPhone = phoneNumber.replace(/\D/g, '');
    const encodedMessage = encodeURIComponent(`Hi! Here is our business profile:\n\n${generatedMessage}`);
    return `${WHATSAPP_BASE_URL}${cleanPhone}?text=${encodedMessage}`;
  };

  const handleCopy = async () => {
    const link = generateWaLink();
    if (!link) return;
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text', err);
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
            <Store className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-4xl font-bold">Business Profile Maker</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Create a professional WhatsApp link that instantly shares your business details, address, and contact info.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto items-start">
          {/* Left Column: Form Inputs */}
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-3xl p-6 md:p-8 shadow-sm space-y-8">
              <div className="space-y-6">
                <div className="space-y-4">
                  <h2 className="text-sm font-bold text-muted-foreground uppercase flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    WhatsApp Number
                  </h2>
                  <input
                    type="tel"
                    placeholder="e.g. 919876543210"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-[var(--primary)] outline-none text-base font-medium"
                  />
                  <div className="flex items-start gap-2 p-3 bg-[var(--primary)]/5 text-[var(--primary)] rounded-xl text-xs">
                    <Info className="w-4 h-4 shrink-0 mt-0.5" />
                    <p>Enter number with country code (e.g., 91 for India) without '+' or spaces.</p>
                  </div>
                </div>

                <div className="space-y-4 pt-6 border-t border-border">
                  <h2 className="text-sm font-bold text-muted-foreground uppercase flex items-center gap-2">
                    <LayoutGrid className="w-4 h-4" />
                    Business Details
                  </h2>
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-muted-foreground uppercase px-1">Business Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Acme Studio"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-[var(--primary)] outline-none text-sm font-bold"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-muted-foreground uppercase px-1">Tagline / Bio</label>
                      <textarea
                        placeholder="What your business does..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-[var(--primary)] outline-none text-sm min-h-[80px] resize-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-muted-foreground uppercase px-1">Address</label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                          type="text"
                          placeholder="e.g. 123 Main St"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          className="w-full pl-11 pr-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-[var(--primary)] outline-none text-sm"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-muted-foreground uppercase px-1">Website URL</label>
                      <div className="relative">
                        <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                          type="url"
                          placeholder="https://yoursite.com"
                          value={website}
                          onChange={(e) => setWebsite(e.target.value)}
                          className="w-full pl-11 pr-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-[var(--primary)] outline-none text-sm"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-muted-foreground uppercase px-1">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                          type="email"
                          placeholder="hello@business.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full pl-11 pr-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-[var(--primary)] outline-none text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Live Preview & Link Generation */}
          <div className="lg:sticky lg:top-8 space-y-6">
            <div className="bg-card border border-border rounded-3xl p-6 md:p-8 shadow-sm space-y-6 h-full flex flex-col">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold text-muted-foreground uppercase flex items-center gap-2">
                  <Store className="w-4 h-4" />
                  Live Preview
                </h2>
              </div>

              {/* Chat Bubble Preview */}
              <div className="flex-1 bg-muted/30 rounded-2xl p-6 mb-6 min-h-[300px] border border-border/50">
                <div className="space-y-2">
                  <p className="text-[10px] font-bold text-muted-foreground tracking-tighter uppercase opacity-50">Generated Profile Message</p>
                  <div className="bg-background border border-border rounded-2xl rounded-tl-none p-5 shadow-sm whitespace-pre-wrap text-sm leading-relaxed font-medium">
                    {generatedMessage || (
                      <div className="space-y-3 opacity-20">
                        <div className="h-4 w-3/4 bg-foreground rounded animate-pulse" />
                        <div className="h-20 w-full bg-foreground rounded animate-pulse" />
                        <div className="h-4 w-1/2 bg-foreground rounded animate-pulse" />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Link Output */}
              <div className="space-y-3 pt-6 border-t border-border">
                <div className="flex items-center justify-between px-1">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase">WhatsApp Profle Link</span>
                  {phoneNumber && (
                    <span className="text-[10px] font-bold text-green-500 uppercase flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      Ready to share
                    </span>
                  )}
                </div>
                
                <div className="bg-background border border-border rounded-2xl p-4 text-sm font-mono truncate text-[var(--primary)]">
                  {generateWaLink() || 'Enter number to generate...'}
                </div>

                <button
                  onClick={handleCopy}
                  disabled={!phoneNumber}
                  className={`w-full py-4 rounded-2xl font-bold transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-lg ${
                    copied 
                      ? 'bg-green-500 text-white shadow-green-500/20' 
                      : 'gradient-primary text-white shadow-[var(--primary)]/20 hover:scale-[1.02]'
                  } disabled:opacity-50 disabled:grayscale disabled:scale-100 disabled:cursor-not-allowed`}
                >
                  <AnimatePresence mode="wait">
                    {copied ? (
                      <motion.div
                        key="copied"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2"
                      >
                        <CheckCircle2 className="w-5 h-5" />
                        <span>Link Copied Successfully!</span>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="copy"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2"
                      >
                        <LinkIcon className="w-5 h-5" />
                        <span>Copy Profile Link</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
