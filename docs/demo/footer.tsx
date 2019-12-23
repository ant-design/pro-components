import React from 'react';
import ProLayout, {
  DefaultFooter,
  PageHeaderWrapper,
} from '@ant-design/pro-layout';
import defaultProps from './defaultProps';

export default () => (
  <ProLayout
    {...defaultProps}
    style={{
      height: 500,
    }}
    breakpoint={false}
    collapsed
    location={{
      pathname: '/welcome',
    }}
    footerRender={() => (
      <DefaultFooter
        links={[
          { key: 'test', title: 'layout', href: 'www.alipay.com' },
          { key: 'test2', title: 'layout2', href: 'www.alipay.com' },
        ]}
        copyright="这是一条测试文案"
      ></DefaultFooter>
    )}
  >
    <PageHeaderWrapper content="欢迎使用">Hello World</PageHeaderWrapper>
  </ProLayout>
);
