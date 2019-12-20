export default {
  doc: {
    title: 'Pro-Layout',
    logo: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
  },
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
  plugins: [['umi-plugin-githubpages', {}]],
  disableCSSModules: true,
};
