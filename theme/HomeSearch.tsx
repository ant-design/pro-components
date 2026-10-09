import React, { useState } from 'react';
import { usePage } from '@rspress/core/runtime';

const links = [
  { name: 'ProTable', path: '/components/table/' },
  { name: 'ProForm', path: '/components/form/' },
  { name: 'ProLayout', path: '/components/layout/' },
  { name: 'ProCard', path: '/components/card/' },
  { name: 'ProDescriptions', path: '/components/descriptions/' },
];

export function HomeSearch() {
  const { page } = usePage();
  const english = page.lang === 'en-US';
  const locale = english ? '/en-US' : '';
  const [query, setQuery] = useState('');
  const [scope, setScope] = useState('components');

  function search(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const term = query.trim().toLowerCase();
    if (!term) return;
    const match = links.find((link) => link.name.toLowerCase().includes(term));
    window.location.assign(match ? `${locale}${match.path}` : `${locale}/${scope}/`);
  }

  return (
    <div className="pc-home-discovery">
      <form className="pc-home-search" onSubmit={search}>
        <button type="submit" aria-label={english ? 'Search' : '搜索'}>
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8" stroke="currentColor" strokeWidth="2" /><path d="m16 16 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
        </button>
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={english ? 'Search components and docs...' : '搜索组件、文档与示例...'} aria-label={english ? 'Search components and docs' : '搜索组件、文档与示例'} />
        <select value={scope} onChange={(event) => setScope(event.target.value)} aria-label={english ? 'Search scope' : '搜索范围'}>
          <option value="components">{english ? 'Components' : '组件'}</option>
          <option value="docs">{english ? 'Docs' : '文档'}</option>
        </select>
      </form>
      <div className="pc-home-suggestions">
        <span>{english ? 'Suggested:' : '推荐搜索：'}</span>
        {links.map((link) => <a key={link.name} href={`${locale}${link.path}`}>{link.name}</a>)}
      </div>
    </div>
  );
}
