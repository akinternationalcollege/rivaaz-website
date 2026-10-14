
const STORAGE_KEY = 'rivaaz:content';
const LEADS_KEY = 'rivaaz:leads';
const ADMIN_PIN = '9414';
const DEFAULT_ICON_PATH = 'M12 2l2.9 6.5 7.1.7-5.4 4.7 1.6 7-6.2-3.9-6.2 3.9 1.6-7L2 9.2l7.1-.7z';
const AVATAR_COLORS = ['#5C1A23','#204B3F','#8a6d1f'];

// Configurable Cloud Webhook URL for Google Sheets / CRM lead synchronization
const GOOGLE_SHEETS_WEBHOOK_URL = '';

/**
 * Feature 4: Silent Error & Bug Reporter
 * Automatically reports uncaught JS runtime errors and unhandled promise rejections to webhook.
 */
function reportSilentError(errorData) {
  if (!GOOGLE_SHEETS_WEBHOOK_URL) return;
  try {
    const payload = {
      type: 'error_report',
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      ...errorData
    };
    fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).catch(() => {});
  } catch (err) {}
}

window.onerror = function(message, source, lineno, colno, error) {
  reportSilentError({
    message: String(message),
    source: String(source),
    lineno: lineno,
    colno: colno,
    stack: error && error.stack ? error.stack : ''
  });
  return false;
};

window.onunhandledrejection = function(event) {
  reportSilentError({
    message: event.reason ? (event.reason.message || String(event.reason)) : 'Unhandled Promise Rejection',
    stack: event.reason && event.reason.stack ? event.reason.stack : ''
  });
};

/**
 * Asynchronously compresses and converts an image File to a web-friendly Base64 Data URL
 * via HTML5 Canvas to prevent LocalStorage QuotaExceededError.
 */
function compressAndConvertImage(file, maxWidth = 1080, quality = 0.7) {
  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith('image/')) {
      return reject(new Error('Invalid image file'));
    }
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        let width = img.width;
        let height = img.height;
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        // Convert to web-friendly JPEG data url with specified quality
        const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedDataUrl);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

const DEFAULT_DATA = {
  whatsappNumber: '6376213281',
  hero: { title:'Book the people who make every celebration', highlight:'unforgettable.', sub:'Waiter se dancer tak, mehndi se security tak — apni shaadi, party ya event ke liye verified professionals ghanto ya din ke hisaab se, turant book karein.' },
  
  venues: [
    {id:'v1', name:'The Royal Palace Ground', location:'Sikar Road, Laxmangarh', attractions:'Poolside, 500-person capacity, Grand Banquet, Valet Parking', price:'Starting at ₹50,000 / day', pics:['https://dummyimage.com/600x400/1a1a1a/d4af37&text=Venue']},
    {id:'v2', name:'Grand Heritage Hotel', location:'Station Road, Sikar', attractions:'AC Halls, 300-person capacity, In-house Catering, Premium Suites', price:'Starting at ₹35,000 / day', pics:['https://dummyimage.com/600x400/1a1a1a/d4af37&text=Venue']},
    {id:'v3', name:'The Oasis Resort', location:'Highway 11, Fatehpur', attractions:'Lush Green Lawns, 1000+ person capacity, Open-air Stage, Kids Area', price:'Starting at ₹75,000 / day', pics:['https://dummyimage.com/600x400/1a1a1a/d4af37&text=Venue']}
  ],
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
  ],
  features: {
    pdfQuotesEnabled: true,
    calculatorEnabled: true,
    aiAssistantEnabled: false
  },
  calculatorRules: {
    guestsPerWaiter: 25,
    guestsPerCook: 100,
    guestsPerSecurity: 200
  },
  pdfSettings: {
    headerTitle: 'Rivaaz - Event Estimate',
    termsNote: 'Valid for 7 days. Subject to staff availability.'
  },
  aiSettings: {
    apiKey: '',
    promptContext: 'You are the AI Assistant for Rivaaz Event Management in Laxmangarh/Sikar.'
  }
};

let siteData = JSON.parse(JSON.stringify(DEFAULT_DATA));

