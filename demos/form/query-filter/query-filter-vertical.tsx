import { ProFormText, QueryFilter } from '@ant-design/pro-components';
import { useState } from 'react';

export default () => {
  const [result, setResult] = useState('');

  return (
    <div style={{ padding: 24 }}>
      <QueryFilter
        layout="vertical"
        onFinish={async (values) => {
          setResult(JSON.stringify(values, null, 2));
        }}
      >
        <ProFormText name="name" label="应用名称" />
      </QueryFilter>
      {result && <pre aria-label="查询结果">{result}</pre>}
    </div>
  );
};
