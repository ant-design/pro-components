import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';

type Row = {
  key: string;
  team: string;
  member: string;
  task: string;
};

const dataSource: Row[] = [
  { key: '1', team: '前端组', member: '张三', task: '首页' },
  { key: '2', team: '', member: '李四', task: '表单' },
  { key: '3', team: '后端组', member: '王五', task: '接口' },
];

const columns: ProColumns<Row>[] = [
  {
    title: '团队',
    dataIndex: 'team',
    onCell: (_, index = 0) =>
      index === 0 ? { rowSpan: 2 } : index === 1 ? { rowSpan: 0 } : {},
  },
  { title: '成员', dataIndex: 'member' },
  { title: '任务', dataIndex: 'task' },
];

export default () => (
  <ProTable<Row>
    columns={columns}
    dataSource={dataSource}
    rowKey="key"
    search={false}
    options={false}
    pagination={false}
    scroll={{ x: 480 }}
  />
);
