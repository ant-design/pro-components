import { ProTable } from '@ant-design/pro-components';

type Task = { id: number; name: string; owner: string };

export default () => (
  <ProTable<Task>
    rowKey="id"
    headerTitle="无查询表单"
    search={false}
    pagination={false}
    columns={[
      { title: '任务', dataIndex: 'name' },
      { title: '负责人', dataIndex: 'owner' },
    ]}
    dataSource={[
      { id: 1, name: '检查表格布局', owner: '林青' },
      { id: 2, name: '更新组件文档', owner: '陈宁' },
    ]}
  />
);
