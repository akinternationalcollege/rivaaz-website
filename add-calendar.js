const fs = require('fs');
const file = 'C:/Users/ansh9/Downloads/Rivaaz-Website/index.html';
let html = fs.readFileSync(file, 'utf8');

// 1. First, we need to completely remove the old script that formatted text to DD/MM/YYYY
// because native date pickers do that automatically and better.
const scriptToRemove = /\/\* Auto-format date inputs to DD\/MM\/YYYY \*\/[\s\S]*?setupDateFormatter\('bkDate'\);\n\}\);/g;
html = html.replace(scriptToRemove, '');

// 2. Change the Hero search bar date input to type="date"
html = html.replace(
  /<input type="text" id="heroDate"[^>]*>/,
  '<input type="date" id="heroDate" style="color:var(--ivory); cursor:pointer;">'
);

// 3. Change the Booking modal date input to type="date"
html = html.replace(
  /<input type="text" id="bkDate"[^>]*>/,
  '<input type="date" id="bkDate" style="color:var(--ivory); cursor:pointer;">'
);

// 4. Update the CSS to make the calendar icon look good in dark mode
// We use a CSS trick to invert the color of the native calendar icon so it's visible on dark backgrounds
const dateCss = `
  /* Calendar Date Picker Styling for Dark Mode */
  ::-webkit-calendar-picker-indicator { filter: invert(1); cursor: pointer; opacity: 0.6; transition: opacity 0.2s; }
  ::-webkit-calendar-picker-indicator:hover { opacity: 1; }
  input[type="date"]::-webkit-datetime-edit { padding: 4px; }
`;

if (!html.includes('::-webkit-calendar-picker-indicator')) {
  html = html.replace('</style>', dateCss + '\n</style>');
}

fs.writeFileSync(file, html);
console.log('Successfully added native calendar popups!');
