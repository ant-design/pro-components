import { BetaSchemaForm } from '@ant-design/pro-components';
import { useState } from 'react';

export default () => {
  const [submitted, setSubmitted] = useState('');

  return (
    <div style={{ maxWidth: 480, padding: 16 }}>
      <BetaSchemaForm<{ dueDate: string }>
        layoutType="Form"
        initialValues={{ dueDate: '2026-10-14' }}
        columns={[
          {
            title: '截止日期',
            dataIndex: 'dueDate',
            valueType: 'date',
          },
        ]}
        onFinish={async (values) => {
          setSubmitted(JSON.stringify(values, null, 2));
          return true;
        }}
      />
      {submitted && <pre style={{ overflowX: 'auto' }}>{submitted}</pre>}
    </div>
  );
};
