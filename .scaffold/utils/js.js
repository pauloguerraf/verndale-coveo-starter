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

const updateModules = name => {
  const modulesFile = `./${config.dir.paths.srcJS}/scaffolded-modules.json`;
  fs.readFile(modulesFile, 'utf8', function(err, data) {
    if (err) throw err;
    let d = JSON.parse(data);

    d.push({
      name,
      url: `./modules/${name}`
    });

    const stream = fs.createWriteStream(modulesFile);

    stream.once('open', function(fd) {
      stream.write(JSON.stringify(d, null, 2));
      stream.end();
    });
  });
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

  updateModules(name);
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
