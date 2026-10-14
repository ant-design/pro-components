import {
  ProCard,
  ProFormSelect,
  ProFormText,
  StepsForm,
} from '@ant-design/pro-components';
import { Alert } from 'antd';
import { useState } from 'react';

export default () => {
  const [submitted, setSubmitted] = useState('');

  return (
    <div
      style={{
        width: '100%',
        minWidth: 0,
        paddingInline: 8,
        boxSizing: 'border-box',
      }}
    >
      <StepsForm
        onFinish={async (values) => {
          setSubmitted(JSON.stringify(values));
          return true;
        }}
      >
        <StepsForm.StepForm name="details" title="任务信息">
          <ProCard
            title="任务名称"
            variant="outlined"
            style={{ marginBottom: 16 }}
          >
            <ProFormText
              name="name"
              label="名称"
              rules={[{ required: true }]}
            />
          </ProCard>
          <ProCard title="负责人" variant="outlined">
            <ProFormText name="owner" label="姓名" />
          </ProCard>
        </StepsForm.StepForm>
        <StepsForm.StepForm name="settings" title="运行设置">
          <ProCard title="环境" variant="outlined">
            <ProFormSelect
              name="environment"
              label="部署环境"
              options={[
                { label: '测试', value: 'test' },
                { label: '生产', value: 'production' },
              ]}
              rules={[{ required: true }]}
            />
          </ProCard>
        </StepsForm.StepForm>
      </StepsForm>
      {submitted && <Alert type="success" message={`已提交：${submitted}`} />}
    </div>
  );
};
