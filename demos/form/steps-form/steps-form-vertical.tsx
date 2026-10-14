import { ProFormText, StepsForm } from '@ant-design/pro-components';
import { useState } from 'react';

export default () => {
  const [submitted, setSubmitted] = useState('');

  return (
    <div style={{ maxWidth: 640, padding: 16 }}>
      <StepsForm
        stepsProps={{ orientation: 'vertical' }}
        onFinish={async (values) => {
          setSubmitted(JSON.stringify(values, null, 2));
          return true;
        }}
      >
        <StepsForm.StepForm name="project" title="项目">
          <ProFormText
            name="projectName"
            label="项目名称"
            rules={[{ required: true }]}
          />
        </StepsForm.StepForm>
        <StepsForm.StepForm name="owner" title="负责人">
          <ProFormText
            name="ownerName"
            label="负责人"
            rules={[{ required: true }]}
          />
        </StepsForm.StepForm>
      </StepsForm>
      {submitted && (
        <pre style={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}>
          {submitted}
        </pre>
      )}
    </div>
  );
};
