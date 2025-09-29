import { UserOutlined } from '@ant-design/icons';
import { PageContainer, ProLayout } from '@xxlabs/pro-components';
import complexMenu from './complexMenu';

export default () => (
  <div
    style={{
      height: '100vh',
    }}
  >
    <ProLayout
      collapsed={false}
      collapsedButtonRender={false}
      fixSiderbar={false}
      headerRender={false}
      iconfontUrl="//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js"
      location={{
        pathname: '/home',
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
      <ProLayout
        avatarProps={{
          icon: <UserOutlined />,
        }}
        fixSiderbar={false}
        location={{
          pathname: '/home/overview',
        }}
        menu={{
          hideMenuWhenCollapsed: true,
        }}
        menuHeaderRender={false}
        route={{
          routes: complexMenu,
        }}
        style={{
          height: '400px',
        }}
      >
        <PageContainer content="欢迎使用">
          <div>Hello World</div>
        </PageContainer>
      </ProLayout>
    </ProLayout>
  </div>
);
