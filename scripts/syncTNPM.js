/* eslint-disable global-require */
const { execa } = require('@umijs/utils');
const { join } = require('path');
const getPackages = require('./utils/getPackages');

process.setMaxListeners(Infinity);

module.exports = (publishPkgList) => {
  const pkgList = (publishPkgList || getPackages()).map((name) => {
    // eslint-disable-next-line import/no-dynamic-require
    return require(join(__dirname, '../packages', name, 'package.json')).name;
  });
  const commands = pkgList.map((pkg) => {
    const subprocess = execa('tnpm', ['sync', pkg]);
    subprocess.stdout.pipe(process.stdout);
    return subprocess;
  });
  Promise.all(commands);
};
