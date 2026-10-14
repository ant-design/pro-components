import { ProList } from '@ant-design/pro-components';
import { useState } from 'react';

type Task = { id: string; title: string };

const initialTasks: Task[] = [
  { id: '1', title: '设计首页' },
  { id: '2', title: '开发登录页' },
];

export default () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  return (
    <div style={{ padding: 24 }}>
      <ProList<Task>
        rowKey="id"
        dataSource={tasks}
        onDataSourceChange={(next) =>
          setTasks(next.map(({ id, title }) => ({ id, title })))
        }
        editable={{
          onSave: async () => true,
          actionRender: (_row, _config, doms) => [doms.save, doms.cancel],
        }}
        columns={[
          { title: '任务名称', dataIndex: 'title', listSlot: 'title' },
          {
            listSlot: 'actions',
            render: (_, task, __, action) => [
              <a key="edit" onClick={() => action?.startEditable(task.id)}>
                编辑
              </a>,
            ],
          },
        ]}
      />
      <p>当前列表：{JSON.stringify(tasks)}</p>
    </div>
  );
};
