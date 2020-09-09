import React from 'react';
import ProForm, {
  StepsFrom,
  ProFormText,
  ProFormDatePicker,
  ProFormDateTimePicker,
  ProFormDateRangePicker,
  ProFormTimePicker,
  ProFormDateTimeRangePicker,
  ProFormTextArea,
  ProFormCheckbox,
} from '@ant-design/pro-form';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default () => {
  return (
    <>
      <StepsFrom onFinish={(values) => console.log(values)}>
        <StepsFrom.StepFrom
          name="base"
          title="基础信息"
          validateMessages={{
            required: '此项为必填项',
          }}
          onFinish={async () => {
            await waitTime(2000);
            return true;
          }}
        >
          <ProFormText
            name="name"
            label="名称"
            tip="最长为 24 位，用于标定的唯一 id"
            placeholder="请输入名称"
            rules={[{ required: true }]}
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
        </StepsFrom.StepFrom>
        <StepsFrom.StepFrom name="checkbox" title="行业分布">
          <ProFormCheckbox.Group
            name="checkbox"
            layout="vertical"
            label="行业分布"
            options={['农业', '制造业', '互联网']}
          />
        </StepsFrom.StepFrom>
        <StepsFrom.StepFrom name="time" title="时间选择">
          <ProFormDateTimeRangePicker name="dateTimeRange" label="日期时间区间" />
          <ProFormTimePicker name="time" label="时间选择" placeholder="请选择" />
        </StepsFrom.StepFrom>
      </StepsFrom>
    </>
  );
};
