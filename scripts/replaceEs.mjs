function replacePath(path) {
  if (path.node.source && path.node.source.value?.includes('es/')) {
    const esModule = path.node.source.value.replace('/es/', '/lib/');
    try {
      // 在 ESM 模式下，我们直接替换路径，不检查文件是否存在
      path.node.source.value = esModule;
    } catch (error) {
      console.log(error);
    }
  }
}

function replaceLib() {
  return {
    visitor: {
      ImportDeclaration: replacePath,
      ExportNamedDeclaration: replacePath,
    },
  };
}

export default replaceLib;
