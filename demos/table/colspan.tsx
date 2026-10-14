import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';

type Row = {
  key: string;
  item: string;
  detail: string;
  count: number;
};

const dataSource: Row[] = [
  { key: '1', item: '本周合计', detail: '', count: 8 },
  { key: '2', item: '首页', detail: '设计任务', count: 3 },
];

const columns: ProColumns<Row>[] = [
  {
    title: '项目',
    dataIndex: 'item',
    onCell: (record) => (record.key === '1' ? { colSpan: 2 } : {}),
  },
  {
    title: '明细',
    dataIndex: 'detail',
    onCell: (record) => (record.key === '1' ? { colSpan: 0 } : {}),
  },
  { title: '数量', dataIndex: 'count' },
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
