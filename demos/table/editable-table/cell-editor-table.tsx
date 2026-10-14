import type { ProColumns } from '@ant-design/pro-components';
import { CellEditorTable } from '@ant-design/pro-components';
import { useState } from 'react';

type Task = { id: number; title: string };

const columns: ProColumns<Task>[] = [
  {
    title: '任务名称',
    dataIndex: 'title',
    formItemProps: { rules: [{ required: true, message: '请输入任务名称' }] },
  },
];

export default () => {
  const [tasks, setTasks] = useState<readonly Task[]>([
    { id: 1, title: '设计首页' },
    { id: 2, title: '开发登录页' },
  ]);

  return (
    <div style={{ padding: 24 }}>
      <CellEditorTable<Task>
        columns={columns}
        rowKey="id"
        value={tasks}
        onChange={(next) =>
          setTasks(next.map(({ id, title }) => ({ id, title })))
        }
      />
      <p>当前数据：{JSON.stringify(tasks)}</p>
    </div>
  );
};
