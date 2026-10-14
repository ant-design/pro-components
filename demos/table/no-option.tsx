import { ProTable } from '@ant-design/pro-components';

type Task = { id: number; title: string };

const tasks: Task[] = [
  { id: 1, title: '检查首页' },
  { id: 2, title: '更新文档' },
];

export default () => (
  <ProTable<Task>
    rowKey="id"
    columns={[{ title: '任务', dataIndex: 'title' }]}
    pagination={false}
    search={{ optionRender: false, collapsed: false }}
    request={async ({ title }) => {
      const data = tasks.filter((task) => !title || task.title.includes(title));
      return { data, total: data.length, success: true };
    }}
  />
);
