const fs = require('fs-extra');
const chalk = require('chalk');
const validFileName = require('valid-filename');
const config = require('../../config');
const prompt = require('prompt-sync')({sigint: true});
const utils = require('./utils');

const copyHTML = (dest) => {
  const src = './.scaffold/templates/react-module.hbs';
  fs.copyFileSync(src, dest, fs.constants.COPYFILE_EXCL);
}

const copyScss = (dest) => {
  const src = './.scaffold/templates/module.scss';
  fs.copyFileSync(src, dest, fs.constants.COPYFILE_EXCL);
}

const copyStory = (dest) => {
  const src = './.scaffold/templates/module.stories.js';
  fs.copyFileSync(src, dest, fs.constants.COPYFILE_EXCL);
}

const copyReact = (destFolder, name) => {
  const folder = './.scaffold/templates/react';
  fs.copySync(folder, destFolder);
  fs.renameSync(`${destFolder}/ReactModule.js`, `${destFolder}/${utils.fileNamtToPasCalCase(name)}.js`);
  fs.renameSync(`${destFolder}/hooks/useHook.js`, `${destFolder}/hooks/use${utils.fileNamtToPasCalCase(name)}.js`);
}

const createReact = (name, noCb = false) => {
  const destHtml = `./${config.dir.paths.srcModules}/${name}.hbs`;
  const destScss = `./${config.dir.paths.srcStyles}/modules/_${name}.scss`;
  const destJs = `./${config.dir.paths.srcJS}/modules/${name}`;
  const destStory = `./${config.dir.paths.storyModules}/${name}.stories.js`;
  const files = [destHtml, destStory, destScss, `${destJs}/**`];

  copyReact(destJs, name);
  copyHTML(destHtml);
  copyScss(destScss);
  copyStory(destStory);

  utils.replaceStrings({
    files,
    from: [/{{name}}/g, /{{NameTitleCase}}/g, /{{namePascalCase}}/g],
    to: [name, utils.fileNameToTitleCase(name), utils.fileNamtToPasCalCase(name)],
    cb: noCb
      ? () => {}
      : () => console.log(chalk.green(`${name} created successfully!`))
  });

  // updateModules(name);
}

module.exports = function(args, name) {
  if (name) return createReact(name, true);

  let validName = false;

  while (!validName) {
    let name = prompt('File Name?: ');
    const isValid = !name.includes('.') && !name.includes(' ') && validFileName(name);
    const fileExists = fs.existsSync(`${config.dir.paths.srcModules}/${name}.hbs`);

    if (!isValid) {
      console.log(chalk.red(`Enter a ${chalk.bold('valid')} file name ${chalk.bold('without')} extension`));
    } else if (fileExists) {
      console.log(chalk.red('JS file already exists, try again'));
    } else {
      createReact(name);
      validName = true;
    }
  }
}
