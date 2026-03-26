const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const logoSvg = fs.readFileSync(path.join(__dirname, 'public', 'logo.svg'), 'utf8');

async function generateIcons() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  const sizes = [192, 512];
  
  for (const size of sizes) {
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { margin: 0; padding: 0; background: transparent; overflow: hidden; }
          #container { width: ${size}px; height: ${size}px; display: flex; align-items: center; justify-content: center; background: transparent; }
          svg { width: 100%; height: 100%; }
        </style>
      </head>
      <body>
        <div id="container">${logoSvg}</div>
      </body>
      </html>
    `;
    
    await page.setContent(html);
    const fileName = `icon-${size}.png`;
    const filePath = path.join(__dirname, 'public', fileName);
    
    await page.setViewport({ width: size, height: size, deviceScaleFactor: 2 });
    const container = await page.$('#container');
    await container.screenshot({ 
      path: filePath, 
      omitBackground: true,
      type: 'png'
    });
    
    console.log(`✅ Generated ${fileName} (${size}x${size})`);
  }

  // Also generate apple-icon.png (180x180)
  const appleSize = 180;
  const appleHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { margin: 0; padding: 0; background: white; overflow: hidden; }
        #container { width: ${appleSize}px; height: ${appleSize}px; display: flex; align-items: center; justify-content: center; }
        svg { width: 80%; height: 80%; }
      </style>
    </head>
    <body>
      <div id="container">${logoSvg}</div>
    </body>
    </html>
  `;
  await page.setContent(appleHtml);
  await page.setViewport({ width: appleSize, height: appleSize });
  const appleContainer = await page.$('#container');
  await appleContainer.screenshot({ path: path.join(__dirname, 'public', 'apple-icon.png') });
  console.log('✅ Generated apple-icon.png (180x180)');

  await browser.close();
}

generateIcons().catch(console.error);
