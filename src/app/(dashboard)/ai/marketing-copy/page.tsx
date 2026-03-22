import { getToolMetadata, getJsonLd } from '@/lib/seo';
import MarketingCopyClient from './MarketingCopyClient';

export const metadata = getToolMetadata('marketing-copy');

export default function MarketingCopyPage() {
  const jsonLd = getJsonLd('marketing-copy');
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MarketingCopyClient />
    </>
  );
}
