import React from 'react';
import { Layout as OriginalLayout } from '@rspress/core/theme-original';
import { HomeDiscovery, HomeFeatureIntro } from './HomeDiscovery';

export * from '@rspress/core/theme-original';

export function Layout() {
  return (
    <OriginalLayout
      afterHero={<HomeDiscovery />}
      beforeFeatures={<HomeFeatureIntro />}
    />
  );
}
