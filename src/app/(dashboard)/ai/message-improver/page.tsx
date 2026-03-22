import { getToolMetadata, getJsonLd } from '@/lib/seo';
import MessageImproverClient from './MessageImproverClient';

export const metadata = getToolMetadata('message-improver');

export default function MessageImproverPage() {
  const jsonLd = getJsonLd('message-improver');
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MessageImproverClient />
    </>
  );
}
