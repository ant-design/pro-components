import type { ProColumns } from '@ant-design/pro-components';
import { ProList } from '@ant-design/pro-components';

type Task = { id: number; owner: string; title: string };

const tasks: Task[] = [
  { id: 1, owner: '林青', title: '检查首页性能' },
  { id: 2, owner: '陈宁', title: '修复登录超时' },
  { id: 3, owner: '林青', title: '更新组件文档' },
];

const columns: ProColumns<Task>[] = [
  { title: '负责人', dataIndex: 'owner', listSlot: 'subTitle' },
  { title: '任务', dataIndex: 'title', listSlot: 'title', search: false },
];

export default () => (
  <ProList<Task>
    rowKey="id"
    headerTitle="使用 columns 配置搜索"
    columns={columns}
    search={{ filterType: 'light' }}
    pagination={false}
    request={async ({ owner }) => {
      const data = tasks.filter((task) => !owner || task.owner.includes(owner));
      return { data, total: data.length, success: true };
    }}
  />
);
