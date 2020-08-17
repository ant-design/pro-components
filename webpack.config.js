const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { readdirSync } = require('fs');

const tailPkgs = readdirSync(path.join(__dirname, 'packages')).filter(
  (pkg) => pkg.charAt(0) !== '.',
);

const webPackConfigList = [];

tailPkgs.forEach((pkg) => {
  const entry = {};
  entry[`${pkg}`] = `./packages/${pkg}/src/index.tsx`;
  entry[`${pkg}.min`] = `./packages/${pkg}/src/index.tsx`;

  const config = {
    entry,
    output: {
      filename: '[name].js',
      library: `Pro${pkg.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase())}`,
      libraryExport: 'default',
      path: path.resolve(__dirname, 'packages', pkg, 'dist'),
      globalObject: 'this',
    },
    mode: 'production',
    resolve: {
      extensions: ['.ts', '.tsx', '.json', '.css', '.js', '.less'],
    },
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          include: /\.min\.js$/,
        }),
        new OptimizeCSSAssetsPlugin({
          include: /\.min\.js$/,
        }),
      ],
    },
    module: {
      rules: [
        {
          test: /\.(png|jpg|gif|svg)$/i,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192,
              },
            },
          ],
        },
        {
          test: /\.jsx?$/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/typescript', '@babel/env', '@babel/react'],
              plugins: [
                ['@babel/plugin-proposal-decorators', { legacy: true }],
                ['@babel/plugin-proposal-class-properties', { loose: true }],
                '@babel/proposal-object-rest-spread',
              ],
            },
          },
        },
        {
          test: /\.tsx?$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/typescript',
                [
                  '@babel/env',
                  {
                    loose: true,
                    modules: false,
                  },
                ],
                '@babel/react',
              ],
              plugins: [
                ['@babel/plugin-proposal-decorators', { legacy: true }],
                ['@babel/plugin-proposal-class-properties', { loose: true }],
                '@babel/proposal-object-rest-spread',
              ],
            },
          },
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: 'style-loader', // creates style nodes from JS strings
            },
            {
              loader: 'css-loader', // translates CSS into CommonJS
            },
          ],
        },
        {
          test: /\.less$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: (resourcePath, context) =>
                  `${path.relative(path.dirname(resourcePath), context)}/`,
              },
            },
            {
              loader: 'css-loader', // translates CSS into CommonJS
            },
            {
              loader: 'less-loader',
              options: {
                lessOptions: {
                  javascriptEnabled: true,
                },
              },
            },
          ],
        },
      ],
    },
    externals: [
      {
        react: 'React',
        'react-dom': 'ReactDOM',
        antd: 'antd',
        moment: 'moment',
      },
    ],
    plugins: [
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: '[name].css',
        chunkFilename: '[id].css',
      }),
    ],
  };
  webPackConfigList.push(config);
});

module.exports = webPackConfigList;
