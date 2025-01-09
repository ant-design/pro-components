function replaceLodashImport(path) {
  if (path.node.source && path.node.source.value?.startsWith('lodash-es/')) {
    const cjsImport = path.node.source.value.replace('lodash-es/', 'lodash/');
    try {
      if (require.resolve(cjsImport)) {
        path.node.source.value = cjsImport;
      }
    } catch (error) {
      console.log(error);
    }
  }
}

function replaceLodash() {
  return {
    visitor: {
      ImportDeclaration: replaceLodashImport,
    },
  };
}
module.exports = replaceLodash;
