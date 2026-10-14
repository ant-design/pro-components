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
          initialValue="qinghe"
          transform={(value: string) => value.toUpperCase()}
        />
      </ProForm>
      <Button
        onClick={() =>
          setResult(
            JSON.stringify(formRef.current?.getFieldsFormatValue?.() ?? {}),
          )
        }
      >
        读取格式化值
      </Button>
      {result && (
        <Alert type="info" message={result} style={{ marginTop: 16 }} />
      )}
    </div>
  );
};
