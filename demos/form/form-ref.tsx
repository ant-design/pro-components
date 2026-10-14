import type { ProFormInstance } from '@ant-design/pro-components';
import { ProForm, ProFormText } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useRef } from 'react';

export default () => {
  const formRef = useRef<ProFormInstance>();

  return (
    <div style={{ maxWidth: 440 }}>
      <Button
        onClick={() => formRef.current?.setFieldsValue({ company: '青禾科技' })}
        style={{ marginBottom: 16 }}
      >
        填写公司名称
      </Button>
      <ProForm formRef={formRef} submitter={false}>
        <ProFormText name="company" label="公司名称" />
      </ProForm>
    </div>
  );
};
