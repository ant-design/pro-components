import { defineConfig } from 'tsup';

/**
 * tsup 构建 ESM 和 CJS，输出到 es/、lib/
 * UMD 由 father 单独构建
 */
export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  target: 'chrome109',
  keepNames: true,
  legacyOutput: true,
  outDir: 'dist-tsup',
});
