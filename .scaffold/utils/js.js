const fs = require('fs-extra');
const chalk = require('chalk');
const validFileName = require('valid-filename');
const config = require('../../config');
const prompt = require('prompt-sync')({sigint: true});
const utils = require('./utils');

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
      ? () => {}
      : () => console.log(chalk.green(`${name} created successfully!`))
  });

  utils.updateModules({
    name,
    url: `./modules/${name}`
  });
}

module.exports = function(args, name) {
  if (name) return createJs(name, true);

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
      createJs(name);
      validName = true;
    }
  }
}
