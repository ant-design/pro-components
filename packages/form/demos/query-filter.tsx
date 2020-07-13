import React from 'react';
import { QueryFilter, ProFormText, ProFormDatePicker } from '../src';

export default () => {
  return (
    <QueryFilter onFinish={(values) => console.log(values)}>
      <ProFormText name="name" label="名称" />
      <ProFormDatePicker name="date" label="日期" />
      <ProFormText name="name2" label="名称" />
      <ProFormDatePicker name="date2" label="日期" />
      <ProFormText name="name3" label="名称" />
      <ProFormDatePicker name="date3" label="日期" />
    </QueryFilter>
  );
};
