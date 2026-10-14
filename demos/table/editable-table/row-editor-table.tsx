import type { ProColumns } from '@ant-design/pro-components';
import { RowEditorTable } from '@ant-design/pro-components';
import { useState } from 'react';

type Task = { id: number; title: string; owner: string };

const columns: ProColumns<Task>[] = [
  {
    title: '任务名称',
    dataIndex: 'title',
    formItemProps: { rules: [{ required: true, message: '请输入任务名称' }] },
  },
  { title: '负责人', dataIndex: 'owner' },
];

export default () => {
  const [tasks, setTasks] = useState<readonly Task[]>([
    { id: 1, title: '设计首页', owner: '张三' },
    { id: 2, title: '开发登录页', owner: '李四' },
  ]);

  return (
    <div style={{ padding: 24 }}>
      <RowEditorTable<Task>
        columns={columns}
        rowKey="id"
        value={tasks}
        onChange={(next) =>
          setTasks(next.map(({ id, title, owner }) => ({ id, title, owner })))
        }
        editable={{
          onValuesChange: (_record, next) =>
            setTasks(
              next.map(({ id, title, owner }) => ({ id, title, owner })),
            ),
        }}
      />
      <p>当前数据：{JSON.stringify(tasks)}</p>
    </div>
  );
};
