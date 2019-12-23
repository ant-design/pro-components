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
        pathname: '/admin/process/edit/123',
      }}
      menuDataRender={() => [
        {
          path: '/welcome',
          name: '欢迎',
          icon: 'smile',
        },
        {
          path: '/admin',
          name: '管理',
          icon: 'crown',
          children: [
            {
              name: '申请单列表',
              icon: 'smile',
              path: '/admin/process',
            },
            {
              name: '申请单详情',
              icon: 'smile',
              path: '/admin/process/detail/:id',
              hideInMenu: true,
            },
            {
              name: '编辑申请单',
              icon: 'smile',
              path: '/admin/process/edit/:id',
              hideInMenu: true,
            },
            {
              name: '添加申请单',
              icon: 'smile',
              path: '/admin/process/add',
              hideInMenu: true,
            },
          ],
        },
      ]}
    >
      <PageHeaderWrapper content="欢迎使用">
        <div>Hello World</div>
      </PageHeaderWrapper>
    </ProLayout>
  </div>
);
