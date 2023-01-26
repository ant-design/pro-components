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
    '!packages/**/src/**/*.d.ts',
    '!packages/**/src/**/typing.ts',
    '!packages/**/src/demos/**',
    '!packages/**/src/**/demos/**',
    '!packages/utils/src/isDeepEqualReact/*.{ts,tsx}',
    '!packages/utils/src/useMountMergeState/*.{ts,tsx}',
  ],
  testEnvironment: 'jsdom',
  moduleNameMapper,
  transform: {
    '^.+\\.(t|j)sx?$': ['esbuild-jest', { sourcemap: true }],
  },
  cacheDirectory: './.jest/cache',
  transformIgnorePatterns: [`/node_modules/(?!${[].join('|')})`],
  unmockedModulePathPatterns: ['node_modules/react/', 'node_modules/enzyme/'],
  testURL:
    'http://localhost?navTheme=realDark&layout=mix&colorPrimary=techBlue&splitMenus=false&fixedHeader=true',
  verbose: true,
  snapshotSerializers: [require.resolve('enzyme-to-json/serializer')],
  setupFiles: ['./tests/setupTests.js'],
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: false,
  },
};
