import {
  FacebookOutlined,
  TwitterOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { PageContainer, ProLayout } from '@ant-design/pro-components';
import complexMenu from './complexMenu';

const Demo = () => (
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
      route={{
        routes: [
          {
            path: '/home',
            name: '收藏',
            icon: (
              <img
                src="https://gw.alipayobjects.com/zos/antfincdn/UCSef1BATc/nice.svg"
                width={16}
                height={16}
                alt=""
              />
            ),
          },
          {
            path: '/home/overview',
            name: 'FaceBook',
            icon: <FacebookOutlined />,
          },
          {
            path: '/home/search',
            name: 'Twitter',
            icon: <TwitterOutlined />,
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

export default () => (
  <div style={{ padding: 24 }}>
    <Demo />
  </div>
);
