
const STORAGE_KEY = 'rivaaz:content';
const LEADS_KEY = 'rivaaz:leads';
const ADMIN_PIN = '9414';
const DEFAULT_ICON_PATH = 'M12 2l2.9 6.5 7.1.7-5.4 4.7 1.6 7-6.2-3.9-6.2 3.9 1.6-7L2 9.2l7.1-.7z';
const AVATAR_COLORS = ['#5C1A23','#204B3F','#8a6d1f'];

const DEFAULT_DATA = {
  whatsappNumber: '6376213281',
  hero: { title:'Book the people who make every celebration', highlight:'unforgettable.', sub:'Waiter se dancer tak, mehndi se security tak — apni shaadi, party ya event ke liye verified professionals ghanto ya din ke hisaab se, turant book karein.' },
  categories: [
    {id:'c1', name:'Waiter', rate:'₹250/hr', icon:'M4 21h16M6 21V9l6-6 6 6v12M9 21v-6h6v6'},
    {id:'c2', name:'Reception Staff', rate:'₹300/hr', icon:'M4 4h16v16H4z M9 9h6v6H9z'},
    {id:'c3', name:'Accommodation', rate:'Custom quote', icon:'M3 12l9-9 9 9M5 10v10h14V10'},
    {id:'c4', name:'Dancer', rate:'₹1500/event', icon:'M12 2v6M8 22l4-6 4 6M6 12l6-4 6 4'},
    {id:'c5', name:'Choreographer', rate:'₹3000/day', icon:'M4 6h16M4 12h10M4 18h16'},
    {id:'c6', name:'Chef', rate:'₹800/hr', icon:'M6 3v6a3 3 0 006 0V3M12 3v18M18 3v10a3 3 0 01-6 0'},
    {id:'c7', name:'Cook', rate:'₹350/hr', icon:'M4 12a8 8 0 1116 0H4z M4 16h16'},
    {id:'c8', name:'Mehndi Artist', rate:'₹2000/event', icon:'M12 21c4-3 7-6 7-10a7 7 0 10-14 0c0 4 3 7 7 10z'},
    {id:'c9', name:'Folk Music Group', rate:'₹5000/event', icon:'M9 18V5l12-2v13M9 18a3 3 0 11-6 0 3 3 0 016 0zM21 16a3 3 0 11-6 0 3 3 0 016 0z'},
    {id:'c10', name:'Singer / Geet', rate:'₹4000/event', icon:'M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3zM19 10v2a7 7 0 01-14 0v-2M12 19v4'},
    {id:'c11', name:'Parlour / Makeup', rate:'₹1800/session', icon:'M12 2a7 7 0 00-7 7c0 4 3 6 3 9h8c0-3 3-5 3-9a7 7 0 00-7-7z'},
    {id:'c12', name:'Hotel Booking', rate:'Best rates', icon:'M3 21h18M5 21V7l7-4 7 4v14M9 9h1M9 13h1M14 9h1M14 13h1'},
    {id:'c13', name:'Bodyguard / Security', rate:'₹400/hr', icon:'M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z'}
  ],
  professionals: [
    {id:'p1', name:'HARISH KUMAR', role:'Hospitality Professional', experience:'2 Years', pic:'https://dummyimage.com/200x200/d4af37/050505&text=Pro', city:'Laxmangarh', rating:'4.9', rate:'₹200/hr', phone:'919876543210'},
    {id:'p2', name:'HIMANSHU', role:'Hospitality Professional', experience:'2 Years', pic:'https://dummyimage.com/200x200/d4af37/050505&text=Pro', city:'Laxmangarh', rating:'4.9', rate:'₹200/hr', phone:'919876543210'},
    {id:'p3', name:'JANMEJAY SHARMA', role:'Hospitality Professional', experience:'2 Years', pic:'https://dummyimage.com/200x200/d4af37/050505&text=Pro', city:'Laxmangarh', rating:'4.9', rate:'₹200/hr', phone:'919876543210'},
    {id:'p4', name:'MANOJ MAHRIYA', role:'Hospitality Professional', experience:'2 Years', pic:'https://dummyimage.com/200x200/d4af37/050505&text=Pro', city:'Laxmangarh', rating:'4.9', rate:'₹200/hr', phone:'919876543210'},
    {id:'p5', name:'POOJA KUMARI', role:'Hospitality Professional', experience:'2 Years', pic:'https://dummyimage.com/200x200/d4af37/050505&text=Pro', city:'Laxmangarh', rating:'4.9', rate:'₹200/hr', phone:'919876543210'},
    {id:'p6', name:'RAJKUMAR', role:'Hospitality Professional', experience:'2 Years', pic:'https://dummyimage.com/200x200/d4af37/050505&text=Pro', city:'Laxmangarh', rating:'4.9', rate:'₹200/hr', phone:'919876543210'},
    {id:'p7', name:'VIKRAM NAYAK', role:'Hospitality Professional', experience:'2 Years', pic:'https://dummyimage.com/200x200/d4af37/050505&text=Pro', city:'Laxmangarh', rating:'4.9', rate:'₹200/hr', phone:'919876543210'},
    {id:'p8', name:'YUVRAJ AJAY BALAN KUMAR', role:'Hospitality Professional', experience:'2 Years', pic:'https://dummyimage.com/200x200/d4af37/050505&text=Pro', city:'Laxmangarh', rating:'4.9', rate:'₹200/hr', phone:'919876543210'},
    {id:'p9', name:'ASHOK KUMAR', role:'Hospitality Professional', experience:'2 Years', pic:'https://dummyimage.com/200x200/d4af37/050505&text=Pro', city:'Laxmangarh', rating:'4.9', rate:'₹200/hr', phone:'919876543210'},
    {id:'p10', name:'DINESH', role:'Hospitality Professional', experience:'2 Years', pic:'https://dummyimage.com/200x200/d4af37/050505&text=Pro', city:'Laxmangarh', rating:'4.9', rate:'₹200/hr', phone:'919876543210'},
    {id:'p11', name:'JEEVAN', role:'Hospitality Professional', experience:'2 Years', pic:'https://dummyimage.com/200x200/d4af37/050505&text=Pro', city:'Laxmangarh', rating:'4.9', rate:'₹200/hr', phone:'919876543210'},
    {id:'p12', name:'KRISHAN KUMAR', role:'Hospitality Professional', experience:'2 Years', pic:'https://dummyimage.com/200x200/d4af37/050505&text=Pro', city:'Laxmangarh', rating:'4.9', rate:'₹200/hr', phone:'919876543210'},
    {id:'p13', name:'MAITRYEE SHARMA', role:'Hospitality Professional', experience:'2 Years', pic:'https://dummyimage.com/200x200/d4af37/050505&text=Pro', city:'Laxmangarh', rating:'4.9', rate:'₹200/hr', phone:'919876543210'},
    {id:'p14', name:'MUNESH SAINI KUMAR', role:'Hospitality Professional', experience:'2 Years', pic:'https://dummyimage.com/200x200/d4af37/050505&text=Pro', city:'Laxmangarh', rating:'4.9', rate:'₹200/hr', phone:'919876543210'},
    {id:'p15', name:'PANKAJ KUMAR', role:'Hospitality Professional', experience:'2 Years', pic:'https://dummyimage.com/200x200/d4af37/050505&text=Pro', city:'Laxmangarh', rating:'4.9', rate:'₹200/hr', phone:'919876543210'},
    {id:'p16', name:'RAHUL', role:'Hospitality Professional', experience:'2 Years', pic:'https://dummyimage.com/200x200/d4af37/050505&text=Pro', city:'Laxmangarh', rating:'4.9', rate:'₹200/hr', phone:'919876543210'},
    {id:'p17', name:'RAJESH KUMAR', role:'Hospitality Professional', experience:'2 Years', pic:'https://dummyimage.com/200x200/d4af37/050505&text=Pro', city:'Laxmangarh', rating:'4.9', rate:'₹200/hr', phone:'919876543210'},
    {id:'p18', name:'VIKRAM POONIA', role:'Hospitality Professional', experience:'2 Years', pic:'https://dummyimage.com/200x200/d4af37/050505&text=Pro', city:'Laxmangarh', rating:'4.9', rate:'₹200/hr', phone:'919876543210'}
  ],
  testimonials: [
    {id:'t1', quote:'Shaadi se 2 din pehle dancer cancel hua, Rivaaz se 4 ghante mein replacement mil gaya.', who:'Neha Agarwal', where:'Jaipur · Wedding, 400 guests'},
    {id:'t2', quote:'Security aur waiter dono ek hi platform se book kiye — bahut time bacha.', who:'Rohit Malhotra', where:'Delhi · Corporate Event'},
    {id:'t3', quote:'Mehndi artist ka kaam itna accha tha ki poore function mein tareef hi tareef mili.', who:'Simran Kaur', where:'Chandigarh · Sangeet'}
  ]
};

