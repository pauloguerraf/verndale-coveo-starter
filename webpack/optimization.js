const { ESBuildMinifyPlugin } = require('esbuild-loader');

module.exports = {
  minimizer: [
    new ESBuildMinifyPlugin({
      target: 'es2020',
      css: true
    })
  ]
};
