const fs = require('fs');
const path = require('path');
const glob = require('glob');

// 获取所有 TypeScript 和 TSX 文件
const files = glob.sync('packages/components/src/**/*.{ts,tsx}');

// 更新导入路径
files.forEach((file) => {
  let content = fs.readFileSync(file, 'utf8');

  // 更新内部包的导入路径
  content = content.replace(
    /from ['"]@ant-design\/pro-[^'"]+['"]/g,
    (match) => {
      // 将 @ant-design/pro-xxx 替换为相对路径
      const packageName = match.match(/@ant-design\/pro-([^'"]+)/)[1];
      const relativePath = path.relative(
        path.dirname(file),
        path.join('packages/components/src', packageName),
      );
      return `from '${relativePath.startsWith('.') ? relativePath : './' + relativePath}'`;
    },
  );

  // 更新类型导入
  content = content.replace(
    /from ['"]@ant-design\/pro-components['"]/g,
    "from '../..'",
  );

  fs.writeFileSync(file, content);
});
