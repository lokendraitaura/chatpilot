import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://chat-pilot.in'; // Replace with actual domain if known

  const routes = [
    '',
    '/tools/dashboard',
    '/tools/link-generator',
    '/tools/qr-code-generator',
    '/tools/qr-generator',
    '/tools/button-generator',
    '/tools/link-shortener',
    '/tools/auto-reply',
    '/tools/business-profile',
    '/tools/message-formatter',
    '/tools/voice-to-message',
    '/tools/catalog-generator',
    '/tools/share-link',
    '/tools/templates',
    '/ai/marketing-copy',
    '/ai/cta-generator',
    '/ai/message-personalizer',
    '/ai/language-converter',
    '/ai/message-generator',
    '/ai/message-improver',
    '/ai/emoji-suggester',
    '/ai/customer-reply',
    '/ai/status-caption',
    '/blog',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));
}
