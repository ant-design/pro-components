import { existsSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { yParser } from '@umijs/utils';

(async () => {
  const args = yParser(process.argv);
  const version = '1.0.0-beta.1';

  const pkgs = readdirSync(join(__dirname, '../packages')).filter(
    (pkg) => pkg.charAt(0) !== '.',
  );

  pkgs.forEach((shortName) => {
    const name = `@ant-design/pro-${shortName}`;

    const pkgJSONPath = join(
      __dirname,
      '..',
      'packages',
      shortName,
      'package.json',
    );
    const pkgJSONExists = existsSync(pkgJSONPath);
    let json;
    if (args.force || !pkgJSONExists) {
      json = {
        name,
        version,
        description: name,
        module: 'es/index.js',
        main: 'lib/index.js',
        types: 'lib/index.d.ts',
        files: ['lib', 'src', 'dist', 'es'],
        repository: {
          type: 'git',
          url: 'https://github.com/ant-design/pro-components',
        },
        browserslist: ['last 2 versions', 'Firefox ESR', '> 1%'],
        keywords: ['antd', 'admin', 'ant-design', 'ant-design-pro'],
        authors: [
          'chencheng <sorrycc@gmail.com> (https://github.com/sorrycc)',
          'chenshuai2144 <qixian.cs@outlook.com> (https://github.com/chenshuai2144)',
        ],
        license: 'MIT',
        bugs: 'http://github.com/umijs/plugins/issues',
        homepage: `https://github.com/ant-design/pro-components/tree/master/packages/${shortName}#readme`,
        peerDependencies: {
          umi: '3.x',
        },
        publishConfig: {
          access: 'public',
        },
      };
      writeFileSync(pkgJSONPath, `${JSON.stringify(json, null, 2)}\n`);
    } else if (pkgJSONExists) {
      const pkg = JSON.parse(readFileSync(pkgJSONPath, 'utf-8'));
      [
        'dependencies',
        'devDependencies',
        'peerDependencies',
        'bin',
        'version',
        'files',
        'authors',
        'types',
        'sideEffects',
        'main',
        'module',
        'description',
      ].forEach((key) => {
        if (pkg[key]) json[key] = pkg[key];
      });
    }

    const readmePath = join(
      __dirname,
      '..',
      'packages',
      shortName,
      'README.md',
    );
    if (args.force || !existsSync(readmePath)) {
      writeFileSync(
        readmePath,
        `# ${name}

> ${json.description}.

See our website [${name}](https://umijs.org/plugins/${shortName}) for more information.

## Install

Using npm:

\`\`\`bash
$ npm install --save ${name}
\`\`\`

or using pnpm:

\`\`\`bash
$ pnpm add ${name}
\`\`\`
`,
      );
    }
  });
})();
