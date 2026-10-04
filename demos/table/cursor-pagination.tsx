import { ProTable } from '@ant-design/pro-components';
import { Typography } from 'antd';

type Row = {
  id: number;
  name: string;
  status: 'active' | 'closed' | 'pending';
  department: string;
  createdAt: string;
  score: number;
};

const departments = ['技术部', '产品部', '设计部', '运营部', '市场部'];
const statuses: Row['status'][] = ['active', 'closed', 'pending'];
const names = [
  'Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon',
  'Zeta', 'Eta', 'Theta', 'Iota', 'Kappa',
  'Lambda', 'Mu', 'Nu', 'Xi', 'Omicron',
  'Pi', 'Rho', 'Sigma', 'Tau', 'Upsilon',
  'Phi', 'Chi', 'Psi', 'Omega', 'Nova',
  'Apex', 'Zenith', 'Vertex', 'Nexus', 'Pulse',
];

const rows: Row[] = names.map((name, index) => ({
  id: index + 1,
  name,
  status: statuses[index % 3],
  department: departments[index % 5],
  createdAt: new Date(2026, 0, index + 1).toISOString().split('T')[0],
  score: Math.floor(Math.random() * 40) + 60,
}));

export default () => (
  <>
    <Typography.Paragraph type="secondary">
      游标分页仅显示「上一页 / 下一页」，适合无法或不需要获取总条数的场景。
      request 返回的 nextToken 会被自动传入下一次请求。
    </Typography.Paragraph>
    <ProTable<Row>
      rowKey="id"
      search={false}
      options={false}
      columns={[
        { title: 'ID', dataIndex: 'id', width: 64 },
        { title: '名称', dataIndex: 'name' },
        {
          title: '状态',
          dataIndex: 'status',
          valueEnum: {
            active: { text: '启用', status: 'Success' },
            closed: { text: '关闭', status: 'Default' },
            pending: { text: '待处理', status: 'Processing' },
          },
        },
        { title: '部门', dataIndex: 'department' },
        { title: '创建时间', dataIndex: 'createdAt', valueType: 'date' },
        {
          title: '评分',
          dataIndex: 'score',
          sorter: (a, b) => a.score - b.score,
          render: (_, row) => (
            <Typography.Text type={row.score >= 80 ? 'success' : 'warning'}>
              {row.score}
            </Typography.Text>
          ),
        },
      ]}
      pagination={{ type: 'cursor', pageSize: 5 }}
      request={async (
        // 第一个参数 params 包含分页信息
        // 游标分页模式下会传入 nextToken
        params: {
          pageSize?: number;
          current?: number;
          nextToken?: string;
        },
        sort,
        filter,
      ) => {
        const index = Number(params.nextToken ?? 0);
        return {
          success: true,
          data: rows.slice(index, index + 5),
          nextToken: index + 5 < rows.length ? String(index + 5) : undefined,
        };
      }}
    />
  </>
);
