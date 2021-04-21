const fs = require('fs');
const chalk = require('chalk');
const config = require('../../config');
const prompt = require('prompt-sync')({sigint: true});
const utils = require('./utils');
const createJs = require('./js');
const createReact = require('./react');
const { execSync } = require("child_process");

const copyHTML = (dest, isReact) => {
  const src = isReact ? './.scaffold/templates/react-module.hbs' : './.scaffold/templates/module.hbs';
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

const createModule = (name, shouldCreateJs, isReact) => {
  const destHtml = `./${config.dir.paths.srcModules}/${name}.hbs`;
  const destScss = `./${config.dir.paths.srcStyles}/modules/_${name}.scss`;
  const destStory = `./${config.dir.paths.storyModules}/${name}.stories.js`;
  const files = [destHtml, destStory, destScss];

  copyHTML(destHtml, isReact);
  copyScss(destScss);
  copyStory(destStory);

  if (shouldCreateJs) createJs([], name);

  const dataJs = shouldCreateJs ? ` data-module="${name}"` : '';

  utils.replaceStrings({
    files,
    from: [/{{name}}/g, '{{NameTitleCase}}', '{{jsplaceholder}}'],
    to: [name, utils.fileNameToTitleCase(name), dataJs],
    cb: () => {
      console.log(chalk.green(`${name} created successfully!`));
      try {
        execSync(`code -g ${destScss}:2:3`);
        execSync(`code -g ${destHtml}:2:3`);
      } catch {}
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

      if (isReact) {
        createReact({}, name);
        createModule(name, false, true);
        return;
      };
      createModule(name, true, false);
      return;
    }

    createModule(name, false, false);
  });
}
