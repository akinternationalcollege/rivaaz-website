const fs = require('fs');
const files = [
  'C:/Users/ansh9/Downloads/Rivaaz-Website/index.html',
  'C:/Users/ansh9/Downloads/Rivaaz-Website/manifest.json'
];

// First, check if the logo file exists to get its exact name/extension
const dlDir = 'C:/Users/ansh9/Downloads';
const filesInDl = fs.readdirSync(dlDir);
const logoFile = filesInDl.find(f => f.toLowerCase().includes('11-photoroom'));

if (logoFile) {
  console.log('Found logo file:', logoFile);
  
  // Copy the logo into the website folder
  fs.copyFileSync(
    `${dlDir}/${logoFile}`, 
    `C:/Users/ansh9/Downloads/Rivaaz-Website/${logoFile}`
  );
  console.log(`Copied ${logoFile} to Rivaaz-Website folder.`);

  // 1. Update index.html
  let html = fs.readFileSync(files[0], 'utf8');
  html = html.replace(
    /<link rel="apple-touch-icon" href="https:\/\/dummyimage\.com[^>]+>/g, 
    `<link rel="apple-touch-icon" href="/${logoFile}">`
  );
  fs.writeFileSync(files[0], html);
  console.log('Updated index.html with new logo');

  // 2. Update manifest.json
  let manifestStr = fs.readFileSync(files[1], 'utf8');
  let manifest = JSON.parse(manifestStr);
  
  // Update all the icon URLs to point to your new logo
  manifest.icons.forEach(icon => {
    icon.src = `/${logoFile}`;
  });
  
  // Update the shortcut icon too
  if (manifest.shortcuts && manifest.shortcuts[0] && manifest.shortcuts[0].icons) {
    manifest.shortcuts[0].icons[0].src = `/${logoFile}`;
  }

  fs.writeFileSync(files[1], JSON.stringify(manifest, null, 2));
  console.log('Updated manifest.json with new logo');
} else {
  console.log('Could not find the 11-Photoroom file in your Downloads folder!');
}
