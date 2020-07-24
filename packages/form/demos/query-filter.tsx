import React from 'react';
import { Divider } from 'antd';
import { QueryFilter, ProFormText, ProFormDatePicker } from '../src';

export default () => {
  return (
    <div>
      <QueryFilter onFinish={(values) => console.log(values)}>
        <ProFormText name="name" label="开始日期" />
        <ProFormDatePicker name="date" label="结束日期" />
        <ProFormText name="name2" label="名称" />
        <ProFormDatePicker name="date2" label="日期" />
        <ProFormText name="name3" label="名称" />
        <ProFormDatePicker name="date3" label="日期" colSize={2} />
      </QueryFilter>
      <Divider />
      <QueryFilter
        onFinish={(values) => console.log(values)}
        defaultColsNumber={5}
        defaultCollapsed
        labelWidth={80}
      >
        <ProFormText name="name" label="开始日期" />
        <ProFormDatePicker name="date" label="结束日期" />
        <ProFormText name="name2" label="名称" />
        <ProFormDatePicker name="date2" label="日期" />
        <ProFormText name="name3" label="名称" />
        <ProFormDatePicker name="date3" label="日期" colSize={2} />
      </QueryFilter>
      <Divider />
      <QueryFilter onFinish={(values) => console.log(values)} layout="vertical">
        <ProFormText name="name" label="名称" required />
        <ProFormDatePicker name="date" label="日期" />
      </QueryFilter>
    </div>
  );
};
