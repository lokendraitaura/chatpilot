'use client';

import { useState } from 'react';
import { Package, Copy, Plus, Trash2, ShoppingBag, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useCopy } from '@/hooks/useCopy';

interface Product {
  id: string;
  name: string;
  price: string;
  desc: string;
}

export default function CatalogGeneratorPage() {
  const [products, setProducts] = useState<Product[]>([
    { id: '1', name: 'Product 1', price: '$99', desc: 'Premium Quality' }
  ]);
  const { copied, copy } = useCopy();

  const addProduct = () => {
    setProducts([...products, { id: Date.now().toString(), name: '', price: '', desc: '' }]);
  };

  const removeProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const updateProduct = (id: string, field: keyof Product, value: string) => {
    setProducts(products.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const catalogText = products
    .filter(p => p.name)
    .map(p => `📦 *${p.name}*\n💰 Price: ${p.price}\n📝 ${p.desc}\n`)
    .join('\n---\n\n');

  return (
    <div className="space-y-10 max-w-5xl mx-auto">
      <div className="text-center space-y-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-16 h-16 mx-auto rounded-2xl gradient-primary flex items-center justify-center mb-6"
        >
          <Package className="w-8 h-8 text-white" />
        </motion.div>
        <h1 className="text-4xl font-bold">WhatsApp Catalog Maker</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Create structured product lists and catalogs to share with your customers instantly on WhatsApp.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start text-left">
        <div className="space-y-6 text-left">
          <AnimatePresence mode="popLayout">
            {products.map((p, idx) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-card border border-border rounded-2xl p-6 shadow-sm relative group text-left"
              >
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      placeholder="Product Name"
                      value={p.name}
                      onChange={(e) => updateProduct(p.id, 'name', e.target.value)}
                      className="bg-transparent border-b-2 border-border focus:border-[var(--primary)] outline-none py-2 font-bold"
                    />
                    <input
                      placeholder="Price"
                      value={p.price}
                      onChange={(e) => updateProduct(p.id, 'price', e.target.value)}
                      className="bg-transparent border-b-2 border-border focus:border-[var(--primary)] outline-none py-2 text-right font-mono"
                    />
                  </div>
                  <input
                    placeholder="Short Description"
                    value={p.desc}
                    onChange={(e) => updateProduct(p.id, 'desc', e.target.value)}
                    className="bg-transparent border-b border-border focus:border-[var(--primary)] outline-none py-2 text-sm text-muted-foreground"
                  />
                </div>
                {products.length > 1 && (
                  <button 
                    onClick={() => removeProduct(p.id)}
                    className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          <Button
            variant="outline"
            onClick={addProduct}
            className="w-full py-4 border-dashed border-2 hover:border-[var(--primary)] hover:bg-[var(--primary)]/5"
            leftIcon={<Plus className="w-5 h-5" />}
          >
            Add Another Product
          </Button>
        </div>

        <div className="lg:sticky lg:top-8 text-left">
          <div className="bg-card border border-border rounded-3xl p-8 shadow-sm space-y-6 flex flex-col h-full text-left">
            <div className="flex items-center justify-between">
              <h3 className="font-bold flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" /> Catalog Preview
              </h3>
              <Button
                variant={copied ? 'secondary' : 'primary'}
                size="sm"
                onClick={() => copy(catalogText)}
                leftIcon={copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              >
                {copied ? 'Copied' : 'Copy Catalog'}
              </Button>
            </div>
            <div className="flex-1 bg-muted/30 rounded-2xl p-6 min-h-[400px] font-mono text-sm whitespace-pre-wrap border border-border/50">
              {catalogText || 'Start adding products to see your catalog preview...'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
