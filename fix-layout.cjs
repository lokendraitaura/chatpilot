const fs = require('fs');
const file = 'c:/Users/su_06/Downloads/ChatPilot Updated/src/app/layout.tsx';
let content = fs.readFileSync(file, 'utf8');

if (!content.includes('<Toaster')) {
  content = content.replace(
    '          <GoogleAnalytics gaId="G-YOUR-MEARSUREMENT-ID" />', 
    '          <Toaster position="bottom-right" theme="system" richColors />\n          <GoogleAnalytics gaId="G-YOUR-MEARSUREMENT-ID" />'
  );
  fs.writeFileSync(file, content);
  console.log('Injected Toaster successfully.');
} else {
  console.log('Toaster already present.');
}
