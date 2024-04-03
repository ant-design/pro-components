import { HeartOutlined, SmileOutlined } from '@ant-design/icons';
import type { MenuDataItem } from '@ant-design/pro-components';
import { PageContainer, ProLayout } from '@ant-design/pro-components';

const IconMap = {
  smile: <SmileOutlined />,
  heart: <HeartOutlined />,
};

const defaultMenus = [
  {
    path: '/',
    name: 'welcome',
    icon: 'smile',
    routes: [
      {
        path: '/welcome',
        name: 'one',
        icon: 'smile',
        routes: [
          {
            path: '/welcome/welcome',
            name: 'two',
            icon: 'smile',
            exact: true,
          },
        ],
      },
    ],
  },
  {
    path: '/demo',
    name: 'demo',
    icon: 'heart',
  },
];

const loopMenuItem = (menus: any[]): MenuDataItem[] =>
  menus.map(({ icon, routes, ...item }) => ({
    ...item,
    icon: icon && IconMap[icon as 'smile'],
    children: routes && loopMenuItem(routes),
  }));

export default () => (
  <ProLayout
    style={{
      minHeight: 500,
    }}
    fixSiderbar
    location={{
      pathname: '/welcome/welcome',
    }}
    menu={{ request: async () => loopMenuItem(defaultMenus) }}
  >
    <PageContainer content="欢迎使用">
      <div
        style={{
          height: '120vh',
          minHeight: 600,
        }}
      >
        Hello World
      </div>
    </PageContainer>
  </ProLayout>
);
