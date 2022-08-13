

// include node fs module
var fs = require('fs')


module.exports  = (template, title)=>{
console.log('template :', template);
console.log('title :', title);
    //   if (err) throw er
fs.writeFile('newfile.txt', 'Learn Node FS module', function (err) {
  if (err) throw err;
  console.log('File is created successfully.');
});
} 