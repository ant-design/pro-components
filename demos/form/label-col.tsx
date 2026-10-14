import { ProForm, ProFormText } from '@ant-design/pro-components';
import { Alert } from 'antd';
import { useState } from 'react';

export default () => {
  const [submitted, setSubmitted] = useState('');

  return (
    <div style={{ width: '100%', maxWidth: 520 }}>
      <ProForm<{ name: string }>
        layout="horizontal"
        labelCol={{ xs: { span: 24 }, sm: { span: 8 } }}
        wrapperCol={{ xs: { span: 24 }, sm: { span: 16 } }}
        onFinish={async ({ name }) => {
          setSubmitted(name);
          return true;
        }}
      >
        <ProFormText
          name="name"
          label="客户名称"
          rules={[{ required: true }]}
        />
      </ProForm>
      {submitted && <Alert type="success" message={`已提交：${submitted}`} />}
    </div>
  );
};
