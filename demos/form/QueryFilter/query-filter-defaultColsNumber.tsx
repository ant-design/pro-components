import { ProFormDatePicker, ProFormText, QueryFilter } from '@xxlabs/pro-components';

export default () => {
  return (
    <QueryFilter defaultCollapsed split defaultColsNumber={6}>
      <ProFormText label="应用名称" name="name" />
      <ProFormDatePicker label="创建时间" name="createDate" />
      <ProFormText label="应用状态" name="status" />
      <ProFormDatePicker label="响应日期" name="replyDate" />
      <ProFormDatePicker label="创建时间" name="startDate" />
      <ProFormDatePicker label="结束时间" name="endDate" />
    </QueryFilter>
  );
};
