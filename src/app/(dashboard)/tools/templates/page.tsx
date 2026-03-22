import TemplatesClient from './TemplatesClient';
import { getToolMetadata, getJsonLd } from '@/lib/seo';
import { Metadata } from 'next';

const TOOL_ID = 'templates';

export const metadata: Metadata = getToolMetadata(TOOL_ID);

export default function TemplatesPage() {
  const jsonLd = getJsonLd(TOOL_ID);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TemplatesClient />
    </>
  );
}
