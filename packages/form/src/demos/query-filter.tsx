import React from 'react';
import {
  QueryFilter,
  ProFormText,
  ProFormDatePicker,
  ProFormDateRangePicker,
  ProFormSelect,
} from '@ant-design/pro-form';

export default () => {
  return (
    <QueryFilter onFinish={(values) => console.log(values)}>
      <ProFormText name="name" label="应用名称" />
      <ProFormText name="creater" label="创建人" />
      <ProFormSelect
        name="sex"
        label="性别"
        showSearch
        valueEnum={{
          man: '男',
          woman: '女',
        }}
      />
      <ProFormText name="status" label="应用状态" />
      <ProFormDatePicker name="startdate" label="响应日期" />
      <ProFormDateRangePicker name="create" label="创建时间" colSize={2} />
    </QueryFilter>
  );
};
