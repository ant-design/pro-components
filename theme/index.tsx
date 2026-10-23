import { ProConfigProvider } from '@ant-design/pro-components';
import { useDark } from '@rspress/core/runtime';
import { Layout as OriginalLayout } from '@rspress/core/theme-original';
import { ConfigProvider, theme } from 'antd';
import { HomeDiscovery, HomeFeatureIntro } from './HomeDiscovery';

export * from '@rspress/core/theme-original';

export function Layout() {
  const dark = useDark();
  return (
    <ConfigProvider
      theme={{ algorithm: dark ? theme.darkAlgorithm : theme.defaultAlgorithm }}
    >
      <ProConfigProvider dark={dark}>
        <OriginalLayout
          afterHero={<HomeDiscovery />}
          beforeFeatures={<HomeFeatureIntro />}
        />
      </ProConfigProvider>
    </ConfigProvider>
  );
}
