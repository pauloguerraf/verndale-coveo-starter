const fs = require('fs');
const chalk = require('chalk');
const config = require('../../config');
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
    from: [/{{name}}/g, '{{NameTitleCase}}'],
    to: [name, utils.fileNameToTitleCase(name)],
    cb: () => {
      console.log(chalk.green(`${name} created successfully!`))
      try {exec(`code -g ${destHtml}:10:5`)} catch {}
    }
  });
}

module.exports = function(args) {
  utils.createFile('page', createPage);
}
