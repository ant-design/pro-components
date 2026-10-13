import React, { useState } from 'react';
import { usePage } from '@rspress/core/runtime';

interface ComponentLink {
  name: string;
  path: string;
  descriptionZh: string;
  descriptionEn: string;
}

const CORE_COMPONENTS: ComponentLink[] = [
  {
    name: 'ProTable',
    path: '/components/table/',
    descriptionZh: '带搜索、分页与工具栏的高级表格',
    descriptionEn: 'Advanced table with search, paging and toolbar',
  },
  {
    name: 'ProForm',
    path: '/components/form/',
    descriptionZh: '布局、校验与联动开箱即用的表单',
    descriptionEn: 'Forms with layout, validation and dependencies',
  },
  {
    name: 'ProLayout',
    path: '/components/layout/',
    descriptionZh: '菜单、顶栏与侧栏的中后台布局',
    descriptionEn: 'Admin layout with menu, header and sider',
  },
  {
    name: 'ProCard',
    path: '/components/card/',
    descriptionZh: '可组合的内容卡片与栅格',
    descriptionEn: 'Composable content cards and grids',
  },
  {
    name: 'ProDescriptions',
    path: '/components/descriptions/',
    descriptionZh: '定义列表与详情展示',
    descriptionEn: 'Definition lists for detail views',
  },
];

type SearchScope = 'components' | 'docs';

const SCOPE_PATHS: Record<SearchScope, string> = {
  components: '/components/',
  docs: '/docs/',
};

function parseSearchScope(value: string): SearchScope {
  return value === 'docs' ? 'docs' : 'components';
}

export function HomeDiscovery() {
  const { page } = usePage();
  const english = page.lang === 'en-US';
  const locale = english ? '/en-US' : '';
  const [query, setQuery] = useState('');
  const [scope, setScope] = useState<SearchScope>('components');

  function search(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const term = query.trim().toLowerCase();
    if (!term) return;
    const match = CORE_COMPONENTS.find((link) =>
      link.name.toLowerCase().includes(term),
    );
    const targetPath = match ? match.path : SCOPE_PATHS[scope];
    window.location.assign(`${locale}${targetPath}`);
  }

  return (
    <section className="pc-home-discovery" aria-label={english ? 'Explore' : '探索'}>
      <div className="pc-home-section-head">
        <p className="pc-home-section-eyebrow">{english ? 'Explore' : '开始探索'}</p>
        <h2 className="pc-home-section-title">
          {english ? 'Find the right component' : '快速找到合适的组件'}
        </h2>
        <p className="pc-home-section-desc">
          {english
            ? 'Search the docs, or jump into the components most teams start with.'
            : '搜索文档与示例，或直接进入团队最常用的核心组件。'}
        </p>
      </div>

      <form className="pc-home-search" onSubmit={search}>
        <button type="submit" aria-label={english ? 'Search' : '搜索'}>
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="10.8" cy="10.8" r="6.8" stroke="currentColor" strokeWidth="2" />
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
            english ? 'Search components and docs...' : '搜索组件、文档与示例...'
          }
          aria-label={
            english ? 'Search components and docs' : '搜索组件、文档与示例'
          }
        />
        <select
          value={scope}
          onChange={(event) => setScope(parseSearchScope(event.target.value))}
          aria-label={english ? 'Search scope' : '搜索范围'}
        >
          <option value="components">{english ? 'Components' : '组件'}</option>
          <option value="docs">{english ? 'Docs' : '文档'}</option>
        </select>
      </form>

      <div className="pc-home-core-grid">
        {CORE_COMPONENTS.map((link) => (
          <a
            key={link.name}
            className="pc-home-core-card"
            href={`${locale}${link.path}`}
          >
            <span className="pc-home-core-name">{link.name}</span>
            <span className="pc-home-core-desc">
              {english ? link.descriptionEn : link.descriptionZh}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}

export function HomeFeatureIntro() {
  const { page } = usePage();
  const english = page.lang === 'en-US';

  return (
    <div className="pc-home-section-head pc-home-feature-intro">
      <p className="pc-home-section-eyebrow">{english ? 'Why ProComponents' : '为什么选择'}</p>
      <h2 className="pc-home-section-title">
        {english ? 'Built for admin apps' : '为中后台场景而设计'}
      </h2>
      <p className="pc-home-section-desc">
        {english
          ? 'Stay close to Ant Design while shipping page-level productivity out of the box.'
          : '延续 Ant Design 设计体系，把页面级能力做成开箱即用的默认体验。'}
      </p>
    </div>
  );
}
