export default {
  plugins: [
    (await import('prettier-plugin-organize-imports')).default,
    (await import('prettier-plugin-packagejson')).default,
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
