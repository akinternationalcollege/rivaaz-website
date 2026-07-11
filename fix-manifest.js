const fs = require('fs');

const manifest = {
  "name": "Rivaaz - Event Professionals",
  "short_name": "Rivaaz",
  "description": "Har Mehfil Ke Liye - Book verified event professionals in Laxmangarh.",
  "start_url": "/index.html",
  "id": "/",
  "display": "standalone",
  "background_color": "#050505",
  "theme_color": "#D4AF37",
  "orientation": "portrait-primary",
  "lang": "hi",
  "dir": "ltr",
  "categories": ["business", "events", "lifestyle"],
  "icons": [
    {
      "src": "https://raw.githubusercontent.com/pwa-builder/pwabuilder-web/main/assets/icons/icon_192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "https://raw.githubusercontent.com/pwa-builder/pwabuilder-web/main/assets/icons/icon_512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "https://raw.githubusercontent.com/pwa-builder/pwabuilder-web/main/assets/icons/icon_512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable"
    }
  ],
  "screenshots": [
    {
      "src": "https://raw.githubusercontent.com/pwa-builder/pwabuilder-web/main/assets/screenshots/screen1.png",
      "sizes": "2880x1800",
      "type": "image/png",
      "form_factor": "wide",
      "label": "Rivaaz Event Booking"
    },
    {
      "src": "https://raw.githubusercontent.com/pwa-builder/pwabuilder-web/main/assets/screenshots/screen2.png",
      "sizes": "1080x1920",
      "type": "image/png",
      "form_factor": "narrow",
      "label": "Rivaaz Mobile Booking"
    }
  ],
  "shortcuts": [
    {
      "name": "Hire Now",
      "short_name": "Hire",
      "description": "Book a professional immediately",
      "url": "/index.html#categories",
      "icons": [{ "src": "https://raw.githubusercontent.com/pwa-builder/pwabuilder-web/main/assets/icons/icon_192.png", "sizes": "192x192", "type": "image/png" }]
    }
  ]
};

fs.writeFileSync('C:/Users/ansh9/Downloads/Rivaaz-Website/manifest.json', JSON.stringify(manifest, null, 2));
console.log('Manifest written');
