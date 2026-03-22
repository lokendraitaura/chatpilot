import { getToolMetadata, getJsonLd } from '@/lib/seo';
import EmojiSuggesterClient from './EmojiSuggesterClient';

export const metadata = getToolMetadata('emoji-suggester');

export default function EmojiSuggesterPage() {
  const jsonLd = getJsonLd('emoji-suggester');
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <EmojiSuggesterClient />
    </>
  );
}
