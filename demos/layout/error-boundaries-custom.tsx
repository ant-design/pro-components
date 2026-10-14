import { ProLayout } from '@ant-design/pro-components';
import { Button, Result } from 'antd';
import React, { useState } from 'react';

class CustomBoundary extends React.Component<
  { children?: React.ReactNode },
  { message: string }
> {
  state = { message: '' };

  static getDerivedStateFromError(error: Error) {
    return { message: error.message };
  }

  render() {
    return this.state.message ? (
      <Result
        status="error"
        title="自定义错误界面"
        subTitle={this.state.message}
      />
    ) : (
      this.props.children
    );
  }
}

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
      title="自定义错误边界"
      route={{ routes: [{ path: '/demo', name: '示例页' }] }}
      location={{ pathname: '/demo' }}
      ErrorBoundary={CustomBoundary}
    >
      <div style={{ padding: 24 }}>
        <p>点击按钮，查看 ErrorBoundary 指定的兜底界面。</p>
        <ErrorTrigger />
      </div>
    </ProLayout>
  </div>
);
