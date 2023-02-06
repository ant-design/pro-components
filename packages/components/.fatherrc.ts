import { defineConfig } from 'father';

export default defineConfig({
  extends: '../../.fatherrc.base.ts',
  umd: {
    name: 'ProComponents',
    output: 'dist',
  },
});