let siteData = JSON.parse(JSON.stringify(DEFAULT_DATA));
let leads = [];
let editing = { type:null, id:null };
let storageBroken = false;

// Safe wrapper for standard browser localStorage
const safeStorage = {
  get: function(key, asyncFlag) {
    return new Promise((resolve) => {
      try {
        const val = localStorage.getItem(key);
        resolve(val ? {value: val} : null);
      } catch(e) {
        resolve(null);
      }
    });
  },
  set: function(key, value, asyncFlag) {
    return new Promise((resolve, reject) => {
      try {
        localStorage.setItem(key, value);
        resolve(true);
      } catch(e) {
        reject(e);
      }
    });
  }
};

// Override window.storage if it doesn't exist so the site works anywhere
if (typeof window.storage === 'undefined') {
  window.storage = safeStorage;
}


function flagStorageIssue(e){
  console.warn('Storage issue:', e);
  if(!storageBroken){
    storageBroken = true;
    showToast('Note: badlaav abhi is session tak hi save ho rahe hain (connection issue).');
  }
}
async function withRetry(fn){
  try{ return await fn(); }
  catch(e){ await new Promise(r=>setTimeout(r,500)); return await fn(); }
}

async function loadAll(){
  renderAll(); // site is usable immediately with defaults, storage load is a background upgrade

  try{
    const res = await withRetry(()=>window.storage.get(STORAGE_KEY, true));
    if(res && res.value){
      siteData = JSON.parse(res.value);
      // Force seeded professionals if storage has fewer than 18
      if (!siteData.professionals || siteData.professionals.length < 18) {
        siteData.professionals = DEFAULT_DATA.professionals;
        saveSite();
      }
      renderAll();
    }
  }catch(e){
    saveSite(); // first-ever run: seed storage with defaults for next time
  }

  try{
    const res2 = await withRetry(()=>window.storage.get(LEADS_KEY, true));
    if(res2 && res2.value){ leads = JSON.parse(res2.value); }
  }catch(e){ 
    // Fallback to standard localStorage
    try {
      const backup = localStorage.getItem(LEADS_KEY);
      if(backup) leads = JSON.parse(backup);
    } catch(err) {}
  }
}
async function saveSite(){ try{ await withRetry(()=>window.storage.set(STORAGE_KEY, JSON.stringify(siteData), true)); }catch(e){ flagStorageIssue(e); } }
async function saveLeads(){ 
  try{ 
    await withRetry(()=>window.storage.set(LEADS_KEY, JSON.stringify(leads), true)); 
    // Also save to standard localStorage as a solid backup
    localStorage.setItem(LEADS_KEY, JSON.stringify(leads));
  }catch(e){ 
    flagStorageIssue(e); 
  } 
}

