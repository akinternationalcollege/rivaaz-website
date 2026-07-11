const fs = require('fs');
let js = fs.readFileSync('js/app.js', 'utf8');

const eventListeners = [
  'bookingSubmitBtn',
  'vendorSubmitBtn',
  'pinSubmitBtn',
  'categorySubmitBtn',
  'proSubmitBtn',
  'testiSubmitBtn',
  'heroSubmitBtn'
];

eventListeners.forEach(id => {
  const findStr = "document.getElementById('" + id + "').addEventListener('click',";
  const repStr = "const " + id + "El = document.getElementById('" + id + "');\nif(" + id + "El) " + id + "El.addEventListener('click',";
  js = js.split(findStr).join(repStr);
});

fs.writeFileSync('js/app.js', js);
console.log('Fixed listeners.');
