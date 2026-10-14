import { ProLayout } from '@ant-design/pro-components';
import { Button, Space } from 'antd';
import { useState } from 'react';

export default () => {
  const [status, setStatus] = useState('尚未保存');

  return (
    <div style={{ minHeight: 540 }}>
      <ProLayout
        title="页脚工具栏"
        route={{ routes: [{ path: '/demo', name: '示例页' }] }}
        location={{ pathname: '/demo' }}
        footerRender={() => (
          <Space style={{ minHeight: 64, paddingInline: 16 }}>
            <Button onClick={() => setStatus('已重置')}>重置</Button>
            <Button type="primary" onClick={() => setStatus('已保存')}>
              保存
            </Button>
          </Space>
        )}
      >
        <div style={{ padding: 24 }}>
          <h2>页脚工具栏</h2>
          <p>通过 ProLayout.footerRender 渲染底部操作区。</p>
          <p role="status">{status}</p>
        </div>
      </ProLayout>
    </div>
  );
};
