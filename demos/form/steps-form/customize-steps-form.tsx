import { ProFormText, StepsForm } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useState } from 'react';

export default () => {
  const [submitted, setSubmitted] = useState('');

  return (
    <div style={{ maxWidth: 640, padding: 16 }}>
      <StepsForm
        onFinish={async (values) => {
          setSubmitted(JSON.stringify(values, null, 2));
          return true;
        }}
        submitter={{
          render: ({ step, onPre, onSubmit }) => [
            step > 0 && (
              <Button key="previous" onClick={onPre}>
                返回上一步
              </Button>
            ),
            <Button key="next" type="primary" onClick={onSubmit}>
              {step === 0
                ? '填写负责人'
                : step === 1
                  ? '确认并提交'
                  : '保存项目'}
            </Button>,
          ],
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
        <StepsForm.StepForm name="note" title="备注">
          <ProFormText name="note" label="备注" />
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
