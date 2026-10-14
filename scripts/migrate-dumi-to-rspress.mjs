// @ts-check
/**
 * dumi → Rspress 一次性迁移脚本（幂等，可重复运行）
 *
 * 目录转换：
 *   site/xxx.md             → site/zh-CN/xxx.mdx
 *   site/xxx.en-US.md       → site/en-US/xxx.mdx
 *   site/components/layout.md + layout.$tab-api.md
 *                          → site/{lang}/components/layout/index.mdx + layout/api.mdx
 *   site/playground/*.md    → site/{lang}/playground/*.mdx
 *
 * 内容转换：
 *   <code src="../../demos/xxx.tsx" title="t" iframe="650"> → ```tsx file="<root>/demos/xxx.tsx" 代码块
 *   dumi frontmatter → Rspress frontmatter（保留 title/order，去 group/atomId/nav）
 *   :::tip 等容器 → 引用块
 *   相对 .md 链接 → 站内路由
 *   MDX 敏感字符防御性转义（表格单元格中的裸 { } < >）
 *
 * 生成 _nav.json 与各目录 _meta.json（分组与顺序，对齐 .dumirc.ts sidebar）。
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');
const siteDir = path.join(repoRoot, 'site');
const langDirs = {
  zh: path.join(siteDir, 'zh-CN'),
  en: path.join(siteDir, 'en-US'),
};
const IGNORE_DIRS = new Set([...Object.values(langDirs), path.join(siteDir, 'theme')]);

/** dumi <code> 标签 → Rspress 文件代码块 */
function convertCodeTag(full, attrs) {
  const src = attrs.match(/src="([^"]+)"/)?.[1];
  if (!src) return full;
  const repoRel = src.replace(/^(\.\.\/)+/, '');
  const meta = [`file="<root>/${repoRel}"`];
  const title = attrs.match(/\stitle="([^"]*)"/)?.[1];
  if (title) meta.push(`title="${title}"`);
  const iframe = attrs.match(/\siframe="([^"]*)"/)?.[1];
  if (iframe) meta.push(`preview="iframe-follow" height="${iframe}"`);
  else meta.push('preview');
  return `\`\`\`tsx ${meta.join(' ')}\n\`\`\``;
}

/**
 * MDX 中花括号/尖括号会被当成 JSX 表达式/标签解析。
 * 防御性转义：仅处理表格行与普通段落中、且不在代码 span（反引号内）的 { } <。
 */
function escapeMdxSensitive(text) {
  const lines = text.split('\n');
  const out = lines.map((line) => {
    if (line.startsWith('|')) {
      // 表格行：逐 cell 处理，跳过反引号内内容
      return line
        .split('|')
        .map((cell) => escapeCell(cell))
        .join('|');
    }
    return line;
  });
  return out.join('\n');
}

