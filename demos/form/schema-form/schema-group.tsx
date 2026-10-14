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
            title: '联系人',
            valueType: 'group',
            columns: [
              { title: '姓', dataIndex: 'familyName' },
              { title: '名', dataIndex: 'givenName' },
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
