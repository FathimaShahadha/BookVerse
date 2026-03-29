const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let originalContent = content;

      if (file === 'mockData.ts') {
        content = content.replace(/price:\s*([\d.]+)/g, (m, p1) => `price: ${parseFloat(p1)*300}`);
        content = content.replace(/originalPrice:\s*([\d.]+)/g, (m, p1) => `originalPrice: ${parseFloat(p1)*300}`);
        content = content.replace(/total:\s*([\d.]+)/g, (m, p1) => `total: ${parseFloat(p1)*300}`);
        content = content.replace(/totalSpent:\s*([\d.]+)/g, (m, p1) => `totalSpent: ${parseFloat(p1)*300}`);
        content = content.replace(/discount:\s*([\d.]+)/g, (m, p1) => `discount: ${parseFloat(p1)}`); // leave discount %
      }

      // Address
      content = content.replace(/123 Bookworm Lane/g, '45/1 Galle Road');
      content = content.replace(/Literary City, NY 10001/g, 'Colombo 03, Sri Lanka');
      
      // JSX Text boundaries replacing $ with Rs.
      // Match >$ or > $
      content = content.replace(/>\s*\$/g, (m) => m.replace('$', 'Rs. '));
      // Match "$
      content = content.replace(/"\$/g, '"Rs. ');
      // Match ($
      content = content.replace(/\(\s*\$/g, (m) => m.replace('$', 'Rs. '));
      // Match a number after $ e.g. $14.99 -> Rs. 14.99
      content = content.replace(/\$([0-9]+(?:.[0-9]+)?)/g, 'Rs. $1');

      if (originalContent !== content) {
        fs.writeFileSync(fullPath, content);
        console.log('Updated ' + file);
      }
    }
  }
}
processDir('./src');
