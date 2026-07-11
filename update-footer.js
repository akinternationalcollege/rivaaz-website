const fs = require('fs');
const file = 'C:/Users/ansh9/Downloads/Rivaaz-Website/index.html';

if (fs.existsSync(file)) {
  let html = fs.readFileSync(file, 'utf8');

  // Replace the old footer bottom with the new one
  const oldFooter = '<div class="foot-bottom">This is a working prototype &middot; &copy; 2026 Rivaaz &middot; Live at <b>rivaaz.work.gd</b></div>';
  const newFooter = '<div class="foot-bottom">Rivaaz by <b>AK group</b> &middot; &copy; 2026 &middot; Live at <b>rivaaz.work.gd</b><br><span style="font-size:0.7rem; opacity:0.6; display:block; margin-top:8px;">Developed by MR. JA Sharma (Janmejay Ansh Sharma)</span></div>';

  if (html.includes('foot-bottom')) {
    // A bit more robust regex replacement in case spacing is slightly different
    html = html.replace(/<div class="foot-bottom">.*?<\/div>/, newFooter);
    fs.writeFileSync(file, html);
    console.log('Successfully added AK group and JA Sharma to the footer!');
  } else {
    console.log('Could not find foot-bottom class');
  }
}
