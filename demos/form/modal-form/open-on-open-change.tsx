import { ModalForm, ProFormText } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useState } from 'react';

export default () => {
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState('');

  return (
    <div style={{ padding: 16 }}>
      <Button type="primary" onClick={() => setOpen(true)}>
        打开 Modal
      </Button>
      <p role="status">弹窗状态：{open ? '已打开' : '已关闭'}</p>
      <ModalForm
        title="受控 ModalForm"
        open={open}
        onOpenChange={setOpen}
        onFinish={async (values) => {
          setResult(JSON.stringify(values, null, 2));
          return true;
        }}
      >
        <ProFormText
          name="name"
          label="项目名称"
          rules={[{ required: true }]}
        />
      </ModalForm>
      {result && <pre style={{ overflowX: 'auto' }}>{result}</pre>}
    </div>
  );
};
