import { ProForm, ProFormSelect } from '@ant-design/pro-components';
import { useState } from 'react';

export default () => {
  const [result, setResult] = useState('');

  return (
    <div style={{ padding: 24 }}>
      <ProForm
        onFinish={async (values) => {
          setResult(JSON.stringify(values, null, 2));
        }}
      >
        <ProFormSelect
          name="useMode"
          label="合同生效方式"
          options={[{ value: 'chapter', label: '盖章后生效' }]}
          fieldProps={{ labelInValue: true }}
          rules={[{ required: true, message: '请选择生效方式' }]}
        />
      </ProForm>
      {result && <pre aria-label="提交结果">{result}</pre>}
    </div>
  );
};
