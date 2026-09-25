import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const outputDirectories = ['es', 'lib'];
const invalidImport = /(?:from\s+|import\()['"]src(?:\/|['"])/;
const invalidFiles = [];

const visit = (directory) => {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      visit(file);
    } else if (entry.name.endsWith('.d.ts')) {
      if (invalidImport.test(fs.readFileSync(file, 'utf8'))) {
        invalidFiles.push(path.relative(root, file));
      }
    }
  }
};

for (const outputDirectory of outputDirectories) {
  const directory = path.join(root, outputDirectory);
  if (!fs.existsSync(directory)) {
    throw new Error(`Missing declaration output directory: ${outputDirectory}`);
  }
  visit(directory);
}

if (invalidFiles.length > 0) {
  throw new Error(
    `Declaration files contain unresolved src imports:\n${invalidFiles.join('\n')}`,
  );
}

console.log('Declaration imports are package-relative.');
