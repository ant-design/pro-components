import { spawnSync } from 'node:child_process';

/**
 * 文档站 CLI 薄封装：与 dumi / umi 工具链对齐。
 * `pnpm docs dev` → `dumi dev`，等。
 */
function runPnpmExec(args) {
  const result = spawnSync('pnpm', ['exec', ...args], {
    stdio: 'inherit',
    env: process.env,
    shell: process.platform === 'win32',
  });
  process.exit(result.status ?? 1);
}

const sub = process.argv[2] ?? 'dev';
const extra = process.argv.slice(3);

switch (sub) {
  case 'dev':
    runPnpmExec(['dumi', 'dev', ...extra]);
    break;
  case 'build':
    runPnpmExec(['dumi', 'build', ...extra]);
    break;
  case 'preview':
    runPnpmExec(['dumi', 'preview', ...extra]);
    break;
  case 'check':
    runPnpmExec(['umi', 'doctor', ...extra]);
    break;
  case 'create':
    console.error(
      'docs:create：本仓库未接 dumi 脚手架命令；请在 demos/、site/ 下按现有结构添加示例与文档。',
    );
    process.exit(1);
    break;
  default:
    console.error(
      `Unknown docs subcommand: ${sub}. Use: dev, build, preview, check, create`,
    );
    process.exit(1);
}
