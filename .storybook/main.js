const path = require('path');
const webpack = require('webpack');
const globImporter = require('node-sass-glob-importer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  "stories": ['../src/**/*.stories.@(js|mdx)'],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    '@storybook/addon-a11y',
  ],
  webpackFinal: async (config, { configType }) => {
    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', {
        loader: 'resolve-url-loader',
        options: {
          root: path.resolve(__dirname, '../src/static'),
        }
      }, {
        loader: 'sass-loader',
        options: {
          sassOptions: {
            importer: globImporter()
          }
        }
      }],
      include: path.resolve(__dirname, '../src/scss'),
    });

    config.module.rules.push({
      test: /\.(handlebars|hbs)$/,
      loader: 'handlebars-loader',
      options: {
        helperDirs: path.resolve(__dirname, './handlebars'),
        partialDirs: [
          path.resolve(__dirname, '../src/html/components'),
          path.resolve(__dirname, '../src/html/modules'),
          path.resolve(__dirname, '../src/html/modules/global')
        ],
        precompileOptions: {
          knownHelpersOnly: false,
        },
      },
      include: path.resolve(__dirname, '../src/html'),
    });

    config.plugins.push(
      new MiniCssExtractPlugin({
        filename: 'style.css'
      })
    );

    // Register Template as a global module
    config.resolve.alias.story = path.resolve(__dirname, './utils/story.js');
    config.plugins.push(
      new webpack.ProvidePlugin({
        'story': 'story'
      })
    );

    // Return the altered config
    return config;
  },
}
