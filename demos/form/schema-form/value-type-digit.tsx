import { BetaSchemaForm } from '@ant-design/pro-components';
import { useState } from 'react';

export default () => {
  const [submitted, setSubmitted] = useState('');

  return (
    <div style={{ maxWidth: 480, padding: 16 }}>
      <BetaSchemaForm<{ quantity: number }>
        layoutType="Form"
        initialValues={{ quantity: 3 }}
        columns={[
          {
            title: '数量',
            dataIndex: 'quantity',
            valueType: 'digit',
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
