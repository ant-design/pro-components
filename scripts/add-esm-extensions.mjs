/**
 * 为 ESM 构建产物的相对导入/导出路径添加 .js 扩展名
 * 以支持 Rspack、Vite、Webpack 5 等严格 ESM 兼容的构建工具
 *
 * 在 package.json 含 "type": "module" 时，Node.js 和现代打包工具要求
 * 所有相对导入路径必须是完整指定（fully specified）的，即必须包含 .js 扩展名
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ES_DIR = path.resolve(__dirname, '../es');

const EXTENSION_PATTERN = /\.(js|mjs|cjs|json)$/;

function resolveFullySpecifiedPath(baseDir, specifier) {
  if (EXTENSION_PATTERN.test(specifier)) return specifier;

  const resolvedPath = path.resolve(baseDir, specifier);

  if (fs.existsSync(resolvedPath + '.js')) return specifier + '.js';

  if (fs.existsSync(path.join(resolvedPath, 'index.js'))) {
    return (specifier.endsWith('/') ? specifier : specifier + '/') + 'index.js';
  }

  return specifier + '.js';
}

function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const baseDir = path.dirname(filePath);
  const relativePathRegex = /(?:from|import)\s+['"](\.\.[\/\\][^'"]*|\.\/[^'"]*)['"]/g;

  let newContent = content;
  let hasChanges = false;

  newContent = newContent.replace(relativePathRegex, (match) => {
    const pathMatch = match.match(/['"]([^'"]+)['"]/);
    if (!pathMatch || !pathMatch[1].startsWith('.')) return match;

    const normalized = pathMatch[1].replace(/\\/g, '/');
    const resolved = resolveFullySpecifiedPath(baseDir, normalized);
    if (resolved !== normalized) {
      hasChanges = true;
      return match.replace(pathMatch[1], resolved);
    }
    return match;
  });

  if (hasChanges) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    return true;
  }
  return false;
}

function walkDir(dir, callback) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) walkDir(fullPath, callback);
    else if (entry.name.endsWith('.js')) callback(fullPath);
  }
}

let count = 0;
walkDir(ES_DIR, (f) => { if (processFile(f)) count++; });
if (count > 0) console.log(`Added .js extensions to ${count} file(s).`);
