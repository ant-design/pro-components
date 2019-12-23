import React from 'react';
import ProLayout, { PageHeaderWrapper } from '@ant-design/pro-layout';
import defaultProps from './defaultProps';

export default () => (
  <ProLayout
    {...defaultProps}
    style={{
      height: 500,
    }}
    location={{
      pathname: '/welcome',
    }}
    menuRender={(props, dom) => (
      <div
        style={{
          background: '#fff',
          boxShadow: '2px 0 6px rgba(0, 21, 41, 0.35)',
          transition: 'all 0.2s',
          overflow: 'hidden',
          width: props.collapsed ? 0 : props.siderWidth || 256,
        }}
      >
        {dom}
      </div>
    )}
  >
    <PageHeaderWrapper content="欢迎使用">Hello World</PageHeaderWrapper>
  </ProLayout>
);
