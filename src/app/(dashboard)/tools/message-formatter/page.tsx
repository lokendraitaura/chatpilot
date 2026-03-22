import { getToolMetadata, getJsonLd } from '@/lib/seo';
import MessageFormatterClient from './MessageFormatterClient';

export const metadata = getToolMetadata('message-formatter');

export default function MessageFormatterPage() {
  const jsonLd = getJsonLd('message-formatter');
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MessageFormatterClient />
    </>
  );
}
