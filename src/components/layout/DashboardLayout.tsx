'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  LayoutDashboard, 
  Settings, 
  Menu,
  X,
  Link as LinkIcon,
  QrCode,
  MousePointerClick,
  Type,
  Scissors,
  Share2,
  Package,
  Mic,
  LayoutTemplate,
  Clock,
  Store,
  BookOpen
} from 'lucide-react';
import { useTheme } from '@/components/providers/ThemeProvider';

import { Logo } from '@/components/ui/Logo';

const TOOLS = [
  { name: 'Link Generator', href: '/tools/link-generator', icon: LinkIcon, group: 'Core Tools' },
  { name: 'QR Code', href: '/tools/qr-generator', icon: QrCode, group: 'Core Tools' },
  { name: 'Button Maker', href: '/tools/button-generator', icon: MousePointerClick, group: 'Core Tools' },
  { name: 'Link Shortener', href: '/tools/link-shortener', icon: Scissors, group: 'Core Tools' },
  { name: 'Formatter', href: '/tools/message-formatter', icon: Type, group: 'Core Tools' },
  { name: 'Share Link', href: '/tools/share-link', icon: Share2, group: 'Core Tools' },
  { name: 'Catalog Generator', href: '/tools/catalog-generator', icon: Package, group: 'Business Tools' },
  { name: 'Voice to Message', href: '/tools/voice-to-message', icon: Mic, group: 'Business Tools' },
  { name: 'Templates', href: '/tools/templates', icon: LayoutTemplate, group: 'Business Tools' },
  { name: 'Auto Reply', href: '/tools/auto-reply', icon: Clock, group: 'Business Tools' },
  { name: 'Profile Maker', href: '/tools/business-profile', icon: Store, group: 'Business Tools' },
];

const AI_TOOLS = [
  { name: 'Message Gen', href: '/ai/message-generator', icon: MessageSquare },
  { name: 'Improver', href: '/ai/message-improver', icon: MessageSquare },
  { name: 'Marketing Copy', href: '/ai/marketing-copy', icon: MessageSquare },
  { name: 'CTA Gen', href: '/ai/cta-generator', icon: MessageSquare },
  { name: 'Personalizer', href: '/ai/message-personalizer', icon: MessageSquare },
  { name: 'Translator', href: '/ai/language-converter', icon: MessageSquare },
  { name: 'Emoji Suggest', href: '/ai/emoji-suggester', icon: MessageSquare },
  { name: 'Customer Reply', href: '/ai/customer-reply', icon: MessageSquare },
  { name: 'Status Caption', href: '/ai/status-caption', icon: MessageSquare },
];

const mainNavigation = [
  { name: 'Dashboard', href: '/tools/dashboard', icon: LayoutDashboard },
  { name: 'Blog', href: '/blog', icon: BookOpen },
  { name: 'Settings', href: '/tools/settings', icon: Settings },
];

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { theme } = useTheme();

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-64 bg-card border-r border-border overflow-y-auto transition-transform lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-6 border-b border-border hidden lg:block">
          <Link href="/" className="flex items-center space-x-3 group">
            <Logo className="w-10 h-10 group-hover:scale-110 transition-transform" />
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight">ChatPilot</span>
              <span className="text-[10px] font-bold text-muted-foreground uppercase -mt-1">Premium Dashboard</span>
            </div>
          </Link>
        </div>

        <div className="p-4 space-y-6">
          <div>
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2">
              Menu
            </h3>
            <div className="space-y-1">
              {mainNavigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-2 px-2 py-2 rounded-lg text-sm font-medium transition-colors ${
                    pathname === item.href
                      ? `bg-[var(--primary)]/10 text-[var(--primary)]`
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2">
              Tools
            </h3>
            <div className="space-y-1">
              {TOOLS.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-2 px-2 py-2 rounded-lg text-sm font-medium transition-colors ${
                    pathname === item.href
                      ? `bg-[var(--primary)]/10 text-[var(--primary)]`
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2">
              AI Features
            </h3>
            <div className="space-y-1">
              {AI_TOOLS.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-2 px-2 py-2 rounded-lg text-sm font-medium transition-colors ${
                    pathname === item.href
                      ? `bg-[var(--primary)]/10 text-[var(--primary)]`
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-64 flex flex-col min-h-screen">
        {/* Top Header for Dashboard Navigation */}
        <header className="sticky top-0 z-30 flex items-center justify-between h-14 px-4 md:px-8 bg-background/50 backdrop-blur-md border-b border-border transition-all">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 -ml-2 rounded-lg hover:bg-muted text-muted-foreground lg:hidden"
            >
              <Menu className="w-6 h-6" />
            </button>
            <Link 
              href="/"
              className="flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-[var(--primary)] transition-colors group"
            >
              <LayoutDashboard className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>Back to Library</span>
            </Link>
          </div>
          
          <div className="hidden sm:flex items-center space-x-2 text-xs font-medium text-muted-foreground/60">
            <span>Tools</span>
            <span>/</span>
            <span className="text-foreground capitalize">{pathname.split('/').pop()?.replace(/-/g, ' ')}</span>
          </div>
        </header>

        <main className="flex-1 flex flex-col p-4 md:p-8 lg:p-12">
          <div className="w-full max-w-5xl mx-auto flex-1 h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
