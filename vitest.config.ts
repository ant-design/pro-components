import { join } from 'path';
import { defineConfig } from 'vitest/config';
/// <reference types="@vitest/browser/context" />

export default defineConfig({
  resolve: {
    alias: {
      '@ant-design/pro-components': join(__dirname, './src'),
    },
  },
  esbuild: {
    format: 'esm',
  },
  test: {
    setupFiles: ['./tests/setupTests.ts'],
    environment: 'happy-dom',
    environmentOptions: {
      happyDOM: {
        url: 'http://localhost?navTheme=realDark&layout=mix&colorPrimary=techBlue&splitMenus=false&fixedHeader=true',
      },
    },
    server: {
      deps: {
        inline: true,
      },
    },
    coverage: {
      provider: 'istanbul',
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/**/*.d.ts',
        'src/card/components/TabPane/index.tsx',
        'src/**/typing.ts',
        'src/**/demos/**',
        'src/utils/isDeepEqualReact/*.{ts,tsx}',
        'src/utils/useMountMergeState/*.{ts,tsx}',
      ],
    },
    maxWorkers: 3,
    testTimeout: 60_00, // 60 seconds
    globals: true,
  },
  // 添加兼容性配置
  optimizeDeps: {
    include: ['vite'],
  },
  build: {
    target: 'esnext',
  },
});
