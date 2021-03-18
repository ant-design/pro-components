import React from 'react';
import { QueryFilter, ProFormText, ProFormDatePicker } from '@ant-design/pro-form';

export default () => {
  return (
    <QueryFilter defaultCollapsed>
      <ProFormText name="name" label="应用名称" />
      <ProFormDatePicker name="createDate" label="创建时间" />
      <ProFormText name="status" label="应用状态" />
      <ProFormDatePicker name="replyDate" label="响应日期" />
      <ProFormDatePicker name="enddate" label="创建时间" />
    </QueryFilter>
  );
};
