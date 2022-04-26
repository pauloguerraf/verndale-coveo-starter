const path = require('path');
const config = require('../config');

module.exports = {
  path: path.join(__dirname, `../${config.dir.production}`, config.publicPath),
  publicPath: `/${config.publicPath}`,
  filename: 'scripts/[name].bundle.js'
};
