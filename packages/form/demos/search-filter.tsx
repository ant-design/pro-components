import React from 'react';
import { Divider } from 'antd';
import { SearchFilter, ProFormText, ProFormDatePicker } from '../src';

export default () => {
  return (
    <div>
      <SearchFilter onFinish={values => console.log(values)}>
        <ProFormText name="name" label="开始日期" />
        <ProFormDatePicker name="date" label="结束日期" />
        <ProFormText name="name2" label="名称" />
        <ProFormDatePicker name="date2" label="日期" />
        <ProFormText name="name3" label="名称" />
        <ProFormDatePicker name="date3" label="日期" />
      </SearchFilter>
      <Divider />
    </div>
  );
};
