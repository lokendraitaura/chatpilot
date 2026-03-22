import CatalogGeneratorClient from './CatalogGeneratorClient';
import { getToolMetadata, getJsonLd } from '@/lib/seo';
import { Metadata } from 'next';

const TOOL_ID = 'catalog-generator';

export const metadata: Metadata = getToolMetadata(TOOL_ID);

export default function CatalogGeneratorPage() {
  const jsonLd = getJsonLd(TOOL_ID);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CatalogGeneratorClient />
    </>
  );
}
