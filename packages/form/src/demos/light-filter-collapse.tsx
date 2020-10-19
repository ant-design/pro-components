import React from 'react';
import { LightFilter, ProFormSelect, ProFormDateTimePicker } from '@ant-design/pro-form';

export default () => {
  return (
    <LightFilter
      initialValues={{
        sex: 'man',
      }}
      collapse
      onFinish={async (values) => console.log(values)}
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
