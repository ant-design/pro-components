import { ProLayout } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useState } from 'react';

export default () => {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <div style={{ height: 560, overflow: 'auto' }}>
      <ProLayout
        title="侧栏底部区域"
        route={{ routes: [{ path: '/dashboard', name: '工作台' }] }}
        location={{ pathname: '/dashboard' }}
        menuFooterRender={(props) =>
          props?.collapsed ? null : (
            <Button type="link" onClick={() => setShowHelp(true)}>
              查看帮助
            </Button>
          )
        }
      >
        <div style={{ padding: 24 }}>
          {showHelp
            ? '帮助中心：请选择左侧的工作台。'
            : '点击侧栏底部的“查看帮助”。'}
        </div>
      </ProLayout>
    </div>
  );
};
