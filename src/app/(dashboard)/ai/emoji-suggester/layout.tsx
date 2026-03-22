import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Emoji Suggester | GoChatPilot',
  description: 'Get perfect emoji suggestions for your WhatsApp messages to increase engagement.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
