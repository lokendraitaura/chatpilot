const fs = require('fs');
const path = require('path');

const p = path.join(__dirname, 'src', 'lib', 'blog-data.ts');
let content = fs.readFileSync(p, 'utf-8');

// The original expand_blogs script added a Video Tutorial section. 
// We should first strip it out completely, or just replace the entire `content` with a clean version.
// To make it fully clean and robust, we will replace the `content` and `videoUrl` using regex.

// 1. Remove videoUrl property entirely
content = content.replace(/videoUrl:\s*'.*?',?\n/g, '');

// 2. Replace the old content strings completely and rewrite them to include the image and text based tutorial
// Because `content: \`...\`` can span multiple lines, we capture the ID to know which tool this is
const regex = /id:\s*'([^']+)',([\s\S]*?)title:\s*'([^']+)',([\s\S]*?)excerpt:\s*'([^']+)',([\s\S]*?)content:\s*`([\s\S]*?)`([,\n])/g;

let replaced = content.replace(regex, (match, id, space1, title, space2, excerpt, space3, oldContent, trailingComma) => {
  // Extract just the introduction part of the old content, stripping out old video/tutorial tags if any
  let plainIntro = oldContent.replace(/<h3>Video Tutorial Breakdown<\/h3>[\s\S]*$/, '').trim();

  const newContent = `
${plainIntro}

<img src="/blog-images/${id.replace('-guide', '')}.png" class="w-full rounded-2xl border border-border shadow-lg my-8" alt="${title} Interface Screenshot" />

<h3>Step-by-Step Guide</h3>
<p>Using the <strong>${title}</strong> is incredibly straightforward. Follow these steps to get the most out of this feature:</p>
<ol>
  <li><strong>Access the Tool:</strong> Open the tool from your dashboard sidebar. The interface is clean and focused, as shown in the screenshot above.</li>
  <li><strong>Input Information:</strong> Start by entering the required details into the input fields appropriately (such as phone numbers, prompt text, or URLs).</li>
  <li><strong>Customize the Options:</strong> Adjust any advanced settings. For AI tools, you can choose specific tones and languages. For generators, you can customize styles and colors.</li>
  <li><strong>Review & Generate:</strong> Click the primary "Generate" button. The results will immediately appear on your screen.</li>
  <li><strong>Copy & Deploy:</strong> Review the final output or preview, and click the "Copy" or "Download" button to use it instantly in your campaigns!</li>
</ol>
<p>If you face any issues, our AI configurations ensure you always get optimized, high-converting results every time.</p>
`.trim();

  return `id: '${id}',${space1}title: '${title}',${space2}excerpt: '${excerpt}',${space3}content: \`${newContent}\`${trailingComma}`;
});

fs.writeFileSync(p, replaced);
console.log('Successfully expanded all blog posts with local images and text guides.');
