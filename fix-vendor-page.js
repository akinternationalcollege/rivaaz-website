const fs = require('fs');
const file = 'C:/Users/ansh9/Downloads/Rivaaz-Website/index.html';
let html = fs.readFileSync(file, 'utf8');

// Replace the small modal with a massive, beautiful full-screen page overlay
const oldModal = /<!-- Vendor Signup Modal -->[\s\S]*?<!-- PIN Modal -->/;
const newModal = `<!-- Vendor Signup Full Page -->
<div class="modal-overlay" id="vendorModal" style="background:var(--ink); padding:0; align-items:flex-start; overflow-y:auto;">
  <div style="width:100%; min-height:100vh; background:var(--ink); position:relative;">
    
    <!-- Header -->
    <div style="padding:20px 28px; border-bottom:1px solid rgba(255,255,255,0.05); display:flex; justify-content:space-between; align-items:center; background:rgba(5,5,5,0.9); position:sticky; top:0; z-index:10; backdrop-filter:blur(20px);">
      <div class="logo">RIVAAZ<span>.</span></div>
      <button class="btn btn-secondary" onclick="closeModal('vendorModal')" style="padding:8px 16px; font-size:0.8rem; border-radius:100px;">✕ Wapas Jayein</button>
    </div>

    <!-- Content -->
    <div style="max-width:600px; margin:60px auto 100px; padding:0 28px;">
      <div id="vendorFormWrap">
        <span class="eyebrow" style="color:var(--gold-bright); display:block; margin-bottom:14px;">Join The Team</span>
        <h2 style="font-family:'Cormorant Garamond',serif; font-size:clamp(2.5rem,5vw,3.5rem); font-weight:700; color:var(--ivory); line-height:1.1; margin-bottom:16px;">Professional Ke Roop Mein Judein</h2>
        <p style="color:var(--ivory-dim); margin-bottom:40px; font-size:1.1rem; line-height:1.6;">Rivaaz ke saath judein aur apne shehar mein events par part-time ya full-time kaam paayein. Apni details neeche bharein.</p>
        
        <div id="vendorForm" style="background:var(--ink-card); padding:40px 30px; border-radius:24px; border:1px solid rgba(212,175,55,0.1); box-shadow:0 30px 60px rgba(0,0,0,0.5), inset 0 0 20px rgba(255,255,255,0.02);">
          <div class="field"><label>Aapka Pura Naam</label><input type="text" id="vName" required style="padding:14px; border-radius:8px;"></div>
          <div class="field"><label>Phone Number (WhatsApp)</label><input type="tel" id="vPhone" placeholder="91XXXXXXXXXX" required style="padding:14px; border-radius:8px;"></div>
          
          <div class="field"><label>City / Shehar</label><select id="vCity" required style="width:100%; background:var(--ink); border:1px solid var(--line); color:var(--ivory); padding:14px; border-radius:8px; font-family:'Manrope'; font-size:0.92rem; outline:none;">
            <option value="Laxmangarh">Laxmangarh</option>
            <option value="Sikar">Sikar</option>
            <option value="Salasar">Salasar</option>
            <option value="Fatehpur">Fatehpur</option>
            <option value="Nawalgarh">Nawalgarh</option>
            <option value="Mukundgarh">Mukundgarh</option>
            <option value="Dhod">Dhod</option>
            <option value="Nechhwa">Nechhwa</option>
            <option value="Ramgarh Shekhawati">Ramgarh Shekhawati</option>
            <option value="Sujangarh">Sujangarh</option>
          </select></div>
          
          <div class="field"><label>Aap Kya Kaam Karte Hain?</label><input type="text" id="vCategory" placeholder="Jaise: Waiter, Chef, Dancer, Mehndi..." required style="padding:14px; border-radius:8px;"></div>
          <div class="field"><label>Aapka Experience (Saal mein)</label><input type="text" id="vExp" placeholder="Jaise: 3 saal" style="padding:14px; border-radius:8px;"></div>
          
          <div class="form-actions" style="margin-top:30px;">
            <button type="button" class="btn btn-block" id="vendorSubmitBtn" style="font-size:1.1rem; padding:20px; font-weight:800; background:linear-gradient(135deg, var(--gold), #A68621); box-shadow:0 10px 20px var(--gold-glow);">Apply Now (WhatsApp par bhejein)</button>
          </div>
        </div>
      </div>
      
      <div id="vendorSuccessWrap" style="display:none; text-align:center; padding:60px 20px; background:var(--ink-card); border-radius:24px; border:1px solid rgba(37,211,102,0.2);">
        <div style="width:80px; height:80px; background:rgba(37,211,102,0.1); border-radius:50%; display:flex; align-items:center; justify-content:center; margin:0 auto 24px; color:#25D366;">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </div>
        <h3 style="color:var(--ivory); font-size:2rem; margin-bottom:16px; font-family:'Cormorant Garamond',serif;">Application Bhej Di Gayi!</h3>
        <p style="color:var(--ivory-dim); font-size:1.1rem; margin-bottom:34px;" id="vendorSuccessMsg">Aapki details team ko mil gayi hain. Hum jaldi aapse contact karenge.</p>
        <a id="vendorWaBtn" href="#" target="_blank" rel="noopener" class="btn btn-block wa-btn" style="display:none; margin-bottom:16px; padding:18px; font-size:1.1rem; border-radius:100px;">WhatsApp Par Turant Bhejein</a>
        <button type="button" class="btn btn-block btn-secondary" onclick="closeModal('vendorModal')" style="padding:18px; border-radius:100px;">Site Par Wapas Jayein</button>
      </div>
    </div>

  </div>
</div>

<!-- PIN Modal -->`;

html = html.replace(oldModal, newModal);
fs.writeFileSync(file, html);
console.log('Successfully upgraded the Vendor Page!');
