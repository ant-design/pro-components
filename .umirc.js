import { readdirSync } from 'fs';
import { join } from 'path';

const headPkgList = [];
// utils must build before core
// runtime must build before renderer-react
const pkgList = readdirSync(join(__dirname, 'packages')).filter(
  (pkg) => pkg.charAt(0) !== '.' && !headPkgList.includes(pkg),
);

const alias = pkgList.reduce((pre, pkg) => {
  pre[`@ant-design/pro-${pkg}`] = join(__dirname, 'packages', pkg, 'src');
  return {
    ...pre,
  };
}, {});

console.log(alias);
const tailPkgList = pkgList
  .map((path) => [
    join('packages', path, 'src'),
    join('packages', path, 'docs'),
  ])
  .flat(1);

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
  alias,
  resolve: { includes: [...tailPkgList, 'docs'] },
  navs: [
    null,
    {
      title: 'GitHub',
      path: 'https://github.com/ant-design/pro-components',
    },
  ],
  analytics: {
    ga: 'UA-173569162-1',
  },
  hash: true,
  dynamicImport: {
    loading: '@ant-design/pro-skeleton',
  },
};
