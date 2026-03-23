import { Metadata } from 'next';

export const BASE_URL = 'https://chat-pilot.in';

export interface ToolSEO {
  title: string;
  description: string;
  keywords: string[];
}

export const TOOL_SEO_DATA: Record<string, ToolSEO> = {
  // Tools
  'link-generator': {
    title: 'WhatsApp Link Generator Free - Create Click to Chat Links | GoChatPilot',
    description: 'Create free WhatsApp click-to-chat links with custom messages. Perfect for business ads, social media, and customer support. No app required.',
    keywords: ['WhatsApp link generator', 'create WhatsApp link', 'WhatsApp chat link maker', 'free WhatsApp link tool', 'click to chat link', 'WhatsApp direct link generator', 'WhatsApp URL generator'],
  },
  'qr-code-generator': {
    title: 'WhatsApp QR Code Generator Free - Scan to Chat | GoChatPilot',
    description: 'Generate high-quality WhatsApp QR codes for your business. Let customers scan and start a conversation instantly. Free forever.',
    keywords: ['WhatsApp QR code generator', 'business QR code WhatsApp', 'scan to chat', 'free QR code maker', 'WhatsApp QR scanner', 'QR code for WhatsApp business', 'downloadable QR code'],
  },
  'link-shortener': {
    title: 'WhatsApp Link Shortener - Short & Professional Chat Links | GoChatPilot',
    description: 'Shorten your long WhatsApp links into professional, trackable URLs. Improve your click-through rates on social media and ads.',
    keywords: ['WhatsApp link shortener', 'short chat link', 'professional URL shortener', 'WhatsApp marketing link', 'shorten WhatsApp URL', 'track WhatsApp clicks', 'custom short link'],
  },
  'button-generator': {
    title: 'WhatsApp Button Generator - Chat Buttons for Your Website | GoChatPilot',
    description: 'Create beautiful, animated WhatsApp chat buttons for your website. Easy to install and customize for any brand. Free HTML snippet.',
    keywords: ['WhatsApp button generator', 'chat button maker', 'website chat button', 'WhatsApp contact button', 'floating WhatsApp button', 'WhatsApp widget generator', 'HTML WhatsApp button'],
  },
  'voice-to-message': {
    title: 'Voice to WhatsApp Message - AI Speech to Text Converter | GoChatPilot',
    description: 'Convert your voice into perfect WhatsApp messages instantly. Use AI to refine your spoken words into professional text for business chats.',
    keywords: ['voice to message WhatsApp', 'WhatsApp speech to text', 'audio to chat converter', 'AI voice transcriber', 'voice message converter', 'WhatsApp voice text', 'speech to WhatsApp message'],
  },
  'auto-reply': {
    title: 'WhatsApp Auto-Reply Scripts - Fast Business Response Templates | GoChatPilot',
    description: 'Browse and customize high-converting WhatsApp auto-reply templates. Save time and improve customer service response times with ready scripts.',
    keywords: ['WhatsApp auto reply', 'business chat templates', 'automated response scripts', 'WhatsApp customer support', 'WhatsApp template messages', 'away message WhatsApp', 'business auto-reply scripts'],
  },
  'business-profile': {
    title: 'WhatsApp Business Profile Maker - AI Bio Generator | GoChatPilot',
    description: 'Generate a professional WhatsApp Business bio and profile description using AI. Stand out to your customers with the perfect business profile.',
    keywords: ['WhatsApp business bio generator', 'AI profile maker', 'business bio creator', 'professional WhatsApp bio', 'WhatsApp business description', 'AI business tagline', 'business profile AI'],
  },
  'message-formatter': {
    title: 'WhatsApp Message Formatter - Bold Italic & Text Styling Tool | GoChatPilot',
    description: 'Format your WhatsApp messages with bold, italic, strikethrough and monospace styles easily. Make your business broadcasts stand out.',
    keywords: ['WhatsApp text formatter', 'chat styling tool', 'bold text generator', 'WhatsApp font style', 'italic WhatsApp text', 'WhatsApp markdown formatter', 'WhatsApp text editor'],
  },
  'catalog-generator': {
    title: 'WhatsApp Catalog Maker - AI Product List Generator | GoChatPilot',
    description: 'Create professional WhatsApp catalogs and product lists to share with your customers instantly. Boost your sales with structured AI messages.',
    keywords: ['WhatsApp catalog maker', 'product list generator', 'business catalog tool', 'WhatsApp sales catalog', 'catalog message generator', 'product showcase WhatsApp', 'AI catalog creator'],
  },
  'share-link': {
    title: 'WhatsApp Share Link Creator - Viral Growth Tool | GoChatPilot',
    description: 'Create viral WhatsApp share links that allow users to share pre-filled messages with their contacts or status in one click. Perfect for campaigns.',
    keywords: ['WhatsApp share link', 'viral message creator', 'click to share WhatsApp', 'WhatsApp growth tool', 'WhatsApp referral link', 'share button WhatsApp', 'social share WhatsApp'],
  },
  'templates': {
    title: 'WhatsApp Message Templates - 200+ Ready-to-Use Business Scripts | GoChatPilot',
    description: 'Access 200+ ready-to-use WhatsApp message templates for sales, support, and marketing. Copy and paste for instant business growth.',
    keywords: ['WhatsApp templates', 'business message scripts', 'marketing templates', 'support message scripts', 'WhatsApp sales scripts', 'ready-made WhatsApp messages', 'free WhatsApp templates'],
  },
  
  // AI Tools
  'message-generator': {
    title: 'AI WhatsApp Message Generator - Professional Chat Scripts | GoChatPilot',
    description: 'Generate high-converting WhatsApp messages for sales, support, and marketing using advanced AI. Perfect for businesses and marketers.',
    keywords: ['AI message generator', 'WhatsApp AI writer', 'chat script generator', 'AI sales message', 'AI WhatsApp generator', 'business message AI', 'generate WhatsApp messages'],
  },
  'marketing-copy': {
    title: 'WhatsApp Marketing Copy AI - High-Converting Ad Scripts | GoChatPilot',
    description: 'Create viral WhatsApp marketing copy and advertisement scripts instantly with AI. Boost your conversion rates with GoChatPilot.',
    keywords: ['WhatsApp marketing copy', 'AI ad script generator', 'WhatsApp sales copy', 'marketing AI tool', 'AI copywriter WhatsApp', 'viral WhatsApp message', 'sales script generator'],
  },
  'status-caption': {
    title: 'AI WhatsApp Status Captions - Creative & Engaging Story Ideas | GoChatPilot',
    description: 'Get creative AI-generated captions for your WhatsApp status. Increase engagement on your business stories with smart captions.',
    keywords: ['WhatsApp status caption AI', 'story captions generator', 'creative status ideas', 'AI caption maker', 'WhatsApp story ideas', 'status message generator', 'business status captions'],
  },
  'cta-generator': {
    title: 'AI Call to Action Generator - WhatsApp Sales Closer | GoChatPilot',
    description: 'Generate powerful CTAs for your WhatsApp messages. Turn chats into sales with AI-optimized closing scripts and call-to-action phrases.',
    keywords: ['WhatsApp CTA generator', 'call to action AI', 'sales closing scripts', 'closing CTAs', 'WhatsApp sales closer', 'CTA message generator', 'conversion scripts WhatsApp'],
  },
  'language-converter': {
    title: 'WhatsApp Language Converter - Global Chat Translator AI | GoChatPilot',
    description: 'Translate your WhatsApp messages into any language while maintaining professional tone and context with AI. Ideal for global businesses.',
    keywords: ['WhatsApp translator', 'chat language converter', 'global business chat', 'AI translator tool', 'translate WhatsApp messages', 'multilingual WhatsApp AI', 'message language changer'],
  },
  'message-improver': {
    title: 'AI Message Improver - Professional WhatsApp Chat Polish Tool | GoChatPilot',
    description: 'Paste your draft and let AI polish your WhatsApp message for better tone, grammar, and professionalism. Instant message refinement.',
    keywords: ['refine WhatsApp message', 'AI text improver', 'professional chat editor', 'message polisher', 'WhatsApp grammar fixer', 'improve chat tone', 'AI message editor'],
  },
  'emoji-suggester': {
    title: 'AI Emoji Suggester - Smart Emojis for WhatsApp Messages | GoChatPilot',
    description: 'Get context-aware emoji suggestions for your WhatsApp messages. Make your chats more expressive, engaging and professional.',
    keywords: ['emoji suggester AI', 'smart emoji tool', 'WhatsApp emoji generator', 'chat engagement AI', 'emoji picker AI', 'suggest emojis for message', 'WhatsApp emoji tool'],
  },
  'customer-reply': {
    title: 'AI Customer Support Reply Generator - Fast WhatsApp Responses | GoChatPilot',
    description: 'Generate professional and empathetic customer support replies for WhatsApp instantly using AI. Perfect for helpdesk and support teams.',
    keywords: ['AI customer support reply', 'support chat generator', 'empathetic AI response', 'helpdesk AI', 'WhatsApp support scripts', 'customer reply generator', 'automated support replies'],
  },
  'message-personalizer': {
    title: 'AI Message Personalizer - Dynamic Bulk WhatsApp Chat AI | GoChatPilot',
    description: 'Personalize your bulk WhatsApp messages for every customer using AI. Increase response rates with dynamic, personalized messages.',
    keywords: ['personalize WhatsApp messages', 'bulk chat AI', 'dynamic message generator', 'customer personalization', 'mass WhatsApp message tool', 'personalized bulk messages', 'AI message customizer'],
  }
};

