const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// Header links
html = html.replace(/<button type="button" class="scroll-btn" data-scroll="categories">Categories<\/button>/g, '<a href="services.html" class="scroll-btn">Services</a>');
html = html.replace(/<button type="button" class="scroll-btn" data-scroll="how">How it works<\/button>/g, '<a href="about.html" class="scroll-btn">About Us</a>');
html = html.replace(/<button type="button" class="scroll-btn" data-scroll="professionals">Professionals<\/button>/g, '<a href="services.html" class="scroll-btn">Professionals</a>');
html = html.replace(/<button type="button" class="scroll-btn" data-scroll="vendors">For Vendors<\/button>/g, '<a href="join.html" class="scroll-btn">Join as Pro</a>');
html = html.replace(/<button type="button" class="btn scroll-btn pulse" data-scroll="categories">Hire Now<\/button>/g, '<a href="book.html" class="btn scroll-btn pulse">Hire Now</a>');

// Footer links
html = html.replace(/<button type="button" class="foot-btn scroll-btn" data-scroll="categories">Waiter &amp; Reception<\/button>/g, '<a href="services.html" class="foot-btn scroll-btn">Waiter &amp; Reception</a>');
html = html.replace(/<button type="button" class="foot-btn scroll-btn" data-scroll="categories">Dancer &amp; Choreographer<\/button>/g, '<a href="services.html" class="foot-btn scroll-btn">Dancer &amp; Choreographer</a>');
html = html.replace(/<button type="button" class="foot-btn scroll-btn" data-scroll="categories">Security<\/button>/g, '<a href="services.html" class="foot-btn scroll-btn">Security</a>');
html = html.replace(/<button type="button" class="foot-btn scroll-btn" data-scroll="how">How it works<\/button>/g, '<a href="about.html" class="foot-btn scroll-btn">About Us</a>');
html = html.replace(/<button type="button" class="foot-btn scroll-btn" data-scroll="vendors">For Vendors<\/button>/g, '<a href="join.html" class="foot-btn scroll-btn">For Vendors</a>');
html = html.replace(/<button type="button" class="foot-btn" id="adminLoginLink">Admin Login<\/button>/g, '<a href="admin.html" class="foot-btn">Admin Login</a>');

// Other buttons
html = html.replace(/<button class="btn pulse" id="vendorOpenBtn">Professional Ke Roop Mein Judein<\/button>/g, '<a href="join.html" class="btn pulse">Professional Ke Roop Mein Judein</a>');

fs.writeFileSync('index.html', html);
console.log('Links updated.');
