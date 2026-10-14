import { PageContainer, ProLayout } from '@ant-design/pro-components';
import { Segmented } from 'antd';
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
];
export default () => {
  const [navTheme, setNavTheme] = useState<'light' | 'realDark'>('light');
  return (
    <div style={{ height: 480 }}>
      <Segmented
        style={{ position: 'fixed', top: 16, right: 16, zIndex: 2000 }}
        value={navTheme}
        options={[
          { label: '浅色导航', value: 'light' },
          { label: '真实深色', value: 'realDark' },
        ]}
        onChange={(value) => setNavTheme(value as 'light' | 'realDark')}
      />
      <ProLayout
        title="导航主题"
        layout="top"
        navTheme={navTheme}
        route={{ routes }}
        location={{ pathname: '/dashboard/analysis' }}
      >
        <PageContainer title="内容区域">
          切换导航主题查看菜单颜色。
        </PageContainer>
      </ProLayout>
    </div>
  );
};
