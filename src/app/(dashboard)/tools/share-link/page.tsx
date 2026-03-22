import ShareLinkClient from './ShareLinkClient';
import { getToolMetadata, getJsonLd } from '@/lib/seo';
import { Metadata } from 'next';

const TOOL_ID = 'share-link';

export const metadata: Metadata = getToolMetadata(TOOL_ID);

export default function ShareLinkPage() {
  const jsonLd = getJsonLd(TOOL_ID);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ShareLinkClient />
    </>
  );
}
