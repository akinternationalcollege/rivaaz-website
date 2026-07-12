const fs = require('fs');

const files = [
  'index.html',
  'about.html',
  'admin.html',
  'book.html',
  'join.html',
  'services.html',
  'professionals.html',
  'venues.html'
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  
  // Insert in header navigation
  content = content.replace(/<a href="join\.html" class="scroll-btn">Join as Pro<\/a>/, '<a href="venues.html" class="scroll-btn">Venues</a>\n      <a href="join.html" class="scroll-btn">Join as Pro</a>');
  
  // Insert in footer Categories
  content = content.replace(/<a href="services\.html" class="foot-btn scroll-btn">Security<\/a>/, '<a href="services.html" class="foot-btn scroll-btn">Security</a>\n        <a href="venues.html" class="foot-btn scroll-btn">Venues</a>');
  
  fs.writeFileSync(file, content);
  console.log(`Updated ${file}`);
}
