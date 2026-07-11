const fs = require('fs');
const file = 'C:/Users/ansh9/Downloads/Rivaaz-Website/index.html';
let html = fs.readFileSync(file, 'utf8');

// Replace the wikipedia icon in the head tag as well
if (html.includes('https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Gold_Star.svg/512px-Gold_Star.svg.png')) {
  html = html.replace(
    'href="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Gold_Star.svg/512px-Gold_Star.svg.png"', 
    'href="https://raw.githubusercontent.com/pwa-builder/pwabuilder-web/main/assets/icons/icon_192.png"'
  );
  fs.writeFileSync(file, html);
  console.log('Fixed icon link in index.html too');
}
