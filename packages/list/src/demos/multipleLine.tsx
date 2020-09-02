import React from 'react';
import { Button, Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { ListToolBar } from '@ant-design/pro-list';
import { LightFilter, ProFormDatePicker } from '@ant-design/pro-form';

export default () => (
  <div
    style={{
      boxShadow: '0 0 3px #ccc',
    }}
  >
    <ListToolBar
      multipleLine
      title="两行的情况"
      search={{
        placeholder: '请输入订单号',
        onSearch: (value) => {
          alert(value);
        },
      }}
      filter={
        <LightFilter style={{ marginTop: 8 }}>
          <ProFormDatePicker name="startdate" label="响应日期" />
        </LightFilter>
      }
      actions={[
        <Button
          type="primary"
          onClick={() => {
            alert('add');
          }}
        >
          添加
        </Button>,
        <Dropdown
          overlay={
            <Menu onClick={() => alert('menu click')}>
              <Menu.Item key="1">菜单</Menu.Item>
              <Menu.Item key="2">列表</Menu.Item>
              <Menu.Item key="3">表单</Menu.Item>
            </Menu>
          }
        >
          <Button>
            移动自
            <DownOutlined
              style={{
                marginLeft: 8,
              }}
            />
          </Button>
        </Dropdown>,
      ]}
      settings={[
        {
          icon: 'setting',
          tooltip: '设置',
        },
        {
          icon: 'fullscreen',
          tooltip: '全屏',
        },
      ]}
    />
  </div>
);
