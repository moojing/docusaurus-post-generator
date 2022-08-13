

// include node fs module
var fs = require('fs')
const dayjs = require('dayjs')

module.exports = (template, title) => {
  console.log('template :', template);
  const date = dayjs().format('YYYY-MM-DD')

  const getTemplateFile = (name) => 'template/' + name + '.md'
  const fileName = `${date}-${title}`;
  let templateContent = '';
  let isDefaultTemplate = false;

  if (fs.existsSync(getTemplateFile(template))) {
    try {
      templateContent = fs.readFileSync(
        getTemplateFile(template), 'utf8'
      );

      console.log(data);
    } catch (err) {
      console.error('An error happen while reading file: ', err);
    }
  } else {
    isDefaultTemplate = true;
    templateContent = fs.readFileSync(getTemplateFile('default'), 'utf8');
  }

  fs.writeFile(`${fileName}.md`, templateContent, function (err) {
    if (err) throw err;
    let createdMessage = 'Created a new post: ' + fileName + '.md'
    if(isDefaultTemplate){
      createdMessage += ' with the default template. \nYou can change the template by adding the template folder.'
    } 
    console.log(createdMessage);
  });

}