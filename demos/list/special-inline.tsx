import { ProList } from '@ant-design/pro-components';

type Task = { id: number; title: string; type?: 'inline' };

export default () => (
  <ProList<Task>
    rowKey="id"
    headerTitle="行内标题：type=inline"
    columns={[
      { dataIndex: 'title', listSlot: 'title' },
      { dataIndex: 'type', listSlot: 'type' },
    ]}
    dataSource={[
      { id: 1, title: '行内标题', type: 'inline' },
      { id: 2, title: '普通标题' },
    ]}
    pagination={false}
  />
);