function renderAll(){ renderHero(); renderCategories(); renderProfessionals(); renderTestimonials(); }

function renderHero(){
  if(!document.getElementById('heroTitle')) return;
  document.getElementById('heroTitle').innerHTML = `${siteData.hero.title} <em>${siteData.hero.highlight}</em>`;
  document.getElementById('heroSub').textContent = siteData.hero.sub;
}
function renderCategories(){
  if(!document.getElementById('catGrid')) return;
  const grid = document.getElementById('catGrid');
  const select = document.getElementById('heroServiceSelect');
  grid.innerHTML=''; select.innerHTML='<option value="">Koi bhi service</option>';
  document.getElementById('statCount').textContent = siteData.categories.length + '+';
  siteData.categories.forEach(c=>{
    const card=document.createElement('div'); card.className='cat-card';
    card.innerHTML=`<svg class="cat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="${c.icon}"/></svg><h3>${c.name}</h3><div class="rate">Starting <b>${c.rate}</b></div>`;
    card.addEventListener('click', ()=>openBooking(c.name));
    grid.appendChild(card);
    const opt=document.createElement('option'); opt.value=c.name; opt.textContent=c.name; select.appendChild(opt);
  });
}
function renderProfessionals(){
  if(!document.getElementById('proRow')) return;
  const row=document.getElementById('proRow'); row.innerHTML='';
  siteData.professionals.forEach((p,i)=>{
    const card=document.createElement('div'); card.className='pro-card';
    const avatarHtml = p.pic
      ? `<img src="${p.pic}" alt="${p.name}" class="avatar" style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover; border: 2px solid var(--gold);">`
      : `<div class="avatar" style="background:${AVATAR_COLORS[i%3]};">${p.name.split(' ').map(w=>w[0]).join('')}</div>`;

    card.innerHTML=`
      <div class="pro-card-top">
        ${avatarHtml}
        <div style="flex:1;">
          <h4>${p.name}</h4><div class="role">${p.role}</div>
          <div class="meta"><span>${p.city}</span><span>★ ${p.rating}</span></div>
          <div class="meta" style="margin-top:6px;"><span>Experience: ${p.experience || 'N/A'}</span><span style="color:var(--gold);">${p.rate}</span></div>
        </div>
      </div>
      <div class="pro-card-bottom">
        <a href="tel:+916376213281" class="action-btn btn-call" onclick="event.stopPropagation()">📞 Call</a>
        <button class="action-btn btn-book" onclick="openBooking('${p.role}', '${p.name}'); event.stopPropagation()">Book Now</button>
      </div>
    `;
    card.addEventListener('click', ()=>openBooking(p.role, p.name));
    row.appendChild(card);
  });
}
function renderTestimonials(){
  if(!document.getElementById('testiGrid')) return;
  const grid=document.getElementById('testiGrid'); grid.innerHTML='';
  siteData.testimonials.forEach(t=>{
    const div=document.createElement('div'); div.className='testi';
    div.innerHTML=`<p class="quote">"${t.quote}"</p><div class="who">${t.who}</div><div class="where">${t.where}</div>`;
    grid.appendChild(div);
  });
}

