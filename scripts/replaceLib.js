function replacePath(path) {
  if (path.node.source && path.node.source.value?.includes('lib/')) {
    const esModule = path.node.source.value.replace('/lib/', '/es/');
    try {
      if (require.resolve(esModule)) {
        path.node.source.value = esModule;
      }
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
module.exports = replaceLib;
