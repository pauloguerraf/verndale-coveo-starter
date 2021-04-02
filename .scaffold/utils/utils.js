const fs = require('fs-extra');
const replace = require('replace-in-file');
const config = require('../../config');
const prompt = require('prompt-sync')({sigint: true});
const validFileName = require('valid-filename');

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

const createFile = cb => {
  let validName = false;

  while (!validName) {
    let name = prompt('File Name?: ');
    const isValid = !name.includes('.') && !name.includes(' ') && validFileName(name);
    const fileExists = fs.existsSync(`${config.dir.paths.srcTemplates}/${name}.hbs`)

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
  fs.readFile(modulesFile, 'utf8', function(err, data) {
    if (err) throw err;
    const d = JSON.parse(data);
    d.push(obj);

    const stream = fs.createWriteStream(modulesFile);

    stream.once('open', function() {
      stream.write(JSON.stringify(d, null, 2));
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
