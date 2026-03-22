import { getToolMetadata, getJsonLd } from '@/lib/seo';
import BusinessProfileClient from './BusinessProfileClient';

export const metadata = getToolMetadata('business-profile');

export default function BusinessProfilePage() {
  const jsonLd = getJsonLd('business-profile');
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BusinessProfileClient />
    </>
  );
}
