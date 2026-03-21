const fs = require('fs');
const path = require('path');
const dir = 'c:/Users/su_06/Downloads/ChatPilot Updated/src/app/(dashboard)/ai';

if (fs.existsSync(dir)) {
  const tools = fs.readdirSync(dir).filter(f => fs.statSync(path.join(dir, f)).isDirectory());
  for (const tool of tools) {
    const file = path.join(dir, tool, 'page.tsx');
    if (fs.existsSync(file)) {
      let content = fs.readFileSync(file, 'utf8');
      
      let changed = false;

      if (!content.includes("'sonner'")) {
        content = "import { toast } from 'sonner';\n" + content;
        changed = true;
      }
      
      const regexSuccess = /if\s*\(\s*data\.success\s*\)\s*\{([\s\S]*?)\}\s*\}\s*catch/g;
      if (regexSuccess.test(content)) {
        content = content.replace(regexSuccess, "if (data.success) {$1} else { toast.error(data.error || 'Generation failed. Please try again or wait a minute.'); } } catch");
        changed = true;
      }

      const regexCatch = /catch\s*\((.*?)\)\s*\{[\s\S]*?console\.error[\s\S]*?\}/g;
      if (regexCatch.test(content)) {
        content = content.replace(regexCatch, "catch ($1) { console.error('Generation Error:', $1); toast.error('Experiencing high network load or rate limits. Please wait a moment.'); }");
        changed = true;
      }
      
      if (changed) {
        fs.writeFileSync(file, content);
      }
    }
  }
}
console.log('Patched errors successfully');
