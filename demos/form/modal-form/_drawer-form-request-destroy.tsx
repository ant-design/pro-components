import { DrawerForm, ProFormText } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useState } from 'react';

export default () => {
  const [result, setResult] = useState('');

  return (
    <div style={{ padding: 24 }}>
      <p>打开后在数据加载期间关闭，再次打开可查看重新加载的字段。</p>
      <DrawerForm<{ name: string }>
        title="编辑记录"
        trigger={<Button>打开抽屉</Button>}
        drawerProps={{ destroyOnHidden: true }}
        request={async () => {
          await new Promise((resolve) => setTimeout(resolve, 650));
          return { name: '已加载的记录' };
        }}
        onFinish={async (values) => {
          setResult(JSON.stringify(values, null, 2));
          return true;
        }}
      >
        <ProFormText name="name" label="记录名称" />
      </DrawerForm>
      {result && <pre aria-label="提交结果">{result}</pre>}
    </div>
  );
};
