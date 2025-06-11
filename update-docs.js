const fs = require('fs');
const path = require('path');

// 递归获取所有 md 文件
function getAllFiles(dir) {
  const files = fs.readdirSync(dir);
  let mdFiles = [];

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      mdFiles = mdFiles.concat(getAllFiles(filePath));
    } else if (file.endsWith('.md')) {
      mdFiles.push(filePath);
    }
  });

  return mdFiles;
}

// 检查文件是否存在
function checkFileExists(filepath) {
  try {
    return fs.existsSync(filepath);
  } catch (err) {
    return false;
  }
}

// 从路径中提取组件信息
function extractPaths(srcPath) {
  // 移除开头的 src/ 和多余的 ../
  const cleanPath = srcPath
    .replace(/^src\//, '')
    .replace(/\.\.\.\.\//, '../')
    .replace(/\.\.\/\.\.\/\.\.\/\.\.\//, '../');

  const parts = cleanPath.split('/');
  const fileName = parts[parts.length - 1];

  // 查找主要组件名（如 card, table, form 等）
  let mainComponent = '';
  let subComponent = '';

  for (let i = 0; i < parts.length; i++) {
    if (
      ['card', 'table', 'form', 'layout', 'descriptions', 'field'].includes(
        parts[i],
      )
    ) {
      mainComponent = parts[i];
      // 查找子组件（如 StatisticCard, CheckCard 等）
      if (parts[i + 2] && parts[i + 2] !== 'demos') {
        subComponent = parts[i + 2];
      }
      break;
    }
  }

  return { mainComponent, subComponent, fileName };
}

// 尝试找到正确的文件路径
function findCorrectPath(srcPath) {
  const { mainComponent, subComponent, fileName } = extractPaths(srcPath);

  // 可能的路径组合
  const possiblePaths = [
    // 如果有子组件，优先查找子组件目录
    subComponent && path.join('demos', mainComponent, subComponent, fileName),
    // 主组件目录
    path.join('demos', mainComponent, fileName),
    // 根目录
    path.join('demos', fileName),
  ].filter(Boolean);

  // 检查哪个路径存在
  for (const testPath of possiblePaths) {
    if (checkFileExists(testPath)) {
      return testPath;
    }
  }

  // 如果都不存在，返回最可能的路径
  return subComponent
    ? path.join('demos', mainComponent, subComponent, fileName)
    : path.join('demos', mainComponent, fileName);
}

// 处理文件内容
function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let hasChanges = false;

  // 使用正则表达式匹配所有的 code 标签
  const codeTagRegex = /<code src="([^"]+)"([^>]*)>/g;

  content = content.replace(codeTagRegex, (match, srcPath, rest) => {
    let componentDir = filePath?.split('/').at(-2).split('.').at(0);
    if (componentDir === 'docs') {
      componentDir = filePath?.split('/').at(-1).split('.').at(0);
    }
    if (componentDir === 'components') {
      componentDir = filePath?.split('/').at(-1).split('.').at(0);
    }

    if (srcPath.includes('demos') && srcPath.includes(componentDir + '/')) {
      if (checkFileExists(path.join(filePath, '..', srcPath))) {
        return match;
      }
    }

    console.log(srcPath);
    // 找到正确的路径
    const correctPath = findCorrectPath(srcPath);
    const newPath = '' + correctPath;

    if (srcPath !== newPath) {
      //   console.log(`${filePath}:\n  ${srcPath} ->\n  ${newPath}`);
      hasChanges = true;
    }

    return `<code src="${newPath}"${rest}>`;
  });

  if (hasChanges) {
    // fs.writeFileSync(filePath, content, 'utf8');
  }
}

// 获取所有 md 文件并处理
console.log('开始处理文档文件...\n');
const mdFiles = getAllFiles('docs');
mdFiles.forEach((file) => {
  try {
    processFile(file);
  } catch (error) {
    console.error(`处理文件 ${file} 时出错:`, error);
  }
});
console.log('\n处理完成！');
