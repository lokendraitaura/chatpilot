'use client';

import Link from 'next/link';
import { ArrowRight, Sparkles, MessageCircle, QrCode } from 'lucide-react';
import { motion } from 'framer-motion';

export function Hero() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[var(--primary)] opacity-20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[var(--secondary)] opacity-20 rounded-full blur-3xl animate-float-delayed" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-muted mb-8"
          >
            <Sparkles className="w-4 h-4 text-[var(--primary)]" />
            <span className="text-sm font-medium">AI-Powered WhatsApp Toolkit</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
          >
            WhatsApp Marketing
            <br />
            <span className="text-gradient">Made Simple</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10"
          >
            Generate WhatsApp links, QR codes, AI-powered messages, and marketing content from a single, powerful dashboard. No coding required.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/tools/link-generator"
              className="group px-8 py-4 rounded-lg text-white font-medium gradient-primary hover:opacity-90 transition-all flex items-center space-x-2 cursor-pointer"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/#how-it-works"
              className="px-8 py-4 rounded-lg font-medium border-2 border-border hover:bg-muted transition-colors cursor-pointer"
            >
              See How It Works
            </Link>
          </motion.div>

          {/* Feature Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-4 mt-12"
          >
            <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-card border border-border">
              <MessageCircle className="w-4 h-4 text-[var(--primary)]" />
              <span className="text-sm">AI Message Generator</span>
            </div>
            <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-card border border-border">
              <QrCode className="w-4 h-4 text-[var(--primary)]" />
              <span className="text-sm">QR Code Creator</span>
            </div>
            <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-card border border-border">
              <Sparkles className="w-4 h-4 text-[var(--primary)]" />
              <span className="text-sm">Smart Templates</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
