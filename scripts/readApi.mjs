import fs from 'fs';
import glob from 'glob';
import path from 'path';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import parse from 'remark-parse';
import { unified } from 'unified';
import { visit } from 'unist-util-visit';

/**
 * 将字符串的首字母转换为大写。
 *
 * @param {string} str - 需要转换的字符串。
 * @returns {string} 转换后的字符串。
 */
function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * 读取指定目录下的所有 Markdown 文件
 * @param {string} directory - 需要读取的目录路径
 * @returns {Array} - 返回一个包含所有 Markdown 文件完整路径的数组
 */
function readMarkdownFiles(directory) {
  const files = glob.sync('**/**/*.md', {
    cwd: directory,
    ignore: [
      '**/node_modules/**',
      '**/CHANGELOG.md',
      '**/README.md',
      '**/*.en-US.md',
    ],
  });
  const markdownFiles = files.filter((file) => path.extname(file) === '.md');
  return markdownFiles.map((file) => path.join(directory, file));
}

/**
 * 从 Markdown 内容中提取表格数据
 * @param {string} mdContent - Markdown 文件的内容
 * @returns {Array} - 返回一个包含所有表格数据的数组
 */
function extractTableFromMd(mdContent, filePath) {
  const processor = unified().use(parse).use(remarkGfm, { singleTilde: false });

  // 解析Markdown为抽象语法树（AST）
  const ast = processor.parse(mdContent);

  // 提取表格数据
  const tableData = [];

  let tableTitle = '';

  visit(ast, (node) => {
    let tableRows = [];

    if (node.type === 'heading') {
      tableTitle = remark.stringify(node.children[0]);
    }
    if (node.type !== 'table') {
      return;
    }
    const rows = node.children.filter((child) => child.type === 'tableRow');
    rows.forEach((row) => {
      const cells = row.children.filter((child) => child.type === 'tableCell');
      const rowData = [];

      cells.forEach((cell) => {
        if (cell.children[0]?.value) {
          rowData.push(
            cell.children
              .map((child) => {
                if (child.type === 'delete') return '';
                return remark.stringify(child);
              })
              .join(''),
          );
        }
      });

      tableRows.push(rowData);
    });
    const [props, ...rest] = tableRows;
    tableRows = rest.map((row) => {
      const obj = {};
      row.forEach((cell, index) => {
        obj[props[index]?.replace(/\n/g, '').trim()] = cell
          ?.replace(/\n/g, '')
          .replace('\\-', '-')
          .trim();
      });
      return obj;
    });

    tableData.push({
      title:
        'Pro' +
        capitalizeFirstLetter(filePath.split(path.sep).at(1)) +
        ' - ' +
        tableTitle?.replace(/\n/g, '').trim(),
      table: tableRows,
    });
  });
  return {
    packageName: 'Pro' + capitalizeFirstLetter(filePath.split(path.sep).at(1)),
    tableData,
  };
}

/**
 * 从 Markdown 文件中提取 API 配置
 * @param {string} filePath - Markdown 文件的路径
 * @returns {Array} - 返回一个包含所有 API 配置的数组
 */
function extractApiConfig(filePath) {
  const markdownContent = fs.readFileSync(filePath, 'utf-8');
  return extractTableFromMd(markdownContent, filePath);
}

/**
 * 读取所有 Markdown 文件中的 API 配置
 * @param {string} directory - 需要读取的目录路径
 * @returns {Array} - 返回一个包含所有 API 配置的数组
 */
function readApiConfigs(directory) {
  const markdownFiles = readMarkdownFiles(directory);
  const apiConfigs = [];

  for (const file of markdownFiles) {
    const configs = extractApiConfig(file);
    apiConfigs.push(configs);
  }

  return apiConfigs;
}

// 指定目录路径，并读取其中的 API 配置
const directoryPath = path.join('packages/');
const apiConfigs = readApiConfigs(directoryPath);

fs.writeFileSync(
  path.join('packages/components/dist/api.json'),
  JSON.stringify(apiConfigs, null, 2),
);
