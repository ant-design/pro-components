import React from 'react';

import type { MenuDataItem } from '@ant-design/pro-layout';
import ProLayout, { PageContainer } from '@ant-design/pro-layout';
import { SmileOutlined, HeartOutlined } from '@ant-design/icons';

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

const loopMenuItem = (menus: MenuDataItem[]): MenuDataItem[] =>
  menus.map(({ icon, routes, ...item }) => ({
    ...item,
    icon: icon && IconMap[icon as string],
    routes: routes && loopMenuItem(routes),
  }));

export default () => (
  <ProLayout
    style={{
      height: 500,
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
        }}
      >
        Hello World
      </div>
    </PageContainer>
  </ProLayout>
);
