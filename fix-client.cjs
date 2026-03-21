const fs = require('fs');
const path = require('path');
const dir = 'c:/Users/su_06/Downloads/ChatPilot Updated/src/app/(dashboard)/ai';
const tools = fs.readdirSync(dir).filter(f => fs.statSync(path.join(dir, f)).isDirectory());

for (const t of tools) {
  const file = path.join(dir, t, 'page.tsx');
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    if (content.startsWith("import { toast } from 'sonner';\n'use client';")) {
       content = content.replace("import { toast } from 'sonner';\n'use client';", "'use client';\nimport { toast } from 'sonner';");
       fs.writeFileSync(file, content);
    }
    else if (content.startsWith("import { toast } from 'sonner';\r\n'use client';")) {
       content = content.replace("import { toast } from 'sonner';\r\n'use client';", "'use client';\r\nimport { toast } from 'sonner';");
       fs.writeFileSync(file, content);
    }
  }
}
console.log('Fixed use client positions');
