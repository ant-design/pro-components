/**
 * tsup 构建后重组输出目录：dist-tsup/esm -> es/、dist-tsup 根目录 CJS -> lib/
 * DTS 需复制到 es/ 以符合 package.json 的 types 字段
 */
import fs from 'node:fs';
import path from 'node:path';

const root = 'dist-tsup';

// 1. 先复制 index.d.ts 到临时位置（package.json types 指向 es/index.d.ts）
const rootDts = path.join(root, 'index.d.ts');
let dtsContent = null;
if (fs.existsSync(rootDts)) {
  dtsContent = fs.readFileSync(rootDts);
}

// 2. esm -> es
const esmPath = path.join(root, 'esm');
if (fs.existsSync(esmPath)) {
  if (fs.existsSync('es')) fs.rmSync('es', { recursive: true });
  fs.renameSync(esmPath, 'es');
  if (dtsContent) {
    fs.writeFileSync(path.join('es', 'index.d.ts'), dtsContent);
  }
  console.log('Moved dist-tsup/esm/ -> es/');
}

// 3. CJS 在根目录时，将 index.js 等移到 lib/
const cjsPath = path.join(root, 'cjs');
if (fs.existsSync(cjsPath)) {
  if (fs.existsSync('lib')) fs.rmSync('lib', { recursive: true });
  fs.renameSync(cjsPath, 'lib');
  console.log('Moved dist-tsup/cjs/ -> lib/');
} else {
  const rootIndex = path.join(root, 'index.js');
  if (fs.existsSync(rootIndex)) {
    if (!fs.existsSync('lib')) fs.mkdirSync('lib', { recursive: true });
    for (const name of fs.readdirSync(root)) {
      if (name !== 'esm' && name !== 'cjs') {
        fs.renameSync(path.join(root, name), path.join('lib', name));
      }
    }
    console.log('Moved dist-tsup CJS files -> lib/');
  }
}

if (fs.existsSync(root)) fs.rmSync(root, { recursive: true });
