import React from 'react';
import { FilterOutlined } from '@ant-design/icons';
import { LightFilter, ProFormSelect, ProFormRadio, ProFormDatePicker } from '@ant-design/pro-form';

export default () => {
  return (
    <LightFilter
      initialValues={{
        sex: 'man',
      }}
      bordered
      collapseLabel={<FilterOutlined />}
      onFinish={async (values) => console.log(values)}
    >
      <ProFormSelect
        name="sex"
        showSearch
        valueEnum={{
          man: '男',
          woman: '女',
        }}
        placeholder="性别"
      />
      <ProFormRadio.Group name="radio">
        <ProFormRadio.Button value="weekly">每周</ProFormRadio.Button>
        <ProFormRadio.Button value="queterly">每季度</ProFormRadio.Button>
        <ProFormRadio.Button value="monthly">每月</ProFormRadio.Button>
        <ProFormRadio.Button value="yearly">每年</ProFormRadio.Button>
      </ProFormRadio.Group>
      <ProFormDatePicker name="time" placeholder="日期" />
    </LightFilter>
  );
};
