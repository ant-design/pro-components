// @ts-check
// Check internal doc links: scan site/**/*.mdx for site-relative links and
// verify each target route exists. Route rules: zh-CN/x.mdx -> /x,
// en-US/x.mdx -> /en-US/x, dir/index.mdx -> dir path.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const siteRoot = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
  'site',
);

function collectRoutes(dir, prefix = '') {
  const routes = new Set();
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const nextPrefix = `${prefix}/${entry.name}`;
      for (const r of collectRoutes(full, nextPrefix)) routes.add(r);
    } else if (entry.name.endsWith('.mdx')) {
      const routePath = `${prefix}/${entry.name.replace(/\.mdx$/, '')}`;
      routes.add(routePath);
      if (entry.name === 'index.mdx') routes.add(prefix || '/');
    }
  }
  return routes;
}

const zhRoutes = collectRoutes(path.join(siteRoot, 'zh-CN'), '/zh-CN');
const enRoutes = collectRoutes(path.join(siteRoot, 'en-US'), '/en-US');
const linkPattern = /\]\((\/[^)\s]+?)(#[^)\s]*)?\)/g;
const problems = [];

function checkFile(file, routes) {
  const content = fs.readFileSync(file, 'utf8');
  const found = [];
  for (const m of content.matchAll(linkPattern)) {
    const link = m[1];
    const normalized = link !== '/' ? link.replace(/\/$/, '') : link;
    // zh docs may intentionally link to /en-US/... paths and vice versa;
    // strip the locale prefix when checking cross-language targets
    const locales = ['/en-US', '/zh-CN'];
    const candidates = [normalized];
    for (const locale of locales) {
      if (normalized === locale || normalized.startsWith(`${locale}/`)) {
        candidates.push(normalized === locale ? '/' : normalized.slice(locale.length));
      }
    }
    const exists = candidates.some(
      (c) => zhRoutes.has(c) || enRoutes.has(c) || zhRoutes.has(`/zh-CN${c}`) || enRoutes.has(`/en-US${c}`),
    );
    if (!exists) {
      found.push(`${path.relative(siteRoot, file)}: broken link ${link}`);
    }
  }
  return found;
}

for (const dir of ['zh-CN', 'en-US']) {
  const base = path.join(siteRoot, dir);
  const stack = [base];
  while (stack.length) {
    const current = stack.pop();
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) {
        stack.push(full);
      } else if (entry.name.endsWith('.mdx')) {
        problems.push(...checkFile(full, dir === 'zh-CN' ? zhRoutes : enRoutes));
      }
    }
  }
}

if (problems.length) {
  console.error(`Found ${problems.length} broken links:`);
  for (const p of [...new Set(problems)]) console.error(`  ${p}`);
  process.exit(1);
}
console.log('All internal doc links resolve.');
