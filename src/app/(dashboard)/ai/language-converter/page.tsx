import { getToolMetadata, getJsonLd } from '@/lib/seo';
import LanguageConverterClient from './LanguageConverterClient';

export const metadata = getToolMetadata('language-converter');

export default function LanguageConverterPage() {
  const jsonLd = getJsonLd('language-converter');
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LanguageConverterClient />
    </>
  );
}
