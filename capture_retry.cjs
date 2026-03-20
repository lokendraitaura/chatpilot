const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const tools = [
  'templates', 'emoji-suggester', 'language-converter', 'message-personalizer'
];

async function capture() {
  const imagesDir = path.join(__dirname, 'public', 'blog-images');
  
  console.log('Launching browser for retry...');
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  for (const tool of tools) {
    console.log(`Capturing ${tool}...`);
    const isAi = ['language-converter', 'emoji-suggester', 'message-personalizer'].includes(tool);
    const url = `http://localhost:3000/${isAi ? 'ai' : 'tools'}/${tool}`;
    
    try {
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 120000 });
      await new Promise(r => setTimeout(r, 5000)); // wait 5 seconds just in case
      
      const screenshotPath = path.join(imagesDir, `${tool}.png`);
      await page.screenshot({ path: screenshotPath, type: 'png' });
      console.log(`Saved: ${screenshotPath}`);
    } catch (e) {
      console.error(`Failed to capture ${tool}:`, e.message);
    }
  }

  await browser.close();
  console.log('Retry capture complete.');
}

capture();
