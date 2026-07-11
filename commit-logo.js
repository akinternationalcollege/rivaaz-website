const { execSync } = require('child_process');
try {
  execSync('cd C:/Users/ansh9/Downloads/Rivaaz-Website && git add "11-Photoroom.png" index.html manifest.json && git commit -m "Update logo to official Photoroom image" && git push');
  console.log('Successfully committed to git!');
} catch (e) {
  console.log('Git commit failed. You need to upload manually.');
}
