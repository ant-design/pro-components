import type { ProFormInstance } from '@ant-design/pro-components';
import { ProForm, ProFormText } from '@ant-design/pro-components';
import { Alert, Button } from 'antd';
import { useRef, useState } from 'react';

export default () => {
  const formRef = useRef<ProFormInstance>();
  const [result, setResult] = useState('');

  return (
    <div style={{ maxWidth: 440 }}>
      <ProForm formRef={formRef} submitter={false}>
        <ProFormText
          name="company"
          label="公司名称"
          rules={[{ required: true, message: '请输入公司名称' }]}
          transform={(value: string) => value.toUpperCase()}
        />
      </ProForm>
      <Button
        onClick={async () => {
          try {
            const values =
              await formRef.current?.validateFieldsReturnFormatValue?.();
            setResult(JSON.stringify(values));
          } catch {
            setResult('请先完成必填项');
          }
        }}
      >
        校验并读取格式化值
      </Button>
      {result && (
        <Alert type="info" message={result} style={{ marginTop: 16 }} />
      )}
    </div>
  );
};
