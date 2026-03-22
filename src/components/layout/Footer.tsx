'use client';

import Link from 'next/link';
import { Mail, Linkedin } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Logo className="w-8 h-8" />
              <span className="font-bold text-xl">GoChatPilot</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-md">
              Your all-in-one WhatsApp toolkit powered by AI. Generate links, QR codes, messages, and more - all from one powerful dashboard.
            </p>
          </div>

          {/* Tools */}
          <div>
            <h3 className="font-semibold mb-4">Tools</h3>
            <ul className="space-y-2">
              <li>
                <Link prefetch href="/tools/link-generator" className="text-sm text-muted-foreground hover:text-[var(--primary)] transition-colors cursor-pointer">
                  Link Generator
                </Link>
              </li>
              <li>
                <Link prefetch href="/tools/qr-generator" className="text-sm text-muted-foreground hover:text-[var(--primary)] transition-colors cursor-pointer">
                  QR Generator
                </Link>
              </li>
              <li>
                <Link prefetch href="/tools/button-generator" className="text-sm text-muted-foreground hover:text-[var(--primary)] transition-colors cursor-pointer">
                  Button Generator
                </Link>
              </li>
              <li>
                <Link prefetch href="/tools/link-shortener" className="text-sm text-muted-foreground hover:text-[var(--primary)] transition-colors cursor-pointer">
                  Link Shortener
                </Link>
              </li>
            </ul>
          </div>

          {/* AI Features */}
          <div>
            <h3 className="font-semibold mb-4">AI Features</h3>
            <ul className="space-y-2">
              <li>
                <Link prefetch href="/ai/message-generator" className="text-sm text-muted-foreground hover:text-[var(--primary)] transition-colors cursor-pointer">
                  Message Generator
                </Link>
              </li>
              <li>
                <Link prefetch href="/ai/message-improver" className="text-sm text-muted-foreground hover:text-[var(--primary)] transition-colors cursor-pointer">
                  Message Improver
                </Link>
              </li>
              <li>
                <Link prefetch href="/ai/emoji-suggester" className="text-sm text-muted-foreground hover:text-[var(--primary)] transition-colors cursor-pointer">
                  Emoji Suggester
                </Link>
              </li>
              <li>
                <Link prefetch href="/ai/language-converter" className="text-sm text-muted-foreground hover:text-[var(--primary)] transition-colors cursor-pointer">
                  Language Converter
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} GoChatPilot. All rights reserved. Made with ❤️ for WhatsApp power users.
          </p>
        </div>
      </div>
    </footer>
  );
}
