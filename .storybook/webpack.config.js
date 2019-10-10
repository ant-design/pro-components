const dark = require('@ant-design/dark-theme');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = ({ config, ...rest }) => {
  config.module.rules.push({
    test: /\.less$/,
    use: [
      {
        loader: MiniCssExtractPlugin.loader,
        options: {
          hmr: process.env.NODE_ENV === 'development',
        },
      },
      {
        loader: require.resolve('css-loader'),
      },
      {
        loader: require.resolve('less-loader'),
        options: {
          javascriptEnabled: true,
          modifyVars: dark.default,
        },
      },
    ],
  });
  config.resolve.extensions.push('less');
  config.module.rules = config.module.rules.filter(
    rule => !(/\.css$/.toString() == rule.test.toString()),
  );
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve('babel-loader'),
    options: {
      presets: [
        '@babel/preset-typescript',
        [
          'umi',
          {
            targets: {
              browsers: ['last 2 versions'],
            },
          },
        ],
      ],
    },
  });
  config.resolve.extensions.push('.ts', '.tsx');

  config.module.rules.push({
    test: /\.stories\.tsx?$/,
    loaders: [require.resolve('@storybook/source-loader')],
    enforce: 'pre',
  });
  config.plugins.push(
    new MiniCssExtractPlugin({
      filename: '[hash].css',
      chunkFilename: '[id].css',
    }),
  );
  return config;
};
