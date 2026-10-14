import { ProForm } from '@ant-design/pro-components';
import type { ReactNode } from 'react';
import { useState } from 'react';

export default function DateFieldDemo({ children }: { children: ReactNode }) {
  const [result, setResult] = useState('');

  return (
    <div style={{ padding: 12, maxWidth: '100%', overflowX: 'auto' }}>
      <ProForm
        layout="vertical"
        onFinish={async (values) => {
          setResult(JSON.stringify(values, null, 2));
          return true;
        }}
      >
        {children}
      </ProForm>
      {result && <pre style={{ whiteSpace: 'pre-wrap' }}>{result}</pre>}
    </div>
  );
}
