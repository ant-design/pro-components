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
      iconfontUrl="//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js"
      route={{
        routes: [
          {
            path: '/home',
            name: '收藏',
            icon: 'icon-shoucang1',
          },
          {
            path: '/home/overview',
            name: 'FaceBook',
            icon: 'icon-facebook',
          },
          {
            path: '/home/search',
            name: 'Twitter',
            icon: 'icon-twitter',
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
