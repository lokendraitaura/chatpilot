import { getToolMetadata, getJsonLd } from '@/lib/seo';
import VoiceToMessageClient from './VoiceToMessageClient';

export const metadata = getToolMetadata('voice-to-message');

export default function VoiceToMessagePage() {
  const jsonLd = getJsonLd('voice-to-message');
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <VoiceToMessageClient />
    </>
  );
}
