import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * 文档站 CLI 薄封装：转发到 Rspress。
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
    runPnpmExec(['rspress', 'dev', ...extra]);
    break;
  case 'build':
    runPnpmExec(['rspress', 'build', ...extra]);
    break;
  case 'preview':
    runPnpmExec(['rspress', 'preview', ...extra]);
    break;
  default:
    console.error(
      `Unknown docs subcommand: ${sub}. Use: dev, build, preview`,
    );
    process.exit(1);
}
