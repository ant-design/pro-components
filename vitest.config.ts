import { join } from 'path';
import { defineConfig } from 'vitest/config';
const moduleNameMapper = {} as Record<string, any>;

[
  'components',
  'skeleton',
  'form',
  'field',
  'card',
  'provider',
  'utils',
  'descriptions',
  'table',
  'layout',
].forEach((shortName: string) => {
  const name = `@ant-design/pro-${shortName}`;
  moduleNameMapper[name] = join(__dirname, `./packages/${shortName}/src`);
});

export default defineConfig({
  resolve: {
    alias: moduleNameMapper,
  },
  esbuild: {
    format: 'esm',
  },
  test: {
    globals: true,
    setupFiles: ['./tests/setupTests.ts'],
    environment: 'happy-dom',
    environmentOptions: {
      happyDOM: {
        url: 'http://localhost?navTheme=realDark&layout=mix&colorPrimary=techBlue&splitMenus=false&fixedHeader=true',
      },
    },
    server: {
      deps: {
        inline: ['antd'],
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
    testTimeout: 60_000,
  },
});
