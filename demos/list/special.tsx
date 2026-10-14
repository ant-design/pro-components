import { ProList } from '@ant-design/pro-components';

type Task = { id: number; title: string; type?: 'top' };

export default () => (
  <ProList<Task>
    rowKey="id"
    headerTitle="置顶样式：type=top"
    columns={[
      { dataIndex: 'title', listSlot: 'title' },
      { dataIndex: 'type', listSlot: 'type' },
    ]}
    dataSource={[
      { id: 1, title: '重要公告', type: 'top' },
      { id: 2, title: '普通公告' },
    ]}
    pagination={false}
  />
);
