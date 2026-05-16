import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';

type DataItem = {
  key: number;
  name: string;
  status: string;
  updatedAt: string;
};

const columns: ProColumns<DataItem>[] = [
  { title: '服务名称', dataIndex: 'name', ellipsis: true },
  {
    title: '状态',
    dataIndex: 'status',
    valueEnum: {
      running: { text: '运行中', status: 'Success' },
      stopped: { text: '已停止', status: 'Default' },
      error: { text: '异常', status: 'Error' },
    },
  },
  { title: '更新时间', dataIndex: 'updatedAt', valueType: 'dateTime' },
  {
    title: '操作',
    valueType: 'option',
    render: () => [<a key="detail">详情</a>],
  },
];

const dataSource: DataItem[] = Array.from({ length: 50 }, (_, i) => ({
  key: i,
  name: `微服务实例 ${i + 1}`,
  status: ['running', 'stopped', 'error'][i % 3],
  updatedAt: '2026-05-16T12:00:00',
}));

export default () => (
  <div
    style={{
      height: 500,
      border: '1px solid #f0f0f0',
      borderRadius: 8,
      overflow: 'hidden',
    }}
  >
    <ProTable<DataItem>
      columns={columns}
      dataSource={dataSource}
      scroll={{ y: 'fill' }}
      search={{ defaultCollapsed: true, labelWidth: 'auto' }}
      rowKey="key"
      headerTitle="scroll.y = fill 示例"
      pagination={{ pageSize: 50 }}
    />
  </div>
);
