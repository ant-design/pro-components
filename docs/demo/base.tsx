import React from 'react';
// eslint-disable-next-line import/no-unresolved
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
  >
    <PageHeaderWrapper content="欢迎使用">Hello World</PageHeaderWrapper>
  </ProLayout>
);
