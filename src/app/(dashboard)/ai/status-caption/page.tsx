import { getToolMetadata, getJsonLd } from '@/lib/seo';
import StatusCaptionClient from './StatusCaptionClient';

export const metadata = getToolMetadata('status-caption');

export default function StatusCaptionPage() {
  const jsonLd = getJsonLd('status-caption');
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <StatusCaptionClient />
    </>
  );
}
