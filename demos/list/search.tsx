import { ProList } from '@ant-design/pro-components';

type Task = { id: number; owner: string; title: string };

const tasks: Task[] = [
  { id: 1, owner: '林青', title: '检查首页性能' },
  { id: 2, owner: '陈宁', title: '修复登录超时' },
  { id: 3, owner: '林青', title: '更新用户指南' },
];

export default () => (
  <ProList<Task>
    rowKey="id"
    headerTitle="任务列表"
    search={{ labelWidth: 'auto' }}
    pagination={false}
    request={async ({ owner }) => {
      const data = tasks.filter((task) => !owner || task.owner.includes(owner));
      return { data, total: data.length, success: true };
    }}
    columns={[
      { title: '负责人', dataIndex: 'owner', listSlot: 'subTitle' },
      { title: '任务', dataIndex: 'title', listSlot: 'title', search: false },
    ]}
  />
);
