import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * 文档站 CLI 薄封装：与 dumi 对齐。
 * `check` → `@umijs/doctor` 的 publish 检查（同 `pnpm checkPublish`）。
 */
function runPnpmExec(args) {
  const result = spawnSync('pnpm', ['exec', ...args], {
    stdio: 'inherit',
    env: process.env,
    shell: process.platform === 'win32',
  });
  process.exit(result.status ?? 1);
}

function runNodeScript(scriptName, extraArgs) {
  const scriptPath = path.join(__dirname, scriptName);
  const result = spawnSync('node', [scriptPath, ...extraArgs], {
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
    runNodeScript('checkPublish.mjs', extra);
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
