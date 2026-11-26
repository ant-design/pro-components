import { transform } from 'esbuild';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { register } from 'tsx/cjs/api';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
register();
const require = createRequire(import.meta.url);
const { extractAllProStyle } = require(
  path.join(root, 'lib/static-style-extract.js'),
);
const css = extractAllProStyle();
const invalidPattern = /NaN|undefined|\[object Object\]|var\([^)]*\)px/;
if (invalidPattern.test(css)) {
  throw new Error('Generated static CSS contains invalid interpolated values.');
}
for (const selector of ['.ant-pro-layout-bg-list', '.ant-pro-table-search']) {
  if (!css.includes(selector)) {
    throw new Error(`Generated static CSS is missing ${selector}.`);
  }
}

const { code: minified } = await transform(css, {
  loader: 'css',
  minify: true,
  target: ['chrome109', 'edge141', 'firefox140', 'safari18'],
});
fs.writeFileSync(path.join(root, 'dist/pro-components.css'), css);
fs.writeFileSync(path.join(root, 'dist/pro-components.min.css'), minified);
console.log(
  `Static CSS generated: ${Buffer.byteLength(css)} bytes (${Buffer.byteLength(minified)} bytes minified).`,
);
