const fs = require('fs-extra');
const chalk = require('chalk');
const config = require('../../config');
const utils = require('./utils');
const { exec } = require('child_process');

const copyJs = (dest) => {
  const src = './.scaffold/templates/module.js';
  const modulesDir = `./${config.dir.paths.srcJS}/modules/`;
  if (!fs.existsSync(modulesDir)) fs.mkdirSync(modulesDir);
  fs.copyFileSync(src, dest, fs.constants.COPYFILE_EXCL);
}

const createJs = (name, noCb = false) => {
  const destJs = `./${config.dir.paths.srcJS}/modules/${name}.js`;

  copyJs(destJs);

  utils.replaceStrings({
    files: [destJs],
    from: ['{{name}}', '{{NameTitleCase}}'],
    to: [name, utils.fileNameToTitleCase(name)],
    cb: noCb
      ? () => {
        try {exec(`code -g ${destJs}:6:5`)} catch {}
      } : () => {
        console.log(chalk.green(`${name} created successfully!`));
      }
  });

  utils.updateModules({
    name,
    url: `./modules/${name}`
  });
}

module.exports = function(args, name) {
  if (name) return createJs(name, true);
  utils.createFile('js', createJs);
}
