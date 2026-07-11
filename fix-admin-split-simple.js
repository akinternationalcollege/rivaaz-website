const fs = require('fs');
const file = 'C:/Users/ansh9/Downloads/Rivaaz-Website/index.html';
let html = fs.readFileSync(file, 'utf8');

// 1. Update the tabs in the Admin Panel
html = html.replace(
  /<button class="admin-tab" data-target="tabLeads">Requests<\/button>/,
  '<button class="admin-tab" data-target="tabBookings">Bookings</button>\n      <button class="admin-tab" data-target="tabVendors">Staff Inquiries</button>'
);

// 2. Update the sections in the Admin Panel
html = html.replace(
  /<div class="admin-section" id="tabLeads">\s*<div id="adminLeadsList"><\/div>\s*<\/div>/,
  `<div class="admin-section" id="tabBookings">
      <div id="adminBookingsList"></div>
    </div>
    <div class="admin-section" id="tabVendors">
      <div id="adminVendorsList"></div>
    </div>`
);

// 3. Update JavaScript to split the render function
const oldRenderFunc = /function renderAdminLeads\(\)\{[\s\S]*?saveLeads\(\); renderAdminLeads\(\);\n\}/;
const newRenderFunc = `function renderAdminBookings(){
  const el=document.getElementById('adminBookingsList'); el.innerHTML='';
  const bLeads = leads.filter(l=>l.type==='booking');
  if(bLeads.length===0){ el.innerHTML='<div class="empty-state">Abhi tak koi booking request nahi aayi.</div>'; return; }
  bLeads.forEach(l=>{
    const card=document.createElement('div'); card.className='lead-card';
    card.innerHTML=\`<div class="row1"><h4><span class="tag booking">Booking</span>\${l.name}</h4><span class="time">\${l.time}</span></div>
      <p><b>Service:</b> \${l.service||'—'}</p><p><b>Phone:</b> \${l.phone}</p><p><b>City:</b> \${l.city}</p><p><b>Date:</b> \${l.date||'—'}</p>\${l.notes?\`<p><b>Notes:</b> \${l.notes}</p>\`:''}
      <div style="margin-top:10px;"><button class="icon-btn danger" onclick="deleteLead('\${l.id}')">✕ Remove</button></div>\`;
    el.appendChild(card);
  });
}
function renderAdminVendors(){
  const el=document.getElementById('adminVendorsList'); el.innerHTML='';
  const vLeads = leads.filter(l=>l.type==='vendor');
  if(vLeads.length===0){ el.innerHTML='<div class="empty-state">Abhi tak koi staff inquiry nahi aayi.</div>'; return; }
  vLeads.forEach(l=>{
    const card=document.createElement('div'); card.className='lead-card';
    card.innerHTML=\`<div class="row1"><h4><span class="tag vendor">Staff Inquiry</span>\${l.name}</h4><span class="time">\${l.time}</span></div>
      <p><b>Category:</b> \${l.category}</p><p><b>Phone:</b> \${l.phone}</p><p><b>City:</b> \${l.city}</p>\${l.exp?\`<p><b>Experience:</b> \${l.exp}</p>\`:''}\${l.notes?\`<p><b>Notes:</b> \${l.notes}</p>\`:''}
      <div style="margin-top:10px;"><button class="icon-btn danger" onclick="deleteLead('\${l.id}')">✕ Remove</button></div>\`;
    el.appendChild(card);
  });
}
function deleteLead(id){
  leads = leads.filter(l=>l.id!==id);
  saveLeads(); renderAdminBookings(); renderAdminVendors();
}`;

html = html.replace(oldRenderFunc, newRenderFunc);

// 4. Update the openAdmin call
html = html.replace(
  /renderAdminCategories\(\); renderAdminPros\(\); renderAdminTesti\(\); renderAdminLeads\(\);/,
  'renderAdminCategories(); renderAdminPros(); renderAdminTesti(); renderAdminBookings(); renderAdminVendors();'
);

fs.writeFileSync(file, html);
console.log('Successfully split the admin panels!');
