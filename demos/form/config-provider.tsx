import { ProForm, ProFormDatePicker } from '@ant-design/pro-components';
import { ConfigProvider } from 'antd';
import enUS from 'antd/locale/en_US';
import { useState } from 'react';

export default () => {
  const [result, setResult] = useState('');

  return (
    <div style={{ padding: 24 }}>
      <ConfigProvider locale={enUS}>
        <ProForm
          onFinish={async (values) => {
            setResult(JSON.stringify(values, null, 2));
          }}
        >
          <ProFormDatePicker name="date" label="Select a date" />
        </ProForm>
      </ConfigProvider>
      {result && <pre aria-label="提交结果">{result}</pre>}
    </div>
  );
};
