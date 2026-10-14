import { ProTable } from '@ant-design/pro-components';

type Task = { id: number; title: string };

export default () => (
  <ProTable<Task>
    rowKey="id"
    headerTitle="ErrorBoundary={false}"
    ErrorBoundary={false}
    columns={[{ title: '任务', dataIndex: 'title' }]}
    dataSource={[{ id: 1, title: '检查首页' }]}
    search={false}
    pagination={false}
  />
);
