'use client';

import { useState } from 'react';
import { Search, Copy, Check, Briefcase, Users, Megaphone, Heart, LayoutGrid } from 'lucide-react';
import { MESSAGE_TEMPLATES } from '@/lib/constants';
import { useCopy } from '@/hooks/useCopy';
import { motion, AnimatePresence } from 'motion/react';
// DashboardLayout removed - handled by (dashboard)/layout.tsx

export default function TemplatesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'business' | 'customer' | 'marketing' | 'personal'>('all');
  const { copied, copy } = useCopy();
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const categories = [
    { value: 'all' as const, label: 'All', icon: LayoutGrid },
    { value: 'business' as const, label: 'Business', icon: Briefcase },
    { value: 'customer' as const, label: 'Customer', icon: Users },
    { value: 'marketing' as const, label: 'Marketing', icon: Megaphone },
    { value: 'personal' as const, label: 'Personal', icon: Heart },
  ];

  const allTemplates = Object.values(MESSAGE_TEMPLATES).flat();
  const filteredTemplates = allTemplates.filter(template => {
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    const matchesSearch = template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.template.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCopy = (text: string, index: number) => {
    copy(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-8">
        <div className="text-center space-y-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-16 h-16 mx-auto rounded-2xl gradient-primary flex items-center justify-center mb-6"
          >
            <LayoutGrid className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-4xl font-bold">Message Templates</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready-to-use WhatsApp message templates for business, marketing, and personal needs.
          </p>
        </div>

        <div className="max-w-6xl mx-auto w-full space-y-8">
          {/* Search and Filters */}
          <div className="bg-card border border-border rounded-3xl p-6 shadow-sm space-y-6">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search templates (e.g., 'follow up', 'discount')..."
                className="w-full pl-14 pr-6 py-4 rounded-2xl border-2 border-border focus:border-[var(--primary)] bg-background outline-none transition-all text-base"
              />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-xl border-2 font-bold text-sm transition-all cursor-pointer ${
                    selectedCategory === cat.value
                      ? 'border-[var(--primary)] bg-[var(--primary)]/5 text-[var(--primary)]'
                      : 'border-transparent bg-muted/50 text-muted-foreground hover:bg-muted'
                  }`}
                >
                  <cat.icon className="w-4 h-4" />
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Templates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredTemplates.map((template, index) => (
                <motion.div
                  key={`${template.title}-${index}`}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-card border border-border rounded-3xl p-6 hover:border-[var(--primary)]/30 hover:shadow-xl hover:shadow-[var(--primary)]/5 transition-all group flex flex-col h-full"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="space-y-1">
                      <h3 className="font-bold text-lg leading-tight">{template.title}</h3>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[var(--primary)] opacity-40"></span>
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                          {template.category}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1 bg-muted/30 rounded-2xl p-4 mb-4 relative overflow-hidden">
                    <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line line-clamp-6">
                      {template.template}
                    </p>
                  </div>

                  <button
                    onClick={() => handleCopy(template.template, index)}
                    className={`w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      copiedIndex === index 
                        ? 'bg-green-500/10 text-green-500 border border-green-500/20' 
                        : 'bg-background border border-border hover:bg-[var(--primary)]/5 hover:text-[var(--primary)] hover:border-[var(--primary)]'
                    }`}
                  >
                    {copiedIndex === index ? (
                      <>
                        <Check className="w-4 h-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy Template
                      </>
                    )}
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredTemplates.length === 0 && (
            <div className="text-center py-20 bg-muted/20 rounded-3xl border-2 border-dashed border-border">
              <Search className="w-12 h-12 mx-auto mb-4 opacity-20" />
              <p className="text-xl font-bold text-muted-foreground">No templates found</p>
              <p className="text-sm text-muted-foreground mt-1">Try searching for something else or change the category.</p>
            </div>
          )}
        </div>
      </div>
  );
}
