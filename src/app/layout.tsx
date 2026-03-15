import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ChatPilot - AI-Powered WhatsApp Toolkit',
  description: 'Generate WhatsApp links, QR codes, AI messages, and marketing content from a single dashboard.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
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
              }),
            }}
          />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
