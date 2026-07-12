const fs = require('fs');
const path = require('path');

const directory = '.';
const filesToProcess = ['index.html', 'about.html', 'admin.html', 'book.html', 'join.html', 'services.html', 'professionals.html'];

filesToProcess.forEach(file => {
  const filePath = path.join(directory, file);
  
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace <a href="services.html" class="scroll-btn">Professionals</a>
    // and potentially other nav links where the text is "Professionals"
    content = content.replace(/<a href="services\.html"[^>]*>Professionals<\/a>/g, (match) => {
      return match.replace('services.html', 'professionals.html');
    });
    
    fs.writeFileSync(filePath, content);
    console.log(`Updated navigation links in ${file}`);
  }
});
