import { ProForm, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { useState } from 'react';

export default () => {
  const [result, setResult] = useState('');

  return (
    <div style={{ padding: 12 }}>
      <ProForm
        onFinish={async (values) => {
          setResult(JSON.stringify(values, null, 2));
          return true;
        }}
      >
        <ProFormText name="name" label="项目名称" rules={[{ required: true }]} />
        <ProFormSelect
          name="status"
          label="状态"
          options={[
            { label: '待处理', value: 'open' },
            { label: '已完成', value: 'done' },
          ]}
        />
      </ProForm>
      {result && <pre style={{ whiteSpace: 'pre-wrap' }}>{result}</pre>}
    </div>
  );
};
