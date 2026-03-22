import { getToolMetadata, getJsonLd } from '@/lib/seo';
import CustomerReplyClient from './CustomerReplyClient';

export const metadata = getToolMetadata('customer-reply');

export default function CustomerReplyPage() {
  const jsonLd = getJsonLd('customer-reply');
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CustomerReplyClient />
    </>
  );
}
