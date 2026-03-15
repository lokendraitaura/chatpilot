'use client';

import { useState, useRef } from 'react';
import { Download, Phone, MessageSquare, QrCode } from 'lucide-react';
import { generateWhatsAppLink } from '@/lib/whatsapp';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import QRCode from 'qrcode.react';
// DashboardLayout removed - handled by (dashboard)/layout.tsx

export default function QRGeneratorPage() {
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [qrSize, setQrSize] = useState(256);
  const [qrColor, setQrColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const qrRef = useRef<HTMLDivElement>(null);

  const whatsappLink = phone ? generateWhatsAppLink(phone, message) : '';

  const downloadQR = () => {
    const canvas = qrRef.current?.querySelector('canvas');
    if (canvas) {
      const url = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = url;
      a.download = `whatsapp-qr-${phone}.png`;
      a.click();
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
            <QrCode className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-4xl font-bold">WhatsApp QR Generator</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Create high-quality QR codes for your WhatsApp number and messages.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Configuration */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm h-full"
          >
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="w-6 h-6 rounded bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center text-xs">1</span>
              Configure
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 919876543210"
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Pre-filled Message</label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Hi! Scan to chat..."
                    rows={3}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none transition-all resize-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">QR Color</label>
                  <input
                    type="color"
                    value={qrColor}
                    onChange={(e) => setQrColor(e.target.value)}
                    className="w-full h-10 rounded-lg border border-border cursor-pointer p-1 bg-background"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Background</label>
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-full h-10 rounded-lg border border-border cursor-pointer p-1 bg-background"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm flex flex-col items-center justify-center h-full"
          >
            <h2 className="text-xl font-bold mb-6 self-start flex items-center gap-2">
              <span className="w-6 h-6 rounded bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center text-xs">2</span>
              Preview & Save
            </h2>
            
            <div className="flex-1 flex flex-col items-center justify-center w-full space-y-6">
              {phone ? (
                <>
                  <div 
                    ref={qrRef}
                    className="p-6 rounded-2xl border border-border shadow-xl"
                    style={{ backgroundColor: bgColor }}
                  >
                    <QRCode
                      value={whatsappLink}
                      size={200}
                      fgColor={qrColor}
                      bgColor={bgColor}
                      level="H"
                      includeMargin={false}
                    />
                  </div>
                  
                  <Button
                    onClick={downloadQR}
                    className="w-full max-w-sm py-4"
                    leftIcon={<Download className="w-5 h-5" />}
                  >
                    Download PNG
                  </Button>
                </>
              ) : (
                <div className="text-center py-12 px-6 rounded-2xl border-2 border-dashed border-border w-full">
                  <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                    <QrCode className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Enter details on the left to generate your QR code instantly.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
  );
}
