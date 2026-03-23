/**
 * Generates a minimal favicon.ico from icon-192.png using raw ICO format.
 * ICO format: header + directory entry + image data (as BMP or PNG).
 * Modern browsers and Next.js support PNG-embedded ICOs.
 */
const fs = require('fs');
const path = require('path');

const inputPng = path.join(__dirname, 'public', 'icon-192.png');
const outputIco = path.join(__dirname, 'public', 'favicon.ico');

// Read the PNG file
const pngData = fs.readFileSync(inputPng);

// ICO Header: 6 bytes
// ICONDIR structure:
//   2 bytes reserved (0)
//   2 bytes type (1 = icon)
//   2 bytes count (1 image)
const icoHeader = Buffer.alloc(6);
icoHeader.writeUInt16LE(0, 0);   // reserved
icoHeader.writeUInt16LE(1, 2);   // type = 1 (icon)
icoHeader.writeUInt16LE(1, 4);   // count = 1

// ICONDIRENTRY: 16 bytes per image
// width (1 byte, 0 = 256)
// height (1 byte, 0 = 256)
// colorCount (1 byte, 0 = no palette)
// reserved (1 byte, 0)
// planes (2 bytes, 1)
// bitCount (2 bytes, 32)
// bytesInRes (4 bytes) = size of PNG
// imageOffset (4 bytes) = 6 + 16 = 22
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
fs.writeFileSync(outputIco, icoFile);

console.log(`✅ favicon.ico created at: ${outputIco}`);
console.log(`   Size: ${icoFile.length} bytes`);
console.log(`   Embedded PNG size: ${pngData.length} bytes`);
