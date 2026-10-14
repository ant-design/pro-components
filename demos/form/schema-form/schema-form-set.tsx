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
            title: '地址',
            dataIndex: 'address',
            valueType: 'formSet',
            columns: [
              {
                title: '城市',
                dataIndex: 'city',
                fieldProps: { placeholder: '城市' },
              },
              {
                title: '街道',
                dataIndex: 'street',
                fieldProps: { placeholder: '街道' },
              },
            ],
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
