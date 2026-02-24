import { defineConfig } from 'father';

const targets = {
  edge: 141,
  firefox: 140,
  chrome: 109,
  safari: 18,
  opera: 124,
  electron: 39,
};

const baseConfig = {
  platform: 'browser', // 默认构建为 Browser 环境的产物
  transformer: 'babel', // 默认使用 babel 以提供更好的兼容性
  parallel: true,
  targets,
} as const;

export default defineConfig({
  esm: {
    output: 'es',
    ...baseConfig,
  },
  cjs: {
    output: 'lib',
    ...baseConfig,
  },
  umd: {
    name: 'ProComponents',
    output: 'dist',
    externals: {
      react: 'React',
      'react-dom': 'ReactDOM',
      '^/antd/.*': 'antd',
      '^/dayjs/.*': 'dayjs',
    },
    targets,
  },
});
