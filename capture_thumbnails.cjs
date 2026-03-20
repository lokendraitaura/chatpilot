const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const tools = [
  'link-generator', 'qr-generator', 'button-generator', 'link-shortener', 'message-formatter', 'share-link',
  'catalog-generator', 'voice-to-message', 'templates', 'auto-reply', 'business-profile',
  'message-generator', 'message-improver', 'marketing-copy', 'cta-generator', 'message-personalizer', 
  'language-converter', 'emoji-suggester', 'customer-reply', 'status-caption'
];

async function capture() {
  const imagesDir = path.join(__dirname, 'public', 'blog-images');
  if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir, { recursive: true });

  console.log('Launching browser...');
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  for (const tool of tools) {
    console.log(`Capturing ${tool}...`);
    const isAi = ['message-generator', 'message-improver', 'marketing-copy', 'cta-generator', 'message-personalizer', 'language-converter', 'emoji-suggester', 'customer-reply', 'status-caption'].includes(tool);
    const url = `http://localhost:3000/${isAi ? 'ai' : 'tools'}/${tool}`;
    
    try {
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
      // Small delay just to let animations settle
      await new Promise(r => setTimeout(r, 1000));
      
      const screenshotPath = path.join(imagesDir, `${tool}.png`);
      await page.screenshot({ path: screenshotPath, type: 'png' });
      console.log(`Saved: ${screenshotPath}`);
    } catch (e) {
      console.error(`Failed to capture ${tool}:`, e.message);
    }
  }

  await browser.close();
  console.log('All screenshots captured successfully!');
}

capture();
