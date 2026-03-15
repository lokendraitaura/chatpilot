'use client';

import { motion } from 'framer-motion';
import { BookOpen, ArrowRight, Clock, User } from 'lucide-react';
// DashboardLayout removed - handled by (dashboard)/layout.tsx
import Link from 'next/link';

const BLOG_POSTS = [
  {
    slug: 'how-to-create-whatsapp-link',
    title: 'How to Create a WhatsApp Link for Your Business',
    excerpt: 'Learn the step-by-step process of creating custom WhatsApp links to make it easier for customers to contact you.',
    date: 'March 15, 2026',
    author: 'ChatPilot Team',
    readTime: '5 min read',
    category: 'Guides',
  },
  {
    slug: 'whatsapp-marketing-tips',
    title: '10 Essential WhatsApp Marketing Tips for Small Businesses',
    excerpt: 'Boost your sales and customer engagement with these proven WhatsApp marketing strategies and techniques.',
    date: 'March 12, 2026',
    author: 'Marketing Expert',
    readTime: '8 min read',
    category: 'Marketing',
  },
  {
    slug: 'best-whatsapp-message-templates',
    title: 'Top 50 WhatsApp Message Templates for Every Situation',
    excerpt: 'Save time with our curated list of professional WhatsApp templates for sales, support, and announcements.',
    date: 'March 10, 2026',
    author: 'Support Lead',
    readTime: '12 min read',
    category: 'Templates',
  },
];

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
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group bg-card border border-border rounded-3xl overflow-hidden hover:shadow-xl hover:border-[var(--primary)] transition-all flex flex-col"
            >
              <div className="h-48 bg-muted group-hover:bg-[var(--primary)]/5 transition-colors flex items-center justify-center p-8 text-center">
                 <span className="text-2xl font-bold opacity-20 group-hover:opacity-100 transition-opacity">ChatPilot Insights</span>
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
                    <span>{post.author}</span>
                  </div>
                  <Link 
                    href={`/blog/${post.slug}`}
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
