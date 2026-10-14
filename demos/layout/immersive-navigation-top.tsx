import { ProLayout } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useState } from 'react';

export default () => {
  const [view, setView] = useState<'概览' | '详情'>('概览');

  return (
    <div style={{ height: 560, overflow: 'auto' }}>
      <ProLayout
        title="沉浸式页面"
        headerRender={false}
        route={{ routes: [{ path: '/demo', name: '示例页' }] }}
        location={{ pathname: '/demo' }}
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
            padding: 16,
            background: '#fff',
          }}
        >
          <strong>自定义页面工具栏</strong>
          <Button onClick={() => setView(view === '概览' ? '详情' : '概览')}>
            切换视图
          </Button>
        </div>
        <div style={{ minHeight: 320, padding: 24 }} role="status">
          当前视图：{view}
        </div>
      </ProLayout>
    </div>
  );
};
