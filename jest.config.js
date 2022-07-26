const { readdirSync } = require('fs');
const { join } = require('path');

const pkgList = readdirSync(join(__dirname, './packages')).filter((pkg) => pkg.charAt(0) !== '.');

const moduleNameMapper = {
  '\\.(css|less|sass|scss)$': require.resolve('identity-obj-proxy'),
};

pkgList.forEach((shortName) => {
  const name = `@ant-design/pro-${shortName}`;
  moduleNameMapper[name] = join(__dirname, `./packages/${shortName}/src`);
});

module.exports = {
  collectCoverageFrom: [
    'packages/**/src/**/*.{ts,tsx}',
    '!packages/**/src/demos/**',
    '!packages/**/src/**/demos/**',
    '!packages/utils/src/isDeepEqualReact/*.{ts,tsx}',
    '!packages/utils/src/useMountMergeState/*.{ts,tsx}',
  ],
  testEnvironment: 'jsdom',
  moduleNameMapper,
  transform: {
    '\\.(t|j)sx?$': require.resolve('./tests/jsTransformer'),
  },
  transformIgnorePatterns: [
    '/node_modules/(?!antd|@ant-design|rc-.+?|@babel/runtime|@umijs/renderer-react|@umijs/preset-umi|umi).+(js|jsx)$',
  ],
  unmockedModulePathPatterns: ['node_modules/react/', 'node_modules/enzyme/'],
  testURL:
    'http://localhost?navTheme=realDark&layout=mix&primaryColor=techBlue&splitMenus=false&fixedHeader=true',
  verbose: true,
  snapshotSerializers: [require.resolve('enzyme-to-json/serializer')],
  setupFiles: ['./tests/setupTests.js'],
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: false,
  },
};
