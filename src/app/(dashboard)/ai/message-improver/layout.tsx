import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Message Improver | ChatPilot',
  description: 'Refine and improve your WhatsApp messages to sound more professional and engaging with AI.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
