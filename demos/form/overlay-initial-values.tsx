import { ModalForm, ProFormText } from '@ant-design/pro-components';
import { Button, Space, message } from 'antd';
import { useState } from 'react';

const OverlayInitialization = () => {
  const [open, setOpen] = useState(false);
  const [record, setRecord] = useState({ name: 'Alice' });
  return (
    <Space>
      {['Alice', 'Bob'].map((name) => (
        <Button
          key={name}
          onClick={() => {
            setRecord({ name });
            setOpen(true);
          }}
        >
          编辑 {name}
        </Button>
      ))}
      <ModalForm
        open={open}
        onOpenChange={setOpen}
        initialValues={record}
        request={async () => record}
        title="受控弹窗初始化"
        onFinish={async ({ name }) => {
          message.success(`已保存 ${name}`);
          return true;
        }}
      >
        <ProFormText name="name" label="姓名" />
      </ModalForm>
    </Space>
  );
};

export default OverlayInitialization;
