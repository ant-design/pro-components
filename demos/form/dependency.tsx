import {
  ProForm,
  ProFormDependency,
  ProFormText,
} from '@ant-design/pro-components';
import { useState } from 'react';

type Values = { customer: { name: string }; note?: string };

export default () => {
  const [submitted, setSubmitted] = useState<Values>();

  return (
    <div style={{ padding: 24 }}>
      <ProForm<Values>
        initialValues={{ customer: { name: '示例客户' } }}
        onFinish={async (values) => {
          setSubmitted(values);
          return true;
        }}
      >
        <ProFormText name={['customer', 'name']} label="客户名称" />
        <ProFormDependency name={[['customer', 'name']]}>
          {({ customer }) => (
            <ProFormText
              name="note"
              label={`给${customer?.name || '客户'}的备注`}
            />
          )}
        </ProFormDependency>
      </ProForm>
      <p>提交结果：{submitted ? JSON.stringify(submitted) : '尚未提交'}</p>
    </div>
  );
};
