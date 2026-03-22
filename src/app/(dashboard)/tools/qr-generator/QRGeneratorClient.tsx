'use client';

import { useState, useRef } from 'react';
import { Download, Phone, MessageSquare, QrCode, Share2, ChevronDown, AlertCircle, CheckCircle2 } from 'lucide-react';
import { generateWhatsAppLink } from '@/lib/whatsapp';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import QRCode from 'qrcode.react';
import { COUNTRY_CODES, DEFAULT_COUNTRY, validatePhoneNumber, type CountryCode } from '@/lib/countryCodes';

export default function QRGeneratorClient() {
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>(DEFAULT_COUNTRY);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [qrColor, setQrColor] = useState('#25D366');
  const [showDropdown, setShowDropdown] = useState(false);
  const [shareStatus, setShareStatus] = useState<'idle' | 'sharing' | 'copied'>('idle');
  const qrRef = useRef<HTMLDivElement>(null);

  const fullPhone = phoneNumber ? `${selectedCountry.digits}${phoneNumber.replace(/\D/g, '')}` : '';
  const whatsappLink = generateWhatsAppLink(fullPhone, message);
  const validation = validatePhoneNumber(phoneNumber, selectedCountry);
  const isValid = phoneNumber.length > 0 && validation.valid;

  const getCanvas = (): HTMLCanvasElement | null => {
    return qrRef.current?.querySelector('canvas') ?? null;
  };

  const downloadQR = () => {
    const canvas = getCanvas();
    if (!canvas) return;
    const padded = document.createElement('canvas');
    const size = canvas.width + 40;
    padded.width = size;
    padded.height = size;
    const ctx = padded.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, size, size);
    ctx.drawImage(canvas, 20, 20);
    const url = padded.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = url;
    link.download = `whatsapp-qr-${fullPhone || 'gochatpilot'}.png`;
    link.click();
  };

  const shareQR = async () => {
    const canvas = getCanvas();
    if (!canvas) return;
    setShareStatus('sharing');

    const padded = document.createElement('canvas');
    const size = canvas.width + 40;
    padded.width = size;
    padded.height = size;
    const ctx = padded.getContext('2d');
    if (!ctx) { setShareStatus('idle'); return; }
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, size, size);
    ctx.drawImage(canvas, 20, 20);

    try {
      padded.toBlob(async (blob) => {
        if (!blob) { setShareStatus('idle'); return; }
        if (navigator.share && navigator.canShare({ files: [new File([blob], 'qr.png', { type: 'image/png' })] })) {
          await navigator.share({
            title: 'WhatsApp QR Code',
            text: `Scan to chat on WhatsApp: ${whatsappLink}`,
            files: [new File([blob], 'whatsapp-qr.png', { type: 'image/png' })],
          });
          setShareStatus('idle');
        } else {
          await navigator.clipboard.writeText(whatsappLink);
          setShareStatus('copied');
          setTimeout(() => setShareStatus('idle'), 2000);
        }
      }, 'image/png');
    } catch {
      setShareStatus('idle');
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
          <QrCode className="w-8 h-8 text-white" />
        </motion.div>
        <h1 className="text-4xl font-bold">WhatsApp QR Generator</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Generate professional QR codes that open directly in WhatsApp - perfect for business cards, posters, and menus.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        <div className="bg-card border border-border rounded-3xl p-8 shadow-sm space-y-8">
          <div className="space-y-3">
            <label className="text-sm font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
              <Phone className="w-4 h-4" /> Phone Number
            </label>
            <div className="flex gap-3">
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-2 px-4 py-4 rounded-xl border-2 border-border hover:border-[var(--primary)]/50 bg-background outline-none transition-all font-medium whitespace-nowrap cursor-pointer"
                >
                  <span className="text-xl"><img src={`https://flagcdn.com/w20/${selectedCountry.iso}.png`} alt={selectedCountry.name} className="w-5 h-auto inline-block rounded-sm" /></span>
                  <span className="text-sm font-bold">{selectedCountry.code}</span>
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </button>
                <AnimatePresence>
                  {showDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="absolute left-0 top-full mt-2 z-50 bg-card border border-border rounded-2xl shadow-xl overflow-y-auto max-h-64 min-w-[220px]"
                    >
                      {COUNTRY_CODES.map((country) => (
                        <button
                          key={`${country.name}-${country.code}`}
                          type="button"
                          onClick={() => { setSelectedCountry(country); setShowDropdown(false); }}
                          className={`w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-muted/50 transition-colors text-left cursor-pointer ${
                            selectedCountry.name === country.name ? 'bg-[var(--primary)]/10 text-[var(--primary)] font-bold' : ''
                          }`}
                        >
                          <span className="text-lg"><img src={`https://flagcdn.com/w20/${country.iso}.png`} alt={country.name} className="w-5 h-auto inline-block rounded-sm" /></span>
                          <span className="flex-1">{country.name}</span>
                          <span className="font-mono text-muted-foreground">{country.code}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="flex-1 relative">
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                  placeholder={`e.g. ${'9'.repeat(selectedCountry.minLength)}`}
                  maxLength={selectedCountry.maxLength}
                  className={`w-full p-4 rounded-xl border-2 bg-background outline-none transition-all font-medium ${
                    phoneNumber && !validation.valid
                      ? 'border-red-400'
                      : phoneNumber && validation.valid
                      ? 'border-green-500'
                      : 'border-border focus:border-[var(--primary)]'
                  }`}
                />
                {phoneNumber && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    {validation.valid
                      ? <CheckCircle2 className="w-5 h-5 text-green-500" />
                      : <AlertCircle className="w-5 h-5 text-red-400" />}
                  </div>
                )}
              </div>
            </div>
            <AnimatePresence>
              {phoneNumber && !validation.valid && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-xs text-red-500 flex items-center gap-1.5"
                >
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  {validation.message}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <div className="space-y-4">
            <label className="text-sm font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
              <MessageSquare className="w-4 h-4" /> Initial Message (Optional)
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="e.g. Hello! I'm interested in your services."
              className="w-full p-4 rounded-xl border-2 border-border focus:border-[var(--primary)] bg-background outline-none transition-all h-32 resize-none"
            />
          </div>

          <div className="space-y-4">
            <label className="text-sm font-bold text-muted-foreground uppercase tracking-wider">QR Code Color</label>
            <div className="flex items-center space-x-4">
              <input
                type="color"
                value={qrColor}
                onChange={(e) => setQrColor(e.target.value)}
                className="w-12 h-12 rounded-lg cursor-pointer border-0 p-0"
              />
              <span className="font-mono text-sm uppercase">{qrColor}</span>
            </div>
          </div>
        </div>

        <div className="lg:sticky lg:top-8 flex flex-col items-center space-y-6">
          <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-green-500/10 border border-green-500/10" ref={qrRef}>
            <QRCode
              value={isValid ? whatsappLink : 'https://wa.me/'}
              size={256}
              fgColor={qrColor}
              level="H"
              includeMargin={false}
              renderAs="canvas"
            />
          </div>

          <div className="w-full grid grid-cols-2 gap-4">
            <Button
              onClick={downloadQR}
              disabled={!isValid}
              className="w-full py-5 text-base"
              leftIcon={<Download className="w-5 h-5" />}
            >
              Download PNG
            </Button>
            <Button
              onClick={shareQR}
              disabled={!isValid}
              variant="secondary"
              className="w-full py-5 text-base"
              leftIcon={<Share2 className="w-5 h-5" />}
            >
              {shareStatus === 'copied' ? 'Link Copied!' : shareStatus === 'sharing' ? 'Sharing...' : 'Share QR'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
