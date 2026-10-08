// @ts-check
/**
 * 生成 site/theme/site-defaults.css（幂等）
 *
 * 来源三处：
 *   1. site/theme/markdownExternalLink.less   → 外链图标（data URI 内联为纯 CSS）
 *   2. site/theme/otkTaskListSimpleSiteDefaults.less → 任务列表默认样式
 *   3. 原 .dumirc.ts styles 数组             → 文档排版规则
 *
 * dumi 的 [data-prefers-color='dark'] 在 Rspress 中对应 [data-theme='dark']。
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');
const themeDir = path.join(repoRoot, 'site', 'theme');
const outFile = path.join(themeDir, 'site-defaults.css');

/** 从 Less 源文件提取 @var: '...' 变量并替换引用，输出纯 CSS */
function compileLessToCss(lessSource) {
  const vars = {};
  let src = lessSource.replace(
    /^@( [\w-]+ ):\s*'([^']*)';?\s*$/gm,
    (_m, name, value) => {
      vars[name.trim()] = value;
      return '';
    },
  );
  // 去掉 Less 注释
  src = src.replace(/^\/\/.*$/gm, '');
  // 变量替换
  for (const [name, value] of Object.entries(vars)) {
    src = src.split(`@${name}`).join(value);
  }
  // 嵌套规则拍平太复杂，这里源文件本身结构简单：
  // markdownExternalLink.less 的嵌套块手工等价展开见下方 FALLBACK。
  return { css: src, vars };
}

function main() {
  const mdLinkLess = fs.readFileSync(
    path.join(themeDir, 'markdownExternalLink.less'),
    'utf8',
  );
  const otkLess = fs.readFileSync(
    path.join(themeDir, 'otkTaskListSimpleSiteDefaults.less'),
    'utf8',
  );

  const iconLight =
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMiAxMiI+PHBhdGggZmlsbD0iYmxhY2siIGQ9Ik0xMCAxaDF2NGgtMVYzLjRMNi43IDYuNyA2IDZsNC00VjF6TTIgM2gzdjFIM3Y2aDZWOGgxdjNhMSAxIDAgMDEtMSAxSDNhMSAxIDAgMDEtMS0xVjRhMSAxIDAgMDExLTF6Ii8+PC9zdmc+';
  const iconDark =
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMiAxMiI+PHBhdGggZmlsbD0iYmxhY2siIGQ9Ik0xMSAxSDd2MWgyLjU5TDUuMjkgNi4yOWwuNzEuNzFMMTAgMi41OVY1aDFWMXpNMSAzdjhoOFY2SDh2NEgyVjRoNFYzSDF6Ii8+PC9zdmc+';

  // markdownExternalLink.less 的平铺等价形式（Less 嵌套 → 纯 CSS）
  const mdLinkCss = `\
.markdown a[target='_blank']:not(:has(svg))::after {
  content: '';
  display: inline-block;
  width: 0.85em;
  height: 0.85em;
  margin-inline-start: 0.25em;
  vertical-align: -0.125em;
  background-color: currentcolor;
  mask-image: url('${iconLight}');
  mask-repeat: no-repeat;
  mask-position: center;
  mask-size: contain;
  -webkit-mask-image: url('${iconLight}');
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-position: center;
  -webkit-mask-size: contain;
}

[data-theme='dark'] .markdown a[target='_blank']:not(:has(svg))::after {
  mask-image: url('${iconDark}');
  -webkit-mask-image: url('${iconDark}');
}

.markdown a[target='_blank'] svg {
  fill: currentcolor;
  stroke: currentcolor;
  vertical-align: -0.125em;
}

.markdown a[target='_blank'] svg :is(path, polygon, circle, rect):not([fill='none']) {
  fill: currentcolor;
}

.markdown a[target='_blank'] svg :is(path, polygon, circle, rect)[stroke]:not([stroke='none']) {
  stroke: currentcolor;
}
`;

  // otk Less 是平铺的，直接去注释
  const otkCss = otkLess.replace(/^\/\/.*$/gm, '').trim();

  // .dumirc.ts styles 数组的等价规则（选择器从 .dumi-default-previewer 换成 Rspress 的预览容器）
  const typographyCss = `\
/* ── 组件文档排版（对齐原 .dumirc.ts styles 注入规则） ── */
.markdown table {
  table-layout: fixed;
}

.rspress-doc h2 {
  margin-top: 40px;
  margin-bottom: 16px;
  font-weight: 600;
}

.rspress-doc h2:first-child {
  margin-top: 0;
}

.rspress-doc h3 {
  margin-top: 28px;
  margin-bottom: 12px;
  font-weight: 600;
}

.rspress-doc h4 {
  margin-top: 22px;
  margin-bottom: 8px;
  font-weight: 600;
}

.rspress-doc p {
  margin: 12px 0;
  line-height: 1.75;
  max-width: 960px;
}

.rspress-doc ul,
.rspress-doc ol {
  margin: 12px 0 16px;
  padding-left: 1.25em;
  line-height: 1.75;
}

/* 代码块（对齐 .dumi/global.less 暗色代码样式，Rspress 用 [data-theme='dark']） */
[data-theme='dark'] .markdown pre[class*='language-'],
[data-theme='dark'] .markdown code[class*='language-'] {
  color: #d6e4ff;
  background: #141414;
  text-shadow: none;
}

[data-theme='dark'] .markdown :not(pre) > code {
  color: #d6e4ff;
  background: #262626;
}

/* 表格行分隔（对齐 .dumi/global.less） */
.markdown table {
  width: 100%;
  border-collapse: collapse;
}

.markdown table th,
.markdown table td {
  padding: 12px 16px;
  border-bottom: 1px solid #f0f0f0;
}

.markdown table th {
  background: #fafafa;
  font-weight: 600;
}

.markdown table tr:last-child td {
  border-bottom: none;
}
`;

  const banner = `/* 站点全局默认样式：由 scripts/gen-site-css.mjs 从 site/theme/*.less 与原 .dumirc.ts styles 生成 */\n`;
  const content = [banner, mdLinkCss, '\n', otkCss, '\n', typographyCss].join('\n');

  fs.writeFileSync(outFile, content);
  console.log(`✅ 已生成 ${path.relative(repoRoot, outFile)}（${content.length} 字节）`);
}

main();
