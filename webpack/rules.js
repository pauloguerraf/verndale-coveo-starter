const fs = require('fs');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const globImporter = require('node-sass-glob-importer');
const config = require('../config');

const { paths } = config.dir;

const readHbsPartialDirectories = () => {
  const directories = [`../${paths.srcModules}/`, `../${paths.srcComponents}/`];

  const readdir = directory =>
    fs
      .readdirSync(path.resolve(__dirname, directory))
      .map(dir => directory + dir)
      .filter(dir => !path.extname(dir));

  return directories
    .concat(...directories.map(directory => readdir(directory)))
    .map(directory => path.resolve(__dirname, directory));
};

module.exports = [
  {
    test: /\.js$/,
    include: [path.resolve(__dirname, `../${paths.srcJS}`)],
    use: {
      loader: 'babel-loader'
    }
  },
  {
    test: /\.scss$/,
    include: [path.resolve(__dirname, `../${paths.srcStyles}`)],
    use: [
      MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          url: false,
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
          }
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
    ]
  },
  {
    test: /\.(handlebars|hbs)$/,
    loader: 'handlebars-loader',
    options: {
      helperDirs: path.resolve('handlebars'),
      partialDirs: readHbsPartialDirectories(),
      precompileOptions: {
        knownHelpersOnly: false
      }
    },
    include: path.resolve(paths.srcHtml)
  }
];
