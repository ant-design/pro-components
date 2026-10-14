import type { ProColumns } from '@ant-design/pro-components';
import { EditableProTable, ProForm } from '@ant-design/pro-components';
import { Alert } from 'antd';
import { useState } from 'react';

type Task = { id: number; title: string };
const initialTasks: Task[] = [{ id: 1, title: '优化首页加载速度' }];
const columns: ProColumns<Task>[] = [
  {
    title: '任务名称',
    dataIndex: 'title',
    formItemProps: { rules: [{ required: true }] },
  },
  { title: '操作', valueType: 'option' },
];

export default () => {
  const [editableKeys, setEditableKeys] = useState<React.Key[]>([1]);
  const [submitted, setSubmitted] = useState('');

  return (
    <div style={{ maxWidth: '100%', overflowX: 'auto' }}>
      <ProForm<{ tasks: Task[] }>
        initialValues={{ tasks: initialTasks }}
        onFinish={async ({ tasks }) => {
          setSubmitted(JSON.stringify(tasks));
          return true;
        }}
      >
        <EditableProTable<Task>
          name="tasks"
          rowKey="id"
          columns={columns}
          scroll={{ x: 480 }}
          toolBarRender={false}
          recordCreatorProps={false}
          editable={{
            type: 'multiple',
            editableKeys,
            onChange: setEditableKeys,
          }}
        />
      </ProForm>
      {submitted && <Alert type="success" message={`表单任务：${submitted}`} />}
    </div>
  );
};
