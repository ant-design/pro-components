import fs from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(import.meta.url);

const fail = (message) => {
  throw new Error(message);
};

const visit = (directory) =>
  fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(directory, entry.name);
    return entry.isDirectory() ? visit(file) : [file];
  });

const sourceRoot = path.join(root, 'src');
const sourceFiles = visit(sourceRoot).filter(
  (file) => /\.[jt]sx?$/.test(file) && !file.endsWith('.d.ts'),
);
const missingOutputs = [];

for (const sourceFile of sourceFiles) {
  const relative = path
    .relative(sourceRoot, sourceFile)
    .replace(/\.[jt]sx?$/, '');
  for (const outputDirectory of ['es', 'lib']) {
    for (const extension of ['.js', '.d.ts']) {
      const outputFile = path.join(
        root,
        outputDirectory,
        `${relative}${extension}`,
      );
      if (!fs.existsSync(outputFile)) {
        missingOutputs.push(path.relative(root, outputFile));
      }
    }
  }
}

if (missingOutputs.length > 0) {
  fail(`Missing build outputs:\n${missingOutputs.join('\n')}`);
}

const packageJson = JSON.parse(
  fs.readFileSync(path.join(root, 'package.json'), 'utf8'),
);
if (!packageJson.sideEffects?.includes('**/initDayjs.*')) {
  fail('package.json must preserve the Day.js plugin initialization module.');
}
for (const field of ['main', 'module', 'types', 'unpkg']) {
  const outputFile = path.join(root, packageJson[field]);
  if (!fs.existsSync(outputFile)) {
    fail(
      `package.json#${field} points to a missing file: ${packageJson[field]}`,
    );
  }
}

const esmEntry = fs.readFileSync(path.join(root, packageJson.module), 'utf8');
if (!esmEntry.includes('export * from "./card/index.js"')) {
  fail('ESM entry does not preserve module exports with explicit extensions.');
}

const cjsEntry = fs.readFileSync(path.join(root, packageJson.main), 'utf8');
if (!cjsEntry.includes('require("./card/index.js")')) {
  fail(
    'CommonJS entry does not preserve module exports with explicit extensions.',
  );
}

const umdEntry = fs.readFileSync(path.join(root, packageJson.unpkg), 'utf8');
for (const dependency of ['react', 'react-dom', 'antd', 'dayjs']) {
  if (!umdEntry.includes(`require("${dependency}")`)) {
    fail(
      `UMD entry does not externalize ${dependency} for CommonJS consumers.`,
    );
  }
}

for (const entry of [packageJson.main, packageJson.unpkg]) {
  const exports = require(path.join(root, entry));
  if (
    typeof exports.ProTable !== 'function' ||
    typeof exports.ProForm !== 'function'
  ) {
    fail(`${entry} does not expose the expected public components.`);
  }
}

const browserContext = {
  React: require('react'),
  ReactDOM: require('react-dom'),
  antd: require('antd'),
  dayjs: require('dayjs'),
};
browserContext.globalThis = browserContext;
vm.runInNewContext(umdEntry, browserContext);
if (
  typeof browserContext.ProComponents?.ProTable !== 'function' ||
  typeof browserContext.ProComponents?.ProForm !== 'function'
) {
  fail('UMD browser globals do not expose the expected public components.');
}

console.log(
  `Build outputs verified: ${sourceFiles.length} source modules and package entry points.`,
);
