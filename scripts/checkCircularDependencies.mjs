import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

const root = path.resolve('src');
const includeTypes = process.argv.includes('--include-types');
const scopeArgument = process.argv.find((argument) => argument.startsWith('--scope='));
const scope = scopeArgument?.slice('--scope='.length);
const files = [];
function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const filename = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(filename);
    else if (/\.[jt]sx?$/.test(filename)) files.push(filename);
  }
}
walk(root);

const known = new Set(files);
const graph = new Map();
for (const filename of files) {
  const source = ts.createSourceFile(
    filename,
    fs.readFileSync(filename, 'utf8'),
    ts.ScriptTarget.Latest,
    true,
  );
  const dependencies = [];
  function visit(node) {
    if (
      (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) &&
      node.moduleSpecifier &&
      ts.isStringLiteral(node.moduleSpecifier) &&
      node.moduleSpecifier.text.startsWith('.') &&
      (includeTypes ||
        (!(ts.isImportDeclaration(node) && node.importClause?.isTypeOnly) &&
          !(ts.isExportDeclaration(node) && node.isTypeOnly)))
    ) {
      const base = path.resolve(
        path.dirname(filename),
        node.moduleSpecifier.text,
      );
      const target = [
        `${base}.ts`,
        `${base}.tsx`,
        path.join(base, 'index.ts'),
        path.join(base, 'index.tsx'),
      ].find((candidate) => known.has(candidate));
      if (target) dependencies.push(target);
    }
    ts.forEachChild(node, visit);
  }
  visit(source);
  graph.set(filename, dependencies);
}

let nextIndex = 0;
const indices = new Map();
const lowlinks = new Map();
const stack = [];
const onStack = new Set();
const cycles = [];
function visit(filename) {
  indices.set(filename, nextIndex);
  lowlinks.set(filename, nextIndex++);
  stack.push(filename);
  onStack.add(filename);
  for (const dependency of graph.get(filename)) {
    if (!indices.has(dependency)) {
      visit(dependency);
      lowlinks.set(
        filename,
        Math.min(lowlinks.get(filename), lowlinks.get(dependency)),
      );
    } else if (onStack.has(dependency)) {
      lowlinks.set(
        filename,
        Math.min(lowlinks.get(filename), indices.get(dependency)),
      );
    }
  }
  if (lowlinks.get(filename) === indices.get(filename)) {
    const component = [];
    let member;
    do {
      member = stack.pop();
      onStack.delete(member);
      component.push(member);
    } while (member !== filename);
    if (component.length > 1 || graph.get(filename).includes(filename)) {
      cycles.push(component);
    }
  }
}
for (const filename of files) if (!indices.has(filename)) visit(filename);

const scopedCycles = scope
  ? cycles.filter((component) =>
      component.some((filename) =>
        path.relative(root, filename).replaceAll('\\', '/').startsWith(`${scope}/`),
      ),
    )
  : cycles;

for (const component of scopedCycles) {
  console.error(`Circular dependency (${component.length} modules):`);
  for (const filename of component) {
    for (const dependency of graph.get(filename)) {
      if (component.includes(dependency)) {
        console.error(
          `  ${path.relative(root, filename)} -> ${path.relative(root, dependency)}`,
        );
      }
    }
  }
}
console.log(
  `Checked ${files.length} source modules; ${scopedCycles.length} cycles found${scope ? ` in ${scope}` : ''}.`,
);
if (scopedCycles.length) process.exitCode = 1;
