'use client';

import { motion } from 'framer-motion';
import { BookOpen, ArrowRight, Clock, User } from 'lucide-react';
import * as Icons from 'lucide-react';
// DashboardLayout removed - handled by (dashboard)/layout.tsx
import Link from 'next/link';
import Image from 'next/image';

import { BLOG_POSTS } from '@/lib/blog-data';

export default function BlogPage() {
  return (
    <div className="space-y-12 max-w-6xl mx-auto pb-20">
      <div className="text-center space-y-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-16 h-16 mx-auto rounded-2xl gradient-primary flex items-center justify-center mb-6"
          >
            <BookOpen className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-5xl font-bold">ChatPilot Blog</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Insights, guides, and strategies to help you master WhatsApp marketing and grow your business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group bg-card border border-border rounded-3xl overflow-hidden hover:shadow-xl hover:border-[var(--primary)] transition-all flex flex-col"
            >
              <div 
                className="h-48 relative overflow-hidden bg-muted group-hover:opacity-90 transition-opacity"
              >
                 <Image 
                   src={post.image} 
                   alt={`${post.title} thumbnail`}
                   fill
                   sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                   className="object-cover object-top"
                 />
                 <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-transparent" />
                 <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-bold bg-white/90 text-black backdrop-blur-md px-4 py-2 rounded-xl opacity-0 translate-y-4 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 shadow-xl border border-white/50 z-10">
                   Read Guide
                 </span>
              </div>
              <div className="p-8 space-y-4 flex-1 flex flex-col">
                <div className="flex items-center gap-4 text-xs font-bold text-[var(--primary)] uppercase tracking-wider">
                  <span>{post.category}</span>
                  <span className="w-1 h-1 rounded-full bg-border" />
                  <span className="text-muted-foreground">{post.readTime}</span>
                </div>
                <h3 className="text-2xl font-bold leading-tight group-hover:text-[var(--primary)] transition-colors">
                  {post.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="pt-6 mt-auto border-t border-border flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <User className="w-3 h-3" />
                    <span>ChatPilot Team</span>
                  </div>
                  <Link 
                    href={`/blog/${post.id}`}
                    className="flex items-center gap-2 text-[var(--primary)] font-bold text-sm hover:underline"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
      </div>
    </div>
  );
}
