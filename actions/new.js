

// include node fs module
var fs = require('fs')
var path = require('path')
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

module.exports = async (template, title, option) => {
  const {type} = option;
  const date = dayjs().format('YYYY-MM-DD')
  const [pureTitle, ...potentialFilePath] = title.split('/').reverse()
  

  const pureFileName = type==='blog'? 
  `${date}-${pureTitle.split(' ').join('-')}`:
  `${pureTitle.split(' ').join('-')}` ;
  
  const fileTypePath = `${option.type.includes('doc')?'docs':'blog'}` || 'docs';
  const fileNameWithPath = `${fileTypePath}/${potentialFilePath.join('/')}/${pureFileName}`
  const enclosingFolder = path.dirname(fileNameWithPath)
  
  let templateContent = '';
  let isDefaultTemplate = false;

  if (fs.existsSync(getTemplateFilePath(template))) {
    templateContent = await getTemplateContent(getTemplateFilePath(template), pureTitle)
  } else {
    isDefaultTemplate = true;
    const DEFAULT_TEMPLATE_PATH = '../template/default.md'
    templateContent = await getTemplateContent(path.resolve(__dirname,DEFAULT_TEMPLATE_PATH), pureTitle)
  }


  if (!fs.existsSync(enclosingFolder)){
      fs.mkdirSync(enclosingFolder, { recursive: true });
  }


  fs.writeFile(`${fileNameWithPath}.md`, templateContent, function (err) {
    if (err) throw err;
    let createdMessage = 'Created a new post: ' + fileNameWithPath + '.md'
    if (isDefaultTemplate) {
      createdMessage += ' with the default template. \nYou can change the template by adding the template folder.'
    }
    console.log(createdMessage);
  });

}