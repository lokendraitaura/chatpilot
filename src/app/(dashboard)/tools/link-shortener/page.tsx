import { getToolMetadata, getJsonLd } from '@/lib/seo';
import LinkShortenerClient from './LinkShortenerClient';

export const metadata = getToolMetadata('link-shortener');

export default function LinkShortenerPage() {
  const jsonLd = getJsonLd('link-shortener');
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LinkShortenerClient />
    </>
  );
}
