const fs = require('fs');
const path = require('path');

const blogFile = path.join(__dirname, 'src', 'lib', 'blog-data.ts');
let content = fs.readFileSync(blogFile, 'utf-8');

// Exact mapping: blog post id -> actual image filename in /public/blog-images/
const imageMap = {
  'whatsapp-link-generator-guide': 'link-generator',
  'whatsapp-qr-code-guide': 'qr-generator',
  'whatsapp-button-maker-guide': 'button-generator',
  'link-shortener-guide': 'link-shortener',
  'message-formatter-guide': 'message-formatter',
  'share-link-guide': 'share-link',
  'catalog-generator-guide': 'catalog-generator',
  'voice-to-message-guide': 'voice-to-message',
  'templates-guide': 'templates',
  'auto-reply-guide': 'auto-reply',
  'business-profile-guide': 'business-profile',
  'ai-message-generator-guide': 'message-generator',
  'ai-message-improver-guide': 'message-improver',
  'ai-marketing-copy-guide': 'marketing-copy',
  'ai-cta-generator-guide': 'cta-generator',
  'ai-personalizer-guide': 'message-personalizer',
  'ai-language-converter-guide': 'language-converter',
  'ai-emoji-suggester-guide': 'emoji-suggester',
  'ai-customer-reply-guide': 'customer-reply',
  'ai-status-caption-guide': 'status-caption',
};

// For each blog post id, find the block that has that id and inject image field after iconName
for (const [blogId, imageFile] of Object.entries(imageMap)) {
  const searchPattern = new RegExp(`(id: '${blogId}'[\\s\\S]*?iconName: '[^']*',)`, 'g');
  content = content.replace(searchPattern, (match) => {
    // Only add image field if not already present
    if (match.includes('image:')) return match;
    return match + `\n    image: '/blog-images/${imageFile}.png',`;
  });
}

fs.writeFileSync(blogFile, content, 'utf-8');
console.log('Successfully injected image fields for all 20 blog posts!');
