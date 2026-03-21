import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ChatPilot - AI-Powered WhatsApp Toolkit',
  description: 'Generate WhatsApp links, QR codes, AI messages, and marketing content from a single dashboard.',
  metadataBase: new URL('https://chatpilot.in'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://chatpilot.in/',
    siteName: 'ChatPilot',
    title: 'ChatPilot - AI-Powered WhatsApp Toolkit',
    description: 'Generate WhatsApp links, QR codes, AI messages, and marketing content from a single dashboard.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ChatPilot - AI-Powered WhatsApp Toolkit',
    description: 'Generate WhatsApp links, QR codes, AI messages, and marketing content from a single dashboard.',
  },
  manifest: '/manifest.json',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#ffffff',
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
            <SplashScreen />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify([
                {
                  "@context": "https://schema.org",
                  "@type": "WebSite",
                  "name": "ChatPilot",
                  "url": "https://chatpilot.in",
                  "description": "AI-Powered WhatsApp Toolkit for Marketing and Productivity",
                  "potentialAction": {
                    "@type": "SearchAction",
                    "target": "https://chatpilot.in/search?q={search_term_string}",
                    "query-input": "required name=search_term_string"
                  }
                },
                {
                  "@context": "https://schema.org",
                  "@type": "SoftwareApplication",
                  "name": "ChatPilot",
                  "operatingSystem": "All",
                  "applicationCategory": "BusinessApplication",
                  "description": "AI-powered WhatsApp toolkit bringing automation, message generators, and marketing copy tools into one dashboard.",
                  "url": "https://chatpilot.in",
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
