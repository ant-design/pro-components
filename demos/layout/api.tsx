import { ProLayout } from '@ant-design/pro-components';
import { Switch } from 'antd';
import { useState } from 'react';

export default () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div style={{ height: 520, overflow: 'auto' }}>
      <ProLayout
        title="受控侧栏"
        route={{
          routes: [
            { path: '/dashboard', name: '工作台' },
            { path: '/settings', name: '设置' },
          ],
        }}
        location={{ pathname: '/dashboard' }}
        collapsed={collapsed}
        onCollapse={setCollapsed}
      >
        <div style={{ minHeight: 320, padding: 24 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Switch checked={collapsed} onChange={setCollapsed} />
            折叠侧栏
          </label>
          <p role="status">侧栏状态：{collapsed ? '已折叠' : '已展开'}</p>
        </div>
      </ProLayout>
    </div>
  );
};
