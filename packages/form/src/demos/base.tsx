import React from 'react';
import ProForm, {
  ProFormText,
  ProFormDatePicker,
  ProFormDateTimePicker,
  ProFormDateRangePicker,
  ProFormTimePicker,
  ProFormDateTimeRangePicker,
  ProFormTextArea,
  ProFormCheckbox,
} from '@ant-design/pro-form';

export default () => {
  return (
    <ProForm onFinish={(values) => console.log(values)}>
      <ProFormText
        name="name"
        label="名称"
        tip="最长为 24 位，用于标定的唯一 id"
        placeholder="请输入名称"
      />
      <ProFormTextArea
        name="remark"
        label="备注"
        placeholder="请输入备注"
        tip="最长为 24 位，用于标定的唯一 id,最长为 24 位，用于标定的唯一 id,最长为 24 位，用于标定的唯一 id"
      />
      <ProFormDatePicker name="date" label="日期" />
      <ProForm.Group title="这是一个分组">
        <ProFormDateTimePicker name="dateTime" label="日期时间" />
        <ProFormDateRangePicker name="dateRange" label="日期区间" />
      </ProForm.Group>
      <ProFormCheckbox.Group
        name="checkbox"
        layout="vertical"
        label="行业分布"
        options={['农业', '制造业', '互联网']}
      />
      <ProFormDateTimeRangePicker name="dateTimeRange" label="日期时间区间" />
      <ProFormTimePicker name="time" label="时间选择" placeholder="请选择" />
    </ProForm>
  );
};
