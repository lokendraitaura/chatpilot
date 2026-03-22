import { getToolMetadata, getJsonLd } from '@/lib/seo';
import MessageGeneratorClient from './MessageGeneratorClient';

export const metadata = getToolMetadata('message-generator');

export default function MessageGeneratorPage() {
  const jsonLd = getJsonLd('message-generator');
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MessageGeneratorClient />
    </>
  );
}
