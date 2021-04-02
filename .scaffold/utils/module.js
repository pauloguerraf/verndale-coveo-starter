const fs = require('fs');
const chalk = require('chalk');
const validFileName = require('valid-filename');
const config = require('../../config');
const prompt = require('prompt-sync')({sigint: true});
const utils = require('./utils');
const createJs = require('./js');
const createReact = require('./react');
const { exec } = require("child_process");
const { util } = require('webpack');

const copyHTML = (dest) => {
  const src = './.scaffold/templates/module.hbs';
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

const createModule = (name, shouldCreateJs) => {
  const destHtml = `./${config.dir.paths.srcModules}/${name}.hbs`;
  const destScss = `./${config.dir.paths.srcStyles}/modules/_${name}.scss`;
  const destStory = `./${config.dir.paths.storyModules}/${name}.stories.js`;
  const files = [destHtml, destStory, destScss];

  copyHTML(destHtml);
  copyScss(destScss);
  copyStory(destStory);

  if (shouldCreateJs) createJs([], name);

  const dataJs = shouldCreateJs ? ` data-module="${name}"` : '';

  utils.replaceStrings({
    files,
    from: ['{{name}}', '{{NameTitleCase}}', '{{jsplaceholder}}'],
    to: [name, utils.fileNameToTitleCase(name), dataJs],
    cb: () => {
      console.log(chalk.green(`${name} created successfully!`));
      exec(`code -g ${destScss}:2:3`);
      exec(`code -g ${destHtml}:2:3`);
    }
  });
}

module.exports = function(args) {
  utils.createFile('module', name => {
    let hasJs = prompt('JS (y/n)?: ');
    hasJs = hasJs.toLowerCase();
    hasJs = hasJs !== 'n' && hasJs !== 'no';

    if (hasJs) {
      let isReact = prompt('React (y/n) ?: ');
      isReact = isReact.toLowerCase();
      isReact = isReact !== 'n' && isReact !== 'no';

      if (isReact) return createReact({}, name);
    }

    createJs({}, name);
    createModule(name, false);
  });
}
