'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { Sparkles, MessageSquare, Languages, Smile, Wand2, Reply, FileText } from 'lucide-react';

const aiFeatures = [
  {
    title: 'AI Message Generator',
    description: 'Generate professional WhatsApp messages for any purpose with AI.',
    icon: MessageSquare,
    href: '/ai/message-generator',
  },
  {
    title: 'Message Improver',
    description: 'Enhance your messages to sound more professional or friendly.',
    icon: Wand2,
    href: '/ai/message-improver',
  },
  {
    title: 'Emoji Suggester',
    description: 'Get perfect emoji suggestions based on your message context.',
    icon: Smile,
    href: '/ai/emoji-suggester',
  },
  {
    title: 'Language Converter',
    description: 'Translate your messages to 50+ languages instantly.',
    icon: Languages,
    href: '/ai/language-converter',
  },
  {
    title: 'Customer Reply Generator',
    description: 'Generate professional customer service responses automatically.',
    icon: Reply,
    href: '/ai/customer-reply',
    badge: 'New',
  },
  {
    title: 'Status Caption Generator',
    description: 'Create engaging WhatsApp status captions with AI.',
    icon: FileText,
    href: '/ai/status-caption',
    badge: 'New',
  },
];

export function AiSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6"
          >
            <Sparkles className="w-4 h-4 text-purple-500" />
            <span className="text-sm font-medium text-purple-600 dark:text-purple-400">AI-Powered Features</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-4"
          >
            Intelligent AI Assistant
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Let AI help you craft perfect messages, translate languages, and engage your audience
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aiFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link prefetch href={feature.href} className="block group cursor-pointer h-full">
                <div className="relative h-full p-6 rounded-2xl bg-card border border-border hover:border-purple-500 transition-all hover:shadow-lg hover:shadow-purple-500/20">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    {feature.badge && (
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                        {feature.badge}
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-purple-500 transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm">
                    {feature.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
