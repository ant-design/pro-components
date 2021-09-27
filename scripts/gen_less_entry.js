const fs = require('fs');
const { join } = require('path');
const fg = require('fast-glob');
const slash = require('slash');

const pkgList = fs
  .readdirSync(join(__dirname, '../', 'packages'))
  .filter((pkg) => pkg.charAt(0) !== '.');

pkgList.map(async (path) => {
  const baseUrl = slash(`${join(__dirname, '../', 'packages')}/${path}/src`);
  const lessFiles = await fg(`${baseUrl}/**/*.less`, {
    ignore: ['**/demos/**'],
    deep: 5,
  });

  const importFiles = lessFiles.map((lessPath) => {
    return `@import "../es${lessPath.replace(baseUrl, '')}";`;
  });

  const distPath = slash(`${join(__dirname, '../', 'packages', path, 'dist', `${path}.less`)}`);
  fs.writeFileSync(distPath, importFiles.join('\n'));
});
