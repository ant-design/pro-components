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
      headerRender={false}
      collapsed
      disableContentMargin
    >
      <ProLayout
        location={{
          pathname: '/home/overview',
        }}
        route={{
          routes: complexMenu,
        }}
        navTheme="light"
        style={{
          height: '400px',
        }}
        menuHeaderRender={false}
      >
        <PageHeaderWrapper content="欢迎使用">
          <div>Hello World</div>
        </PageHeaderWrapper>
      </ProLayout>
    </ProLayout>
  </div>
);
