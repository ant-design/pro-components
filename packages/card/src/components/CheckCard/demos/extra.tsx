/** Uuid: 1d7b8f42 title: 操作栏 */

import React from 'react';
import { CheckCard } from '@ant-design/pro-card';
import { Dropdown, Menu, message } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';

export default () => (
  <CheckCard
    avatar="https://gw.alipayobjects.com/zos/bmw-prod/f601048d-61c2-44d0-bf57-ca1afe7fd92e.svg"
    title="示例一"
    description="选择一个由流程编排提供的典型用户案例，可以从中学习到流程编排很多设计理念。"
    extra={
      <Dropdown
        placement="topCenter"
        overlay={
          <Menu
            onClick={({ domEvent }) => {
              domEvent.stopPropagation();
              message.info('menu click');
            }}
          >
            <Menu.Item key="1">菜单</Menu.Item>
            <Menu.Item key="2">列表</Menu.Item>
            <Menu.Item key="3">表单</Menu.Item>
          </Menu>
        }
      >
        <EllipsisOutlined
          style={{ fontSize: 22, color: 'rgba(0,0,0,0.5)' }}
          onClick={(e) => e.stopPropagation()}
        />
      </Dropdown>
    }
  />
);
