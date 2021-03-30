const fs = require('fs');
const chalk = require('chalk');
const validFileName = require('valid-filename');
const config = require('../../config');
const prompt = require('prompt-sync')({sigint: true});
const utils = require('./utils');
const { exec } = require('child_process');

const copyHTML = (dest) => {
  const src = './.scaffold/templates/page.hbs';
  fs.copyFileSync(src, dest, fs.constants.COPYFILE_EXCL);
}

const copyStory = (dest) => {
  const src = './.scaffold/templates/page.stories.js';
  fs.copyFileSync(src, dest, fs.constants.COPYFILE_EXCL);
}

const createPage = name => {
  const destHtml = `./${config.dir.paths.srcTemplates}/${name}.hbs`;
  const destStory = `./${config.dir.paths.storyTemplates}/${name}.stories.js`;

  copyHTML(destHtml);
  copyStory(destStory);
  utils.replaceStrings({
    files: [destHtml, destStory],
    from: ['{{name}}', '{{NameTitleCase}}'],
    to: [name, utils.fileNameToTitleCase(name)],
    cb: () => {
      console.log(chalk.green(`${name} created successfully!`))
      exec(`code -g ${destHtml}:10:5`);
    }
  });
}

module.exports = function(args) {
  let validName = false;

  while (!validName) {
    let name = prompt('File Name?: ');
    const isValid = !name.includes('.') && !name.includes(' ') && validFileName(name);
    const fileExists = fs.existsSync(`${config.dir.paths.srcTemplates}/${name}.hbs`)

    if (!isValid) {
      console.log(chalk.red(`Enter a ${chalk.bold('valid')} file name ${chalk.bold('without')} extension`));
    } else if (fileExists) {
      console.log(chalk.red('Page already exists, try again'));
    } else {
      createPage(name);
      validName = true;
    }
  }
}
