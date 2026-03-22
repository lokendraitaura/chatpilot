import { getToolMetadata, getJsonLd } from '@/lib/seo';
import CTAGeneratorClient from './CTAGeneratorClient';

export const metadata = getToolMetadata('cta-generator');

export default function CTAGeneratorPage() {
  const jsonLd = getJsonLd('cta-generator');
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CTAGeneratorClient />
    </>
  );
}
