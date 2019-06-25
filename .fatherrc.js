export default {
  entry: 'src/index.tsx',
  esm: 'babel',
  cjs: 'babel',
  extraBabelPlugins: [['import', { libraryName: 'antd', style: true }]],
};
