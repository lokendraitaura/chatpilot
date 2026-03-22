import { getToolMetadata, getJsonLd } from '@/lib/seo';
import QRGeneratorClient from './QRGeneratorClient';

export const metadata = getToolMetadata('qr-code-generator');

export default function QRGeneratorPage() {
  const jsonLd = getJsonLd('qr-code-generator');
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <QRGeneratorClient />
    </>
  );
}
