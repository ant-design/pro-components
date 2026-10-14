import { ModalForm, ProFormText } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useState } from 'react';

type Customer = { name: string };

export default () => {
  const [saved, setSaved] = useState<Customer>();

  return (
    <div style={{ padding: 24 }}>
      <ModalForm<Customer>
        title="新增客户"
        trigger={<Button type="primary">新增客户</Button>}
        onFinish={async (values) => {
          setSaved(values);
          return true;
        }}
      >
        <ProFormText
          name="name"
          label="客户名称"
          placeholder="请输入客户名称"
          rules={[{ required: true, message: '请输入客户名称' }]}
        />
      </ModalForm>
      <p>最近提交：{saved ? saved.name : '尚未提交'}</p>
    </div>
  );
};
