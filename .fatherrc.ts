import { defineConfig } from 'father';

export default defineConfig({
  esm: {
    input: 'src',
    platform: 'browser',
    transformer: 'babel',
  },
  cjs: {
    input: 'src',
    platform: 'browser',
    transformer: 'babel',
  },
});