function showToast(msg){
  const t=document.getElementById('toast'); t.textContent=msg; t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'), 2800);
}
function closeModal(id){ document.getElementById(id).classList.remove('show'); }
function openModal(id){ document.getElementById(id).classList.add('show'); }

function buildWaLink(number, message){
  const clean = (number||'').replace(/[^0-9]/g,'');
  if(!clean) return null;
  return `https://wa.me/${clean}?text=${encodeURIComponent(message)}`;
}

function openBooking(serviceName, proName){
  if(document.getElementById('bookingFormWrap')) {
    document.getElementById('bookingFormWrap').style.display='block';
    if(document.getElementById('bookingSuccessWrap')) document.getElementById('bookingSuccessWrap').style.display='none';
    if(document.getElementById('bkService')) document.getElementById('bkService').value = serviceName || '';
    if(document.getElementById('bkNotes')) document.getElementById('bkNotes').value = proName ? `Preferred professional: ${proName}` : '';
    openModal('bookingModal');
  } else {
    let url = 'book.html?';
    if(serviceName) url += 'service=' + encodeURIComponent(serviceName);
    if(proName) url += '&pro=' + encodeURIComponent(proName);
    window.location.href = url;
  }
}
const heroSearchBtn = document.getElementById('heroSearchBtn');
if(heroSearchBtn) heroSearchBtn.addEventListener('click', ()=>{
  openBooking(document.getElementById('heroServiceSelect').value);
  document.getElementById('bkCity').value = document.getElementById('heroCity').value;
  document.getElementById('bkDate').value = document.getElementById('heroDate').value;
});
function resetFields(ids){ ids.forEach(id=>{ const el=document.getElementById(id); if(el) el.value=''; }); }
function enableEnterSubmit(containerId, buttonId){
  if(!document.getElementById(containerId)) return;
  document.getElementById(containerId).addEventListener('keydown',(e)=>{
    if(e.key==='Enter' && e.target.tagName!=='TEXTAREA'){ e.preventDefault(); document.getElementById(buttonId).click(); }
  });
}

