const config = require('../config');

module.exports = [
  'core-js/stable',
  'regenerator-runtime/runtime',
  `./${config.dir.paths.srcJS}/main.js`,
  `./${config.dir.paths.srcStyles}/styles.scss`
];
