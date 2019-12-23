import React from 'react';
import ProLayout, { PageHeaderWrapper } from '@ant-design/pro-layout';
import complexMenu from './complexMenu';

export default () => (
  <div
    style={{
      height: 400,
      overflow: 'auto',
    }}
  >
    <ProLayout
      location={{
        pathname: '/articles/new',
      }}
      route={{
        routes: complexMenu,
      }}
      menu={{ defaultOpenAll: true }}
    >
      <PageHeaderWrapper content="欢迎使用">
        <div
          style={{
            height: '120vh',
          }}
        >
          Hello World
        </div>
      </PageHeaderWrapper>
    </ProLayout>
  </div>
);
