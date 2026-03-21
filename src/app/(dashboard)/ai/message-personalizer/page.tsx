'use client';
import { toast } from 'sonner';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserCheck, Copy, Check, Sparkles, MapPin, Package, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
// DashboardLayout removed - handled by (dashboard)/layout.tsx
import { useCopy } from '@/hooks/useCopy';

export default function MessagePersonalizerPage() {
  const [formData, setFormData] = useState({
    message: '',
    name: '',
    city: '',
    product: '',
  });
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const { copied, copy } = useCopy();

  const handleGenerate = async () => {
    if (!formData.message || !formData.name || !formData.city || !formData.product) return;
    setLoading(true);
    try {
      const response = await fetch('/api/ai/message-personalizer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        setResult(data.data);
      } else { toast.error(data.error || 'Generation failed. Please try again or wait a minute.'); } } catch (error) { console.error('Generation Error:', error); toast.error('Experiencing high network load or rate limits. Please wait a moment.'); } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="text-center space-y-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-16 h-16 mx-auto rounded-2xl gradient-primary flex items-center justify-center mb-6"
          >
            <UserCheck className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-4xl font-bold">AI Message Personalizer</h1>
          <p className="text-lg text-muted-foreground">Transform generic messages into warm, personalized outreach.</p>
        </div>

        <div className="bg-card border border-border rounded-3xl p-8 shadow-sm space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase flex items-center gap-1">
                <User className="w-3 h-3" /> Customer Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Rahul"
                className="w-full p-3 rounded-xl border-2 border-border focus:border-[var(--primary)] bg-background outline-none transition-all text-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase flex items-center gap-1">
                <MapPin className="w-3 h-3" /> City
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                placeholder="Delhi"
                className="w-full p-3 rounded-xl border-2 border-border focus:border-[var(--primary)] bg-background outline-none transition-all text-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase flex items-center gap-1">
                <Package className="w-3 h-3" /> Product
              </label>
              <input
                type="text"
                value={formData.product}
                onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                placeholder="New iPhone"
                className="w-full p-3 rounded-xl border-2 border-border focus:border-[var(--primary)] bg-background outline-none transition-all text-sm"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Base Message</label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="e.g., Our new collection is now available at our store. Come check it out today!"
              className="w-full h-32 p-4 rounded-2xl border-2 border-border focus:border-[var(--primary)] bg-background outline-none transition-all resize-none"
            />
          </div>

          <Button
            onClick={handleGenerate}
            disabled={!formData.message}
            isLoading={loading}
            className="w-full py-4 text-lg"
            leftIcon={<Sparkles className="w-5 h-5" />}
          >
            Personalize Message
          </Button>
        </div>

        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card border-2 border-[var(--primary)]/20 rounded-3xl p-8 shadow-xl space-y-6 relative overflow-hidden"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-xl">Personalized Result</h3>
                  <Button
                    onClick={() => copy(result)}
                    variant="secondary"
                    size="sm"
                    className="flex items-center gap-2"
                    leftIcon={copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  >
                    {copied ? 'Copied!' : 'Copy Message'}
                  </Button>
                </div>
                <div className="p-6 rounded-2xl bg-muted/30 border border-border min-h-[350px] flex flex-col">
                  <p className="flex-1 text-foreground font-medium leading-relaxed whitespace-pre-line custom-scrollbar">{result}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
    </div>
  );
}
