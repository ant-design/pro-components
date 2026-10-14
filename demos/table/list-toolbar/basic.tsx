import { ProTable } from '@ant-design/pro-components';

type Task = { id: number; title: string };

export default () => (
  <ProTable<Task>
    rowKey="id"
    columns={[{ title: '任务', dataIndex: 'title' }]}
    dataSource={[{ id: 1, title: '检查部署记录' }]}
    search={false}
    pagination={false}
    toolbar={{ title: '部署任务', subTitle: '最近更新' }}
  />
);
