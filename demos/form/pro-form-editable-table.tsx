import type { ProColumns } from '@ant-design/pro-components';
import { EditableProTable, ProForm } from '@ant-design/pro-components';
import { Alert } from 'antd';
import { useState } from 'react';

type Task = { id: number; title: string };
const tasks: Task[] = [{ id: 1, title: '优化首页加载速度' }];
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
        onFinish={async ({ tasks: values }) => {
          setSubmitted(JSON.stringify(values));
          return true;
        }}
      >
        <ProForm.Item
          name="tasks"
          label="任务"
          initialValue={tasks}
          trigger="onValuesChange"
        >
          <EditableProTable<Task>
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
        </ProForm.Item>
      </ProForm>
      {submitted && (
        <Alert type="success" message={`表单中的任务：${submitted}`} />
      )}
    </div>
  );
};
