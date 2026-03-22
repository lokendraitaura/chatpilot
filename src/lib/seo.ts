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
    title: 'WhatsApp Link Generator - Create Instant Click-to-Chat Links',
    description: 'Create free WhatsApp click-to-chat links with custom messages. Perfect for business ads, social media, and customer support.',
    keywords: ['WhatsApp link generator', 'create WhatsApp link', 'WhatsApp chat link maker', 'free WhatsApp link tool'],
  },
  'qr-code-generator': {
    title: 'WhatsApp QR Code Generator - Scan to Chat for Free',
    description: 'Generate high-quality WhatsApp QR codes for your business. Let customers scan and start a conversation instantly.',
    keywords: ['WhatsApp QR code generator', 'business QR code', 'scan to chat', 'free QR code maker'],
  },
  'link-shortener': {
    title: 'WhatsApp Link Shortener - Short & Professional Chat Links',
    description: 'Shorten your long WhatsApp links into professional, trackable URLs. Improve your click-through rates on social media.',
    keywords: ['WhatsApp link shortener', 'short chat link', 'professional URL shortener', 'WhatsApp marketing link'],
  },
  'button-generator': {
    title: 'WhatsApp Button Generator - Chat Buttons for Your Website',
    description: 'Create beautiful, animated WhatsApp chat buttons for your website. Easy to install and customize for any brand.',
    keywords: ['WhatsApp button generator', 'chat button maker', 'website chat button', 'WhatsApp contact button'],
  },
  'voice-to-message': {
    title: 'Voice to WhatsApp Message - Speech-to-Text for Chat',
    description: 'Convert your voice into perfect WhatsApp messages instantly. Use AI to refine your spoken words into professional text.',
    keywords: ['voice to message', 'WhatsApp speech to text', 'audio to chat converter', 'AI voice transcriber'],
  },
  'auto-reply': {
    title: 'WhatsApp Auto-Reply Scripts - Fast Business Responses',
    description: 'Browse and customize high-converting WhatsApp auto-reply templates. Save time and improve customer service response times.',
    keywords: ['WhatsApp auto reply', 'business chat templates', 'automated response scripts', 'WhatsApp customer support'],
  },
  'business-profile': {
    title: 'WhatsApp Business Profile Maker - Professional Bio AI',
    description: 'Generate a professional WhatsApp Business bio and profile description using AI. Stand out to your customers.',
    keywords: ['WhatsApp business bio generator', 'AI profile maker', 'business bio creator', 'professional WhatsApp bio'],
  },
  'message-formatter': {
    title: 'WhatsApp Message Formatter - Bold, Italic & Styling',
    description: 'Format your WhatsApp messages with bold, italic, and strikethrough styles easily. Make your business broadcasts stand out.',
    keywords: ['WhatsApp text formatter', 'chat styling tool', 'bold text generator', 'WhatsApp font style'],
  },
  'catalog-generator': {
    title: 'WhatsApp Catalog Maker - Structured Product Lists AI',
    description: 'Create professional WhatsApp catalogs and product lists to share with your customers instantly. Boost your sales with structured messages.',
    keywords: ['WhatsApp catalog maker', 'product list generator', 'business catalog tool', 'WhatsApp sales catalog'],
  },
  'share-link': {
    title: 'WhatsApp Share Link Creator - Viral Growth Tool',
    description: 'Create viral WhatsApp share links that allow users to share pre-filled messages with their contacts or status in one click.',
    keywords: ['WhatsApp share link', 'viral message creator', 'click to share WhatsApp', 'WhatsApp growth tool'],
  },
  'templates': {
    title: 'WhatsApp Message Templates - Ready-to-Use Business Scripts',
    description: 'Access 200+ ready-to-use WhatsApp message templates for sales, support, and marketing. Copy and paste for instant business growth.',
    keywords: ['WhatsApp templates', 'business message scripts', 'marketing templates', 'support message scripts'],
  },
  
  // AI Tools
  'message-generator': {
    title: 'AI WhatsApp Message Generator - Professional Chat Scripts',
    description: 'Generate high-converting WhatsApp messages for sales, support, and marketing using advanced AI.',
    keywords: ['AI message generator', 'WhatsApp AI writer', 'chat script generator', 'AI sales message'],
  },
  'marketing-copy': {
    title: 'WhatsApp Marketing Copy AI - High-Converting Ad Scripts',
    description: 'Create viral WhatsApp marketing copy and advertisement scripts instantly. Boost your conversion rates with AI.',
    keywords: ['WhatsApp marketing copy', 'AI ad script generator', 'WhatsApp sales copy', 'marketing AI tool'],
  },
  'status-caption': {
    title: 'AI WhatsApp Status Captions - Creative & Engaging Stories',
    description: 'Get creative AI-generated captions for your WhatsApp status. Increase engagement on your business stories.',
    keywords: ['WhatsApp status caption AI', 'story captions', 'creative status ideas', 'AI caption maker'],
  },
  'cta-generator': {
    title: 'AI Call to Action (CTA) Generator - WhatsApp Sales Closer',
    description: 'Generate powerful CTAs for your WhatsApp messages. Turn chats into sales with AI-optimized closing scripts.',
    keywords: ['WhatsApp CTA generator', 'call to action AI', 'sales closing scripts', 'closing CTAs'],
  },
  'language-converter': {
    title: 'WhatsApp Language Converter - Global Chat Translator',
    description: 'Translate your WhatsApp messages into any language while maintaining professional tone and context with AI.',
    keywords: ['WhatsApp translator', 'chat language converter', 'global business chat', 'AI translator tool'],
  },
  'message-improver': {
    title: 'AI Message Improver - Professional Chat Polishing',
    description: 'Paste your draft and let AI polish your WhatsApp message for better tone, grammar, and professionalism.',
    keywords: ['refine WhatsApp message', 'AI text improver', 'professional chat editor', 'message polisher'],
  },
  'emoji-suggester': {
    title: 'AI Emoji Suggester - Smart Emojis for WhatsApp',
    description: 'Get context-aware emoji suggestions for your WhatsApp messages. Make your chats more expressive and engaging.',
    keywords: ['emoji suggester AI', 'smart emoji tool', 'WhatsApp emoji generator', 'chat engagement AI'],
  },
  'customer-reply': {
    title: 'AI Customer Support Reply - Fast & Empathetic Responses',
    description: 'Generate professional and empathetic customer support replies for WhatsApp instantly using AI.',
    keywords: ['AI customer support reply', 'support chat generator', 'empathetic AI response', 'helpdesk AI'],
  },
  'message-personalizer': {
    title: 'AI Message Personalizer - Dynamic Bulk Chat AI',
    description: 'Personalize your bulk WhatsApp messages for every customer. Increase response rates with AI personalization.',
    keywords: ['personalize WhatsApp messages', 'bulk chat AI', 'dynamic message generator', 'customer personalization'],
  }
};

export function getToolMetadata(id: string): Metadata {
  const data = TOOL_SEO_DATA[id];
  if (!data) return {};

  return {
    title: `${data.title} | GoChatPilot`,
    description: data.description,
    keywords: [...(data.keywords || []), 'GoChatPilot', 'WhatsApp tools'],
    alternates: {
      canonical: `${BASE_URL}/${id.includes('-') ? id : `tools/${id}`}`,
    },
    openGraph: {
      title: data.title,
      description: data.description,
      url: `${BASE_URL}/${id}`,
      type: 'website',
      images: [{ url: '/logo.svg' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: data.title,
      description: data.description,
      images: ['/logo.svg'],
    }
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
