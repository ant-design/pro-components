import { ModalForm, ProForm, ProFormText } from '@ant-design/pro-components';
import { Button, Space, message } from 'antd';
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

  const edit = (user: User) => {
    // forceRender connects this instance before the first button click.
    form.setFieldsValue(user);
    setOpen(true);
  };

  return (
    <>
      <Space>
        {users.map((user) => (
          <Button key={user.email} onClick={() => edit(user)}>
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
          message.success(`Saved ${values.name}`);
          return true;
        }}
      >
        <ProFormText name="name" label="Name" rules={[{ required: true }]} />
        <ProFormText name="email" label="Email" />
      </ModalForm>
    </>
  );
};
