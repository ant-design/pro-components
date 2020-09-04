import React from 'react';
import { EllipsisOutlined, DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu, Radio, message } from 'antd';
import { BatchOperationBar } from '@ant-design/pro-utils';

export default () => {
  const [size, setSize] = React.useState('default');
  const btnSize = size === 'small' ? 'small' : 'default';
  return (
    <div>
      <Radio.Group
        value={size}
        onChange={(e) => {
          setSize(e.target.value);
        }}
      >
        <Radio.Button value="small">Small</Radio.Button>
        <Radio.Button value="default">Default</Radio.Button>
        <Radio.Button value="large">Large</Radio.Button>
      </Radio.Group>
      <br />
      <br />
      <BatchOperationBar
        size={size}
        description={
          <>
            <span style={{ marginRight: size === 'small' ? 16 : 24 }}>容器数量 8 个</span>调用量 250
            次
          </>
        }
        selectedCount={3}
        onCancel={() => {
          message.info('cancel');
        }}
        actions={[
          <Button
            size={btnSize}
            danger
            onClick={() => {
              message.info('delete');
            }}
          >
            批量删除
          </Button>,
          <Dropdown
            overlay={
              <Menu onClick={() => message.info('menu click')}>
                <Menu.Item key="1">菜单</Menu.Item>
                <Menu.Item key="2">列表</Menu.Item>
                <Menu.Item key="3">表单</Menu.Item>
              </Menu>
            }
          >
            <Button size={btnSize}>
              移动自
              <DownOutlined
                style={{
                  marginLeft: 8,
                }}
              />
            </Button>
          </Dropdown>,
          <Button
            size={btnSize}
            type="primary"
            onClick={() => {
              message.info('submit');
            }}
          >
            批量提交
          </Button>,
          <Dropdown
            overlay={
              <Menu onClick={() => message.info('menu click')}>
                <Menu.Item key="1">菜单</Menu.Item>
                <Menu.Item key="2">列表</Menu.Item>
                <Menu.Item key="3">表单</Menu.Item>
              </Menu>
            }
          >
            <span
              style={{ marginLeft: 8 }}
              onClick={() => {
                message.info('...');
              }}
            >
              <EllipsisOutlined />
            </span>
          </Dropdown>,
        ]}
      />
    </div>
  );
};
