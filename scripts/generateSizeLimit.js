const path = require('path');
const fs = require('fs');
const writePkg = require('write-pkg');

const cwd = process.cwd();
const ignoreDirPath = ['.DS_Store'];

const filePath = path.resolve(cwd, 'package.json');
const packagesDir = path.resolve(cwd, 'packages');
const json = JSON.parse(fs.readFileSync(filePath, 'utf8'));

delete json['size-limit'];

let componentsNames = fs.readdirSync(packagesDir);

componentsNames = componentsNames.filter(dir => ignoreDirPath.indexOf(dir) === -1);

(async () => {
  const sizeLimitConfig = [];
  componentsNames.forEach(component => {
    sizeLimitConfig.push({
      path: `packages/${component}/dist/*.min.js`,
      limit: '2 s'
    });
  });

  await writePkg(cwd, { ...json, 'size-limit': sizeLimitConfig });
})();
