'use client';

import { useState, useRef } from 'react';
import { Download, Phone, MessageSquare, QrCode } from 'lucide-react';
import { generateWhatsAppLink } from '@/lib/whatsapp';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import QRCode from 'qrcode.react';

export default function QRGeneratorPage() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [qrColor, setQrColor] = useState('#25D366');
  const qrRef = useRef<HTMLDivElement>(null);

  const whatsappLink = generateWhatsAppLink(phoneNumber, message);

  const downloadQR = () => {
    const canvas = qrRef.current?.querySelector('canvas');
    if (canvas) {
      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = url;
      link.download = `whatsapp-qr-${phoneNumber}.png`;
      link.click();
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

        <div className="lg:sticky lg:top-8 flex flex-col items-center">
          <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-green-500/10 border border-green-500/10 mb-8" ref={qrRef}>
            <QRCode
              value={whatsappLink}
              size={256}
              fgColor={qrColor}
              level="H"
              includeMargin={false}
              renderAs="canvas"
            />
          </div>

          <Button
            onClick={downloadQR}
            disabled={!phoneNumber}
            className="w-full py-5 text-lg"
            leftIcon={<Download className="w-5 h-5" />}
          >
            Download PNG
          </Button>
          <p className="mt-4 text-xs text-muted-foreground">High-resolution PNG file ready for print.</p>
        </div>
      </div>
    </div>
  );
}
