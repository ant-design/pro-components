import React, { useState } from 'react';
import { Button, Result } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

import ProLayout, { PageContainer } from '@ant-design/pro-layout';
import defaultProps from './_defaultProps';

export default () => {
  const [pathname, setPathname] = useState('/welcome');
  const [collapsed, setCollapsed] = useState(false);
  return (
    <ProLayout
      {...defaultProps}
      location={{
        pathname,
      }}
      collapsed={collapsed}
      collapsedButtonRender={false}
      fixSiderbar
      menuItemRender={(item, dom) => (
        <a
          onClick={() => {
            setPathname(item.path || '/welcome');
          }}
        >
          {dom}
        </a>
      )}
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
      <PageContainer
        tabList={[
          {
            tab: '基本信息',
            key: 'base',
          },
          {
            tab: '详细信息',
            key: 'info',
          },
        ]}
      >
        <div
          style={{
            height: '120vh',
          }}
        >
          <Result
            status="404"
            style={{
              height: '100%',
              background: '#fff',
            }}
            title="Hello World"
            subTitle="Sorry, you are not authorized to access this page."
            extra={<Button type="primary">Back Home</Button>}
          />
        </div>
      </PageContainer>
    </ProLayout>
  );
};
