import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'WhatsApp QR Code Generator | ChatPilot',
  description: 'Generate beautiful and scannable QR codes for your WhatsApp links and numbers.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
