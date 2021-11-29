const babel = require('babel-jest');

module.exports = babel.default.createTransformer({
  presets: [
    require.resolve('@babel/preset-typescript'),
    '@babel/preset-react',
    ['@babel/preset-env', { targets: { node: 'current' } }],
  ],
});
