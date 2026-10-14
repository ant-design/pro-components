import { ProLayout } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useState } from 'react';

const ErrorTrigger = () => {
  const [shouldThrow, setShouldThrow] = useState(false);
  if (shouldThrow) throw new Error('演示渲染错误');

  return (
    <Button danger onClick={() => setShouldThrow(true)}>
      触发渲染错误
    </Button>
  );
};

export default () => (
  <div style={{ height: 540, overflow: 'auto' }}>
    <ProLayout
      title="内置错误边界"
      route={{ routes: [{ path: '/demo', name: '示例页' }] }}
      location={{ pathname: '/demo' }}
    >
      <div style={{ padding: 24 }}>
        <p>点击按钮，查看 ProLayout 的默认错误界面。</p>
        <ErrorTrigger />
      </div>
    </ProLayout>
  </div>
);
