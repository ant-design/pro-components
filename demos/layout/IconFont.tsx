import { PageContainer, ProLayout } from '@xxlabs/pro-components';

export default () => (
  <div
    style={{
      height: '100vh',
    }}
  >
    <ProLayout
      iconfontUrl="//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js"
      location={{
        pathname: '/articles/new',
      }}
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
      <PageContainer content="欢迎使用">
        <div>Hello World</div>
      </PageContainer>
    </ProLayout>
  </div>
);
