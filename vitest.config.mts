import { join } from 'path';
import { defineConfig } from 'vitest/config';
import { TEST_INITIAL_URL } from './tests/testConstants';
/// <reference types="@vitest/browser/context" />

export default defineConfig({
  resolve: {
    alias: {
      '@ant-design/pro-components': join(process.cwd(), './src'),
    },
  },
  test: {
    setupFiles: ['./tests/setupTests.ts'],
    environment: 'happy-dom',
    environmentOptions: {
      happyDOM: {
        url: TEST_INITIAL_URL,
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
      ],
    },
    testTimeout: 600_0000, // 60 seconds
    globals: true,
  },
});
