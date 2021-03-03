import React, { useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import type { BasicLayoutProps } from '@ant-design/pro-layout';

import ProLayout, { PageContainer } from '@ant-design/pro-layout';
import { ProFormRadio } from '@ant-design/pro-form';
import defaultProps from './_defaultProps';

export default () => {
  const [pathname, setPathname] = useState('/welcome');
  const [collapsed, setCollapsed] = useState(false);
  const [position, setPosition] = useState<'header' | 'menu'>('header');
  const children = (
    <PageContainer>
      <div
        style={{
          height: '120vh',
        }}
      >
        <ProFormRadio.Group
          label="按钮的位置"
          options={['header', 'menu'].map((value) => ({
            label: value,
            value,
          }))}
          fieldProps={{
            value: position,
            onChange: (e) => setPosition(e.target.value),
          }}
        />
      </div>
    </PageContainer>
  );
  const props: BasicLayoutProps = {
    ...defaultProps,
    location: {
      pathname,
    },
    navTheme: 'light',
    collapsed,
    fixSiderbar: true,
    collapsedButtonRender: false,
    menuItemRender: (item, dom) => (
      <a
        onClick={() => {
          setPathname(item.path || '/welcome');
        }}
      >
        {dom}
      </a>
    ),
  };
  if (position === 'menu') {
    return (
      <ProLayout
        {...props}
        onCollapse={setCollapsed}
        postMenuData={(menuData) => {
          return [
            {
              icon: collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />,
              name: ' ',
              onTitleClick: () => setCollapsed(!collapsed),
            },
            ...(menuData || []),
          ];
        }}
      >
        {children}
      </ProLayout>
    );
  }
  return (
    <ProLayout
      {...props}
      onCollapse={setCollapsed}
      headerContentRender={() => {
        return (
          <div
            onClick={() => setCollapsed(!collapsed)}
            style={{
              cursor: 'pointer',
              fontSize: '16px',
            }}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </div>
        );
      }}
    >
      {children}
    </ProLayout>
  );
};
