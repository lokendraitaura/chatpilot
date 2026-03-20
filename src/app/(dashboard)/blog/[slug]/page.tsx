'use client';

import { useParams } from 'next/navigation';
import { BLOG_POSTS } from '@/lib/blog-data';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Calendar, Tag } from 'lucide-react';
import * as Icons from 'lucide-react';
import Link from 'next/link';

export default function BlogPostPage() {
  const params = useParams();
  const postId = params.slug as string;
  
  const post = BLOG_POSTS.find(p => p.id === postId);

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
        <p className="text-muted-foreground mb-8">The article you are looking for does not exist.</p>
        <Link href="/blog" className="text-[var(--primary)] hover:underline flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>
      </div>
    );
  }

  const IconCmp = Icons[post.iconName as keyof typeof Icons] as any;

  return (
    <div className="max-w-4xl mx-auto pb-20 space-y-8">
      <Link href="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4 bg-muted px-4 py-2 rounded-full text-sm font-medium">
        <ArrowLeft className="w-4 h-4" /> Back to all posts
      </Link>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className={`w-full h-64 md:h-80 rounded-[2.5rem] bg-gradient-to-br ${post.gradient} relative overflow-hidden flex items-center p-8 md:p-16 shadow-2xl`}>
          {IconCmp && (
             <IconCmp className="absolute -right-20 -bottom-20 w-96 h-96 text-black/10 transform -rotate-12" />
          )}
          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="flex items-center gap-4 text-xs font-bold text-white uppercase tracking-wider bg-black/20 backdrop-blur-md w-fit px-4 py-2 rounded-full border border-white/20">
              <span className="flex items-center gap-1.5"><Tag className="w-3 h-3" /> {post.category}</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight text-white drop-shadow-md">{post.title}</h1>
            <div className="flex items-center gap-4 text-sm font-medium text-white/90">
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {post.date}</span>
              <span className="opacity-50">•</span>
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {post.readTime}</span>
            </div>
          </div>
        </div>

        <div className="w-full rounded-[2rem] overflow-hidden shadow-2xl border border-border mt-8 bg-muted">
          <img 
            src={post.image} 
            alt={`${post.title} interface`}
            className="w-full h-auto object-cover"
          />
        </div>

        <div className="bg-card rounded-[2.5rem] p-8 md:p-12 border border-border shadow-sm mt-8">
          <div 
            className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-h2:text-[var(--primary)] prose-a:text-[var(--primary)]"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </motion.div>
    </div>
  );
}
