import { readdirSync } from 'fs';
import { join } from 'path';
import { defineConfig } from 'vitest/config';

const pkgList = readdirSync(join(__dirname, './packages')).filter(
  (pkg: string) => pkg.charAt(0) !== '.',
);

const moduleNameMapper = {} as Record<string, any>;

pkgList.forEach((shortName: string) => {
  const name = `@ant-design/pro-${shortName}`;
  moduleNameMapper[name] = join(__dirname, `./packages/${shortName}/src`);
});

export default defineConfig({
  resolve: {
    alias: moduleNameMapper,
  },
  esbuild: {
    platform: 'browser',
    treeShaking: false,
    target: 'chrome58,firefox57,safari11,edge16',
    jsxFragment: 'Fragment',
    // 使用 ESBuild 转换所有文件以删除代码覆盖率中的注释。
    // `test.coverage.ignoreEmptyLines` 需要工作：
    include: ['**/*.js', '**/*.jsx', '**/*.mjs', '**/*.ts', '**/*.tsx'],
  },

  test: {
    globals: true,
    setupFiles: ['./tests/setupTests.ts'],
    environment: 'happy-dom',
    environmentOptions: {
      jsdom: {
        url: 'http://localhost?navTheme=realDark&layout=mix&colorPrimary=techBlue&splitMenus=false&fixedHeader=true',
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
