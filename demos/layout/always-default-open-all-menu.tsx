import { PageContainer, ProLayout } from '@ant-design/pro-components';
import { useState } from 'react';

const routes = [
  {
    path: '/projects',
    name: '项目',
    routes: [
      { path: '/projects/active', name: '进行中' },
      { path: '/projects/archive', name: '已归档' },
    ],
  },
  {
    path: '/reports',
    name: '报表',
    routes: [
      { path: '/reports/daily', name: '日报' },
      { path: '/reports/monthly', name: '月报' },
    ],
  },
];

export default () => {
  const [collapsed, setCollapsed] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < 768,
  );

  return (
    <div style={{ minHeight: 480 }}>
      <ProLayout
        location={{ pathname: '/projects/active' }}
        collapsed={collapsed}
        onCollapse={setCollapsed}
        route={{ routes }}
        menu={{ defaultOpenAll: true, ignoreFlatMenu: true }}
      >
        <PageContainer title="展开状态不受侧栏折叠影响">
          使用侧栏底部的折叠按钮收起再展开侧栏，两个分组仍保持展开。
        </PageContainer>
      </ProLayout>
    </div>
  );
};
