import React from 'react';
import { LightFilter, ProFormText } from '@ant-design/pro-form';

export default () => {
  return (
    <LightFilter onFinish={(values) => console.log(values)}>
      <ProFormText key="name" name="name2" label="名称" />
      <ProFormText key="name3" name="name3" label="地址" secondary />
    </LightFilter>
  );
};
