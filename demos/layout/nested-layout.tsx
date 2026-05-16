// UserOutlined / FacebookOutlined / TwitterOutlined 官方都没有 Filled 版本，保留 Outlined
import {
  FacebookOutlined,
  TwitterOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { PageContainer, ProLayout } from '@ant-design/pro-components';
import complexMenu from './complex-menu';

const Demo = () => (
  <div
    style={{
      height: '100vh',
    }}
  >
    <ProLayout
      location={{
        pathname: '/dashboard',
      }}
      fixSiderbar={false}
      collapsedButtonRender={false}
      collapsed={false}
      route={{
        routes: [
          {
            path: '/dashboard',
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
            path: '/dashboard/facebook',
            name: 'Facebook',
            // Facebook 是品牌 icon，官方无 Filled 版本，保留 Outlined
            icon: <FacebookOutlined />,
          },
          {
            path: '/dashboard/twitter',
            name: 'Twitter',
            // Twitter 是品牌 icon，官方无 Filled 版本，保留 Outlined
            icon: <TwitterOutlined />,
          },
        ],
      }}
      headerRender={false}
    >
      <ProLayout
        location={{
          pathname: '/dashboard/overview',
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
  <div>
    <Demo />
  </div>
);
