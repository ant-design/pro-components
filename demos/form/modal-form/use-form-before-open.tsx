import { ModalForm, ProForm, ProFormText } from '@ant-design/pro-components';
import { Button, Space } from 'antd';
import { useState } from 'react';

type User = {
  name: string;
  email: string;
};

const users: User[] = [
  { name: 'Alice', email: 'alice@example.com' },
  { name: 'Bob', email: 'bob@example.com' },
];

export default () => {
  const [form] = ProForm.useForm<User>();
  const [open, setOpen] = useState(false);
  const [saved, setSaved] = useState('');

  const handleEdit = (user: User) => {
    // forceRender connects this instance before the first button click.
    form.setFieldsValue(user);
    setOpen(true);
  };

  return (
    <div style={{ padding: 24 }}>
      <Space>
        {users.map((user) => (
          <Button key={user.email} onClick={() => handleEdit(user)}>
            Edit {user.name}
          </Button>
        ))}
      </Space>

      <ModalForm<User>
        form={form}
        open={open}
        onOpenChange={setOpen}
        modalProps={{ forceRender: true }}
        title="Edit user"
        onFinish={async (values) => {
          setSaved(JSON.stringify(values, null, 2));
          return true;
        }}
      >
        <ProFormText name="name" label="Name" rules={[{ required: true }]} />
        <ProFormText name="email" label="Email" />
      </ModalForm>
      {saved && <pre aria-label="保存结果">{saved}</pre>}
    </div>
  );
};
