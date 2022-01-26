const { entry, output, plugins, rules, optimization } = require('./webpack');

module.exports = (env = {}) => ({
  devtool: 'source-map',
  entry,
  output,
  optimization,
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
