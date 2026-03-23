import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "GoChatPilot - WhatsApp Tools, QR Code Generator & AI Message Generator",
  description:
    "Free WhatsApp tools like link generator, QR code generator, AI message writer, and bulk messaging tools. Boost your WhatsApp marketing with GoChatPilot.",
  keywords: [
    "GoChatPilot",
    "WhatsApp link generator",
    "WhatsApp QR code generator",
    "AI message generator",
    "WhatsApp marketing tools",
    "free WhatsApp tools",
    "chat link generator",
    "QR code generator free",
    "bulk WhatsApp message tool",
    "WhatsApp button generator",
    "WhatsApp tools free",
    "AI WhatsApp writer",
    "WhatsApp business tools",
    "click to chat WhatsApp",
    "WhatsApp chatbot tools",
    "WhatsApp auto reply",
    "WhatsApp status caption generator",
    "WhatsApp message templates",
    "GoChatPilot tools",
    "WhatsApp marketing automation",
    "WhatsApp catalog maker",
    "free QR code WhatsApp"
  ],
  metadataBase: new URL("https://chat-pilot.in"),
  authors: [{ name: "GoChatPilot Team", url: "https://chat-pilot.in" }],
  category: "Technology",
  openGraph: {
    title: "GoChatPilot - Free WhatsApp Tools & AI Message Generator",
    description:
      "Generate WhatsApp links, QR codes, and AI-powered messages instantly. Free tools for marketers and businesses.",
    url: "https://chat-pilot.in",
    siteName: "GoChatPilot",
    images: [
      {
        url: "/icon-512.png",
        width: 512,
        height: 512,
        alt: "GoChatPilot - WhatsApp Tools & AI Message Generator",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GoChatPilot - WhatsApp Tools & AI Message Generator",
    description:
      "Create WhatsApp links, QR codes, and AI messages easily with GoChatPilot.",
    images: ["/icon-512.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: "https://chat-pilot.in",
  },
  manifest: "/manifest.json?v=2",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "GoChatPilot",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#25D366',
};

import { GoogleAnalytics } from '@next/third-parties/google';

import { PWAProvider } from '@/components/pwa/PWAProvider';
import { Toaster } from 'sonner';
import { SplashScreen } from '@/components/ui/SplashScreen';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <PWAProvider>
          <ThemeProvider>
          <script
            id="pwa-handler"
            dangerouslySetInnerHTML={{
              __html: `
                window.deferredPWAPrompt = null;
                window.addEventListener('beforeinstallprompt', (e) => {
                  e.preventDefault();
                  window.deferredPWAPrompt = e;
                  console.log('✅ Global PWA prompt captured');
                  window.dispatchEvent(new Event('pwa-ready'));
                });
              `
            }}
          />
          <SplashScreen />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify([
                {
                  "@context": "https://schema.org",
                  "@type": "WebSite",
                  "name": "GoChatPilot",
                  "url": "https://chat-pilot.in",
                  "description": "AI-Powered WhatsApp Toolkit for Marketing and Productivity by GoChatPilot",
                  "potentialAction": {
                    "@type": "SearchAction",
                    "target": "https://chat-pilot.in/?q={search_term_string}",
                    "query-input": "required name=search_term_string"
                  }
                },
                {
                  "@context": "https://schema.org",
                  "@type": "SoftwareApplication",
                  "name": "GoChatPilot",
                  "operatingSystem": "Web, Android, iOS",
                  "applicationCategory": "ProductivityApplication",
                  "featureList": "WhatsApp Tools, QR Code Generator, AI Message Generator, WhatsApp Link Shortener, Button Generator, Catalog Maker",
                  "description": "AI-powered WhatsApp toolkit by GoChatPilot bringing automation, message generators, and marketing copy tools into one dashboard.",
                  "url": "https://chat-pilot.in",
                  "author": {
                    "@type": "Organization",
                    "name": "GoChatPilot",
                    "url": "https://chat-pilot.in"
                  },
                  "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "USD"
                  }
                }
              ]),
            }}
          />
          {children}
          <Toaster position="bottom-right" theme="system" richColors />
          <GoogleAnalytics gaId="G-YOUR-MEARSUREMENT-ID" />
        </ThemeProvider>
        </PWAProvider>
      </body>
    </html>
  );
}
