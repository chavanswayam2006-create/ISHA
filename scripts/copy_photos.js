const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'WhatsApp Unknown 2026-07-31 at 9.31.06 PM');
const destDir = path.join(__dirname, '..', 'public', 'photos');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.jpeg'));
files.forEach((file, index) => {
  const srcPath = path.join(srcDir, file);
  const destPath = path.join(destDir, `photo${index + 1}.jpg`);
  fs.copyFileSync(srcPath, destPath);
  console.log(`Copied ${file} -> photo${index + 1}.jpg`);
});
console.log('All photos copied successfully!');
