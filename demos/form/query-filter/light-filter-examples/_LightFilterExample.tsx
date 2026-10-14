import { LightFilter } from '@ant-design/pro-components';
import { useState } from 'react';

export default function LightFilterExample({
  children,
  initialValues = {},
}: {
  children: React.ReactNode;
  initialValues?: Record<string, unknown>;
}) {
  const [values, setValues] = useState(initialValues);

  return (
    <div>
      <LightFilter
        initialValues={initialValues}
        onFinish={async (nextValues) => {
          setValues(nextValues);
          return true;
        }}
      >
        {children}
      </LightFilter>
      <div role="status" style={{ marginTop: 16, overflowWrap: 'anywhere' }}>
        当前筛选：{JSON.stringify(values)}
      </div>
    </div>
  );
}
