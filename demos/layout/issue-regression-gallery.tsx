import {
  CheckCard,
  PageContainer,
  ProCard,
  ProConfigProvider,
  ProLayout,
} from '@ant-design/pro-components';
import { Alert, ConfigProvider, Segmented, Space } from 'antd';
import { useState } from 'react';

const routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    children: [
      { path: '/dashboard/analysis', name: 'Analysis' },
      { path: '/dashboard/monitor', name: 'Monitor' },
    ],
  },
  { path: '/settings', name: 'Settings' },
];

export default () => {
  const [navTheme, setNavTheme] = useState<'light' | 'realDark'>('light');

  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <Alert
        type="info"
        showIcon
        message="布局与主题 token 回归场景"
        description="切换导航主题并悬停 Dashboard，检查深色菜单、弹层背景和 Card token。缩窄窗口可验证移动抽屉。"
      />
      <Segmented
        value={navTheme}
        options={[
          { label: '浅色导航', value: 'light' },
          { label: '真实深色', value: 'realDark' },
        ]}
        onChange={(value) => setNavTheme(value as 'light' | 'realDark')}
      />
      <ConfigProvider theme={{ components: { Card: { headerFontSize: 22 } } }}>
        <ProConfigProvider
          token={{
            colorPrimary: '#722ed1',
            components: { Card: { headerBg: '#f9f0ff' } },
            layout: {
              header: { colorBgMenuElevated: '#141414' },
            },
          }}
        >
          <ProCard title="ProConfigProvider Card token">
            <CheckCard title="CheckCard 继承主题" description="#8929 #9125" />
          </ProCard>
          <div style={{ height: 480, marginBlockStart: 16 }}>
            <ProLayout
              title="Regression Demo"
              layout="top"
              navTheme={navTheme}
              route={{ routes }}
              location={{ pathname: '/dashboard/analysis' }}
              menu={{ request: async () => routes }}
            >
              <PageContainer title="首屏布局稳定">
                移动端抽屉、菜单分组、SSR 与首屏 padding 由对应自动化测试覆盖。
              </PageContainer>
            </ProLayout>
          </div>
        </ProConfigProvider>
      </ConfigProvider>
    </Space>
  );
};
