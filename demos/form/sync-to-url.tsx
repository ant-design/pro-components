import { ProForm, ProFormText } from '@ant-design/pro-components';
import { useState } from 'react';

export default () => {
  const [result, setResult] = useState('');

  return (
    <div style={{ padding: 24 }}>
      <p>提交后，关键词会同步到地址栏的查询参数。</p>
      <ProForm
        syncToUrl
        onFinish={async (values) => {
          setResult(JSON.stringify(values, null, 2));
          return true;
        }}
      >
        <ProFormText name="keyword" label="搜索关键词" />
      </ProForm>
      {result && <pre aria-label="提交结果">{result}</pre>}
    </div>
  );
};
