const puppeteer = require('puppeteer');
const path = require('path');

// Only recapture the ones that are too small (likely broken) or missing
const tools = [
  { slug: 'cta-generator', path: '/ai/cta-generator', file: 'cta-generator' },
  { slug: 'customer-reply', path: '/ai/customer-reply', file: 'customer-reply' },
  { slug: 'status-caption', path: '/ai/status-caption', file: 'status-caption' },
];

async function capture() {
  const imagesDir = path.join(__dirname, 'public', 'blog-images');
  console.log('Launching browser...');
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 900 });

  for (const tool of tools) {
    const url = `http://localhost:3000${tool.path}`;
    console.log(`Capturing ${tool.slug} from ${url}...`);
    try {
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 120000 });
      await new Promise(r => setTimeout(r, 4000));
      const screenshotPath = path.join(imagesDir, `${tool.file}.png`);
      await page.screenshot({ path: screenshotPath, type: 'png', fullPage: false });
      const stats = require('fs').statSync(screenshotPath);
      console.log(`Saved: ${screenshotPath} (${Math.round(stats.size/1024)}KB)`);
    } catch (e) {
      console.error(`Failed: ${tool.slug}`, e.message);
    }
  }

  await browser.close();
  console.log('Done!');
}

capture();
