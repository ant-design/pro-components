import React from 'react';
import { FilterOutlined } from '@ant-design/icons';
import { LightFilter, ProFormSelect, ProFormDateTimePicker } from '@ant-design/pro-form';

export default () => {
  return (
    <LightFilter
      initialValues={{
        sex: 'man',
      }}
      collapse
      collapseLabel={<FilterOutlined />}
      onFinish={(values) => console.log(values)}
    >
      <ProFormSelect
        name="sex"
        label="性别"
        showSearch
        valueEnum={{
          man: '男',
          woman: '女',
        }}
      />
      <ProFormDateTimePicker name="time" label="时间" />
    </LightFilter>
  );
};
