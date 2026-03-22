import { getToolMetadata, getJsonLd } from '@/lib/seo';
import LinkGeneratorClient from './LinkGeneratorClient';

export const metadata = getToolMetadata('link-generator');

export default function LinkGeneratorPage() {
  const jsonLd = getJsonLd('link-generator');
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LinkGeneratorClient />
    </>
  );
}
