import React from 'react';
import { LightFilter, ProFormText, ProFormDatePicker } from '@ant-design/pro-form';

export default () => {
  return (
    <LightFilter onFinish={(values) => console.log(values)}>
      <ProFormText name="name1" label="名称" />
      <ProFormText name="name2" label="地址" secondary />
      <ProFormDatePicker name="name3" label="日期" />
    </LightFilter>
  );
};
