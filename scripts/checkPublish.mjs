// @ts-check
/**
 * 发布前检查：原 @umijs/doctor.checkPublish 的轻量替代。
 *
 * 检查项：
 *   1. package.json files 字段引用的路径都存在
 *   2. exports 中 types/import/require 指向的文件在构建产物目录（es/lib）中存在（若已构建）
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.join(__dirname, '..');
const pkgPath = path.join(repoRoot, 'package.json');

const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

let hasError = false;
const fail = (msg) => {
  console.error(`❌ ${msg}`);
  hasError = true;
};
const ok = (msg) => console.log(`✅ ${msg}`);

// 1. files 字段
for (const pattern of pkg.files ?? []) {
  // 仅检查无通配符的直接路径
  if (pattern.includes('*')) continue;
  const target = path.join(repoRoot, pattern);
  if (!fs.existsSync(target)) {
    fail(`files 引用不存在：${pattern}`);
  }
}
ok(`files 字段检查完成（${(pkg.files ?? []).length} 项）`);

// 2. exports 指向（仅当 es/ 已构建时检查）
const esDir = path.join(repoRoot, 'es');
if (fs.existsSync(esDir)) {
  const entries = Object.values(pkg.exports ?? {}).flat();
  let missing = 0;
  for (const entry of entries) {
    const targets = typeof entry === 'string' ? [entry] : Object.values(entry);
    for (const t of targets) {
      const file = path.join(repoRoot, t.replace(/^\.\//, ''));
      if (!fs.existsSync(file)) {
        fail(`exports 指向缺失：${t}`);
        missing++;
      }
    }
  }
  ok(`exports 检查完成（缺失 ${missing} 项）`);
} else {
  console.log('ℹ️ es/ 未构建，跳过 exports 文件检查');
}

if (hasError) process.exit(1);
console.log('🎉 发布前检查通过');
