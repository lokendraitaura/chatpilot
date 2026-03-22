'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Link as LinkIcon, 
  QrCode, 
  MousePointerClick, 
  Scissors, 
  Type, 
  Share2, 
  Package, 
  Mic, 
  LayoutTemplate, 
  Clock, 
  Store,
  MessageSquare,
  Wand2,
  Reply,
  FileText,
  Smile,
  Languages,
  Sparkles,
  Megaphone,
  UserCheck
} from 'lucide-react';

const ALL_TOOLS = [
  {
    title: 'Core WhatsApp Tools',
    items: [
      { name: 'Link Generator', icon: LinkIcon, href: '/tools/link-generator', color: 'bg-green-500' },
      { name: 'QR Code Generator', icon: QrCode, href: '/tools/qr-generator', color: 'bg-blue-500' },
      { name: 'Button Maker', icon: MousePointerClick, href: '/tools/button-generator', color: 'bg-purple-500' },
      { name: 'Link Shortener', icon: Scissors, href: '/tools/link-shortener', color: 'bg-indigo-500' },
      { name: 'Message Formatter', icon: Type, href: '/tools/message-formatter', color: 'bg-yellow-500' },
      { name: 'Share Link Creator', icon: Share2, href: '/tools/share-link', color: 'bg-teal-500' },
    ]
  },
  {
    title: 'Business & Productivity',
    items: [
      { name: 'Catalog Generator', icon: Package, href: '/tools/catalog-generator', color: 'bg-orange-500' },
      { name: 'Voice to Message', icon: Mic, href: '/tools/voice-to-message', color: 'bg-rose-500' },
      { name: 'Message Templates', icon: LayoutTemplate, href: '/tools/templates', color: 'bg-violet-500' },
      { name: 'Auto Reply Gen', icon: Clock, href: '/tools/auto-reply', color: 'bg-emerald-500' },
      { name: 'Business Profile', icon: Store, href: '/tools/business-profile', color: 'bg-cyan-500' },
    ]
  },
  {
    title: 'AI Assistants',
    items: [
      { name: 'AI Message Gen', icon: MessageSquare, href: '/ai/message-generator', color: 'bg-indigo-600' },
      { name: 'Message Improver', icon: Wand2, href: '/ai/message-improver', color: 'bg-purple-600' },
      { name: 'Marketing Copy', icon: Megaphone, href: '/ai/marketing-copy', color: 'bg-rose-600' },
      { name: 'CTA Generator', icon: MousePointerClick, href: '/ai/cta-generator', color: 'bg-amber-600' },
      { name: 'Message Personalizer', icon: UserCheck, href: '/ai/message-personalizer', color: 'bg-emerald-600' },
      { name: 'Language Converter', icon: Languages, href: '/ai/language-converter', color: 'bg-blue-600' },
      { name: 'Customer Reply', icon: Reply, href: '/ai/customer-reply', color: 'bg-teal-600' },
      { name: 'Status Caption', icon: FileText, href: '/ai/status-caption', color: 'bg-pink-600' },
      { name: 'Emoji Suggester', icon: Smile, href: '/ai/emoji-suggester', color: 'bg-orange-600' },
    ]
  }
];

export default function DashboardPage() {
  return (
    <div className="space-y-12">
        <header>
          <h1 className="text-3xl font-bold mb-2">Welcome to GoChatPilot</h1>
          <p className="text-muted-foreground">Select a tool from your library to get started.</p>
        </header>

        <div className="space-y-10">
          {ALL_TOOLS.map((group, idx) => (
            <section key={group.title}>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-1 h-6 rounded-full gradient-primary" />
                <h2 className="text-xl font-bold">{group.title}</h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {group.items.map((tool, toolIdx) => (
                  <Link 
                    key={tool.name} 
                    href={tool.href}
                    className="group"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: (idx * 0.1) + (toolIdx * 0.05) }}
                      className="p-4 rounded-xl bg-card border border-border hover:border-[var(--primary)] hover:shadow-lg hover:shadow-[var(--primary)]/10 transition-all flex items-center space-x-4 cursor-pointer"
                    >
                      <div className={`w-10 h-10 rounded-lg ${tool.color} flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform`}>
                        <tool.icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm truncate group-hover:text-[var(--primary)] transition-colors">
                          {tool.name}
                        </h3>
                        <p className="text-xs text-muted-foreground truncate">
                          Launch tool →
                        </p>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Pro Tip Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="p-6 rounded-2xl bg-gradient-to-br from-[var(--primary)]/10 to-[var(--secondary)]/10 border border-[var(--primary)]/20 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-[var(--primary)]">
              <Sparkles className="w-5 h-5" />
              <span className="font-bold uppercase tracking-wider text-xs">AI Power-Up</span>
            </div>
            <h3 className="text-xl font-bold">Try the AI Message Improver</h3>
            <p className="text-sm text-muted-foreground">Rewrite your WhatsApp messages to sound 10x more professional with one click.</p>
          </div>
          <Link 
            href="/ai/message-improver"
            className="px-6 py-3 rounded-xl gradient-primary text-white font-bold hover:opacity-90 transition-opacity whitespace-nowrap shadow-lg shadow-[var(--primary)]/20 cursor-pointer"
          >
            Upgrade Your Messages
          </Link>
        </motion.div>
      </div>
  );
}
