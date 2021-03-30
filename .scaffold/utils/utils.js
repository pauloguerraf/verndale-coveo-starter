const replace = require('replace-in-file');

const fileNameToTitleCase = str => {
  let output = str.split("-");

  for(var i = 0; i < output.length; i++){
    output[i] = output[i][0].toUpperCase() + output[i].slice(1);
  }

  return output.join(' ');
}

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
    throwError(err)
  }
}

module.exports = {
  fileNameToTitleCase,
  replaceStrings
}
