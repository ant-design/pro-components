import execa from 'execa';
import { join } from 'path';
import { readFileSync } from 'fs';
import getPackages from './utils/getPackages.mjs';

process.setMaxListeners(Infinity);

export default (publishPkgList) => {
  const pkgList = (publishPkgList || getPackages()).map((name) => {
    return JSON.parse(readFileSync(join(process.cwd(), 'packages', name, 'package.json'), 'utf-8')).name;
  });
  const commands = pkgList.map((pkg) => {
    const subprocess = execa('tnpm', ['sync', pkg]);
    subprocess.stdout.pipe(process.stdout);
    return subprocess;
  });
  Promise.all(commands);
};
