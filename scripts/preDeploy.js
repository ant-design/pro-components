const { existsSync, readdirSync } = require('fs');
const { join } = require('path');

(async () => {
  const pkgs = readdirSync(join(__dirname, '../packages')).filter(
    (pkg) => pkg.charAt(0) !== '.',
  );

  pkgs.forEach((shortName) => {
    const distPath = join(__dirname, '..', 'packages', shortName, 'es');
    const distExists = existsSync(distPath);
    if (!distExists) {
      // 如果没有先生成 dist 目录，dumi build 之后，在 codesandbox 里面会找不到 css 样式。
      console.error('Please execute "pnpm build" first!');
      process.exit(1);
    }
  });
})();
