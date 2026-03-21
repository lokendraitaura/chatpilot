const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    if (fs.statSync(dirPath).isDirectory()) {
      walk(dirPath, callback);
    } else {
      callback(path.join(dir, f));
    }
  });
}

function capitalize(s) {
  return s.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

walk('c:/Users/su_06/Downloads/ChatPilot Updated/src/app/(dashboard)', (filepath) => {
  if (path.basename(filepath) === 'page.tsx') {
    let content = fs.readFileSync(filepath, 'utf8');
    if (!content.includes('export const metadata') && !content.includes('export function generateMetadata')) {
      const folderName = path.basename(path.dirname(filepath));
      if (folderName && folderName !== '(dashboard)' && folderName !== 'tools' && folderName !== 'ai') {
         const titleName = capitalize(folderName);
         
         const meta = `import { Metadata } from 'next';\n\nexport const metadata: Metadata = {\n  title: '${titleName} | ChatPilot',\n  description: 'Use the ${titleName} tool to supercharge your WhatsApp marketing on ChatPilot.',\n  alternates: { canonical: 'https://chatpilot.in/tools/${folderName}' }\n};\n\n`;
         
         // Insert after imports
         const lines = content.split('\n');
         let lastImportIndex = -1;
         for (let i=0; i < lines.length; i++) {
            if (lines[i].startsWith('import ') || lines[i].startsWith('"use client"') || lines[i].startsWith("'use client'")) {
                lastImportIndex = i;
            }
         }
         
         lines.splice(lastImportIndex + 1, 0, '\n' + meta);
         fs.writeFileSync(filepath, lines.join('\n'));
         console.log('Added metadata to', filepath);
      }
    }
  }
});
