import { getToolMetadata, getJsonLd } from '@/lib/seo';
import ButtonGeneratorClient from './ButtonGeneratorClient';

export const metadata = getToolMetadata('button-generator');

export default function ButtonGeneratorPage() {
  const jsonLd = getJsonLd('button-generator');
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ButtonGeneratorClient />
    </>
  );
}