const bookingSubmitBtnEl = document.getElementById('bookingSubmitBtn');
if(bookingSubmitBtnEl) bookingSubmitBtnEl.addEventListener('click', async()=>{
  const name=document.getElementById('bkName').value.trim();
  const phone=document.getElementById('bkPhone').value.trim();
  const city=document.getElementById('bkCity').value.trim();
  if(!name||!phone||!city){ showToast('Naam, phone aur city zaroori hain.'); return; }
  const lead = {
    id:'lead_'+Date.now(), type:'booking',
    service:document.getElementById('bkService').value,
    name, phone, city,
    date:document.getElementById('bkDate').value,
    notes:document.getElementById('bkNotes').value,
    time:new Date().toLocaleString('en-IN')
  };
  leads.unshift(lead);
  await saveLeads();

  // Example of how backend API integration would look for WhatsApp Business API
  /*
  try {
    await fetch('YOUR_BACKEND_API_URL/send-whatsapp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        template: 'new_booking',
        to: phone,
        data: lead
      })
    });
  } catch(e) { console.error('Failed to send automated WhatsApp', e); }
  */

  resetFields(['bkName','bkPhone','bkCity','bkDate','bkNotes']);

  document.getElementById('bookingFormWrap').style.display='none';
  document.getElementById('bookingSuccessWrap').style.display='block';

  // Hardcoded WhatsApp destination number
  const waNumber = '916376213281';

  const waLink = buildWaLink(waNumber, `Naya Booking Request — Rivaaz\nService: ${lead.service||'-'}\nNaam: ${lead.name}\nPhone: ${lead.phone}\nCity: ${lead.city}\nDate: ${lead.date||'-'}\nNotes: ${lead.notes||'-'}`);
  if(waLink){
    // Automatically redirect to WhatsApp
    window.open(waLink, '_blank');

    const waBtn = document.getElementById('bookingWaBtn');
    if(waBtn) {
      waBtn.href = waLink; waBtn.style.display='block';
    }
    const successMsg = document.getElementById('bookingSuccessMsg');
    if(successMsg) {
      successMsg.textContent = 'Aapko WhatsApp par redirect kiya ja raha hai... Agar nahi hua to neeche button dabayein.';
    }
  } else {
    const waBtn = document.getElementById('bookingWaBtn');
    if(waBtn) waBtn.style.display='none';
    const successMsg = document.getElementById('bookingSuccessMsg');
    if(successMsg) successMsg.textContent = 'Hum jaldi contact karenge.';
  }
});
enableEnterSubmit('bookingModal','bookingSubmitBtn');

const vendorOpenBtn = document.getElementById('vendorOpenBtn');
if(vendorOpenBtn) vendorOpenBtn.addEventListener('click', openVendorModal);
function openVendorModal(){
  document.getElementById('vendorFormWrap').style.display='block';
  document.getElementById('vendorSuccessWrap').style.display='none';
  openModal('vendorModal');
}
const vendorSubmitBtnEl = document.getElementById('vendorSubmitBtn');
if(vendorSubmitBtnEl) vendorSubmitBtnEl.addEventListener('click', async()=>{
  const name=document.getElementById('vName').value.trim();
  const phone=document.getElementById('vPhone').value.trim();
  const city=document.getElementById('vCity').value.trim();
  const category=document.getElementById('vCategory').value.trim();
  if(!name||!phone||!city||!category){ showToast('Naam, phone, city aur category zaroori hain.'); return; }
  const v = {
    id:'lead_'+Date.now(), type:'vendor',
    name, phone, city, category,
    exp:document.getElementById('vExp').value,
    time:new Date().toLocaleString('en-IN')
  };
  leads.unshift(v);
  await saveLeads();

  // Example of how backend API integration would look for WhatsApp Business API
  /*
  try {
    await fetch('YOUR_BACKEND_API_URL/send-whatsapp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        template: 'new_vendor_signup',
        to: phone,
        data: v
      })
    });
  } catch(e) { console.error('Failed to send automated WhatsApp', e); }
  */

  resetFields(['vName','vPhone','vCity','vCategory','vExp']);

  document.getElementById('vendorFormWrap').style.display='none';
  document.getElementById('vendorSuccessWrap').style.display='block';

  // Use the admin set WhatsApp number, fallback to default if not set
  const waNumber = siteData.whatsappNumber || '6376213281';

  const waLink = buildWaLink(waNumber, `Naya Professional Signup — Rivaaz\nNaam: ${v.name}\nPhone: ${v.phone}\nCity: ${v.city}\nCategory: ${v.category}\nExperience: ${v.exp||'-'} years`);
  if(waLink){
    // Automatically redirect to WhatsApp
    window.open(waLink, '_blank');

    waBtn.href = waLink; waBtn.style.display='block';
    document.getElementById('vendorSuccessMsg').textContent = 'Aapko WhatsApp par redirect kiya ja raha hai... Agar nahi hua to neeche button dabayein.';
  } else {
    waBtn.style.display='none';
    document.getElementById('vendorSuccessMsg').textContent = 'Team jaldi contact karegi.';
  }
});
enableEnterSubmit('vendorModal','vendorSubmitBtn');

/* In-page section scrolling (no real navigation, so no "leaving site" prompt) */
document.querySelectorAll('.scroll-btn').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const target = document.getElementById(btn.dataset.scroll);
    if(target) target.scrollIntoView({behavior:'smooth', block:'start'});
  });
});

