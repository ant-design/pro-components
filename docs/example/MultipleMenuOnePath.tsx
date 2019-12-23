import React from 'react';
import ProLayout, { PageHeaderWrapper } from '@ant-design/pro-layout';

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
        routes: [
          {
            name: '详情',
            icon: 'book',
            path: '/articles',
            component: './Articles',
            exact: true,
          },
          {
            path: '/articles/new',
            name: '新建',
            component: './Articles/New',
            hideInMenu: true,
          },
          {
            path: '/articles/:id([0-9]+)/edit',
            name: '编辑',
            hideInMenu: true,
            component: './Articles/Edit',
          },
        ],
      }}
    >
      <PageHeaderWrapper content="欢迎使用">
        <div>Hello World</div>
      </PageHeaderWrapper>
    </ProLayout>
  </div>
);
