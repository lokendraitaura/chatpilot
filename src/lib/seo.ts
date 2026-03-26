import { Metadata } from 'next';

export const BASE_URL = 'https://chat-pilot.in';

export interface ToolSEO {
  title: string;
  description: string;
  keywords: string[];
}

export const TOOL_SEO_DATA: Record<string, ToolSEO> = {
  // --- CORE UTILITY TOOLS ---
  'link-generator': {
    title: 'Free WhatsApp Link Generator 2026 - Create Click to Chat wa.me Links | GoChatPilot',
    description: 'Instantly generate free WhatsApp click-to-chat links with custom pre-filled messages. Perfect for Instagram bio, Facebook ads, and business cards. Better alternative to create.wa.link with AI message support. Boost your business outreach with tracked WhatsApp links and professional messaging.',
    keywords: [
      'whatsapp link generator', 'free whatsapp link generator', 'create whatsapp click to chat link', 
      'wa.me link generator', 'whatsapp chat link maker', 'custom whatsapp message link', 
      'whatsapp direct link', 'whatsapp marketing link', 'generate wa.me link with message', 
      'free click to chat whatsapp', 'whatsapp link with prefilled message', 'gochatpilot whatsapp link generator',
      'whatsapp url generator', 'instant whatsapp chat link', 'business whatsapp link creator',
      'whatsapp link kaise banaye', 'whatsapp link for instagram bio', 'wa link generator india', 
      'whatsapp chat link without saving number', 'whatsapp link creator online', 'whatsapp link for facebook ads',
      'whatsapp marketing tools free', 'best whatsapp link generator'
    ],
  },
  'qr-code-generator': {
    title: 'Free WhatsApp QR Code Generator - Scan to Chat Instantly | GoChatPilot',
    description: 'Create high-quality, professional WhatsApp QR codes with custom messages. Perfect for business cards, flyers, shop stickers, and restaurant menus. Scan to chat instantly. Downloadable PNG and SVG formats for high-quality professional printing. Increase customer engagement with scannable chat starts.',
    keywords: [
      'whatsapp qr code generator', 'free whatsapp qr code generator', 'whatsapp business qr code', 
      'scan to chat qr code', 'generate whatsapp qr code', 'qr code for whatsapp', 
      'whatsapp qr code with message', 'download whatsapp qr code', 'business whatsapp qr code generator',
      'qr code whatsapp chat', 'whatsapp scan to message', 'free qr code maker whatsapp', 
      'gochatpilot whatsapp qr', 'whatsapp qr code for website', 'printable whatsapp qr code',
      'whatsapp scan to chat stickers', 'custom branded whatsapp qr code', 'whatsapp qr for shop',
      'qr code generator for whatsapp link', 'best free qr code generator'
    ],
  },
  'link-shortener': {
    title: 'WhatsApp Link Shortener - Short, Branded & Trackable Chat Links | GoChatPilot',
    description: 'Shorten long, messy WhatsApp links into clean, professional, and trackable short URLs. Boost click-through rates on social media, advertisements, and bios. Provide a better user experience with branded WhatsApp marketing link shorteners and custom aliases.',
    keywords: [
      'whatsapp link shortener', 'shorten whatsapp link', 'whatsapp short link', 'professional whatsapp url shortener',
      'trackable whatsapp link', 'short wa.me link', 'whatsapp marketing short link', 'custom short whatsapp link',
      'free whatsapp link shortener', 'short chat link generator', 'whatsapp url shortener free',
      'branded whatsapp short links', 'whatsapp link mask tool', 'safe whatsapp link shortener',
      'how to shorten whatsapp link name', 'whatsapp short url creator'
    ],
  },
  'button-generator': {
    title: 'Free WhatsApp Button Generator - Floating Chat Widget for Website | GoChatPilot',
    description: 'Create beautiful, highly customizable, and animated WhatsApp chat buttons for your website. Get a ready-to-paste HTML code snippet with floating widgets, custom colors, and personalized messages. No coding required for a professional website chat integration.',
    keywords: [
      'whatsapp button generator', 'whatsapp chat button for website', 'floating whatsapp button', 
      'whatsapp widget generator', 'add whatsapp button to website', 'free whatsapp chat button html',
      'whatsapp contact button', 'animated whatsapp button', 'whatsapp floating widget', 
      'website whatsapp button generator', 'html whatsapp chat button', 'whatsapp button code generator',
      'sticky whatsapp chat button', 'no code whatsapp widget', 'whatsapp contact floating icon',
      'best whatsapp button for wordpress', 'shopify whatsapp button generator'
    ],
  },

  // --- AI POWERED TOOLS ---
  'voice-to-message': {
    title: 'Voice to WhatsApp Message - AI Speech to Text Converter | GoChatPilot',
    description: 'Convert your voice notes into perfect, professional WhatsApp text messages using advanced AI. Refine spoken words into clear, error-free business messages instantly. The best AI transcriber for WhatsApp to save time and improve communication quality.',
    keywords: [
      'voice to whatsapp message', 'whatsapp speech to text', 'voice to text whatsapp', 'ai voice to whatsapp',
      'audio to whatsapp message converter', 'speech to whatsapp text', 'voice message to text whatsapp',
      'ai transcriber whatsapp', 'convert voice note to whatsapp message', 'ai speech recognition for chat',
      'whatsapp audio transcriber online', 'voice typing for whatsapp business', 'ai voice message processor'
    ],
  },
  'message-generator': {
    title: 'AI WhatsApp Message Generator - Professional Sales & Chat Scripts | GoChatPilot',
    description: 'Generate high-converting, professional WhatsApp messages for sales, customer support, and marketing using powerful AI technology. Get personalized chat scripts tailored to your specific business goals in seconds. Professional communication made easy.',
    keywords: [
      'ai whatsapp message generator', 'whatsapp ai message generator', 'ai whatsapp writer',
      'generate whatsapp messages ai', 'professional whatsapp message generator', 'ai chat script generator',
      'whatsapp sales message ai', 'free ai whatsapp message tool', 'gochatpilot ai message generator',
      'ai sales pitch generator for whatsapp', 'ai broadcast message writer', 'whatsapp copy generator',
      'best ai for whatsapp messages'
    ],
  },
  'marketing-copy': {
    title: 'AI WhatsApp Marketing Copy Generator - Viral Ad & Sales Scripts | GoChatPilot',
    description: 'Create high-converting WhatsApp marketing copies, promotional messages, and viral advertisement scripts with AI. Boost your sales conversion and engagement rates with persuasive, psychologically optimized content generated instantly.',
    keywords: [
      'whatsapp marketing copy ai', 'ai whatsapp ad script', 'whatsapp sales copy generator',
      'ai marketing copy whatsapp', 'viral whatsapp message generator', 'whatsapp promotional message ai',
      'whatsapp marketing script generator', 'cold outreach whatsapp templates ai', 'high conversion whatsapp ads',
      'whatsapp advertising copy tool', 'ai content creator for whatsapp marketing'
    ],
  },
  'language-converter': {
    title: 'WhatsApp Language Translator AI - Multilingual Chat Converter | GoChatPilot',
    description: 'Translate your WhatsApp messages into any language while maintaining a professional tone, context, and nuance. Perfect for global businesses, international customer support, and seamless cross-border communication with AI-powered accuracy.',
    keywords: [
      'whatsapp translator ai', 'translate whatsapp message', 'ai language converter whatsapp',
      'multilingual whatsapp tool', 'whatsapp message translator', 'global business whatsapp ai',
      'whatsapp message translator online', 'regional language whatsapp converter', 'accurate ai translator for chat'
    ],
  },
  'message-personalizer': {
    title: 'AI Message Personalizer for Bulk WhatsApp - Increase Response Rate | GoChatPilot',
    description: 'Personalize bulk WhatsApp messages for thousands of customers using AI. Automatically add names, order details, and personalized context. The best tool for high-engagement personalized WhatsApp marketing campaigns without manual effort.',
    keywords: [
      'ai personalize whatsapp messages', 'bulk whatsapp message personalizer', 'dynamic whatsapp messages ai',
      'personalized bulk whatsapp', 'whatsapp mass message customizer', 'ai bulk chat generator',
      'personalized whatsapp broadcasting', 'bulk whatsapp name personalization', 'ai whatsapp sender customization'
    ],
  },

  // --- ENGAGEMENT & CONTENT TOOLS ---
  'auto-reply': {
    title: 'WhatsApp Auto Reply Templates & Scripts - Professional Business Response | GoChatPilot',
    description: 'Access a library of 200+ professional, ready-to-use WhatsApp auto-reply templates. Customize your away messages, greeting replies, and professional support responses instantly to improve your business response time and customer satisfaction.',
    keywords: [
      'whatsapp auto reply', 'whatsapp auto reply templates', 'business whatsapp auto reply', 
      'whatsapp away message', 'whatsapp greeting message templates', 'auto reply scripts whatsapp',
      'customer support whatsapp templates', 'whatsapp business auto reply', 'free whatsapp reply templates',
      'whatsapp business welcome message', 'whatsapp automated response scripts', 'best auto reply messages'
    ],
  },
  'business-profile': {
    title: 'WhatsApp Business Profile Maker - AI Bio & About Section Generator | GoChatPilot',
    description: 'Generate professional, trust-building WhatsApp Business profile bios, descriptions, and attractive taglines using AI. Optimize your business presence and convert profile visitors into loyal customers with a compelling brand story.',
    keywords: [
      'whatsapp business bio generator', 'ai whatsapp business profile', 'whatsapp business about section',
      'professional whatsapp bio', 'whatsapp business description generator', 'ai business bio maker',
      'whatsapp profile maker', 'business whatsapp tagline generator', 'whatsapp bio for shop',
      'whatsapp business branding tool'
    ],
  },
  'message-formatter': {
    title: 'WhatsApp Message Formatter - Bold, Italic & Stylish Text Tool | GoChatPilot',
    description: 'Format your WhatsApp messages with bold, italic, strikethrough, and stylish custom fonts easily. Make your marketing broadcasts, product updates, and customer messages more attractive, readable, and professional to stand out.',
    keywords: [
      'whatsapp text formatter', 'whatsapp bold text', 'whatsapp italic text', 'whatsapp message styling',
      'format whatsapp message', 'whatsapp markdown formatter', 'whatsapp font style generator',
      'whatsapp text editor online', 'stylish whatsapp text', 'fancy whatsapp font', 'whatsapp text decorator'
    ],
  },
  'catalog-generator': {
    title: 'WhatsApp Catalog Maker - AI Product List & Catalog Generator | GoChatPilot',
    description: 'Create professional product catalogs and structured product lists for WhatsApp using AI. Showcase your products beautifully and share them instantly with customers to boost your sales and simplify the ordering process.',
    keywords: [
      'whatsapp catalog maker', 'whatsapp product catalog generator', 'ai whatsapp catalog',
      'whatsapp business catalog', 'product list for whatsapp', 'whatsapp sales catalog tool',
      'catalog message generator whatsapp', 'whatsapp store catalog builder', 'free whatsapp catalog tool'
    ],
  },
  'share-link': {
    title: 'WhatsApp Share Link Creator - Viral Marketing & Status Sharing | GoChatPilot',
    description: 'Create viral WhatsApp share links that allow users to share pre-filled messages with their contacts or status with a single click. Ideal for referral campaigns, contest entries, and exponential social growth.',
    keywords: [
      'whatsapp share link', 'viral whatsapp message link', 'click to share whatsapp', 
      'whatsapp referral link generator', 'whatsapp status share link', 'share message on whatsapp',
      'whatsapp growth tool', 'viral whatsapp campaign link', 'one click whatsapp share', 'whatsapp sharing widget'
    ],
  },
  'templates': {
    title: '200+ WhatsApp Message Templates - Sales, Support & Greetings | GoChatPilot',
    description: 'Browse a massive collection of 200+ free, ready-to-use WhatsApp templates for sales outreach, follow-ups, holiday greetings, and marketing. Simply copy, customize, and send instantly to engage your customers professionally.',
    keywords: [
      'whatsapp templates', 'whatsapp message templates', 'free whatsapp business templates',
      'whatsapp sales templates', 'customer support whatsapp templates', 'marketing templates whatsapp',
      'ready made whatsapp messages', 'whatsapp script templates', 'whatsapp holiday greetings',
      'best business whatsapp messages'
    ],
  },
  'status-caption': {
    title: 'AI WhatsApp Status Captions - Creative Story & Status Ideas | GoChatPilot',
    description: 'Get engaging, creative, and highly viral AI-generated captions for your WhatsApp status. Increase views and interaction on your business updates, personal stories, and promotional status updates with smart caption ideas.',
    keywords: [
      'whatsapp status caption ai', 'ai whatsapp status generator', 'creative whatsapp status ideas',
      'whatsapp story captions', 'ai status caption maker', 'engaging whatsapp captions',
      'whatsapp status for business promotion', 'story ideas for whatsapp marketing', 'viral status messages'
    ],
  },
  'cta-generator': {
    title: 'AI Call to Action Generator for WhatsApp - Sales Closing Scripts | GoChatPilot',
    description: 'Generate powerful, conversion-focused Call to Actions (CTAs) and closing lines for your WhatsApp messages. Turn casual conversations into successful sales with AI-optimized closing phrases and persuasive scripts.',
    keywords: [
      'whatsapp cta generator', 'ai call to action whatsapp', 'sales closing scripts whatsapp',
      'whatsapp cta phrases', 'ai sales closer whatsapp', 'conversion cta generator',
      'whatsapp sales closing lines', 'best cta for whatsapp marketing'
    ],
  },
  'message-improver': {
    title: 'AI WhatsApp Message Improver - Polish Tone & Grammar | GoChatPilot',
    description: 'Refine any WhatsApp message draft for better tone, clarity, professionalism, and impact using AI. Make every business chat count with perfectly polished communication that builds trust and gets results.',
    keywords: [
      'ai message improver whatsapp', 'refine whatsapp message ai', 'professional whatsapp text editor',
      'improve whatsapp message', 'whatsapp grammar fixer ai', 'ai whatsapp text polisher',
      'professional tone checker whatsapp', 'clear communication for whatsapp'
    ],
  },
  'emoji-suggester': {
    title: 'AI Emoji Suggester for WhatsApp - Contextual & Smart Emojis | GoChatPilot',
    description: 'Get intelligent, context-aware emoji suggestions for your WhatsApp messages. Make your chats more engaging, expressive, and human-like with perfect emoji placement generated by AI.',
    keywords: [
      'ai emoji suggester whatsapp', 'smart emoji for whatsapp', 'whatsapp emoji generator ai',
      'contextual emoji tool', 'emoji suggestions for messages', 'engaging whatsapp emojis',
      'best emojis for whatsapp marketing'
    ],
  },
  'customer-reply': {
    title: 'AI Customer Support Reply Generator for WhatsApp | GoChatPilot',
    description: 'Generate lightning-fast, empathetic, and highly professional replies to customer queries on WhatsApp. Perfect for support teams and solo entrepreneurs looking to improve response times and service quality with AI assistance.',
    keywords: [
      'ai customer support reply whatsapp', 'whatsapp support reply generator', 'ai helpdesk response whatsapp',
      'empathetic ai reply generator', 'customer service whatsapp ai', 'automated whatsapp replies ai',
      'fast support responses for whatsapp'
    ],
  }
};

export function getToolMetadata(id: string): Metadata {
  const data = TOOL_SEO_DATA[id];
  if (!data) return {};

  const toolPath = id.startsWith('ai') ? `tools/${id}` : `tools/${id}`;

  return {
    title: data.title,
    description: data.description,
    keywords: [
      ...(data.keywords || []),
      "gochatpilot", "chatpilot", "chat-pilot", "whatsapp ai tools", 
      "free whatsapp marketing tools", "whatsapp automation ai", 
      "best whatsapp link maker", "whatsapp qr generator free",
      "ai message writer for whatsapp", "whatsapp business growth tools",
      "click to chat generator", "whatsapp message templates free", 
      "GoChatPilot", "WhatsApp tools free", "free WhatsApp tools",
      "whatsapp link kaise banaye", "whatsapp business branding",
      "ai marketing assistant whatsapp", "whatsapp tool 2026"
    ],
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
