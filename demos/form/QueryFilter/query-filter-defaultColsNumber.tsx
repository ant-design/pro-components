import {
  ProFormDatePicker,
  ProFormText,
  QueryFilter,
} from '@ant-design/pro-components';

export default () => {
  return (
    <QueryFilter defaultCollapsed split defaultColsNumber={6}>
      <ProFormText name="name" label="应用名称" />
      <ProFormDatePicker name="createDate" label="创建时间" />
      <ProFormText name="status" label="应用状态" />
      <ProFormDatePicker name="replyDate" label="响应日期" />
      <ProFormDatePicker name="startDate" label="创建时间" />
      <ProFormDatePicker name="endDate" label="结束时间" />
    </QueryFilter>
  );
};
