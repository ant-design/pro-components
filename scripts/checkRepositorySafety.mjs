import { existsSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repositoryRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
);

const forbiddenFiles = [
  '.vscode/tasks.json',
  '.vscode/setup.js',
  '.vscode/setup.cjs',
  '.vscode/setup.mjs',
];

const violations = forbiddenFiles.filter((file) =>
  existsSync(path.join(repositoryRoot, file)),
);

const claudeDirectory = path.join(repositoryRoot, '.claude');
if (existsSync(claudeDirectory)) {
  for (const entry of readdirSync(claudeDirectory, { withFileTypes: true })) {
    if (entry.isFile() && /\.(?:c?js|mjs)$/u.test(entry.name)) {
      violations.push(`.claude/${entry.name}`);
    }
  }
}

if (violations.length > 0) {
  console.error(
    `Unsafe repository automation files are not allowed:\n${violations
      .map((file) => `- ${file}`)
      .join('\n')}`,
  );
  process.exitCode = 1;
} else {
  console.log('Repository automation safety check passed.');
}
