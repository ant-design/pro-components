import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';

type Task = { id: number; title: string };

const tasks: Task[] = [
  { id: 1, title: '设计首页' },
  { id: 2, title: '开发登录页' },
];

const columns: ProColumns<Task>[] = [
  {
    title: '任务名称',
    dataIndex: 'title',
    initialValue: '设计',
    formItemProps: {
      rules: [{ required: true, message: '请输入任务名称' }],
    },
  },
];

export default () => (
  <div style={{ padding: 12 }}>
    <ProTable<Task, { title?: string }>
      rowKey="id"
      columns={columns}
      form={{ ignoreRules: false }}
      options={false}
      pagination={false}
      request={async (params) => {
        const data = tasks.filter((task) =>
          task.title.includes(params.title || ''),
        );
        return { data, success: true, total: data.length };
      }}
    />
  </div>
);
