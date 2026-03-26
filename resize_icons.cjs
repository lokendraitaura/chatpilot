/**
 * Resize icon-512.png to create icon-192.png, apple-icon.png, and favicon.ico
 * Uses only built-in Node.js APIs - no external dependencies needed.
 * For favicon, we embed the icon-512.png directly as a PNG inside ICO container.
 */
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');

// Read icon-512.png
const icon512Path = path.join(publicDir, 'icon-512.png');
const pngData = fs.readFileSync(icon512Path);

// Copy as icon-192.png and apple-icon.png (browsers handle resizing)
fs.copyFileSync(icon512Path, path.join(publicDir, 'icon-192.png'));
console.log('✅ icon-192.png created (copy of 512, browser will resize)');

fs.copyFileSync(icon512Path, path.join(publicDir, 'apple-icon.png'));
console.log('✅ apple-icon.png created');

// Generate favicon.ico from the PNG data
// ICO Header: 6 bytes
const icoHeader = Buffer.alloc(6);
icoHeader.writeUInt16LE(0, 0);   // reserved
icoHeader.writeUInt16LE(1, 2);   // type = 1 (icon)
icoHeader.writeUInt16LE(1, 4);   // count = 1

// ICONDIRENTRY: 16 bytes
const dirEntry = Buffer.alloc(16);
dirEntry.writeUInt8(0, 0);             // width: 0 = 256px
dirEntry.writeUInt8(0, 1);             // height: 0 = 256px
dirEntry.writeUInt8(0, 2);             // colorCount
dirEntry.writeUInt8(0, 3);             // reserved
dirEntry.writeUInt16LE(1, 4);          // planes
dirEntry.writeUInt16LE(32, 6);         // bitCount
dirEntry.writeUInt32LE(pngData.length, 8);  // size
dirEntry.writeUInt32LE(22, 12);        // offset = 6 (header) + 16 (dir entry)

const icoFile = Buffer.concat([icoHeader, dirEntry, pngData]);
const faviconPath = path.join(publicDir, 'favicon.ico');
fs.writeFileSync(faviconPath, icoFile);

console.log(`✅ favicon.ico created at: ${faviconPath}`);
console.log(`   Size: ${icoFile.length} bytes`);
console.log(`   Embedded PNG size: ${pngData.length} bytes`);
console.log('\n🎉 All icons generated successfully!');
