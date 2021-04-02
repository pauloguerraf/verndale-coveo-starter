const fs = require('fs-extra');
const chalk = require('chalk');
const validFileName = require('valid-filename');
const config = require('../../config');
const prompt = require('prompt-sync')({sigint: true});
const utils = require('./utils');
const { execSync } = require("child_process");

const copyReact = name => {
  const folder = './.scaffold/templates/react';
  const destFolder = `./${config.dir.paths.srcJS}/modules/${name}`;
  const files = [`${destFolder}/**`];

  fs.copySync(folder, destFolder);
  fs.renameSync(`${destFolder}/ReactModule.js`, `${destFolder}/${utils.fileNamtToPasCalCase(name)}.js`);
  fs.renameSync(`${destFolder}/hooks/useHook.js`, `${destFolder}/hooks/use${utils.fileNamtToPasCalCase(name)}.js`);

  utils.replaceStrings({
    files,
    from: [/{{name}}/g, /{{NameTitleCase}}/g, /{{namePascalCase}}/g],
    to: [name, utils.fileNameToTitleCase(name), utils.fileNamtToPasCalCase(name)],
    cb: () => {}
  });
}

const updateBabelToSupportReact = () => {
  const babel = '.babelrc';
  fs.readFile(babel, 'utf8', function(err, data) {
    if (err) throw new Error(err);
    let d = JSON.parse(data);

    if (d.presets.indexOf("@babel/preset-react") >= 0) return;

    d.presets.push("@babel/preset-react");

    const stream = fs.createWriteStream(babel);

    stream.once('open', function(fd) {
      stream.write(JSON.stringify(d, null, 2));
      stream.end();
    });
  });
}

const createReact = (name) => {
  copyReact(name);

  console.log(chalk.yellow('Adding support for React'));

  updateBabelToSupportReact();

  utils.updateModules({
    name,
    url: `./modules/${name}`,
    isReact: true
  });
  console.log(chalk.green('Done!'));

  console.log(chalk.yellow('Installing basic react dependencies...'));

  try {
    execSync('yarn add @babel/preset-react -D', { stdio : 'pipe' });
    execSync('yarn add react react-dom', { stdio : 'pipe' });
    console.log(chalk.green('You can now create React modules!'));
    exec('yarn start', { stdio : 'pipe' });

    const dirJs = config.dir.paths.srcJS;
    exec(`code -g ${dirJs}/hooks/use${utils.fileNamtToPasCalCase}.js`);
    exec(`code -g ${dirJs}/${utils.fileNamtToPasCalCase}.js`);
  } catch(e) {
    console.log(chalk.red(`ERROR: ${e.stderr}. Dependencies wre not properly installed. Try installing them manually`));
  }
}

module.exports = function(args, name) {
  if (name) return createReact(name);

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
