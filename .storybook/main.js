const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const globImporter = require('node-sass-glob-importer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SvgStore = require('webpack-svgstore-plugin');
const { dir } = require('../config.js');

const readHbsPartialDirectories = () => {
  const directories = [
    `../${dir.paths.srcModules}/`,
    `../${dir.paths.srcComponents}/`
  ];

  const readDirectory = directory => {
    const partials = [];

    const dirChildren = fs.readdirSync(path.resolve(__dirname, directory));

    for (let i = 0; i < dirChildren.length; i++) {
      const isFile = !!path.extname(directory + dirChildren[i]);

      if (!isFile) partials.push(directory + dirChildren[i]);
    }

    return partials;
  };

  return directories
    .concat(...directories.map(directory => readDirectory(directory)))
    .map(directory => path.resolve(__dirname, directory));
};

module.exports = {
  stories: [path.resolve(dir.stories, './**/*.stories.@(js|mdx)')],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-a11y'
  ],
  webpackFinal: async (config, { configType }) => {
    config.module.rules.push({
      test: /\.scss$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            sourceMap: true
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              ident: 'postcss',
              plugins: {
                autoprefixer: {}
              }
            },
            sourceMap: true
          }
        },
        {
          loader: 'resolve-url-loader',
          options: {
            root: path.resolve(dir.paths.srcStatic)
          }
        },
        {
          loader: 'sass-loader',
          options: {
            sassOptions: {
              importer: globImporter()
            }
          }
        }
      ],
      include: path.resolve(dir.paths.srcStyles)
    });

    config.module.rules.push({
      test: /\.(handlebars|hbs)$/,
      loader: 'handlebars-loader',
      options: {
        helperDirs: path.resolve(dir.hbsHelpers),
        partialDirs: readHbsPartialDirectories(),
        precompileOptions: {
          knownHelpersOnly: false
        }
      },
      include: path.resolve(dir.paths.srcHtml)
    });

    config.plugins.push(
      new MiniCssExtractPlugin({
        filename: 'style.css'
      })
    );

    config.plugins.push(
      new SvgStore({
        svgoOptions: {
          plugins: [{ removeViewBox: true }]
        },
        prefix: ''
      })
    );

    // Register Template as a global module
    config.resolve.alias.story = path.resolve(__dirname, './utils/story.js');
    config.plugins.push(
      new webpack.ProvidePlugin({
        story: 'story'
      })
    );

    // Return the altered config
    return config;
  }
};
