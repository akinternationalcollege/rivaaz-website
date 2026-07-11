const fs = require('fs');
const file = 'C:/Users/ansh9/Downloads/Rivaaz-Website/index.html';
let html = fs.readFileSync(file, 'utf8');

// Find the header nav section
const oldNav = `<button type="button" class="btn scroll-btn pulse" data-scroll="categories">Hire Now</button>`;
const newNav = `
    <div style="display:flex; gap:10px;">
      <a href="/rivaaz-app.apk" class="btn scroll-btn" style="background:transparent; color:var(--gold); border:1px solid var(--gold); display:flex; align-items:center; gap:6px;">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4483-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993s-.4482.9997-.9993.9997zm-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993s-.4482.9997-.9993.9997zm11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.4162.4162 0 00-.5676.1521l-2.0223 3.503C15.5902 8.2435 13.8533 7.85 12 7.85s-3.5902.3935-5.1367 1.1004L4.841 5.4474a.4162.4162 0 00-.5676-.1521.4157.4157 0 00-.1521.5676l1.9973 3.4592C2.6889 11.1867.3432 14.6589 0 18.761h24c-.3435-4.1021-2.6892-7.5743-6.1185-9.44z"/></svg>
        App
      </a>
      <button type="button" class="btn scroll-btn pulse" data-scroll="categories">Hire Now</button>
    </div>`;

if (!html.includes('rivaaz-app.apk')) {
  html = html.replace(oldNav, newNav);
  fs.writeFileSync(file, html);
  console.log('APK Download button added to local file.');
}
