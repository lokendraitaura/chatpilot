import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Language Converter for WhatsApp | GoChatPilot',
  description: 'Translate your WhatsApp messages into multiple languages while maintaining a natural tone.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
