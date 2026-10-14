import { ProList } from '@ant-design/pro-components';

type Issue = { id: number; title: string; state: 'open' | 'closed' };

const issues: Issue[] = [
  { id: 1, title: '修复表格样式', state: 'open' },
  { id: 2, title: '更新组件文档', state: 'closed' },
  { id: 3, title: '检查移动端布局', state: 'open' },
];

export default () => (
  <ProList<Issue>
    rowKey="id"
    search={{ filterType: 'light' }}
    pagination={false}
    columns={[
      { title: 'Issue', dataIndex: 'title', listSlot: 'title', search: false },
      {
        title: '状态',
        dataIndex: 'state',
        valueType: 'select',
        fieldProps: { style: { width: 60 } },
        valueEnum: {
          open: { text: '待处理', status: 'Processing' },
          closed: { text: '已完成', status: 'Success' },
        },
      },
    ]}
    request={async ({ state }) => {
      const data = issues.filter((issue) => !state || issue.state === state);
      return { data, total: data.length, success: true };
    }}
  />
);
