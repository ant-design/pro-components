import React from 'react';
import { LightFilter, ProFormText, ProFormDatePicker, ProFormSelect } from '@ant-design/pro-form';

export default () => {
  return (
    <LightFilter
      initialValues={{
        name1: 'yutingzhao1991',
        name3: '2020-08-19',
      }}
      onFinish={(values) => console.log(values)}
    >
      <ProFormSelect name="sex" label="性别" valueEnum={{
        man: '男',
        woman: '女',
      }} />
      <ProFormText name="name1" label="名称" />
      <ProFormText name="name2" label="地址" secondary />
      <ProFormDatePicker name="name3" label="日期" />
    </LightFilter>
  );
};
