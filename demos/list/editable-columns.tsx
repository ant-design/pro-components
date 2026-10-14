import type { ProColumns } from '@ant-design/pro-components';
import { ProList } from '@ant-design/pro-components';
import { useState } from 'react';

type Task = { id: number; title: string; description: string };

const columns: ProColumns<Task>[] = [
  { title: '任务', dataIndex: 'title', listSlot: 'title' },
  { title: '说明', dataIndex: 'description', listSlot: 'description' },
  {
    title: '操作',
    listSlot: 'actions',
    render: (_, task, __, action) => [
      <a key="edit" onClick={() => action?.startEditable(task.id)}>
        编辑
      </a>,
    ],
  },
];

export default () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: '检查首页', description: '确认布局适配' },
    { id: 2, title: '更新文档', description: '补充 API 说明' },
  ]);

  return (
    <ProList<Task>
      rowKey="id"
      headerTitle="编辑列表项"
      columns={columns}
      dataSource={tasks}
      onDataSourceChange={setTasks}
      editable={{ onSave: async () => true }}
      pagination={false}
    />
  );
};
