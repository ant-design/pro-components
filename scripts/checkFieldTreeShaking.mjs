import { build } from 'esbuild';
import assert from 'node:assert/strict';

async function bundleSource(contents) {
  const result = await build({
    stdin: {
      contents,
      resolveDir: process.cwd(),
      loader: 'tsx',
    },
    bundle: true,
    splitting: true,
    format: 'esm',
    platform: 'browser',
    packages: 'external',
    metafile: true,
    outdir: 'out',
    write: false,
  });
  const main = Object.entries(result.metafile.outputs).find(([path]) =>
    path.endsWith('stdin.js'),
  );
  assert(main);
  const outputs = result.metafile.outputs;
  const initialFiles = new Set();
  const collectInitial = (path) => {
    if (initialFiles.has(path)) return;
    initialFiles.add(path);
    for (const dependency of outputs[path].imports) {
      if (dependency.kind === 'import-statement' && !dependency.external) {
        collectInitial(dependency.path);
      }
    }
  };
  collectInitial(main[0]);
  return {
    bytes: [...initialFiles].reduce(
      (size, path) => size + outputs[path].bytes,
      0,
    ),
    modules: [
      ...new Set(
        [...initialFiles].flatMap((path) => Object.keys(outputs[path].inputs)),
      ),
    ],
    allModules: [
      ...new Set(
        Object.values(result.metafile.outputs).flatMap((output) =>
          Object.keys(output.inputs),
        ),
      ),
    ],
    chunks: result.outputFiles.length - 1,
  };
}

const text = await bundleSource(
  "import { FieldText } from './src/field'; export { FieldText };",
);
const proField = await bundleSource(
  "import { ProField } from './src/field'; export { ProField };",
);
const textOnlyProField = await bundleSource(`
  import React from 'react';
  import { createProField, FieldText } from './src/field';
  export const TextOnlyProField = createProField((text, _valueType, props) =>
    <FieldText {...props} text={String(text)} />
  );
`);

assert(!text.modules.includes('src/field/AllProField.tsx'));
assert(
  !text.modules.some(
    (module) =>
      module.startsWith('src/field/components/') &&
      !module.startsWith('src/field/components/Text/'),
  ),
  'Importing FieldText must not retain unrelated field components',
);
assert(!textOnlyProField.modules.includes('src/field/AllProField.tsx'));
assert(!textOnlyProField.modules.includes('src/field/initDayjs.ts'));
assert(proField.chunks > 0, 'ProField value types must be split into chunks');
assert(
  !proField.modules.some(
    (module) =>
      module.startsWith('src/field/components/') &&
      !module.startsWith('src/field/components/Text/') &&
      module !== 'src/field/components/IndexColumn/index.tsx',
  ),
  'The initial ProField bundle must not retain lazy value types',
);
assert(
  proField.allModules.includes('src/field/initDayjs.ts'),
  'Date fields must retain dayjs plugin initialization',
);
assert(
  !textOnlyProField.modules.some(
    (module) =>
      module.startsWith('src/field/components/') &&
      !module.startsWith('src/field/components/Text/'),
  ),
  'A scoped ProField must only retain selected field components',
);

for (const [name, bundle] of [
  ['FieldText', text],
  ['ProField', proField],
  ['TextOnlyProField', textOnlyProField],
]) {
  assert(
    !bundle.modules.includes('src/provider/intl.ts'),
    `${name} must not retain the full locale registry`,
  );
  assert(
    !bundle.modules.some(
      (module) =>
        module.startsWith('src/provider/locale/') &&
        module !== 'src/provider/locale/zh_CN.tsx',
    ),
    `${name} must not retain unused locale modules`,
  );
  console.log(`${name}: ${bundle.bytes} initial bytes`);
}
