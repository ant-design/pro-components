import { defineConfig } from 'father';

const targets = {
  edge: 141,
  firefox: 140,
  chrome: 109,
  safari: 18,
  opera: 124,
  electron: 39,
};

export default defineConfig({
  // esm 和 cjs 由 tsup 生成，father 仅负责 UMD
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
