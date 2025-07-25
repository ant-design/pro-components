module.exports = {
  plugins: [
   require.resolve('prettier-plugin-organize-imports'),
   require.resolve('prettier-plugin-packagejson'),
  ],
  printWidth: 80,
  proseWrap: 'always',
  singleQuote: true,
  trailingComma: 'all',
  overrides: [
    {
      files: '*.md',
      options: {
        proseWrap: 'preserve',
      },
    },
  ],
  endOfLine: 'lf',
};
