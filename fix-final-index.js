const fs = require('fs');
let html = fs.readFileSync('C:/Users/ansh9/Downloads/Rivaaz-Website/index.html', 'utf8');

// Find where to inject the apple-touch-icon
if (!html.includes('https://dummyimage.com/192x192/D4AF37/000000.png')) {
  // Replace the old bad PWA Builder link with the new safe dummy image link
  html = html.replace(
    '<link rel="apple-touch-icon" href="https://raw.githubusercontent.com/pwa-builder/pwabuilder-web/main/assets/icons/icon_192.png">',
    '<link rel="apple-touch-icon" href="https://dummyimage.com/192x192/D4AF37/000000.png">'
  );
  
  // Just in case the old one isn't there exactly as written, replace anything looking like it
  if (html.includes('raw.githubusercontent.com')) {
      html = html.replace(/<link rel=\"apple-touch-icon\" href=\"[^\"]+\">/, '<link rel=\"apple-touch-icon\" href=\"https://dummyimage.com/192x192/D4AF37/000000.png\">');
  }

  fs.writeFileSync('C:/Users/ansh9/Downloads/Rivaaz-Website/index.html', html);
  console.log('Fixed index.html locally');
} else {
  console.log('index.html already has the correct icon');
}
