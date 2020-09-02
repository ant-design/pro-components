import React from 'react';
import { ListToolBar } from '@ant-design/pro-list';
import { LightFilter, ProFormDatePicker } from '@ant-design/pro-form';
import { Button } from 'antd';

export default () => (
  <ListToolBar
    style={{
      boxShadow: '0 0 3px #ccc',
    }}
    search={{
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
    ]}
  />
);
