const fs = require('fs');
const file = 'C:/Users/ansh9/Downloads/Rivaaz-Website/index.html';
let html = fs.readFileSync(file, 'utf8');

// 1. First, make sure the HTML is strictly type="date" and add the Urgent checkbox
html = html.replace(
  /<div class="field"><label>Event Date<\/label><input type="date" id="bkDate" style="color:var\(--ivory\); cursor:pointer;"><\/div>/g,
  `<div class="field">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
            <label style="margin-bottom:0;">Event Date</label>
            <label style="display:flex; align-items:center; gap:6px; cursor:pointer; color:var(--gold-bright); font-weight:700; text-transform:none; letter-spacing:0; font-size:0.8rem;">
              <input type="checkbox" id="bkUrgent" style="width:16px; height:16px; accent-color:#e66; cursor:pointer;"> 
              Urgent? (Today/Tomorrow)
            </label>
          </div>
          <input type="date" id="bkDate" style="color:var(--ivory); cursor:pointer;">
        </div>`
);

// Do the same for the hero search bar
html = html.replace(
  /<div>\s*<label>Event Date<\/label>\s*<input type="date" id="heroDate" style="color:var\(--ivory\); cursor:pointer;">\s*<\/div>/g,
  `<div style="position:relative;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
        <label style="margin-bottom:0;">Event Date</label>
        <label style="display:flex; align-items:center; gap:4px; cursor:pointer; color:var(--gold-bright); font-weight:700; text-transform:none; letter-spacing:0; font-size:0.66rem;">
          <input type="checkbox" id="heroUrgent" style="width:12px; height:12px; accent-color:#e66; cursor:pointer;"> 
          Urgent?
        </label>
      </div>
      <input type="date" id="heroDate" style="color:var(--ivory); cursor:pointer;">
    </div>`
);

// 2. Add the powerful JavaScript to control the calendar restrictions
const dateLogicScript = `
/* Smart Calendar Restrictions */
function setupSmartCalendars() {
  const heroDate = document.getElementById('heroDate');
  const heroUrgent = document.getElementById('heroUrgent');
  const bkDate = document.getElementById('bkDate');
  const bkUrgent = document.getElementById('bkUrgent');

  if (!heroDate || !bkDate) return;

  function setCalendarLimits() {
    const today = new Date();
    
    // Calculate +3 days (Standard minimum booking)
    const minStandard = new Date(today);
    minStandard.setDate(today.getDate() + 3);
    
    // Calculate +3 years (Maximum booking)
    const maxDate = new Date(today);
    maxDate.setFullYear(today.getFullYear() + 3);
    
    // Format dates to YYYY-MM-DD for the HTML input
    const formatStr = (d) => d.toISOString().split('T')[0];
    const todayStr = formatStr(today);
    const minStandardStr = formatStr(minStandard);
    const maxStr = formatStr(maxDate);

    // Apply logic to Hero Search Bar
    if (heroUrgent.checked) {
      heroDate.min = todayStr; // Can book today or tomorrow
    } else {
      heroDate.min = minStandardStr; // Must book 3+ days in advance
      // If they had an urgent date selected but unchecked the box, clear it
      if (heroDate.value && heroDate.value < minStandardStr) heroDate.value = '';
    }
    heroDate.max = maxStr;

    // Apply logic to Booking Modal
    if (bkUrgent.checked) {
      bkDate.min = todayStr;
    } else {
      bkDate.min = minStandardStr;
      if (bkDate.value && bkDate.value < minStandardStr) bkDate.value = '';
    }
    bkDate.max = maxStr;
  }

  // Run on load
  setCalendarLimits();

  // Run whenever the Urgent checkboxes are clicked
  heroUrgent.addEventListener('change', setCalendarLimits);
  bkUrgent.addEventListener('change', setCalendarLimits);
}

document.addEventListener('DOMContentLoaded', setupSmartCalendars);
`;

if (!html.includes('function setupSmartCalendars()')) {
  html = html.replace('/* PWA Service Worker Registration */', dateLogicScript + '\n/* PWA Service Worker Registration */');
}

fs.writeFileSync(file, html);
console.log('Successfully injected Smart Calendars with Urgent mode!');
