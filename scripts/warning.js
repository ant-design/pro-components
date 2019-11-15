const chalk = require('chalk');

console.log(
  chalk.hex('#cf1322')(
    `
    Pro-Layout 在 4.7 中支持了 subMenu 的 render, 会导致 menu 变成蓝色的问题。
    解决方案如下：https://github.com/ant-design/ant-design-pro-layout/issues/186
    `,
  ),
);