// Forcefully patch localStorage synchronously to prevent race conditions on initial page load
let localStr = null;
try {
  localStr = localStorage.getItem(STORAGE_KEY);
} catch(e) {}
if (localStr) {
  try {
    let parsed = JSON.parse(localStr);
    let changed = false;
    
    if (!parsed.venues || parsed.venues.length === 0) {
        parsed.venues = DEFAULT_DATA.venues;
        changed = true;
    }
    if (!parsed.professionals || parsed.professionals.length < 18) {
      parsed.professionals = DEFAULT_DATA.professionals;
      changed = true;
    }
    if (!parsed.categories || parsed.categories.length === 0) {
      parsed.categories = DEFAULT_DATA.categories;
      changed = true;
    }
    if (!parsed.testimonials || parsed.testimonials.length === 0) {
      parsed.testimonials = DEFAULT_DATA.testimonials;
      changed = true;
    }
    if (!parsed.hero || !parsed.hero.title) {
      parsed.hero = DEFAULT_DATA.hero;
      changed = true;
    }
    if (!parsed.whatsappNumber) {
      parsed.whatsappNumber = DEFAULT_DATA.whatsappNumber;
      changed = true;
    }
    if (!parsed.features) {
      parsed.features = DEFAULT_DATA.features;
      changed = true;
    }
    if (!parsed.calculatorRules) {
      parsed.calculatorRules = DEFAULT_DATA.calculatorRules;
      changed = true;
    }
    if (!parsed.pdfSettings) {
      parsed.pdfSettings = DEFAULT_DATA.pdfSettings;
      changed = true;
    }
    if (!parsed.aiSettings) {
      parsed.aiSettings = DEFAULT_DATA.aiSettings;
      changed = true;
    }
    
    if (changed) {
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed)); } catch(e) {}
    }
    siteData = parsed;
  } catch(e) {}
} else {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_DATA)); } catch(e) {}
}

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
  renderSkeletons();
  renderAll(); // site is usable immediately with defaults, storage load is a background upgrade

  try{
    const res = await withRetry(()=>window.storage.get(STORAGE_KEY, true));
    if(res && res.value){
      let loadedData = JSON.parse(res.value);
      if (!loadedData.professionals || loadedData.professionals.length < 18) {
        loadedData.professionals = DEFAULT_DATA.professionals;
      }
      if (!loadedData.venues || loadedData.venues.length === 0) {
        loadedData.venues = DEFAULT_DATA.venues;
      }
      if (!loadedData.categories || loadedData.categories.length === 0) {
        loadedData.categories = DEFAULT_DATA.categories;
      }
      if (!loadedData.testimonials || loadedData.testimonials.length === 0) {
        loadedData.testimonials = DEFAULT_DATA.testimonials;
      }
      if (!loadedData.hero || !loadedData.hero.title) {
        loadedData.hero = DEFAULT_DATA.hero;
      }
      if (!loadedData.whatsappNumber) {
        loadedData.whatsappNumber = DEFAULT_DATA.whatsappNumber;
      }
      if (!loadedData.features) {
        loadedData.features = DEFAULT_DATA.features;
      }
      if (!loadedData.calculatorRules) {
        loadedData.calculatorRules = DEFAULT_DATA.calculatorRules;
      }
      if (!loadedData.pdfSettings) {
        loadedData.pdfSettings = DEFAULT_DATA.pdfSettings;
      }
      if (!loadedData.aiSettings) {
        loadedData.aiSettings = DEFAULT_DATA.aiSettings;
      }
      siteData = loadedData;
      saveSite();
      renderAll();
      renderAdminPros();
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


// Helpers for Shimmer Loading Skeletons
function renderSkeletons() {
  const catGrid = document.getElementById('catGrid');
  if (catGrid && catGrid.children.length === 0) {
    catGrid.innerHTML = Array(6).fill(0).map(() => `
      <div class="skeleton-card">
        <div class="skeleton-line" style="width: 42px; height: 42px; border-radius: 8px;"></div>
        <div class="skeleton-line skeleton-title"></div>
        <div class="skeleton-line skeleton-subtitle"></div>
      </div>
    `).join('');
  }

  const proRow = document.getElementById('proRow');
  if (proRow && proRow.children.length === 0) {
    proRow.innerHTML = Array(6).fill(0).map(() => `
      <div class="skeleton-card">
        <div style="display: flex; gap: 16px; align-items: flex-start;">
          <div class="skeleton-line skeleton-avatar"></div>
          <div style="flex: 1; display: flex; flex-direction: column; gap: 8px;">
            <div class="skeleton-line skeleton-title"></div>
            <div class="skeleton-line skeleton-subtitle"></div>
            <div class="skeleton-line skeleton-text"></div>
          </div>
        </div>
        <div class="skeleton-line skeleton-btn"></div>
      </div>
    `).join('');
  }

  const venueGrid = document.getElementById('venueGrid');
  if (venueGrid && venueGrid.children.length === 0) {
    venueGrid.innerHTML = Array(3).fill(0).map(() => `
      <div class="skeleton-card" style="padding: 16px;">
        <div class="skeleton-line skeleton-venue-img"></div>
        <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 14px;">
          <div class="skeleton-line skeleton-title"></div>
          <div class="skeleton-line skeleton-subtitle"></div>
          <div class="skeleton-line skeleton-text"></div>
          <div class="skeleton-line skeleton-btn"></div>
        </div>
      </div>
    `).join('');
  }
}

// Function to resolve recipient WhatsApp number dynamically
function getActiveWaNumber() {
  const raw = (siteData && siteData.whatsappNumber) ? siteData.whatsappNumber : '6376213281';
  const clean = raw.replace(/[^0-9]/g, '');
  if (clean.length === 10) return '91' + clean;
  return clean || '916376213281';
}

function updateFloatWaLinks() {
  const waNumber = getActiveWaNumber();
  const floatWaBtns = document.querySelectorAll('.float-wa');
  floatWaBtns.forEach(btn => {
    btn.href = `https://wa.me/${waNumber}?text=${encodeURIComponent('Hi Rivaaz team, mujhe kuch help chahiye!')}`;
  });
}

// Helper to push leads asynchronously to Google Sheets Webhook without blocking the UI
async function syncLeadToCloud(leadData) {
  if (!GOOGLE_SHEETS_WEBHOOK_URL) return;
  try {
    await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(leadData)
    });
    console.log('Lead synced to cloud webhook successfully');
  } catch (err) {
    console.warn('Could not sync lead to cloud webhook:', err);
  }
}

// Render Venues (Public)
function renderVenues() {
  const vList = document.getElementById('venueGrid');
  if (!vList) return;
  vList.innerHTML = siteData.venues.map(v => {
    let imagesHtml = '';
    if (v.pics && v.pics.length > 0) {
      imagesHtml = `
        <div style="display: flex; overflow-x: auto; scroll-snap-type: x mandatory; -webkit-overflow-scrolling: touch; scrollbar-width: none; gap: 4px; height: 250px; background: #111;">
          ${v.pics.map(pic => `
            <img src="${pic}" alt="Venue" style="flex: 0 0 100%; width: 100%; height: 100%; object-fit: cover; scroll-snap-align: start;">
          `).join('')}
        </div>
        ${v.pics.length > 1 ? `<div style="position:absolute; top: 12px; right: 12px; background: rgba(0,0,0,0.6); color: #fff; padding: 4px 8px; border-radius: 12px; font-size: 0.8rem; backdrop-filter: blur(4px);">1 / ${v.pics.length} 📸</div>` : ''}
      `;
    } else if (v.pic) { // fallback for legacy data
      imagesHtml = `<img src="${v.pic}" alt="Venue" style="width: 100%; height: 250px; object-fit: cover;">`;
    }

    return `
    <div style="background: var(--ink-soft); border: 1px solid rgba(212, 175, 55, 0.1); border-radius: 12px; overflow: hidden; display: flex; flex-direction: column; position: relative;">
      ${imagesHtml}
      <div style="padding: 24px; display: flex; flex-direction: column; flex-grow: 1;">
        <h3 style="margin-bottom: 8px; color: var(--gold); font-size: 1.5rem;">${v.name}</h3>
        <p style="color: rgba(255,255,255,0.7); font-size: 0.9rem; margin-bottom: 16px; display: flex; align-items: center; gap: 6px;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
          ${v.location}
        </p>
        <div style="margin-bottom: 20px; font-size: 0.95rem;">
          <strong style="color: #fff;">Highlights:</strong> ${v.attractions}
        </div>
        <div style="margin-bottom: 24px; font-weight: 600; font-size: 1.1rem; color: #fff;">
          ${v.price}
        </div>
        <a href="book.html" class="btn" style="margin-top: auto; text-align: center;">Inquire Now</a>
      </div>
    </div>
  `}).join('');

  // Add scroll event listener to update the image counter
  document.querySelectorAll('#venueGrid > div').forEach(card => {
    const scrollContainer = card.querySelector('div[style*="overflow-x: auto"]');
    const counter = card.querySelector('div[style*="top: 12px"]');
    if(scrollContainer && counter) {
      scrollContainer.addEventListener('scroll', () => {
        const index = Math.round(scrollContainer.scrollLeft / scrollContainer.clientWidth) + 1;
        const total = scrollContainer.querySelectorAll('img').length;
        counter.innerHTML = `${index} / ${total} 📸`;
      });
    }
  });
}

function renderAll(){
  renderHero(); renderCategories(); renderProfessionals(); renderTestimonials(); renderVenues(); updateFloatWaLinks(); }

