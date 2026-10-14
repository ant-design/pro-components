import { ProFormText, StepsForm } from '@ant-design/pro-components';
import { useState } from 'react';

export default () => {
  const [submitted, setSubmitted] = useState('');

  return (
    <div style={{ maxWidth: 520, padding: 8 }}>
      <StepsForm
        containerStyle={{ minWidth: 0, width: '100%' }}
        onFinish={async (values) => {
          setSubmitted(JSON.stringify(values, null, 2));
          return true;
        }}
      >
        <StepsForm.StepForm name="details" title="服务信息">
          <ProFormText
            name="name"
            label="服务名称"
            rules={[{ required: true, message: '请输入服务名称' }]}
          />
        </StepsForm.StepForm>
        <StepsForm.StepForm name="owner" title="负责人">
          <ProFormText
            name="owner"
            label="负责人"
            rules={[{ required: true, message: '请输入负责人' }]}
          />
        </StepsForm.StepForm>
      </StepsForm>
      {submitted && <pre style={{ overflowX: 'auto' }}>{submitted}</pre>}
    </div>
  );
};
