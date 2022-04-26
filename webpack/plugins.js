const path = require('path');
const SvgStore = require('webpack-svgstore');
const config = require('../config');

const { paths } = config.dir;

module.exports = ({ production }) => {
  let plugins = [
    new SvgStore({
      path: path.resolve(__dirname, `../${paths.srcSvgSprites}`),
      fileName: 'images/svgsheet.svg',
      removeViewBox: true
    })
  ];

  if (!production) {
    const StylesWatchPlugin = require('./utils/StylesWatchPlugin');
    plugins = [
      ...plugins,
      new StylesWatchPlugin({
        paths: ['src/scss/components/**/*.scss', 'src/scss/modules/**/*.scss'],
        entry: 'src/scss/styles.scss'
      })
    ];
  }

  if (production) {
    const MiniCssExtractPlugin = require('mini-css-extract-plugin');
    const BundleAnalyzerPlugin =
      require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
    const CopyPlugin = require('copy-webpack-plugin');
    const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

    plugins = [
      ...plugins,
      new MiniCssExtractPlugin({
        filename: 'css/styles.css'
      }),
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: false,
        reportFilename: path.resolve(__dirname, 'report.html')
      }),
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, `../${paths.srcStatic}`),
            to: path.resolve(
              __dirname,
              `../${config.dir.production}`,
              config.publicPath
            ),
            filter: resourcePath => {
              if (
                path.dirname(resourcePath) ===
                path.resolve(__dirname, `../${paths.srcSvgSprites}`)
              ) {
                return false;
              }

              return true;
            }
          }
        ]
      }),
      new ImageMinimizerPlugin({
        minimizerOptions: {
          plugins: [
            ['gifsicle', { interlaced: true }],
            ['mozjpeg', { quality: 85, progressive: true }],
            ['optipng', { optimizationLevel: 5 }],
            [
              'svgo',
              {
                plugins: [
                  {
                    name: 'removeViewBox'
                  }
                ]
              }
            ]
          ]
        },
        exclude: [/svgsheet.svg/]
      })
    ];
  }

  return plugins;
};
