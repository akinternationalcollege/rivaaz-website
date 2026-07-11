const fs = require('fs');
const file = 'C:/Users/ansh9/Downloads/Rivaaz-Website/index.html';
let html = fs.readFileSync(file, 'utf8');

const pwaHead = `
<!-- PWA Meta Tags -->
<link rel="manifest" href="manifest.json">
<meta name="theme-color" content="#D4AF37">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="Rivaaz">
<link rel="apple-touch-icon" href="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Gold_Star.svg/512px-Gold_Star.svg.png">
`;

const pwaScript = `
/* PWA Service Worker Registration */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(registration => {
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, err => {
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}
</script>
</body>
</html>
`;

if (!html.includes('manifest.json')) {
  html = html.replace('<!-- Canonical Tag for Google -->', pwaHead + '\n<!-- Canonical Tag for Google -->');
  html = html.replace(/<\/script>\s*<\/body>\s*<\/html>/g, pwaScript);
  fs.writeFileSync(file, html);
  console.log('PWA code injected into index.html');
}
