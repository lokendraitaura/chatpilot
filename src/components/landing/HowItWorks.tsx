'use client';

import { motion } from 'framer-motion';
import { MousePointerClick, Settings, Rocket } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Choose Your Tool',
    description: 'Select from our wide range of WhatsApp tools and AI features to get started.',
    icon: MousePointerClick,
  },
  {
    number: '02',
    title: 'Customize & Generate',
    description: 'Input your details, customize settings, and let our AI do the heavy lifting.',
    icon: Settings,
  },
  {
    number: '03',
    title: 'Launch & Track',
    description: 'Use your generated links, QR codes, or messages and watch your engagement grow.',
    icon: Rocket,
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-4"
          >
            How It Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Get started in three simple steps
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative">
          {/* Connection Lines */}
          <div className="hidden md:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--primary)]" style={{ width: '66%', left: '16.66%' }} />

          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative"
            >
              <div className="text-center">
                <div className="relative inline-block mb-6">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] flex items-center justify-center shadow-lg shadow-[var(--primary)]/30">
                    <step.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-card border-2 border-[var(--primary)] flex items-center justify-center">
                    <span className="text-xs font-bold text-[var(--primary)]">{step.number}</span>
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
