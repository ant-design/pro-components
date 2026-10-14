import type { ProFormInstance } from '@ant-design/pro-components';
import { BetaSchemaForm } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useRef, useState } from 'react';

type Values = { projectName: string };

export default () => {
  const formRef = useRef<ProFormInstance<Values>>();
  const [result, setResult] = useState('');

  return (
    <div style={{ padding: 24, maxWidth: 480 }}>
      <BetaSchemaForm<Values>
        formRef={formRef}
        submitter={false}
        initialValues={{ projectName: '青禾项目' }}
        columns={[
          { title: '项目名称', dataIndex: 'projectName', valueType: 'text' },
        ]}
      />
      <Button
        onClick={() =>
          setResult(JSON.stringify(formRef.current?.getFieldsValue(), null, 2))
        }
      >
        读取表单值
      </Button>
      {result && <pre aria-label="表单值">{result}</pre>}
    </div>
  );
};
