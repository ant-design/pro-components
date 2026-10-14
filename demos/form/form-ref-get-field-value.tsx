import type { ProFormInstance } from '@ant-design/pro-components';
import { ProForm, ProFormText } from '@ant-design/pro-components';
import { Alert, Button } from 'antd';
import { useRef, useState } from 'react';

export default () => {
  const formRef = useRef<ProFormInstance>();
  const [company, setCompany] = useState('');

  return (
    <div style={{ maxWidth: 440 }}>
      <ProForm formRef={formRef} submitter={false}>
        <ProFormText name="company" label="公司名称" initialValue="青禾科技" />
      </ProForm>
      <Button
        onClick={() =>
          setCompany(formRef.current?.getFieldValue('company') ?? '')
        }
      >
        读取公司名称
      </Button>
      {company && (
        <Alert
          type="info"
          message={`当前公司：${company}`}
          style={{ marginTop: 16 }}
        />
      )}
    </div>
  );
};
