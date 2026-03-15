'use client';

import { useState } from 'react';
import { Search, Copy, Check, Briefcase, Users, Megaphone, Heart, LayoutGrid } from 'lucide-react';
import { MESSAGE_TEMPLATES } from '@/lib/constants';
import { useCopy } from '@/hooks/useCopy';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

export default function TemplatesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { copied, copy } = useCopy();

  const categories = ['All', 'Marketing', 'Sales', 'Support', 'Personal', 'Events'];

  // Flatten the MESSAGE_TEMPLATES object into a single array
  const allTemplates = Object.values(MESSAGE_TEMPLATES).flat().map(t => ({
    ...t,
    // Ensure all have a category for filtering
    category: t.category.charAt(0).toUpperCase() + t.category.slice(1)
  }));

  const filteredTemplates = allTemplates.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         t.template.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || t.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-10 max-w-6xl mx-auto">
      <div className="text-center space-y-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-16 h-16 mx-auto rounded-2xl gradient-primary flex items-center justify-center mb-6"
        >
          <LayoutGrid className="w-8 h-8 text-white" />
        </motion.div>
        <h1 className="text-4xl font-bold">Message Templates</h1>
        <p className="text-lg text-muted-foreground">Ready-to-use WhatsApp message templates for every business scenario.</p>
      </div>

      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-border focus:border-[var(--primary)] bg-card outline-none transition-all"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 rounded-xl font-bold whitespace-nowrap transition-all border-2 ${
                  selectedCategory === cat
                    ? 'border-[var(--primary)] bg-[var(--primary)] text-white'
                    : 'border-border bg-card text-muted-foreground hover:border-[var(--primary)]/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredTemplates.map((template, idx) => (
              <motion.div
                key={template.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-card border border-border rounded-3xl p-6 shadow-sm hover:shadow-xl hover:border-[var(--primary)] transition-all group flex flex-col"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-muted text-[10px] font-bold uppercase tracking-widest">{template.category}</span>
                  <button 
                    onClick={() => copy(template.template)}
                    className="p-2 rounded-lg hover:bg-[var(--primary)]/10 text-muted-foreground hover:text-[var(--primary)] transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                <h3 className="font-bold text-lg mb-4 group-hover:text-[var(--primary)] transition-colors">{template.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-4 leading-relaxed flex-1 mb-6">
                  {template.template}
                </p>
                <Button
                  onClick={() => copy(template.template)}
                  variant="outline"
                  className="w-full py-3"
                  leftIcon={<Copy className="w-4 h-4" />}
                >
                  Copy Template
                </Button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
