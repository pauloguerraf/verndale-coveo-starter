const fs = require('fs');
const config = require('../config');
const chalk = require('chalk');
// const copyDir = require('copy-dir');
// const validFileName = require('valid-filename');
// const replace = require('replace-in-file');
// const { execSync } = require("child_process");

const createPage = require('./utils/page');
// const paths = config.dir.paths;

const action = process.argv[2];
switch (action) {
  case 'page':
    createPage(process.argv);
    break;

  default:
    break;
}

// console.log(config.dir.paths.srcTemplates);
// console.log(name);
// const page = prompt('Page?: ');
// console.log(page);

// const throwError = error => {
//   console.log(chalk.bgRed(error));
//   process.exit(1);
// }

// if (!name) throwError('You must include a component name.');
// if (!validFileName(name)) throwError('Component name is invalid');

// const dir = `./components/${name}/`;

// if (fs.existsSync(dir)) throwError(`${name} already exists`);

// fs.mkdirSync(dir);

// copyDir.sync('./.component-template', dir);

// fs.copyFileSync('./.scaffold/templates/test.txt', '../ttt.txt', fs.constants.COPYFILE_EXCL);

const replaceStrings = async () => {
  const options = {
    files: `${dir}/**/*`,
    from: '{{name}}',
    to: name,
  };

  try {
    const resultsWithReplacedNames = await replace(options);
    if (resultsWithReplacedNames) {
      console.log(chalk.bgGreen(`${name} created successfully!`));
    };
  } catch (err) {
    throwError(err)
  }
}

// replaceStrings();
