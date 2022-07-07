const at_str = `function _at(_array, n) {
    n = Math.trunc(n) || 0;
    if (n < 0) n += _array.length;
    if (n < 0 || n >= _array.length) return undefined;
    return _array[n];
}`;

function transformAt(babel) {
  const t = babel.types;
  const template = babel.template;
  const ast = template(at_str)();
  return {
    visitor: {
      CallExpression(path, status) {
        const property = path.get('callee').get('property');
        const object = path.get('callee').get('object');
        const arguments = path.get('arguments');
        if (property && t.isIdentifier(property.node, { name: 'at' })) {
          const rootPath = status.file.path;
          path.replaceWith(t.callExpression(t.identifier('_at'), [object.node, arguments[0].node]));
          const firstBodyPath = rootPath.get('body')[0];
          if (
            t.isFunctionDeclaration(firstBodyPath.node) &&
            firstBodyPath.node.id.name === '_at' &&
            firstBodyPath.node.params.every((param, index) => {
              let name;
              index === 0 ? (name = '_array') : (name = 'n');
              return t.isIdentifier(param, { name });
            })
          ) {
            return;
          }
          firstBodyPath.insertBefore(ast);
        }
      },
    },
  };
}

module.exports = transformAt;
