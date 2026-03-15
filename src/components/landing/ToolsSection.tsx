'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { Link as LinkIcon, QrCode, MousePointerClick, Scissors, Type, Share2, Package, Mic, LayoutTemplate, Clock, Store } from 'lucide-react';

const tools = [
  {
    title: 'Link Generator',
    description: 'Create custom WhatsApp links with pre-filled messages in seconds.',
    icon: LinkIcon,
    href: '/tools/link-generator',
    color: 'from-green-500 to-emerald-500',
  },
  {
    title: 'QR Code Generator',
    description: 'Generate beautiful QR codes for your WhatsApp number or message.',
    icon: QrCode,
    href: '/tools/qr-generator',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Button Generator',
    description: 'Create click-to-chat buttons for your website with custom styling.',
    icon: MousePointerClick,
    href: '/tools/button-generator',
    color: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Catalog Generator',
    description: 'Generate structured product catalogs for your business.',
    icon: Package,
    href: '/tools/catalog-generator',
    color: 'from-indigo-500 to-blue-500',
  },
  {
    title: 'Voice to Message',
    description: 'Convert your voice to WhatsApp text messages instantly.',
    icon: Mic,
    href: '/tools/voice-to-message',
    color: 'from-rose-500 to-red-500',
  },
  {
    title: 'Message Templates',
    description: 'Ready-to-use message templates for business & marketing.',
    icon: LayoutTemplate,
    href: '/tools/templates',
    color: 'from-violet-500 to-purple-500',
  },
  {
    title: 'Link Shortener',
    description: 'Shorten your WhatsApp links and track click analytics.',
    icon: Scissors,
    href: '/tools/link-shortener',
    color: 'gradient-primary',
  },
  {
    title: 'Auto Reply Generator',
    description: 'Create professional automated out-of-office and instant replies.',
    icon: Clock,
    href: '/tools/auto-reply',
    color: 'gradient-primary',
  },
  {
    title: 'Business Profile Maker',
    description: 'Format your business details into a ready-to-share WhatsApp link.',
    icon: Store,
    href: '/tools/business-profile',
    color: 'gradient-primary',
  },
  {
    title: 'Message Formatter',
    description: 'Format your messages with bold, italic, and special styling.',
    icon: Type,
    href: '/tools/message-formatter',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    title: 'Share Link Creator',
    description: 'Generate shareable links for broadcasting messages to multiple contacts.',
    icon: Share2,
    href: '/tools/share-link',
    color: 'from-teal-500 to-green-500',
  },
];

export function ToolsSection() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-4"
          >
            Powerful WhatsApp Tools
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Everything you need to supercharge your WhatsApp marketing and communication
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link prefetch href={tool.href} className="block group cursor-pointer">
                <div className="relative h-full p-6 rounded-2xl bg-card border border-border hover:border-[var(--primary)] transition-all hover:shadow-lg hover:shadow-[var(--primary)]/20 overflow-hidden">
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-5 transition-opacity`} />
                  
                  <div className="relative">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center mb-4`}>
                      <tool.icon className="w-6 h-6 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-[var(--primary)] transition-colors">
                      {tool.title}
                    </h3>
                    
                    <p className="text-muted-foreground text-sm">
                      {tool.description}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
