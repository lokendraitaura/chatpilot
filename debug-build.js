const { execSync } = require('child_process');
const fs = require('fs');
try {
  const out = execSync('npx next build', { stdio: 'pipe' });
  fs.writeFileSync('full_build.log', out.toString());
  console.log('Build succeeded.');
} catch (e) {
  let log = (e.stdout ? e.stdout.toString() : '') + '\n\n=== STDERR ===\n\n' + (e.stderr ? e.stderr.toString() : '');
  fs.writeFileSync('full_build.log', log);
  console.log('Build failed. Dumped to full_build.log');
}
