import { readFile } from 'node:fs/promises';
import { gzipSync } from 'node:zlib';

const bundlePath = process.argv[2] || 'dist/pro-components.min.js';
const bundle = await readFile(bundlePath);
const result = {
  file: bundlePath,
  rawBytes: bundle.byteLength,
  gzipBytes: gzipSync(bundle, { level: 9 }).byteLength,
};

console.log(JSON.stringify(result, null, 2));
