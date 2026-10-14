import { ProForm, ProFormMoney } from '@ant-design/pro-components';
import { useState } from 'react';

export default () => {
  const [submitted, setSubmitted] = useState('');

  return (
    <div style={{ maxWidth: 480, padding: 16 }}>
      <ProForm
        onFinish={async (values) =>
          setSubmitted(JSON.stringify(values, null, 2))
        }
      >
        <ProFormMoney
          name="amount"
          label="不保留小数"
          fieldProps={{ precision: 0 }}
          initialValue={22.22}
        />
      </ProForm>
      {submitted && <pre style={{ overflowX: 'auto' }}>{submitted}</pre>}
    </div>
  );
};
