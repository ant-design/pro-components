import { ProForm, ProFormText } from '@ant-design/pro-components';
import { Segmented } from 'antd';
import { useState } from 'react';

type Layout = 'horizontal' | 'vertical' | 'inline';
type Values = { name: string; company?: string };

export default () => {
  const [layout, setLayout] = useState<Layout>('horizontal');
  const [submitted, setSubmitted] = useState<Values>();

  return (
    <div style={{ padding: 24 }}>
      <p>ProForm.layout：{layout}</p>
      <Segmented<Layout>
        aria-label="表单布局"
        value={layout}
        onChange={setLayout}
        options={[
          { label: '横向', value: 'horizontal' },
          { label: '纵向', value: 'vertical' },
          { label: '行内', value: 'inline' },
        ]}
      />
      <ProForm<Values>
        layout={layout}
        style={{ marginTop: 16 }}
        onFinish={async (values) => {
          setSubmitted(values);
          return true;
        }}
      >
        <ProFormText name="name" label="联系人" />
        <ProFormText name="company" label="公司" />
      </ProForm>
      <p>提交结果：{submitted ? JSON.stringify(submitted) : '尚未提交'}</p>
    </div>
  );
};
