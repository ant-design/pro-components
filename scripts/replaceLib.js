const { join, dirname } = require('path');
const fs = require('fs');

function replacePath(path) {
  if (path.node.source && /\/es\//.test(path.node.source.value)) {
    const esModule = path.node.source.value.replace('/es/', '/lib/');
    const esPath = dirname(join(__dirname, '../', `node_modules/${esModule}`));
    console.log(path.node.source.value, esPath);
    try {
      if (require.resolve(esPath)) {
        path.node.source.value = esModule;
      }
    } catch (error) {}
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
