const fs = require('fs');
const path = require('path');
const tools = ['qr-generator', 'link-generator', 'button-generator'];
for (const tool of tools) {
  const p = path.join('c:/Users/su_06/Downloads/ChatPilot Updated/src/app/(dashboard)/tools', tool, 'page.tsx');
  if (fs.existsSync(p)) {
    let content = fs.readFileSync(p, 'utf8');
    content = content.replace(/\{selectedCountry\.flag\}/g, '<img src={`https://flagcdn.com/w20/${selectedCountry.iso}.png`} alt={selectedCountry.name} className="w-5 h-auto inline-block rounded-sm" />');
    content = content.replace(/\{country\.flag\}/g, '<img src={`https://flagcdn.com/w20/${country.iso}.png`} alt={country.name} className="w-5 h-auto inline-block rounded-sm" />');
    fs.writeFileSync(p, content);
  }
}
console.log('Replaced emoji flags in tools');
