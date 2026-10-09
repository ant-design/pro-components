import React from 'react';
import { Layout as OriginalLayout } from '@rspress/core/theme-original';
import { HomeSearch } from './HomeSearch';

export * from '@rspress/core/theme-original';

export function Layout() {
  return <OriginalLayout afterHero={<HomeSearch />} />;
}
