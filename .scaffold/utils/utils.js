const fs = require('fs-extra');
const replace = require('replace-in-file');
const config = require('../../config');
const prompt = require('prompt-sync')({sigint: true});
const validFileName = require('valid-filename');
const chalk = require('chalk');

const fileNameToTitleCase = str => {
  let output = str.split("-");

  for(var i = 0; i < output.length; i++){
    output[i] = output[i][0].toUpperCase() + output[i].slice(1);
  }

  return output.join(' ');
}

const fileNamtToPasCalCase = str => fileNameToTitleCase(str).split(' ').join('');

const replaceStrings = async (config) => {
  const options = {
    files: config.files,
    from: config.from,
    to: config.to,
  };

  try {
    const resultsWithReplacedNames = await replace(options);
    if (resultsWithReplacedNames) config.cb();
  } catch (err) {
    throw new Error(err);
  }
}

const createFile = (type, cb) => {
  let validName = false;

  while (!validName) {
    let name = prompt('File Name?: ');
    let filePath;

    const isValid = !name.includes('.') && !name.includes(' ') && validFileName(name);

    switch (type) {
      case 'page':
        filePath = `${config.dir.paths.srcTemplates}/${name}.hbs`;
        break;

      case 'module':
        filePath = `${config.dir.paths.srcModules}/${name}.hbs`;
        break;

      case 'js':
        filePath = `${config.dir.paths.srcJS}/modules/${name}.js`;
        break;

      case 'react':
        filePath = `${config.dir.paths.srcJS}/modules/${name}/index.js`;
        break;

      default:
        break;
    }

    const fileExists = fs.existsSync(filePath);

    if (!isValid) {
      console.log(chalk.red(`Enter a ${chalk.bold('valid')} file name ${chalk.bold('without')} extension`));
    } else if (fileExists) {
      console.log(chalk.red('This already exists, try again'));
    } else {
      if (cb) cb(name);
      validName = true;
    }
  }
}

const updateModules = (obj) => {
  const modulesFile = `./${config.dir.paths.srcJS}/scaffolded-modules.json`;
  const globsFile = `./${config.dir.paths.srcJS}/glob-modules.js`;
  let modules = [];

  fs.readFile(modulesFile, 'utf8', function(err, data) {
    if (err) throw err;
    modules = JSON.parse(data);
    modules.push(obj);

    const stream = fs.createWriteStream(modulesFile);

    stream.once('open', function() {
      stream.write(JSON.stringify(modules, null, 2));
      stream.end();
    });
  });

  fs.readFile(globsFile, 'utf8', function(err) {
    if (err) throw err;

    const stream = fs.createWriteStream(globsFile);

    const data = `
/* eslint-disable */
const globModules = [
  ${modules.map(j => `{
    name: '${j.name}',
    loader: () => import('${j.url}'),
    ${j.isReact
    ? `render: function(Component, nodeList) {
      const React = require('react');
      const { render } = require('react-dom');
      nodeList.forEach(node => render(React.createElement(Component, node.dataset), node));
    }` : ''}
  }`).join(',\n')}
];

export default globModules;
`;

    stream.once('open', function() {
      stream.write(data);
      stream.end();
    });
  });
}

module.exports = {
  fileNameToTitleCase,
  fileNamtToPasCalCase,
  replaceStrings,
  createFile,
  updateModules
}
