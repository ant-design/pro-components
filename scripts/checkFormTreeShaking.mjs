import { build } from 'esbuild';
import assert from 'node:assert/strict';

for (const [name, entry] of [
  ['ProFormText', './src/form'],
  ['ProFormText from package root', './src'],
  ['ProForm', './src/form'],
  ['ProFormGroup', './src/form'],
  ['BetaSchemaForm', './src/form'],
]) {
  const importedName = name.split(' ')[0];
  const result = await build({
    stdin: {
      contents: `import { ${importedName} } from '${entry}'; export { ${importedName} };`,
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
  const output = Object.entries(result.metafile.outputs).find(([path]) =>
    path.endsWith('stdin.js'),
  );
  if (!output) throw new Error('Missing entry output');
  const modules = Object.keys(output[1].inputs).filter((path) =>
    path.startsWith('src/form/'),
  );
  console.log(`${name}: ${output[1].bytes} initial bytes, ${modules.length} form modules`);
  if (importedName !== 'BetaSchemaForm') {
    assert(!modules.includes('src/form/components/SchemaForm/index.tsx'));
  }
  if (importedName === 'ProFormText') {
    assert(
      !modules.includes('src/form/components/List/index.tsx'),
      'A text field must not retain the FormList implementation',
    );
    assert(!modules.includes('src/form/BaseForm/BaseForm.tsx'));
    assert(
      !modules.some((module) => module.includes('LightFilter/LightWrapper')),
      'A text field must not retain LightWrapper in the initial chunk',
    );
    assert(
      !modules.includes('src/form/components/FormItem/warpFieldLightMode.tsx'),
      'LightFilter popover field path must be lazy-loaded',
    );
    assert(
      !modules.includes('src/form/components/Dependency/index.tsx'),
      'A text field must not retain ProFormDependency in the initial chunk',
    );
    assert(
      !modules.includes('src/form/components/FormItem/warpFieldDependency.tsx'),
      'Dependency branch must be lazy-loaded',
    );
  }
  if (importedName === 'ProFormGroup') {
    assert(
      !modules.includes('src/form/BaseForm/BaseForm.tsx'),
      'Importing ProFormGroup must not retain BaseForm',
    );
  }
}
