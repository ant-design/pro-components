export default {
  '*': 'prettier --write --ignore-unknown',
  '*.{js,ts,jsx,tsx,cjs,cts,mjs,mts}': 'eslint --fix',
};
