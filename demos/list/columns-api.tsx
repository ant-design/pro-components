import type { ProColumns } from '@ant-design/pro-components';
import { ProList } from '@ant-design/pro-components';

type Task = {
  id: number;
  name: string;
  owner: string;
  description: string;
};

const columns: ProColumns<Task>[] = [
  { title: '任务', dataIndex: 'name', listSlot: 'title' },
  { title: '负责人', dataIndex: 'owner', listSlot: 'subTitle' },
  { title: '说明', dataIndex: 'description', listSlot: 'description' },
];

export default () => (
  <ProList<Task>
    rowKey="id"
    headerTitle="columns.listSlot 映射列表内容"
    columns={columns}
    dataSource={[
      { id: 1, name: '检查首页', owner: '林青', description: '确认布局适配窄屏' },
      { id: 2, name: '更新文档', owner: '陈宁', description: '补充 API 使用说明' },
    ]}
  />
);
