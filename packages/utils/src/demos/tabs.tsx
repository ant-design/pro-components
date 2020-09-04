import React from 'react';
import { ListToolBar } from '@ant-design/pro-utils';
import { LightFilter, ProFormDatePicker } from '@ant-design/pro-form';

export default () => (
  <div
    style={{
      boxShadow: '0 0 3px #ccc',
    }}
  >
    <ListToolBar
      multipleLine
      title="带标签的情况"
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
      tabs={{
        items: [
          {
            key: 'tab1',
            tab: '标签一',
          },
          {
            key: 'tab2',
            tab: '标签二',
          },
        ],
      }}
    />
  </div>
);
