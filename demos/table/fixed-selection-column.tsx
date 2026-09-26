/**
 * title: 固定选择列
 * description: 选择列使用 `fixed: 'start'` 固定后，配合其他固定列横向滚动时，表头勾选框不应被相邻固定列遮挡。
 */
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Table, Tag } from 'antd';

type IssueItem = {
  key: number;
  title: string;
  labels: { name: string; color: string }[];
  state: string;
  createdAt: string;
  rate: number;
};

const columns: ProColumns<IssueItem>[] = [
  { title: '标题', dataIndex: 'title', width: 160, fixed: 'start' },
  {
    title: '状态',
    dataIndex: 'state',
    width: 100,
    valueType: 'select',
    valueEnum: {
      open: { text: '未解决', status: 'Error' },
      closed: { text: '已解决', status: 'Success' },
    },
  },
  {
    title: '标签',
    dataIndex: 'labels',
    width: 140,
    search: false,
    render: (_, record) => (
      <span>
        {record.labels.map(({ name, color }) => (
          <Tag color={color} key={name}>
            {name}
          </Tag>
        ))}
      </span>
    ),
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    width: 160,
    valueType: 'dateTime',
  },
  { title: '评分', dataIndex: 'rate', width: 160, valueType: 'rate' },
  {
    title: '更新时间',
    dataIndex: 'createdAt',
    width: 160,
    valueType: 'dateTime',
  },
  {
    title: '操作',
    dataIndex: 'option',
    valueType: 'option',
    width: 120,
    fixed: 'end',
  },
];

const dataSource: IssueItem[] = Array.from({ length: 8 }).map((_, i) => ({
  key: i,
  title: `Issue 标题 ${i + 1}`,
  labels: [{ name: 'bug', color: 'error' }],
  state: i % 2 === 0 ? 'open' : 'closed',
  createdAt: '2026-09-26 10:00:00',
  rate: 4,
}));

export default () => (
  <ProTable<IssueItem>
    columns={columns}
    dataSource={dataSource}
    rowKey="key"
    search={false}
    toolBarRender={false}
    pagination={false}
    scroll={{ x: 1200 }}
    rowSelection={{
      fixed: 'start',
      selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
    }}
  />
);
