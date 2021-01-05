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
    children: [
      {
        path: '/welcome',
        name: 'one',
        icon: 'smile',
        children: [
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
  menus.map(({ icon, children, ...item }) => ({
    ...item,
    icon: icon && IconMap[icon as string],
    children: children && loopMenuItem(children),
  }));

export default () => (
  <ProLayout
    style={{
      height: 500,
    }}
    fixSiderbar
    collapsed
    location={{
      pathname: '/welcome',
    }}
    menuDataRender={() => loopMenuItem(defaultMenus)}
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
