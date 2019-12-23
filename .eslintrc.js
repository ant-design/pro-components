module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    page: true,
  },
  rules: {
    'import/no-extraneous-dependencies': 0,
    'import/no-named-as-default-member': 0,
    'import/default': 0,
    'import/no-named-as-default-member': 0,
    'import/named': 0,
  },
};
