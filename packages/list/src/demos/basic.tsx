import React from 'react';
import { ListToolBar } from '@ant-design/pro-list';
import { LightFilter, ProFormDatePicker } from '@ant-design/pro-form';
import { Button } from 'antd';

export default () => (
  <div
    style={{
      width: '100%',
      boxShadow: '0 0 3px #ccc',
      overflow: 'auto',
    }}
  >
    <ListToolBar
      style={{
        minWidth: 800,
      }}
      title="这里是标题"
      subTitle="这里是子标题"
      description="这是一个段描述"
      search={{
        onSearch: (value) => {
          alert(value);
        },
      }}
      filter={
        <LightFilter>
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
