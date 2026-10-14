import { BetaSchemaForm } from '@ant-design/pro-components';
import { Alert, Button } from 'antd';
import { useState } from 'react';

export default () => {
  const [result, setResult] = useState('');

  return (
    <>
      <BetaSchemaForm
        layoutType="DrawerForm"
        trigger={<Button>打开抽屉表单</Button>}
        columns={[
          {
            title: '项目名称',
            dataIndex: 'name',
            formItemProps: { rules: [{ required: true }] },
          },
        ]}
        onFinish={async (values) => {
          setResult(JSON.stringify(values));
          return true;
        }}
      />
      {result && <Alert type="success" message={result} />}
    </>
  );
};
