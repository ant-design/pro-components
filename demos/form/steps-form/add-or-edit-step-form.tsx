import type { ProFormInstance } from '@ant-design/pro-components';
import { ProFormText, StepsForm } from '@ant-design/pro-components';
import { useEffect, useRef, useState } from 'react';

type Values = {
  projectName: string;
  approvalNote: string;
};

export default () => {
  const formMapRef = useRef<
    React.MutableRefObject<ProFormInstance<Values> | undefined>[]
  >([]);
  const [loaded, setLoaded] = useState(false);
  const [result, setResult] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      const firstStep = formMapRef.current[0]?.current;
      if (firstStep && !firstStep.getFieldValue('projectName')) {
        firstStep.setFieldsValue({ projectName: '青禾项目' });
      }
      setLoaded(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <p>{loaded ? '编辑数据已回填到第一步。' : '正在加载编辑数据…'}</p>
      <StepsForm<Values>
        formMapRef={formMapRef}
        onFinish={async (values) => {
          setResult(JSON.stringify(values, null, 2));
          return true;
        }}
      >
        <StepsForm.StepForm name="project" title="项目">
          <ProFormText
            name="projectName"
            label="项目名称"
            rules={[{ required: true, message: '请输入项目名称' }]}
          />
        </StepsForm.StepForm>
        <StepsForm.StepForm name="approval" title="审批">
          <ProFormText name="approvalNote" label="审批备注" />
        </StepsForm.StepForm>
      </StepsForm>
      {result && <pre aria-label="提交结果">{result}</pre>}
    </div>
  );
};
