import React from 'react';
import { LightFilter, ProFormText } from '@ant-design/pro-form';

export default () => {
  return (
    <LightFilter onFinish={(values) => console.log(values)}>
      <ProFormText name="name2" label="开始日期" />
      <ProFormText name="name3" label="名称" secondary />
    </LightFilter>
  );
};
