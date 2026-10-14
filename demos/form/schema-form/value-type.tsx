import { BetaSchemaForm } from '@ant-design/pro-components';
import { useState } from 'react';

export default () => {
  const [submitted, setSubmitted] = useState('');

  return (
    <div style={{ maxWidth: 480, padding: 16 }}>
      <BetaSchemaForm<{ status: string }>
        layoutType="Form"
        columns={[
          {
            title: '处理状态',
            dataIndex: 'status',
            valueType: 'select',
            valueEnum: { open: '待处理', closed: '已完成' },
            formItemProps: { rules: [{ required: true }] },
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
