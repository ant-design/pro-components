import { ProForm, ProFormText } from '@ant-design/pro-components';
import { useState } from 'react';

type Contact = { name: string; company: string; email: string };

export default () => {
  const [submitted, setSubmitted] = useState<Contact>();

  return (
    <div style={{ padding: 24 }}>
      <ProForm<Contact>
        grid
        rowProps={{ gutter: 16 }}
        onFinish={async (values) => {
          setSubmitted(values);
          return true;
        }}
      >
        <ProFormText
          name="name"
          label="联系人"
          colProps={{ xs: 24, md: 12 }}
          rules={[{ required: true, message: '请输入联系人' }]}
        />
        <ProFormText
          name="company"
          label="公司"
          colProps={{ xs: 24, md: 12 }}
        />
        <ProFormText name="email" label="邮箱" colProps={{ xs: 24, md: 12 }} />
      </ProForm>
      <p>提交结果：{submitted ? JSON.stringify(submitted) : '尚未提交'}</p>
    </div>
  );
};
