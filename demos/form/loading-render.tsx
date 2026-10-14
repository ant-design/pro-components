import { ProForm, ProFormText } from '@ant-design/pro-components';
import { Button, Skeleton } from 'antd';
import { useState } from 'react';

export default () => {
  const [reload, setReload] = useState(0);
  const [result, setResult] = useState('');

  return (
    <div style={{ padding: 24 }}>
      <Button onClick={() => setReload((value) => value + 1)}>
        重新加载表单
      </Button>
      <ProForm
        key={reload}
        request={async () => {
          await new Promise((resolve) => setTimeout(resolve, 700));
          return { name: '示例项目' };
        }}
        loadingRender={<Skeleton active paragraph={{ rows: 2 }} />}
        onFinish={async (values) => {
          setResult(JSON.stringify(values, null, 2));
        }}
      >
        <ProFormText name="name" label="项目名称" />
      </ProForm>
      {result && <pre aria-label="提交结果">{result}</pre>}
    </div>
  );
};
