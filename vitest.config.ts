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
      include: ['packages/**/src/**/*.{ts,tsx}'],
      exclude: [
        'packages/**/src/**/*.d.ts',
        'packages/card/src/components/TabPane/index.tsx',
        'packages/**/src/**/typing.ts',
        'packages/**/src/demos/**',
        'packages/**/src/**/demos/**',
        'packages/utils/src/isDeepEqualReact/*.{ts,tsx}',
        'packages/utils/src/useMountMergeState/*.{ts,tsx}',
      ],
    },
    maxWorkers: 3,
    testTimeout: 60_00, // 60 seconds
    globals: true,
  },
});
