'use client';

import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, User, Calendar, Share2 } from 'lucide-react';
// DashboardLayout removed - handled by (dashboard)/layout.tsx
import Link from 'next/link';

export default function BlogPostPage() {
  const pathname = usePathname();
  const slug = pathname.split('/').pop();

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20 text-left">
        <Link 
          href="/blog"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-[var(--primary)] transition-colors font-bold text-sm mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>
        
        <div className="space-y-6">
          <div className="flex items-center gap-4 text-sm font-bold text-[var(--primary)] uppercase tracking-wider">
            <span>Marketing Guide</span>
            <span className="w-1 h-1 rounded-full bg-border" />
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" /> 5 min read
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Comprehensive Strategy for WhatsApp Marketing
          </h1>
          
          <div className="flex items-center gap-6 py-6 border-y border-border">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-muted-foreground" />
              <span className="font-bold">ChatPilot Editorial</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-muted-foreground" />
              <span className="text-muted-foreground">March 15, 2026</span>
            </div>
            <button className="ml-auto p-2 rounded-xl bg-muted hover:bg-[var(--primary)]/10 text-muted-foreground hover:text-[var(--primary)] transition-all">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none space-y-6 pt-8 text-muted-foreground leading-relaxed">
          <p className="text-xl font-medium text-foreground">
            WhatsApp has transformed from a personal messaging app into a global commerce powerhouse. With over 2 billion active users, it offers an unparalleled opportunity for businesses to connect with their audience.
          </p>
          
          <h2 className="text-2xl font-bold text-foreground pt-4">Why WhatsApp Marketing?</h2>
          <p>
            Unlike email marketing, which often has an open rate of less than 20%, WhatsApp boasts open rates as high as 98%. This means your marketing messages are almost guaranteed to be seen by your customers.
          </p>

          <h3 className="text-xl font-bold text-foreground">1. Creating Your Direct Link</h3>
          <p>
            The easiest way to start is by using a professional Link Generator. It allows customers to start a conversation with just one tap, removing all friction from the discovery process.
          </p>

          <div className="bg-[var(--primary)]/5 border-l-4 border-[var(--primary)] p-6 rounded-r-2xl my-8 italic">
            "Direct communication beats generic advertising every single time. Personalized WhatsApp outreach creates trust and drives conversions."
          </div>

          <p>
            In conclusion, ChatPilot provides the tools you need to automate and refine this process. From generating AI-powered messages to creating secure QR codes, we help you master the art of conversational commerce.
          </p>
    </div>
  );
}
