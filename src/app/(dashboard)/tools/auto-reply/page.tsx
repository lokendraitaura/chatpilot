import { getToolMetadata, getJsonLd } from '@/lib/seo';
import AutoReplyClient from './AutoReplyClient';

export const metadata = getToolMetadata('auto-reply');

export default function AutoReplyPage() {
  const jsonLd = getJsonLd('auto-reply');
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AutoReplyClient />
    </>
  );
}
