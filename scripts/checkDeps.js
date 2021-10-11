/* eslint-disable no-param-reassign */
const parser = require('@babel/parser');
const traverse = require('@babel/traverse');
const t = require('babel-types');
const glob = require('glob');
const slash = require('slash');
const fs = require('fs');
const ora = require('ora');
const { join, posix } = require('path');

const spinner = ora();

const peerDependencies = ['antd', 'react', 'rc-field-form'];

/**
 * 替换文件中的 formatMessage
 *
 * @param {any} ast
 */
const checkDepsByAst = (ast, filePath) => {
  return new Promise((resolve) => {
    traverse.default(ast, {
      enter(path) {
        if (path.isImportDeclaration()) {
          const importPath = path.node.source.value;

          if (!importPath) return;

          if (importPath.includes('/src')) {
            resolve({
              success: false,
              message: 'import 不能包含 **/src/**',
            });
            return;
          }

          if (importPath.startsWith('.')) {
            const importFile = slash(join(__dirname, '..', filePath, '..', importPath));
            if (importFile.split('.').length > 1) {
              if (fs.existsSync(`${importFile}`)) return;
              resolve({
                success: false,
                message: `${importFile} 路径错误，请检查大小写或路径错误`,
              });
              return;
            }
            if (
              !fs.existsSync(`${importFile}.ts`) &&
              !fs.existsSync(`${importFile}.tsx`) &&
              !fs.existsSync(`${importFile}/index.tsx`) &&
              !fs.existsSync(`${importFile}/index.ts`) &&
              !fs.existsSync(`${importFile}.d.ts`)
            ) {
              resolve({
                success: false,
                message: `${importFile} 路径错误，请检查大小写或路径错误`,
              });
              return;
            }
          }
          if (!importPath.startsWith('.') && path.node.importKind !== 'type') {
            const packagePath = slash(filePath.split(posix.sep).splice(0, 2).join(posix.sep));
            try {
              // 检查包在不在
              require.resolve(importPath, {
                paths: [slash(join(__dirname, '..', packagePath))],
              });
              if (peerDependencies.every((item) => !importPath.startsWith(item))) {
                const packageName = importPath.split(posix.sep)[0];
                const packageJson = require(slash(
                  join(__dirname, '..', packagePath, 'package.json'),
                ));
                if (!JSON.stringify(packageJson.dependencies).includes(packageName)) {
                  resolve({
                    success: false,
                    message: `${packagePath} 的 ${packageName} 依赖没有在 ${slash(
                      join(__dirname, '..', packagePath, 'package.json'),
                    )} 中申明`,
                  });
                  return;
                }
              }
            } catch (error) {
              console.log(error);
              resolve({
                success: false,
                message: `${importPath} 依赖没有安装，请检查大小写或路径错误`,
              });
            }
          }
        }
      },
    });
    resolve({
      success: true,
    });
    return;
  });
};

const forEachFile = (code, filePath) => {
  const ast = parser.parse(code, {
    sourceType: 'module',
    plugins: ['jsx', 'typescript', 'dynamicImport', 'classProperties', 'decorators-legacy'],
  });
  return checkDepsByAst(ast, filePath);
};

const globList = (patternList, options) => {
  let fileList = [];
  patternList.forEach((pattern) => {
    fileList = [...fileList, ...glob.sync(pattern, options)];
  });

  return fileList;
};
const checkDeps = ({ cwd }) => {
  console.log(cwd);
  // 寻找项目下的所有 ts
  spinner.start('🕵️‍  find all code files');
  const tsFiles = globList(['packages/**/src/**/*.tsx', 'packages/**/src/**/*.tsx'], {
    cwd,
    ignore: [
      '**/*.d.ts',
      '**/demos/**',
      '**/dist/**',
      '**/public/**',
      '**/locales/**',
      '**/node_modules/**',
    ],
  });
  spinner.succeed();

  const getFileContent = (path) => fs.readFileSync(slash(path), 'utf-8');

  spinner.start('🕵️ check deps');

  tsFiles.forEach(async (path) => {
    const source = getFileContent(slash(join(cwd, path)));
    if (source.includes('import')) {
      const result = await forEachFile(source, path).catch(() => {});
      if (result.success === false) {
        console.log(`😂 ${path} 发现了错误：\n ${result.message}`);
        process.exit(2);
      }
    }
  });
  spinner.succeed();
};

/** 检查所有的根目录文件 */
checkDeps({
  cwd: slash(join(__dirname, '..')),
});
