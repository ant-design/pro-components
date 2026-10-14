import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';

type Issue = { id: number; title: string; state: 'open' | 'closed' };

const issues: Issue[] = [
  { id: 1, title: '修复登录页样式', state: 'open' },
  { id: 2, title: '更新组件文档', state: 'closed' },
  { id: 3, title: '检查表格分页', state: 'open' },
  { id: 4, title: '优化搜索体验', state: 'closed' },
  { id: 5, title: '完善键盘操作', state: 'open' },
  { id: 6, title: '补充响应式测试', state: 'closed' },
];

const columns: ProColumns<Issue>[] = [
  { title: '标题', dataIndex: 'title' },
  {
    title: '状态',
    dataIndex: 'state',
    valueType: 'select',
    valueEnum: {
      open: { text: '进行中', status: 'Processing' },
      closed: { text: '已完成', status: 'Success' },
    },
  },
];

export default () => (
  <ProTable<Issue>
    rowKey="id"
    headerTitle="按标题或状态查询"
    columns={columns}
    pagination={{ pageSize: 3 }}
    request={async ({ title, state, current = 1, pageSize = 3 }) => {
      const filtered = issues.filter(
        (item) =>
          (!title || item.title.includes(title)) &&
          (!state || item.state === state),
      );
      return {
        data: filtered.slice((current - 1) * pageSize, current * pageSize),
        total: filtered.length,
        success: true,
      };
    }}
  />
);
