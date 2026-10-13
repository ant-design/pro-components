import { useState } from 'react';

type SearchItem = { path: string; en: string; zh: string; keywords?: string };

const components: SearchItem[] = [
  { path: 'table', en: 'ProTable', zh: '高级表格', keywords: '表格' },
  { path: 'form', en: 'ProForm', zh: '高级表单', keywords: '表单' },
  { path: 'layout', en: 'ProLayout', zh: '高级布局', keywords: '布局' },
  { path: 'card', en: 'ProCard', zh: '高级卡片', keywords: '卡片' },
  {
    path: 'descriptions',
    en: 'ProDescriptions',
    zh: '高级描述',
    keywords: '描述',
  },
  { path: 'list', en: 'ProList', zh: '高级列表', keywords: '列表' },
  { path: 'field', en: 'ProField', zh: '高级字段', keywords: '字段' },
  {
    path: 'editable-table',
    en: 'EditableProTable',
    zh: '可编辑表格',
    keywords: '编辑',
  },
  { path: 'schema-form', en: 'SchemaForm', zh: '模式表单', keywords: 'schema' },
  {
    path: 'query-filter',
    en: 'QueryFilter',
    zh: '查询筛选',
    keywords: '搜索 筛选',
  },
  { path: 'modal-form', en: 'ModalForm', zh: '弹窗表单', keywords: '弹窗' },
  { path: 'steps-form', en: 'StepsForm', zh: '分步表单', keywords: '步骤' },
  { path: 'login-form', en: 'LoginForm', zh: '登录表单', keywords: '登录' },
  {
    path: 'page-container',
    en: 'PageContainer',
    zh: '页面容器',
    keywords: '页面',
  },
  { path: 'page-header', en: 'PageHeader', zh: '页头', keywords: '页面' },
  {
    path: 'statistic-card',
    en: 'StatisticCard',
    zh: '统计卡片',
    keywords: '统计',
  },
  { path: 'skeleton', en: 'ProSkeleton', zh: '骨架屏', keywords: '骨架' },
  { path: 'check-card', en: 'CheckCard', zh: '多选卡片', keywords: '选择' },
  {
    path: 'drag-sort-table',
    en: 'DragSortTable',
    zh: '拖拽排序表格',
    keywords: '拖拽 排序',
  },
];

const docs: SearchItem[] = [
  {
    path: 'index',
    en: 'Documentation guide',
    zh: '文档编写指南',
    keywords: '文档 指南 guide',
  },
  {
    path: 'migration-guide',
    en: 'Migration guide',
    zh: '迁移指南',
    keywords: '升级 migration',
  },
  {
    path: 'pro-config-provider',
    en: 'ProConfigProvider',
    zh: '全局配置',
    keywords: '主题 国际化 theme locale',
  },
  {
    path: 'api-changes',
    en: 'API changes',
    zh: 'API 变更',
    keywords: '更新 changes',
  },
];

export default function HomeSearch({
  locale = 'zh-CN',
}: {
  locale?: 'zh-CN' | 'en-US';
}) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<'components' | 'docs'>('components');
  const isEnglish = locale === 'en-US';
  const prefix = isEnglish ? '/en-US' : '';
  const term = query.trim().toLocaleLowerCase();
  const results = (category === 'components' ? components : docs)
    .filter(
      (item) =>
        !term ||
        `${item.en} ${item.zh} ${item.keywords ?? ''}`
          .toLocaleLowerCase()
          .includes(term),
    )
    .slice(0, term ? 8 : 5);
  const href = (item: SearchItem) =>
    `${prefix}/${category === 'components' ? 'components' : 'docs'}${item.path === 'index' ? '' : `/${item.path}`}`;

  return (
    <section
      className="home-discovery"
      aria-label={isEnglish ? 'Explore ProComponents' : '探索 ProComponents'}
    >
      <form
        className="home-search"
        onSubmit={(event) => {
          event.preventDefault();
          if (term && results.length) window.location.assign(href(results[0]));
        }}
      >
        <button
          className="home-search-submit"
          type="submit"
          aria-label={isEnglish ? 'Search' : '搜索'}
        >
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle
              cx="10.8"
              cy="10.8"
              r="6.8"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="m16 16 5 5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={
            isEnglish ? 'Search components and docs...' : '搜索组件与文档...'
          }
          aria-label={
            isEnglish ? 'Search components and docs' : '搜索组件与文档'
          }
        />
        <select
          value={category}
          onChange={(event) =>
            setCategory(event.target.value as 'components' | 'docs')
          }
          aria-label={isEnglish ? 'Search in' : '搜索范围'}
        >
          <option value="components">
            {isEnglish ? 'Components' : '组件'}
          </option>
          <option value="docs">{isEnglish ? 'Docs' : '文档'}</option>
        </select>
      </form>
      <div className="home-suggestions" aria-live="polite">
        <span>
          {term
            ? isEnglish
              ? 'Results:'
              : '搜索结果：'
            : isEnglish
              ? 'Popular:'
              : '推荐搜索：'}
        </span>
        {results.length ? (
          results.map((item) => (
            <a key={item.path} href={href(item)}>
              {item.en}
            </a>
          ))
        ) : (
          <span>{isEnglish ? 'No matching pages' : '没有匹配的页面'}</span>
        )}
      </div>
    </section>
  );
}