function renderHero(){
  if(!document.getElementById('heroTitle')) return;
  document.getElementById('heroTitle').innerHTML = `${siteData.hero.title} <em>${siteData.hero.highlight}</em>`;
  document.getElementById('heroSub').textContent = siteData.hero.sub;
}
function renderCategories(filterList = null){
  if(!document.getElementById('catGrid')) return;
  const grid = document.getElementById('catGrid');
  const select = document.getElementById('heroServiceSelect');
  grid.innerHTML='';
  if (select && select.children.length <= 1) {
    select.innerHTML='<option value="">Koi bhi service</option>';
  }
  const catsToRender = filterList || siteData.categories;
  if(document.getElementById('statCount')) document.getElementById('statCount').textContent = siteData.categories.length + '+';

  if (catsToRender.length === 0) {
    grid.innerHTML = '<div style="grid-column: 1 / -1; text-align: center; color: var(--ivory-dim); padding: 40px 20px;">Koi matching category nahi mili. Dobara search karein.</div>';
    return;
  }

  catsToRender.forEach(c=>{
    const card=document.createElement('div'); card.className='cat-card';
    card.innerHTML=`<svg class="cat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="${c.icon}"/></svg><h3>${c.name}</h3><div class="rate">Starting <b>${c.rate}</b></div>`;
    card.addEventListener('click', ()=>openBooking(c.name));
    grid.appendChild(card);
    if(select && !filterList) {
      const opt=document.createElement('option'); opt.value=c.name; opt.textContent=c.name; select.appendChild(opt);
    }
  });
}
function renderProfessionals(filterList = null){
  if(!document.getElementById('proRow')) return;
  const row=document.getElementById('proRow'); row.innerHTML='';
  const prosToRender = filterList || siteData.professionals;

  if (prosToRender.length === 0) {
    row.innerHTML = '<div style="width:100%; text-align:center; color:var(--ivory-dim); padding:40px 20px;">Koi matching professional nahi mila.</div>';
    return;
  }

  prosToRender.forEach((p,i)=>{
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
        <a href="tel:+${getActiveWaNumber()}" class="action-btn btn-call" onclick="event.stopPropagation()">📞 Call</a>
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
  const service = document.getElementById('heroServiceSelect').value;
  const city = document.getElementById('heroCity').value;
  const date = document.getElementById('heroDate').value;

  if (service && document.getElementById('catGrid')) {
    // Perform fuzzy search highlight on current page
    const matchedCats = searchWithFuzzy(service, siteData.categories, ['name']);
    renderCategories(matchedCats);
    const catSection = document.getElementById('categories');
    if (catSection) catSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    return;
  }

  if(document.getElementById('bookingFormWrap')) {
    openBooking(service);
    if(document.getElementById('bkCity')) document.getElementById('bkCity').value = city;
    if(document.getElementById('bkDate')) document.getElementById('bkDate').value = date;
  } else {
    let url = 'book.html?';
    if(service) url += 'service=' + encodeURIComponent(service);
    if(city) url += (url.endsWith('?') ? '' : '&') + 'city=' + encodeURIComponent(city);
    if(date) url += (url.endsWith('?') ? '' : '&') + 'date=' + encodeURIComponent(date);
    window.location.href = url;
  }
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
  if(!document.getElementById('bkName')) return;
  const name=document.getElementById('bkName').value.trim();
  const phone=document.getElementById('bkPhone').value.trim();
  const city=document.getElementById('bkCity').value.trim();
  if(!name||!phone||!city){ showToast('Naam, phone aur city zaroori hain.'); return; }
  if(!validateIndianPhone(phone)){
    showToast('Kripya valid 10-digit Indian phone number daalein.');
    const el = document.getElementById('bkPhone');
    if(el) { el.classList.remove('phone-valid'); el.classList.add('phone-invalid'); el.focus(); }
    return;
  }
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

  // Dynamic WhatsApp destination number resolved from siteData
  const waNumber = getActiveWaNumber();

  // Non-blocking sync to cloud webhook
  syncLeadToCloud(lead);

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

  // Bind success modal PDF download if enabled
  const successPdfBtn = document.getElementById('successDownloadPdfBtn');
  if(successPdfBtn) {
    if(siteData.features && siteData.features.pdfQuotesEnabled) {
      successPdfBtn.style.display = 'block';
      successPdfBtn.onclick = () => generatePdfQuote(lead);
    } else {
      successPdfBtn.style.display = 'none';
    }
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
  if(!validateIndianPhone(phone)){
    showToast('Kripya valid 10-digit Indian phone number daalein.');
    const el = document.getElementById('vPhone');
    if(el) { el.classList.remove('phone-valid'); el.classList.add('phone-invalid'); el.focus(); }
    return;
  }
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

  // Dynamic WhatsApp destination number resolved from siteData
  const waNumber = getActiveWaNumber();

  // Non-blocking sync to cloud webhook
  syncLeadToCloud(v);

  const waLink = buildWaLink(waNumber, `Naya Professional Signup — Rivaaz\nNaam: ${v.name}\nPhone: ${v.phone}\nCity: ${v.city}\nCategory: ${v.category}\nExperience: ${v.exp||'-'} years`);
  if(waLink){
    // Automatically redirect to WhatsApp
    window.open(waLink, '_blank');

    const waBtn = document.getElementById('vendorWaBtn');
    if(waBtn) {
      waBtn.href = waLink; waBtn.style.display='block';
    }
    if(document.getElementById('vendorSuccessMsg')) {
      document.getElementById('vendorSuccessMsg').textContent = 'Aapko WhatsApp par redirect kiya ja raha hai... Agar nahi hua to neeche button dabayein.';
    }
  } else {
    const waBtn = document.getElementById('vendorWaBtn');
    if(waBtn) waBtn.style.display='none';
    if(document.getElementById('vendorSuccessMsg')) {
      document.getElementById('vendorSuccessMsg').textContent = 'Team jaldi contact karegi.';
    }
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
  if(val===ADMIN_PIN){
    closeModal('pinModal');
    document.getElementById('pinError').style.display='none';
    openAdmin();
  }
  else{ document.getElementById('pinError').style.display='block'; }
});
enableEnterSubmit('pinModal','pinSubmitBtn');
function openAdmin(){
  const adminOverlay = document.getElementById('adminOverlay');
  if(adminOverlay) {
    adminOverlay.style.display = 'block';
  }
  renderAdminCategories(); renderAdminPros(); renderAdminTesti(); renderAdminVenues(); renderAdminBookings(); renderAdminVendors();
  if(document.getElementById('adminWhatsapp')){
    document.getElementById('adminWhatsapp').value=siteData.whatsappNumber||'';
    document.getElementById('adminHeroTitle').value=siteData.hero.title;
    document.getElementById('adminHeroHighlight').value=siteData.hero.highlight;
    document.getElementById('adminHeroSub').value=siteData.hero.sub;

    // Feature Toggles
    if(document.getElementById('adminFeaturePdf')) {
      document.getElementById('adminFeaturePdf').checked = !!(siteData.features && siteData.features.pdfQuotesEnabled);
    }
    if(document.getElementById('adminFeatureCalc')) {
      document.getElementById('adminFeatureCalc').checked = !!(siteData.features && siteData.features.calculatorEnabled);
    }
    if(document.getElementById('adminFeatureAi')) {
      document.getElementById('adminFeatureAi').checked = !!(siteData.features && siteData.features.aiAssistantEnabled);
    }

    // Staffing Calculator Ratios
    if(document.getElementById('adminCalcGuestsPerWaiter')) {
      document.getElementById('adminCalcGuestsPerWaiter').value = (siteData.calculatorRules && siteData.calculatorRules.guestsPerWaiter) || 25;
    }
    if(document.getElementById('adminCalcGuestsPerCook')) {
      document.getElementById('adminCalcGuestsPerCook').value = (siteData.calculatorRules && siteData.calculatorRules.guestsPerCook) || 100;
    }
    if(document.getElementById('adminCalcGuestsPerSecurity')) {
      document.getElementById('adminCalcGuestsPerSecurity').value = (siteData.calculatorRules && siteData.calculatorRules.guestsPerSecurity) || 200;
    }

    // PDF Quote Settings
    if(document.getElementById('adminPdfTitle')) {
      document.getElementById('adminPdfTitle').value = (siteData.pdfSettings && siteData.pdfSettings.headerTitle) || '';
    }
    if(document.getElementById('adminPdfTerms')) {
      document.getElementById('adminPdfTerms').value = (siteData.pdfSettings && siteData.pdfSettings.termsNote) || '';
    }

    // AI Settings
    if(document.getElementById('adminAiApiKey')) {
      document.getElementById('adminAiApiKey').value = (siteData.aiSettings && siteData.aiSettings.apiKey) || '';
    }
    if(document.getElementById('adminAiContext')) {
      document.getElementById('adminAiContext').value = (siteData.aiSettings && siteData.aiSettings.promptContext) || '';
    }
  }
}
function closeAdmin(){
  const adminOverlay = document.getElementById('adminOverlay');
  if(adminOverlay) adminOverlay.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
  if (window.location.pathname.includes('admin.html') || window.location.pathname.includes('admin')) {
      if (document.getElementById('adminOverlay')) document.getElementById('adminOverlay').style.display = 'none';
      openModal('pinModal');
  }
});
document.querySelectorAll('.admin-tab').forEach(tab=>{
  tab.addEventListener('click', ()=>{
    document.querySelectorAll('.admin-tab').forEach(t=>t.classList.remove('active'));
    document.querySelectorAll('.admin-section').forEach(s=>s.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(tab.dataset.target).classList.add('active');
  });
});

/* Admin: Categories */

// -----------------------------------------------------
// Admin Venue Logic
// -----------------------------------------------------
let editingVenueId = null;
let uploadedVenueBase64Pics = [];

function renderAdminVenues() {
  const vList = document.getElementById('adminVenueList');
  if(!vList) return;
  if(!siteData.venues || siteData.venues.length === 0) {
    vList.innerHTML = '<p style="color:#888;">Koi venue nahi hai.</p>';
    return;
  }
  
  vList.innerHTML = siteData.venues.map(v => `
    <div class="admin-list-item">
      <div>
        <div style="font-weight:600;">${v.name}</div>
        <div style="font-size:0.8rem; color:var(--ivory-dim);">${v.location} | ${v.price}</div>
      </div>
      <div>
        <button class="btn" style="padding:4px 10px; font-size:0.8rem; margin-right:5px;" onclick="addOrEditVenueForm('${v.id}')">Edit</button>
        <button class="btn btn-ghost" style="padding:4px 10px; font-size:0.8rem; color:#ff4444;" onclick="deleteVenue('${v.id}')">Delete</button>
      </div>
    </div>
  `).join('');
}

window.addOrEditVenueForm = function(id = null) {
  editingVenueId = id;
  uploadedVenueBase64Pics = [];
  const venueFileInput = document.getElementById('venueFileInput');
  if (venueFileInput) venueFileInput.value = '';
  const venueImagePreview = document.getElementById('venueImagePreview');
  if (venueImagePreview) venueImagePreview.innerHTML = '';

  if(id) {
    const v = siteData.venues.find(x => x.id === id);
    document.getElementById('venueFormTitle').textContent = 'Edit Venue';
    document.getElementById('venueFormName').value = v.name;
    document.getElementById('venueFormLoc').value = v.location;
    document.getElementById('venueFormAttr').value = v.attractions;
    document.getElementById('venueFormPrice').value = v.price;
    document.getElementById('venueFormPic').value = v.pics ? v.pics.join('\n') : (v.pic ? v.pic : '');
  } else {
    document.getElementById('venueFormTitle').textContent = 'Naya Venue';
    document.getElementById('venueFormName').value = '';
    document.getElementById('venueFormLoc').value = '';
    document.getElementById('venueFormAttr').value = '';
    document.getElementById('venueFormPrice').value = '';
    document.getElementById('venueFormPic').value = '';
  }
  openModal('venueModal');
};

document.getElementById('venueSubmitBtn')?.addEventListener('click', () => {
  const name = document.getElementById('venueFormName').value.trim();
  const location = document.getElementById('venueFormLoc').value.trim();
  const attractions = document.getElementById('venueFormAttr').value.trim();
  const price = document.getElementById('venueFormPrice').value.trim();
  const picRaw = document.getElementById('venueFormPic').value;

  let urlPics = picRaw.split('\n').map(l => l.trim()).filter(l => l !== '');
  let pics = [...uploadedVenueBase64Pics, ...urlPics].slice(0, 20);
  if (pics.length === 0) pics = ['https://dummyimage.com/600x400/1a1a1a/d4af37&text=Venue'];

  if(!name || !location || !price) {
    alert('Naam, Location, aur Price zaroori hain!');
    return;
  }

  if(editingVenueId) {
    const idx = siteData.venues.findIndex(x => x.id === editingVenueId);
    if(idx > -1) {
      siteData.venues[idx] = { id: editingVenueId, name, location, attractions, price, pics };
    }
  } else {
    siteData.venues.push({ id: 'v' + Date.now(), name, location, attractions, price, pics });
  }

  saveSite();
  renderAdminVenues();
  if(typeof renderVenues === 'function') renderVenues();
  closeModal('venueModal');
  showToast('Saved!');
});

const venueFileInput = document.getElementById('venueFileInput');
if (venueFileInput) {
  venueFileInput.addEventListener('change', async (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 20) {
      alert('You can only upload up to 20 images at a time.');
      return;
    }
    uploadedVenueBase64Pics = [];
    const venueImagePreview = document.getElementById('venueImagePreview');
    venueImagePreview.innerHTML = '<span style="color:var(--gold); font-size:0.85rem;">Processing & compressing images...</span>';

    try {
      const compressedUrls = await Promise.all(files.map(file => {
        // If image compressor helper is available, compress & downscale to max 1080px / 0.7 quality
        if (file.type && file.type.startsWith('image/')) {
          return compressAndConvertImage(file, 1080, 0.7);
        }
        return new Promise((res, rej) => {
          const reader = new FileReader();
          reader.onload = (ev) => res(ev.target.result);
          reader.onerror = rej;
          reader.readAsDataURL(file);
        });
      }));

      uploadedVenueBase64Pics = compressedUrls;
      venueImagePreview.innerHTML = '';
      compressedUrls.forEach(base64Str => {
        const img = document.createElement('img');
        img.src = base64Str;
        img.style.height = '60px';
        img.style.borderRadius = '4px';
        img.style.objectFit = 'cover';
        venueImagePreview.appendChild(img);
      });
    } catch(err) {
      console.error('Image compression failed:', err);
      venueImagePreview.innerHTML = '<span style="color:#e66; font-size:0.85rem;">Image compression failed. Please try again.</span>';
    }
  });
}

window.deleteVenue = function(id) {
  if(confirm('Kudratan delete karna chahte hain?')) {
    siteData.venues = siteData.venues.filter(x => x.id !== id);
    saveSite(); renderAdminVenues(); 
    if(typeof renderVenues === 'function') renderVenues();
    showToast('Deleted!');
  }
};

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

/* Admin: Hero & Features Settings */
const heroSubmitBtnEl = document.getElementById('heroSubmitBtn');
if(heroSubmitBtnEl) heroSubmitBtnEl.addEventListener('click', async()=>{
  siteData.whatsappNumber=document.getElementById('adminWhatsapp').value.trim();
  siteData.hero.title=document.getElementById('adminHeroTitle').value;
  siteData.hero.highlight=document.getElementById('adminHeroHighlight').value;
  siteData.hero.sub=document.getElementById('adminHeroSub').value;

  // Save Feature Toggles
  if(document.getElementById('adminFeaturePdf')) {
    siteData.features.pdfQuotesEnabled = document.getElementById('adminFeaturePdf').checked;
  }
  if(document.getElementById('adminFeatureCalc')) {
    siteData.features.calculatorEnabled = document.getElementById('adminFeatureCalc').checked;
  }
  if(document.getElementById('adminFeatureAi')) {
    siteData.features.aiAssistantEnabled = document.getElementById('adminFeatureAi').checked;
  }

  // Save Calculator Rules
  if(document.getElementById('adminCalcGuestsPerWaiter')) {
    const val = parseInt(document.getElementById('adminCalcGuestsPerWaiter').value, 10);
    if(val > 0) siteData.calculatorRules.guestsPerWaiter = val;
  }
  if(document.getElementById('adminCalcGuestsPerCook')) {
    const val = parseInt(document.getElementById('adminCalcGuestsPerCook').value, 10);
    if(val > 0) siteData.calculatorRules.guestsPerCook = val;
  }
  if(document.getElementById('adminCalcGuestsPerSecurity')) {
    const val = parseInt(document.getElementById('adminCalcGuestsPerSecurity').value, 10);
    if(val > 0) siteData.calculatorRules.guestsPerSecurity = val;
  }

  // Save PDF Settings
  if(document.getElementById('adminPdfTitle')) {
    siteData.pdfSettings.headerTitle = document.getElementById('adminPdfTitle').value.trim() || 'Rivaaz - Event Estimate';
  }
  if(document.getElementById('adminPdfTerms')) {
    siteData.pdfSettings.termsNote = document.getElementById('adminPdfTerms').value.trim();
  }

  // Save AI Settings
  if(document.getElementById('adminAiApiKey')) {
    siteData.aiSettings.apiKey = document.getElementById('adminAiApiKey').value.trim();
  }
  if(document.getElementById('adminAiContext')) {
    siteData.aiSettings.promptContext = document.getElementById('adminAiContext').value.trim();
  }

  await saveSite();
  renderHero();
  updateFloatWaLinks();
  initStaffingCalculator();
  initPdfQuoteUI();
  initAiAssistant();
  showToast('Saved Settings & Automation Rules!');
});

/* Admin: Leads */
function renderAdminBookings(){
  if(!document.getElementById('adminBookingsList')) return;
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
  if(!document.getElementById('adminVendorsList')) return;
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

const menuToggle = document.querySelector('.menu-toggle');
if (menuToggle) {
  menuToggle.addEventListener('click', ()=>{
    const navEl=document.querySelector('.nav-links');
    const isOpen = navEl.style.display==='flex';
    navEl.style.display = isOpen ? 'none' : 'flex';
    navEl.style.cssText += 'flex-direction:column; position:absolute; top:64px; right:20px; background:#1F1811; padding:20px 30px; border:1px solid rgba(201,162,75,0.28); gap:18px;';
  });
}

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
    if (heroDate && heroUrgent) {
      if (heroUrgent.checked) {
        heroDate.min = todayStr; // Can book today or tomorrow
      } else {
        heroDate.min = minStandardStr; // Must book 3+ days in advance
        if (heroDate.value && heroDate.value < minStandardStr) heroDate.value = '';
      }
      heroDate.max = maxStr;
    }

    // Apply logic to Booking Modal
    if (bkDate && bkUrgent) {
      if (bkUrgent.checked) {
        bkDate.min = todayStr;
      } else {
        bkDate.min = minStandardStr;
        if (bkDate.value && bkDate.value < minStandardStr) bkDate.value = '';
      }
      bkDate.max = maxStr;
    }
  }

  // Run on load
  setCalendarLimits();

  // Run whenever the Urgent checkboxes are clicked
  if (heroUrgent) heroUrgent.addEventListener('change', setCalendarLimits);
  if (bkUrgent) bkUrgent.addEventListener('change', setCalendarLimits);
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


/**
 * =====================================================================
 * FEATURE IMPLEMENTATIONS & AUTOMATIONS
 * =====================================================================
 */

/**
 * Feature 5: Indian Phone & Spam Validation
 * Enforces valid 10-digit Indian mobile formats (/^[6-9]\d{9}$/)
 * and filters repetitive spam patterns (9999999999, 1234567890, 0123456789).
 */
function validateIndianPhone(phone) {
  if (!phone) return false;
  const clean = String(phone).replace(/[\s\-\+\(\)]/g, '').replace(/^91/, '');
  if (!/^[6-9]\d{9}$/.test(clean)) return false;

  // Reject all identical digits (e.g. 9999999999, 8888888888)
  if (/^(\d)\1{9}$/.test(clean)) return false;

  // Reject obvious sequential spam
  const spamSequences = [
    '1234567890', '0123456789', '9876543210', '0987654321',
    '6789012345', '7890123456', '8901234567'
  ];
  if (spamSequences.includes(clean)) return false;

  return true;
}

function initPhoneValidationUI() {
  const phoneInputs = document.querySelectorAll('input[type="tel"], #bkPhone, #vPhone, #proFormPhone');
  phoneInputs.forEach(input => {
    const handleValidation = () => {
      const val = input.value.trim();
      if (!val) {
        input.classList.remove('phone-valid', 'phone-invalid');
        return;
      }
      if (validateIndianPhone(val)) {
        input.classList.add('phone-valid');
        input.classList.remove('phone-invalid');
      } else {
        input.classList.add('phone-invalid');
        input.classList.remove('phone-valid');
      }
    };
    input.removeEventListener('input', input._phoneValHandler);
    input._phoneValHandler = handleValidation;
    input.addEventListener('input', handleValidation);
    input.addEventListener('blur', handleValidation);
  });
}

/**
 * Feature 1: Toggleable & Customizable PDF Quote Generator
 * Generates an elegant gold-and-black luxury PDF estimate quote.
 */
function generatePdfQuote(customData = null) {
  if (typeof window.jspdf === 'undefined' || !window.jspdf.jsPDF) {
    alert('PDF library is loading. Please check your internet connection.');
    return;
  }
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  // Resolve booking data from form or arguments
  const service = customData && customData.service ? customData.service : (document.getElementById('bkService')?.value || 'Event Service');
  const name = customData && customData.name ? customData.name : (document.getElementById('bkName')?.value || 'Valued Client');
  const phone = customData && customData.phone ? customData.phone : (document.getElementById('bkPhone')?.value || '-');
  const city = customData && customData.city ? customData.city : (document.getElementById('bkCity')?.value || 'Laxmangarh');
  const date = customData && customData.date ? customData.date : (document.getElementById('bkDate')?.value || 'Upcoming Event');
  const notes = customData && customData.notes ? customData.notes : (document.getElementById('bkNotes')?.value || 'Standard booking specifications.');

  // Find matching service rate
  const matchedCat = siteData.categories?.find(c => c.name.toLowerCase() === service.toLowerCase());
  const rateText = matchedCat ? matchedCat.rate : 'Standard Event Tariffs Apply';

  const headerTitle = (siteData.pdfSettings && siteData.pdfSettings.headerTitle) || 'Rivaaz - Event Estimate';
  const termsNote = (siteData.pdfSettings && siteData.pdfSettings.termsNote) || 'Valid for 7 days. Subject to staff availability.';

  // Palette: Dark ink #0D0B08, Luxury Gold #D4AF37, Accent #8A6D1F, Ivory #FAF7F0
  // Background Fill
  doc.setFillColor(13, 11, 8);
  doc.rect(0, 0, 210, 297, 'F');

  // Outer Gold Decorative Border
  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(0.8);
  doc.rect(10, 10, 190, 277);

  // Inner Subtle Border
  doc.setDrawColor(138, 109, 31);
  doc.setLineWidth(0.2);
  doc.rect(13, 13, 184, 271);

  // Top Header Brand
  doc.setTextColor(212, 175, 55);
  doc.setFontSize(26);
  doc.setFont('helvetica', 'bold');
  doc.text('RIVAAZ', 20, 28);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(250, 247, 240);
  doc.text('HAR MEHFIL KE LIYE · THE AK GROUP', 20, 34);

  // Header Title Right-aligned
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(212, 175, 55);
  doc.text(headerTitle.toUpperCase(), 190, 28, { align: 'right' });

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(180, 180, 180);
  doc.text(`Estimate Date: ${new Date().toLocaleDateString('en-IN')}`, 190, 34, { align: 'right' });

  // Gold Divider Line
  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(0.5);
  doc.line(20, 40, 190, 40);

  // Client Details Card Box
  doc.setFillColor(24, 20, 15);
  doc.rect(20, 46, 170, 36, 'F');
  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(0.2);
  doc.rect(20, 46, 170, 36);

  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(212, 175, 55);
  doc.text('RECIPIENT & EVENT DETAILS', 26, 54);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(250, 247, 240);
  doc.text(`Client Name: ${name}`, 26, 62);
  doc.text(`Contact: ${phone}`, 26, 68);
  doc.text(`Event City: ${city}`, 26, 74);

  doc.text(`Event Date: ${date}`, 110, 62);
  doc.text(`Requested Service: ${service}`, 110, 68);
  doc.text(`Booking Ref: RVZ-${Date.now().toString().slice(-6)}`, 110, 74);

  // Itemized Estimate Table Header
  const tableY = 94;
  doc.setFillColor(212, 175, 55);
  doc.rect(20, tableY, 170, 9, 'F');

  doc.setTextColor(13, 11, 8);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('ITEM / SERVICE SPECIFICATION', 24, tableY + 6);
  doc.text('LOCATION', 120, tableY + 6);
  doc.text('BASE TARIFF', 165, tableY + 6);

  // Table Row 1
  const row1Y = tableY + 9;
  doc.setFillColor(18, 15, 11);
  doc.rect(20, row1Y, 170, 18, 'F');
  doc.setDrawColor(60, 50, 30);
  doc.setLineWidth(0.2);
  doc.rect(20, row1Y, 170, 18);

  doc.setTextColor(250, 247, 240);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text(service, 24, row1Y + 7);

  doc.setFontSize(8);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(180, 170, 150);
  doc.text('Professional staff member, verified & trained by AK Group', 24, row1Y + 13);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(250, 247, 240);
  doc.text(city, 120, row1Y + 9);
  doc.setTextColor(212, 175, 55);
  doc.setFont('helvetica', 'bold');
  doc.text(rateText, 165, row1Y + 9);

  // Additional Specifications / Notes Row
  const notesBoxY = 130;
  doc.setFillColor(24, 20, 15);
  doc.rect(20, notesBoxY, 170, 30, 'F');
  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(0.2);
  doc.rect(20, notesBoxY, 170, 30);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(212, 175, 55);
  doc.text('CLIENT SPECIFICATIONS & EVENT NOTES', 26, notesBoxY + 8);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(230, 230, 230);
  const splitNotes = doc.splitTextToSize(notes || 'No extra notes provided. Standard dispatch.', 160);
  doc.text(splitNotes, 26, notesBoxY + 16);

  // Terms and Conditions Box
  const termsY = 172;
  doc.setFillColor(18, 15, 11);
  doc.rect(20, termsY, 170, 40, 'F');
  doc.setDrawColor(138, 109, 31);
  doc.setLineWidth(0.2);
  doc.rect(20, termsY, 170, 40);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(212, 175, 55);
  doc.text('TERMS OF SERVICE & BOOKING POLICIES', 26, termsY + 8);

  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(200, 200, 200);
  doc.text(`1. ${termsNote}`, 26, termsY + 16);
  doc.text('2. All staff members are strictly verified, background-checked, and insured.', 26, termsY + 22);
  doc.text('3. Overtime hours exceeding booked slots will be prorated according to standard category rates.', 26, termsY + 28);
  doc.text('4. Official confirmation occurs upon advance booking sync via Rivaaz WhatsApp dispatch.', 26, termsY + 34);

  // Footer / Contact signature
  const footerY = 250;
  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(0.3);
  doc.line(20, footerY, 190, footerY);

  doc.setTextColor(212, 175, 55);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('RIVAAZ EVENT MANAGEMENT', 20, footerY + 8);

  doc.setTextColor(180, 180, 180);
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.text(`Laxmangarh, Sikar, Rajasthan · WhatsApp: +${getActiveWaNumber()} | +91 9460825584 | +91 9460835584`, 20, footerY + 14);
  doc.text('Web: www.rivaaz.work.gd · Email: contact@rivaaz.work.gd', 20, footerY + 20);

  doc.setTextColor(212, 175, 55);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('AUTHORIZED DISPATCH', 190, footerY + 10, { align: 'right' });
  doc.setFontSize(8);
  doc.setTextColor(180, 180, 180);
  doc.setFont('helvetica', 'normal');
  doc.text('Digitally generated official estimate', 190, footerY + 16, { align: 'right' });

  // Save the generated PDF
  const filename = `Rivaaz_Quote_${(name || 'Customer').replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;
  doc.save(filename);
  showToast('PDF Quote generated successfully!');
}

function initPdfQuoteUI() {
  const isEnabled = siteData.features && siteData.features.pdfQuotesEnabled;
  const downloadPdfBtn = document.getElementById('downloadPdfBtn');
  if (downloadPdfBtn) {
    if (isEnabled) {
      downloadPdfBtn.style.display = 'block';
      downloadPdfBtn.onclick = () => {
        const phone = document.getElementById('bkPhone')?.value.trim();
        if (phone && !validateIndianPhone(phone)) {
          showToast('Kripya valid 10-digit phone number daalein PDF quote ke liye.');
          document.getElementById('bkPhone')?.focus();
          return;
        }
        generatePdfQuote();
      };
    } else {
      downloadPdfBtn.style.display = 'none';
    }
  }

  const successPdfBtn = document.getElementById('successDownloadPdfBtn');
  if (successPdfBtn) {
    successPdfBtn.style.display = isEnabled ? 'block' : 'none';
  }
}

/**
 * Feature 2: Toggleable & Adjustable Event Staffing Calculator
 * Dynamically computes waiters, cooks, and security guards based on siteData.calculatorRules.
 */
function initStaffingCalculator() {
  const calcSection = document.getElementById('staffingCalculatorSection');
  if (!calcSection) return;

  const isEnabled = siteData.features && siteData.features.calculatorEnabled;
  calcSection.style.display = isEnabled ? 'block' : 'none';
  if (!isEnabled) return;

  const guestInput = document.getElementById('calcGuestInput');
  const waitersEl = document.getElementById('calcWaiters');
  const cooksEl = document.getElementById('calcCooks');
  const securityEl = document.getElementById('calcSecurity');
  const applyBtn = document.getElementById('applyCalcBtn');

  const updateCalculations = () => {
    const guests = Math.max(1, parseInt(guestInput.value, 10) || 0);
    const rules = siteData.calculatorRules || { guestsPerWaiter: 25, guestsPerCook: 100, guestsPerSecurity: 200 };

    const waiters = Math.ceil(guests / (rules.guestsPerWaiter || 25));
    const cooks = Math.max(1, Math.ceil(guests / (rules.guestsPerCook || 100)));
    const security = Math.max(1, Math.ceil(guests / (rules.guestsPerSecurity || 200)));

    if (waitersEl) waitersEl.textContent = waiters;
    if (cooksEl) cooksEl.textContent = cooks;
    if (securityEl) securityEl.textContent = security;
  };

  if (guestInput) {
    guestInput.removeEventListener('input', guestInput._calcHandler);
    guestInput._calcHandler = updateCalculations;
    guestInput.addEventListener('input', updateCalculations);
    updateCalculations();
  }

  if (applyBtn) {
    applyBtn.onclick = () => {
      const guests = parseInt(guestInput?.value, 10) || 200;
      const waiters = waitersEl ? waitersEl.textContent : '8';
      const cooks = cooksEl ? cooksEl.textContent : '2';
      const security = securityEl ? securityEl.textContent : '1';
      const staffNotes = `Staff Recommendation for ${guests} guests: ${waiters} Waiters, ${cooks} Cooks, ${security} Security Guards.`;

      const bkNotes = document.getElementById('bkNotes');
      if (bkNotes) {
        bkNotes.value = (bkNotes.value ? bkNotes.value + '\n' : '') + staffNotes;
        bkNotes.scrollIntoView({ behavior: 'smooth', block: 'center' });
        showToast('Staff count applied to booking form!');
      } else {
        openBooking('Waiter', null);
        setTimeout(() => {
          const notesField = document.getElementById('bkNotes');
          if (notesField) {
            notesField.value = staffNotes;
            showToast('Staff count applied to booking form!');
          }
        }, 150);
      }
    };
  }
}

/**
 * Feature 3: Hinglish Fuzzy Search Engine
 * Uses Fuse.js (threshold: 0.4) to match Hinglish phonetic terms
 * (e.g. "vaiter", "cheff", "sekurity", "mehindi").
 */
function searchWithFuzzy(query, list, keys) {
  if (!query || !query.trim()) return list;
  if (typeof Fuse !== 'undefined') {
    const fuse = new Fuse(list, {
      keys: keys,
      threshold: 0.4,
      distance: 100,
      minMatchCharLength: 2,
      ignoreLocation: true
    });
    return fuse.search(query.trim()).map(r => r.item);
  }
  // Fallback to substring matching
  const q = query.toLowerCase().trim();
  return list.filter(item => {
    return keys.some(key => {
      const val = item[key];
      return typeof val === 'string' && val.toLowerCase().includes(q);
    });
  });
}

/**
 * Feature 6: Geo-Location Auto City Picker
 * Automatically selects the nearest regional city in dropdowns using navigator.geolocation.
 */
function autoDetectCity() {
  if (!navigator.geolocation) return;

  // Regional coordinates for supported towns
  const CITY_COORDS = [
    { name: 'Laxmangarh', lat: 27.8228, lon: 75.0253 },
    { name: 'Sikar', lat: 27.6094, lon: 75.1398 },
    { name: 'Salasar', lat: 27.7196, lon: 74.8327 },
    { name: 'Fatehpur', lat: 27.9839, lon: 74.9547 },
    { name: 'Nawalgarh', lat: 27.8504, lon: 75.2713 },
    { name: 'Mukundgarh', lat: 27.9472, lon: 75.2281 },
    { name: 'Dhod', lat: 27.5794, lon: 74.9658 },
    { name: 'Nechhwa', lat: 27.6322, lon: 74.8872 },
    { name: 'Ramgarh Shekhawati', lat: 28.1697, lon: 75.0315 },
    { name: 'Sujangarh', lat: 27.7011, lon: 74.4566 }
  ];

  navigator.geolocation.getCurrentPosition((pos) => {
    const userLat = pos.coords.latitude;
    const userLon = pos.coords.longitude;

    // Haversine formula to compute nearest city
    const toRad = deg => (deg * Math.PI) / 180;
    let minDistance = Infinity;
    let nearestCity = null;

    CITY_COORDS.forEach(c => {
      const dLat = toRad(c.lat - userLat);
      const dLon = toRad(c.lon - userLon);
      const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(toRad(userLat)) * Math.cos(toRad(c.lat)) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const dist = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      if (dist < minDistance) {
        minDistance = dist;
        nearestCity = c.name;
      }
    });

    if (nearestCity) {
      const citySelects = document.querySelectorAll('#heroCity, #bkCity, #vCity');
      citySelects.forEach(select => {
        // Only override if user hasn't selected another city yet
        if (select && select.value !== nearestCity) {
          select.value = nearestCity;
        }
      });
      console.log(`Auto-detected nearest city: ${nearestCity}`);
    }
  }, (err) => {
    // Permission denied or unavailable — quietly ignore
  }, { timeout: 8000, maximumAge: 3600000 });
}

/**
 * Feature 7: Toggleable AI Assistant Widget
 * Injects a floating AI Chatbot widget anchored at the bottom corner that connects
 * to Google Gemini 2.5 Flash API using siteData.aiSettings.
 */
let aiChatHistory = [];

function initAiAssistant() {
  const existingWidget = document.getElementById('rivaazAiWidget');
  const isEnabled = siteData.features && siteData.features.aiAssistantEnabled;
  const apiKey = (siteData.aiSettings && siteData.aiSettings.apiKey) ? siteData.aiSettings.apiKey.trim() : '';

  if (!isEnabled || !apiKey) {
    if (existingWidget) existingWidget.remove();
    return;
  }

  if (existingWidget) return; // Already initialized

  const widget = document.createElement('div');
  widget.id = 'rivaazAiWidget';
  widget.innerHTML = `
    <div class="ai-chat-window" id="aiChatWindow">
      <div class="ai-chat-header">
        <div style="display:flex; align-items:center; gap:8px;">
          <div style="width:10px; height:10px; border-radius:50%; background:#25D366; box-shadow:0 0 6px #25D366;"></div>
          <span>Rivaaz AI Assistant</span>
        </div>
        <button class="ai-chat-close" id="aiChatCloseBtn" aria-label="Close Chat">&times;</button>
      </div>
      <div class="ai-chat-messages" id="aiChatMessages">
        <div class="ai-msg ai-msg-bot">
          Namaste! Rivaaz Event Management mein aapka swagat hai. Main aapki kya madad kar sakta hoon?
        </div>
      </div>
      <div class="ai-chat-input-row">
        <input type="text" id="aiChatInput" placeholder="Apna sawaal likhein..." autocomplete="off">
        <button class="ai-chat-send" id="aiChatSendBtn" aria-label="Send Message">&#10148;</button>
      </div>
    </div>
    <button class="ai-fab-btn pulse" id="aiFabBtn" aria-label="Open AI Assistant">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
      <span>AI Help</span>
    </button>
  `;
  document.body.appendChild(widget);

  const fab = document.getElementById('aiFabBtn');
  const chatWindow = document.getElementById('aiChatWindow');
  const closeBtn = document.getElementById('aiChatCloseBtn');
  const inputEl = document.getElementById('aiChatInput');
  const sendBtn = document.getElementById('aiChatSendBtn');
  const messagesEl = document.getElementById('aiChatMessages');

  fab.addEventListener('click', () => {
    chatWindow.classList.toggle('active');
    if (chatWindow.classList.contains('active')) {
      inputEl.focus();
    }
  });

  closeBtn.addEventListener('click', () => {
    chatWindow.classList.remove('active');
  });

  const sendMessage = async () => {
    const text = inputEl.value.trim();
    if (!text) return;
    inputEl.value = '';

    // Append user message
    const userMsg = document.createElement('div');
    userMsg.className = 'ai-msg ai-msg-user';
    userMsg.textContent = text;
    messagesEl.appendChild(userMsg);
    messagesEl.scrollTop = messagesEl.scrollHeight;

    aiChatHistory.push({ role: 'user', parts: [{ text }] });

    // Append loading indicator
    const botLoading = document.createElement('div');
    botLoading.className = 'ai-msg ai-msg-bot';
    botLoading.innerHTML = '<span class="ai-typing">Soch raha hoon...</span>';
    messagesEl.appendChild(botLoading);
    messagesEl.scrollTop = messagesEl.scrollHeight;

    const systemContext = (siteData.aiSettings && siteData.aiSettings.promptContext) ||
      'You are the AI Assistant for Rivaaz Event Management in Laxmangarh/Sikar. Respond politely in natural Hinglish or Hindi. Keep answers helpful and concise.';

    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
      const payload = {
        contents: [
          { role: 'user', parts: [{ text: `System Instructions: ${systemContext}` }] },
          { role: 'model', parts: [{ text: 'Samajh gaya. Main Rivaaz Event Management ka AI Assistant hoon aur customers ki madad karne ke liye taiyar hoon.' }] },
          ...aiChatHistory
        ]
      };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Kshama karein, main abhi is sawaal ka uttar nahi de pa raha hoon. Kripya WhatsApp par contact karein.';

      botLoading.textContent = reply;
      aiChatHistory.push({ role: 'model', parts: [{ text: reply }] });
    } catch (err) {
      botLoading.textContent = 'Network error. Kripya hamari team se WhatsApp par connect karein: +' + getActiveWaNumber();
    }
    messagesEl.scrollTop = messagesEl.scrollHeight;
  };

  sendBtn.addEventListener('click', sendMessage);
  inputEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  });
}

// Master Automation Initialization on DOM Ready
window.addEventListener('DOMContentLoaded', () => {
  initPhoneValidationUI();
  initPdfQuoteUI();
  initStaffingCalculator();
  autoDetectCity();
  initAiAssistant();

  // Handle URL query parameters for booking form
  if(document.getElementById('bookingFormWrap')) {
    const params = new URLSearchParams(window.location.search);
    const service = params.get('service');
    const pro = params.get('pro');
    const city = params.get('city');
    const date = params.get('date');
    if(service && document.getElementById('bkService')) document.getElementById('bkService').value = service;
    if(pro && document.getElementById('bkNotes')) document.getElementById('bkNotes').value = 'Preferred professional: ' + pro;
    if(city && document.getElementById('bkCity')) document.getElementById('bkCity').value = city;
    if(date && document.getElementById('bkDate')) document.getElementById('bkDate').value = date;
  }
});
