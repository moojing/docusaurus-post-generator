

// include node fs module
var fs = require('fs')
const dayjs = require('dayjs')
const readline = require('node:readline');

const getTemplateFilePath = (name) => 'template/' + name + '.md'

async function getTemplateContent(templatePath, title) {
  let templateContent = ''
  templateReader = fs.createReadStream(templatePath, { encoding: 'utf8', });
  try {
    const rl = readline.createInterface({
      input: templateReader,
      // crlfDelay: Infinity
    });

    for await (const line of rl) {
      let tempLine = line

      // replace the title value with the title that user provided.
      if(line.includes('title:')) {
        tempLine = `title: ${title}`
      }else if (line.includes('slug:')){
        tempLine = `slug: ${title.split(' ').join('-').toLowerCase()}`
      }
      templateContent += tempLine + '\n'
    }
  } catch (err) {
    console.log('An error happened while reading the file.', err);
  }

  return templateContent

}

module.exports = async (template, title) => {

  const date = dayjs().format('YYYY-MM-DD')

  const fileName = `${date}-${title.split(' ').join('-')}`;
  let templateContent = '';
  let isDefaultTemplate = false;

  if (fs.existsSync(getTemplateFilePath(template))) {
    templateContent = await getTemplateContent(getTemplateFilePath(template), title)
  } else {
    isDefaultTemplate = true;
    templateContent = await getTemplateContent(getTemplateFilePath('default'), title)
  }



  fs.writeFile(`${fileName}.md`, templateContent, function (err) {
    if (err) throw err;
    let createdMessage = 'Created a new post: ' + fileName + '.md'
    if (isDefaultTemplate) {
      createdMessage += ' with the default template. \nYou can change the template by adding the template folder.'
    }
    console.log(createdMessage);
  });

}