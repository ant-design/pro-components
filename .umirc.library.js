export default {
  entry: 'src/index.tsx',
  esm: 'rollup',
  cjs: 'rollup',
  extraBabelPlugins: [['import', { libraryName: 'antd', style: true }]],
};
