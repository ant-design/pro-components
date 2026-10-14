import { ProForm, ProFormText } from '@ant-design/pro-components';
import { useState } from 'react';

export default () => {
  const [result, setResult] = useState('');

  return (
    <div style={{ padding: 24 }}>
      <p>提交后只有公开名称会写入地址栏，备注仍保留在提交结果中。</p>
      <ProForm
        syncToUrl={(values, type) =>
          type === 'get' ? values : { ...values, privateNote: undefined }
        }
        onFinish={async (values) => {
          setResult(JSON.stringify(values, null, 2));
          return true;
        }}
      >
        <ProFormText name="name" label="公开名称" />
        <ProFormText name="privateNote" label="私密备注" />
      </ProForm>
      {result && <pre aria-label="提交结果">{result}</pre>}
    </div>
  );
};
