import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI WhatsApp Message Personalizer | ChatPilot',
  description: 'Personalize your WhatsApp customer outreach at scale with AI.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
