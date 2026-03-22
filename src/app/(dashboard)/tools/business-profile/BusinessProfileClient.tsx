'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Store, MapPin, Globe, Phone, Mail, Info, Check, Copy, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCopy } from '@/hooks/useCopy';

export default function BusinessProfileClient() {
  const [profile, setProfile] = useState({
    name: '',
    desc: '',
    address: '',
    email: '',
    website: '',
    phone: ''
  });
  const { copied, copy } = useCopy();

  const profileText = `🏪 *${profile.name || 'Business Name'}*\n📝 ${profile.desc || 'Business Description'}\n\n📍 Address: ${profile.address || 'Not set'}\n📧 Email: ${profile.email || 'Not set'}\n🌐 Web: ${profile.website || 'Not set'}\n📞 WhatsApp: ${profile.phone || 'Not set'}\n\nGenerated via GoChatPilot 🚀`;

  return (
    <div className="space-y-10 max-w-6xl mx-auto">
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
          Create a professional business profile summary to share with your customers.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start text-left">
        <div className="bg-card border border-border rounded-3xl p-8 shadow-sm space-y-6 text-left">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Business Name</label>
              <input
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full p-4 rounded-xl border border-border bg-background outline-none focus:border-[var(--primary)] transition-all font-bold"
                placeholder="e.g. GoChatPilot AI"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Phone number</label>
              <input
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="w-full p-4 rounded-xl border border-border bg-background outline-none focus:border-[var(--primary)] transition-all"
                placeholder="e.g. 1234567890"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Description</label>
            <textarea
              value={profile.desc}
              onChange={(e) => setProfile({ ...profile, desc: e.target.value })}
              className="w-full p-4 rounded-xl border border-border bg-background outline-none focus:border-[var(--primary)] transition-all h-24 resize-none"
              placeholder="What does your business do?"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <MapPin className="w-5 h-5 text-muted-foreground" />
              <input
                value={profile.address}
                onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                className="flex-1 bg-transparent border-b border-border py-2 outline-none focus:border-[var(--primary)]"
                placeholder="Business Address"
              />
            </div>
            <div className="flex items-center gap-4">
              <Mail className="w-5 h-5 text-muted-foreground" />
              <input
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="flex-1 bg-transparent border-b border-border py-2 outline-none focus:border-[var(--primary)]"
                placeholder="Email Address"
              />
            </div>
            <div className="flex items-center gap-4">
              <Globe className="w-5 h-5 text-muted-foreground" />
              <input
                value={profile.website}
                onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                className="flex-1 bg-transparent border-b border-border py-2 outline-none focus:border-[var(--primary)]"
                placeholder="Website URL"
              />
            </div>
          </div>
        </div>

        <div className="lg:sticky lg:top-8 flex flex-col space-y-6 text-left">
          <div className="bg-card border-2 border-[var(--primary)]/20 rounded-[2.5rem] p-10 shadow-2xl space-y-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-40 h-40 bg-[var(--primary)]/5 rounded-full -mr-20 -mt-20 group-hover:scale-110 transition-transform" />
            
            <div className="flex items-center justify-between relative z-10">
              <h3 className="font-bold text-xl">Profile Snapshot</h3>
              <CheckCircle2 className="w-6 h-6 text-green-500" />
            </div>

            <pre className="p-8 rounded-3xl bg-muted/40 border border-border text-sm font-sans leading-relaxed whitespace-pre-wrap min-h-[300px] relative z-10">
              {profileText}
            </pre>

            <Button
              onClick={() => copy(profileText)}
              className="w-full py-5 text-lg relative z-10"
              leftIcon={copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
            >
              {copied ? 'Copied Profile' : 'Copy Profile Info'}
            </Button>
          </div>
          
          <div className="flex items-start gap-2 p-4 bg-orange-500/5 text-orange-600 rounded-2xl text-[10px] leading-relaxed border border-orange-500/10">
            <Info className="w-4 h-4 shrink-0 mt-0.5" />
            <p>You can paste this professional summary into your WhatsApp status, bio, or send it to new customers as an introduction.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
