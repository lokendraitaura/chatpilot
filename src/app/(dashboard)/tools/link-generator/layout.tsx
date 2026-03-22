import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'WhatsApp Link Generator | GoChatPilot',
  description: 'Create custom WhatsApp links with pre-filled messages instantly. Simple, fast, and free.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
