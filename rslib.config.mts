import { pluginReact } from '@rsbuild/plugin-react';
import { defineConfig } from '@rslib/core';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const typescriptPath = require.resolve('@typescript/native');

const browsers = [
  'Edge >= 141',
  'Firefox >= 140',
  'Chrome >= 109',
  'Safari >= 18',
  'Opera >= 124',
  'Electron >= 39',
];

const bundlelessEntry = {
  index: ['./src/**'],
};

const bundlelessOutput = (root: string) => ({
  target: 'web' as const,
  overrideBrowserslist: browsers,
  distPath: { root },
  cleanDistPath: true,
});

export default defineConfig({
  lib: [
    {
      id: 'esm',
      format: 'esm',
      bundle: false,
      autoExtension: false,
      dts: {
        tsgo: true,
        typescriptPath,
      },
      source: {
        entry: bundlelessEntry,
        tsconfigPath: './tsconfig.build.json',
      },
      output: bundlelessOutput('es'),
    },
    {
      id: 'cjs',
      format: 'cjs',
      bundle: false,
      autoExtension: false,
      dts: {
        tsgo: true,
        typescriptPath,
      },
      source: {
        entry: bundlelessEntry,
        tsconfigPath: './tsconfig.build.json',
      },
      output: bundlelessOutput('lib'),
    },
    {
      id: 'umd',
      format: 'umd',
      bundle: true,
      autoExtension: false,
      umdName: 'ProComponents',
      source: {
        entry: {
          index: './src/index.ts',
        },
        tsconfigPath: './tsconfig.build.json',
      },
      output: {
        target: 'web',
        overrideBrowserslist: browsers,
        distPath: { root: 'dist' },
        cleanDistPath: true,
        filename: {
          js: 'pro-components.min.js',
        },
        minify: true,
        externals: {
          react: {
            root: 'React',
            commonjs: 'react',
            commonjs2: 'react',
            amd: 'react',
          },
          'react-dom': {
            root: 'ReactDOM',
            commonjs: 'react-dom',
            commonjs2: 'react-dom',
            amd: 'react-dom',
          },
          antd: {
            root: 'antd',
            commonjs: 'antd',
            commonjs2: 'antd',
            amd: 'antd',
          },
          dayjs: {
            root: 'dayjs',
            commonjs: 'dayjs',
            commonjs2: 'dayjs',
            amd: 'dayjs',
          },
        },
      },
    },
  ],
  plugins: [pluginReact()],
});
