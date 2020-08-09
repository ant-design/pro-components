import React from 'react';
import {
  QueryFilter,
  ProFormText,
  ProFormDatePicker,
  ProFormDateRangePicker,
} from '@ant-design/pro-form';

export default () => {
  return (
    <QueryFilter>
      <ProFormText name="name" label="应用名称" />
      <ProFormText name="creater" label="创建人" />
      <ProFormText name="status" label="应用状态" />
      <ProFormDatePicker name="startdate" label="响应日期" />
      <ProFormDateRangePicker name="create" label="创建时间" colSize={2} />
    </QueryFilter>
  );
};
