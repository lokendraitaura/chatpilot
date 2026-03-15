'use client';

import { useState } from 'react';
import { Package, Copy, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
// DashboardLayout removed - handled by (dashboard)/layout.tsx

interface Product {
  id: string;
  name: string;
  price: string;
  description: string;
}

export default function CatalogGenerator() {
  const [currency, setCurrency] = useState('$');
  const [products, setProducts] = useState<Product[]>([
    { id: '1', name: '', price: '', description: '' },
  ]);
  const [generatedMessage, setGeneratedMessage] = useState('');

  const addProduct = () => {
    setProducts([...products, { id: Date.now().toString(), name: '', price: '', description: '' }]);
  };

  const removeProduct = (id: string) => {
    if (products.length > 1) {
      setProducts(products.filter((p: Product) => p.id !== id));
    }
  };

  const updateProduct = (id: string, field: keyof Product, value: string) => {
    setProducts(products.map((p: Product) => p.id === id ? { ...p, [field]: value } : p));
  };

  const generateCatalog = () => {
    const validProducts = products.filter((p: Product) => p.name.trim() !== '');
    if (validProducts.length === 0) {
      setGeneratedMessage('Please add at least one product with a name.');
      return;
    }

    let message = '🛍️ *NEW CATALOG* 🛍️\n\n';
    message += validProducts.map((p: Product, index: number) => {
      let item = `${index + 1}. *${p.name.trim()}*\n`;
      if (p.price) item += `Price: ${currency}${p.price.trim()}\n`;
      if (p.description) item += `${p.description.trim()}\n`;
      return item;
    }).join('\n');

    message += '\nReply to place an order! 🛒';
    setGeneratedMessage(message);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedMessage);
  };

  return (
    <div className="space-y-8">
        <div className="text-center space-y-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-16 h-16 mx-auto rounded-2xl gradient-primary flex items-center justify-center mb-6"
          >
            <ShoppingBag className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-4xl font-bold">Catalog Generator</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Create professional product catalogs to share with your customers on WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto items-start">
          {/* Editor */}
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-3xl p-6 md:p-8 shadow-sm">
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-border">
                <h2 className="text-xl font-bold">Product List</h2>
                <div className="flex items-center gap-2 bg-muted/50 p-2 rounded-xl border border-border">
                  <span className="text-xs font-bold text-muted-foreground px-2">Currency</span>
                  <input
                    type="text"
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-10 h-8 rounded-lg border border-border bg-background text-center text-sm font-bold focus:ring-2 focus:ring-[var(--primary)] outline-none"
                  />
                </div>
              </div>

              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                <AnimatePresence mode="popLayout">
                  {products.map((product: Product, index: number) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="p-5 border border-border rounded-2xl bg-muted/30 relative group hover:border-[var(--primary)]/30 transition-all"
                    >
                      <button
                        onClick={() => removeProduct(product.id)}
                        className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-destructive/10 text-destructive flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-sm hover:bg-destructive hover:text-white cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <div className="grid gap-3">
                        <input
                          placeholder="Product Name"
                          value={product.name}
                          onChange={(e) => updateProduct(product.id, 'name', e.target.value)}
                          className="w-full px-4 py-2 rounded-xl border border-border bg-background focus:ring-2 focus:ring-[var(--primary)] outline-none text-sm font-bold"
                        />
                        <div className="grid grid-cols-3 gap-3">
                          <input
                            placeholder="Price"
                            value={product.price}
                            onChange={(e) => updateProduct(product.id, 'price', e.target.value)}
                            className="w-full px-4 py-2 rounded-xl border border-border bg-background focus:ring-2 focus:ring-[var(--primary)] outline-none text-sm col-span-1"
                          />
                          <input
                            placeholder="Description (Optional)"
                            value={product.description}
                            onChange={(e) => updateProduct(product.id, 'description', e.target.value)}
                            className="w-full px-4 py-2 rounded-xl border border-border bg-background focus:ring-2 focus:ring-[var(--primary)] outline-none text-sm col-span-2"
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                <button
                  onClick={addProduct}
                  className="py-4 flex items-center justify-center gap-2 border-2 border-dashed border-border rounded-2xl text-muted-foreground hover:text-[var(--primary)] hover:border-[var(--primary)] hover:bg-[var(--primary)]/5 transition-all cursor-pointer font-bold text-sm"
                >
                  <Plus className="w-4 h-4" />
                  Add Another Product
                </button>

                <button
                  onClick={generateCatalog}
                  className="py-4 rounded-2xl gradient-primary text-white font-bold hover:opacity-90 transition-all shadow-lg shadow-[var(--primary)]/20 cursor-pointer text-sm"
                >
                  Generate Catalog
                </button>
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="lg:sticky lg:top-8">
            <div className="bg-card border border-border rounded-3xl p-6 md:p-8 shadow-sm flex flex-col h-full">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">WhatsApp Preview</h2>
                {generatedMessage && (
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 text-xs font-bold text-[var(--primary)] bg-[var(--primary)]/10 px-4 py-2 rounded-full hover:bg-[var(--primary)]/20 transition-all cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    Copy All
                  </button>
                )}
              </div>
              
              <div className="flex-1 bg-[#E5DDD5] dark:bg-[#0B141A] p-6 rounded-3xl min-h-[400px] relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 dark:opacity-20 pointer-events-none" 
                     style={{ backgroundImage: 'url("https://w0.peakpx.com/wallpaper/508/606/HD-wallpaper-whatsapp-background-cool-dark-green-new-theme-whatsapp.jpg")', backgroundSize: 'cover' }}>
                </div>
                
                <AnimatePresence mode="wait">
                  {generatedMessage ? (
                    <motion.div
                      key="msg"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="bg-white dark:bg-[#202C33] text-foreground dark:text-[#E9EDEF] p-4 rounded-2xl rounded-tl-none shadow-md text-sm whitespace-pre-wrap relative z-10 w-fit max-w-[90%] leading-relaxed"
                    >
                      {generatedMessage}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col items-center justify-center h-full text-muted-foreground text-sm italic absolute inset-0 z-10 p-12 text-center"
                    >
                      <Package className="w-12 h-12 mb-4 opacity-20" />
                      <p>Enter your products on the left to see the WhatsApp preview here.</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}
