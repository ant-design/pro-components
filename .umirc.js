import { readdirSync } from 'fs';
import { join } from 'path';

// utils must build before core
// runtime must build before renderer-react
const headPkgs = [];

const tailPkgs = readdirSync(join(__dirname, 'packages'))
  .filter(pkg => pkg.charAt(0) !== '.' && !headPkgs.includes(pkg))
  .map(path => join(path, 'src'));

export default {
  title: 'ProComponent',
  mode: 'site',
  logo: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css',
      },
    ],
  ],
  resolve: { includes: [...headPkgs, ...tailPkgs] },
  navs: [
    null,
    {
      title: 'GitHub',
      path: 'https://github.com/ant-design/pro-components',
    },
  ],
  hash: true,
};
