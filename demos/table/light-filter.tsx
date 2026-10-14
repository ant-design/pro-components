import { ProTable } from '@ant-design/pro-components';

type Task = { id: number; title: string; status: 'open' | 'done' };

const tasks: Task[] = [
  { id: 1, title: '检查首页', status: 'open' },
  { id: 2, title: '更新文档', status: 'done' },
  { id: 3, title: '修复布局', status: 'open' },
];

export default () => (
  <ProTable<Task>
    rowKey="id"
    columns={[
      { title: '任务', dataIndex: 'title', search: false },
      {
        title: '状态',
        dataIndex: 'status',
        valueType: 'select',
        valueEnum: { open: '待处理', done: '已完成' },
        fieldProps: { style: { width: 60 } },
      },
    ]}
    pagination={false}
    search={{ filterType: 'light' }}
    request={async ({ status }) => {
      const data = tasks.filter((task) => !status || task.status === status);
      return { data, total: data.length, success: true };
    }}
  />
);
