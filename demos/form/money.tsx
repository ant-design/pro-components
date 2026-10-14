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
          label="自定义货币符号"
          customSymbol="💰"
          initialValue={22.22}
        />
      </ProForm>
      {submitted && <pre style={{ overflowX: 'auto' }}>{submitted}</pre>}
    </div>
  );
};
