import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/landing/Hero';
import { ToolsSection } from '@/components/landing/ToolsSection';
import { AiSection } from '@/components/landing/AiSection';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { Testimonials } from '@/components/landing/Testimonials';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <ToolsSection />
      <AiSection />
      <HowItWorks />
      <Testimonials />
      <Footer />
    </main>
  );
}
