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
            title: '成员',
            dataIndex: 'members',
            valueType: 'formList',
            columns: [
              {
                title: '姓名',
                dataIndex: 'name',
                formItemProps: { rules: [{ required: true }] },
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
