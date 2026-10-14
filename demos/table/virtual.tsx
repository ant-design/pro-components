import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';

type RecordType = {
  id: number;
  name: string;
  status: 'active' | 'disabled';
};

const dataSource: RecordType[] = Array.from({ length: 10_000 }, (_, id) => ({
  id,
  name: `Record ${id}`,
  status: id % 5 === 0 ? 'disabled' : 'active',
}));

const columns: ProColumns<RecordType>[] = [
  { title: 'ID', dataIndex: 'id', width: 100 },
  { title: 'Name', dataIndex: 'name', width: 240 },
  { title: 'Status', dataIndex: 'status', width: 140 },
];

export default () => (
  <ProTable<RecordType>
    rowKey="id"
    search={false}
    options={false}
    pagination={false}
    virtual
    scroll={{ x: 600, y: 500 }}
    columns={columns}
    dataSource={dataSource}
  />
);
