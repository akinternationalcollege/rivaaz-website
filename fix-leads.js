const fs = require('fs');
const files = [
  'C:/Users/ansh9/Downloads/rivaaz-app (1).html',
  'C:/Users/ansh9/Downloads/Rivaaz-Website/index.html'
];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let html = fs.readFileSync(file, 'utf8');
    
    // 1. Fix the saveLeads function to ensure it doesn't fail silently
    html = html.replace(
      /async function saveLeads\(\)\{ try\{ await withRetry\(\(\)=>window\.storage\.set\(LEADS_KEY, JSON\.stringify\(leads\), true\)\); \}catch\(e\)\{ flagStorageIssue\(e\); \} \}/g,
      `async function saveLeads(){ 
  try{ 
    await withRetry(()=>window.storage.set(LEADS_KEY, JSON.stringify(leads), true)); 
    // Also save to standard localStorage as a solid backup
    localStorage.setItem(LEADS_KEY, JSON.stringify(leads));
  }catch(e){ 
    flagStorageIssue(e); 
  } 
}`
    );
    
    // 2. Fix the loadAll function to ensure it pulls leads from the backup if window.storage fails
    html = html.replace(
      /try\{\n    const res2 = await withRetry\(\(\)=>window\.storage\.get\(LEADS_KEY, true\)\);\n    if\(res2 && res2\.value\)\{ leads = JSON\.parse\(res2\.value\); \}\n  \}catch\(e\)\{ \/\* no saved requests yet, leads stays \[\] \*\/ \}/g,
      `try{
    const res2 = await withRetry(()=>window.storage.get(LEADS_KEY, true));
    if(res2 && res2.value){ leads = JSON.parse(res2.value); }
  }catch(e){ 
    // Fallback to standard localStorage
    try {
      const backup = localStorage.getItem(LEADS_KEY);
      if(backup) leads = JSON.parse(backup);
    } catch(err) {}
  }`
    );

    // 3. Make the lead cards look better and clearly show they are history
    html = html.replace(
      /<div class="empty-state">Abhi tak koi request nahi aayi\.<\/div>/g,
      '<div class="empty-state">Abhi tak koi request nahi aayi.<br><br><small style="opacity:0.7">Jab bhi koi booking ya vendor request aayegi, wo yahan save hogi aur WhatsApp par bhi jayegi.</small></div>'
    );

    fs.writeFileSync(file, html);
    console.log('Fixed leads tracking in ' + file);
  }
});
