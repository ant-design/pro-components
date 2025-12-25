import { UserOutlined } from '@ant-design/icons';
import { PageContainer, ProLayout } from '@ant-design/pro-components';
import complexMenu from './complexMenu';

export default () => (
  <div
    style={{
      height: '100vh',
    }}
  >
    <ProLayout
      location={{
        pathname: '/home',
      }}
      fixSiderbar={false}
      collapsedButtonRender={false}
      collapsed={false}
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
      headerRender={false}
    >
      <ProLayout
        location={{
          pathname: '/home/overview',
        }}
        fixSiderbar={false}
        route={{
          routes: complexMenu,
        }}
        style={{
          height: '400px',
        }}
        menu={{
          hideMenuWhenCollapsed: true,
        }}
        avatarProps={{
          icon: <UserOutlined />,
        }}
        menuHeaderRender={false}
      >
        <PageContainer content="欢迎使用">
          <div>Hello World</div>
        </PageContainer>
      </ProLayout>
    </ProLayout>
  </div>
);
