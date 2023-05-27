const fabric = require('@umijs/fabric');

module.exports = {
  ...fabric.prettier,
  printWidth: 80,
  plugins: [require.resolve('prettier-plugin-organize-imports')],
};