export function getToolMetadata(id: string): Metadata {
  const data = TOOL_SEO_DATA[id];
  if (!data) return {};

  const toolPath = id.startsWith('ai') ? `tools/${id}` : `tools/${id}`;

  return {
    title: data.title,
    description: data.description,
    keywords: [...(data.keywords || []), 'GoChatPilot', 'WhatsApp tools free', 'free WhatsApp tools'],
    authors: [{ name: "GoChatPilot Team", url: BASE_URL }],
    alternates: {
      canonical: `${BASE_URL}/tools/${id}`,
    },
    openGraph: {
      title: data.title,
      description: data.description,
      url: `${BASE_URL}/tools/${id}`,
      siteName: 'GoChatPilot',
      type: 'website',
      images: [{ url: '/icon-512.png', width: 512, height: 512, alt: data.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: data.title,
      description: data.description,
      images: ['/icon-512.png'],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function getJsonLd(id: string) {
  const data = TOOL_SEO_DATA[id];
  if (!data) return null;

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": data.title,
    "description": data.description,
    "applicationCategory": "BusinessApplication, MultimediaApplication",
    "operatingSystem": "All",
    "url": `${BASE_URL}/${id}`,
    "author": {
      "@type": "Organization",
      "name": "GoChatPilot"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };
}
