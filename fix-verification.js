const fs = require('fs');
const files = [
  'C:/Users/ansh9/Downloads/rivaaz-app (1).html',
  'C:/Users/ansh9/Downloads/Rivaaz-Website/index.html'
];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let html = fs.readFileSync(file, 'utf8');
    
    // Check if the verification tag is missing and add it back if needed
    if (!html.includes('google-site-verification')) {
      html = html.replace('<title>Rivaaz — Har Mehfil Ke Liye</title>', '<title>Rivaaz — Har Mehfil Ke Liye</title>\n<meta name="google-site-verification" content="KqpsKeE9tyPKucKi8FmVeZP1J1i8-LZOdSF_olsSRkQ" />');
      fs.writeFileSync(file, html);
      console.log('Restored verification tag to ' + file);
    } else {
      console.log('Verification tag is already present in ' + file);
    }
  }
});
