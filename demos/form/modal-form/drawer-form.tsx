import { DrawerForm, ProFormText } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useState } from 'react';

type Task = { title: string };

export default () => {
  const [saved, setSaved] = useState<Task>();

  return (
    <div style={{ padding: 24 }}>
      <DrawerForm<Task>
        title="新增任务"
        trigger={<Button type="primary">新增任务</Button>}
        onFinish={async (values) => {
          setSaved(values);
          return true;
        }}
      >
        <ProFormText
          name="title"
          label="任务名称"
          placeholder="请输入任务名称"
          rules={[{ required: true, message: '请输入任务名称' }]}
        />
      </DrawerForm>
      <p>最近提交：{saved ? saved.title : '尚未提交'}</p>
    </div>
  );
};
