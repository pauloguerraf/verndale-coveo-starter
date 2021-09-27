const { entry, output, plugins, rules } = require('./webpack');

module.exports = (env = {}) => ({
  devtool: 'source-map',
  entry,
  output,
  plugins: plugins(env),
  module: {
    rules
  },
  mode: 'production',
  performance: {
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  }
});
