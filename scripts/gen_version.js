const { readdirSync, existsSync, fstat, writeFileSync } = require('fs');
const { join } = require('path');
const prettier = require('prettier');

// utils must build before core
// runtime must build before renderer-react
let packagesPath = join(__dirname, '../packages');
const pkgList = readdirSync(packagesPath)
  .filter((pkg) => pkg.charAt(0) !== '.')
  .map((pkg) => {
    const package_path = join(packagesPath, pkg);
    if (!existsSync(join(package_path, 'package.json'))) return;
    const json = require(join(package_path, 'package.json'));
    return {
      name: json.name,
      version: json.version,
    };
  });

const file_content = `

export const version = {
    ${pkgList
      .map((pak) => {
        return `"${pak.name}": '${pak.version}'`;
      })
      .join(',\n    ')}    
}
`;

writeFileSync(
  join(packagesPath, 'components', '/src/version.ts'),
  prettier.format(file_content, { parser: 'typescript' }).toString(),
);
