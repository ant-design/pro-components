import { ProTable } from '@ant-design/pro-components';

type Task = { id: number; title: string; state: string };

const tasks: Task[] = [
  { id: 1, title: '检查首页', state: '待处理' },
  { id: 2, title: '更新文档', state: '已完成' },
];

export default () => (
  <ProTable<Task>
    rowKey="id"
    headerTitle="dataSource 提供静态数据"
    search={false}
    pagination={false}
    columns={[
      { title: '任务', dataIndex: 'title' },
      { title: '状态', dataIndex: 'state' },
    ]}
    dataSource={tasks}
  />
);
