import { ProFormText, StepsForm } from '@ant-design/pro-components';
import { Button, Modal } from 'antd';
import { useState } from 'react';

export default () => {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState('');

  return (
    <div style={{ padding: 16 }}>
      <Button type="primary" onClick={() => setOpen(true)}>
        打开分步表单
      </Button>
      <StepsForm
        onFinish={async (values) => {
          setSubmitted(JSON.stringify(values, null, 2));
          setOpen(false);
          return true;
        }}
        stepsFormRender={(steps, submitter) => (
          <Modal
            title="新建项目"
            width="min(520px, calc(100vw - 32px))"
            open={open}
            onCancel={() => setOpen(false)}
            footer={submitter}
            destroyOnHidden
          >
            {steps}
          </Modal>
        )}
      >
        <StepsForm.StepForm name="project" title="项目信息">
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
