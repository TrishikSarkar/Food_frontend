const fs = require('fs');
const path = require('path');

function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      if (['node_modules', '.git', 'dist', 'build', 'public'].includes(entry.name)) continue;
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function syncTo(folderName) {
  const target = path.join(__dirname, folderName);
  console.log(`Syncing static output to ${folderName}/...`);
  copyDir(__dirname, target);
}

// Sync to dist (Vite), build (CRA), and public (Vercel Other)
syncTo('dist');
syncTo('build');
syncTo('public');
console.log('Build output ready for all Vercel presets!');
