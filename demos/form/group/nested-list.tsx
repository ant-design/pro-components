import { ProForm, ProFormList, ProFormText } from '@ant-design/pro-components';
import { useState } from 'react';

export default () => {
  const [result, setResult] = useState('');

  return (
    <>
      <ProForm
        initialValues={{
          users: [{ name: '林青', labels: [{ value: '前端' }] }],
        }}
        onFinish={async ({ users }) => {
          setResult(JSON.stringify(users, null, 2));
          return true;
        }}
      >
        <ProFormList name="users" label="用户">
          <ProFormText name="name" label="姓名" />
          <ProFormList name="labels" label="标签">
            <ProFormText name="value" label="标签名称" />
          </ProFormList>
        </ProFormList>
      </ProForm>
      {result && <pre style={{ whiteSpace: 'pre-wrap' }}>{result}</pre>}
    </>
  );
};
