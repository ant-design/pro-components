import { ProList } from '@ant-design/pro-components';

type Component = { id: number; name: string; description: string };
const components: Component[] = [
  { id: 1, name: 'ProTable', description: '包含搜索和分页的高级表格' },
  { id: 2, name: 'ProForm', description: '快速构建业务表单' },
  { id: 3, name: 'ProCard', description: '可组合的内容卡片' },
];

export default () => (
  <ProList<Component>
    rowKey="id"
    grid={{ xs: 1, sm: 2, gutter: 16 }}
    dataSource={components}
    columns={[
      { title: '组件', dataIndex: 'name', listSlot: 'title' },
      { title: '说明', dataIndex: 'description', listSlot: 'description' },
    ]}
  />
);
