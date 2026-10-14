import { BetaSchemaForm } from '@ant-design/pro-components';
import { Alert } from 'antd';
import { useState } from 'react';

export default () => {
  const [result, setResult] = useState('');

  return (
    <div style={{ maxWidth: 560 }}>
      <BetaSchemaForm
        layoutType="Form"
        columns={[
          {
            title: '项目代码',
            dataIndex: 'code',
            transform: (value: string) => ({
              code: value.trim().toUpperCase(),
            }),
          },
        ]}
        onFinish={async (values) => {
          setResult(JSON.stringify(values));
          return true;
        }}
      />
      {result && <Alert type="success" message={result} />}
    </div>
  );
};
