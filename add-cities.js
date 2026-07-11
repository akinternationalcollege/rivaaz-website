const fs = require('fs');
const file = 'C:/Users/ansh9/Downloads/Rivaaz-Website/index.html';
let html = fs.readFileSync(file, 'utf8');

const cityOptions = `
              <option value="Laxmangarh">Laxmangarh</option>
              <option value="Sikar">Sikar</option>
              <option value="Salasar">Salasar</option>
              <option value="Fatehpur">Fatehpur</option>
              <option value="Nawalgarh">Nawalgarh</option>
              <option value="Mukundgarh">Mukundgarh</option>
              <option value="Dhod">Dhod</option>
              <option value="Nechhwa">Nechhwa</option>
              <option value="Ramgarh Shekhawati">Ramgarh Shekhawati</option>
              <option value="Sujangarh">Sujangarh</option>`;

// 1. Replace Hero Search Bar City
html = html.replace(
  /<input type="text" id="heroCity"[^>]*>/,
  `<select id="heroCity">${cityOptions}\n      </select>`
);

// 2. Replace Booking Modal City
html = html.replace(
  /<input type="text" id="bkCity" required>/,
  `<select id="bkCity" required>${cityOptions}\n        </select>`
);

// 3. Replace Vendor Modal City
html = html.replace(
  /<input type="text" id="vCity" required>/,
  `<select id="vCity" required>${cityOptions}\n        </select>`
);

// 4. Replace Admin Pro Modal City
html = html.replace(
  /<input type="text" id="proFormCity" required>/,
  `<select id="proFormCity" required>${cityOptions}\n        </select>`
);

// 5. Fix CSS so the new dropdowns look beautiful in the dark mode modals
html = html.replace(
  /\.field input, \.field textarea\{/g,
  '.field input, .field textarea, .field select{'
);
html = html.replace(
  /\.field input:focus, \.field textarea:focus\{/g,
  '.field input:focus, .field textarea:focus, .field select:focus{'
);
if (!html.includes('.field select option')) {
  html = html.replace(
    /<\/style>/,
    '  .field select option { background: var(--ink-card); color: var(--ivory); }\n</style>'
  );
}

fs.writeFileSync(file, html);
console.log('Successfully replaced city text boxes with beautiful dropdowns!');
