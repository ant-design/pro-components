import React from 'react';
import { Button } from 'antd';
import { QueryFilter, ProFormText, ProFormDatePicker } from '../src';

export default () => {
  return (
    <QueryFilter onFinish={values => console.log(values)}>
      <ProFormText name="name" label="名称" />
      <ProFormDatePicker name="date" label="日期" />
    </QueryFilter>
  );
};
