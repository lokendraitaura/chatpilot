import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ChatPilot Blog - WhatsApp Marketing Tips & Tricks',
  description: 'Learn how to master WhatsApp marketing with our expert guides, tips, and AI tools.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
