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
  BookOpen,
  Wand2,
  Sparkles,
  PenTool,
  MessageCircle,
  Users,
  Languages,
  Smile,
  Image as ImageIcon
} from 'lucide-react';
import { useTheme } from '@/components/providers/ThemeProvider';
import { Logo } from '@/components/ui/Logo';
import { InstallAppButton } from '@/components/pwa/InstallAppButton';

const TOOLS = [
  { name: 'Link Generator', href: '/tools/link-generator', icon: LinkIcon, group: 'Core Tools' },
  { name: 'QR Code', href: '/tools/qr-generator', icon: QrCode, group: 'Core Tools' },
  { name: 'Button Maker', icon: MousePointerClick, href: '/tools/button-generator', group: 'Core Tools' },
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
  { name: 'Message Gen', href: '/ai/message-generator', icon: Wand2 },
  { name: 'Improver', href: '/ai/message-improver', icon: Sparkles },
  { name: 'Marketing Copy', href: '/ai/marketing-copy', icon: PenTool },
  { name: 'CTA Gen', href: '/ai/cta-generator', icon: MessageCircle },
  { name: 'Personalizer', href: '/ai/message-personalizer', icon: Users },
  { name: 'Translator', href: '/ai/language-converter', icon: Languages },
  { name: 'Emoji Suggest', href: '/ai/emoji-suggester', icon: Smile },
  { name: 'Customer Reply', href: '/ai/customer-reply', icon: MessageSquare },
  { name: 'Status Caption', href: '/ai/status-caption', icon: ImageIcon },
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
        className={`fixed top-0 left-0 z-50 h-screen w-64 bg-card border-r border-border overflow-y-auto transition-transform lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
      >
        <div className="p-6 border-b border-border flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 group">
            <Logo className="w-10 h-10 group-hover:scale-110 transition-transform" />
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight">ChatPilot</span>
              <span className="text-[10px] font-bold text-muted-foreground uppercase -mt-1">Premium Dashboard</span>
            </div>
          </Link>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="p-2 rounded-lg hover:bg-muted lg:hidden text-muted-foreground"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-6">
          <div>
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2">Menu</h3>
            <div className="space-y-1">
              {mainNavigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-2 px-2 py-2 rounded-lg text-sm font-medium transition-colors ${pathname === item.href
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
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2">Tools</h3>
            <div className="space-y-1">
              {TOOLS.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-2 px-2 py-2 rounded-lg text-sm font-medium transition-colors ${pathname === item.href
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
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2">AI Features</h3>
            <div className="space-y-1">
              {AI_TOOLS.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-2 px-2 py-2 rounded-lg text-sm font-medium transition-colors ${pathname === item.href
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

      <div className="lg:pl-64 flex flex-col min-h-screen">
        {/* Fixed header - always stays at top, offset by sidebar on desktop */}
        <header className="fixed top-0 left-0 right-0 lg:left-64 z-40 flex items-center justify-between h-14 px-4 md:px-8 bg-background border-b border-border shadow-sm">
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

          <div className="flex items-center space-x-4">
            <InstallAppButton />
            <div className="hidden sm:flex items-center space-x-2 text-xs font-medium text-muted-foreground/60">
              <span>Tools</span>
              <span>/</span>
              <span className="text-foreground capitalize">{pathname.split('/').pop()?.replace(/-/g, ' ')}</span>
            </div>
          </div>
        </header>

        {/* pt-20 = reduced top padding on mobile, more on desktop */}
        <main className=" flex-1 flex flex-col pt-20 lg:pt-24 pb-20 lg:pb-12 px-3 sm:px-6 md:px-8 mt-2 overflow-x-hidden">
          <div className="w-full max-w-5xl mx-auto flex-1 h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
