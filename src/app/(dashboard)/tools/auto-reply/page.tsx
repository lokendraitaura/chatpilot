'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Copy, CheckCircle2, Wand2, Calendar, Clock, Briefcase, Sparkles, Send, LayoutGrid } from 'lucide-react';
import { Button } from '@/components/ui/button';
// DashboardLayout removed - handled by (dashboard)/layout.tsx

const TEMPLATES = [
  {
    id: 'out-of-office',
    title: 'Out of Office',
    icon: Briefcase,
    content: "Hi there! 👋 Thanks for your message. I'm currently away from the office until [Date]. If your request is urgent, please contact [Email/Phone]. Otherwise, I'll get back to you as soon as I return. Best regards!",
  },
  {
    id: 'after-hours',
    title: 'After Hours',
    icon: Clock,
    content: "Hello! Our business hours are [Time] to [Time], [Days]. We've received your message and will reply as soon as we open. Have a great day! 🏢",
  },
  {
    id: 'holiday',
    title: 'Holiday/Vacation',
    icon: Calendar,
    content: "Happy Holidays! 🎄 We are currently closed for [Holiday Name] and will reopen on [Date]. Thank you for your patience and we look forward to connecting soon!",
  },
  {
    id: 'instant-reply',
    title: 'Instant Support',
    icon: Send,
    content: "Hi! Thanks for reaching out to us. 🚀 This is an automated reply to let you know we've received your message. One of our human agents will be with you shortly. Your ticket number is #[Number].",
  }
];

export default function AutoReplyGenerator() {
  const [selectedTemplate, setSelectedTemplate] = useState(TEMPLATES[0]);
  const [message, setMessage] = useState(TEMPLATES[0].content);
  const [copied, setCopied] = useState(false);
  const [generating, setGenerating] = useState(false);
  
  // Business Info State
  const [businessName, setBusinessName] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [supportEmail, setSupportEmail] = useState('');

  const handleCopy = async () => {
    if (!message) return;
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text', err);
    }
  };

  const handleTemplateSelect = (template: typeof TEMPLATES[0]) => {
    setSelectedTemplate(template);
    setMessage(template.content);
  };

  const handleGenerateAI = () => {
    setGenerating(true);
    setTimeout(() => {
      let aiMessage = message;
      if (businessName) aiMessage = aiMessage.replace(/We|I/, `${businessName}`);
      if (returnDate) aiMessage = aiMessage.replace(/\[Date\]/, returnDate);
      if (supportEmail) aiMessage = aiMessage.replace(/\[Email\/Phone\]/, supportEmail);
      
      setMessage(`🌟 AI Enhanced: \n${aiMessage}\n\nThank you for choosing ${businessName || 'us'}!`);
      setGenerating(false);
    }, 1200);
  };

  return (
    <div className="space-y-8">
        <div className="text-center space-y-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-16 h-16 mx-auto rounded-2xl gradient-primary flex items-center justify-center mb-6"
          >
            <Clock className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-4xl font-bold">Auto Reply Generator</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Create professional automated responses for WhatsApp Business. Perfect for out-of-office and after hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto items-start">
          {/* Left Column: Editor */}
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-3xl p-6 md:p-8 shadow-sm space-y-8">
              <div className="space-y-4">
                <h2 className="text-sm font-bold text-muted-foreground uppercase flex items-center gap-2">
                  <LayoutGrid className="w-4 h-4" />
                  Select A Template
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {TEMPLATES.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => handleTemplateSelect(t)}
                      className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all cursor-pointer text-left ${
                        selectedTemplate.id === t.id
                          ? 'border-[var(--primary)] bg-[var(--primary)]/5 text-[var(--primary)]'
                          : 'border-transparent bg-muted/50 hover:bg-muted text-muted-foreground'
                      }`}
                    >
                      <t.icon className="w-5 h-5 shrink-0" />
                      <span className="font-bold text-xs">{t.title}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4 pt-6 border-t border-border">
                <h2 className="text-sm font-bold text-muted-foreground uppercase flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Personalize
                </h2>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase px-1">Business Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Acme Corp"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-[var(--primary)] outline-none text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase px-1">Return Date / Time</label>
                    <input
                      type="text"
                      placeholder="e.g. Next Monday"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-[var(--primary)] outline-none text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase px-1">Support Info</label>
                    <input
                      type="text"
                      placeholder="e.g. support@example.com"
                      value={supportEmail}
                      onChange={(e) => setSupportEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-[var(--primary)] outline-none text-sm"
                    />
                  </div>
                </div>
              </div>

              <Button
                onClick={handleGenerateAI}
                isLoading={generating}
                className="w-full py-4 text-base"
                leftIcon={<Wand2 className="w-5 h-5" />}
              >
                Generate AI Reply
              </Button>
            </div>
          </div>

          {/* Right Column: Preview */}
          <div className="lg:sticky lg:top-8">
            <div className="bg-card border border-border rounded-3xl p-6 md:p-8 shadow-sm space-y-6 flex flex-col h-full">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold text-muted-foreground uppercase flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Preview
                </h2>
              </div>

              <div className="flex-1 bg-muted/30 rounded-2xl p-6 min-h-[300px] relative group/preview">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full h-full bg-transparent border-none outline-none resize-none font-medium text-lg leading-relaxed text-foreground"
                  placeholder="The generated auto-reply will appear here..."
                />
              </div>

              <Button
                onClick={handleCopy}
                disabled={!message}
                variant={copied ? 'secondary' : 'outline'}
                className="w-full py-4"
                leftIcon={copied ? <CheckCircle2 className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              >
                {copied ? 'Copied!' : 'Copy Auto-Reply'}
              </Button>
            </div>
          </div>
        </div>
      </div>
  );
}
