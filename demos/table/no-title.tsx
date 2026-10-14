import { ProTable } from '@ant-design/pro-components';

type Task = { id: number; title: string; owner: string };

export default () => (
  <ProTable<Task>
    rowKey="id"
    columns={[
      { title: '任务', dataIndex: 'title' },
      { title: '负责人', dataIndex: 'owner' },
    ]}
    dataSource={[
      { id: 1, title: '检查首页', owner: '林青' },
      { id: 2, title: '更新文档', owner: '陈宁' },
    ]}
    search={false}
    toolBarRender={false}
    pagination={false}
  />
);