/* Admin login */
const adminLoginLink = document.getElementById('adminLoginLink');
if(adminLoginLink) adminLoginLink.addEventListener('click', ()=>{ openModal('pinModal'); });
const pinSubmitBtnEl = document.getElementById('pinSubmitBtn');
if(pinSubmitBtnEl) pinSubmitBtnEl.addEventListener('click', ()=>{
  const val=document.getElementById('pinInput').value;
  document.getElementById('pinInput').value='';
  if(val===ADMIN_PIN){ closeModal('pinModal'); document.getElementById('pinError').style.display='none'; openAdmin(); }
  else{ document.getElementById('pinError').style.display='block'; }
});
enableEnterSubmit('pinModal','pinSubmitBtn');
function openAdmin(){
  openModal('adminOverlay');
  document.getElementById('adminOverlay').classList.add('show');
  renderAdminCategories(); renderAdminPros(); renderAdminTesti(); renderAdminBookings(); renderAdminVendors();
  document.getElementById('adminWhatsapp').value=siteData.whatsappNumber||'';
  document.getElementById('adminHeroTitle').value=siteData.hero.title;
  document.getElementById('adminHeroHighlight').value=siteData.hero.highlight;
  document.getElementById('adminHeroSub').value=siteData.hero.sub;
}
function closeAdmin(){ document.getElementById('adminOverlay').classList.remove('show'); }
document.querySelectorAll('.admin-tab').forEach(tab=>{
  tab.addEventListener('click', ()=>{
    document.querySelectorAll('.admin-tab').forEach(t=>t.classList.remove('active'));
    document.querySelectorAll('.admin-section').forEach(s=>s.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(tab.dataset.target).classList.add('active');
  });
});

/* Admin: Categories */
function renderAdminCategories(){
  if(!document.getElementById('adminCatList')) return;
  const el=document.getElementById('adminCatList'); el.innerHTML='';
  if(siteData.categories.length===0){ el.innerHTML='<div class="empty-state">Koi category nahi hai.</div>'; return; }
  siteData.categories.forEach(c=>{
    const row=document.createElement('div'); row.className='admin-row';
    row.innerHTML=`<div class="info"><h4>${c.name}</h4><span>${c.rate}</span></div>
      <div class="actions"><button class="icon-btn" onclick="addOrEditCategoryForm('${c.id}')">✎</button><button class="icon-btn danger" onclick="deleteCategory('${c.id}')">✕</button></div>`;
    el.appendChild(row);
  });
}
function addOrEditCategoryForm(id){
  editing={type:'category', id:id||null};
  const c = id ? siteData.categories.find(x=>x.id===id) : {name:'',rate:''};
  document.getElementById('catFormName').value=c.name;
  document.getElementById('catFormRate').value=c.rate;
  document.getElementById('catFormTitle').textContent = id ? 'Category Edit Karein' : 'Nayi Category';
  openModal('categoryModal');
}
function deleteCategory(id){
  if(!confirm('Delete karna hai?')) return;
  siteData.categories = siteData.categories.filter(c=>c.id!==id);
  saveSite(); renderAdminCategories(); renderCategories();
}
const categorySubmitBtnEl = document.getElementById('categorySubmitBtn');
if(categorySubmitBtnEl) categorySubmitBtnEl.addEventListener('click', async()=>{
  const name=document.getElementById('catFormName').value.trim();
  const rate=document.getElementById('catFormRate').value.trim();
  if(!name||!rate){ showToast('Naam aur rate zaroori hain.'); return; }
  if(editing.id){ const c=siteData.categories.find(x=>x.id===editing.id); c.name=name; c.rate=rate; }
  else{ siteData.categories.push({id:'cat_'+Date.now(), name, rate, icon:DEFAULT_ICON_PATH}); }
  await saveSite(); closeModal('categoryModal');
  renderAdminCategories(); renderCategories(); showToast('Saved!');
});
enableEnterSubmit('categoryModal','categorySubmitBtn');

/* Admin: Professionals */
function renderAdminPros(){
  if(!document.getElementById('adminProList')) return;
  const el=document.getElementById('adminProList'); el.innerHTML='';
  if(siteData.professionals.length===0){ el.innerHTML='<div class="empty-state">Koi professional nahi hai.</div>'; return; }
  siteData.professionals.forEach((p,i)=>{
    const row=document.createElement('div'); row.className='admin-row';
    const avatarHtml = p.pic
      ? `<img src="${p.pic}" alt="${p.name}" style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover; border: 1px solid var(--gold); margin-right: 12px; vertical-align: middle;">`
      : `<div style="width: 40px; height: 40px; border-radius: 50%; background: ${AVATAR_COLORS[i%3]}; color: white; display: inline-flex; align-items: center; justify-content: center; margin-right: 12px; vertical-align: middle; font-weight: bold;">${p.name.split(' ').map(w=>w[0]).join('')}</div>`;

    row.innerHTML=`<div class="info" style="display: flex; align-items: center;">
        ${avatarHtml}
        <div>
          <h4>${p.name} — ${p.role}</h4>
          <span>Exp: ${p.experience || 'N/A'} · ${p.city} · ★${p.rating} · ${p.rate}</span>
        </div>
      </div>
      <div class="actions"><button class="icon-btn" onclick="addOrEditProForm('${p.id}')">✎</button><button class="icon-btn danger" onclick="deletePro('${p.id}')">✕</button></div>`;
    el.appendChild(row);
  });
}
function addOrEditProForm(id){
  editing={type:'pro', id:id||null};
  const p = id ? siteData.professionals.find(x=>x.id===id) : {name:'',role:'',experience:'',pic:'',city:'',rating:'',rate:'',phone:''};
  document.getElementById('proFormName').value=p.name;
  document.getElementById('proFormRole').value=p.role;
  document.getElementById('proFormExp').value=p.experience||'';
  document.getElementById('proFormPic').value=p.pic||'';
  document.getElementById('proFormPhone').value=p.phone||'';
  document.getElementById('proFormCity').value=p.city;
  document.getElementById('proFormRating').value=p.rating;
  document.getElementById('proFormRate').value=p.rate;
  document.getElementById('proFormTitle').textContent = id ? 'Professional Edit Karein' : 'Naya Professional';
  openModal('proModal');
}
function deletePro(id){
  if(!confirm('Delete karna hai?')) return;
  siteData.professionals = siteData.professionals.filter(p=>p.id!==id);
  saveSite(); renderAdminPros(); renderProfessionals();
}
const proSubmitBtnEl = document.getElementById('proSubmitBtn');
if(proSubmitBtnEl) proSubmitBtnEl.addEventListener('click', async()=>{
  const vals={ name:document.getElementById('proFormName').value.trim(), role:document.getElementById('proFormRole').value.trim(), experience:document.getElementById('proFormExp').value.trim(), pic:document.getElementById('proFormPic').value.trim(), phone:document.getElementById('proFormPhone').value.trim(), city:document.getElementById('proFormCity').value.trim(), rating:document.getElementById('proFormRating').value.trim(), rate:document.getElementById('proFormRate').value.trim() };
  if(!vals.name||!vals.role||!vals.city){ showToast('Naam, role aur city zaroori hain.'); return; }
  if(editing.id){ Object.assign(siteData.professionals.find(x=>x.id===editing.id), vals); }
  else{ siteData.professionals.push({id:'pro_'+Date.now(), ...vals}); }
  await saveSite(); closeModal('proModal');
  renderAdminPros(); renderProfessionals(); showToast('Saved!');
});
enableEnterSubmit('proModal','proSubmitBtn');

/* Admin: Testimonials */
function renderAdminTesti(){
  if(!document.getElementById('adminTestiList')) return;
  const el=document.getElementById('adminTestiList'); el.innerHTML='';
  if(siteData.testimonials.length===0){ el.innerHTML='<div class="empty-state">Koi testimonial nahi hai.</div>'; return; }
  siteData.testimonials.forEach(t=>{
    const row=document.createElement('div'); row.className='admin-row';
    row.innerHTML=`<div class="info"><h4>${t.who}</h4><span>${t.where}</span></div>
      <div class="actions"><button class="icon-btn" onclick="addOrEditTestiForm('${t.id}')">✎</button><button class="icon-btn danger" onclick="deleteTesti('${t.id}')">✕</button></div>`;
    el.appendChild(row);
  });
}
function addOrEditTestiForm(id){
  editing={type:'testi', id:id||null};
  const t = id ? siteData.testimonials.find(x=>x.id===id) : {quote:'',who:'',where:''};
  document.getElementById('testiFormQuote').value=t.quote;
  document.getElementById('testiFormWho').value=t.who;
  document.getElementById('testiFormWhere').value=t.where;
  document.getElementById('testiFormTitle').textContent = id ? 'Testimonial Edit Karein' : 'Naya Testimonial';
  openModal('testiModal');
}
function deleteTesti(id){
  if(!confirm('Delete karna hai?')) return;
  siteData.testimonials = siteData.testimonials.filter(t=>t.id!==id);
  saveSite(); renderAdminTesti(); renderTestimonials();
}
const testiSubmitBtnEl = document.getElementById('testiSubmitBtn');
if(testiSubmitBtnEl) testiSubmitBtnEl.addEventListener('click', async()=>{
  const vals={ quote:document.getElementById('testiFormQuote').value.trim(), who:document.getElementById('testiFormWho').value.trim(), where:document.getElementById('testiFormWhere').value.trim() };
  if(!vals.quote||!vals.who){ showToast('Quote aur naam zaroori hain.'); return; }
  if(editing.id){ Object.assign(siteData.testimonials.find(x=>x.id===editing.id), vals); }
  else{ siteData.testimonials.push({id:'testi_'+Date.now(), ...vals}); }
  await saveSite(); closeModal('testiModal');
  renderAdminTesti(); renderTestimonials(); showToast('Saved!');
});
enableEnterSubmit('testiModal','testiSubmitBtn');

/* Admin: Hero */
const heroSubmitBtnEl = document.getElementById('heroSubmitBtn');
if(heroSubmitBtnEl) heroSubmitBtnEl.addEventListener('click', async()=>{
  siteData.whatsappNumber=document.getElementById('adminWhatsapp').value.trim();
  siteData.hero.title=document.getElementById('adminHeroTitle').value;
  siteData.hero.highlight=document.getElementById('adminHeroHighlight').value;
  siteData.hero.sub=document.getElementById('adminHeroSub').value;
  await saveSite(); renderHero(); showToast('Saved!');
});

/* Admin: Leads */
function renderAdminBookings(){
  const el=document.getElementById('adminBookingsList'); el.innerHTML='';
  const bLeads = leads.filter(l=>l.type==='booking');
  if(bLeads.length===0){ el.innerHTML='<div class="empty-state">Abhi tak koi booking request nahi aayi.</div>'; return; }
  bLeads.forEach(l=>{
    const card=document.createElement('div'); card.className='lead-card';
    card.innerHTML=`<div class="row1"><h4><span class="tag booking">Booking</span>${l.name}</h4><span class="time">${l.time}</span></div>
      <p><b>Service:</b> ${l.service||'—'}</p><p><b>Phone:</b> ${l.phone}</p><p><b>City:</b> ${l.city}</p><p><b>Date:</b> ${l.date||'—'}</p>${l.notes?`<p><b>Notes:</b> ${l.notes}</p>`:''}
      <div style="margin-top:10px;"><button class="icon-btn danger" onclick="deleteLead('${l.id}')">✕ Remove</button></div>`;
    el.appendChild(card);
  });
}
function renderAdminVendors(){
  const el=document.getElementById('adminVendorsList'); el.innerHTML='';
  const vLeads = leads.filter(l=>l.type==='vendor');
  if(vLeads.length===0){ el.innerHTML='<div class="empty-state">Abhi tak koi staff inquiry nahi aayi.</div>'; return; }
  vLeads.forEach(l=>{
    const card=document.createElement('div'); card.className='lead-card';
    card.innerHTML=`<div class="row1"><h4><span class="tag vendor">Staff Inquiry</span>${l.name}</h4><span class="time">${l.time}</span></div>
      <p><b>Category:</b> ${l.category}</p><p><b>Phone:</b> ${l.phone}</p><p><b>City:</b> ${l.city}</p>${l.exp?`<p><b>Experience:</b> ${l.exp}</p>`:''}${l.notes?`<p><b>Notes:</b> ${l.notes}</p>`:''}
      <div style="margin-top:10px;"><button class="icon-btn danger" onclick="deleteLead('${l.id}')">✕ Remove</button></div>`;
    el.appendChild(card);
  });
}
function deleteLead(id){
  leads = leads.filter(l=>l.id!==id);
  saveLeads(); renderAdminBookings(); renderAdminVendors();
}

document.querySelector('.menu-toggle').addEventListener('click', ()=>{
  const navEl=document.querySelector('.nav-links');
  const isOpen = navEl.style.display==='flex';
  navEl.style.display = isOpen ? 'none' : 'flex';
  navEl.style.cssText += 'flex-direction:column; position:absolute; top:64px; right:20px; background:#1F1811; padding:20px 30px; border:1px solid rgba(201,162,75,0.28); gap:18px;';
});

loadAll();




/* Scroll Animation Observer */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));


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


window.addEventListener('DOMContentLoaded', () => {
  if(document.getElementById('bookingFormWrap')) {
    const params = new URLSearchParams(window.location.search);
    const service = params.get('service');
    const pro = params.get('pro');
    if(service && document.getElementById('bkService')) document.getElementById('bkService').value = service;
    if(pro && document.getElementById('bkNotes')) document.getElementById('bkNotes').value = 'Preferred professional: ' + pro;
  }
});
