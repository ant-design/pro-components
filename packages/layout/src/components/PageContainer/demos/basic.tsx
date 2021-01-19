import React from 'react';
import { EllipsisOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';

export default () => (
  <PageContainer
    ghost
    header={{
      title: '页面标题',
      breadcrumb: {
        routes: [
          {
            path: '',
            breadcrumbName: '一级页面',
          },
          {
            path: '',
            breadcrumbName: '二级页面',
          },
          {
            path: '',
            breadcrumbName: '当前页面',
          },
        ],
      },
      extra: [
        <Button key="1">次要按钮</Button>,
        <Button key="2">次要按钮</Button>,
        <Button key="3" type="primary">
          主要按钮
        </Button>,
        <Dropdown
          key="dropdown"
          trigger={['click']}
          overlay={
            <Menu>
              <Menu.Item key="1">下拉菜单</Menu.Item>
              <Menu.Item key="2">下拉菜单2</Menu.Item>
              <Menu.Item key="3">下拉菜单3</Menu.Item>
            </Menu>
          }
        >
          <Button key="4" style={{ padding: '0 8px' }}>
            <EllipsisOutlined />
          </Button>
        </Dropdown>,
      ],
    }}
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
    footer={[
      <Button key="3">重置</Button>,
      <Button key="2" type="primary">
        提交
      </Button>,
    ]}
  >
    <ProCard direction="column" ghost gutter={[0, 16]}>
      <ProCard style={{ height: 200 }} />
      <ProCard gutter={16} ghost style={{ height: 200 }}>
        <ProCard colSpan={16} />
        <ProCard colSpan={8} />
      </ProCard>
    </ProCard>
  </PageContainer>
);
