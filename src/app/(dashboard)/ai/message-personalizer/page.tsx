import { getToolMetadata, getJsonLd } from '@/lib/seo';
import MessagePersonalizerClient from './MessagePersonalizerClient';

export const metadata = getToolMetadata('message-personalizer');

export default function MessagePersonalizerPage() {
  const jsonLd = getJsonLd('message-personalizer');
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MessagePersonalizerClient />
    </>
  );
}
