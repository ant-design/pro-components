import { defineConfig } from 'father';

const targets = {
  edge: 142,
  firefox: 140,
  chrome: 112,
  safari: 18.5,
  opera: 124,
  electron: 39,
};

export default defineConfig({
  // 以下为 esm 配置项启用时的默认值，有自定义需求时才需配置
  esm: {
    input: 'src', // 默认编译目录
    output: 'es',
    platform: 'browser', // 默认构建为 Browser 环境的产物
    transformer: 'babel', // 默认使用 babel 以提供更好的兼容性
    targets,
  },
  // 以下为 cjs 配置项启用时的默认值，有自定义需求时才需配置
  cjs: {
    input: 'src', // 默认编译目录
    output: 'lib',
    platform: 'browser', // 默认构建为 Node.js 环境的产物
    transformer: 'babel', // 默认使用 esbuild 以获得更快的构建速度
    targets,
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
