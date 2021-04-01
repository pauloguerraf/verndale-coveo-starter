const fs = require('fs-extra');
const replace = require('replace-in-file');

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

const setupReact = () => {
  const babel = '.babelrc';
  fs.readFile(babel, 'utf8', function(err, data) {
    if (err) throw new Error(err);
    let d = JSON.parse(data);

    console.log(d);

    d.presets.push("@babel/preset-react");

    const stream = fs.createWriteStream(babel);

    stream.once('open', function(fd) {
      stream.write(JSON.stringify(d, null, 2));
      stream.end();
    });
  });
}

module.exports = {
  fileNameToTitleCase,
  fileNamtToPasCalCase,
  replaceStrings,
  setupReact
}
