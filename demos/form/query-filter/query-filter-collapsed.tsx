import { ProFormText, QueryFilter } from '@ant-design/pro-components';
import { useState } from 'react';

export default () => {
  const [result, setResult] = useState('');

  return (
    <div style={{ padding: 24 }}>
      <QueryFilter
        defaultCollapsed={false}
        onFinish={async (values) => {
          setResult(JSON.stringify(values, null, 2));
        }}
      >
        <ProFormText name="name" label="应用名称" />
        <ProFormText name="owner" label="负责人" />
        <ProFormText name="department" label="所属部门" />
        <ProFormText name="status" label="状态" />
      </QueryFilter>
      {result && <pre aria-label="查询结果">{result}</pre>}
    </div>
  );
};
