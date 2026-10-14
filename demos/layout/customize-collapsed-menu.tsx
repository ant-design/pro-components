import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { ProLayout } from '@ant-design/pro-components';
import { useState } from 'react';

export default () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div style={{ height: 560, overflow: 'auto' }}>
      <ProLayout
        title="菜单内折叠按钮"
        route={{ routes: [{ path: '/dashboard', name: '工作台' }] }}
        location={{ pathname: '/dashboard' }}
        collapsed={collapsed}
        onCollapse={setCollapsed}
        collapsedButtonRender={false}
        postMenuData={(items) => [
          {
            path: '/toggle-sidebar',
            name: '切换侧栏',
            icon: collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />,
            onTitleClick: () => setCollapsed((value) => !value),
          },
          ...(items || []),
        ]}
      >
        <div style={{ padding: 24 }}>
          当前侧栏：{collapsed ? '已收起' : '已展开'}
        </div>
      </ProLayout>
    </div>
  );
};