function escapeCell(cell) {
  // 按 `` ` `` 分段：奇数段在代码 span 内，不动；偶数段做转义
  const segs = cell.split('`');
  return segs
    .map((seg, i) =>
      i % 2 === 1
        ? seg
        : seg
            .replace(/\{/g, '&#123;')
            .replace(/\}/g, '&#125;')
            // Array<{...}> 等泛型字面量：尖括号与花括号组合会被 MDX 当 JSX
            .replace(/<(&#123;)/g, '&lt;$1')
            .replace(/(&#125;)>/g, '$1&gt;'),
    )
    .join('`');
}

function transformBody(body, { rel = '' } = {}) {
  let out = body;
  // 行内多个 <code> 标签拆成独立行，避免替换产物粘连
  out = out.replace(/(<code\s)/g, '\n$1');
  out = out.replace(/<\/code>\s*(?=<code)/g, '</code>\n');
  out = out.replace(/<code\s+([^>]*?)\/?>(?:\s*<\/code>)?/g, convertCodeTag);
  // dumi 容器语法 → blockquote
  out = out
    .replace(/^:::info\s+(.*)$/gm, '> **ℹ️** $1')
    .replace(/^:::warning\s+(.*)$/gm, '> **⚠️** $1')
    .replace(/^:::tip\s+(.*)$/gm, '> **💡** $1')
    .replace(/^:::danger\s+(.*)$/gm, '> **🚨** $1')
    .replace(/^:::\s*$/gm, '');
  // 相对 .md 链接 → 站内路由（基于当前文件所在目录解析）
  const pageDir = path.posix.dirname(rel.replace(/\.en-US\.md$/, '.md'));
  out = out.replace(
    /\]\((\.\.?\/)+([^)]*?)\.en-US\.md(#[^)]*)?\)/g,
    (_m, _dots, p, hash) => `](/en-US/${path.posix.join(pageDir, p)}${hash ?? ''})`,
  );
  out = out.replace(
    /\]\((\.\.?\/)+([^)]*?)\.md(#[^)]*)?\)/g,
    (_m, _dots, p, hash) => `](/${path.posix.join(pageDir, p)}${hash ?? ''})`,
  );
  // 修复历史死链：schema → schema-form
  out = out.replace(/\(\/components\/schema#/g, '(/components/schema-form#');
  out = out.replace(/\(\/en-US\/components\/schema#/g, '(/en-US/components/schema-form#');
  // 首页迁移指南链接：site 根的 ./api-changes.md 实际位于 /docs
  out = out
    .replace(/\(\/api-changes\)/g, '(/docs/api-changes)')
    .replace(/\(\/migration-guide\)/g, '(/docs/migration-guide)')
    .replace(/\(\/en-US\/api-changes\)/g, '(/en-US/docs/api-changes)')
    .replace(/\(\/en-US\/migration-guide\)/g, '(/en-US/docs/migration-guide)');
  // antd 组件链接指向官方文档
  out = out
    .replace(
      /\(\/components\/avatar\/?\)/g,
      '(https://ant.design/components/avatar)',
    )
    .replace(
      /\(\/components\/breadcrumb\/?\)/g,
      '(https://ant.design/components/breadcrumb)',
    );
  out = escapeMdxSensitive(out);
  return out;
}

/** frontmatter: 保留 title/order（hero 首页整个保留） */
function splitFrontmatter(raw) {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!m) return { fmRaw: '', body: raw };
  return { fmRaw: m[1], body: raw.slice(m[0].length) };
}

function transformFrontmatter(raw, { isHome }) {
  const { fmRaw, body } = splitFrontmatter(raw);
  if (isHome) {
    // 首页 hero frontmatter 直接保留，正文不动
    return { fm: `---\n${fmRaw}\n---\n\n`, body };
  }
  const keep = fmRaw
    .split('\n')
    .filter((l) => /^(title|order):\s/.test(l));
  return { fm: keep.length ? `---\n${keep.join('\n')}\n---\n\n` : '', body };
}

function walkMd(root) {
  const out = [];
  const rec = (dir) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const abs = path.join(dir, e.name);
      if (e.isDirectory()) {
        if (!IGNORE_DIRS.has(abs)) rec(abs);
      } else if (e.name.endsWith('.md')) {
        out.push({
          abs,
          rel: path.relative(siteDir, abs).split(path.sep).join('/'),
          name: e.name,
        });
      }
    }
  };
  rec(root);
  return out;
}

// ── 侧边栏（对齐 .dumirc.ts sidebar 顺序） ──
const COMPONENT_SECTIONS = {
  zh: [
    { section: '架构设计', items: ['index'] },
    { section: '布局', items: ['layout', 'page-container', 'card', 'statistic-card', 'check-card'] },
    { section: '数据录入', items: ['form', 'field-set', 'group', 'dependency', 'schema-form', 'query-filter', 'steps-form', 'modal-form', 'login-form'] },
    { section: '数据展示', items: ['table', 'editable-table', 'drag-sort-table', 'list', 'descriptions'] },
    { section: '通用', items: ['skeleton', 'field'] },
  ],
  en: [
    { section: 'Architecture Design', items: ['index'] },
    { section: 'Layout', items: ['layout', 'page-container', 'card', 'statistic-card', 'check-card'] },
    { section: 'Data Entry', items: ['form', 'field-set', 'group', 'dependency', 'schema-form', 'query-filter', 'steps-form', 'modal-form', 'login-form'] },
    { section: 'Data Display', items: ['table', 'editable-table', 'drag-sort-table', 'list', 'descriptions'] },
    { section: 'Universal', items: ['skeleton', 'field'] },
  ],
};

function main() {
  const files = walkMd(siteDir);
  if (files.length === 0) {
    console.log('ℹ️ 未发现 dumi 源 md（可能已迁移），仅重新生成导航配置');
    writeNavAndMeta();
    return;
  }
  for (const d of Object.values(langDirs)) fs.rmSync(d, { recursive: true, force: true });
  let zh = 0;
  let en = 0;
  const written = { zh: [], en: [] };
  for (const f of files) {
    const isEn = /(^|\.)en-US\.(md|\$tab)/.test(f.rel) || f.name.includes('.en-US.');
    const lang = isEn ? 'en' : 'zh';
    // $tab 拆分：components/table.en-US.$tab-api.md → table/api（en）
    let rel = f.rel.replace(/\.md$/, '');
    const tabMatch = rel.match(/^(.*)\.\$tab-(\w+)$/);
    if (tabMatch) {
      rel = `${tabMatch[1]}/${tabMatch[2]}`;
    }
    // 归一化 rel：去掉 .en-US 中缀
    rel = rel.replace(/\.en-US(?=\/|$)/, '');
    // 有 $tab 伴随文件的主文件 → 目录 index：layout.md → layout/index.mdx
    const hasTabSibling = files.some(
      (o) =>
        o.rel === f.rel.replace(/\.md$/, '.$tab-api.md') ||
        o.rel === f.rel.replace(/\.md$/, '.en-US.$tab-api.md'),
    );
    if (hasTabSibling) rel = `${rel}/index`;
    const raw = fs.readFileSync(f.abs, 'utf8');
    const isHome = !isEn ? f.rel === 'index.md' : f.rel === 'index.en-US.md';
    const { fm, body } = transformFrontmatter(raw, { isHome });
    const target = path.join(langDirs[lang], `${rel}.mdx`);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, fm + transformBody(body, { rel: f.rel }));
    written[lang].push(rel);
    lang === 'zh' ? zh++ : en++;
  }
  console.log(`✅ 迁移完成：zh-CN ${zh} 页，en-US ${en} 页`);

  writeNavAndMeta();

  // 删除 dumi 源文件（md 已迁移至 zh-CN/en-US）
  let removed = 0;
  for (const f of files) {
    fs.rmSync(f.abs);
    removed++;
  }
  // 清理空目录（如 $tab 拆分后的残留）
  for (const seg of ['components', 'docs', 'playground']) {
    const dir = path.join(siteDir, seg);
    if (fs.existsSync(dir) && fs.readdirSync(dir).length === 0) {
      fs.rmSync(dir, { recursive: true });
    }
  }
  console.log(`🗑️ 已删除 ${removed} 个 dumi 源 md 文件`);
}

/** 生成各语言目录的 _nav.json 与 _meta.json */
function writeNavAndMeta() {
  const sections = {
    zh: COMPONENT_SECTIONS.zh,
    en: COMPONENT_SECTIONS.en,
  };
  const pageLists = {
    zh: {
      docs: ['index', 'api-changes', 'migration-guide'],
      playground: ['index', 'pro-layout', 'pro-form', 'pro-table', 'pro-descriptions'],
    },
    en: {
      docs: ['index', 'api-changes', 'migration-guide'],
      playground: ['index', 'pro-layout', 'pro-form', 'pro-table', 'pro-descriptions'],
    },
  };

  for (const [lang, dir] of Object.entries(langDirs)) {
    const prefix = lang === 'zh' ? '' : '/en-US';
    const t = titlesFor(lang);
    // 顶部导航
    const nav = [
      { text: t.docs, link: `${prefix}/docs/` },
      { text: t.components, link: `${prefix}/components/` },
      { text: 'Changelog', link: `${prefix}/changelog` },
      { text: t.playground, link: `${prefix}/playground/` },
    ];
    if (lang === 'zh') {
      nav.push({ text: '国内镜像', link: 'https://pro-components.antdigital.dev' });
    }
    fs.writeFileSync(path.join(dir, '_nav.json'), JSON.stringify(nav, null, 2));

    // docs 侧边栏
    fs.writeFileSync(
      path.join(dir, 'docs', '_meta.json'),
      JSON.stringify(
        pageLists[lang].docs.map((k) => ({ type: 'file', name: k, label: t.docPages[k] })),
        null,
        2,
      ),
    );
    // components 侧边栏：分组用 section-header，条目用 file；layout/table 是目录用 dir
    fs.writeFileSync(
      path.join(dir, 'components', '_meta.json'),
      JSON.stringify(
        sections[lang].flatMap(({ section, items }) => [
          { type: 'section-header', label: section },
          ...items.map((item) => {
            const isDir = fs.existsSync(path.join(dir, 'components', item, 'index.mdx'));
            return isDir
              ? { type: 'dir', name: item, label: t.compPages[item] ?? item }
              : { type: 'file', name: item, label: t.compPages[item] ?? item };
          }),
        ]),
        null,
        2,
      ),
    );
    // playground 侧边栏
    fs.writeFileSync(
      path.join(dir, 'playground', '_meta.json'),
      JSON.stringify(
        pageLists[lang].playground.map((k) => ({ type: 'file', name: k, label: t.playPages[k] })),
        null,
        2,
      ),
    );
  }
  console.log('✅ _nav.json / _meta.json 已生成');
}

function titlesFor(lang) {
  return lang === 'zh'
    ? {
        docs: '文档',
        components: '组件',
        playground: 'Playground',
        docPages: { index: '介绍', 'api-changes': 'API 变更总结', 'migration-guide': '迁移指南', 'pro-config-provider': 'ProConfigProvider' },
        compPages: {
          index: '组件设计',
          layout: 'ProLayout 高级布局',
          'page-container': 'PageContainer 页容器',
          card: 'ProCard 高级卡片',
          'statistic-card': 'StatisticCard 指标卡',
          'check-card': 'CheckCard 多选卡片',
          form: 'ProForm 高级表单',
          'field-set': 'ProFormFields 表单页',
          group: 'ProFormList 数据结构化',
          dependency: 'ProFormDependency 数据联动',
          'schema-form': 'Schema Form JSON 表单',
          'query-filter': 'Query/LightFilter 筛选表单',
          'steps-form': 'StepsForm 分步表单',
          'modal-form': 'Modal/Drawer 浮层表单',
          'login-form': 'LoginForm/Page 登录表单',
          table: 'ProTable 高级表格',
          'editable-table': 'EditableProTable 可编辑表格',
          'drag-sort-table': 'DragSortTable 拖动排序表格',
          list: 'ProList 高级列表',
          descriptions: 'ProDescriptions 定义列表',
          skeleton: 'ProSkeleton 骨架屏',
          field: 'ProField 原子组件',
        },
        playPages: { index: '总览', 'pro-layout': 'Layout', 'pro-form': 'Form', 'pro-table': 'Table', 'pro-descriptions': 'Descriptions' },
      }
    : {
        docs: 'Docs',
        components: 'Components',
        playground: 'Playground',
        docPages: { index: 'Introduction', 'api-changes': 'API Changes', 'migration-guide': 'Migration Guide', 'pro-config-provider': 'ProConfigProvider' },
        compPages: {
          index: 'Component Design',
          layout: 'ProLayout',
          'page-container': 'PageContainer',
          card: 'ProCard',
          'statistic-card': 'StatisticCard',
          'check-card': 'CheckCard',
          form: 'Standard Form',
          'field-set': 'Form Fields',
          group: 'Form List',
          dependency: 'Form Dependency',
          'schema-form': 'Schema Form',
          'query-filter': 'Query/LightFilter',
          'steps-form': 'StepsForm',
          'modal-form': 'Modal/Drawer Form',
          'login-form': 'LoginForm/Page',
          table: 'ProTable',
          'editable-table': 'EditableProTable',
          'drag-sort-table': 'DragSortTable',
          list: 'ProList',
          descriptions: 'ProDescriptions',
          skeleton: 'ProSkeleton',
          field: 'ProField',
        },
        playPages: { index: 'Overview', 'pro-layout': 'Layout', 'pro-form': 'Form', 'pro-table': 'Table', 'pro-descriptions': 'Descriptions' },
      };
}

main();
