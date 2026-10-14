import type { ProFormColumnsType } from '@ant-design/pro-components';
import { BetaSchemaForm } from '@ant-design/pro-components';
import { useState } from 'react';

type FormValues = { members?: { name: string }[] };

const columns: ProFormColumnsType<FormValues>[] = [
  {
    title: '成员',
    dataIndex: 'members',
    valueType: 'formList',
    formItemProps: {
      rules: [{ required: true, message: '请至少添加一位成员' }],
    },
    columns: [
      {
        title: '姓名',
        dataIndex: 'name',
        formItemProps: {
          rules: [{ required: true, message: '请输入姓名' }],
        },
      },
    ],
  },
];

export default () => {
  const [submitted, setSubmitted] = useState('');

  return (
    <div style={{ maxWidth: 480, padding: 16 }}>
      <BetaSchemaForm<FormValues>
        layoutType="Form"
        columns={columns}
        onFinish={async (values) =>
          setSubmitted(JSON.stringify(values, null, 2))
        }
      />
      {submitted && <pre style={{ overflowX: 'auto' }}>{submitted}</pre>}
    </div>
  );
};
